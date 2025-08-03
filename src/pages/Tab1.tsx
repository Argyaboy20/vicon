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
import './Tab1.css';
import '../theme/variables.css';

/* ===== INTERFACES ===== */
interface VideoInfo {
  platform: string;
  title: string;
  url: string;
}

/* ===== MAIN COMPONENT ===== */
const Tab1: React.FC = () => {
  /* ===== STATE MANAGEMENT ===== */
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedResolution, setSelectedResolution] = useState<string>('');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  /* ===== RESOLUTION OPTIONS ===== */
  const resolutionOptions = ['480p', '720p', '1080p', '1440p'];

  /* ===== VIDEO URL DETECTION FUNCTION ===== */
  const detectVideoInfo = (url: string): VideoInfo | null => {
    /* YouTube URL detection */
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return {
        platform: 'YouTube',
        title: 'Sample Video Title - YouTube Content',
        url: url
      };
    }

    /* Instagram URL detection */
    if (url.includes('instagram.com')) {
      return {
        platform: 'Instagram',
        title: 'Instagram Video/Reel Content',
        url: url
      };
    }

    /* TikTok URL detection */
    if (url.includes('tiktok.com')) {
      return {
        platform: 'TikTok',
        title: 'TikTok Video Content',
        url: url
      };
    }

    /* Facebook URL detection */
    if (url.includes('facebook.com')) {
      return {
        platform: 'Facebook',
        title: 'Facebook Video Content',
        url: url
      };
    }

    /* Facebook URL detection */
    if (url.includes('twitter.com')) {
      return {
        platform: 'Twitter',
        title: 'Twitter Video Content',
        url: url
      };
    }

    /* Facebook URL detection */
    if (url.includes('rednote.com')) {
      return {
        platform: 'Rednote',
        title: 'Rednote Video Content',
        url: url
      };
    }

    /* Generic video URL */
    if (url.includes('http')) {
      return {
        platform: 'Direct Link',
        title: 'Video from Direct URL',
        url: url
      };
    }

    return null;
  };

  /* ===== EVENT HANDLERS ===== */
  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);

    /* Auto-detect video info when URL is entered */
    if (url.trim()) {
      const info = detectVideoInfo(url);
      setVideoInfo(info);
    } else {
      setVideoInfo(null);
      setSelectedResolution('');
    }
  };

  const handleResolutionSelect = (resolution: string) => {
    setSelectedResolution(resolution);
  };

  const handleConvertClick = () => {
    if (videoUrl && selectedResolution) {
      /* Here you would implement the actual conversion logic */
      console.log('Converting video:', {
        url: videoUrl,
        resolution: selectedResolution,
        platform: videoInfo?.platform
      });
      alert(`Converting ${videoInfo?.platform} video to ${selectedResolution}`);
    } else {
      alert('Please enter a video URL and select resolution');
    }
  };

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

  const handleTermsClick = () => {
    /* Navigate to terms page */
    window.location.href = '/terms';
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
        <div className="video-converter-container">
          {/* Page Title */}
          <h2 className="page-title">Video Converter</h2>

          {/* Page Subtitle */}
          <p className="page-subtitle">Easily convert any type of links video, online.</p>

          {/* Video Input Section */}
          <div className="video-input-section">
            <div className="input-container">
              <input
                type="text"
                className="video-input"
                placeholder="Paste your video URL here"
                value={videoUrl}
                onChange={handleVideoUrlChange}
              />
              <button
                className="convert-button"
                onClick={handleConvertClick}
                disabled={!videoUrl || !selectedResolution}
              >
                Convert
              </button>
            </div>

            {/* Video Info Display */}
            {videoInfo && (
              <div className="video-info">
                <strong>{videoInfo.platform}</strong> - {videoInfo.title}
              </div>
            )}
          </div>

          {/* Resolution Options */}
          {videoInfo && (
            <>
              <div className="resolution-options">
                {resolutionOptions.map((resolution) => (
                  <button
                    key={resolution}
                    className={`resolution-option ${selectedResolution === resolution ? 'selected' : ''
                      }`}
                    onClick={() => handleResolutionSelect(resolution)}
                  >
                    {resolution}
                  </button>
                ))}
              </div>


            </>
          )}

          {/* Terms of Use Text */}
          <div className="terms-text">
            By proceeding, you agree to our{' '}
            <span className="terms-link" onClick={handleTermsClick}>
              Terms of Use
            </span>
            .
          </div>

          {/* Features Section */}
          <div className="features-section">
            <div className="features-grid">
              {/* Convert Any File Feature */}
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 9H8" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="feature-title">Convert Any File</h3>
                <p className="feature-description">
                  FreeConvert supports any type of link videos.
                  You can convert videos from YouTube, Instagram, TikTok, and more.
                  There are tons of Advanced Options to fine-tune your conversions.
                </p>
              </div>

              {/* Works Anywhere Feature */}
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 16V7C20 5.9 19.1 5 18 5H6C4.9 5 4 5.9 4 7V16C4 17.1 4.9 18 6 18H18C19.1 18 20 17.1 20 16Z" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M12 2V5" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 18V22" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 22H16" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="feature-title">Works Anywhere</h3>
                <p className="feature-description">
                  FreeConvert is an online file converter. So it works on
                  Windows, Mac, Linux, or any mobile device. All major
                  browsers are supported. Simply upload a link and
                  select a target resolution.
                </p>
              </div>

              {/* Privacy Guaranteed Feature */}
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22S8 18 8 13V7L12 5L16 7V13C16 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="feature-title">Privacy Guaranteed</h3>
                <p className="feature-description">
                  We know that file security and privacy are important
                  to you. That is why we use 256-bit SSL encryption
                  when transferring files and automatically delete them
                  after a few hours.
                </p>
              </div>
            </div>
          </div>
        </div>

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
      )}
    </IonPage>
  );
};

export default Tab1;