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