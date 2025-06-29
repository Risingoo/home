// Zadania
const weeklyTasks = ['Zmywanie', 'Odkurzanie', 'Wynoszenie śmieci', 'Sprzątanie kuchni'];
const monthlyTasks = ['Mycie pralki', 'Mycie prysznica', 'Czyszczenie lodówki'];

let assignments = {
  week: [null, null],
  month: [null, null]
};

// Funkcje losujące
function drawWeeklyTasks() {
  let tasks = [...weeklyTasks];
  assignments.week = [];
  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(Math.random() * tasks.length);
    assignments.week.push(tasks.splice(idx, 1)[0]);
  }
  updateTaskLists();
  saveState();
}

function drawMonthlyTasks() {
  let tasks = [...monthlyTasks];
  assignments.month = [];
  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(Math.random() * tasks.length);
    assignments.month.push(tasks.splice(idx, 1)[0]);
  }
  updateTaskLists();
  saveState();
}

// Wyświetlanie zadań
function updateTaskLists() {
  document.getElementById('weekly-tasks-list').innerHTML = `
    <li>Osoba 1: <b>${assignments.week[0] || '-'}</b></li>
    <li>Osoba 2: <b>${assignments.week[1] || '-'}</b></li>
  `;
  document.getElementById('monthly-tasks-list').innerHTML = `
    <li>Osoba 1: <b>${assignments.month[0] || '-'}</b></li>
    <li>Osoba 2: <b>${assignments.month[1] || '-'}</b></li>
  `;
}

// Wymiana zadań
function swapTasks() {
  [assignments.week[0], assignments.week[1]] = [assignments.week[1], assignments.week[0]];
  [assignments.month[0], assignments.month[1]] = [assignments.month[1], assignments.month[0]];
  updateTaskLists();
  document.getElementById('swap-info').innerText = "Zadania zostały zamienione!";
  saveState();
}

// Zapisywanie stanu w LocalStorage
function saveState() {
  localStorage.setItem('assignments', JSON.stringify(assignments));
}

// Ładowanie stanu z LocalStorage
function loadState() {
  const data = localStorage.getItem('assignments');
  if (data) {
    assignments = JSON.parse(data);
    updateTaskLists();
  }
}

window.onload = loadState;
