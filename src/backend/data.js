import wixData from "wix-data";

// Хук для обчислення зарплати перед додаванням нового запису
export function Worker_beforeInsert(item, context) {
  if (
    typeof item.hoursPerMonth === "number" &&
    typeof item.hourlyRate === "number" &&
    item.hoursPerMonth != null &&
    item.hourlyRate != null
  ) {
    item.salary = item.hoursPerMonth * item.hourlyRate;
  } else {
    item.salary = 0;
  }
  return item;
}

// Хук для обчислення зарплати перед оновленням запису
export function Worker_beforeUpdate(item, context) {
  if (
    typeof item.hoursPerMonth === "number" &&
    typeof item.hourlyRate === "number" &&
    item.hoursPerMonth != null &&
    item.hourlyRate != null
  ) {
    item.salary = item.hoursPerMonth * item.hourlyRate;
  } else {
    item.salary = 0;
  }
  return item;
}
