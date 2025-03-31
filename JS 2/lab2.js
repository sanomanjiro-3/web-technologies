function findMinMax(arr) {
    return { min: Math.min(...arr), max: Math.max(...arr) };
}

function compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function isInRange(num, min, max) {
    return num >= min && num <= max;
}

function getGradeDescription(grade) {
    if (grade >= 90) {
        return "Відмінно";
    } else if (grade >= 75) {
        return "Добре";
    } else if (grade >= 60) {
        return "Задовільно";
    } else {
        return "Незадовільно";
    }
}

function getSeason(month) {
    return month === undefined ? "Невідомий місяць" : 
           month >= 3 && month <= 5 ? "Весна" :
           month >= 6 && month <= 8 ? "Літо" :
           month >= 9 && month <= 11 ? "Осінь" : "Зима";
}

function isNumberInArray(arr, num) {
    return arr.includes(num);
}
