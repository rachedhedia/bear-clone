import React, {useState} from 'react'
import './css/main.scss'
import NavigationPanel from './navigation-panel/component.js'
import DocumentsPanel from './documents-panel/component.js'
import DocumentPanel from './document-panel/component.js'
import loadedData from './data.yml'


function regenerateDatas(data, activeDocumentId, newContent)
{
    return {
        ...data,
        documents : data.documents.map(document => {
            if(document.id === activeDocumentId) {
                return {...document, content: newContent};
            }
            else
            {
                return document;
            }
        })        
    };
}

function App() {

  const [data, setData] = useState(loadedData);
  const [activeFolderId, setActiveFolderId] = useState(1);
  const [activeDocumentId, setActiveDocumentId] = useState(1);
  

  const selectedFoldersIds = data.folders.filter(folder => folder.id === activeFolderId).
  flatMap(folder => {
      let selectedFoldersIds = [folder.id];
      if(folder.hasOwnProperty('subfolders'))
      {
          selectedFoldersIds = selectedFoldersIds.concat(folder.subfolders.map(folder => folder.id));
      }

      return selectedFoldersIds;
  });

  selectedFoldersIds.push(activeFolderId);

  const documents = data.documents.filter(document => selectedFoldersIds.includes(document.folderId));
  const activeDocument = documents.find(document => document.id === activeDocumentId);
  const activeDocumentContent = activeDocument != undefined ? activeDocument.content : "";
  

  return (
  <div className="application-root">
  <NavigationPanel activeFolderId={activeFolderId} folders={data.folders} setActiveFolderId={setActiveFolderId}></NavigationPanel>
  <DocumentsPanel documents={documents} activeDocumentId={activeDocumentId} setActiveDocumentId={setActiveDocumentId}></DocumentsPanel>
  <DocumentPanel documentUniqueId={activeDocumentId} documentContent={activeDocumentContent} setActiveDocumentContent={(newContent) => setData(regenerateDatas(data, activeDocumentId, newContent))}></DocumentPanel>

</div>
  )
}

export default App