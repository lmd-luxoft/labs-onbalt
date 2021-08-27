import { runUI, addEmployeeUI } from './employees/ui';
// import { runUI, addEmployeeUI, openTab, searchEmployeeUI } from './employees/ui';

window.addEmployeeUI = addEmployeeUI;
// window.openTab = openTab;
// window.searchEmployeeUI = searchEmployeeUI;
window.addEventListener("load", runUI);