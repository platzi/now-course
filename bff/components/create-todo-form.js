import { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Button, Input, Icon, Grid, Label } from 'semantic-ui-react';

class CreateTodoForm extends Component {
  state = { value: '', sending: false };

  handleChange = ({ target: { value } }) => this.setState({ value });

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ sending: true });
    try {
      await this.props.createTodo(this.state.value);
      this.setState({ value: '' });
    } finally {
      this.setState({ sending: false });
    }
  };

  render() {
    return (
      <Grid columns="2" stackable>
        <Grid.Row as="form" onSubmit={this.handleSubmit}>
          <Grid.Column width="13">
            <Input
              iconPosition="right"
              icon={<Icon name="write" color="black" />}
              fluid
              disabled={this.state.sending}
              type="text"
              maxLength="140"
              name="content"
              onChange={this.handleChange}
              value={this.state.value}
              autoFocus
              placeholder="I have to..."
            />
          </Grid.Column>
          <Grid.Column width="3" textAlign="center">
            <Button
              type="submit"
              loading={this.state.loading}
              fluid
              color="green"
              icon="add"
              content="Create"
              labelPosition="left"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mutation = graphql(
  gql`
  mutation createTodo($content: String!) {
    createTodo(content: $content) {
      id
      status
      content
    }
  }
`,
  {
    props({ mutate }) {
      return {
        createTodo: content => mutate({ variables: { content } }),
      };
    },
  },
);

export default mutation(CreateTodoForm);
