
import React, {useRef, useEffect} from 'react';
import './NavigationPanel.scss';
import { connect } from 'react-redux';
import {expandFolders, collapseFolders, toggleFoldersCollapse, toggleTagsCollapse, selectFolder, selectNextFolder, selectPreviousFolder, logOut} from '../actions';
import foldersTree from '../folders-tree';
import {Folder} from '../types';



function handleUpDownKeyBoardInput(event, props)
{
    event.preventDefault();
    
    if(event.key == 'ArrowDown')
    {
        props.selectNextFolder();
    }
    if(event.key == 'ArrowUp')
    {
        props.selectPreviousFolder();
    }
}

function handleKeyboardInput(event, props)
{
    event.preventDefault();
    handleUpDownKeyBoardInput(event, props);
    if(event.key == 'ArrowRight')
    {
        props.expandFolders();
    }
    if(event.key == 'ArrowLeft')
    {
        props.collapseFolders();
    }
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

function computeFoldersTree(expandedFoldersTree : Array<Folder>, foldersAreExpanded : boolean)
{
    return foldersAreExpanded ? expandedFoldersTree : expandedFoldersTree.map(folder => folder);
}

function mapStateToProps(state) {
    return {
        foldersTree: computeFoldersTree(foldersTree, state.foldersPanel.foldersExpanded),
        foldersExpanded: state.foldersPanel.foldersExpanded,
        tagsExpanded: state.foldersPanel.tagsExpanded,
        selectedFolderId: state.foldersPanel.selectedFolderId
    }    
}

function mapDispatchToProps(dispatch) {
    return {
        expandFolders: () => dispatch(expandFolders()),
        collapseFolders: () => dispatch(collapseFolders()),
        toggleFoldersCollapse: () => dispatch(toggleFoldersCollapse()),
        toggleTagsCollapse: () => dispatch(toggleTagsCollapse()),
        selectFolder: (folderId) => dispatch(selectFolder(folderId)),
        selectNextFolder: () => dispatch(selectNextFolder()),
        selectPreviousFolder: () => dispatch(selectPreviousFolder()),
        logOut: () => dispatch(logOut())
    };
}

function renderSubFolders(props, focusedElementRef) {   
    
    const subfolders = props.foldersTree.find(x => x.name === "notes").subfolders
    .map(folder =>     
        <li key={folder.id}>
        <a href="#"  className={folder.id === props.selectedFolderId ? "nav-item-active" :""} ref={props.selectedFolderId ===  folder.id ? focusedElementRef : null} onClick={() => props.selectFolder(folder.id)} onKeyDown={(event) => handleUpDownKeyBoardInput(event, props)}> 
            <span className="icon-folder-untagged"></span>
            <span className="folder-label">{folder.name}</span>
        </a>
        </li>
    );      

    return (<ul>            
        {subfolders}
    </ul>     );
}

function focusFocusedElement(focusedElementRef) {        
    if(focusedElementRef.current)
        focusedElementRef.current.focus();
} 

function ConnectedNavigationPanel(props) {
    
    const focusedElementRef = useRef(null);
    useEffect(() => {
        focusFocusedElement(focusedElementRef);
    }, [props.selectedFolderId])

    const notesFolderId = props.foldersTree.find(x => x.name === "notes").id;        
    const trashFolderId = props.foldersTree.find(x => x.name === "trash").id;        
    
    return (            
        <nav>
    <div className="settings-panel">
        <span className="icon-connected"></span>
        <a href="#" className="icon-settings" onClick={() => alert('settings')}></a>
    </div>
    <div className="categories">
        <div className="folders">                                
            <a href="#" 
            className={"folders-header" + (props.selectedFolderId === notesFolderId ? " nav-item-active" : "")} 
            ref={props.selectedFolderId === notesFolderId ? focusedElementRef : null} 
            onClick={() => props.selectFolder(notesFolderId)} 
            onKeyDown={(event) => handleKeyboardInput(event, props)}>
                    <span href="#" className="icon-folder-unexpanded" onClick={props.toggleFoldersCollapse}></span>
                    <span className="icon-folder-notes" ></span>
                    <span className="folders-header-caption">Notes</span>                
            </a>    
            {props.foldersExpanded === true && renderSubFolders(props, focusedElementRef)}                                                             
        </div>
        <a href="#" 
        className={"trash" + (props.selectedFolderId === trashFolderId ? " nav-item-active" : "")} 
        onClick={() => props.selectFolder(trashFolderId)} 
        ref={props.selectedFolderId === trashFolderId ? focusedElementRef : null} 
        onKeyDown={(event) => handleUpDownKeyBoardInput(event, props)}>
                <span className="icon-trash"></span>
                <span className="trash-caption">trash</span>
            </a>         
        </div>           
            <ul className="tags">
                <li>
                    <span className="tag-level1">
                        <a href="#" className="icon-expand" onClick={props.toggleTagsCollapse}></a>                     
                        <span className="tag-icon"></span>      
                        <span className="tag">welcome</span>
                    </span>                        
                    {props.tagsExpanded === true && renderSubTags(props)}                                            
                </li>            
    </ul>
        <div className="logout-section">
            <a href="#" className="logout-button" onClick={props.logOut}>Log out</a>
        </div>
</nav>
    )
}   

const NavigationPanel = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavigationPanel);

export default NavigationPanel;
