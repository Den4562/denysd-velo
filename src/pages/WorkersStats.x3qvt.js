import wixData from "wix-data";

// Хук перед добавлением записи
export function Worker_beforeInsert(item, context) {
  item.salary = item.hoursPerMonth * item.hourlyRate;
  return item;
}

// Хук перед обновлением записи
export function Worker_beforeUpdate(item, context) {
  item.salary = item.hoursPerMonth * item.hourlyRate;
  return item;
}

$w.onReady(function () {
  loadWorkers();

  // Обработчик для кнопки Submit
  $w("#button16").onClick(() => {
    // Собираем данные из формы
    const newWorker = {
      firstName: $w("#inpFirstName").value,
      lastName: $w("#inpLastName").value,
      age: Number($w("#inpAge").value), // Преобразуем в число
      position: $w("#inpPosition").value,
      hoursPerMonth: Number($w("#inpHoursPerMonth").value), // Преобразуем в число
      hourlyRate: Number($w("#inpHourlyRate").value), // Преобразуем в число
      hireDate: new Date($w("#inpHireDate").value), // Преобразуем в дату
    };

    // Добавляем новую запись в коллекцию Worker
    wixData
      .insert("Worker", newWorker)
      .then(() => {
        console.log("Сотрудник успешно добавлен!");
        loadWorkers(); // Обновляем таблицу
      })
      .catch((err) => {
        console.error("Ошибка добавления сотрудника:", err);
      });
  });
});

function loadWorkers() {
  wixData
    .query("Worker")
    .find()
    .then((results) => {
      $w("#table1").rows = results.items;
    })
    .catch((err) => {
      console.error("Ошибка загрузки данных:", err);
    });
}
