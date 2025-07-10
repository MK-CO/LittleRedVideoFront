'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../components/LanguageProvider';

interface BlogDetailProps {
  params: {
    id: string;
  };
}

export default function BlogDetail({ params }: BlogDetailProps) {
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
    const contentKey = `blog_post_${params.id}_content`;
    return t(contentKey);
  };

  const getBlogTitle = () => {
    const titleKey = `blog_post_${params.id}_title`;
    return t(titleKey);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Blog */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-red-600 hover:text-red-700 mb-6 transition-colors"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          {t('blog_back_to_list')}
        </Link>

        {/* Blog Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {getBlogTitle()}
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <i className="fas fa-calendar mr-2"></i>
            <span className="mr-4">2024-01-15</span>
            <i className="fas fa-user mr-2"></i>
            <span>Admin</span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <aside className="lg:w-1/4">
              <div className="sticky top-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  {t('blog_table_of_contents')}
                </h3>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left py-1 px-2 rounded text-sm transition-colors ${
                        activeSection === item.id
                          ? 'bg-red-100 text-red-700 font-medium'
                          : 'text-gray-600 hover:text-red-600'
                      }`}
                      style={{ paddingLeft: `${(item.level - 2) * 12 + 8}px` }}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Blog Content */}
          <main className="lg:w-3/4">
            <article className="prose prose-lg max-w-none">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: getBlogContent() }}
              />
            </article>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/blog"
                className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                {t('blog_back_to_list')}
              </Link>
              
              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-red-600 transition-colors">
                  <i className="fab fa-facebook-f mr-1"></i>
                  {t('blog_share')}
                </button>
                <button className="text-gray-600 hover:text-red-600 transition-colors">
                  <i className="fab fa-twitter mr-1"></i>
                  {t('blog_share')}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}