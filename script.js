window.addEventListener('load' , ()=> {
    const name = localStorage.getItem('username') || "";
    const nameInput = document.querySelector("#name");
    nameInput.value = name;
    // -> e: paremeter that returns the element that makes an event
    nameInput.addEventListener('change' , (e)=>{
        localStorage.setItem('username' , e.target.value);
    } )
     todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newtodoform = document.querySelector('#new-todo-form');
    newtodoform.addEventListener('submit' , (e) => {
        e.preventDefault();
        const task = { content:e.target.elements.content.value,
            category:e.target.elements.category.value,
            createdat:new Date().getTime(),
            done:false
        }
        todos.push(task);
        localStorage.setItem('todos' , JSON.stringify(todos) );
        e.target.reset();
        console.log(todos);
        DisplayTodos();
    })
    DisplayTodos();
})
//createElement: to male an element like in html
//foreach: to access the list
//checkbox: to make a check bok shape
// .classlist.add: to add class name to an element
// .checked: to see if the box is checked or not
function DisplayTodos(){
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = "";
    todos.forEach(task => {
        const todoItem = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        todoItem.classList.add('todo-item');
        input.type = 'checkbox';
        input.checked = task.done;
        span.classList.add('bubble')
       // the if condition for check if it personal or business
        if (task.category=='personal'){
            span.classList.add('personal');
        }
        else {
            span.classList.add('business');
        }
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
        edit.innerHTML = 'edit';
        deleteButton.innerHTML = "delete";
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(todoItem);
        if (task.done){
            todoItem.classList.add('done');
        }
        input.addEventListener('change', (e)=>{
            task.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            if(task.done){
                todoItem.classList.add('done');
            }
            else{
                todoItem.classList.remove('done');
            }
            DisplayTodos();
        });
        deleteButton.addEventListener('click', (e)=>{
            todos = todos.filter(T => T != task);
            DisplayTodos();
        })
        edit.addEventListener('click', (e)=>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly')
            input.focus();
            input.addEventListener('blur', (e)=>{
                input.setAttribute('readonly', true);
                task.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })
    });
}












