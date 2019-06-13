import { Model } from '@vuex-orm/core'
import Todo from './Todo'

export default class Research extends Model {
  static entity = 'research'

  static fields () {
    return {
      id: this.increment(),
      name: this.string(''),
      todos: this.hasMany(Todo, 'user_id')
    }
  }
}