import {
  loadWorkers,
  addWorker,
  updateWorker,
} from "public/workers-service.js";

import {
  initSort,
  initSelect,
  readForm,
  clearForm,
  updateFields,
} from "public/workers-event.js";

let selectedRow = null;

$w.onReady(function () {
  refreshTable();

  initSort($w, refreshTable);
  initSelect($w, (row) => (selectedRow = row));

  $w("#formButton").onClick(() => {
    const newWorker = readForm($w);
    addWorker(newWorker).then(() => {
      refreshTable();
      clearForm($w);
    });
  });

  $w("#editButton").onClick(() => {
    if (!selectedRow) return;

    updateFields($w, selectedRow, updateWorker).then(() => refreshTable());
  });
});

function refreshTable(sortField = "", sortOrder = "", search = "") {
  loadWorkers(sortField, sortOrder, search).then((results) => {
    $w("#table1").rows = results.items;
  });
}
