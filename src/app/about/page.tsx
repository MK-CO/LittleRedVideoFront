'use client';

import React from 'react';
import { useLanguage } from '../components/LanguageProvider';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {t('nav_about')}
        </h1>
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <i className="fas fa-video text-white text-5xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('about_hero_title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('about_hero_desc')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t('about_mission_title')}
          </h3>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('about_mission_desc')}
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            {t('about_features_title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <i className="fas fa-bolt text-4xl text-red-600 mb-4"></i>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                {t('about_feature_1_title')}
              </h4>
              <p className="text-gray-600">
                {t('about_feature_1_desc')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <i className="fas fa-shield-alt text-4xl text-red-600 mb-4"></i>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                {t('about_feature_2_title')}
              </h4>
              <p className="text-gray-600">
                {t('about_feature_2_desc')}
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <i className="fas fa-globe text-4xl text-red-600 mb-4"></i>
              <h4 className="text-xl font-semibold text-gray-800 mb-3">
                {t('about_feature_3_title')}
              </h4>
              <p className="text-gray-600">
                {t('about_feature_3_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            {t('about_team_title')}
          </h3>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              {t('about_team_desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-user text-gray-600 text-2xl"></i>
                </div>
                <h5 className="font-semibold text-gray-800">{t('about_team_member_1')}</h5>
                <p className="text-sm text-gray-600">{t('about_team_role_1')}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-user text-gray-600 text-2xl"></i>
                </div>
                <h5 className="font-semibold text-gray-800">{t('about_team_member_2')}</h5>
                <p className="text-sm text-gray-600">{t('about_team_role_2')}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <i className="fas fa-user text-gray-600 text-2xl"></i>
                </div>
                <h5 className="font-semibold text-gray-800">{t('about_team_member_3')}</h5>
                <p className="text-sm text-gray-600">{t('about_team_role_3')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {t('about_contact_title')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('about_contact_desc')}
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="mailto:contact@example.com"
              className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <i className="fas fa-envelope mr-2"></i>
              contact@example.com
            </a>
            <a 
              href="#"
              className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <i className="fab fa-twitter mr-2"></i>
              @videodownloader
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}