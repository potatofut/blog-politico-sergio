/**
 * Blog Politico Sergio - JavaScript Principal
 * Manejo de tema oscuro y funcionalidades interactivas
 */

class BlogManager {
    constructor() {
        this.init();
    }

    /**
     * Inicializa todas las funcionalidades
     */
    init() {
        this.setupThemeToggle();
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupAnimations();
        this.applyInitialTheme();
        
        console.log('Blog Manager inicializado correctamente');
    }

    /**
     * Configura el toggle del tema oscuro/claro
     */
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Aplicar icono inicial
        this.updateThemeIcon();
    }

    /**
     * Alterna entre tema claro y oscuro
     */
    toggleTheme() {
        const currentTheme = this.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.updateThemeIcon();
        this.animateThemeTransition();
        
        console.log(`Tema cambiado a: ${newTheme}`);
    }

    /**
     * Obtiene el tema actual
     */
    getCurrentTheme() {
        return localStorage.getItem('theme') || 
               (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    /**
     * Aplica el tema inicial
     */
    applyInitialTheme() {
        const theme = this.getCurrentTheme();
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon();
    }

    /**
     * Actualiza el icono del toggle de tema
     */
    updateThemeIcon() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        const currentTheme = this.getCurrentTheme();
        themeToggle.innerHTML = currentTheme === 'dark' ? '' : '';
        themeToggle.setAttribute('aria-label', 
            currentTheme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
        );
    }

    /**
     * Anima la transicion de tema
     */
    animateThemeTransition() {
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    /**
     * Configura efectos de scroll
     */
    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.main-header');
            
            if (header) {
                if (scrolled > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                    header.style.backdropFilter = 'blur(20px)';
                } else {
                    header.style.background = 'var(--bg-primary)';
                    header.style.backdropFilter = 'blur(10px)';
                }
            }

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);
    }

    /**
     * Configura la navegacion activa
     */
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            
            // Marcar enlace activo
            if (linkPath === currentPath || 
                (currentPath === '/' && linkPath === '/') ||
                (currentPath.startsWith('/posts/') && linkPath === '/posts/') ||
                (currentPath.startsWith('/acerca-de/') && linkPath === '/acerca-de/')) {
                link.classList.add('active');
            }

            // Efecto hover mejorado
            link.addEventListener('mouseenter', () => {
                if (!link.classList.contains('active')) {
                    link.style.transform = 'translateY(-2px)';
                }
            });

            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    link.style.transform = 'translateY(0)';
                }
            });
        });
    }

    /**
     * Configura animaciones de entrada
     */
    setupAnimations() {
        // Intersection Observer para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos para animar
        const elementsToAnimate = document.querySelectorAll(
            '.post-card, .about-section, .hero-section'
        );
        
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });

        // Animacion inicial para el hero
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            setTimeout(() => {
                heroSection.classList.add('fade-in');
            }, 200);
        }
    }

    /**
     * Configura el manejo de preferencias del sistema
     */
    setupSystemPreferences() {
        // Escuchar cambios en la preferencia de tema del sistema
        window.matchMedia('(prefers-color-scheme: dark)')
              .addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                this.updateThemeIcon();
            }
        });

        // Respetar preferencia de movimiento reducido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        }
    }

    /**
     * Utilidades para mejorar la experiencia
     */
    setupUtilities() {
        // Prevenir FOUC (Flash of Unstyled Content)
        document.documentElement.style.visibility = 'visible';

        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mejorar accesibilidad del teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });
    }

    /**
     * Manejo de errores
     */
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Error en el blog:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Promise rechazada:', e.reason);
        });
    }
}

// Clase para manejar funcionalidades especificas de posts
class PostManager {
    constructor() {
        this.setupReadingTime();
        this.setupPostInteractions();
    }

    /**
     * Calcula y muestra el tiempo de lectura estimado
     */
    setupReadingTime() {
        const posts = document.querySelectorAll('.post-card');
        
        posts.forEach(post => {
            const content = post.querySelector('.post-excerpt');
            if (!content) return;

            const text = content.textContent || content.innerText;
            const wordsPerMinute = 200;
            const wordCount = text.trim().split(/\s+/).length;
            const readingTime = Math.ceil(wordCount / wordsPerMinute);

            // Crear elemento de tiempo de lectura
            const readingTimeEl = document.createElement('span');
            readingTimeEl.className = 'reading-time';
            readingTimeEl.textContent = `${readingTime} min de lectura`;
            
            const metaEl = post.querySelector('.post-meta');
            if (metaEl) {
                metaEl.appendChild(readingTimeEl);
            }
        });
    }

    /**
     * Configura interacciones mejoradas en posts
     */
    setupPostInteractions() {
        const postCards = document.querySelectorAll('.post-card');
        
        postCards.forEach(card => {
            // Efecto de parallax sutil
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

// Inicializar cuando el DOM este listo
document.addEventListener('DOMContentLoaded', () => {
    // Evitar FOUC aplicando tema inmediatamente
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Inicializar managers
    window.blogManager = new BlogManager();
    window.postManager = new PostManager();
});

// Inicializar funcionalidades adicionales cuando la pagina este completamente cargada
window.addEventListener('load', () => {
    // Remover indicadores de carga si existen
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }

    // Aplicar animaciones finales
    document.body.classList.add('loaded');
});

// Exportar para uso global si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogManager, PostManager };
}
