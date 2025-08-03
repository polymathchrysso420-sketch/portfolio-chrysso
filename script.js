document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate Elements on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .about-block');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation state
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Skill Point Hover Effects
    const skillPoints = document.querySelectorAll('.skill-point');
    
    skillPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.querySelector('.point-pulse').style.transform = 'scale(1.5)';
            this.querySelector('.point-pulse').style.opacity = '1';
        });
        
        point.addEventListener('mouseleave', function() {
            this.querySelector('.point-pulse').style.transform = 'scale(1)';
            this.querySelector('.point-pulse').style.opacity = '0.7';
        });
    });

    // Tab Functionality for YouTube Page
    const tabButtons = document.querySelectorAll('.tab-btn, .filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active tab
                const parent = this.parentElement;
                parent.querySelectorAll('.active').forEach(activeBtn => {
                    activeBtn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filter content
                const category = this.textContent.trim();
                const cards = parent.classList.contains('category-tabs') ? videoCards : projectCards;
                
                cards.forEach(card => {
                    if (category === 'All Videos' || category === 'All Projects') {
                        card.style.display = 'block';
                    } else {
                        // In a real implementation, you would filter based on actual data
                        // This is just for demonstration
                        const randomShow = Math.random() > 0.3;
                        card.style.display = randomShow ? 'block' : 'none';
                    }
                });
            });
        });
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Project Carousel Navigation
    const projectsCarousel = document.querySelector('.projects-carousel');
    if (projectsCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        projectsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - projectsCarousel.offsetLeft;
            scrollLeft = projectsCarousel.scrollLeft;
            projectsCarousel.style.cursor = 'grabbing';
        });

        projectsCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            projectsCarousel.style.cursor = 'grab';
        });

        projectsCarousel.addEventListener('mouseup', () => {
            isDown = false;
            projectsCarousel.style.cursor = 'grab';
        });

        projectsCarousel.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            projectsCarousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Video Play Button
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoCard = this.closest('.video-player, .video-card');
            // In a real implementation, this would open the video
            alert('This would play the video in a real implementation');
        });
    });
});

// Additional animation for hero title letters
window.addEventListener('load', function() {
    const subtitleLetters = document.querySelectorAll('.subtitle-letter');
    subtitleLetters.forEach((letter, index) => {
        letter.style.animation = `fadeInUp 0.5s ${index * 0.05}s forwards`;
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});