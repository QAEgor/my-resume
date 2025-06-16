document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    const html = document.querySelector('html');
    const translatableElements = document.querySelectorAll('[data-en], [data-he], [data-en-list], [data-he-list]');

    let isEnglish = true;

    const updateText = () => {
        translatableElements.forEach(element => {
            if (isEnglish) {
                element.innerHTML = element.getAttribute('data-en');
            } else {
                element.innerHTML = element.getAttribute('data-he');
            }
        });
    };

    languageToggle.addEventListener('click', () => {
        isEnglish = !isEnglish;
        html.lang = isEnglish ? 'en' : 'he';
        languageToggle.textContent = isEnglish ? 'Switch to Hebrew' : 'Switch to English';
        updateText();
    });

    // Initial text update
    updateText();

    const downloadPdfButton = document.getElementById('download-pdf');
    const screenHeader = document.getElementById('screen-header');
    const pdfHeader = document.getElementById('pdf-header');

    downloadPdfButton.addEventListener('click', () => {
        // Hide screen header and show PDF header before generating PDF
        if (screenHeader) screenHeader.style.display = 'none';
        if (pdfHeader) pdfHeader.style.display = 'block';

        const element = document.body;
        html2pdf().from(element).set({
            margin: [10, 10, 10, 10], // top, left, bottom, right
            filename: 'CV Egor Borisenko.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 3, // Increased scale for better resolution
                useCORS: true,
                // We no longer need ignoreElements here as we are controlling visibility directly
            },
            jsPDF: { unit: 'mm', format: 'A4', orientation: 'portrait' }
        }).save().then(() => {
            // Revert display styles after PDF generation
            if (screenHeader) screenHeader.style.display = 'block';
            if (pdfHeader) pdfHeader.style.display = 'none';
        }).catch(error => {
            console.error('Error generating PDF:', error);
            // Ensure visibility is reverted even on error
            if (screenHeader) screenHeader.style.display = 'block';
            if (pdfHeader) pdfHeader.style.display = 'none';
        });
    });
}); 