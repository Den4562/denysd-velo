import wixData from "wix-data";

$w.onReady(function () {
  loadWorkers();

  $w("#button16").onClick(() => {
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
        loadWorkers();

        $w("#inpFirstName").value = "";
        $w("#inpLastName").value = "";
        $w("#inpAge").value = "";
        $w("#inpPosition").value = "";
        $w("#inpHoursPerMonth").value = "";
        $w("#inpHourlyRate").value = "";
        $w("#inpHireDate").value = null;
      })
      .catch((err) => {
        console.error("Ошибка добавления сотрудника:", err);
      });
  });

  // Обработчики для кнопок сортировки
  $w("#buttonSortByDate").onClick(() => {
    loadWorkers("hireDate", "desc");
  });

  $w("#buttonSortByAge").onClick(() => {
    loadWorkers("age", "asc");
  });

  // Обработчик для поиска в реальном времени
  $w("#inpSearch").onInput((event) => {
    const searchValue = $w("#inpSearch").value.trim();
    loadWorkers("hireDate", "desc", searchValue);
  });

  // Обробник для кнопки редагування
  $w("#editButton").onClick(() => {
    // Перевіряємо, чи вибрана строка
    if (selectedRow) {
      // Отримуємо значення з текстових полів
      const hoursMonthValue = $w("#hoursMonth").value.trim();
      const hoursRateValue = $w("#hoursRate").value.trim();

      // Змінна для перевірки, чи є що оновлювати
      let hasUpdates = false;

      // Перевіряємо і оновлюємо hoursPerMonth, якщо значення введено
      if (hoursMonthValue !== "") {
        const newHours = Number(hoursMonthValue);
        if (!isNaN(newHours)) {
          selectedRow.hoursPerMonth = newHours;
          hasUpdates = true;
        } else {
          console.error("Введіть коректне число у поле #hoursMonth");
        }
      }

      // Перевіряємо і оновлюємо hourlyRate, якщо значення введено
      if (hoursRateValue !== "") {
        const newHourlyRate = Number(hoursRateValue);
        if (!isNaN(newHourlyRate)) {
          selectedRow.hourlyRate = newHourlyRate;
          hasUpdates = true;
        } else {
          console.error("Введіть коректне число у поле #hoursRate");
        }
      }

      // Якщо є що оновлювати, викликаємо update
      if (hasUpdates) {
        wixData
          .update("Worker", selectedRow)
          .then(() => {
            // Перезавантажуємо таблицю після оновлення
            loadWorkers();
            // Очищаємо лише ті поля, які були змінені
            if (hoursMonthValue !== "") $w("#hoursMonth").value = "";
            if (hoursRateValue !== "") $w("#hoursRate").value = "";
          })
          .catch((err) => {
            console.error("Помилка оновлення запису:", err);
          });
      } else {
        console.log("Немає змін для оновлення");
      }
    } else {
      console.error("Спочатку виберіть рядок у таблиці");
    }
  });
});

// Переменная для хранения выбранной строки
let selectedRow = null;

// Обработчик выбора строки в таблице
$w("#table1").onRowSelect((event) => {
  selectedRow = event.rowData; // Сохраняем данные выбранной строки
});

function loadWorkers(
  sortField = "hireDate",
  sortOrder = "desc",
  searchValue = ""
) {
  let query = wixData.query("Worker");

  if (sortOrder === "asc") {
    query = query.ascending(sortField);
  } else {
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
    .catch((err) => {
      console.error("Ошибка загрузки данных:", err);
    });
}
