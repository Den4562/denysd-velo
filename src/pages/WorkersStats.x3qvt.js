import wixData from "wix-data";

$w.onReady(function () {
  loadWorkers();

  // Додавання нового працівника через форму
  $w("#formButton").onClick(() => {
    const newWorker = {
      firstName: $w("#inpFirstName").value,
      lastName: $w("#inpLastName").value,
      age: Number($w("#inpAge").value),
      position: $w("#inpPosition").value,
      hoursPerMonth: Number($w("#inpHoursPerMonth").value),
      hourlyRate: Number($w("#inpHourlyRate").value),
      hireDate: new Date($w("#inpHireDate").value),
    };

    wixData.insert("Worker", newWorker).then(() => {
      loadWorkers();
      // Очищення полів форми
      $w("#inpFirstName").value = "";
      $w("#inpLastName").value = "";
      $w("#inpAge").value = "";
      $w("#inpPosition").value = "";
      $w("#inpHoursPerMonth").value = "";
      $w("#inpHourlyRate").value = "";
      $w("#inpHireDate").value = null;
    });
  });

  $w("#buttonSortByDate").onClick(() => {
    loadWorkers("hireDate", "desc");
  });

  $w("#buttonSortByAge").onClick(() => {
    loadWorkers("age", "asc");
  });

  // Пошук працівників за ім'ям, прізвищем або посадою
  $w("#inpSearch").onInput((event) => {
    const searchValue = $w("#inpSearch").value.trim();
    loadWorkers("", "", searchValue);
  });

  // Оновлення даних вибраного працівника (години на місяць та погодинна ставка)
  $w("#editButton").onClick(() => {
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

    // Виконання оновлення, якщо є зміни
    if (hasUpdates) {
      wixData.update("Worker", selectedRow).then(() => {
        loadWorkers();
        if (hoursMonthValue !== "") $w("#hoursMonth").value = "";
        if (hoursRateValue !== "") $w("#hoursRate").value = "";
      });
    }
  });
});

// Змінна для зберігання даних вибраного рядка
let selectedRow = null;
$w("#table1").onRowSelect((event) => {
  selectedRow = event.rowData;
});

// Функція для завантаження працівників із можливістю сортування та пошуку
function loadWorkers(sortField = "", sortOrder = "", searchValue = "") {
  let query = wixData.query("Worker");

  if (sortField && sortOrder === "asc") {
    query = query.ascending(sortField);
  } else if (sortField && sortOrder === "desc") {
    query = query.descending(sortField);
  }

  // Фільтрація за пошуковим запитом
  if (searchValue) {
    query = query
      .contains("firstName", searchValue)
      .or(query.contains("lastName", searchValue))
      .or(query.contains("position", searchValue));
  }

  // Оновлення таблиці результатами запиту
  query.find().then((results) => {
    $w("#table1").rows = results.items;
  });
}
