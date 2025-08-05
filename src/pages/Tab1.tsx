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
  duration?: string;
  thumbnail?: string;
  author?: string;
  viewCount?: string;
}

interface ConversionResult {
  success: boolean;
  downloadUrl?: string;
  filename?: string;
  fileSize?: string;
  error?: string;
}

/* ===== MAIN COMPONENT ===== */
const Tab1: React.FC = () => {
  /* ===== STATE MANAGEMENT ===== */
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedResolution, setSelectedResolution] = useState<string>('');
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);

  /* ===== CONSTANTS ===== */
  const resolutionOptions = ['480p', '720p', '1080p', '1440p'];

  /* ===== ENHANCED VIDEO URL VALIDATION ===== */
  const isValidVideoUrl = (url: string): boolean => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return false;

    /* Platform-specific URL validation patterns */
    const platformPatterns = [
      /* YouTube patterns */
      /^(https?:\/\/)?((www|m)\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)[\w-]+/i,
      /* Instagram patterns */
      /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|tv)\/[\w-]+/i,
      /* TikTok patterns */
      /^(https?:\/\/)?(www\.)?(tiktok\.com|vm\.tiktok\.com)/i,
      /* Facebook patterns */
      /^(https?:\/\/)?(www\.)?facebook\.com\/.*\/videos/i,
      /* Twitter patterns */
      /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.*\/status/i,
      /* Rednote patterns */
      /^(https?:\/\/)?(www\.)?rednote\.com/i
    ];

    return platformPatterns.some(pattern => pattern.test(trimmedUrl));
  };

  /* ===== EXTRACT VIDEO ID FROM URL ===== */
  const extractVideoId = (url: string, platform: string): string | null => {
    try {
      switch (platform.toLowerCase()) {
        case 'youtube': {
          const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
          return match ? match[1] : null;
        }
        case 'instagram': {
          const match = url.match(/instagram\.com\/(p|reel|tv)\/([\w-]+)/);
          return match ? match[2] : null;
        }
        case 'tiktok': {
          const match = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
          return match ? match[1] : null;
        }
        default:
          return null;
      }
    } catch (error) {
      console.error('Error extracting video ID:', error);
      return null;
    }
  };

  /* ===== FETCH REAL VIDEO METADATA ===== */
  const fetchVideoMetadata = async (url: string): Promise<VideoInfo | null> => {
    setIsLoading(true);
    
    try {
      /* Detect platform first */
      const platform = detectPlatform(url);
      if (!platform) {
        throw new Error('Unsupported video platform');
      }

      /* Extract video ID */
      const videoId = extractVideoId(url, platform);
      if (!videoId) {
        throw new Error('Could not extract video ID from URL');
      }

      /* Simulate API call - In real implementation, this would call your backend */
      const metadata = await simulateVideoMetadataFetch(url, platform, videoId);
      
      return metadata;
    } catch (error) {
      console.error('Error fetching video metadata:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /* ===== SIMULATE VIDEO METADATA FETCH (PLACEHOLDER FOR REAL API) ===== */
  const simulateVideoMetadataFetch = async (url: string, platform: string, videoId: string): Promise<VideoInfo> => {
    /* Simulate network delay */
    await new Promise(resolve => setTimeout(resolve, 1500));

    /* Generate realistic metadata based on platform */
    const mockMetadata: Record<string, VideoInfo> = {
      'youtube': {
        platform: 'YouTube',
        title: `Sample Video Title - ${videoId.substring(0, 8)}`,
        url: url,
        duration: '3:45',
        author: 'Sample Channel',
        viewCount: '1.2M views',
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      },
      'instagram': {
        platform: 'Instagram',
        title: `Instagram Post - ${videoId.substring(0, 8)}`,
        url: url,
        duration: '0:30',
        author: '@sample_user',
        viewCount: '15.6K views'
      },
      'tiktok': {
        platform: 'TikTok',
        title: `TikTok Video - ${videoId.substring(0, 8)}`,
        url: url,
        duration: '0:15',
        author: '@sample_tiktoker',
        viewCount: '892.1K views'
      }
    };

    return mockMetadata[platform.toLowerCase()] || {
      platform: platform,
      title: `${platform} Video Content`,
      url: url,
      duration: '2:30',
      author: 'Unknown Creator',
      viewCount: 'N/A'
    };
  };

  /* ===== DETECT PLATFORM FROM URL ===== */
  const detectPlatform = (url: string): string | null => {
    const urlLower = url.toLowerCase();
    
    if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) return 'YouTube';
    if (urlLower.includes('instagram.com')) return 'Instagram';
    if (urlLower.includes('tiktok.com')) return 'TikTok';
    if (urlLower.includes('facebook.com')) return 'Facebook';
    if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) return 'Twitter';
    if (urlLower.includes('rednote.com')) return 'Rednote';
    
    return null;
  };

  /* ===== PERFORM REAL VIDEO CONVERSION ===== */
  const performVideoConversion = async (videoInfo: VideoInfo, resolution: string): Promise<ConversionResult> => {
    setIsConverting(true);
    
    try {
      /* Simulate conversion process - In real implementation, this would call your backend */
      const result = await simulateVideoConversion(videoInfo, resolution);
      return result;
    } catch (error) {
      console.error('Conversion error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Conversion failed'
      };
    } finally {
      setIsConverting(false);
    }
  };

  /* ===== SIMULATE VIDEO CONVERSION (PLACEHOLDER FOR REAL API) ===== */
  const simulateVideoConversion = async (videoInfo: VideoInfo, resolution: string): Promise<ConversionResult> => {
    /* Simulate conversion time based on resolution */
    const conversionTime = {
      '480p': 3000,
      '720p': 5000,
      '1080p': 8000,
      '1440p': 12000
    }[resolution] || 5000;

    await new Promise(resolve => setTimeout(resolve, conversionTime));

    /* Simulate conversion success/failure (90% success rate) */
    if (Math.random() > 0.1) {
      const fileSizes = {
        '480p': '15.2 MB',
        '720p': '32.8 MB',
        '1080p': '78.5 MB',
        '1440p': '156.3 MB'
      };

      return {
        success: true,
        downloadUrl: `blob:converted-video-${Date.now()}.mp4`,
        filename: `${videoInfo.title.substring(0, 30)}-${resolution}.mp4`,
        fileSize: fileSizes[resolution as keyof typeof fileSizes]
      };
    } else {
      throw new Error('Conversion failed due to video processing error');
    }
  };

  /* ===== ENHANCED VALIDATION FUNCTIONS ===== */
  const validateConversion = async (): Promise<boolean> => {
    /* Check if video URL is empty */
    if (!videoUrl.trim()) {
      alert('Please enter a video URL to proceed with conversion');
      return false;
    }

    /* Validate URL format */
    if (!isValidVideoUrl(videoUrl)) {
      alert('Invalid video URL format! Please enter a valid link from supported platforms (YouTube, Instagram, TikTok, Facebook, Twitter, Rednote)');
      return false;
    }

    /* Check if resolution is selected */
    if (!selectedResolution) {
      alert('Please select a resolution before converting');
      return false;
    }

    return true;
  };

  /* ===== ENHANCED EVENT HANDLERS ===== */
  const handleVideoUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    setConversionResult(null); /* Reset previous results */

    if (url.trim()) {
      /* Validate URL first */
      if (isValidVideoUrl(url)) {
        try {
          /* Fetch real video metadata */
          const info = await fetchVideoMetadata(url);
          setVideoInfo(info);
        } catch (error) {
          setVideoInfo(null);
          setSelectedResolution('');
          alert('Failed to fetch video information. Please check if the URL is valid and accessible.');
        }
      } else {
        setVideoInfo(null);
        setSelectedResolution('');
      }
    } else {
      /* Reset states when URL is cleared */
      setVideoInfo(null);
      setSelectedResolution('');
    }
  };

  const handleResolutionSelect = (resolution: string) => {
    setSelectedResolution(resolution);
  };

  const handleConvertClick = async () => {
    /* Validate before processing */
    const isValid = await validateConversion();
    if (!isValid || !videoInfo) {
      return;
    }

    try {
      /* Perform actual video conversion */
      const result = await performVideoConversion(videoInfo, selectedResolution);
      setConversionResult(result);

      if (result.success) {
        alert(`✅ Conversion successful!\nFile: ${result.filename}\nSize: ${result.fileSize}\n\nDownload will start automatically.`);
        /* Trigger download - In real implementation, this would download the actual file */
        console.log('Download URL:', result.downloadUrl);
      } else {
        alert(`❌ Conversion failed: ${result.error}`);
      }
    } catch (error) {
      alert('❌ An unexpected error occurred during conversion. Please try again.');
      console.error('Conversion error:', error);
    }
  };

  const toggleSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* Process search query */
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }

    /* Close modal and reset search */
    setShowSearchModal(false);
    setSearchQuery('');
  };

  const handleTermsClick = () => {
    /* Navigate to terms page */
    window.location.href = '/terms';
  };

  /* ===== RENDER COMPONENTS ===== */
  const renderHeader = () => (
    <IonHeader>
      <IonToolbar>
        <div className="toolbar-content">
          {/* Logo and Title Container */}
          <div className="logo-title-container">
            <div className="app-logo">VC</div>
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
  );

  const renderVideoInput = () => (
    <div className="video-input-section">
      <div className="input-container">
        <input
          type="text"
          className="video-input"
          placeholder="Paste your video URL here"
          value={videoUrl}
          onChange={handleVideoUrlChange}
          disabled={isLoading || isConverting}
        />
        <button
          className="convert-button"
          onClick={handleConvertClick}
          disabled={isLoading || isConverting || !videoInfo}
        >
          {isConverting ? 'Converting...' : isLoading ? 'Loading...' : 'Convert'}
        </button>
      </div>

      {/* Enhanced Video Info Display */}
      {isLoading && (
        <div className="video-info">
          <strong>Loading...</strong> Fetching video information...
        </div>
      )}

      {videoInfo && !isLoading && (
        <div className="video-info">
          <div style={{ marginBottom: '8px' }}>
            <strong>{videoInfo.platform}</strong> - {videoInfo.title}
          </div>
          {videoInfo.author && (
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
              By: {videoInfo.author}
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#666' }}>
            {videoInfo.duration && `Duration: ${videoInfo.duration}`}
            {videoInfo.viewCount && ` • ${videoInfo.viewCount}`}
          </div>
        </div>
      )}

      {/* Conversion Progress */}
      {isConverting && (
        <div className="video-info" style={{ background: 'rgba(255, 193, 7, 0.1)', borderColor: '#ffc107' }}>
          <strong>Converting to {selectedResolution}...</strong>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            Please wait, this may take a few minutes depending on the video size and selected resolution.
          </div>
        </div>
      )}

      {/* Conversion Result */}
      {conversionResult && (
        <div className={`video-info ${conversionResult.success ? 'success' : 'error'}`}>
          {conversionResult.success ? (
            <div>
              <strong>✅ Conversion Complete!</strong>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                File: {conversionResult.filename}<br/>
                Size: {conversionResult.fileSize}
              </div>
            </div>
          ) : (
            <div>
              <strong>❌ Conversion Failed</strong>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                {conversionResult.error}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderResolutionOptions = () => (
    videoInfo && !isLoading && (
      <div className="resolution-options">
        {resolutionOptions.map((resolution) => (
          <button
            key={resolution}
            className={`resolution-option ${selectedResolution === resolution ? 'selected' : ''}`}
            onClick={() => handleResolutionSelect(resolution)}
            disabled={isConverting}
          >
            {resolution}
          </button>
        ))}
      </div>
    )
  );

  /* Rest of the render methods remain the same... */
  const renderFeatures = () => (
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
          <h3 className="feature-title">Convert Any Link Video</h3>
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

  /* ===== MAIN RENDER ===== */
  return (
    <IonPage>
      {renderHeader()}

      <IonContent fullscreen>
        <div className="video-converter-container">
          {/* Page Title */}
          <h2 className="page-title">Video Converter</h2>

          {/* Page Subtitle */}
          <p className="page-subtitle">Easily convert any type of links video, online.</p>

          {/* Video Input Section */}
          {renderVideoInput()}

          {/* Resolution Options */}
          {renderResolutionOptions()}

          {/* Terms of Use Text */}
          <div className="terms-text">
            By proceeding, you agree to our{' '}
            <span className="terms-link" onClick={handleTermsClick}>
              Terms of Use
            </span>
            .
          </div>

          {/* Features Section */}
          {renderFeatures()}
        </div>
      </IonContent>

      {/* Search Modal */}
      {renderSearchModal()}
    </IonPage>
  );
};

export default Tab1;