document.addEventListener('DOMContentLoaded', () => {
    const gridImages = document.querySelectorAll('.project-grid-image');
    const fullscreenViewer = document.getElementById('fullscreen-viewer');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeViewer = document.getElementById('close-viewer');

    gridImages.forEach(img => {
        img.addEventListener('click', () => {
            fullscreenImage.src = img.src;
            fullscreenViewer.classList.add('open');
        });
    });

    closeViewer.addEventListener('click', () => {
        fullscreenViewer.classList.remove('open');
        fullscreenImage.src = '';
    });
});
