import {observable, computed, action, autorun} from 'mobx'

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

export default mobxStore
