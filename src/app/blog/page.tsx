'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../components/LanguageProvider';

export default function Blog() {
  const { t } = useLanguage();

  const blogPosts = [
    {
      id: 'post1',
      image: '/api/placeholder/400/250',
      titleKey: 'blog_post_1_title',
      descKey: 'blog_post_1_desc'
    },
    {
      id: 'post2', 
      image: '/api/placeholder/400/250',
      titleKey: 'blog_post_2_title',
      descKey: 'blog_post_2_desc'
    },
    {
      id: 'post3',
      image: '/api/placeholder/400/250', 
      titleKey: 'blog_post_3_title',
      descKey: 'blog_post_3_desc'
    },
    {
      id: 'post4',
      image: '/api/placeholder/400/250',
      titleKey: 'blog_post_4_title', 
      descKey: 'blog_post_4_desc'
    },
    {
      id: 'post5',
      image: '/api/placeholder/400/250',
      titleKey: 'blog_post_5_title',
      descKey: 'blog_post_5_desc'
    },
    {
      id: 'post6',
      image: '/api/placeholder/400/250',
      titleKey: 'blog_post_6_title',
      descKey: 'blog_post_6_desc'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        {t('nav_blog')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src={post.image} 
              alt={t(post.titleKey)}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {t(post.titleKey)}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {t(post.descKey)}
              </p>
              <Link 
                href={`/blog/${post.id}`}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
              >
                {t('blog_read_more')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}