/**
 * Gestión de funcionalidades específicas para la página Acerca de
 * @description Maneja las interacciones y efectos específicos de la página About
 */
class AboutPageManager {
    constructor() {
        this.init();
    }

    /**
     * Inicializa todas las funcionalidades de la página About
     */
    init() {
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupSocialLinks();
    }

    /**
     * Configura las animaciones de entrada para los elementos
     */
    setupAnimations() {
        const sections = document.querySelectorAll('.about-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    /**
     * Configura efectos de scroll suaves
     */
    setupScrollEffects() {
        const authorPhoto = document.querySelector('.author-photo');
        if (authorPhoto) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const photoOffset = scrollY * 0.1;
                authorPhoto.style.transform = `translateY(${photoOffset}px)`;
            });
        }
    }

    /**
     * Configura los enlaces sociales con efectos
     */
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0)';
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AboutPageManager();
});
