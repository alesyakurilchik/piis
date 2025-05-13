// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navList = document.querySelector('.nav__list');
const backToTop = document.getElementById('backToTop');

// Theme Toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');

        // Save theme preference to localStorage
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
        }
    }
}

// Mobile Navigation
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && navList.classList.contains('active')) {
            navToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
}

// Back to Top Button
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Carousel
const carousel = document.getElementById('carousel');
if (carousel) {
    const track = carousel.querySelector('.carousel__track');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const dots = document.getElementById('carouselDots');

    let currentIndex = 0;
    const slideWidth = 100; // 100%

    // Initialize carousel
    function initCarousel() {
        // Set initial position
        updateCarousel();

        // Auto slide
        let interval = setInterval(nextSlide, 5000);

        // Reset interval on manual navigation
        carousel.addEventListener('click', () => {
            clearInterval(interval);
            interval = setInterval(nextSlide, 5000);
        });

        // Event listeners
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);

        // Create dots if they don't exist
        if (dots && dots.children.length === 0) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('carousel__dot');
                if (index === 0) dot.classList.add('carousel__dot--active');
                dot.addEventListener('click', () => goToSlide(index));
                dots.appendChild(dot);
            });
        }
    }

    function updateCarousel() {
        // Update track position
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;

        // Update dots
        if (dots) {
            Array.from(dots.children).forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('carousel__dot--active');
                } else {
                    dot.classList.remove('carousel__dot--active');
                }
            });
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Initialize carousel if it exists
    if (slides.length > 0) {
        initCarousel();
    }
}

// Stats Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const interval = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            clearInterval(timer);
            current = target;
        }
        element.textContent = Math.round(current);
    }, interval);
}

// Initialize counters when they come into view
function initCounters() {
    const counters = [
        { id: 'studentsCount', target: 5000 },
        { id: 'teachersCount', target: 350 },
        { id: 'coursesCount', target: 120 },
        { id: 'universitiesCount', target: 25 }
    ];

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            // Check if element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(element, counter.target);
                        observer.unobserve(element);
                    }
                });
            });

            observer.observe(element);
        }
    });
}

// Initialize counters
initCounters();

// Modal
const studentModal = document.getElementById('studentModal');
if (studentModal) {
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const viewButtons = document.querySelectorAll('.students-table__action--view');

    function openModal() {
        studentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        studentModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    viewButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    if (closeModal) closeModal.addEventListener('click', closeModalFunc);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModalFunc);

    // Close modal when clicking outside
    studentModal.addEventListener('click', (e) => {
        if (e.target === studentModal) {
            closeModalFunc();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && studentModal.classList.contains('active')) {
            closeModalFunc();
        }
    });
}

// Password Toggle
const togglePassword = document.getElementById('togglePassword');
if (togglePassword) {
    const passwordInput = document.getElementById('loginPassword');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle icon
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
if (toggleRegisterPassword) {
    const passwordInput = document.getElementById('registerPassword');

    toggleRegisterPassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Toggle icon
        const icon = toggleRegisterPassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

// Auth Tabs
const authTabs = document.querySelectorAll('.auth-tabs__button');
if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            authTabs.forEach(t => t.classList.remove('auth-tabs__button--active'));

            // Add active class to clicked tab
            tab.classList.add('auth-tabs__button--active');

            // Hide all content
            const contents = document.querySelectorAll('.auth-content');
            contents.forEach(content => content.classList.remove('auth-content--active'));

            // Show corresponding content
            const contentId = tab.getAttribute('data-tab') + 'Content';
            document.getElementById(contentId).classList.add('auth-content--active');
        });
    });
}

// Reports Tabs
const reportsTabs = document.querySelectorAll('.reports-tabs__button');
if (reportsTabs.length > 0) {
    reportsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            reportsTabs.forEach(t => t.classList.remove('reports-tabs__button--active'));

            // Add active class to clicked tab
            tab.classList.add('reports-tabs__button--active');

            // Hide all content
            const contents = document.querySelectorAll('.reports-content');
            contents.forEach(content => content.classList.remove('reports-content--active'));

            // Show corresponding content
            const contentId = tab.getAttribute('data-tab') + 'Reports';
            document.getElementById(contentId).classList.add('reports-content--active');
        });
    });
}

// Performance Charts
if (typeof Chart !== 'undefined') {
    // Subjects Chart
    const subjectsChart = document.getElementById('subjectsChart');
    if (subjectsChart) {
        new Chart(subjectsChart, {
            type: 'bar',
            data: {
                labels: ['Математика', 'Программирование', 'Физика', 'Экономика', 'История', 'Английский'],
                datasets: [{
                    label: 'Средний балл',
                    data: [4.2, 4.5, 3.8, 4.1, 4.3, 4.0],
                    backgroundColor: [
                        'rgba(74, 107, 175, 0.7)',
                        'rgba(74, 107, 175, 0.7)',
                        'rgba(74, 107, 175, 0.7)',
                        'rgba(74, 107, 175, 0.7)',
                        'rgba(74, 107, 175, 0.7)',
                        'rgba(74, 107, 175, 0.7)'
                    ],
                    borderColor: [
                        'rgba(74, 107, 175, 1)',
                        'rgba(74, 107, 175, 1)',
                        'rgba(74, 107, 175, 1)',
                        'rgba(74, 107, 175, 1)',
                        'rgba(74, 107, 175, 1)',
                        'rgba(74, 107, 175, 1)'
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

    // Grades Chart
    const gradesChart = document.getElementById('gradesChart');
    if (gradesChart) {
        new Chart(gradesChart, {
            type: 'pie',
            data: {
                labels: ['Отлично (5)', 'Хорошо (4)', 'Удовлетворительно (3)', 'Неудовлетворительно (2)'],
                datasets: [{
                    data: [35, 45, 15, 5],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(74, 107, 175, 0.7)',
                        'rgba(255, 152, 0, 0.7)',
                        'rgba(244, 67, 54, 0.7)'
                    ],
                    borderColor: [
                        'rgba(76, 175, 80, 1)',
                        'rgba(74, 107, 175, 1)',
                        'rgba(255, 152, 0, 1)',
                        'rgba(244, 67, 54, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    // Dynamics Chart
    const dynamicsChart = document.getElementById('dynamicsChart');
    if (dynamicsChart) {
        new Chart(dynamicsChart, {
            type: 'line',
            data: {
                labels: ['Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь', 'Февраль'],
                datasets: [{
                    label: 'Средний балл',
                    data: [3.8, 4.0, 4.2, 4.1, 4.3, 4.5],
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
}

// Table Sorting
const sortableHeaders = document.querySelectorAll('.students-table__header--sortable');
if (sortableHeaders.length > 0) {
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortBy = header.getAttribute('data-sort');
            const table = header.closest('table');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            // Get current sort direction
            let sortDirection = header.getAttribute('data-direction') || 'asc';

            // Toggle sort direction
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            header.setAttribute('data-direction', sortDirection);

            // Update sort icons
            sortableHeaders.forEach(h => {
                const icon = h.querySelector('i');
                if (h === header) {
                    icon.className = sortDirection === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
                } else {
                    icon.className = 'fas fa-sort';
                    h.removeAttribute('data-direction');
                }
            });

            // Sort rows
            rows.sort((a, b) => {
                const aValue = a.querySelector(`td:nth-child(${Array.from(a.parentNode.children).indexOf(a) + 1})`).textContent.trim();
                const bValue = b.querySelector(`td:nth-child(${Array.from(b.parentNode.children).indexOf(b) + 1})`).textContent.trim();

                // Check if values are numbers
                const aNum = parseFloat(aValue);
                const bNum = parseFloat(bValue);

                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
                }

                // Sort as strings
                return sortDirection === 'asc' ?
                    aValue.localeCompare(bValue, 'ru') :
                    bValue.localeCompare(aValue, 'ru');
            });

            // Reorder rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

// Student Search
const studentSearch = document.getElementById('studentSearch');
if (studentSearch) {
    studentSearch.addEventListener('input', () => {
        const searchValue = studentSearch.value.toLowerCase();
        const table = document.getElementById('studentsTable');
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            if (name.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Faculty Filter
const facultyFilter = document.getElementById('facultyFilter');
if (facultyFilter) {
    facultyFilter.addEventListener('change', filterStudents);
}

// Course Filter
const courseFilter = document.getElementById('courseFilter');
if (courseFilter) {
    courseFilter.addEventListener('change', filterStudents);
}

// Group Filter
const groupFilter = document.getElementById('groupFilter');
if (groupFilter) {
    groupFilter.addEventListener('change', filterStudents);
}

// Filter Students Function
function filterStudents() {
    const faculty = facultyFilter ? facultyFilter.value : '';
    const course = courseFilter ? courseFilter.value : '';
    const group = groupFilter ? groupFilter.value : '';

    const table = document.getElementById('studentsTable');
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const rowFaculty = row.querySelector('td:nth-child(3)').textContent;
        const rowCourse = row.querySelector('td:nth-child(4)').textContent;
        const rowGroup = row.querySelector('td:nth-child(5)').textContent;

        const facultyMatch = faculty === '' || rowFaculty.includes(faculty);
        const courseMatch = course === '' || rowCourse === course;
        const groupMatch = group === '' || rowGroup === group;

        if (facultyMatch && courseMatch && groupMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Password Strength Meter
const registerPassword = document.getElementById('registerPassword');
if (registerPassword) {
    registerPassword.addEventListener('input', () => {
        const password = registerPassword.value;
        const strengthBar = document.querySelector('.password-strength__progress');
        const strengthLabel = document.querySelector('.password-strength__label');

        // Calculate password strength
        let strength = 0;

        // Length check
        if (password.length >= 8) strength += 25;

        // Contains lowercase
        if (/[a-z]/.test(password)) strength += 25;

        // Contains uppercase
        if (/[A-Z]/.test(password)) strength += 25;

        // Contains number or special char
        if (/[0-9!@#$%^&*]/.test(password)) strength += 25;

        // Update UI
        strengthBar.style.width = `${strength}%`;

        // Set color based on strength
        if (strength < 25) {
            strengthBar.style.backgroundColor = '#f44336';
            strengthLabel.textContent = 'Очень слабый пароль';
        } else if (strength < 50) {
            strengthBar.style.backgroundColor = '#ff9800';
            strengthLabel.textContent = 'Слабый пароль';
        } else if (strength < 75) {
            strengthBar.style.backgroundColor = '#ffc107';
            strengthLabel.textContent = 'Средний пароль';
        } else if (strength < 100) {
            strengthBar.style.backgroundColor = '#8bc34a';
            strengthLabel.textContent = 'Хороший пароль';
        } else {
            strengthBar.style.backgroundColor = '#4caf50';
            strengthLabel.textContent = 'Сильный пароль';
        }
    });
}