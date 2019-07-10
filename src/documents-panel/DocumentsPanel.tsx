import React from 'react';
import {connect} from 'react-redux';
import {selectDocument} from '../actions'
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

function mapStateToProps(state : GlobalState) {
    let documentsPanelState : DocumentsPanelState = state.documentsFolder;
    return {
        selectedDocuments: getSelectedDocuments(documentsPanelState.documents, documentsPanelState.selectedFolderId, documentsPanelState.searchFieldContent),
        selectedDocumentId: documentsPanelState.selectedDocumentId
    }
}
function mapDispatchToProps(dispatch : any) {
    return {
        selectDocument: (documentId : number) => dispatch(selectDocument(documentId))
    }
}

function ConnectedDocumentsPanel(props) {          
    return (
<section className="documents-panel">
    <section className="search-panel">
        <input type="text" name="document-search" id="document-search" className="document-search" placeholder="Search Notes" />
        <a href="#" className="search-button" onClick={props.createNewDocument}>+</a>
    </section>
    <ul>        
    {props.selectedDocuments.map((document) =>
        <li key={document.id} className={document.id === props.selectedDocumentId ? "document-preview document-preview__active" : "document-preview"} onClick={() => props.selectDocument(document.id)}>
            <div className="document-date">{document.date}</div>
            <h2 className="document-preview-title">{document.content.substring(0, document.content.indexOf('\n'))}</h2>
            <p className="document-preview-content">{document.content.substring(document.content.indexOf('\n') + 1, document.content.indexOf('\n') + 70) + '...'}</p>
        </li>)}        
    </ul>
</section>)
}

const DocumentsPanel = connect(mapStateToProps, mapDispatchToProps)(ConnectedDocumentsPanel);

export default DocumentsPanel;