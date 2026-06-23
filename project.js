/**
 * =========================================================================================
 * VSSUT Smart Campus Nexus - Complete Decentralized Multi-Branch Core ERP Engine
 * =========================================================================================
 */

// Universal Localized Database Matrix Object
const campusDatabase = {
    // Dynamic Program and Branch Courses Registry
    semesters: {
        "BTECH_CSE_2": [
            { name: "Data Structures & Algorithms", faculty: "Dr. P. K. Mishra (+91-9437XXXXXX)", attended: 22, total: 25, syllabus: 72, notesLink: "https://drive.google.com/cse-dsa-notes" },
            { name: "Engineering Chemistry", faculty: "Dr. S. Das (+91-7008XXXXXX)", attended: 18, total: 23, syllabus: 80, notesLink: "https://drive.google.com/chem-notes" }
        ],
        "BTECH_CSE_1": [
            { name: "Basic Electronics", faculty: "Prof. R. Mohanty", attended: 24, total: 25, syllabus: 100, notesLink: "#" }
        ],
        "BTECH_EE_2": [
            { name: "Network Theory", faculty: "Dr. S. N. Nayak", attended: 20, total: 24, syllabus: 65, notesLink: "https://drive.google.com/ee-network" }
        ]
    },
    // Program, Branch, and Semester Specific PYQ Depositories
    pyqBank: {
        "BTECH_CSE_2": [
            { subject: "Data Structures & Algorithms", type: "Mid-Sem", year: "2024", role: "Faculty", link: "https://drive.google.com/pyq-dsa-mid2024" },
            { subject: "Engineering Chemistry", type: "End-Sem", year: "2023", role: "Student", link: "https://drive.google.com/pyq-chem-end2023" }
        ]
    },
    broadcasts: [
        { title: "Universal Academic Matrix Active", message: "Branch-specific routing systems, digital course note modules, and dual-input PYQ depositories are synchronized." }
    ],
    dynamicEvents: [
        {
            name: "VSSUT Annual Hackathon (DeltaHack)",
            category: "Hackathon",
            role: "Student",
            contact: "Sourav Mohapatra (Enigma Club Lead +91-9853XXXXXX)",
            prereq: "Arrays, Strings, Core C++ or JavaScript Logic, Git Configurations",
            entry: "Form teams of 3-4. Open registration portal closes Friday midnight."
        }
    ],
    placementQuiz: [
        {
            q: "Which specific data structure paradigm operates on a strict Last-In-First-Out (LIFO) model framework?",
            options: ["Queue Structure Layout", "Linked List Node Chain", "Stack Array Mapping", "Binary Max-Heap Architecture"],
            correct: 2,
            explain: "Correct! Stacks enforce linear operations where the last item pushed in is the absolute first element popped out (LIFO)."
        }
    ],
    currentQuizIndex: 0
};

// Program Limitations Lookup Parameters Map
const degreeSyllabusRules = {
    "BTECH": { totalSemesters: 8, label: "B.Tech" },
    "MTECH": { totalSemesters: 4, label: "M.Tech" },
    "BARCH": { totalSemesters: 10, label: "B.Arch" },
    "INTEGRATED": { totalSemesters: 10, label: "Integrated M.Sc" }
};

// Branch Metadata Lookup Labels Map
const branchLabels = {
    "CSE": "Computer Science", "EE": "Electrical Eng.", "ME": "Mechanical Eng.", "CE": "Civil Eng."
};

// Fetching Structural Pointers from DOM Document
const degreeProgramSelect = document.getElementById('degreeProgramSelect');
const branchSelect = document.getElementById('branchSelect');
const studentNameInput = document.getElementById('studentNameInput');
const studentRegInput = document.getElementById('studentRegInput');
const studentSecInput = document.getElementById('studentSecInput');
const syncProfileBtn = document.getElementById('syncProfileBtn');

const displayStudentName = document.getElementById('displayStudentName');
const displayStudentMeta = document.getElementById('displayStudentMeta');

const facultySemSelect = document.getElementById('facultySemSelect');
const studentSemView = document.getElementById('studentSemView');
const subjectContainer = document.getElementById('subjectContainer');
const syllabusContainer = document.getElementById('syllabusContainer');
const displayAvgAttendance = document.getElementById('displayAvgAttendance');

const midSemPyqContainer = document.getElementById('midSemPyqContainer');
const endSemPyqContainer = document.getElementById('endSemPyqContainer');

/**
 * Core Function: Loops and rebuilds all dropdown menus to accommodate specific academic degree lengths
 */
function rebuildSemesterDropdownMenus() {
    const activeProgramKey = degreeProgramSelect.value;
    const maxSemestersCount = degreeSyllabusRules[activeProgramKey].totalSemesters;

    const savedStudentSemSelection = studentSemView.value;
    const savedFacultySemSelection = facultySemSelect.value;

    facultySemSelect.innerHTML = '';
    studentSemView.innerHTML = '';

    for (let semIndex = 1; semIndex <= maxSemestersCount; semIndex++) {
        const optFaculty = document.createElement('option');
        optFaculty.value = semIndex; optFaculty.innerText = `Semester ${semIndex}`;
        facultySemSelect.appendChild(optFaculty);

        const optStudent = document.createElement('option');
        optStudent.value = semIndex; optStudent.innerText = `Sem ${semIndex}`;
        studentSemView.appendChild(optStudent);
    }

    if (savedStudentSemSelection && savedStudentSemSelection <= maxSemestersCount) {
        studentSemView.value = savedStudentSemSelection;
    } else {
        studentSemView.value = "1";
    }
    if (savedFacultySemSelection && savedFacultySemSelection <= maxSemestersCount) {
        facultySemSelect.value = savedFacultySemSelection;
    }
}

/**
 * Render Function: Computes and pushes core courses, syllabus completion, and shared content links
 */
function renderAcademicPortalViews() {
    const currentDegree = degreeProgramSelect.value;
    const currentBranch = branchSelect.value;
    const activeSemesterNumber = studentSemView.value;
    
    // Compute dynamic lookup compound storage key (e.g., "BTECH_CSE_2")
    const dynamicLookupKey = `${currentDegree}_${currentBranch}_${activeSemesterNumber}`;
    const courseRecordsList = campusDatabase.semesters[dynamicLookupKey] || [];
    
    subjectContainer.innerHTML = '';
    syllabusContainer.innerHTML = '';
    
    if (courseRecordsList.length === 0) {
        subjectContainer.innerHTML = '<p class="placeholder-text">No structural courses logged for this branch selection.</p>';
        syllabusContainer.innerHTML = '<p class="placeholder-text">No core academic notes available.</p>';
        displayAvgAttendance.innerText = "0%";
    } else {
        let attendanceAccumulator = 0;

        courseRecordsList.forEach((course) => {
            const pct = Math.round((course.attended / course.total) * 100) || 0;
            attendanceAccumulator += pct;
            const lowAttendanceWarning = pct < 75;

            subjectContainer.insertAdjacentHTML('beforeend', `
                <div class="subject-card-output">
                    <div class="subject-meta-line">
                        <span>${course.name}</span>
                        <span class="${lowAttendanceWarning ? 'text-danger' : 'text-safe'}">${pct}% (${course.attended}/${course.total})</span>
                    </div>
                    <div class="faculty-contact-txt">Instructor: ${course.faculty}</div>
                    <div class="progress-track">
                        <div class="progress-bar ${lowAttendanceWarning ? 'bar-danger' : 'bar-safe'}" style="width: ${Math.min(pct, 100)}%"></div>
                    </div>
                    ${lowAttendanceWarning ? `<p class="danger-note text-danger">⚠️ Notice: Attendance metrics below standard VSSUT 75% cutoff!</p>` : ''}
                </div>
            `);

            syllabusContainer.insertAdjacentHTML('beforeend', `
                <div class="syllabus-card-output">
                    <div class="syllabus-meta-line">
                        <span>${course.name} Syllabus Progress</span>
                        <span class="text-purple">${course.syllabus}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-bar bar-purple" style="width: ${Math.min(course.syllabus, 100)}%"></div>
                    </div>
                    <a href="${course.notesLink || '#'}" target="_blank" class="content-download-btn">📂 Access Shared Lecture Notes & Content</a>
                </div>
            `);
        });

        displayAvgAttendance.innerText = Math.round(attendanceAccumulator / courseRecordsList.length) + "%";
    }

    renderPyqDocumentBank(dynamicLookupKey);
}

/**
 * Render Function: Computes and distributes PYQs into Mid-Sem and End-Sem columns
 */
function renderPyqDocumentBank(lookupKey) {
    midSemPyqContainer.innerHTML = '';
    endSemPyqContainer.innerHTML = '';

    const records = campusDatabase.pyqBank[lookupKey] || [];

    const midRecords = records.filter(r => r.type === "Mid-Sem");
    const endRecords = records.filter(r => r.type === "End-Sem");

    if (midRecords.length === 0) midSemPyqContainer.innerHTML = '<p class="placeholder-text">No Mid-Sem PYQs archived.</p>';
    else {
        midRecords.forEach(r => {
            const badgeClass = r.role === 'Faculty' ? 'pyq-badge-faculty' : 'pyq-badge-student';
            const badgeLabel = r.role === 'Faculty' ? 'Verified Official' : 'Crowdsourced';
            midSemPyqContainer.insertAdjacentHTML('beforeend', `
                <div class="pyq-document-node">
                    <div class="pyq-meta-row"><span class="pyq-subj">${r.subject}</span><span class="pyq-yr">${r.year}</span></div>
                    <span class="pyq-badge ${badgeClass}">${badgeLabel}</span>
                    <a href="${r.link}" target="_blank" class="pyq-download-anchor">📥 View Question Paper</a>
                </div>
            `);
        });
    }

    if (endRecords.length === 0) endSemPyqContainer.innerHTML = '<p class="placeholder-text">No End-Sem PYQs archived.</p>';
    else {
        endRecords.forEach(r => {
            const badgeClass = r.role === 'Faculty' ? 'pyq-badge-faculty' : 'pyq-badge-student';
            const badgeLabel = r.role === 'Faculty' ? 'Verified Official' : 'Crowdsourced';
            endSemPyqContainer.insertAdjacentHTML('beforeend', `
                <div class="pyq-document-node">
                    <div class="pyq-meta-row"><span class="pyq-subj">${r.subject}</span><span class="pyq-yr">${r.year}</span></div>
                    <span class="pyq-badge ${badgeClass}">${badgeLabel}</span>
                    <a href="${r.link}" target="_blank" class="pyq-download-anchor">📥 View Question Paper</a>
                </div>
            `);
        });
    }
}

// Controller Trigger: Profile Setup Synchronization
syncProfileBtn.addEventListener('click', () => {
    const pName = studentNameInput.value.trim() || "Aryashree Mohanty";
    const pReg = studentRegInput.value.trim() || "2502040006";
    const pSec = studentSecInput.value.trim() || "M";
    const pDeg = degreeProgramSelect.value;
    const pBranch = branchSelect.value;

    displayStudentName.innerText = pName;
    displayStudentMeta.innerText = `Registration Number: ${pReg} | Section: ${pSec} | Branch: ${branchLabels[pBranch]} | Program: ${degreeSyllabusRules[pDeg].label}`;

    rebuildSemesterDropdownMenus();
    renderAcademicPortalViews();
});

// Controller Trigger: Universal Dual PYQ Bank Submissions
document.getElementById('uploadPyqBtn').addEventListener('click', () => {
    const role = document.getElementById('pyqUserRole').value;
    const subject = document.getElementById('pyqSubjectName').value.trim();
    const type = document.getElementById('pyqExamType').value;
    const year = document.getElementById('pyqYear').value.trim() || "2026";
    const link = document.getElementById('pyqLink').value.trim() || "#";

    if (!subject) return alert("Action Aborted: Please state a valid course subject name.");

    const currentDegree = degreeProgramSelect.value;
    const currentBranch = branchSelect.value;
    const activeSemesterNumber = studentSemView.value;
    const targetLookupKey = `${currentDegree}_${currentBranch}_${activeSemesterNumber}`;

    if (!campusDatabase.pyqBank[targetLookupKey]) {
        campusDatabase.pyqBank[targetLookupKey] = [];
    }

    campusDatabase.pyqBank[targetLookupKey].push({ subject, type, year, role, link });
    renderAcademicPortalViews();

    document.getElementById('pyqSubjectName').value = '';
    document.getElementById('pyqYear').value = '';
    document.getElementById('pyqLink').value = '';
});

// Controller Trigger: Faculty Course Infrastructure Management Updates
document.getElementById('addSubjectBtn').addEventListener('click', () => {
    const activeDegree = degreeProgramSelect.value;
    const activeBranch = branchSelect.value;
    const targetedSemester = facultySemSelect.value;
    const title = document.getElementById('newSubjectName').value.trim();
    const instructor = document.getElementById('facultyContact').value.trim() || "VSSUT Desk Dept";
    const attCount = parseInt(document.getElementById('newSubjectAttended').value) || 0;
    const totCount = parseInt(document.getElementById('newSubjectTotal').value) || 1;
    const sylCount = parseInt(document.getElementById('syllabusProgressInput').value) || 0;
    const nLink = document.getElementById('courseContentLink').value.trim() || "#";

    if (!title) return alert("Action Aborted: State a valid subject name parameter.");

    const compoundKey = `${activeDegree}_${activeBranch}_${targetedSemester}`;
    
    if (!campusDatabase.semesters[compoundKey]) campusDatabase.semesters[compoundKey] = [];

    const currentArray = campusDatabase.semesters[compoundKey];
    const matchIdx = currentArray.findIndex(c => c.name.toLowerCase() === title.toLowerCase());

    const dataPayload = { name: title, faculty: instructor, attended: attCount, total: totCount, syllabus: sylCount, notesLink: nLink };

    if (matchIdx > -1) currentArray[matchIdx] = dataPayload;
    else currentArray.push(dataPayload);

    renderAcademicPortalViews();
    document.getElementById('newSubjectName').value = '';
    document.getElementById('facultyContact').value = '';
    document.getElementById('courseContentLink').value = '';
});

// Event Notification Engines Orchestration Callbacks
const dynamicEventContainer = document.getElementById('dynamicEventContainer');
function renderEventsFeed() {
    dynamicEventContainer.innerHTML = '';
    campusDatabase.dynamicEvents.forEach(item => {
        const isStudent = item.role === 'Student';
        dynamicEventContainer.insertAdjacentHTML('beforeend', `
            <div class="dynamic-event-card">
                <div class="event-header-row">
                    <div class="event-title-line">
                        <h4>${item.name}</h4>
                        <span class="authority-tag ${isStudent ? 'tag-student' : 'tag-faculty'}">${isStudent ? 'Student Initiative' : 'Official Faculty Action'}</span>
                    </div>
                </div>
                <div class="event-details-body">
                    <div class="detail-item-box highlight"><strong>🧠 Study Requirements:</strong>${item.prereq}</div>
                    <div class="detail-item-box"><strong>🎟️ Registration Link:</strong>${item.entry}</div>
                    <div class="detail-item-box"><strong>📞 Contact Coordinates:</strong>${item.contact}</div>
                </div>
            </div>
        `);
    });
}

document.getElementById('broadcastEventBtn').addEventListener('click', () => {
    const name = document.getElementById('eventName').value.trim();
    const contact = document.getElementById('eventContact').value.trim();
    const prereq = document.getElementById('eventPrereq').value.trim();
    const entry = document.getElementById('eventEntry').value.trim();
    const role = document.getElementById('eventRoleType').value;

    if (!name || !contact || !prereq || !entry) return alert("Fill all event parameters.");

    campusDatabase.dynamicEvents.push({ name, category: "General", role, contact, prereq, entry });
    renderEventsFeed();
    document.getElementById('eventName').value = ''; document.getElementById('eventContact').value = '';
    document.getElementById('eventPrereq').value = ''; document.getElementById('eventEntry').value = '';
});

const liveAlertsFeed = document.getElementById('liveAlertsFeed');
function renderNotices() {
    liveAlertsFeed.innerHTML = '';
    campusDatabase.broadcasts.forEach(b => {
        liveAlertsFeed.insertAdjacentHTML('afterbegin', `<div class="broadcast-node"><h4>📌 ${b.title}</h4><p>${b.message}</p></div>`);
    });
}

document.getElementById('sendBroadcastBtn').addEventListener('click', () => {
    const title = document.getElementById('broadcastTitle').value.trim();
    const message = document.getElementById('broadcastMessage').value.trim();
    if (!title || !message) return alert("Fill notice parameters entirely.");
    campusDatabase.broadcasts.push({ title, message });
    renderNotices();
    document.getElementById('broadcastTitle').value = ''; document.getElementById('broadcastMessage').value = '';
});

// Interactive Quiz Elements Framework Initializations
const quizQuestionText = document.getElementById('quizQuestionText');
const quizOptionsContainer = document.getElementById('quizOptionsContainer');
const quizFeedback = document.getElementById('quizFeedback');
const nextQuizBtn = document.getElementById('nextQuizBtn');

function loadQuiz() {
    quizFeedback.classList.add('hidden'); nextQuizBtn.classList.add('hidden');
    quizOptionsContainer.innerHTML = '';
    const activeQ = campusDatabase.placementQuiz[campusDatabase.currentQuizIndex];
    quizQuestionText.innerText = `Question ${campusDatabase.currentQuizIndex + 1}: ${activeQ.q}`;
    activeQ.options.forEach((o, i) => {
        const btn = document.createElement('button'); btn.className = "quiz-opt-btn"; btn.innerText = o;
        btn.addEventListener('click', () => {
            quizOptionsContainer.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);
            quizFeedback.classList.remove('hidden');
            if (i === activeQ.correct) {
                quizFeedback.className = "quiz-feedback-box feedback-correct"; quizFeedback.innerText = activeQ.explain;
            } else {
                quizFeedback.className = "quiz-feedback-box feedback-wrong"; quizFeedback.innerText = `Incorrect tracking route. Correct solution: ${activeQ.options[activeQ.correct]}`;
            }
            nextQuizBtn.classList.remove('hidden');
        });
        quizOptionsContainer.appendChild(btn);
    });
}

nextQuizBtn.addEventListener('click', () => {
    campusDatabase.currentQuizIndex = (campusDatabase.currentQuizIndex + 1) % campusDatabase.placementQuiz.length;
    loadQuiz();
});

// Dynamic Matrix Synchronization State Event Hooks
studentSemView.addEventListener('change', renderAcademicPortalViews);
branchSelect.addEventListener('change', renderAcademicPortalViews);
degreeProgramSelect.addEventListener('change', () => {
    rebuildSemesterDropdownMenus();
    renderAcademicPortalViews();
});

// Application Master Boot Triggers
window.addEventListener('DOMContentLoaded', () => {
    rebuildSemesterDropdownMenus();
    // Prime interface automatically to pre-loaded B.Tech CSE Semester 2 mock values
    degreeProgramSelect.value = "BTECH";
    branchSelect.value = "CSE";
    studentSemView.value = "2";
    
    const pName = studentNameInput.value;
    const pReg = studentRegInput.value;
    const pSec = studentSecInput.value;
    displayStudentName.innerText = pName;
    displayStudentMeta.innerText = `Registration Number: ${pReg} | Section: ${pSec} | Branch: Computer Science | Program: B.Tech`;

    renderAcademicPortalViews();
    renderEventsFeed();
    renderNotices();
    loadQuiz();
});