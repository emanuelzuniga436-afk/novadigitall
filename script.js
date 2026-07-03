const nav = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => nav.classList.remove('active'));
    });

    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove('active');
        }
    });
}
