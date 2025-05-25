import { loadWorkers } from "../backend/data";
import { clearInputs } from "./utils.js";

export function setupEvents() {
  // Змінна для зберігання даних вибраного рядка
  let selectedRow = null;

  // Обработчик выбора строки в таблице
  $w("#table1").onRowSelect((event) => {
    selectedRow = event.rowData;
    populateInputs(selectedRow);
  });

  // Обработчик для кнопки Submit
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
      clearInputs();
    });
  });

  // Обработчики для кнопок сортировки
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

  // Оновлення даних вибраного працівника
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

    if (hasUpdates) {
      wixData.update("Worker", selectedRow).then(() => {
        loadWorkers();
        if (hoursMonthValue !== "") $w("#hoursMonth").value = "";
        if (hoursRateValue !== "") $w("#hoursRate").value = "";
      });
    }
  });
}

// Функция для заполнения полей ввода данными выбранной строки
function populateInputs(rowData) {
  $w("#inpFirstName").value = rowData.firstName || "";
  $w("#inpLastName").value = rowData.lastName || "";
  $w("#inpAge").value = rowData.age ? rowData.age.toString() : "";
  $w("#inpPosition").value = rowData.position || "";
  $w("#inpHoursPerMonth").value = rowData.hoursPerMonth
    ? rowData.hoursPerMonth.toString()
    : "";
  $w("#inpHourlyRate").value = rowData.hourlyRate
    ? rowData.hourlyRate.toString()
    : "";
  $w("#inpHireDate").value = rowData.hireDate
    ? new Date(rowData.hireDate).toISOString().split("T")[0]
    : "";
}
