import React from 'react';

import './component.scss'

function DocumentsPanel(props) {               

    return (
<section className="documents-panel">
    <section className="search-panel">
        <input type="text" name="document-search" id="document-search" className="document-search" placeholder="Search Notes" />
        <a href="#" className="search-button" />
    </section>
    <ul>        
    {props.documents.map((document) =>
        <li key={document.title} className={document.id === props.activeDocumentId ? "document-preview document-preview__active" : "document-preview"} onClick={() => props.setActiveDocumentId(document.id)}>
            <div className="document-date">{document.date}</div>
            <h2 className="document-preview-title">{document.title}</h2>
            <p className="document-preview-content">{document.content.substring(0, 70) + '...'}</p>
        </li>)}        
    </ul>
</section>)
}

export default DocumentsPanel;