import React, { useState, useEffect } from 'react'
import './css/main.scss'
import NavigationPanel from './navigation-panel/NavigationPanel.js'
import DocumentsPanel from './documents-panel/DocumentsPanel.js'
import DocumentPanel from './document-panel/DocumentPanel.js'
import loadedData from './data.yml'


function regenerateDatas(data, activeDocumentId, newContent) {
    return {
        ...data,
        documents: data.documents.map(document => {
            if (document.id === activeDocumentId) {
                return { ...document, content: newContent };
            }
            else {
                return document;
            }
        })
    };
}

function buildSelectedFoldersIds(folders, activeFolderId)
{
    const selectedFoldersIds = folders.filter(folder => folder.id === activeFolderId).
        flatMap(folder => {
            let selectedFoldersIds = [folder.id];
            if (folder.hasOwnProperty('subfolders')) {
                selectedFoldersIds = selectedFoldersIds.concat(folder.subfolders.map(folder => folder.id));
            }

            return selectedFoldersIds;
        });

    selectedFoldersIds.push(activeFolderId);

    return selectedFoldersIds;
}

function App(props) {

    
    const [data, setData] = useState({documents: [], folders: loadedData.folders, loaded: false});
    const [activeFolderId, setActiveFolderId] = useState(1);
    const [activeDocumentId, setActiveDocumentId] = useState(1);    
    
    useEffect(() => {        
         
        if(!data.loaded)
        {
            let db = props.firebase.firestore();
            db.collection("documents").where("owner", "==", props.userEmail).get().
            then((querySnapshot) => 
            {
                let loadedDocuments = [];
                querySnapshot.forEach(doc => loadedDocuments.push({...doc.data(), content: doc.data().content.replace(/\\n/g, "\n")}));                
                console.log(loadedDocuments);
                setData({documents: loadedDocuments, folders: loadedData.folders, loaded: true});
            });                                                                     
        }              
        
        const selectedDocuments = data.documents.filter(document => selectedFoldersIds.includes(document.folderId));
        console.log('selected documents: ' + selectedDocuments);
        let activeDocument = selectedDocuments.find(document => document.id === activeDocumentId);
        if (activeDocument === undefined) {
            if (selectedDocuments.length > 0)
                setActiveDocumentId(selectedDocuments[0].id);
            else
                setActiveDocumentId(-1);
        }
    }
    );

    function createNewDocument() {
        const newDocumentId = data.documents.map(document => document.id).sort().pop() + 1;
        console.log(data.documents.map(document => document.id).sort());
        console.log(newDocumentId);
        const targetFolderId = 2; 

        setData(
            {documents: [
                {
                    owner: props.userEmail,
                    date: "1d",
                    id: newDocumentId,
                    folderId: targetFolderId,                    
                    content: "New document\n"
                }
            ].concat(data.documents),
            folders: data.folders});        

        setActiveDocumentId(newDocumentId);
    }

    const selectedFoldersIds = buildSelectedFoldersIds(data.folders, activeFolderId);
        const selectedDocuments = data.documents.filter(document => selectedFoldersIds.includes(document.folderId));
        const activeDocument = selectedDocuments.find(document => document.id === activeDocumentId);
        const activeDocumentContent = activeDocument != undefined ? activeDocument.content : "";

    
        return (
            <div className="application-root">
                <NavigationPanel activeFolderId={activeFolderId} folders={data.folders} setActiveFolderId={setActiveFolderId}></NavigationPanel>
                <DocumentsPanel documents={selectedDocuments} activeDocumentId={activeDocumentId} setActiveDocumentId={setActiveDocumentId} createNewDocument={createNewDocument}></DocumentsPanel>
                <DocumentPanel documentUniqueId={activeDocumentId} documentContent={activeDocumentContent} setActiveDocumentContent={(newContent) => setData(regenerateDatas(data, activeDocumentId, newContent))}></DocumentPanel>
    
            </div>
        )    
}

export default App