'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

const Navbar = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
  };

  return (
    <header className="navbar">
      <h1 className="text-3xl font-bold text-red-600">
        {t('app_name')}
      </h1>
      <nav className="navbar-nav">
        <Link href="/" className="flex items-center">
          <i className="fas fa-home mr-2"></i> 
          <span>{t('nav_home')}</span>
        </Link>
        <Link href="/blog" className="flex items-center">
          <i className="fas fa-newspaper mr-2"></i> 
          <span>{t('nav_blog')}</span>
        </Link>
        <Link href="/faq" className="flex items-center">
          <i className="fas fa-question-circle mr-2"></i> 
          <span>{t('nav_faq')}</span>
        </Link>
        <Link href="/about" className="flex items-center">
          <i className="fas fa-info-circle mr-2"></i> 
          <span>{t('nav_about')}</span>
        </Link>
        <Link href="/feedback" className="flex items-center">
          <i className="fas fa-comments mr-2"></i> 
          <span>{t('nav_feedback')}</span>
        </Link>
        <div className="language-switcher ml-6">
          <select 
            value={currentLanguage}
            onChange={handleLanguageChange}
            className="form-select border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh-TW">繁體中文</option>
            <option value="zh-CN">简体中文</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;