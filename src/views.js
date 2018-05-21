import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

//render application todos
const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const filters = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            const p = generateTodoDOM(todo)
            todoEl.appendChild(p)
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'no to-dos to show'
        todoEl.appendChild(messageEl)
    }
}

//generate the DOM element for individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const textEl = document.createElement('span')
    const button = document.createElement('button')

    //setup the todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    } )

    //setup the todo text
    textEl.textContent = todo.text.length > 0 ? todo.text : 'no content'
    containerEl.appendChild(textEl)

    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //setup the remove button
    button.textContent = 'Remove'
    button.classList.add('button', 'button--text')
    todoEl.appendChild(button)
    button.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

// get DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}

export { generateTodoDOM, renderTodos, generateSummaryDOM }