/**
 * TEMA INICIAL - Aplicar antes de cargar la página para evitar FOUC
 * Este script debe ejecutarse inmediatamente
 */
(function() {
    const savedTheme = localStorage.getItem('theme') ||
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
})();
