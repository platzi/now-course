const uuid = require('uuid/v4');
const { Todo } = require('./db');
const pubsub = require('./pubsub');

/**
 * GrahpQL resolvers
 * @type {Object}
 */
const resolvers = {
  /**
   * Query resolvers
   * @type {Object}
   */
  Query: {
    allTodos() {
      return Todo.findAll();
    },
    activeTodos() {
      return Todo.findAll({ where: { status: 'active' } });
    },
    completedTodos() {
      return Todo.findAll({ where: { status: 'completed' }});
    },
    todo(_, { id }) {
      return Todo.findById(id);
    },
  },
  /**
   * Mutation resolvers
   * @type {Object}
   */
  Mutation: {
    async createTodo(_, { content }) {
      const todo = await Todo.create({ id: uuid(), content, status: 'active' });
      pubsub.publish('todoCreated', todo);
      return todo;
    },
    async deleteTodo(_, { id }) {
      await Todo.update({ status: 'deleted' }, { where: { id }});
      const todo = await Todo.findById(id);
      pubsub.publish('todoUpdated', todo);
      return todo;
    },
    async completeTodo(_, { id }) {
      await Todo.update({ status: 'completed' }, { where: { id }});
      const todo = await Todo.findById(id);
      pubsub.publish('todoUpdated', todo);
      return todo;
    },
  },
  /**
   * Subscription resolvers
   * @type {Object}
   */
  Subscription: {
    todoCreated(todo) { return todo },
    todoUpdated(todo) { return todo },
  },
};

module.exports = resolvers;
