import { 
    LOAD_DATA,
    DATA_LOADED,
    TOGGLE_FOLDERS_COLLAPSE, 
    EXPAND_FOLDERS,
    COLLAPSE_FOLDERS,    
    TOGGLE_TAGS_COLLAPSE, 
    SELECT_FOLDER,     
    SET_SEARCH_CRITERION, 
    SELECT_DOCUMENT, 
    CREATE_NEW_DOCUMENT, 
    UPDATE_DOCUMENT_CONTENT    
} from './constants';
import {GlobalState} from './types'
import foldersTree from './folders-tree'

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

function buildFlatFoldersList(foldersTree : Array<Folder>, foldersExpanded : boolean) : Array<Folder> {
    return foldersTree.flatMap((folder) => foldersExpanded && folder.hasOwnProperty('subfolders') ? [folder].concat(folder.subfolders) : [folder]);        
}


function computeNextFolderId(foldersTree : Array<Folder>, foldersExpanded : boolean, selectedFolderId : number) : number
{
    const flatFoldersList = buildFlatFoldersList(foldersTree, foldersExpanded);
    const selectedFolderIndex = flatFoldersList.findIndex(folder => folder.id === selectedFolderId);
    return selectedFolderIndex < flatFoldersList.length - 1 ? flatFoldersList[selectedFolderIndex + 1].id : flatFoldersList[0].id;
}

function computePreviousFolderId(foldersTree : Array<Folder>, foldersExpanded : boolean, selectedFolderId : number) : number
{
    const flatFoldersList = buildFlatFoldersList(foldersTree, foldersExpanded);
    const selectedFolderIndex = flatFoldersList.findIndex(folder => folder.id === selectedFolderId);
    return selectedFolderIndex > 0 ? flatFoldersList[selectedFolderIndex - 1].id : flatFoldersList[flatFoldersList.length - 1].id
}

export function selectNextFolder() {
    return (dispatch, getState) => {
        const globalState : GlobalState = getState();
        const nextFolderId = computeNextFolderId(foldersTree, globalState.foldersPanel.foldersExpanded, globalState.foldersPanel.selectedFolderId);
        dispatch(selectFolder(nextFolderId));
    }    
}

export function selectPreviousFolder() {
    return (dispatch, getState) => {
        const globalState : GlobalState = getState();
        const previousFolderId = computePreviousFolderId(foldersTree, globalState.foldersPanel.foldersExpanded, globalState.foldersPanel.selectedFolderId);
        dispatch(selectFolder(previousFolderId));
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
