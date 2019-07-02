import React from 'react'
import './css/main.scss'

function App() {
  return (
  <div className="application-root">
  <nav>
    <div className="settings-panel">
        <span className="icon-connected"></span>
        <a href="#" className="icon-settings"></a>
    </div>
    <div className="categories">
        <div className="folders">
            <div className="folders-header">
                    <a href="#" className="icon-folder-unexpanded"></a>
                    <span className="icon-folder-notes" ></span>
                    <span className="folders-header-caption">Notes</span>                
            </div>                    
                <ul>                                
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
                    </ul>                                  
        </div>
        <div className="trash">
                <span className="icon-trash"></span>
                <span className="trash-caption">trash</span>
            </div>         
        </div>
        
            
            
            
            <ul className="tags">
                <li>
                    <span className="tag-level1">
                        <a href="#" className="icon-expand"></a>                     
                        <span className="tag-icon"></span>      
                        <span className="tag">welcome</span>
                    </span>                        
                    <ul>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">organize</span></li>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">pro</span></li>
                            <li className="tag-level2"><span className="tag-icon"></span><span className="tag">tags multiword</span></li>
                    </ul>                        
                </li>            
    </ul>

</nav>
<section className="documents-panel">
    <section className="search-panel">
        <input type="text" name="document-search" id="document-search" className="document-search" placeholder="Search Notes" />
        <a href="#" className="search-button" />
    </section>
    <ul>
        <li className="document-preview document-preview__active">
            <div className="document-date">1y</div>
            <h2 className="document-preview-title">Itinéraires - idées</h2>
            <p className="document-preview-content">Zip cheap 2 - à partir de 1629€, 4 arrêts possibles (=5 vols) Par...</p> 
        </li>
        <li className="document-preview">
                <div className="document-date">1y</div>
                <h2 className="document-preview-title">Concurrence - monothread</h2>
                <p className="document-preview-content">#draft Si le title de l'article vous parait contradictoire</p> 
        </li>
        <li className="document-preview">
                <div className="document-date">1y</div>
                <h2 className="document-preview-title">Small writing test with Bear Notes</h2>
                <p className="document-preview-content">Bear note is a simple note taki...</p>                    
        </li>
    </ul>
</section>
<section className="document-content-panel">
    <div className="document-content">
            <p>Itinéraires - idées
                    _*Zip Cheap 2 - à partir de 1629€, 4 arrêts possibles (= 5 vols)*_
                    
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
                </p>
    </div>
    
</section>
</div>
  )
}

export default App