document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('certificate-viewer');
    const viewerImage = document.getElementById('certificate-viewer-image');
    const closeButton = viewer?.querySelector('.certificate-viewer-close');

    if (!viewer || !viewerImage) return;

    const closeViewer = () => {
        if (viewer.open) viewer.close();
    };

    document.querySelectorAll('.certificate-open').forEach((button) => {
        button.addEventListener('click', () => {
            const source = button.dataset.certificateSrc;
            const preview = button.querySelector('img');
            if (!source) return;

            viewerImage.src = source;
            viewerImage.alt = preview?.alt || 'Certificaat';
            viewer.showModal();
        });
    });

    closeButton?.addEventListener('click', closeViewer);

    viewer.addEventListener('click', (event) => {
        if (event.target === viewer) closeViewer();
    });

    viewer.addEventListener('close', () => {
        viewerImage.removeAttribute('src');
    });
});
