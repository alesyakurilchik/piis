// Assignments Tabs
const assignmentsTabs = document.querySelectorAll('.assignments-tabs__button');
if (assignmentsTabs.length > 0) {
    assignmentsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            assignmentsTabs.forEach(t => t.classList.remove('assignments-tabs__button--active'));

            // Add active class to clicked tab
            tab.classList.add('assignments-tabs__button--active');

            // Hide all content
            const contents = document.querySelectorAll('.assignments-content');
            contents.forEach(content => content.classList.remove('assignments-content--active'));

            // Show corresponding content
            const contentId = tab.getAttribute('data-tab') + 'Content';
            document.getElementById(contentId).classList.add('assignments-content--active');
        });
    });
}

// Populate All Assignments Tab
const allContent = document.getElementById('allContent');
if (allContent) {
    // Clone content from other tabs
    const upcomingContent = document.getElementById('upcomingContent');
    const submittedContent = document.getElementById('submittedContent');
    const gradedContent = document.getElementById('gradedContent');

    if (upcomingContent && submittedContent && gradedContent) {
        allContent.innerHTML = '<div class="assignments-list">' +
            upcomingContent.querySelector('.assignments-list').innerHTML +
            submittedContent.querySelector('.assignments-list').innerHTML +
            gradedContent.querySelector('.assignments-list').innerHTML +
            '</div>';
    }
}

// Assignment Filters
const statusFilter = document.getElementById('assignmentStatusFilter');
const subjectFilter = document.getElementById('assignmentSubjectFilter');

function filterAssignments() {
    const status = statusFilter.value;
    const subject = subjectFilter.value;

    const allAssignments = document.querySelectorAll('.assignment-card');

    allAssignments.forEach(assignment => {
        let statusMatch = true;
        let subjectMatch = true;

        // Status filter
        if (status !== 'all') {
            if (status === 'pending' && !assignment.classList.contains('assignment-card--urgent') &&
                !assignment.classList.contains('assignment-card--submitted') &&
                !assignment.classList.contains('assignment-card--graded')) {
                statusMatch = true;
            } else if (status === 'submitted' && assignment.classList.contains('assignment-card--submitted')) {
                statusMatch = true;
            } else if (status === 'graded' && assignment.classList.contains('assignment-card--graded')) {
                statusMatch = true;
            } else statusMatch = status === 'overdue' && assignment.classList.contains('assignment-card--overdue');
        }

        // Subject filter
        if (subject !== 'all') {
            const assignmentSubject = assignment.querySelector('.assignment-card__subject').textContent.toLowerCase();

            if (subject === 'math' && assignmentSubject.includes('математика')) {
                subjectMatch = true;
            } else if (subject === 'programming' && assignmentSubject.includes('программирование')) {
                subjectMatch = true;
            } else if (subject === 'physics' && assignmentSubject.includes('физика')) {
                subjectMatch = true;
            } else if (subject === 'english' && assignmentSubject.includes('английский')) {
                subjectMatch = true;
            } else if (subject === 'history' && assignmentSubject.includes('история')) {
                subjectMatch = true;
            } else subjectMatch = subject === 'economics' && assignmentSubject.includes('экономика');
        }

        // Show or hide based on filters
        if (statusMatch && subjectMatch) {
            assignment.style.display = '';
        } else {
            assignment.style.display = 'none';
        }
    });
}

if (statusFilter) {
    statusFilter.addEventListener('change', filterAssignments);
}

if (subjectFilter) {
    subjectFilter.addEventListener('change', filterAssignments);
}