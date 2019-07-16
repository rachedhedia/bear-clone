import {Observable, Subject, merge} from 'rxjs';
import {map, debounceTime, withLatestFrom, scan, startWith, switchMap, filter, tap} from 'rxjs/operators';
import {CREATE_DOCUMENT, UPDATE_DOCUMENT_CONTENT} from './constants';
import {Document} from './types'

interface ToBePersistedData {
    creates: Array<Document>,
    updates: Array<{id: number, content: string}>
}

function aggregateDataUpdates(acc : ToBePersistedData, curr: any) {
    if(curr.type === CREATE_DOCUMENT)
    {
        return {...acc, creates: [...acc.creates, curr.newDocument]};
    }
    else if(curr.type === UPDATE_DOCUMENT_CONTENT)
    {   
        let rebuiltUpdates = acc.updates.find(x => x.id === curr.id) ? 
            acc.updates.map(x => x.id === curr.id ? {...x, content : curr.content} : x) :
            [...acc.updates, {id: curr.id, content: curr.content}];        

        return {...acc, updates: rebuiltUpdates};
        
    }
    
    return acc;
}

function persistData(toBePersistedData : ToBePersistedData, firestore : any) {
    console.log(JSON.stringify(toBePersistedData));

    const batch = firestore.batch();
    
    toBePersistedData.creates.forEach(x => {
        const docRef = firestore.collection('documents').doc(x.id);
        batch.set(docRef, {
            owner: x.owner, 
            date: x.date, 
            folderId: x.folderId,             
            content: x.content
        })
    })

    toBePersistedData.updates.forEach(x => {
        const docRef = firestore.collection('documents').doc(x.id);
        batch.update(docRef,
            {
                content: x.content
            }
        );
    })

    batch.commit();
}

export default function initDataStore(  dataUpdate$ : Observable<any>, 
                                        applicationExit$ : Observable<any>,
                                        debounceTimeInSeconds : number,
                                        firestore: any) {

    const debounceTimeInMilliseconds = debounceTimeInSeconds * 1000;
    let aggregatedDataUpdates$ = dataUpdate$.
    pipe(
        scan((acc, curr) => aggregateDataUpdates(acc, curr), {creates: [], updates: []})        
    );
    
    let dataPersisted$ = new Subject<any>();
    
    let toBePersistedData$ = dataPersisted$.pipe(
        startWith({}),
        switchMap(x => aggregatedDataUpdates$.pipe(startWith({creates: [], updates: []})))        
    );    

    let lastDataUpdateOlderThan10seconds$ = toBePersistedData$.pipe(debounceTime(debounceTimeInMilliseconds));
    let applicationExitWithUnsavedData$ = applicationExit$.pipe(withLatestFrom(toBePersistedData$), map(([_, second]) => second));
    
    merge(lastDataUpdateOlderThan10seconds$, applicationExitWithUnsavedData$).
    pipe(filter(x => x.creates.length > 0 || x.updates.length > 0)).    
    subscribe(x => {persistData(x, firestore); dataPersisted$.next({})});
}