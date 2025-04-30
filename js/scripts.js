document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const navListItems = document.querySelectorAll('nav ul li');

    if (!sections.length || !navLinks.length) {
        console.warn('Observer script: Could not find sections or nav links.');
        return;
    }

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '-40% 0px -60% 0px', // Adjust margins to trigger highlight when section is roughly centered
        threshold: 0 // Trigger as soon as any part of the section enters/leaves the rootMargin area
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all list items
                navListItems.forEach(li => {
                    li.classList.remove('active');
                });

                // Find the corresponding nav link and add active class to its parent li
                const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
                if (activeLink && activeLink.parentElement) {
                    activeLink.parentElement.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}); 