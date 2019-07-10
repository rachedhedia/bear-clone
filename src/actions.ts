import { 
    LOAD_DATA,
    DATA_LOADED,
    TOGGLE_FOLDERS_COLLAPSE, 
    EXPAND_FOLDERS,
    COLLAPSE_FOLDERS,    
    TOGGLE_TAGS_COLLAPSE, 
    SELECT_FOLDER, 
    SELECT_NEXT_FOLDER, 
    SELECT_PREVIOUS_FOLDER,
    SET_SEARCH_CRITERION, 
    SELECT_DOCUMENT, 
    CREATE_NEW_DOCUMENT, 
    UPDATE_DOCUMENT_CONTENT    
} from './constants.js';

import {Folder, Document} from './types'

export function loadData(userEmail : string, firestore : any) : (dispatch: any) => any {
    return dispatch => {        
        firestore.collection("documents").where("owner", "==", userEmail).get().
            then((querySnapshot) => 
            {                
                let loadedDocuments = [];
                querySnapshot.forEach(doc => loadedDocuments.push({...doc.data(), content: doc.data().content.replace(/\\n/g, "\n")}));                
                console.log(loadedDocuments);
                dispatch(dataLoaded(loadedDocuments));
            });                                                                    
    }    
}

export function dataLoaded(documents : Array<Document>) {    
    return {
        type: DATA_LOADED,
        data: documents
    }
}

export function expandFolders()
{
    return {
        type: EXPAND_FOLDERS
    }
}

export function collapseFolders()
{
    return {
        type: COLLAPSE_FOLDERS
    }
}

export function toggleFoldersCollapse()
{
    return {
        type: TOGGLE_FOLDERS_COLLAPSE
    }
}

export function toggleTagsCollapse()
{
    return {
        type: TOGGLE_TAGS_COLLAPSE
    }
}

export function selectFolder(folderId : number) {
    return {
        type: SELECT_FOLDER,
        folderId: folderId
    }
}

export function selectNextFolder() {
    return {
        type: SELECT_NEXT_FOLDER
    }
}

export function selectPreviousFolder() {
    return {
        type: SELECT_PREVIOUS_FOLDER
    }
}

export function setSearchCriterion(searchCriterion : string) {
    return {
        type: SET_SEARCH_CRITERION,
        searchCriterion: searchCriterion
    }
}

export function selectDocument(documentId : number) {
    return {
        type: SELECT_DOCUMENT,
        documentId: documentId
    }
}

export function createNewDocument() {
    return {
        type: CREATE_NEW_DOCUMENT
    }
}

export function updateDocumentContent(id : number, content : string) {
    return {
        type: UPDATE_DOCUMENT_CONTENT,
        id: id,
        content: content
    }
}
