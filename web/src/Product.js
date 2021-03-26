import { Card, Button } from "react-bootstrap";

export function Product({ imageSrc, title, price }) {
  return (
    <Card className="rounded-0 product-card">
      <Card.Img variant="top" className="rounded-0 p-3" src={imageSrc} />
      <Card.Body>
        <Card.Title className="h6">{title}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" className="rounded-0 text-uppercase">
          Buy ({price} eth)
        </Button>
      </Card.Footer>
    </Card>
  );
}
