// Ініціалізація сортування та пошуку
export function initSort($w, refresh) {
  const sortState = {
    hireDate: "desc",
    age: "asc",
  };

  $w("#buttonSortByDate").onClick(() => {
    const current = sortState.hireDate;
    const newOrder = current === "asc" ? "desc" : "asc";
    sortState.hireDate = newOrder;
    refresh("hireDate", newOrder);
  });

  $w("#buttonSortByAge").onClick(() => {
    const current = sortState.age;
    const newOrder = current === "asc" ? "desc" : "asc";
    sortState.age = newOrder;
    refresh("age", newOrder);
  });

  $w("#inpSearch").onInput(() => {
    const search = $w("#inpSearch").value.trim();
    refresh("", "", search);
  });
}

// Зчитування даних з форми працівника
export function readForm($w) {
  return {
    firstName: $w("#inpFirstName").value,
    lastName: $w("#inpLastName").value,
    age: Number($w("#inpAge").value),
    position: $w("#inpPosition").value,
    hoursPerMonth: Number($w("#inpHoursPerMonth").value),
    hourlyRate: Number($w("#inpHourlyRate").value),
    hireDate: new Date($w("#inpHireDate").value),
  };
}

// Очищення полів форми
export function clearForm($w) {
  $w("#inpFirstName").value = "";
  $w("#inpLastName").value = "";
  $w("#inpAge").value = "";
  $w("#inpPosition").value = "";
  $w("#inpHoursPerMonth").value = "";
  $w("#inpHourlyRate").value = "";
  $w("#inpHireDate").value = null;
}

// Оновлення окремих полів вибраного працівника
export function updateFields($w, row, update) {
  const hpm = $w("#hoursMonth").value.trim();
  const hr = $w("#hoursRate").value.trim();
  let changed = false;

  if (hpm !== "") {
    const val = Number(hpm);
    if (!isNaN(val)) {
      row.hoursPerMonth = val;
      changed = true;
    }
  }

  if (hr !== "") {
    const val = Number(hr);
    if (!isNaN(val)) {
      row.hourlyRate = val;
      changed = true;
    }
  }

  if (changed) {
    return update(row).then(() => {
      $w("#hoursMonth").value = "";
      $w("#hoursRate").value = "";
    });
  }
  return Promise.resolve();
}
