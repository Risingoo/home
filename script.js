// Zadania
const weeklyTasks = ['Zmywanie', 'Odkurzanie', 'Wynoszenie śmieci', 'Sprzątanie kuchni'];
const monthlyTasks = ['Mycie pralki', 'Mycie prysznica', 'Czyszczenie lodówki'];

let assignments = {
  week: [null, null],
  month: [null, null]
};

let done = {
  week: [false, false],
  month: [false, false]
};

// Losowanie zadań tygodniowych
function drawWeeklyTasks() {
  let tasks = [...weeklyTasks];
  assignments.week = [];
  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(Math.random() * tasks.length);
    assignments.week.push(tasks.splice(idx, 1)[0]);
  }
  done.week = [false, false];
  updateTaskLists();
  saveState();
}

// Losowanie zadań miesięcznych
function drawMonthlyTasks() {
  let tasks = [...monthlyTasks];
  assignments.month = [];
  for (let i = 0; i < 2; i++) {
    const idx = Math.floor(Math.random() * tasks.length);
    assignments.month.push(tasks.splice(idx, 1)[0]);
  }
  done.month = [false, false];
  updateTaskLists();
  saveState();
}

// Wyświetlanie zadań z checkboxami
function updateTaskLists() {
  document.getElementById('weekly-tasks-list').innerHTML = `
    <li>
      Osoba 1: <b>${assignments.week[0] || '-'}</b>
      <input type="checkbox" id="week1" onchange="markDone('week',0)" ${isDone('week',0) ? 'checked' : ''}> Wykonane
    </li>
    <li>
      Osoba 2: <b>${assignments.week[1] || '-'}</b>
      <input type="checkbox" id="week2" onchange="markDone('week',1)" ${isDone('week',1) ? 'checked' : ''}> Wykonane
    </li>
  `;
  document.getElementById('monthly-tasks-list').innerHTML = `
    <li>
      Osoba 1: <b>${assignments.month[0] || '-'}</b>
      <input type="checkbox" id="month1" onchange="markDone('month',0)" ${isDone('month',0) ? 'checked' : ''}> Wykonane
    </li>
    <li>
      Osoba 2: <b>${assignments.month[1] || '-'}</b>
      <input type="checkbox" id="month2" onchange="markDone('month',1)" ${isDone('month',1) ? 'checked' : ''}> Wykonane
    </li>
  `;
}

// Odhaczanie wykonania zadania
function markDone(type, idx) {
  done[type][idx] = document.getElementById(type + (idx+1)).checked;
  saveState();
}

function isDone(type, idx) {
  return done[type][idx];
}

// Wymiana wybranych zadań
function swapSelectedTasks() {
  const person1Gives = document.getElementById('person1-gives').value;
  const person2Gives = document.getElementById('person2-gives').value;

  // Zamiana wybranych zadań
  [assignments[person1Gives][0], assignments[person2Gives][1]] = [assignments[person2Gives][1], assignments[person1Gives][0]];
  [done[person1Gives][0], done[person2Gives][1]] = [false, false]; // Reset wykonania po zamianie

  updateTaskLists();
  document.getElementById('swap-info').innerText = "Zadania zostały zamienione!";
  saveState();
}

// Zapisywanie stanu w LocalStorage
function saveState() {
  localStorage.setItem('assignments', JSON.stringify(assignments));
  localStorage.setItem('done', JSON.stringify(done));
}

// Ładowanie stanu z LocalStorage
function loadState() {
  const data = localStorage.getItem('assignments');
  const doneData = localStorage.getItem('done');
  if (data) assignments = JSON.parse(data);
  if (doneData) done = JSON.parse(doneData);
  updateTaskLists();
}

window.onload = loadState;

// Udostępnienie funkcji do HTML
window.markDone = markDone;
window.swapSelectedTasks = swapSelectedTasks;
window.drawWeeklyTasks = drawWeeklyTasks;
window.drawMonthlyTasks = drawMonthlyTasks;
