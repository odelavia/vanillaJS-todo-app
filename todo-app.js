let todos = [
//     {
//     text: 'Order cat food',
//     completed: false
// }, {
//     text: 'Clean kitchen',
//     completed: true
// }, {
//     text: 'Buy food',
//     completed: true
// }, {
//     text: 'Do work',
//     completed: false
// }, {
//     text: 'Exercise',
//     completed: true
// }
]

// localStorage.setItem('location', 'Philadelphia')
// localStorage.getItem('location')
// localStorage.removeItem('location')
// localStorage.clear()
// const userJSON = JSON.stringify(user)
// localStorage.setItem('name', userJSON)
// const user = JSON.parse(userJSON)

const todosJSON = localStorage.getItem('todos')
if (todosJSON !== null) {
    todos = JSON.parse(todosJSON)
}

const filters = {
    searchText: '',
    hideCompleted: false
}

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

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)

    filteredTodos.forEach(function (todo) {
        const p = document.createElement('p')
        if(todo.text.length > 0) {
            p.textContent = todo.text
        } else {
            p.textContent = ''
        }
        document.querySelector('#todos').appendChild(p)
    })
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', function (e) {
    e.preventDefault()
    todos.push({
        text: e.target.elements.text.value,
        completed: false
    })
    localStorage.setItem('todos', JSON.stringify(todos))
    renderTodos(todos, filters)
    e.target.elements.text.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})