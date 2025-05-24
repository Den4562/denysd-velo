import wixData from "wix-data";

$w.onReady(function () {
  loadWorkers();

  // Обработчик для кнопки Submit
  $w("#button16").onClick(() => {
    // Собираем данные из формы
    const newWorker = {
      firstName: $w("#inpFirstName").value,
      lastName: $w("#inpLastName").value,
      age: Number($w("#inpAge").value),
      position: $w("#inpPosition").value,
      hoursPerMonth: Number($w("#inpHoursPerMonth").value),
      hourlyRate: Number($w("#inpHourlyRate").value),
      hireDate: $w("#inpHireDate").value
        ? new Date($w("#inpHireDate").value)
        : new Date(), // Если дата пустая, ставим текущую
    };

    console.log("Добавляем сотрудника:", newWorker); // Логируем данные перед отправкой

    // Добавляем новую запись в коллекцию Worker
    wixData
      .insert("Worker", newWorker)
      .then(() => {
        console.log("Сотрудник успешно добавлен!");
        loadWorkers(); // Обновляем таблицу

        // Очищаем поля формы
        $w("#inpFirstName").value = "";
        $w("#inpLastName").value = "";
        $w("#inpAge").value = "";
        $w("#inpPosition").value = "";
        $w("#inpHoursPerMonth").value = "";
        $w("#inpHourlyRate").value = "";
        // $w("#inpHireDate").value = "";
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
