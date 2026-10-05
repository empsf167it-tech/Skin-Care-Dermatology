document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const backToTopBtn = document.getElementById('backToTop');
    
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const body = document.body;

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // --- Mobile Menu Toggle ---
    function openMenu() {
        mobileSidebar.classList.add('open');
        sidebarBackdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileSidebar.classList.remove('open');
        sidebarBackdrop.classList.remove('show');
        document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', openMenu);
    closeSidebarBtn.addEventListener('click', closeMenu);
    sidebarBackdrop.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Theme Toggle ---
    const savedTheme = localStorage.getItem('auraderm-theme');
    
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        updateThemeIcons('dark');
    }

    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('auraderm-theme', 'light');
            updateThemeIcons('light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('auraderm-theme', 'dark');
            updateThemeIcons('dark');
        }
    }

    function updateThemeIcons(theme) {
        const iconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
        const removeClass = theme === 'dark' ? 'fa-moon' : 'fa-sun';
        
        themeToggleMobile.innerHTML = `<i class="fas ${iconClass}"></i>`;
        themeToggleDesktop.innerHTML = `<i class="fas ${iconClass}"></i>`;
    }

    themeToggleMobile.addEventListener('click', toggleTheme);
    themeToggleDesktop.addEventListener('click', toggleTheme);


    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Short timeout to allow mobile menu to close and body overflow to restore
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }, 50);
        });
    });

    // --- Back to Top ---
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Testimonial Carousel ---
    const track = document.getElementById('testimonialTrack');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextTestimonial');
    const prevButton = document.getElementById('prevTestimonial');
    
    let currentIndex = 0;

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // loop back
        }
        updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // loop to end
        }
        updateSlidePosition();
    });


    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Intersection Observer to trigger when visible
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            });
            observer.observe(counter);
        });
    };
    
    // Call once
    animateCounters();


    // --- Booking Form Mock ---
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show success message
            formSuccess.classList.remove('d-none');
            // Reset form
            bookingForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('d-none');
            }, 5000);
        });
    }

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });
});
