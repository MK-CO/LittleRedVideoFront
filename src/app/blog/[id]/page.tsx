'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../components/LanguageProvider';

interface BlogDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogDetail({ params }: BlogDetailProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);
  const { t } = useLanguage();
  const [tocItems, setTocItems] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Generate table of contents
    const headings = document.querySelectorAll('h2, h3, h4');
    const items = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      };
    });
    setTocItems(items);

    // Handle scroll for active section highlighting
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = items.length - 1; i >= 0; i--) {
        const element = document.getElementById(items[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getBlogContent = () => {
    if (!resolvedParams) return '';
    const contentKey = `blog_post_${resolvedParams.id}_content`;
    return t(contentKey);
  };

  const getBlogTitle = () => {
    if (!resolvedParams) return '';
    const titleKey = `blog_post_${resolvedParams.id}_title`;
    return t(titleKey);
  };

  if (!resolvedParams) {
    return <div className="container mx-auto px-6 py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to blog list */}
        <Link 
          href="/blog"
          className="inline-flex items-center px-4 py-2 bg-white text-blue-600 hover:text-blue-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-8 group"
        >
          <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('blog_back_to_list')}
        </Link>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getBlogTitle()}
            </h1>
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L15 7" />
                </svg>
                2024-01-15
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                5 分钟阅读
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Table of Contents */}
            {tocItems.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  {t('blog_table_of_contents')}
                </h2>
                <ul className="space-y-2">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                          activeSection === item.id 
                            ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                            : 'text-gray-700 hover:text-blue-600 hover:bg-white hover:shadow-md'
                        }`}
                        style={{ paddingLeft: `${(item.level - 2) * 16 + 16}px` }}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Blog content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-800 prose-ul:text-gray-600 prose-li:text-gray-600"
              dangerouslySetInnerHTML={{ __html: getBlogContent() }}
            />
            
            {/* Share buttons */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                {t('blog_share')}
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                <button className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}