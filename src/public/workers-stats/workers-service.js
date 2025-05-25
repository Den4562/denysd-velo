import wixData from "wix-data";

export function loadWorkers(sortField = "", sortOrder = "", searchValue = "") {
  let query = wixData.query("Worker");

  if (sortField && sortOrder === "asc") {
    query = query.ascending(sortField);
  } else if (sortField && sortOrder === "desc") {
    query = query.descending(sortField);
  }

  if (searchValue) {
    query = query
      .contains("firstName", searchValue)
      .or(query.contains("lastName", searchValue))
      .or(query.contains("position", searchValue));
  }

  return query.find();
}

export function addWorker(worker) {
  return wixData.insert("Worker", worker);
}

export function updateWorker(updatedWorker) {
  return wixData.update("Worker", updatedWorker);
}
