'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../components/LanguageProvider';

export default function Blog() {
  const { t } = useLanguage();

  const blogPosts = [
    {
      id: 'post1',
      image: '/images/video-download-trends.svg',
      titleKey: 'blog_post_post1_title',
      descKey: 'blog_post_post1_desc'
    },
    {
      id: 'post2',
      image: '/images/video-downloader-guide.svg',
      titleKey: 'blog_post_post2_title',
      descKey: 'blog_post_post2_desc'
    },
    {
      id: 'post3',
      image: '/images/update-log.svg',
      titleKey: 'blog_post_post3_title',
      descKey: 'blog_post_post3_desc'
    },
    {
      id: 'post4',
      image: '/images/legal-issues.svg',
      titleKey: 'blog_post_post4_title',
      descKey: 'blog_post_post4_desc'
    },
    {
      id: 'post5',
      image: '/images/privacy-protection.svg',
      titleKey: 'blog_post_post5_title',
      descKey: 'blog_post_post5_desc'
    },
    {
      id: 'post6',
      image: '/images/video-formats.svg',
      titleKey: 'blog_post_post6_title',
      descKey: 'blog_post_post6_desc'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('blog_title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          探索视频下载的最新趋势、技巧和最佳实践。从技术指南到法律须知，我们为您提供全面的视频下载知识。
        </p>
      </div>
      
      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-blue-800 mb-2">下载教程</h3>
          <p className="text-blue-600 text-sm">详细的步骤指南和技巧</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-semibold text-purple-800 mb-2">安全指南</h3>
          <p className="text-purple-600 text-sm">隐私保护和安全下载</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-green-800 mb-2">技术知识</h3>
          <p className="text-green-600 text-sm">格式解析和技术细节</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
            <div className="relative overflow-hidden">
              <img 
                src={post.image} 
                alt={t(post.titleKey)} 
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {index < 3 ? '教程' : '指南'}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {new Date().toLocaleDateString('zh-CN')}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {t(post.titleKey)}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {t(post.descKey)}
              </p>
              <Link 
                href={`/blog/${post.id}`}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                {t('blog_read_more')}
                <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}