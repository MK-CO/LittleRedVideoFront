'use client';

import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { api } from '../utils/api';

export default function Feedback() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitResult({
        success: false,
        message: t('feedback_validation_error')
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await api.submitFeedback(formData);
      
      if (response.success) {
        setSubmitResult({
          success: true,
          message: t('feedback_success_message')
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitResult({
          success: false,
          message: response.error || t('feedback_error_message')
        });
      }
    } catch (error) {
      console.error('提交反馈出错:', error);
      setSubmitResult({
        success: false,
        message: t('feedback_network_error')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          {t('nav_feedback')}
        </h1>
        
        {/* Introduction */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('feedback_intro')}
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('feedback_name_label')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder={t('feedback_name_placeholder')}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('feedback_email_label')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder={t('feedback_email_placeholder')}
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                {t('feedback_subject_label')}
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              >
                <option value="">{t('feedback_subject_placeholder')}</option>
                <option value="bug">{t('feedback_subject_bug')}</option>
                <option value="feature">{t('feedback_subject_feature')}</option>
                <option value="general">{t('feedback_subject_general')}</option>
                <option value="other">{t('feedback_subject_other')}</option>
              </select>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {t('feedback_message_label')} *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-vertical"
                placeholder={t('feedback_message_placeholder')}
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    {t('feedback_submitting')}
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    {t('feedback_submit_button')}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result Message */}
          {submitResult && (
            <div className={`mt-6 p-4 rounded-lg ${
              submitResult.success 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-center">
                <i className={`fas ${
                  submitResult.success ? 'fa-check-circle' : 'fa-exclamation-triangle'
                } mr-2`}></i>
                <span>{submitResult.message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t('feedback_other_contact_title')}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('feedback_other_contact_desc')}
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="mailto:support@example.com"
              className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <i className="fas fa-envelope mr-2"></i>
              support@example.com
            </a>
            <a 
              href="#"
              className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              <i className="fab fa-twitter mr-2"></i>
              @support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}