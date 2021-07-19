import React from "react";
import { Card } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Img src="https://picsum.photos/200/100" />
          <Card.Title className="text-center">About this project</Card.Title>
          <Card.Text className="text-start">
            &emsp; This is a project to execute login related operation. Is such
            webpage, Logging in with different account would route to different
            pages. Some page is used by [admin] and some page is used by [user].
            [admin] account could view all users' account and delete one or some
            of them. When delete an user account, all todo items he create would
            be delete as well. And [user] could browse the todo note only they
            leave, also they could add some note, modify existing notes or
            delete some of his notes. <br />
            &emsp; You could try from registe an account first.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Home;
