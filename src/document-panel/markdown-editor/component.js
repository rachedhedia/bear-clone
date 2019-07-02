import React, {useState} from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./component.scss"

function MarkdownEditor(props)
{
    /* The key tag is added to fix a bug in the markdown editor causing it not to correctly update when switching back to the original value : cf https://github.com/RIP21/react-simplemde-editor/issues/79*/
    return (<SimpleMDE key={props.documentUniqueId} value={props.documentContent} onChange={(value) => props.setActiveDocumentContent(value)}/>);
}

export default MarkdownEditor;
