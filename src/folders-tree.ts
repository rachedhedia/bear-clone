import {Folder} from './types'

const foldersTree : Array<Folder> = [
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
        }
]

export default foldersTree;