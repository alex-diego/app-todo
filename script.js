const dropZones = document.querySelectorAll('.dropzone')
const buttonTodo = document.querySelector('#js-button_todo')
const buttonExit = document.querySelector('#js-button_exit')
const buttonAddTodo = document.querySelector('#js-button_form')
const form = document.querySelector('.form')


const app = {
  todo: ['Fazer café', 'Estudar Js', 'Estudar POO'],
  inProgress: ['Aprender CSS'],
  done: ['Estudar html'],

  update() {
    dropZones.forEach(dropzone => dropzone.innerHTML = '')

    app.todo.forEach(todo => {
      const card = `
      <div class="card" draggable="true">
        <div class="card__status red"></div>
        <div class="card__content">${todo}</div>
      </div>
      `

      dropZones[0].innerHTML += card
    })

    app.inProgress.forEach(todo => {
      const card = `
      <div class="card" draggable="true">
        <div class="card__status yellow"></div>
        <div class="card__content">${todo}</div>
      </div>
      `

      dropZones[1].innerHTML += card
    })

    app.done.forEach(todo => {
      const card = `
      <div class="card" draggable="true">
        <div class="card__status green"></div>
        <div class="card__content">${todo}</div>
      </div>
      `

      dropZones[2].innerHTML += card
    })

    const cards = document.querySelectorAll('.card')

    cards.forEach(card => {
      card.addEventListener('dragstart', dragstart)
      card.addEventListener('dragend', dragend)
    })
  },

  addTodo(name) {
    app.todo.push(name)
    app.update()
  }
}


// Events
buttonTodo.addEventListener('click', () => {
  form.classList.add('active')
})

buttonAddTodo.addEventListener('click', (event) => {
  const newTodo = form.querySelector('.form__input').value

  if (newTodo == '') return alert('Por favor, escreva o nome da tarefa.')

  app.addTodo(newTodo)
  form.classList.remove('active')

  event.preventDefault()

})

buttonExit.addEventListener('click', () => {
  form.classList.remove('active')
})

dropZones.forEach(dropzone => {
  dropzone.addEventListener('drag', drag)
  dropzone.addEventListener('dragover', dragover)
  dropzone.addEventListener('dragleave', dragleave)
  dropzone.addEventListener('dragenter', dragenter)
})



// Functions

function drag() {
  dropZones.forEach(dropzone => dropzone.classList.add('highlight'))
}

function dragover() {
  this.classList.add('over')
}

function dragleave() {
  this.classList.remove('over')
}

function dragenter() {
  const card = document.querySelector('.is-dragging')
  this.appendChild(card)
}

function dragstart(event) {
  this.classList.add('is-dragging')
}

function dragend() {
  const card = document.querySelector('.is-dragging')
  const id = card.parentElement.getAttribute('id')
  const todo = card.querySelector('.card__content').textContent

  app.todo.find(todoArray => {
    if (todoArray == todo) {
      app.todo.splice(app.todo.indexOf(todo), 1);
    }
  })

  app.inProgress.find(todoArray => {
    if (todoArray == todo) {
      app.inProgress.splice(app.inProgress.indexOf(todo), 1);
    }
  })

  app.done.find(todoArray => {
    if (todoArray == todo) {
      app.done.splice(app.done.indexOf(todo), 1);
    }
  })

  app[id].push(todo)

  this.classList.remove('is-dragging')
  dropZones.forEach(dropzone => dropzone.classList.remove('highlight'))

  app.update()

}