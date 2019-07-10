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

 import {Folder, Document} from './types'

interface ApplicationState {
    initialLoadDone: boolean
}

interface FoldersPanelState {
    foldersTree: Array<Folder>, // --> if it represents the actual folder tree based on folders expanded, it's a derived data, but if it's
    // the whole folder tree then it's a constant that can be put somewhere else (in a file containing some sort of config)
    foldersExpanded: boolean,
    tagsExpanded: boolean,
    selectedFolderId: number
}

interface DocumentsPanelState {
    searchFieldContent: string,
    selectedFolders: Array<number>, // --> derived data of selectedFolderId
    documents: Array<Document>, 
    selectedDocuments: Array<Document>, // --> derived data of documents + selectedFolderId + searchFieldContent
    selectedDocumentId: number
}

interface DocumentPanelState {
    selectedDocumentId: number,
    documents: Array<Document>,
    content : string // --> derived data of documents + selectedDocumentId
}

function expandedFoldersTree() : Array<Folder> {
    return [
        {   name: "notes", 
            id: 0,
            subfolders: [
                {   name: "untagged",
                    id: 1 },
                {   name: "todo",
                    id: 2 },
                {   name: "today",
                    id: 3}
            ]
        },
        {   name: "trash",
            id: 5
        }];
}

function collapsedFoldersTree() : Array<Folder> {
    return [
        {name: "notes",
         id: 0         
        },
        {name: "trash",
         id: 5}

    ]
}

function buildFlatFoldersList(foldersTree : Array<Folder>) : Array<Folder> {
    return foldersTree.flatMap((folder) => folder.hasOwnProperty('subfolders') ? [folder].concat(folder.subfolders) : [folder]);        
}

function buildSelectedDocuments(documents : Array<Document>, selectedFolders : Array<number>, searchFieldContent : string) : Array<Document> {
    return documents.
        filter(doc => selectedFolders.find(folderId => folderId === doc.folderId) != undefined).
        filter(doc => doc.content.includes(searchFieldContent));
}

function buildSelectedFolders(selectedFolderId : number) : Array<number> {
    const selectedFolders = buildFlatFoldersList(expandedFoldersTree()).
        filter(x => x.id === selectedFolderId).
        flatMap(folder => folder.hasOwnProperty('subfolders') ? [folder.id].concat(folder.subfolders.map(x => x.id)) : [folder.id]);
        console.log(selectedFolders);
        return selectedFolders;
}

let documentsCurrentId = 10;
function getNextDocumentId() : number
{
    return ++documentsCurrentId;
}

const applicationState: ApplicationState = {
    initialLoadDone : false
}

const foldersPanel : FoldersPanelState = {
    foldersTree: collapsedFoldersTree(),
    foldersExpanded: false,
    tagsExpanded: false,
    selectedFolderId: 0
};

const documentsFolder : DocumentsPanelState = {
    searchFieldContent: "",
    selectedFolders: buildSelectedFolders(0),
    documents: [],
    selectedDocuments: buildSelectedDocuments([], buildSelectedFolders(1), ""),
    selectedDocumentId: 0
};
const document : DocumentPanelState = {
    selectedDocumentId: 0,
    documents: [],
    content : ""
};

function computeNextFolderId(foldersTree : Array<Folder>, selectedFolderId : number) : number
{
    const flatFoldersList = buildFlatFoldersList(foldersTree);
    const selectedFolderIndex = flatFoldersList.findIndex(folder => folder.id === selectedFolderId);
    return selectedFolderIndex < flatFoldersList.length - 1 ? flatFoldersList[selectedFolderIndex + 1].id : flatFoldersList[0].id;
}

function computePreviousFolderId(foldersTree : Array<Folder>, selectedFolderId : number) : number
{
    const flatFoldersList = buildFlatFoldersList(foldersTree);
    const selectedFolderIndex = flatFoldersList.findIndex(folder => folder.id === selectedFolderId);
    return selectedFolderIndex > 0 ? flatFoldersList[selectedFolderIndex - 1].id : flatFoldersList[flatFoldersList.length - 1].id
}

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
        foldersExpanded : true,
        foldersTree: expandedFoldersTree() 
        }
    }
    else if(action.type === COLLAPSE_FOLDERS) {
        return {...state, 
                foldersExpanded: false,
                foldersTree: collapsedFoldersTree() }
    }
    else if (action.type === TOGGLE_FOLDERS_COLLAPSE) {
        return { ...state, 
                foldersExpanded: !state.foldersExpanded,
                foldersTree: state.foldersExpanded ? collapsedFoldersTree() : expandedFoldersTree() }
    }
    else if (action.type === TOGGLE_TAGS_COLLAPSE) {
        return { ...state, tagsExpanded: !state.tagsExpanded }
    }
    else if (action.type === SELECT_FOLDER) {
        return { ...state, selectedFolderId: action.folderId }
    }
    else if (action.type === SELECT_NEXT_FOLDER) {              
        return { ...state, selectedFolderId: computeNextFolderId(state.foldersTree, state.selectedFolderId)}
    }
    else if (action.type === SELECT_PREVIOUS_FOLDER) {        
        return { ...state, selectedFolderId: computePreviousFolderId(state.foldersTree, state.selectedFolderId) }
    }
    
    return state;
}

export function documentsReducer(state : DocumentsPanelState = documentsFolder, action) : DocumentsPanelState{
    if(action.type === DATA_LOADED) {
        return {
            ...state,
            documents: action.data,
            selectedDocuments: buildSelectedDocuments(action.data, state.selectedFolders, state.searchFieldContent)            
        }        
    }
    else if (action.type === SELECT_FOLDER) {        
        return {
            ...state,                                    
            selectedFolders: buildSelectedFolders(action.folderId),
            selectedDocuments: buildSelectedDocuments(state.documents, buildSelectedFolders(action.folderId), state.searchFieldContent)
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
            searchFieldContent: state.searchFieldContent,
            selectedDocuments: buildSelectedDocuments(state.documents, state.selectedFolders, action.searchFieldContent)
        }
    }
    else if (action.type === CREATE_NEW_DOCUMENT) {
        return {
            ...state,
            documents: state.documents.concat({ owner: "", date: "1y", folderId: state.selectedFolders[0], id: getNextDocumentId(), content: "" }),
            selectedDocuments: buildSelectedDocuments(state.documents, state.selectedFolders, state.searchFieldContent)
        }
    }
    else if (action.type === UPDATE_DOCUMENT_CONTENT) {
        return {...state,
                documents: state.documents.map(x => x.id != action.id ? x : {...x, content: action.content}),
                selectedDocuments: buildSelectedDocuments(state.documents, state.selectedFolders, state.searchFieldContent)}
    }

    return state;
}

export function documentReducer(state : DocumentPanelState = document, action) : DocumentPanelState {
    if (action.type === DATA_LOADED) {
        console.log(JSON.stringify(action));
        return {
            ...state,
            documents: action.data//,
            //content: action.data.find(x => x.id === state.selectedDocumentId) != -1 ? action.data.find(x => x.id == action.documentId).content : ""
        }
    }
    if (action.type === SELECT_DOCUMENT) {
        return {
            ...state,
            content: state.documents.find(x => x.id == action.documentId).content
        }
    }
    if (action.type === UPDATE_DOCUMENT_CONTENT) {
        return {...state,
            content: action.content}
    }

    return state;
}

