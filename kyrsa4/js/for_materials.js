// Materials Tabs
const materialsTabs = document.querySelectorAll('.materials-tabs__button');
if (materialsTabs.length > 0) {
    materialsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            materialsTabs.forEach(t => t.classList.remove('materials-tabs__button--active'));

            // Add active class to clicked tab
            tab.classList.add('materials-tabs__button--active');

            // Hide all content
            const contents = document.querySelectorAll('.materials-content');
            contents.forEach(content => content.classList.remove('materials-content--active'));

            // Show corresponding content
            const contentId = tab.getAttribute('data-tab') + 'Content';
            document.getElementById(contentId).classList.add('materials-content--active');
        });
    });
}

// Materials Search
const materialsSearch = document.querySelector('.materials-search__input');
if (materialsSearch) {
    materialsSearch.addEventListener('input', () => {
        const searchValue = materialsSearch.value.toLowerCase();
        const materialCards = document.querySelectorAll('.material-card');

        materialCards.forEach(card => {
            const title = card.querySelector('.material-card__title').textContent.toLowerCase();
            const description = card.querySelector('.material-card__description').textContent.toLowerCase();
            const author = card.querySelector('.material-card__author').textContent.toLowerCase();
            const type = card.querySelector('.material-card__type').textContent.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue) ||
                author.includes(searchValue) || type.includes(searchValue)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Materials Filters
const subjectFilter = document.getElementById('subjectFilter');
const typeFilter = document.getElementById('typeFilter');
const semesterFilter = document.getElementById('semesterFilter');

function filterMaterials() {
    const subject = subjectFilter.value;
    const type = typeFilter.value;
    const semester = semesterFilter.value;

    const materialSections = document.querySelectorAll('.materials-section');

    materialSections.forEach(section => {
        const sectionTitle = section.querySelector('.materials-section__title').textContent.toLowerCase();
        const cards = section.querySelectorAll('.material-card');

        // Subject filter
        let showSection = true;
        if (subject !== 'all') {
            if (subject === 'math' && !sectionTitle.includes('математика')) {
                showSection = false;
            } else if (subject === 'programming' && !sectionTitle.includes('программирование')) {
                showSection = false;
            } else if (subject === 'physics' && !sectionTitle.includes('физика')) {
                showSection = false;
            } else if (subject === 'english' && !sectionTitle.includes('английский')) {
                showSection = false;
            } else if (subject === 'history' && !sectionTitle.includes('история')) {
                showSection = false;
            } else if (subject === 'economics' && !sectionTitle.includes('экономика')) {
                showSection = false;
            }
        }

        section.style.display = showSection ? '' : 'none';

        // Type and semester filters for individual cards
        cards.forEach(card => {
            let showCard = true;
            const cardType = card.querySelector('.material-card__type').textContent.toLowerCase();

            // Type filter
            if (type !== 'all') {
                if (type === 'lecture' && !cardType.includes('лекция')) {
                    showCard = false;
                } else if (type === 'practice' && !cardType.includes('практическ')) {
                    showCard = false;
                } else if (type === 'lab' && !cardType.includes('лабораторн')) {
                    showCard = false;
                } else if (type === 'book' && !cardType.includes('учебник')) {
                    showCard = false;
                } else if (type === 'article' && !cardType.includes('статья')) {
                    showCard = false;
                } else if (type === 'video' && !cardType.includes('видео')) {
                    showCard = false;
                }
            }

            // Semester filter (simplified for demo)
            if (semester !== 'all') {
                // In a real application, you would have semester data for each material
                // For this demo, we'll just hide some cards randomly based on the semester
                if (semester === 'current' && Math.random() < 0.3) {
                    showCard = false;
                } else if (semester === '1' && Math.random() < 0.7) {
                    showCard = false;
                } else if (semester === '2' && Math.random() < 0.6) {
                    showCard = false;
                } else if (semester === '3' && Math.random() < 0.5) {
                    showCard = false;
                } else if (semester === '4' && Math.random() < 0.8) {
                    showCard = false;
                }
            }

            card.style.display = showCard ? '' : 'none';
        });
    });
}

if (subjectFilter) {
    subjectFilter.addEventListener('change', filterMaterials);
}

if (typeFilter) {
    typeFilter.addEventListener('change', filterMaterials);
}

if (semesterFilter) {
    semesterFilter.addEventListener('change', filterMaterials);
}

// Favorite toggle
const favoriteButtons = document.querySelectorAll('.material-card__action[title="Добавить в избранное"], .material-card__action[title="Удалить из избранного"]');
favoriteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isActive = button.classList.contains('material-card__action--active');

        if (isActive) {
            button.classList.remove('material-card__action--active');
            button.setAttribute('title', 'Добавить в избранное');
            button.innerHTML = '<i class="far fa-star"></i>';
        } else {
            button.classList.add('material-card__action--active');
            button.setAttribute('title', 'Удалить из избранного');
            button.innerHTML = '<i class="fas fa-star"></i>';
        }
    });
});