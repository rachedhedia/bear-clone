import React from 'react';
import {connect} from 'react-redux';
import {selectDocument} from '../actions'

import './DocumentsPanel.scss'

function mapStateToProps(state) {
    return {
        selectedDocuments: state.documentsFolder.selectedDocuments,
        selectedDocumentId: state.documentsFolder.selectedDocumentId
    }
}
function mapDispatchToProps(dispatch) {
    return {
        selectDocument: (documentId) => dispatch(selectDocument(documentId))
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