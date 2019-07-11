import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login'
import {applicationReducer, foldersReducer, documentsReducer} from './reducers'
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from "react-redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import documentsUpdateSubject from './documents-update-subject'
import {debounceTime} from 'rxjs/operators'

/*
{
  foldersList
  selectedFolder
},
{
  selectedDocument,
  documentsList
},
{
  documentContent
}

What are the events ?
UI events:
- Expand folder clicked from UI --> expand or collapse folders
- Folder clicked from UI
- Document clicked from UI
- Document create button clicked from UI
- Document edit made from UI
- Search box filled from UI
- Expand tags clicked from UI --> expand or collapse folders
- Tag clicked from UI

External events:
- Document created from outside
- Document modified from outside

implement in reactive style:
- What are the observables:
  - folder expand click
  - folder click
  - document click
  - document create button click
  - document modify
  - search box fill
  - tag expand click
  - tag click
  - document update (add/remove/modify)

- What should be merged:
  - folder expand click
  - folder click
  - document click
  - document create button click + document update filtered on new
  - document modify + document update filtered on modify
  - search box fill
  - tag expand click

- What is the application state:
  - Folders:
    - expanded/not expanded
    - selected folder
  - tags:
    - expanded/not expanded
    - selected tag
  - Documents:
    - list of documents
    - selected document
  - Search box:
    - content
  - Editor pane
    - content

- What are the links between the application state and the events?
  - folder expand click:
      * folders.expanded/not expanded
  - folder click:
      * folders.selected folder
        * documents.list of documents
        * documents.selected document
          * editor pane.content
  - document click:
      * documents.selected document
        * editor pane.content
  - document create button click:
      * documents.list of documents  
      * documents.selected document
      * editor pane.content
  - document update filtered on new:
      * documents.list of documents
  - document modify:
      * documents.list of documents
      * editor pane.content
      
Modelise in reactive:

FirebaseUpdate event (delta)*         | (keep all events that have a greater timestamp than actual)
New document button click (delta)*    |
Document edit event (delta)*          |--> documentsStoreUpdate event (debounce time)   | FirebaseUpdate event*
                                        folder click event*                             | 
                                        Document click event*                           |
                                        Search field fill event*                        |--> FilteredDocumentsUpdate event


                                        




* The expanded/toggled state is the result of a reduce function applied to the expand folder icon click events
* The displayed documents list is a result of the search box content stream applied to the documents update stream
* The document update stream is a result of the document update with highest timestamp event emitted (delta or head ?) from internal and external document update event streams
* The external document update stream is a stream built on top of the firebase update event
* The internal document update stream is a stream combination of the new document stream and document content update stream

  - folderExpandButtonClick$.
      scan((expanded, click) => expanded = !expanded); --> use the boolean to display the folders list or not      
  - documentsUpdateFromFolderSelection = folderclick$.
      switchMap(foldername => ajax(foldername)); // requests n documents
  - documentsUpdateFromExternal = firebaseUpdate$.
      map(documentUpdate => list of documents).
      filter(document => document.folder === currentFolder).
      take(n); // take the n documents in the list
  - documentsUpdate = documentsUpdateFromFolderSelection.merge(documentsUpdateFromExternal);
  - documentsUpdateFromSearchFilter.
      startsWith("").
      debounceTime(400).
      map(event => event.text);  

      
RxJs modelisation  approach:
* Definir le status de l'application
* Definir les objets qui communiquent
* Definir les evenements qui peuvent arriver --> programmation evenementiel
  * Evenements de premier ordre --> lancés par l'utilisateur ou par une source externe
  * Evenement d'ordre supérieur --> évènements générés en réponse à un évènement de premier niveau
* Definir les liens entre les évènements de façon descriptive --> programmation reactive
* Traduire tout ça en rx

--> Ce qu'apporte la programmation reactive dans cette modélisation : la possibilité de combiner des flux d'évènement et aussi de pouvoir 
représenter des flux d'évènements (notion d'évènement dans le temps, avec des operations qui prennent en compte cette dimension temporelle)
      
      


*/

/*
Ce que je veux : toute les 30 secondes, ou avant de quitter l'application, après qu'il y ait eu une last modification des documents 
(create/update/delete), que les modifications soit persistés sur firebase avec retry si necessaire
Pour se faire, il faut modéliser ça par des stream:
  * Update event --> Aggrège les creates et updates                                   |
  * Delete event --> Clear les updates/create et ne conserve que le document delete   |
  * Create event                                                                      | Debounce (30s)          |
  *                                                                                     Close application event | Persist to store                                       
Documents CUD events --> debounce --------------->  |
Documents CUD events + Close application event -->  | switch --> persist to store
To emit events:
* user interaction (create/delete/update) --> redux-thunk/saga (CREATE_DOCUMENT/UPDATE_DOCUMENT/DELETE_DOCUMENT - DOCUMENT_CREATED + fire rxEvent/DOCUMENT_UPDATED + fire rxEvent/DOCUMENT_DELETED + fire rxEvent) (- Need rx to compose events, cannot do it in redux-saga)
* Questions : 
  * Why not directly updating firebase on each update --> updates limited to 20k per day, if updates are performed on each user keyboard key press, the limit will be exploded
  * Why not turning off the network access for firebase client, and only reactivating it after the updates queue reach a certain size ? --> based on the documentation, the client would replay the updates, meaning, it'll generate a burst of writes when the client reconnects 
  * Why not throttling the Markdown editor updates ? --> It means having the application update at the same rate as the database (previews would update at the same speed), not great for user experience
  * Why not doing it in reducer function ? --> Want to keep them side effect free
  * Why not doing it in redux-thunk or redux-saga --> I want to compose streams (aggregate updates, delete remove previous update/create)  
  * Why not using redux-thunk instead or redux-saga ? No real reasons, they both do the same thing - ie : let us provide a function that produces events (actions in redux terminology) over time - it enables the following pattern : source event : SRC_EVENT to be split between an SRC_EVENT_START and SRC_EVENT_END with treatments in between
*/

const loggerMiddleware = createLogger()

let store = createStore(
    combineReducers({
    applicationState: applicationReducer,
    foldersPanel: foldersReducer,
    documentsFolder: documentsReducer    
    }), 
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );


documentsUpdateSubject.pipe(
  debounceTime(2000)).
subscribe(event => console.log('document update : ' + JSON.stringify(event)));



ReactDOM.render(
<Provider store={store}>
    <Login />
</Provider>, 
  document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
  }
