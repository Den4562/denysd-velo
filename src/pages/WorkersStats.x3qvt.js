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

  $w("#buttonSortByDate").onClick(() => {
    loadWorkers("hireDate", "desc");
  });

  $w("#buttonSortByAge").onClick(() => {
    loadWorkers("age", "asc");
  });
});

function loadWorkers(sortField = "hireDate", sortOrder = "desc") {
  let query = wixData.query("Worker");

  if (sortOrder === "asc") {
    query = query.ascending(sortField);
  } else {
    query = query.descending(sortField);
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
