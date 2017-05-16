import Head from 'next/head';
import { Container, Header } from 'semantic-ui-react';

import TodoList from '../components/todo-list';
import CreateTodoForm from '../components/create-todo-form';

import withData from '../libs/with-data';

const HomePage = () => (
  <Container as="main">
    <Head>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
      />
    </Head>
    <Header as="h1">
      GraphQL ToDo App
    </Header>
    <CreateTodoForm />
    <TodoList />
    <style jsx global>{`
      body {
        padding-top: 20vh;
      }
    `}</style>
  </Container>
);

export default withData(HomePage);
