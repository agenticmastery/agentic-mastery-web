document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links (fallback/enhancement)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Count up effect for stats
    const stats = document.querySelectorAll('.stat-num');
    const options = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.innerText, 10);
                if (!isNaN(countTo)) {
                    let count = 0;
                    const duration = 1500; // ms
                    const increment = countTo / (duration / 16); // 60fps
                    
                    const updateCount = () => {
                        count += increment;
                        if (count < countTo) {
                            target.innerText = Math.floor(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            target.innerText = countTo;
                        }
                    };
                    updateCount();
                }
                observer.unobserve(target);
            }
        });
    }, options);

    stats.forEach(stat => {
        observer.observe(stat);
    });

    // Add a subtle parallax or mouse move effect to hero visual
    const heroVisual = document.querySelector('.visual-box');
    if (heroVisual) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            heroVisual.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        document.addEventListener('mouseleave', () => {
            heroVisual.style.transform = `rotateY(-5deg) rotateX(5deg)`;
            heroVisual.style.transition = 'all 0.5s ease';
        });
        
        document.addEventListener('mouseenter', () => {
            heroVisual.style.transition = 'none';
        });
    }
});
