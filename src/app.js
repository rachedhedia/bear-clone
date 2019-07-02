import React from 'react'
import './css/main.scss'
import NavigationPanel from './navigation-panel/component.js'
import DocumentsPanel from './documents-panel/component.js'
import DocumentPanel from './document-panel/component.js'

const fakeDocuments= [
    {
        date: '1y',
        title: 'Itinéraires - idées',
        content: `_*Zip Cheap 2 - à partir de 1629€, 4 arrêts possibles (= 5 vols)*_
        
        Paris - Tokyo
        Manille - Cairns
        Auckland-Iles Cook (Papeete en option)
        Iles Cook - Buenos Aires
        Buenos Aires - Paris
        
        _*_A ajouter séparément:_*_
        
            * Osaka - Shanghai - 95€
            * Hong Kong - Katmandou - 220€
            * Katmandou - Bangkok - 129€
            * Bangkok - Rangoon - 40€
            * Rangoon - Siem Reap - 40€
            * Ho Chi Minh - Manille - 75€
            * Manille - Melbourne - 130€
            * Melbourne- Alice Springs - 130€
            * Alice Springs - Cairns - 230€
            * Sydney - Christchurch - 85€
        Total : 1174€
        *Total billets (sans Papeete, sans ile de pâques mais avec Iles Cook) : 2803€*
        *Total billets (avec Papeete, sans ile de pâques) : ?*
        
        _*Zip cool 3 - à partir de 2149€, 6 arrêts possibles (Papeete non inclus - 600€ pour l’inclure - total 2749€)*_==> pas très interessant, un arrêt obligatoire en Amérique du nord
        
        Paris - Katmandou (supplément) ou Paris - Tokyo sans supplément
        Manille - Cairns
        Auckland - Santiago
        Santiago - Ile de pâques (en option)
        Ile de pâques - Santiago
        Buenos Aires - Paris
        
        _*_A ajouter séparément:_*_
        
        *Si arrivée à Katmandou:*
            * Katmandou - Tokyo - 230€
            * Osaka - Shanghai - 95€
            * Hong Kong - Bangkok - 70€
            * Bangkok - Rangoon - 40€
            * Rangoon - Siem Reap - 40€
            * Ho Chi Minh - Manille - 75€
            * Sydney - Alice Springs - 130€
            * Alice Springs - Melbourne - 130€
            * Melbourne - Christchurch - 120€
        Total : 930€
        *Total billets (sans Papeete) : 3070 (+ supplément Katmandou)*
        *Total billets (avec Papeete) : 3670 (+ supplément Katmandou)*
        
        *Si arrivée à Tokyo:*
            * Osaka - Shanghai - 95€
            * Hong Kong - Katmandou - 220€
            * Katmandou - Bangkok - 129€
            * Bangkok - Rangoon - 40€
            * Rangoon - Siem Reap - 40€
            * Ho Chi Minh - Manille - 75€
            * Sydney - Alice Springs - 130€
            * Alice Springs - Melbourne - 130€
            * Melbourne - Christchurch - 120€
        Total : 979€
        *Total billets (sans Papeete) : 3128*
        *Total billets (avec Papeete) : 3728*
        
        Note : Changement des dates des vols sans frais.
        
        _*Zip cool 4 - à partir de 2399€, 6 arrêts possibles => Ca marche pas, cette offre comprends pas l’Amérique du Sud*_
        
        _*Zip cool 5 - à partir de 2729€, 5 arrêt possibles.*_
        
        Paris — Katmandou (supplément)
        Manille - Cairns
        Auckland - Papeete
        Papeete - Ile de pâques
        Ile de pâques - Santiago
        Buenos Aires - Paris
        
        _A ajouter séparément:_
        
        Katmandou - Tokyo
        Osaka-Shanghai
        Hong Kong - Bangkok
        Bangkok - Rangoon
        Rangoon - Siem Reap
        Ho Chi Minh - Manille
        Sydney - Alice Springs
        Alice Springs Melbourne
        Melbourne - Christchurch
        
        _*Zip cool 7 - à partir de 3149€*_
        
        Paris - Katmandou
        Katmandou - Tokyo
        Manille - Cairns
        Auckland - Papeete
        Papeete - Ile de pâques
        Ile de pâques - Santiago
        Buenos Aires - Paris
        
        _A ajouter séparément:_
        
        Osaka - Shanghai
        Hong Kong - Bangkok
        Bangkok - Rangoon
        Rangoon - Siem Reap
        Ho Chi Minh - Manille
        Sydney - Alice Springs
        Alice Springs - Melbourne
        Melbourne - Christchurch`  },
    {
        date: '1y',
        title: 'Concurrence - monothread',
        content: `#draft
        Si le titre de l’article vous parait contradictoire
        `
    },
    {
        date: '1y',
        title: 'Small writing test with Bear Notes',
        content: `Bear note is a simple note taking app. It works only on Mac devices. Free version doesn’t sync your work. Paid version do.

        The application is very well designed. It’s one of it’s main strength. It’s classification system is another strength of the app. 
        
        # Features
        ## Tags
        Let’s try using the tags. Usage is very simple: put a hashtag in front of a word and it will be considered as a tag. All notes containing the same tag are grouped together.
        #Test1 That's it. The note appears on the left panel, in the tags tree.
        Let’s add another tag: #my special tag#
        You can also add a hierarchy in the tags.
        #first level/second level#
        
        ## Pictures
        To insert pictures simply drag & drop the picture`
    }
];

function App() {
  return (
  <div className="application-root">
  <NavigationPanel></NavigationPanel>
<DocumentsPanel documents={fakeDocuments}></DocumentsPanel>
<DocumentPanel documentContent={fakeDocuments[0].content}></DocumentPanel>

</div>
  )
}

export default App