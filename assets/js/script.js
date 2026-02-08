// ------------------------ STUDENT CLASS ------------------------
class Student {
    constructor(roll, name, email, gender, contact, dob, address) {
        this.roll = roll;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.contact = contact;
        this.dob = dob;
        this.address = address;
    }
}

// ------------------------ STUDENT MANAGER ------------------------
class StudentManager {
    constructor() {
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    deleteStudent(roll) {
        this.students = this.students.filter(s => s.roll !== roll);
    }

    getStudent(roll) {
        return this.students.find(s => s.roll === roll);
    }

    updateStudent(oldRoll, updatedStudent) {
        const index = this.students.findIndex(s => s.roll === oldRoll);
        if (index !== -1) {
            this.students[index] = updatedStudent;
        }
    }
}

const manager = new StudentManager();

// ------------------------ CORE FUNCTIONS ------------------------

function addStudent() {
    const student = getFormData();

    if (!student.roll || !student.name) {
        alert("Roll No & Name are required!");
        return;
    }

    manager.addStudent(student);
    renderTable();
    clearForm();
}

function deleteStudent(roll) {
    manager.deleteStudent(roll);
    renderTable();
}

function loadStudent(roll) {
    const s = manager.getStudent(roll);

    // Store original roll number for update
    document.getElementById("oldRoll").value = s.roll;

    document.getElementById("roll").value = s.roll;
    document.getElementById("name").value = s.name;
    document.getElementById("email").value = s.email;
    document.getElementById("gender").value = s.gender;
    document.getElementById("contact").value = s.contact;
    document.getElementById("dob").value = s.dob;
    document.getElementById("address").value = s.address;
}

function updateStudent() {
    const oldRoll = document.getElementById("oldRoll").value;
    const updatedStudent = getFormData();

    manager.updateStudent(oldRoll, updatedStudent);

    renderTable();
    clearForm();
}

function getFormData() {
    return new Student(
        document.getElementById("roll").value,
        document.getElementById("name").value,
        document.getElementById("email").value,
        document.getElementById("gender").value,
        document.getElementById("contact").value,
        document.getElementById("dob").value,
        document.getElementById("address").value
    );
}

function clearForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("oldRoll").value = "";
}

function renderTable() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    manager.students.forEach(s => {
        table.innerHTML += `
            <tr>
                <td>${s.roll}</td>
                <td>${s.name}</td>
                <td>${s.email}</td>
                <td>${s.gender}</td>
                <td>${s.contact}</td>
                <td>${s.dob}</td>
                <td>${s.address}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="loadStudent('${s.roll}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent('${s.roll}')">Delete</button>
                </td>
            </tr>
        `;
    });
}