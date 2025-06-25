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
        const link = document.createElement('a');
        link.href = 'assets/CV Egor Borisenko.pdf';
        link.download = 'CV Egor Borisenko.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}); 