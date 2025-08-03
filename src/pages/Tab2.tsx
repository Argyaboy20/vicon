import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonIcon
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import '../theme/variables.css'; /* Import shared styling */

/* ===== MAIN COMPONENT ===== */
const Tab2: React.FC = () => {
  /* ===== STATE MANAGEMENT ===== */
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  /* ===== EVENT HANDLERS ===== */
  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /* Implement search functionality here */
    console.log('Searching for:', searchQuery);
    setShowSearchModal(false);
    setSearchQuery('');
  };

  /* ===== RENDER METHOD ===== */
  return (
    <IonPage>
      {/* ===== CUSTOM HEADER WITH GLASSMORPHISM EFFECT ===== */}
      <IonHeader>
        <IonToolbar>
          <div className="toolbar-content">
            {/* Logo and Title Container */}
            <div className="logo-title-container">
              <div className="app-logo">
                VC
              </div>
              <h1 className="app-title">VideoConvert</h1>
            </div>
            
            {/* Search Button */}
            <div className="search-button-container">
              <button 
                className="search-button"
                onClick={toggleSearchModal}
                aria-label="Search"
              >
                <IonIcon icon={searchOutline} />
              </button>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      {/* ===== MAIN CONTENT AREA ===== */}
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>

      {/* ===== SEARCH MODAL ===== */}
      {showSearchModal && (
        <div className="search-modal-overlay" onClick={toggleSearchModal}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-content">
              <div className="search-modal-header">
                <h3 className="search-modal-title">Want to search our conversion tools?</h3>
                <button 
                  className="search-modal-close"
                  onClick={toggleSearchModal}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="search-modal-input"
                  placeholder="Search for tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </form>
              
              {/* Center Icon Container */}
              <div className="search-modal-icon-container">
                <div className="search-modal-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 7V17C3 18.1046 3.89543 19 5 19H9L7 17H5V7H19V10H21V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" fill="currentColor"/>
                    <path d="M14 12.5L16.5 15L21 10.5L19.5 9L16.5 12L15 10.5L14 12.5Z" fill="currentColor"/>
                    <path d="M9 12H15V14H9V12Z" fill="currentColor"/>
                    <path d="M9 8H15V10H9V8Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              
              {/* Bottom Text */}
              <div className="search-modal-text">
                <h3>Explore 1,000+ file conversion tools.</h3>
                <p>Start searching by entering the file type you want to convert. Example: JPG to PNG.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </IonPage>
  );
};

export default Tab2;