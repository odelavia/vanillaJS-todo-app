// read existing todos from localStorage
const getSavedTodos = function() {
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

//save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//remove a todo from the list
const removeTodo = function(id) {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// toggle the completed value for a todo
const toggleTodo = function (todo) {
    todo.completed = !todo.completed
}

//render application todos
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {
        const p = generateTodoDOM(todo)
        document.querySelector('#todos').appendChild(p)
    })
}

//generate the DOM element for individual note
const generateTodoDOM = function (todo) {
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')

    //setup the todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)

    checkbox.addEventListener('change', function (){
        // if  (this.checked) {
            // todo.completed = !todo.completed
        // } else {
        //     todo.completed = false
        // }
        toggleTodo(todo)
        saveTodos(todos)
        renderTodos(todos, filters)
    } )

    //setup the todo text
    if (todo.text.length > 0) {
        textEl.textContent = todo.text
    } 
    else {
        textEl.textContent = 'no content'
    }
    todoEl.appendChild(textEl)

    //setup the remove button
    button.textContent = 'x'
    todoEl.appendChild(button)
    button.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// get DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}