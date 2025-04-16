const canvas = document.getElementById('background-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = `rgba(84, 168, 252, ${Math.random() * 0.5 + 0.2})`;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
 
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(84, 168, 252, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        initParticles();
        animate();

        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
        
        document.addEventListener('DOMContentLoaded', () => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.from('.hero-title', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2
            });
            
            gsap.from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.4
            });
            
            gsap.from('.hero-text', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.6
            });
            
            gsap.from('.cta-buttons', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.8
            });

            gsap.utils.toArray('section:not(#home)').forEach(section => {
                gsap.from(section.querySelectorAll('h2, h3, p, .skill-card, .language-card, .project-card, .contact-container > *'), {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        });
        
        const floatingChat = document.querySelector('.floating-chat');
        
        floatingChat.addEventListener('click', () => {
            alert('Chat functionality would be implemented here!');
        });

        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            }
        });