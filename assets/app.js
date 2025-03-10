document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    initializeMobileMenu();
    initializeSkillTags();
    initializeScrollToTop();
    initializeTimeline();
    initializeCertificates();
    initializeNavigation();
    initializeScrollIndicator();
    initializeFadeEffects();
    initializeModals();
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');

    if (!mobileMenuButton || !nav) return;

    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });

// Close mobile menu when clicking links
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileMenuButton.classList.remove('active');
        // Allow the smooth scroll to settle, then trigger a scroll event
        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 300); // adjust delay as needed
    });
});


    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) &&
            !mobileMenuButton.contains(e.target) &&
            nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
}

// Skill Tags Animation
function initializeSkillTags() {
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseover', () => tag.style.transform = 'scale(1.1)');
        tag.addEventListener('mouseout', () => tag.style.transform = 'scale(1)');
    });
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = 'Top';
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.style.display = 'none';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Timeline Animation
function initializeTimeline() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// Certificates Section
function initializeCertificates() {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', () => {
        const moreCertificates = document.getElementById('more-certificates');
        if (moreCertificates) {
            moreCertificates.classList.toggle('hidden');
        }
        loadMoreBtn.style.display = 'none';
        // Trigger a scroll event to force recalculation of the active section
        window.dispatchEvent(new Event('scroll'));
    });
}


// Email Copy Functionality
function copyEmail() {
    const email = 'rickypenajr@gmail.com';
    const button = document.querySelector('.copy-button');

    navigator.clipboard.writeText(email).then(() => {
        if (!button) return;

        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Email Copied!';

        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    });
}

// Navigation Highlighting
function initializeNavigation() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');

    if (!header) return;

    function updateActiveSection() {
        // Disable highlighting on mobile (adjust the threshold as needed)
        if (window.innerWidth < 768) {
            navLinks.forEach(link => link.classList.remove('active'));
            return;
        }

        const headerHeight = header.offsetHeight; // recalc every scroll
        const tolerance = 40; // adjust as needed
        const scrollPosition = window.scrollY + headerHeight - tolerance;
    
        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (!id) return;
    
            const rect = section.getBoundingClientRect();
            let sectionTop = rect.top + window.scrollY;
            let sectionBottom = sectionTop + rect.height;
            
            // Special handling for certificates section if needed
            if (id === 'certificates') {
                const moreCertificates = document.getElementById('more-certificates');
                if (moreCertificates && moreCertificates.classList.contains('hidden')) {
                    sectionBottom = sectionTop + Math.max(rect.height, 600);
                }
            }
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`nav a[href="#${id}"]`);
                activeLink?.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check
}


// Scroll Indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;

    window.addEventListener('scroll', () => {
        scrollIndicator.classList.toggle('hidden', window.scrollY > 100);
    });
}

// Fade-in Effects
function initializeFadeEffects() {
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach(element => {
        fadeObserver.observe(element);
    });
}

// Modal Functionality
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    const closeBtns = document.querySelectorAll('.close');

    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        positionModal(modal);
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function closeAllModals() {
        modals.forEach(closeModal);
    }

    function positionModal(modal) {
        const modalContent = modal.querySelector('.modal-content');
        if (!modalContent) return;

        const windowHeight = window.innerHeight;
        const modalHeight = modalContent.offsetHeight;

        if (modalHeight > windowHeight) {
            modal.style.alignItems = 'flex-start';
            modalContent.style.marginTop = '20px';
            modalContent.style.marginBottom = '20px';
        } else {
            modal.style.alignItems = 'center';
            modalContent.style.margin = '0';
        }
    }

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectCard = btn.closest('.project-card');
            const projectId = projectCard?.dataset.project;
            const modal = projectId ? document.getElementById(`modal-${projectId}`) : null;
            if (modal) openModal(modal);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.modal-content') &&
            !event.target.closest('.read-more-btn')) {
            closeAllModals();
        }
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    window.addEventListener('resize', () => {
        modals.forEach(modal => {
            if (modal.classList.contains('active')) {
                positionModal(modal);
            }
        });
    });
}