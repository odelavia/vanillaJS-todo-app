'use strict'

// read existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

//save todos to localStorage
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

//remove a todo from the list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// toggle the completed value for a todo
const toggleTodo = (todo) => todo.completed = !todo.completed
// const toggleTodo = (id) => {
//     const todo = todos.find((todo) => todo.id === id)

//     if (todo) {
//     todo.completed = !todo.completed
//     }
// }

//render application todos
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach((todo) => {
        const p = generateTodoDOM(todo)
        document.querySelector('#todos').appendChild(p)
    })
}

//generate the DOM element for individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')

    //setup the todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)

    checkbox.addEventListener('change', () => {
        toggleTodo(todo)
        saveTodos(todos)
        renderTodos(todos, filters)
    } )

    //setup the todo text
    textEl.textContent = todo.text.length > 0 ? todo.text : 'no content'
    todoEl.appendChild(textEl)

    //setup the remove button
    button.textContent = 'x'
    todoEl.appendChild(button)
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// get DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}