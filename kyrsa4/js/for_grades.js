// Grades Distribution Chart
const gradesDistributionChart = document.getElementById('gradesDistributionChart');
if (gradesDistributionChart) {
    new Chart(gradesDistributionChart, {
        type: 'bar',
        data: {
            labels: ['Математика', 'Программирование', 'Физика', 'Английский язык', 'История', 'Экономика'],
            datasets: [{
                label: 'Текущий балл',
                data: [4.2, 5.0, 3.5, 4.7, 4.3, 4.8],
                backgroundColor: [
                    'rgba(74, 107, 175, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(255, 152, 0, 0.7)',
                    'rgba(33, 150, 243, 0.7)',
                    'rgba(156, 39, 176, 0.7)',
                    'rgba(255, 112, 67, 0.7)'
                ],
                borderColor: [
                    'rgba(74, 107, 175, 1)',
                    'rgba(76, 175, 80, 1)',
                    'rgba(255, 152, 0, 1)',
                    'rgba(33, 150, 243, 1)',
                    'rgba(156, 39, 176, 1)',
                    'rgba(255, 112, 67, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}

// Semester History Chart
const semesterHistoryChart = document.getElementById('semesterHistoryChart');
if (semesterHistoryChart) {
    new Chart(semesterHistoryChart, {
        type: 'line',
        data: {
            labels: ['1 семестр', '2 семестр', '3 семестр', 'Текущий'],
            datasets: [{
                label: 'Средний балл',
                data: [4.1, 4.3, 4.4, 4.5],
                backgroundColor: 'rgba(74, 107, 175, 0.2)',
                borderColor: 'rgba(74, 107, 175, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3,
                    max: 5
                }
            }
        }
    });
}

// Subject History Chart
const subjectHistoryChart = document.getElementById('subjectHistoryChart');
if (subjectHistoryChart) {
    new Chart(subjectHistoryChart, {
        type: 'line',
        data: {
            labels: ['1 семестр', '2 семестр', '3 семестр', 'Текущий'],
            datasets: [
                {
                    label: 'Математика',
                    data: [3.8, 4.0, 4.1, 4.2],
                    borderColor: 'rgba(74, 107, 175, 1)',
                    backgroundColor: 'rgba(74, 107, 175, 0.1)',
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Программирование',
                    data: [4.5, 4.7, 4.8, 5.0],
                    borderColor: 'rgba(76, 175, 80, 1)',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 2,
                    tension: 0.3
                },
                {
                    label: 'Физика',
                    data: [3.2, 3.3, 3.4, 3.5],
                    borderColor: 'rgba(255, 152, 0, 1)',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    borderWidth: 2,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 3,
                    max: 5
                }
            }
        }
    });
}

// Grades History Tabs
const historyTabs = document.querySelectorAll('.grades-history__tab');
if (historyTabs.length > 0) {
    historyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            historyTabs.forEach(t => t.classList.remove('grades-history__tab--active'));

            // Add active class to clicked tab
            tab.classList.add('grades-history__tab--active');

            // Hide all content
            const contents = document.querySelectorAll('.grades-history__content');
            contents.forEach(content => content.classList.remove('grades-history__content--active'));

            // Show corresponding content
            const contentId = tab.getAttribute('data-tab') + 'Content';
            document.getElementById(contentId).classList.add('grades-history__content--active');
        });
    });
}