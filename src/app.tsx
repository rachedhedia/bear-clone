import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import './css/main.scss'
import NavigationPanel from './navigation-panel/NavigationPanel'
import DocumentsPanel from './documents-panel/DocumentsPanel'
import DocumentPanel from './document-panel/DocumentPanel'
import {loadData, exitApplication} from './actions'
import {GlobalState} from './types'

function mapStateToProps(state : GlobalState) {
    return {
        initialLoadDone: state.applicationState.initialLoadDone,
        loggedUserEmail: state.applicationState.loggedUserEmail        
    }
}

function mapDispatchToProps(dispatch : any) {
    return {
        loadData: (loggedUserEmail : string, firestore : any) => dispatch(loadData(loggedUserEmail, firestore)),
        exitApplication: () => dispatch(exitApplication())
    }
}

function ConnectedApp(props) {  
    
    useEffect(() => {        
         
        if(!props.initialLoadDone) {            
            props.loadData(props.loggedUserEmail, props.firebase.firestore());
        }       
    }    
    );
        return (
            <div className="application-root">
                <NavigationPanel></NavigationPanel>
                <DocumentsPanel></DocumentsPanel>
                <DocumentPanel></DocumentPanel>
    
            </div>
        )    
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
export default App