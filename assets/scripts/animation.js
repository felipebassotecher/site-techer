const animationKey = 'data-custom-animation';

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute(animationKey);
                entry.target.classList.add(animation);
                observer.unobserve(entry.target); // Optional: Stop observing after animation
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    document.querySelectorAll(`[${animationKey}]`)
        .forEach(element => {
            observer.observe(element);
            const animation = element.getAttribute(animationKey);
            element.classList.remove(animation);
            element.style.opacity = '0'; // Hide initially
        });
});