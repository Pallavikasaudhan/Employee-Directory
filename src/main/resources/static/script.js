const API_URL = "http://localhost:8080/api/employees";
const form = document.getElementById("employeeForm");
const table = document.getElementById("employeeTable");
const submitBtn = document.getElementById("submitBtn");

// Fetch employees and render table
async function fetchEmployees() {
  const res = await fetch(API_URL);
  const data = await res.json();
  table.innerHTML = "";
  data.forEach(emp => {
    table.innerHTML += `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.firstName}</td>
        <td>${emp.lastName || ""}</td>
        <td>${emp.email}</td>
        <td>${emp.department || ""}</td>
        <td>
          <button class="edit-btn" onclick="editEmployee(${emp.id}, '${emp.firstName}', '${emp.lastName || ""}', '${emp.email}', '${emp.department || ""}')">
            <i class="fa fa-edit"></i> Edit
          </button>
          <button class="delete-btn" onclick="deleteEmployee(${emp.id})">
            <i class="fa fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// Add or update employee
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const empId = document.getElementById("empId").value;
  const employee = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    department: document.getElementById("department").value
  };

  if (empId) {
    await fetch(`${API_URL}/${empId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(employee)
    });
    submitBtn.innerHTML = '<i class="fa fa-plus"></i> Add Employee';
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(employee)
    });
  }

  form.reset();
  document.getElementById("empId").value = "";
  fetchEmployees();
});

// Delete employee
async function deleteEmployee(id) {
  if(confirm("Are you sure you want to delete this employee?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchEmployees();
  }
}

// Edit employee
function editEmployee(id, firstName, lastName, email, department) {
  document.getElementById("empId").value = id;
  document.getElementById("firstName").value = firstName;
  document.getElementById("lastName").value = lastName;
  document.getElementById("email").value = email;
  document.getElementById("department").value = department;
  submitBtn.innerHTML = '<i class="fa fa-save"></i> Update Employee';
}

// Initial fetch
fetchEmployees();
