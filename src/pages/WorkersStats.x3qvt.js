import wixData from "wix-data";

// Хук перед добавлением записи
export function Workers_beforeInsert(item, context) {
  item.salary = item.hoursPerMonth * item.hourlyRate;
  return item;
}

// Хук перед обновлением записи
export function Workers_beforeUpdate(item, context) {
  item.salary = item.hoursPerMonth * item.hourlyRate;
  return item;
}
$w.onReady(function () {
  // Загружаем данные в таблицу при загрузке страницы
  loadWorkers();
});

function loadWorkers() {
  wixData
    .query("Worker")
    .find()
    .then((results) => {
      $w("#table1").rows = results.items; // Привязываем данные к таблице
    })
    .catch((err) => {
      console.error("Ошибка загрузки данных:", err);
    });
}
