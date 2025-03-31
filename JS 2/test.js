function testFindMinMax() {
    const input = document.getElementById("arrayInput").value.split(",").map(Number);
    const result = findMinMax(input);
    showOutput(`Мін: ${result.min}, Макс: ${result.max}`);
}

function testCompareObjects() {
    try {
        const obj1 = JSON.parse(document.getElementById("obj1").value);
        const obj2 = JSON.parse(document.getElementById("obj2").value);
        const result = compareObjects(obj1, obj2);
        showOutput(`Об'єкти однакові? ${result}`);
    } catch (e) {
        showOutput("Помилка! Введіть коректні об'єкти.");
    }
}
function testNumberInArray() {
    const arrayInput = document.getElementById("arrayInputCheck").value.split(",").map(Number);
    const numberToCheck = Number(document.getElementById("numberCheck").value);
    const result = isNumberInArray(arrayInput, numberToCheck);
    showOutput(`Число ${numberToCheck} у масиві? ${result}`);
}

function testIsInRange() {
    const num = Number(document.getElementById("numCheck").value);
    const min = Number(document.getElementById("rangeMin").value);
    const max = Number(document.getElementById("rangeMax").value);
    const result = isInRange(num, min, max);
    showOutput(`Число ${num} в діапазоні? ${result}`);
}

function testGetGradeDescription() {
    const grade = Number(document.getElementById("grade")?.value); // Використано ?. 
    const result = getGradeDescription(grade);
    showOutput(`Оцінка: ${result}`);
}

function testGetSeason() {
    const month = Number(document.getElementById("month")?.value); // Використано ?. 
    const result = getSeason(month);
    showOutput(`Пора року: ${result}`);
}


function showOutput(text) {
    document.getElementById("output").innerText = text;
}
