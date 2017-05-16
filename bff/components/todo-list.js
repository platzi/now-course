import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Segment } from 'semantic-ui-react';

import TodoItem from './todo-item';

class TodoList extends Component {
  componentDidMount() {
    this.props.subscribeToNewTodos();
  }

  filter = todo => todo.status !== 'deleted';
  map = todo => <TodoItem key={todo.id} {...todo} />;

  render() {
    if (this.props.todos.allTodos.filter(this.filter).length === 0) {
      return null;
    }
    return (
      <Segment raised>
        {this.props.todos.allTodos.filter(this.filter).map(this.map)}
      </Segment>
    );
  }
}

const query = gql`
  query {
    allTodos {
      id
      status
      content
    }
  }
`;

const subscription = gql`
  subscription onTodoCreated($status: String!) {
    todoCreated(status: $status) {
      id
      status
      content
    }
  }
`;

export default graphql(query, {
  name: 'todos',
  props: props => ({
    ...props,
    subscribeToNewTodos: params =>
      props.todos.subscribeToMore({
        document: subscription,
        variables: { status: 'active' },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newTodoItem = subscriptionData.data.todoCreated;
          return {
            allTodos: [newTodoItem, ...prev.allTodos],
          };
        },
      }),
  }),
})(TodoList);
