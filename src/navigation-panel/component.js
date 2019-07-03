import React, {useState} from 'react';
import './component.scss';

function handleUpDownKeyBoardInput(event, props, areFoldersExpanded)
{
    const foldersList = props.folders.flatMap((folder) => {
        let foldersList = [folder];
        if(folder.hasOwnProperty('subfolders') && areFoldersExpanded)
        {
            foldersList = foldersList.concat(folder.subfolders);            
            
        }
        return foldersList;
    });

    if(event.key == 'ArrowDown')
    {
        const currentFolderIndex = foldersList.findIndex(folder => folder.id === props.activeFolderId);        
        const nextFolderIndex = currentFolderIndex < foldersList.length - 1 ? currentFolderIndex + 1 : 0;
        props.setActiveFolderId(foldersList[nextFolderIndex].id);
    }
    if(event.key == 'ArrowUp')
    {
        const currentFolderIndex = foldersList.findIndex(folder => folder.id === props.activeFolderId);        
        const prevFolderIndex = currentFolderIndex > 0  ? currentFolderIndex - 1 : foldersList.length - 1;        
        props.setActiveFolderId(foldersList[prevFolderIndex].id);
    }
}

function handleKeyboardInput(event, props, areFoldersExpanded, setFoldersExpanded)
{
    handleUpDownKeyBoardInput(event, props, areFoldersExpanded);
    if(event.key == 'ArrowRight')
    {
        setFoldersExpanded(true);
    }
    if(event.key == 'ArrowLeft')
    {
        setFoldersExpanded(false);
    }
}

function renderSubFolders(props)
{   
    const subfolders = props.folders.
    filter(folder => folder.label === 'notes').
    map(folder => folder.subfolders).pop().
    map(folder =>     
        <li key={folder.id}>
        <a href="#"  className={folder.id === props.activeFolderId ? "nav-item-active" :""} onClick={() => props.setActiveFolderId(folder.id)} onKeyDown={(event) => handleUpDownKeyBoardInput(event, props, true)}> 
            <span className="icon-folder-untagged"></span>
            <span className="folder-label">{folder.label}</span>
        </a>
        </li>
    );      

    return (<ul>            
        {subfolders}
    </ul>     );
}

function renderSubTags(props) {
    return (
        <ul>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">organize</span></li>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">pro</span></li>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">tags multiword</span></li>
                    </ul>
    );
}

function NavigationPanel(props) {

    const [foldersExpanded, setFoldersExpanded] = useState(false);
    const [tagsExpanded, setTagsExpanded] = useState(false);
    
    return (
        <nav>
    <div className="settings-panel">
        <span className="icon-connected"></span>
        <a href="#" className="icon-settings" onClick={() => alert('settings')}></a>
    </div>
    <div className="categories">
        <div className="folders">
            <a href="#" className={props.activeFolderId === props.folders.filter(folder => folder.label === 'notes').pop().id ? "folders-header nav-item-active" : "folders-header"} onClick={() => props.setActiveFolderId(props.folders.filter(folder => folder.label === 'notes').pop().id)} onKeyDown={(event) => handleKeyboardInput(event, props, foldersExpanded, setFoldersExpanded)}>
                    <span href="#" className="icon-folder-unexpanded" onClick={() => setFoldersExpanded(!foldersExpanded)}></span>
                    <span className="icon-folder-notes" ></span>
                    <span className="folders-header-caption">Notes</span>                
            </a>    
            {foldersExpanded === true && renderSubFolders(props)}                                                             
        </div>
        <a href="#" className={props.activeFolderId === props.folders.filter(folder => folder.label === 'trash').pop().id ? "trash nav-item-active"  : "trash"} onClick={() => props.setActiveFolderId(props.folders.filter(folder => folder.label === 'trash').pop().id)} onKeyDown={(event) => handleUpDownKeyBoardInput(event, props, foldersExpanded)}>
                <span className="icon-trash"></span>
                <span className="trash-caption">trash</span>
            </a>         
        </div>           
            <ul className="tags">
                <li>
                    <span className="tag-level1">
                        <a href="#" className="icon-expand" onClick={() => setTagsExpanded(!tagsExpanded)}></a>                     
                        <span className="tag-icon"></span>      
                        <span className="tag">welcome</span>
                    </span>                        
                    {tagsExpanded === true && renderSubTags()}                                            
                </li>            
    </ul>

</nav>
    )
}

export default NavigationPanel;
