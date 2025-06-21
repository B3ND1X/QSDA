
// Register service worker for PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

// Load saved dark mode preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Toggle dark mode manually
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Search function
document.getElementById('search').addEventListener('input', function () {
    const value = this.value.toLowerCase();
    document.querySelectorAll('.recipe-box').forEach(box => {
        const text = box.innerText.toLowerCase();
        box.style.display = text.includes(value) ? 'block' : 'none';
    });
});

// Collapsible recipe toggle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.recipe-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.classList.toggle('open');
            button.classList.toggle('active');
        });
    });
});
