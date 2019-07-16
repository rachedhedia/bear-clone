import { Subject} from 'rxjs'

export const EVENT_DOCUMENT_UPDATE = "EVENT_DOCUMENT_UPDATE";

const documentsUpdate$ = new Subject();
const applicationExit$ = new Subject();

window.onbeforeunload = () => {applicationExit$.next({});}

export {documentsUpdate$, applicationExit$};

