import wixData from "wix-data";

// Хук перед добавлением записи
export function Worker_beforeInsert(item, context) {
  // Проверяем, что hoursPerMonth и hourlyRate - числа и не undefined/null
  if (
    typeof item.hoursPerMonth === "number" &&
    typeof item.hourlyRate === "number" &&
    item.hoursPerMonth != null &&
    item.hourlyRate != null
  ) {
    item.salary = item.hoursPerMonth * item.hourlyRate;
  } else {
    item.salary = 0; // Значение по умолчанию при некорректных данных
  }
  return item;
}

// Хук перед обновлением записи
export function Worker_beforeUpdate(item, context) {
  // Проверяем, что hoursPerMonth и hourlyRate - числа и не undefined/null
  if (
    typeof item.hoursPerMonth === "number" &&
    typeof item.hourlyRate === "number" &&
    item.hoursPerMonth != null &&
    item.hourlyRate != null
  ) {
    item.salary = item.hoursPerMonth * item.hourlyRate;
  } else {
    item.salary = 0; // Значение по умолчанию при некорректных данных
  }
  return item;
}
