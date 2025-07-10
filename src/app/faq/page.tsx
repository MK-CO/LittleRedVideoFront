'use client';

import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageProvider';

export default function FAQ() {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const faqItems = [
    {
      questionKey: 'faq_question_1',
      answerKey: 'faq_answer_1'
    },
    {
      questionKey: 'faq_question_2', 
      answerKey: 'faq_answer_2'
    },
    {
      questionKey: 'faq_question_3',
      answerKey: 'faq_answer_3'
    },
    {
      questionKey: 'faq_question_4',
      answerKey: 'faq_answer_4'
    },
    {
      questionKey: 'faq_question_5',
      answerKey: 'faq_answer_5'
    },
    {
      questionKey: 'faq_question_6',
      answerKey: 'faq_answer_6'
    }
  ];

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {t('nav_faq')}
        </h1>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {t(item.questionKey)}
                </h3>
                <i className={`fas fa-chevron-${openItems.has(index) ? 'up' : 'down'} text-red-600 transition-transform duration-200`}></i>
              </button>
              
              {openItems.has(index) && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4 text-gray-600 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: t(item.answerKey) }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('faq_contact_title')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('faq_contact_desc')}
          </p>
          <a 
            href="mailto:support@example.com"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <i className="fas fa-envelope mr-2"></i>
            {t('faq_contact_button')}
          </a>
        </div>
      </div>
    </div>
  );
}