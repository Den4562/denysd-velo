import wixData from "wix-data";

let selectedRow = null;

// Ініціалізація модуля
export function initializeWorkers($w) {
  // Ініціалізація подій
  setupEvent($w);
  loadWorkers($w);
}

// Налаштування обробників подій
function setupEvent($w) {
  $w("#formButton").onClick(() => addWorker($w));
  $w("#buttonSortByDate").onClick(() => loadWorkers($w, "hireDate", "desc"));
  $w("#buttonSortByAge").onClick(() => loadWorkers($w, "age", "asc"));
  $w("#inpSearch").onInput((event) =>
    loadWorkers($w, "", "", event.target.value.trim())
  );
  $w("#editButton").onClick(() => updateWorker($w));
  $w("#table1").onRowSelect((event) => {
    selectedRow = event.rowData;
    // Більше не потрібне $w("selectedRow", selectedRow)
  });
}

// Додавання нового працівника
function addWorker($w) {
  const newWorker = {
    firstName: $w("#inpFirstName").value,
    lastName: $w("#inpLastName").value,
    age: Number($w("#inpAge").value),
    position: $w("#inpPosition").value,
    hoursPerMonth: Number($w("#inpHoursPerMonth").value),
    hourlyRate: Number($w("#inpHourlyRate").value),
    hireDate: new Date($w("#inpHireDate").value),
  };

  wixData
    .insert("Worker", newWorker)
    .then(() => {
      loadWorkers($w);
      clearForm($w);
    })
    .catch((error) => console.error("Помилка додавання:", error));
}

// Оновлення даних працівника
function updateWorker($w) {
  if (!selectedRow) return;

  const hoursMonthValue = $w("#hoursMonth").value.trim();
  const hoursRateValue = $w("#hoursRate").value.trim();
  let hasUpdates = false;

  if (hoursMonthValue !== "") {
    const newHours = Number(hoursMonthValue);
    if (!isNaN(newHours)) {
      selectedRow.hoursPerMonth = newHours;
      hasUpdates = true;
    }
  }

  if (hoursRateValue !== "") {
    const newHourlyRate = Number(hoursRateValue);
    if (!isNaN(newHourlyRate)) {
      selectedRow.hourlyRate = newHourlyRate;
      hasUpdates = true;
    }
  }

  if (hasUpdates) {
    wixData
      .update("Worker", selectedRow)
      .then(() => {
        loadWorkers($w);
        if (hoursMonthValue !== "") $w("#hoursMonth").value = "";
        if (hoursRateValue !== "") $w("#hoursRate").value = "";
      })
      .catch((error) => console.error("Помилка оновлення:", error));
  }
}

// Завантаження працівників із сортуванням та пошуком
function loadWorkers($w, sortField = "", sortOrder = "", searchValue = "") {
  let query = wixData.query("Worker");

  if (sortField && sortOrder === "asc") {
    query = query.ascending(sortField);
  } else if (sortField && sortOrder === "desc") {
    query = query.descending(sortField);
  }

  if (searchValue) {
    query = query
      .contains("firstName", searchValue)
      .or(query.contains("lastName", searchValue))
      .or(query.contains("position", searchValue));
  }

  query
    .find()
    .then((results) => {
      $w("#table1").rows = results.items;
    })
    .catch((error) => console.error("Помилка завантаження:", error));
}

// Очищення форми
function clearForm($w) {
  $w("#inpFirstName").value = "";
  $w("#inpLastName").value = "";
  $w("#inpAge").value = "";
  $w("#inpPosition").value = "";
  $w("#inpHoursPerMonth").value = "";
  $w("#inpHourlyRate").value = "";
  $w("#inpHireDate").value = null;
}
