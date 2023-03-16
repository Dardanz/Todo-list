// grab all elements 
const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");
const dateInput = document.querySelector("[data-date]");
const timeInput = document.querySelector("[data-time]");

//local Storage
class Storage {
  static addTodStorage(todoArr){
    localStorage.setItem("todo", JSON.stringify(todoArr));
  }

  static getStorage(){
    return JSON.parse(localStorage.getItem("todo")) || [];
  }
}

// empty array 
let todoArr = Storage.getStorage();

// form part 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000;
    const todo = new Todo(id, input.value, dateInput.value, timeInput.value); // Pass date and time values
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();

    Storage.addTodStorage(todoArr);
});


class Todo {
    constructor(id, todo, date, time){ // Accept date and time as arguments
        this.id = id;
        this.todo = todo;
        this.date = date; // Create date property
        this.time = time; // Create time property
    }
}

// display the todo;
class UI{
    static displayData(){
        let displayData = todoArr.map((item) => {
            return `
                <div class="todo">
                <p>${item.todo}</p>
                <p>Date: ${item.date}</p>
                <p>Time: ${item.time}</p>
                <span class="remove" data-id = ${item.id}>🗑️</span>
                </div>
            `
        });
        lists.innerHTML = (displayData).join(" ");
    }
    static clearInput(){
        input.value = "";
        timeInput.value = "";
        dateInput.value = "";
    }
    static removeTodo(){
        lists.addEventListener("click", (e) => {
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
            let btnId = e.target.dataset.id;
            //remove
            UI.removeArrayTodo(btnId);
        });
    }
    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addTodStorage(todoArr);
    }
}

UI.displayData();
UI.removeTodo(); // Call the removeTodo method separately after displaying the data
