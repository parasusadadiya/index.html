let clockInTime = null;
let clockOutTime = null;
let wagePerHour = 0;
let expenses = 0;
let totalWages = 0;
let totalExpenses = 0;

// Clock In Button
document.getElementById("clock-in-btn").addEventListener("click", () => {
  clockInTime = new Date();
  document.getElementById("clock-in-btn").disabled = true;
  document.getElementById("clock-out-btn").disabled = false;
  document.getElementById("status").textContent = "Active - Check Out Pending";
});

// Clock Out Button
document.getElementById("clock-out-btn").addEventListener("click", () => {
  clockOutTime = new Date();
  document.getElementById("clock-out-btn").disabled = true;
  calculateWages();
  calculateWeeklySummary();
  document.getElementById("status").textContent = "Inactive - Checked Out";
});

// Edit Time Button
document.getElementById("edit-time-section").style.display = "block"; // for testing purpose

document.getElementById("save-edits").addEventListener("click", () => {
  const editIn = document.getElementById("edit-in").value;
  const editOut = document.getElementById("edit-out").value;

  if (editIn && editOut) {
    const inTime = new Date(`2025-04-09T${editIn}:00`);
    const outTime = new Date(`2025-04-09T${editOut}:00`);

    clockInTime = inTime;
    clockOutTime = outTime;
    calculateWages();
    calculateWeeklySummary();
    alert("Time updated successfully!");
  }
});

// Wage Calculation
function calculateWages() {
  if (clockInTime && clockOutTime) {
    const timeWorked = (clockOutTime - clockInTime) / (1000 * 60 * 60); // in hours
    totalWages = timeWorked * wagePerHour;
  }
  updateSummary();
}

// Weekly Summary
function calculateWeeklySummary() {
  totalExpenses += parseFloat(document.getElementById("expense").value) || 0;
  updateSummary();
}

// Update Summary
function updateSummary() {
  document.getElementById("total-wages").textContent = totalWages.toFixed(2);
  document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
  document.getElementById("net-total").textContent = (totalWages + totalExpenses).toFixed(2);
}

// Wage Input
document.getElementById("wage").addEventListener("change", (e) => {
  wagePerHour = parseFloat(e.target.value);
});

// Export to Excel
document.getElementById("export-btn").addEventListener("click", () => {
  const data = [
    ["Date", "Clock In", "Clock Out", "Wages", "Expenses"],
    // Add the actual data dynamically
    ["2025-04-09", clockInTime.toLocaleTimeString(), clockOutTime.toLocaleTimeString(), totalWages.toFixed(2), totalExpenses.toFixed(2)]
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Weekly Report");
  XLSX.writeFile(wb, "work_time_report.xlsx");
});

