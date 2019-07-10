import {     
    DATA_LOADED,
    EXPAND_FOLDERS,
COLLAPSE_FOLDERS,
TOGGLE_FOLDERS_COLLAPSE,
TOGGLE_TAGS_COLLAPSE,
SELECT_FOLDER,
SELECT_PREVIOUS_FOLDER, 
SELECT_NEXT_FOLDER,
SET_SEARCH_CRITERION,
SELECT_DOCUMENT,
CREATE_NEW_DOCUMENT,
UPDATE_DOCUMENT_CONTENT,
 } from "./constants";

 import foldersTree from './folders-tree'

 import {Folder, Document, ApplicationState, FoldersPanelState, DocumentsPanelState} from './types'

let documentsCurrentId = 10;
function getNextDocumentId() : number
{
    return ++documentsCurrentId;
}

const applicationState: ApplicationState = {
    initialLoadDone : false
}

const foldersPanel : FoldersPanelState = {
    foldersExpanded: false,
    tagsExpanded: false,
    selectedFolderId: 0
};

const documentsFolder : DocumentsPanelState = {
    searchFieldContent: "",
    selectedFolderId: 0,
    documents: [],    
    selectedDocumentId: 0
};

export function applicationReducer(state : ApplicationState = applicationState, action) : ApplicationState {
    if (action.type == DATA_LOADED) {        
        return {
            ...state,
            initialLoadDone: true
        }
    }

    return state;
}

export function foldersReducer(state : FoldersPanelState = foldersPanel, action) : FoldersPanelState{
    if (action.type === EXPAND_FOLDERS) {
        return {...state, 
        foldersExpanded : true        
        }
    }
    else if(action.type === COLLAPSE_FOLDERS) {
        return {...state, 
                foldersExpanded: false
                }
    }
    else if (action.type === TOGGLE_FOLDERS_COLLAPSE) {
        return { ...state, 
                foldersExpanded: !state.foldersExpanded,
                 }
    }
    else if (action.type === TOGGLE_TAGS_COLLAPSE) {
        return { ...state, tagsExpanded: !state.tagsExpanded }
    }
    else if (action.type === SELECT_FOLDER) {
        return { ...state, 
            selectedFolderId: action.folderId }
    }    
    
    return state;
}

function getSelectedDocuments(documents : Array<Document>, selectedFolderId : number, searchFieldContent : string) {
    
    const flatFoldersList = foldersTree.flatMap((folder) => folder.hasOwnProperty('subfolders') ? [folder].concat(folder.subfolders) : [folder]);
    const selectedFolders = flatFoldersList.filter(x => x.id === selectedFolderId).
        flatMap(folder => folder.hasOwnProperty('subfolders') ? [folder.id].concat(folder.subfolders.map(x => x.id)) : [folder.id]);
    
    return documents.
        filter(doc => selectedFolders.find(folderId => folderId === doc.folderId) != undefined).
        filter(doc => doc.content.includes(searchFieldContent));
}

function getSelectedDocumentId(documents : Array<Document>, selectedFolderId : number, searchFieldContent : string, selectedDocumentId : number)
{
    const selectedDocuments = getSelectedDocuments(documents, selectedFolderId, searchFieldContent);    
    return selectedDocuments.find(d => d.id === selectedDocumentId) === undefined ? 
        ((selectedDocuments.length > 0) ? selectedDocuments[0].id : -1) :
        selectedDocumentId;
}

export function documentsReducer(state : DocumentsPanelState = documentsFolder, action) : DocumentsPanelState{
    if(action.type === DATA_LOADED) {
        return {
            ...state,
            documents: action.data,
            selectedDocumentId: getSelectedDocumentId(action.data, state.selectedFolderId, state.searchFieldContent, state.selectedDocumentId)
        }        
    }
    else if (action.type === SELECT_FOLDER) {        
        return {
            ...state,                                    
            selectedFolderId: action.folderId,
            selectedDocumentId: getSelectedDocumentId(state.documents, action.folderId, state.searchFieldContent, state.selectedDocumentId)
        };            
    }    
    else if (action.type === SELECT_DOCUMENT) {
        return {
            ...state,
            selectedDocumentId: action.documentId
        }
    }
    else if (action.type === SET_SEARCH_CRITERION) {
        return {
            ...state,
            searchFieldContent: state.searchFieldContent
        }
    }
    else if (action.type === CREATE_NEW_DOCUMENT) {
        return {
            ...state,
            documents: state.documents.concat({ owner: "", date: "1y", folderId: state.selectedFolderId, id: getNextDocumentId(), content: "" })
        }
    }
    else if (action.type === UPDATE_DOCUMENT_CONTENT) {
        return {...state,
                documents: state.documents.map(x => x.id != action.id ? x : {...x, content: action.content})
        }
    }

    return state;
}



