(function() {
    window.addEventListener('load', function() {
        const loadTime = performance.now();

        const roundedLoadTime = (loadTime / 1000).toFixed(3);

        const loadTimeElement = document.createElement('p');
        loadTimeElement.textContent = `Время загрузки страницы: ${roundedLoadTime} секунд`;

        const footer = document.querySelector('.footer');
        if (footer) {
            footer.appendChild(loadTimeElement);
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navlink');
    const currentUrl = window.location.href.split('#')[0];

    navLinks.forEach(link => {
        // Для основной страницы
        if (currentUrl.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        }

        // Для якорных ссылок
        if (window.location.hash && window.location.hash.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});