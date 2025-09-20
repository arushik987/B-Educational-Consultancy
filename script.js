// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        if (scrollY >= (sectionTop - headerHeight - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show success message (in a real application, you would send this to a server)
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .course-card, .testimonial-card, .partner-logo');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Testimonials slider (simple version)
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

// Initialize testimonials
if (testimonialCards.length > 0) {
    showTestimonial(0);
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if any are added later)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based functionality here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });
    
    return isValid;
}

// Add form validation to contact form
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#e5e7eb';
            }
        });
    });
}

// Course-Stream Dynamic Filtering
function initializeCourseStreamFiltering() {
    const courseSelect = document.getElementById('courseInterest');
    const streamSelect = document.getElementById('streamSelect');
    
    if (!courseSelect || !streamSelect) return;
    
    // Define streams for each course category
    const courseStreams = {
        engineering: [
            { value: 'btech', text: 'B.Tech' },
            { value: 'mtech', text: 'M.Tech' },
            { value: 'diploma', text: 'Diploma Engineering' },
            { value: 'others', text: 'Others' }
        ],
        medical: [
            { value: 'mbbs', text: 'MBBS' },
            { value: 'bds', text: 'BDS' },
            { value: 'bams', text: 'BAMS' },
            { value: 'bhms', text: 'BHMS' },
            { value: 'bpt', text: 'BPT' },
            { value: 'gnm', text: 'GNM' },
            { value: 'anm', text: 'ANM' },
            { value: 'bpharm', text: 'B.Pharm' },
            { value: 'dpharm', text: 'D.Pharm' },
            { value: 'others', text: 'Others' }
        ],
        management: [
            { value: 'bba', text: 'BBA' },
            { value: 'mba', text: 'MBA' },
            { value: 'pgdm', text: 'PGDM' },
            { value: 'executive_mba', text: 'Executive MBA' },
            { value: 'others', text: 'Others' }
        ],
        arts: [
            { value: 'bsc', text: 'B.Sc' },
            { value: 'msc', text: 'M.Sc' },
            { value: 'ba', text: 'BA' },
            { value: 'ma', text: 'MA' },
            { value: 'bcom', text: 'B.COM' },
            { value: 'mcom', text: 'M.COM' },
            { value: 'bca', text: 'BCA' },
            { value: 'mca', text: 'MCA' },
            { value: 'others', text: 'Others' }
        ],
        other: [
            { value: 'others', text: 'Others' }
        ]
    };
    
    // Function to populate stream options
    function populateStreams(courseValue) {
        // Clear existing options except the first one
        streamSelect.innerHTML = '<option value="">Select Stream</option>';
        
        if (courseValue && courseStreams[courseValue]) {
            courseStreams[courseValue].forEach(stream => {
                const option = document.createElement('option');
                option.value = stream.value;
                option.textContent = stream.text;
                streamSelect.appendChild(option);
            });
        }
    }
    
    // Add event listener to course select
    courseSelect.addEventListener('change', function() {
        populateStreams(this.value);
    });
    
    // Initialize with empty streams
    populateStreams('');
}

// Course tabs functionality
function initializeCourseTabs() {
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseCategories = document.querySelectorAll('.course-category');

    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            courseTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const tabValue = tab.getAttribute('data-tab');
            
            // Hide all course categories
            courseCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Show selected course category
            const selectedCategory = document.getElementById(tabValue);
            if (selectedCategory) {
                selectedCategory.classList.add('active');
            }
        });
    });
}

// Category filtering functionality for courses page
function initializeCategoryFiltering() {
    const categoryCards = document.querySelectorAll('.category-card');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (categoryCards.length === 0 || courseCards.length === 0) return;
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all category cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
            
            const categoryValue = card.getAttribute('data-category');
            
            // Show/hide course cards based on category
            courseCards.forEach(courseCard => {
                if (categoryValue === 'all' || courseCard.getAttribute('data-category') === categoryValue) {
                    courseCard.style.display = 'block';
                    courseCard.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    courseCard.style.display = 'none';
                }
            });
            
            // Scroll to courses section when a category is selected
            const coursesSection = document.querySelector('.courses-section');
            if (coursesSection && categoryValue !== 'all') {
                coursesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize course-stream filtering when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseStreamFiltering();
    initializeCourseTabs();
    initializeCategoryFiltering();
});
