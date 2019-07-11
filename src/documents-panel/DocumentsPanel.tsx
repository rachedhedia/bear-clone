import React from 'react';
import {connect} from 'react-redux';
import {createDocument, selectDocument} from '../actions'
import {Document, GlobalState, DocumentsPanelState} from '../types'
import foldersTree from '../folders-tree'

import './DocumentsPanel.scss'

function getSelectedDocuments(documents : Array<Document>, selectedFolderId : number, searchFieldContent : string) {
    
    const flatFoldersList = foldersTree.flatMap((folder) => folder.hasOwnProperty('subfolders') ? [folder].concat(folder.subfolders) : [folder]);
    const selectedFolders = flatFoldersList.filter(x => x.id === selectedFolderId).
        flatMap(folder => folder.hasOwnProperty('subfolders') ? [folder.id].concat(folder.subfolders.map(x => x.id)) : [folder.id]);
    
    return documents.
        filter(doc => selectedFolders.find(folderId => folderId === doc.folderId) != undefined).
        filter(doc => doc.content.includes(searchFieldContent));
}

function getTitle(content : string) : string
{
    return content.indexOf('\n') !== -1 ? content.substring(0, content.indexOf('\n')) : content;
}

function getPreview(content : string) : string
{
    return content.indexOf('\n') !== -1 ? content.substring(content.indexOf('\n') + 1, content.indexOf('\n') + 70) + '...' : "...";
}

function getDocumentsSummary(documents : Array<Document>)
{
    return documents.map(doc => ({id : doc.id, title : getTitle(doc.content), preview : getPreview(doc.content)}));
}

function mapStateToProps(state : GlobalState) {
    let documentsPanelState : DocumentsPanelState = state.documentsFolder;
    return {
        selectedDocumentsSummary: getDocumentsSummary(getSelectedDocuments(documentsPanelState.documents, documentsPanelState.selectedFolderId, documentsPanelState.searchFieldContent)),        
        selectedDocumentId: documentsPanelState.selectedDocumentId
    }
}
function mapDispatchToProps(dispatch : any) {
    return {
        createDocument: () => dispatch(createDocument()),
        selectDocument: (documentId : number) => dispatch(selectDocument(documentId))
    }
}

function ConnectedDocumentsPanel(props) {          
    return (
<section className="documents-panel">
    <section className="search-panel">
        <input type="text" name="document-search" id="document-search" className="document-search" placeholder="Search Notes" />
        <a href="#" className="search-button" onClick={props.createDocument}>+</a>
    </section>
    <ul>        
    {props.selectedDocumentsSummary.map((document) =>
        <li key={document.id} className={document.id === props.selectedDocumentId ? "document-preview document-preview__active" : "document-preview"} onClick={() => props.selectDocument(document.id)}>
            <div className="document-date">{document.date}</div>
            <h2 className="document-preview-title">{document.title}</h2>
            <p className="document-preview-content">{document.preview}</p>
        </li>)}        
    </ul>
</section>)
}

const DocumentsPanel = connect(mapStateToProps, mapDispatchToProps)(ConnectedDocumentsPanel);

export default DocumentsPanel;