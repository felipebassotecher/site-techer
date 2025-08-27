const animationKey = 'data-custom-animation';
const animateOn = 'data-custom-animation-on';

document.addEventListener('DOMContentLoaded', () => {
    const appearOnViewportObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.getAttribute(animationKey);
                entry.target.classList.add(animation);
                appearOnViewportObserver.unobserve(entry.target); // Optional: Stop observing after animation
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    document.querySelectorAll(`[${animationKey}]`)
        .forEach(element => {
            const shouldAnimateOn = element.getAttribute(animateOn);

            switch(shouldAnimateOn) {
                case 'appear':
                case 'undefined':
                    appearOnViewportObserver.observe(element);
                    const animation = element.getAttribute(animationKey);
                    element.classList.remove(animation);
                    break;
            }
        });
});