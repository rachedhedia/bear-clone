import React from 'react'
import MarkdownEditor from './markdown-editor/component.js'
import './component.scss'

function DocumentPanel(props)
{

return (
<section className="document-content-panel">
    <div className="document-content">
    <MarkdownEditor documentUniqueId={props.documentUniqueId} documentContent={props.documentContent} setActiveDocumentContent={props.setActiveDocumentContent}></MarkdownEditor>                   
    </div>
    
</section>)
}

export default DocumentPanel;