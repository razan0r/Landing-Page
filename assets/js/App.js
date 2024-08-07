// When you add a section, it automatically adds it to Navbar
document.addEventListener('DOMContentLoaded', () => {
    const navList = document.getElementById('nav-list');
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${section.id}`;
        a.textContent = section.dataset.nav;
        a.classList.add('nav-link');
        li.appendChild(a);
        navList.appendChild(li);
    });

    const navLinks = document.querySelectorAll('.nav-link');
    
    const options = {
        root: null,
        threshold: 0.7
    };

    // Observes sections to add/remove active class based on viewport visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling to target section when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// Add an event listener for the scroll event on the document
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            section.classList.add('active');
            navLinks[index].classList.add('active');
        } else {
            section.classList.remove('active');
            navLinks[index].classList.remove('active');
        }
    });
});

// Shows the navbar while scrolling and hides it 2 seconds after the scrolling stops
let isScrolling;
document.addEventListener('scroll', () => {
    document.getElementById('navbar').style.display = 'block';
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        document.getElementById('navbar').style.display = 'none';
    }, 2000);
});

// Displays a "scroll to top" button
const scrollToTopBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Enables smooth scrolling to the top of the page when the "scroll to top" button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
