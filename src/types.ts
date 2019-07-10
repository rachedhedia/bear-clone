export interface Folder {
    name: string,
    id: number,
    subfolders?: Array<Folder>
}

export interface Document {
    owner: string,
    date: string,
    id: number,
    folderId: number,
    content: string
};

export interface ApplicationState {
    initialLoadDone: boolean
}

export interface FoldersPanelState {    
    foldersExpanded: boolean,
    tagsExpanded: boolean,
    selectedFolderId: number
}

export interface DocumentsPanelState {
    searchFieldContent: string,    
    selectedFolderId: number,
    documents: Array<Document>,     
    selectedDocumentId: number
}

export interface GlobalState {
    applicationState: ApplicationState,
    foldersPanel: FoldersPanelState,
    documentsFolder: DocumentsPanelState
}