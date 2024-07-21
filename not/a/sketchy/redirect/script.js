document.addEventListener('DOMContentLoaded', () => {
    // Get all tilt-container elements
    const tiltContainers = document.querySelectorAll('.tilt-container');

    // Add mousemove event listener to each tilt-container
    tiltContainers.forEach((container) => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = container.clientWidth / 2;
            const centerY = container.clientHeight / 2;
            const tiltX = (centerX - x) / centerX * 5; // Adjust the multiplier for tilt effect
            const tiltY = (centerY - y) / centerY * 5; // Adjust the multiplier for tilt effect
        
            container.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
        });
        
        // Reset the tilt when mouse leaves the container
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
});
