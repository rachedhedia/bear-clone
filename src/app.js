import React, {useState} from 'react'
import './css/main.scss'
import NavigationPanel from './navigation-panel/component.js'
import DocumentsPanel from './documents-panel/component.js'
import DocumentPanel from './document-panel/component.js'
import loadedData from './data.yml'


function regenerateDatas(data, currentFolderIndex, currentDocumentIndex, newContent)
{
    return data.map((folder, index) => {
    if(index === currentFolderIndex)
    {
        return {...folder, documents: 
            folder.documents.map((document, index) =>
            {
                if(index === currentDocumentIndex) {
                    return {...document, content: newContent};
                }        
                else
                {
                return document;
                 }
            })
        }
    } else
    {
        return folder;
    }});
}

function App() {

  const [data, setData] = useState(loadedData);
  const [activeFolderIndex, setActiveFolderIndex] = useState(0);
  const [activeDocumentIndex, setActiveDocumentIndex] = useState(0);      

  const activeDocumentUniqueId = activeFolderIndex + ' ' + activeDocumentIndex

  return (
  <div className="application-root">
  <NavigationPanel activeFolderIndex={activeFolderIndex} folders={data.map((folder) => folder.folderName)} setActiveFolderIndex={setActiveFolderIndex}></NavigationPanel>
  <DocumentsPanel documents={data[activeFolderIndex].documents} activeDocumentIndex={activeDocumentIndex} setActiveDocumentIndex={setActiveDocumentIndex}></DocumentsPanel>
  <DocumentPanel documentUniqueId={activeDocumentUniqueId} documentContent={activeDocumentIndex >= 0 ? data[activeFolderIndex].documents[activeDocumentIndex].content : ""} setActiveDocumentContent={(newContent) => setData(regenerateDatas(data, activeFolderIndex, activeDocumentIndex, newContent))}></DocumentPanel>

</div>
  )
}

export default App