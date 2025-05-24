import wixData from "wix-data";

export function Employees_beforeInsert(item, context) {
  item.salary = item.hoursPerMonth * item.hourlyRate;
  return item;
}

// Хук перед оновленням запису
export function Employees_beforeUpdate(item, context) {
  item.salary = item.hoursPerMonth * item.hourlyRate;
  return item;
}
$w.onReady(function () {});
