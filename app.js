function addStudent() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const birthdate = document.getElementById("birthdate").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const course = document.getElementById("course").value;
  const consent = document.getElementById("consent").checked;

  if (!firstName || !lastName || !birthdate || !gender || !course) {
    alert("Please complete the form.");
    return;
  }

  if (!consent) {
    alert("Please consent before proceeding.");
    return;
  }

  const fullName = firstName + " " + lastName;
  const birthDateObj = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedBirthdate = birthDateObj.toLocaleDateString("en-US", options);

  const table = document
    .getElementById("studentTable")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
        <td>${fullName}</td>
        <td>${formattedBirthdate}</td>
        <td>${age}</td>
        <td>${gender.value}</td>
        <td>${course}</td>
    `;

  document.getElementById("studentForm").reset();
}

function filterStudents() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const table = document.getElementById("studentTable");
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    // start at 1 to skip table header
    const td = tr[i].getElementsByTagName("td")[0]; // Full Name column
    if (td) {
      const textValue = td.textContent || td.innerText;
      if (textValue.toLowerCase().indexOf(input) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
