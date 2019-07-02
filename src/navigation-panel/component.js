import React, {useState} from 'react';
import './component.scss';

function renderSubFolders()
{
    return (<ul>                                
        <li>
            <span className="icon-folder-untagged"></span>
            <span className="folder-label">untagged</span>
        </li>
        <li>
                <span className="icon-folder-todo"></span>
                <span className="folder-label">todo</span>                                
        </li>
        <li>
                <span className="icon-folder-today"></span>
                <span className="folder-label">today</span>                                                                
        </li>
    </ul>     );
}

function renderSubTags() {
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
            <div className="folders-header">
                    <a href="#" className="icon-folder-unexpanded" onClick={() => setFoldersExpanded(!foldersExpanded)}></a>
                    <span className="icon-folder-notes" ></span>
                    <span className="folders-header-caption">Notes</span>                
            </div>    
            {foldersExpanded === true && renderSubFolders()}                                                             
        </div>
        <div className="trash">
                <span className="icon-trash"></span>
                <span className="trash-caption">trash</span>
            </div>         
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
