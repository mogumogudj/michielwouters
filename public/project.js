document.addEventListener('DOMContentLoaded', () => {
    const gridImages = document.querySelectorAll('.project-grid-image');
    const fullscreenViewer = document.getElementById('fullscreen-viewer');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeViewer = document.getElementById('close-viewer');

    let scale = 1;
    let isDragging = false;
    let startX, startY, currentX = 0, currentY = 0;

    let initialDistance = 0;
    let initialScale = 1;

    // Open fullscreen
    gridImages.forEach(img => {
        img.addEventListener('click', () => {
            fullscreenImage.src = img.src;
            fullscreenViewer.classList.add('open');
            resetZoom();
        });
    });

    // Close fullscreen
    closeViewer.addEventListener('click', () => {
        fullscreenViewer.classList.remove('open');
        fullscreenImage.src = '';
    });

    // Desktop Zoom
    fullscreenViewer.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            scale += 0.1;
        } else {
            scale = Math.max(1, scale - 0.1);
        }
        updateTransform();
    });

    // Desktop Drag
    fullscreenImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        fullscreenImage.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        fullscreenImage.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        updateTransform();
    });

    // Mobile: Touch Support
    fullscreenImage.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            // Single finger drag
            isDragging = true;
            startX = e.touches[0].clientX - currentX;
            startY = e.touches[0].clientY - currentY;
        } else if (e.touches.length === 2) {
            // Pinch start
            isDragging = false;
            initialDistance = getDistance(e.touches[0], e.touches[1]);
            initialScale = scale;
        }
    });

    fullscreenImage.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 1 && isDragging) {
            currentX = e.touches[0].clientX - startX;
            currentY = e.touches[0].clientY - startY;
            updateTransform();
        } else if (e.touches.length === 2) {
            const currentDistance = getDistance(e.touches[0], e.touches[1]);
            scale = Math.max(1, initialScale * (currentDistance / initialDistance));
            updateTransform();
        }
    }, { passive: false });

    fullscreenImage.addEventListener('touchend', (e) => {
        if (e.touches.length === 0) {
            isDragging = false;
        }
    });

    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function updateTransform() {
        fullscreenImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
    }

    function resetZoom() {
        scale = 1;
        currentX = 0;
        currentY = 0;
        fullscreenImage.style.transform = 'translate(0, 0) scale(1)';
        fullscreenImage.style.cursor = 'grab';
    }
});
