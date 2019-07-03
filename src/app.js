import React, { useState, useEffect } from 'react'
import './css/main.scss'
import NavigationPanel from './navigation-panel/component.js'
import DocumentsPanel from './documents-panel/component.js'
import DocumentPanel from './document-panel/component.js'
import loadedData from './data.yml'

import firebase from 'firebase'
import firebaseConfig from './firebaseconfig.json'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp(firebaseConfig);

const firebaseSigninConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID      
    ],
    callbacks: {      
      signInSuccessWithAuthResult: () => false
    }
  };

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

function App() {

    const [userIsSignedIn, setUserSignedIn] = useState(!!firebase.auth().currentUser);
    const [data, setData] = useState(loadedData);
    const [activeFolderId, setActiveFolderId] = useState(1);
    const [activeDocumentId, setActiveDocumentId] = useState(1);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => setUserSignedIn(!!user));
    });

    useEffect(() => {

        const selectedDocuments = data.documents.filter(document => selectedFoldersIds.includes(document.folderId));
        let activeDocument = selectedDocuments.find(document => document.id === activeDocumentId);
        if (activeDocument === undefined) {
            if (selectedDocuments.length > 0)
                setActiveDocumentId(selectedDocuments[0].id);
            else
                setActiveDocumentId(-1);
        }
    }
    );

    const selectedFoldersIds = buildSelectedFoldersIds(data.folders, activeFolderId);
    const selectedDocuments = data.documents.filter(document => selectedFoldersIds.includes(document.folderId));
    const activeDocument = selectedDocuments.find(document => document.id === activeDocumentId);
    const activeDocumentContent = activeDocument != undefined ? activeDocument.content : "";

    
    if(!userIsSignedIn)
    {
        return <StyledFirebaseAuth uiConfig={firebaseSigninConfig} firebaseAuth={firebase.auth()}/>
    }
    else
    {
        return (
            <div className="application-root">
                <NavigationPanel activeFolderId={activeFolderId} folders={data.folders} setActiveFolderId={setActiveFolderId}></NavigationPanel>
                <DocumentsPanel documents={selectedDocuments} activeDocumentId={activeDocumentId} setActiveDocumentId={setActiveDocumentId}></DocumentsPanel>
                <DocumentPanel documentUniqueId={activeDocumentId} documentContent={activeDocumentContent} setActiveDocumentContent={(newContent) => setData(regenerateDatas(data, activeDocumentId, newContent))}></DocumentPanel>
    
            </div>
        )
    }    
}

export default App