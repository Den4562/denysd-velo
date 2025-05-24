import wixData from "wix-data";

// Хук перед добавлением записи
export function Worker_beforeInsert(item, context) {
  console.log("Before Insert - Item:", item);
  if (
    typeof item.hoursPerMonth === "number" &&
    typeof item.hourlyRate === "number"
  ) {
    item.salary = item.hoursPerMonth * item.hourlyRate;
  } else {
    console.warn(
      "Некорректные данные для расчета salary:",
      item.hoursPerMonth,
      item.hourlyRate
    );
    item.salary = 0;
  }
  return item;
}

// Хук перед обновлением записи
export function Worker_beforeUpdate(item, context) {
  console.log("Before Update - Item:", item);
  if (
    typeof item.hoursPerMonth === "number" &&
    typeof item.hourlyRate === "number"
  ) {
    item.salary = item.hoursPerMonth * item.hourlyRate;
  } else {
    console.warn(
      "Некорректные данные для расчета salary:",
      item.hoursPerMonth,
      item.hourlyRate
    );
    item.salary = 0;
  }
  return item;
}
