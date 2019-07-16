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