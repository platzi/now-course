import { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { Button, Label, Icon, Header, Grid } from 'semantic-ui-react';

class TodoItem extends Component {
  state = { loading: false, error: null };

  handleComplete = async () => {
    this.setState({ loading: true });
    try {
      await this.props.complete();
    } catch (error) {
      console.error(error);
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = async () => {
    this.setState({ loading: true });
    try {
      await this.props.delete();
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Grid columns={2} stackable>
        <Grid.Row as="article">
          <Grid.Column width={13} verticalAlign="middle">
            <Header as="h2">
              {this.props.content}
              <Label color="teal">
                <Icon name="tag" /> {this.props.status}
              </Label>
            </Header>
          </Grid.Column>
          <Grid.Column width={3}>
            {this.props.status === 'active'
              ? <Button
                  type="button"
                  onClick={this.handleComplete}
                  loading={this.state.loading}
                  fluid
                  color="blue"
                  icon="check"
                  content="Complete"
                />
              : <Button
                  type="button"
                  onClick={this.handleDelete}
                  loading={this.state.loading}
                  fluid
                  color="red"
                  icon="remove"
                  content="Delete"
                />}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const completeTodo = gql`
  mutation completeTodo($id: String!) {
    completeTodo(id: $id) {
      id
      status
    }
  }
`;

const deleteTodo = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
      status
    }
  }
`;

export default compose(
  graphql(completeTodo, {
    props: ({ mutate, ownProps }) => ({
      complete: () => mutate({ variables: { id: ownProps.id } }),
    }),
  }),
  graphql(deleteTodo, {
    props: ({ mutate, ownProps }) => ({
      delete: () => mutate({ variables: { id: ownProps.id } }),
    }),
  }),
)(TodoItem);
