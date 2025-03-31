document.getElementById('btn').addEventListener('mousedown', function() {
    const listItems = document.querySelectorAll('ul li'); // Отримуємо всі <li>
    listItems.forEach(item => item.innerText = "Hello world!"); // Встановлюємо текст
    
    this.innerText = "Юрій Джал"; // Змінюємо текст кнопки
});
