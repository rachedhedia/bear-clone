import React from 'react';

import './DocumentsPanel.scss'

function DocumentsPanel(props) {               

    return (
<section className="documents-panel">
    <section className="search-panel">
        <input type="text" name="document-search" id="document-search" className="document-search" placeholder="Search Notes" />
        <a href="#" className="search-button" onClick={props.createNewDocument}>+</a>
    </section>
    <ul>        
    {props.documents.map((document) =>
        <li key={document.id} className={document.id === props.activeDocumentId ? "document-preview document-preview__active" : "document-preview"} onClick={() => props.setActiveDocumentId(document.id)}>
            <div className="document-date">{document.date}</div>
            <h2 className="document-preview-title">{document.content.substring(0, document.content.indexOf('\n'))}</h2>
            <p className="document-preview-content">{document.content.substring(document.content.indexOf('\n') + 1, document.content.indexOf('\n') + 70) + '...'}</p>
        </li>)}        
    </ul>
</section>)
}

export default DocumentsPanel;