import { setupEvents } from "./event.js";
import { loadWorkers } from "../backend/data.js";

$w.onReady(function () {
  loadWorkers();
  setupEvents();
});
