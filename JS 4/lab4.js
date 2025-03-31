let fruits = ["яблуко", "банан", "апельсин", "виноград"];
fruits.pop();
fruits.unshift("ананас");
fruits.sort().reverse();
console.log("Завдання 1:", fruits, "Індекс яблука:", fruits.indexOf("яблуко"));

// Завдання 2
let colors = ["червоний", "синій", "жовтий", "темно-синій", "зелений"];
let longestColor = colors.reduce((a, b) => a.length > b.length ? a : b);
let shortestColor = colors.reduce((a, b) => a.length < b.length ? a : b);
colors = colors.filter(color => color.includes("синій"));
console.log("Оброблений масив кольорів:", colors.join(", "));

// Завдання 3
let employees = [
    { name: "Андрій", age: 30, position: "розробник" },
    { name: "Марина", age: 25, position: "дизайнер" },
    { name: "Олег", age: 35, position: "менеджер" }
];
employees.sort((a, b) => a.name.localeCompare(b.name));
let developers = employees.filter(emp => emp.position === "розробник");
employees = employees.filter(emp => emp.age < 35);
employees.push({ name: "Іван", age: 28, position: "тестувальник" });
console.log("Оновлений список працівників:", employees);

// Завдання 4
let students = [
    { name: "Іван", age: 20, course: 2 },
    { name: "Олексій", age: 22, course: 3 },
    { name: "Марія", age: 19, course: 1 }
];
students = students.filter(student => student.name !== "Олексій");
students.push({ name: "Анна", age: 21, course: 2 });
students.sort((a, b) => b.age - a.age);
let thirdYearStudent = students.find(student => student.course === 3);
console.log("Оновлений список студентів:", students);

// Завдання 5
let numbers = [1, 2, 3, 4, 5];
numbers = numbers.map(n => n ** 2);
numbers = numbers.filter(n => n % 2 === 0);
let sum = numbers.reduce((acc, n) => acc + n, 0);
numbers = [...numbers, 10, 20, 30, 40, 50];
numbers.splice(0, 3);
console.log("Оновлений масив чисел:", numbers);

// Завдання 6
let library = [
    { title: "Книга 1", author: "Автор 1", genre: "Фентезі", pages: 300, isAvailable: true },
    { title: "Книга 2", author: "Автор 2", genre: "Детектив", pages: 250, isAvailable: false }
];
const addBook = (title, author, genre, pages) => library.push({ title, author, genre, pages, isAvailable: true });
const removeBook = (title) => library = library.filter(book => book.title !== title);
const findBooksByAuthor = (author) => library.filter(book => book.author === author);
const toggleBookAvailability = (title) => {
    let book = library.find(book => book.title === title);
    if (book) book.isAvailable = !book.isAvailable;
};
const sortBooksByPages = () => library.sort((a, b) => a.pages - b.pages);
const getBooksStatistics = () => {
    let availableBooks = library.filter(book => book.isAvailable).length;
    let totalPages = library.reduce((acc, book) => acc + book.pages, 0);
    return {
        totalBooks: library.length,
        availableBooks,
        borrowedBooks: library.length - availableBooks,
        averagePages: totalPages / library.length
    };
};
console.log("Статистика бібліотеки:", getBooksStatistics());

// Завдання 7
let student = { name: "Олег", age: 22, course: 3 };
student.subjects = ["Математика", "Фізика", "Програмування"];
delete student.age;
console.log("Оновлений об'єкт студента:", student);