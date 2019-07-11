export interface Folder {
    name: string,
    id: number,
    subfolders?: Array<Folder>
}

export interface Document {
    owner: string,
    date: string,
    id: string,
    folderId: number,
    content: string
};

export interface ApplicationState {
    idsGenerator: () => string,
    documentsUpdateSubject: object,
    initialLoadDone: boolean,
    loggedUserEmail: string    
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
    selectedDocumentId: string
}

export interface GlobalState {    
    applicationState: ApplicationState,
    foldersPanel: FoldersPanelState,
    documentsFolder: DocumentsPanelState
}