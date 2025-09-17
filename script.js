document.addEventListener('DOMContentLoaded', () => {
    const courseNameInput = document.getElementById('course-name');
    const gradeSelect = document.getElementById('grade');
    const creditsInput = document.getElementById('credits');
    const addCourseButton = document.getElementById('add-course');
    const coursesList = document.getElementById('courses');
    const gpaDisplay = document.getElementById('gpa-display');
    const clearAllButton = document.getElementById('clear-all');

    let courses = [];

    function getPointsForGrade(gradeValue) {
        return parseFloat(gradeValue);
    }

    function updateGPA() {
        let totalCredits = 0;
        let totalGradePoints = 0;

        courses.forEach(course => {
            totalCredits += course.credits;
            totalGradePoints += course.gradePoints * course.credits;
        });

        const gpa = totalCredits === 0 ? 0 : totalGradePoints / totalCredits;
        gpaDisplay.textContent = gpa.toFixed(2);
    }

    function addCourseToList(course) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${course.name} - Grade: ${course.gradeLetter} - Credits: ${course.credits}</span>
            <button class="delete-course" data-index="${courses.indexOf(course)}">Delete</button>
        `;
        coursesList.appendChild(listItem);

        listItem.querySelector('.delete-course').addEventListener('click', (event) => {
            const indexToDelete = parseInt(event.target.dataset.index);
            courses.splice(indexToDelete, 1);
            renderCourses(); // Re-render to update indices and display
            updateGPA();
        });
    }

    function renderCourses() {
        coursesList.innerHTML = ''; // Clear existing list
        courses.forEach(course => addCourseToList(course));
    }

    addCourseButton.addEventListener('click', () => {
        const courseName = courseNameInput.value.trim();
        const gradeValue = gradeSelect.value;
        const gradeLetter = gradeSelect.options[gradeSelect.selectedIndex].text;
        const credits = parseInt(creditsInput.value);

        if (courseName === '' || isNaN(credits) || credits <= 0) {
            alert('Please enter a valid course name and credits.');
            return;
        }

        const gradePoints = getPointsForGrade(gradeValue);

        const newCourse = {
            name: courseName,
            gradeLetter: gradeLetter,
            gradePoints: gradePoints,
            credits: credits
        };

        courses.push(newCourse);
        renderCourses();
        updateGPA();

        // Clear input fields
        courseNameInput.value = '';
        gradeSelect.value = '4.0';
        creditsInput.value = '3';
    });

    clearAllButton.addEventListener('click', () => {
        courses = [];
        renderCourses();
        updateGPA();
    });

    // Initial render and GPA update
    renderCourses();
    updateGPA();
});
