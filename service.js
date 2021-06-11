const employeeMap = {};

function findByName(name, surname) {
    let res = [];
    for (let e of DATA.employees) {
        if ((!name || e.name===name) &&
            (!surname || e.surname===surname)) {
            res.push(e);
        }
    }
    return res;
}

function findById(id) {
    if (employeeMap[id]) {
        return employeeMap[id];
    }
    for (let e of DATA.employees) {
        if (id===e.id) {
            employeeMap[id] = e;
            return e;
        }
    }
    return null;
}

function addEmployee(name, surname) {
    if (!name || name.length===0 || !surname || surname.length===0) {
        throw new Error("name and surname should be not empty");
    }
    let id = 0;
    for (let e of DATA.employees) {
        if (e.id>id) id = e.id;
    }
    id++;
    DATA.employees.push({id,name,surname,department:"?"});
    return id;
}

function removeEmployee(id) {
    let index = 0;
    for (let e of DATA.employees) {
        if (e.id===id) {
            if (employeeMap[id]) {
                delete employeeMap[id];
            }
            DATA.employees.splice(index, 1);
            break;
        }
        index++;
    }
}

function showEmployee(employee) {
    console.log("Информация о сотруднике "+employee["name"]+":");
    for (let key of Object.keys(employee)) {
        console.log(key+ " = "+employee[key]);
    }
}

function showEmployees() {
    DATA.employees.forEach(showEmployee);
    // for (let e of DATA.employees) {
    //     showEmployee(e);
    // }
}

function addPhone(id, phone) {
    const employee = findById(id);
    if (!employee.phones) {
        employee.phones = [];
    }
    employee.phones.push(phone);
}

function setDateOfBirth(id, date) {
    const employee = findById(id);
    employee.dateOfBirth = date;
}

function getAge(id) {
    const employee = findById(id);
    if (!employee.dateOfBirth) {
        return;
    }
    let ageDiff = Date.now() - employee.dateOfBirth.getTime();
    let ageDate = new Date(ageDiff); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatDate(date) {
    let day = date.getDate();
    if (day<10) day = '0'+day;
    let month = date.getMonth()+1;
    if (month<10) month = '0'+month;
    let year = date.getFullYear();

    return day + '.' + month + '.' + year;
}

function getEmployeeInfo(id) {
    const e = findById(id);
    const phones = e.phones?
        `Список телефонов: ${e.phones}`:'';
    const dateOfBirth = e.dateOfBirth?
        `Дата рождения: ${formatDate(e.dateOfBirth)}`:'';
    const age = e.dateOfBirth?
        `Возраст: ${getAge(e.id)}`:'';
    return ` 
  Имя: ${e.name}
  Фамилия: ${e.surname}
  Отдел: ${e.department}
  ${dateOfBirth}
  ${phones} 
  ${age}
 `;
}

function getEmployeeJSON(id) {
    const e = findById(id);
    return JSON.stringify(e);
}

function testEmployee() {
    const id = addEmployee('test name', 'surname')
    addPhone(id, "555-55-55");
    addPhone(id, "666-66-66");
    setDateOfBirth(id, new Date(2000,1,1))
    const info = getEmployeeInfo(id);
    const json = getEmployeeJSON(id);
    console.log(info);
    console.log(json);
}
