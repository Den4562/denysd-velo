function calculateSalary(item) {
  if (
    typeof item.hoursPerMonth === "number" &&
    typeof item.hourlyRate === "number" &&
    item.hoursPerMonth != null &&
    item.hourlyRate != null
  ) {
    return item.hoursPerMonth * item.hourlyRate;
  }
  return 0;
}

// Хук для обчислення зарплати перед додаванням нового запису
export function Worker_beforeInsert(item, context) {
  item.salary = calculateSalary(item);
  return item;
}

// Хук для обчислення зарплати перед оновленням запису
export function Worker_beforeUpdate(item, context) {
  item.salary = calculateSalary(item);
  return item;
}
