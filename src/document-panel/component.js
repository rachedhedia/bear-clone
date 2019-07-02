import React from 'react'
import './component.scss'

function DocumentPanel(props)
{

return (
<section className="document-content-panel">
    <div className="document-content">
            <p>{props.documentContent}
                
                </p>
    </div>
    
</section>)
}

export default DocumentPanel;