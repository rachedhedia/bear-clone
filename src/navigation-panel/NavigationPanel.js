
import React, {useState} from 'react';
import './NavigationPanel.scss';
import firebase from 'firebase/app'

function handleUpDownKeyBoardInput(event, props, areFoldersExpanded)
{
    event.preventDefault();
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
    event.preventDefault();
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

function renderSubTags(props) {
    return (
        <ul>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">organize</span></li>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">pro</span></li>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">tags multiword</span></li>
                    </ul>
    );
}

class NavigationPanel extends React.Component {

    constructor(props) {
        super(props);
        this.focusedElementRef = React.createRef();
        this.focusFocusedElement = this.focusFocusedElement.bind(this);
        this.renderSubFolders = this.renderSubFolders.bind(this);
        this.setFoldersExpanded = this.setFoldersExpanded.bind(this);
        this.setTagsExpanded = this.setTagsExpanded.bind(this);
        
        this.state = {
            foldersExpanded: false,
            tagsExpanded: false
          };
    }

    componentDidMount()
    {
        this.focusFocusedElement();
    }

    componentDidUpdate(prevProps)
    {
        if(prevProps.activeFolderId !== this.props.activeFolderId)
        {
            this.focusFocusedElement();
        }        
    }

    setFoldersExpanded(foldersExpanded) {
        this.setState({foldersExpanded: foldersExpanded});
    }

    setTagsExpanded(tagsExpanded) {
        this.setState({tagsExpanded: tagsExpanded});
    }

    focusFocusedElement() {
        console.log('focus acquired');
        this.focusedElementRef.current.focus();
    } 

    renderSubFolders() {   
    const props = this.props;
    const subfolders = props.folders.
    filter(folder => folder.label === 'notes').
    map(folder => folder.subfolders).pop().
    map(folder =>     
        <li key={folder.id}>
        <a href="#"  className={folder.id === props.activeFolderId ? "nav-item-active" :""} ref={props.activeFolderId ===  folder.id ? this.focusedElementRef : ""} onClick={() => props.setActiveFolderId(folder.id)} onKeyDown={(event) => handleUpDownKeyBoardInput(event, props, true)}> 
            <span className="icon-folder-untagged"></span>
            <span className="folder-label">{folder.label}</span>
        </a>
        </li>
    );      

    return (<ul>            
        {subfolders}
    </ul>     );
}

    render() {
        const props = this.props;
        return (
            <nav>
        <div className="settings-panel">
            <span className="icon-connected"></span>
            <a href="#" className="icon-settings" onClick={() => alert('settings')}></a>
        </div>
        <div className="categories">
            <div className="folders">                
                <a href="#" className={props.activeFolderId === props.folders.filter(folder => folder.label === 'notes').pop().id ? "folders-header nav-item-active" : "folders-header"} ref={props.activeFolderId === props.folders.filter(folder => folder.label === 'notes').pop().id ? this.focusedElementRef : ""} onClick={() => props.setActiveFolderId(props.folders.filter(folder => folder.label === 'notes').pop().id)} onKeyDown={(event) => handleKeyboardInput(event, this.props, this.state.foldersExpanded, this.setFoldersExpanded)}>
                        <span href="#" className="icon-folder-unexpanded" onClick={() => this.setState({foldersExpanded : !this.state.foldersExpanded})}></span>
                        <span className="icon-folder-notes" ></span>
                        <span className="folders-header-caption">Notes</span>                
                </a>    
                {this.state.foldersExpanded === true && this.renderSubFolders()}                                                             
            </div>
            <a href="#" className={props.activeFolderId === props.folders.filter(folder => folder.label === 'trash').pop().id ? "trash nav-item-active"  : "trash"} onClick={() => props.setActiveFolderId(props.folders.filter(folder => folder.label === 'trash').pop().id)} ref={props.activeFolderId === props.folders.filter(folder => folder.label === 'trash').pop().id ? this.focusedElementRef : ""} onKeyDown={(event) => handleUpDownKeyBoardInput(event, props, this.state.foldersExpanded)}>
                    <span className="icon-trash"></span>
                    <span className="trash-caption">trash</span>
                </a>         
            </div>           
                <ul className="tags">
                    <li>
                        <span className="tag-level1">
                            <a href="#" className="icon-expand" onClick={() => this.setState({tagsExpanded : !this.state.tagsExpanded})}></a>                     
                            <span className="tag-icon"></span>      
                            <span className="tag">welcome</span>
                        </span>                        
                        {this.state.tagsExpanded === true && renderSubTags()}                                            
                    </li>            
        </ul>
            <div className="logout-section">
                <a href="#" className="logout-button" onClick={() => firebase.auth().signOut()}>Log out</a>
            </div>
    </nav>
        )
    }   
}

export default NavigationPanel;
