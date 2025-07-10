document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');

    // Load saved language or default to 'zh-CN'
    let currentLang = localStorage.getItem('selectedLanguage') || 'zh-CN';

    // Function to apply translations to the current document
    function applyTranslations(lang) {
        currentLang = lang || localStorage.getItem('selectedLanguage') || 'zh-CN';

        const path = window.location.pathname;
        const pageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');
        const pageTitleKey = `page_title_${pageName}`;

        // Translate document title
        if (translations[currentLang] && translations[currentLang][pageTitleKey]) {
            document.title = translations[currentLang][pageTitleKey];
        } else if (pageName === 'blog-detail') {
            // For blog-detail page, title will be set dynamically in loadBlogPost
            // but we ensure the base title is translated if not yet loaded
            if (translations[currentLang] && translations[currentLang]['page_title_blog_detail']) {
                document.title = translations[currentLang]['page_title_blog_detail'];
            }
        }


        // Translate elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });

        // Translate input placeholders with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.placeholder = translations[currentLang][key];
            }
        });

        // Translate input values with data-i18n-value
        document.querySelectorAll('[data-i18n-value]').forEach(element => {
            const key = element.getAttribute('data-i18n-value');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.value = translations[currentLang][key];
            }
        });

        // Translate image sources with data-i18n-src
        document.querySelectorAll('[data-i18n-src]').forEach(element => {
            const key = element.getAttribute('data-i18n-src');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.src = translations[currentLang][key];
            }
        });

        // Translate image alt texts with data-i18n-alt
        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (translations[currentLang] && translations[currentLang][key]) {
                element.alt = translations[currentLang][key];
            }
        });

        // Handle blog detail page content
        if (pageName === 'blog-detail') {
            loadBlogPost(currentLang);
        }
    }

    // Function to load blog post content for blog-detail.html
    function loadBlogPost(lang) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('post');

        if (postId && translations[lang] && translations[lang][`blog_post_${postId}_title`]) {
            const postTitle = translations[lang][`blog_post_${postId}_title`];
            const postImage = translations[lang][`blog_post_${postId}_image`];
            const postContent = translations[lang][`blog_post_${postId}_content`];

            document.getElementById('blog-detail-title').textContent = postTitle;
            document.getElementById('blog-detail-image').src = postImage;
            document.getElementById('blog-detail-image').alt = postTitle;
            document.getElementById('blog-detail-content').innerHTML = postContent;

            // Update document title with blog post title
            document.title = `${translations[lang]['page_title_blog_detail']} - ${postTitle}`;

            // Generate Table of Contents
            generateTableOfContents();
        } else if (postId) {
            // If post not found in current language, try default or show error
            document.getElementById('blog-detail-title').textContent = 'Post Not Found';
            document.getElementById('blog-detail-image').style.display = 'none';
            document.getElementById('blog-detail-content').innerHTML = '<p>The requested blog post could not be found in this language.</p>';
            document.getElementById('blog-toc').innerHTML = ''; // Clear TOC
        }
    }

    // Function to generate Table of Contents
    function generateTableOfContents() {
        const blogContent = document.getElementById('blog-detail-content');
        const tocContainer = document.getElementById('blog-toc');
        tocContainer.innerHTML = ''; // Clear existing TOC

        const headings = blogContent.querySelectorAll('h2, h3');
        let tocHtml = '';
        let sectionCount = 0;
        let subSectionCount = 0;

        headings.forEach(heading => {
            const text = heading.textContent;
            let id = text.replace(/\s+/g, '-').toLowerCase(); // Basic ID generation
            
            if (heading.tagName === 'H2') {
                sectionCount++;
                subSectionCount = 0; // Reset sub-section counter for new main section
                id = `section-${sectionCount}-${id}`;
                tocHtml += `<a href="#${id}" class="block text-xl font-semibold mb-2">${sectionCount}. ${text}</a>`;
            } else if (heading.tagName === 'H3') {
                subSectionCount++;
                id = `subsection-${sectionCount}-${subSectionCount}-${id}`;
                tocHtml += `<a href="#${id}" class="block ml-4 text-lg mb-1">${sectionCount}.${subSectionCount}. ${text}</a>`;
            }
            heading.id = id; // Assign ID to heading

            heading.addEventListener('click', (event) => {
                event.preventDefault();
                document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
            });
        });
        tocContainer.innerHTML = tocHtml;

        // Add active class to current section on scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Adjust as needed
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const tocLink = tocContainer.querySelector(`a[href="#${id}"]`);
                if (tocLink) {
                    if (entry.isIntersecting) {
                        tocLink.classList.add('active');
                    } else {
                        tocLink.classList.remove('active');
                    }
                }
            });
        }, observerOptions);

        headings.forEach(heading => observer.observe(heading));
    }


    // Initialize language switcher value if it exists (meaning this is the parent frame)
    if (languageSwitcher) {
        languageSwitcher.value = currentLang;

        languageSwitcher.addEventListener('change', (event) => {
            currentLang = event.target.value;
            localStorage.setItem('selectedLanguage', currentLang);
            applyTranslations(currentLang); // Apply to parent

            // Get the iframe element
            const contentFrame = document.querySelector('iframe[name="contentFrame"]');
            if (contentFrame) {
                // Get the current source of the iframe, remove existing query params if any
                const currentIframeSrc = contentFrame.src.split('?')[0];
                // Reload the iframe by re-assigning its src with a new timestamp to bypass cache
                contentFrame.src = `${currentIframeSrc}?_t=${new Date().getTime()}`;
            }
        });
    }

    // Apply translations on initial load for the current document
    applyTranslations(currentLang);
});