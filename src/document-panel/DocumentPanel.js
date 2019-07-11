import React from 'react'
import MarkdownEditor from './markdown-editor/MarkdownEditor'
import './DocumentPanel.scss'

function DocumentPanel(props)
{

return (
<section className="document-content-panel">
    <div className="document-content">
    <MarkdownEditor></MarkdownEditor>                   
    </div>
    
</section>)
}

export default DocumentPanel;