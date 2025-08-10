import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonMenu
} from '@ionic/react';
import { searchOutline, moonOutline, sunnyOutline, menuOutline, documentOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import '../theme/variables.css'; /* Import shared styling */

/* ===== MAIN COMPONENT ===== */
const Tab2: React.FC = () => {
  /* ===== STATE MANAGEMENT ===== */
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  /* ===== NAVIGATION FUNCTIONS ===== */
  const navigateToVideoConverter = () => {
    window.location.href = '/';
  };

  const navigateToFileConverter = () => {
    window.location.href = '/fileconverter';
  };

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

  /* Toggle between dark mode and light mode */
  const toggleDarkMode = (): void => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    // Apply dark mode class to document for global styling
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  /* Initialize dark mode based on system preference */
  const initializeDarkMode = (): void => {
    // Default to light mode (false)
    setIsDarkMode(false);
    // Ensure dark mode class is removed on init
    document.documentElement.classList.remove('dark-mode');
  };

  /* ===== USE EFFECT UNTUK INISIALISASI DARK MODE ===== */
  React.useEffect(() => {
    // Initialize with light mode as default
    initializeDarkMode();
  }, []);

  /* ===== RENDER COMPONENTS ===== */
  const renderHeader = () => (
    <IonHeader>
      <IonToolbar>
        <div className="toolbar-content">
          {/* Desktop Navigation Buttons (Hidden on mobile) */}
          <div className="nav-buttons-container">
            <button
              className="nav-button"
              onClick={navigateToVideoConverter}
              aria-label="Go to Video Converter"
              title="Video Converter"
            >
              Video
            </button>
            <button
              className="nav-button"
              onClick={navigateToFileConverter}
              aria-label="Go to File Converter"
              title="File Converter"
            >
              File
            </button>
          </div>

          {/* Mobile Menu Button (Hidden on desktop) */}
          <div className="menu-button-container">
            <button
              className="mobile-menu-button"
              onClick={() => {
                const menu = document.querySelector('ion-menu') as any;
                if (menu) menu.open();
              }}
              aria-label="Open navigation menu"
              title="Navigation menu"
            >
              <IonIcon icon={menuOutline} />
            </button>
          </div>

          {/* Logo and Title Container */}
          <div className="logo-title-container">
            <img
              src="/logo1.png"
              alt="VideoConvert Logo"
              className="app-logo-image"
            />
            <h1 className="app-title">VideoConvert</h1>
          </div>

          {/* Action Buttons Container */}
          <div className="action-buttons-container">
            {/* Dark Mode Toggle Button */}
            <button
              className="theme-toggle-button"
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} />
            </button>

            {/* Search Button */}
            <button
              className="search-button"
              onClick={toggleSearchModal}
              aria-label="Search"
              title="Search tools"
            >
              <IonIcon icon={searchOutline} />
            </button>
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );

  const renderSearchModal = () => (
    showSearchModal && (
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
                  <path d="M3 7V17C3 18.1046 3.89543 19 5 19H9L7 17H5V7H19V10H21V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z" fill="currentColor" />
                  <path d="M14 12.5L16.5 15L21 10.5L19.5 9L16.5 12L15 10.5L14 12.5Z" fill="currentColor" />
                  <path d="M9 12H15V14H9V12Z" fill="currentColor" />
                  <path d="M9 8H15V10H9V8Z" fill="currentColor" />
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
    )
  );

  {/* Ion Menu di Mobile */}
  const renderMobileMenu = () => (
    <IonMenu contentId="main-content" side="start" className="mobile-nav-menu">
      <div className="mobile-nav-header">
        <h2 className="mobile-nav-title">Menu Convert</h2>
      </div>
      <IonContent>
        <a
          href="#"
          className="mobile-nav-item"
          onClick={(e) => {
            e.preventDefault();
            navigateToVideoConverter();
            // Close menu after navigation
            const menu = document.querySelector('ion-menu') as any;
            if (menu) menu.close();
          }}
        >
          <IonIcon icon={documentOutline} />
          <span>Video Converter</span>
        </a>
        <a
          href="#"
          className="mobile-nav-item"
          onClick={(e) => {
            e.preventDefault();
            navigateToFileConverter();
            // Close menu after navigation
            const menu = document.querySelector('ion-menu') as any;
            if (menu) menu.close();
          }}
        >
          <IonIcon icon={documentOutline} />
          <span>File Converter</span>
        </a>
      </IonContent>
    </IonMenu>
  );

  /* ===== MAIN RENDER ===== */
  return (
    <>
      {/* Mobile Menu - Tambahkan ini SEBELUM IonPage */}
      {renderMobileMenu()}

      <IonPage id="main-content">
        {renderHeader()}

        {/* ===== MAIN CONTENT AREA ===== */}
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Tab 2</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Tab 2 page" />
        </IonContent>

        {/* Search Modal */}
        {renderSearchModal()}
      </IonPage>
    </>
  );
};

export default Tab2;