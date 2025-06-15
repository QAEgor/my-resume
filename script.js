document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('language-toggle');
    const html = document.querySelector('html');
    const translatableElements = document.querySelectorAll('[data-en], [data-he], [data-en-list], [data-he-list]');

    let isEnglish = true;

    const updateText = () => {
        translatableElements.forEach(element => {
            if (element.tagName === 'UL') {
                const enList = element.getAttribute('data-en-list');
                const heList = element.getAttribute('data-he-list');
                if (isEnglish && enList) {
                    element.innerHTML = enList.split(',').map(item => `<li>${item.trim()}</li>`).join('');
                } else if (!isEnglish && heList) {
                    element.innerHTML = heList.split(',').map(item => `<li>${item.trim()}</li>`).join('');
                }
            } else {
                if (isEnglish) {
                    element.textContent = element.getAttribute('data-en');
                } else {
                    element.textContent = element.getAttribute('data-he');
                }
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
    downloadPdfButton.addEventListener('click', () => {
        const element = document.body;
        html2pdf().from(element).save('resume.pdf');
    });
}); 