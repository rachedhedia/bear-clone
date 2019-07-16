import React, {useState} from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./MarkdownEditor.scss"
import {Document, GlobalState} from '../../types'
import {updateDocumentContent} from '../../actions'
import {connect} from 'react-redux'
import foldersTree from '../../folders-tree'

function getSelectedDocuments(documents : Array<Document>, selectedFolderId : number, searchFieldContent : string) {    
    const flatFoldersList = foldersTree.flatMap((folder) => folder.hasOwnProperty('subfolders') ? [folder].concat(folder.subfolders) : [folder]);
    const selectedFolders = flatFoldersList.filter(x => x.id === selectedFolderId).
        flatMap(folder => folder.hasOwnProperty('subfolders') ? [folder.id].concat(folder.subfolders.map(x => x.id)) : [folder.id]);   
        
    return documents.
        filter(doc => selectedFolders.find(folderId => folderId === doc.folderId) != undefined).
        filter(doc => doc.content.includes(searchFieldContent));
}

function getDocumentContent(documents : Array<Document>, selectedDocumentId : string, selectedFolderId, searchFieldContent) {
    const selectedDocuments = getSelectedDocuments(documents, selectedFolderId, searchFieldContent);    
    const foundDocument = selectedDocuments.find(d => d.id === selectedDocumentId);    
    
    const documentContent = foundDocument === undefined ? "" : foundDocument.content;        
    return documentContent;
}

function mapStateToProps(state : GlobalState) {
    return {
        selectedDocumentId: state.documentsFolder.selectedDocumentId,
        documentContent : getDocumentContent(state.documentsFolder.documents, state.documentsFolder.selectedDocumentId, state.documentsFolder.selectedFolderId, state.documentsFolder.searchFieldContent)        
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        updateDocumentContent : (id: string, content : string) => dispatch(updateDocumentContent(id, content))
    };
}

function ConnectedMarkdownEditor(props)
{
    /* The key tag is added to fix a bug in the markdown editor causing it not to correctly update when switching back to the original value : cf https://github.com/RIP21/react-simplemde-editor/issues/79*/
    return (<SimpleMDE options={{status:false}} key={props.selectedDocumentId} value={props.documentContent} onChange={(value) => props.updateDocumentContent(props.selectedDocumentId, value)}/>);
}

const MarkdownEditor = connect(mapStateToProps, mapDispatchToProps)(ConnectedMarkdownEditor);

export default MarkdownEditor;
