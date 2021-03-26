import "./App.scss";

import { Jumbotron, Container, Row, Col } from "react-bootstrap";

import { Product } from "./Product";
import { products } from "./data";

function App() {
  return (
    <div>
      <Jumbotron fluid className="bg-dark">
        <Container>
          <Row>
            <Col xs={12}>
              <h1 className="mb-4">
                8 <span>bit</span> elon
              </h1>
            </Col>
            <Col xs={8}>
              <p className="intro">
                Once there was a man who really was a Musk. He liked to build
                robots and rocket ships and such.
              </p>
              <p className="text-muted">powered by cheapeth</p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <Row className="my-4 py-5">
          {products.map((product) => (
            <Col xs={4} className="mb-4">
              <Product {...product} />
            </Col>
          ))}
        </Row>
        <Row className="my-4 py-5">
          <Col xs={10}>
            <h1>About</h1>
            <p>
              This project was a bit of fun to play around with implementing and
              deploying an ERC-721 contract (NFTs).
            </p>
            <p>
              The 8BitElon token contract is a self serviced NFT platform. The
              owner of the contract (me) can mint new tokens give them a URI and
              a value in cETH.
            </p>
            <p>
              Any user can send cETH to the "buy" method and as long as the
              amount of cETH they send is greater than or equal to the stored
              value of the token, the token will be transfered to the purchaser.
            </p>
            <p>
              The owner of any token can set the value of it by sending a
              transaction to the "setValue" method
            </p>
          </Col>
        </Row>
      </Container>
      <footer className="text-center p-4">
        <p className="m-0 p-0 pb-4 text-muted">project by Gerald Host</p>
      </footer>
    </div>
  );
}

export default App;
