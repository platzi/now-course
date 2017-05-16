/**
 * GraphQL schema definition
 * @type {String}
 */
module.exports = `
# A Task to do
type Todo {
  # TODO unique ID
  id: String!
  # TODO content
  content: String!
  # TODO status
  status: String!
}

# The list of possible queries
type Query {
  # Get a single TODO
  todo(id: String!): Todo
  # Get the whole list of TODOs
  allTodos: [Todo]
  # Get only the active TODOs
  activeTodos: [Todo]
  # Get only the completed TODOs
  completedTodos: [Todo]
}

# The list of possible mutations
type Mutation {
  # Create a new TODO
  createTodo(
    content: String!
  ): Todo
  # Delete an existing TODO
  deleteTodo(
    id: String!
  ): Todo
  # Check a TODO as completed
  completeTodo(
    id: String!
  ): Todo
}

# The list of possible subscriptions
type Subscription {
  # Subscribe to new TODOs
  todoCreated(
    status: String!
  ): Todo
  # Subscribe to TODO status update
  todoUpdated(
    id: String!
  ): Todo
}

type Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;
