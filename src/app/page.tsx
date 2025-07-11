'use client';

import React, { useState } from 'react';
import { useLanguage } from './components/LanguageProvider';
import { api } from './utils/api';

export default function Home() {
  const { t } = useLanguage();
  const [videoLink, setVideoLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadResult, setDownloadResult] = useState<{
    success: boolean;
    downloadUrl?: string;
    error?: string;
  } | null>(null);

  const handleDownload = async () => {
    if (!videoLink.trim()) {
      setDownloadResult({
        success: false,
        error: t('home_invalid_url_message')
      });
      return;
    }

    setIsLoading(true);
    setDownloadResult(null);

    try {
      const data = await api.downloadVideo(videoLink);
      
      if (data.downloadUrl) {
        setDownloadResult({
          success: true,
          downloadUrl: data.downloadUrl
        });
      } else {
        setDownloadResult({
          success: false,
          error: data.error || t('home_download_error_message')
        });
      }
    } catch (error) {
      console.error('下载请求出错:', error);
      setDownloadResult({
        success: false,
        error: t('home_network_error_message')
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans bg-gray-50 p-6">
      {/* Hero Section */}
      <div className="hero-section">
        <h2 className="text-5xl font-extrabold mb-6 animate-pulse">
          {t('home_title')}
        </h2>
        <p className="text-xl mb-10 opacity-90">
          {t('home_subtitle')}
        </p>
        <div className="max-w-3xl mx-auto flex bg-white rounded-full shadow-lg p-2">
          <input 
            type="text" 
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder={t('home_input_placeholder')}
            className="flex-grow py-4 px-6 text-lg rounded-l-full focus:outline-none text-gray-800"
          />
          <button 
            onClick={handleDownload}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-xl disabled:opacity-50"
          >
            <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-download'} mr-2`}></i> 
            <span>{isLoading ? t('home_loading_message') : t('home_download_button')}</span>
          </button>
        </div>
        
        <div className="mt-8 text-center min-h-[100px] flex items-center justify-center">
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-6 bg-blue-100 text-blue-800 rounded-lg shadow-md max-w-sm mx-auto animate-pulse">
              <i className="fas fa-spinner fa-spin text-6xl mb-4 text-blue-600"></i>
              <p className="text-xl font-bold">{t('home_loading_message')}</p>
              <p className="text-sm mt-2 opacity-80">{t('home_loading_message_sub')}</p>
            </div>
          )}

          {/* Success State */}
          {downloadResult?.success && (
            <div className="flex flex-col items-center justify-center p-8 bg-green-100 text-green-800 rounded-lg shadow-lg max-w-md mx-auto animate-scale-in">
              <i className="fas fa-check-circle text-7xl mb-6 text-green-600 animate-bounce-in"></i>
              <p className="text-2xl font-extrabold mb-6">{t('home_download_success')}</p>
              <a 
                href={downloadResult.downloadUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl transition transform hover:scale-105 flex items-center"
              >
                <i className="fas fa-cloud-download-alt mr-3"></i> 
                <span>{t('home_download_now')}</span>
              </a>
            </div>
          )}

          {/* Error State */}
          {downloadResult?.success === false && (
            <div className="flex flex-col items-center justify-center p-8 bg-red-100 text-red-800 rounded-lg shadow-lg max-w-md mx-auto animate-fade-in">
              <i className="fas fa-exclamation-triangle text-7xl mb-6 text-red-600 animate-shake"></i>
              <p className="text-xl font-bold mb-4">{t('home_download_error_title')}</p>
              <p className="text-base text-red-700 opacity-90">{downloadResult.error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Supported Platforms */}
      <section className="text-center mb-16">
        <h3 className="text-4xl font-bold text-gray-800 mb-8">{t('home_platforms_title')}</h3>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-4xl mx-auto">
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center platform-icon">
            <i className="fab fa-x-twitter text-4xl md:text-6xl text-gray-700 hover:text-black"></i>
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center platform-icon">
            <i className="fab fa-tiktok text-4xl md:text-6xl text-gray-700 hover:text-black"></i>
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center platform-icon">
            <i className="fab fa-instagram text-4xl md:text-6xl text-gray-700 hover:text-pink-600"></i>
          </div>
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center platform-icon">
            <i className="fab fa-facebook-f text-4xl md:text-6xl text-gray-700 hover:text-blue-600"></i>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="text-center mb-16">
        <h3 className="text-4xl font-bold text-gray-800 mb-8">{t('home_how_to_use_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border-t-4 border-red-500">
            <i className="fas fa-copy text-5xl text-red-500 mb-4"></i>
            <h4 className="text-2xl font-semibold mb-3">{t('home_step_1_title')}</h4>
            <p className="text-gray-600">{t('home_step_1_desc')}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border-t-4 border-red-500">
            <i className="fas fa-paste text-5xl text-red-500 mb-4"></i>
            <h4 className="text-2xl font-semibold mb-3">{t('home_step_2_title')}</h4>
            <p className="text-gray-600">{t('home_step_2_desc')}</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 border-t-4 border-red-500">
            <i className="fas fa-check-circle text-5xl text-red-500 mb-4"></i>
            <h4 className="text-2xl font-semibold mb-3">{t('home_step_3_title')}</h4>
            <p className="text-gray-600">{t('home_step_3_desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
