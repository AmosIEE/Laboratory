import {observable, computed, action, autorun, trace} from 'mobx'

window.obserable = observable
class MobxStore {
  @observable todos = []
  @observable filter = ''

  @computed get filteredTodo () {
    return this.todos.filter(todo => todo.indexOf(this.filter) !== -1)
  }

  @computed get todoLength () {
    return this.todos.length
  }

  @action.bound changeFilter (value) {
    this.filter = value
  }

  @action.bound addTodo () {

  }
}

const mobxStore = window.store = new MobxStore()

autorun(() => {
  console.log(mobxStore.todos.length)
})
// ----
let message = observable({
  title: "Foo",
  author: {
    name: "Michel"
  },
  likes: [
    "John", "Sara"
  ]
})
autorun(() => {
  console.log('log1 ' + message.title)
})

// const disposer = autorun(() => {
//   console.log('log ' + message.title)
//   trace()
// })

let title = message.title
autorun(() => {
  console.log('log2 ' + title)
})

// message.title = '123'

autorun(() => {
  console.log('log3 ' + message.author.name)
})
// message.author.name = "Sara"
// message.author = { name: "John" }

const author = message.author
autorun(() => {
  console.log('log4 ' + author.name)
})
// message.author.name = "Sara"
// message.author = { name: "John" }

autorun(() => {
  console.log('log5 ' + message)
})

function upperCaseAuthorName(author) {
  const baseName = author.name
  return baseName.toUpperCase()
}
autorun(() => {
  console.log('log6 ' + upperCaseAuthorName(message.author))
})
// message.author.name = "Chesterton"
autorun(() => {
  setTimeout(() => console.log('log7 ' + upperCaseAuthorName(message.author)), 10)
})

window.message = message


export default mobxStore
