// WorkersStats.xgwt.js
// Для роботи з Velo API документація: http://wix.to/94BuAAs

import { initializeWorkers } from "../public/workerStats.js";

$w.onReady(function () {
  initializeWorkers($w);
});
