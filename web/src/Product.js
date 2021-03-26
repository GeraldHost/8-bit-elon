import { useRef, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

import { getOwner, getValue, getName, buy } from "./ethereum";

const Status = {
  READY: "ready",
  PROCESSING: "processing",
};
export function Product({ tokenId, imageSrc, title }) {
  const timer = useRef(null);
  
  const [owner, setOwner] = useState(null);
  const [tokenValue, setTokenValue] = useState(null);
  const [tokenName, setTokenName] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState(Status.READY);

  useEffect(() => {
    (async () => {
      try {
        const addr = await getOwner(tokenId);
        setOwner(addr);
        const value = await getValue(tokenId);
        setTokenValue(value);
        const name = await getName(tokenId);
        setTokenName(name);
      } catch (_) {
        setOwner("N/A");
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const toggleError = () => {
    setError("Something went wrong. Please try again");
    timer.current = setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const handleBuyToken = async () => {
    try {
      setStatus(Status.PROCESSING);
      const resp = await buy(tokenId, tokenValue.toString());
      setStatus(Status.READY);
      setSuccess(true);
    } catch (error) {
      toggleError("Something went wrong. Please try again");
      setStatus(Status.READY);
    }
  };

  return (
    <Card className="rounded-0 product-card">
      <Card.Img variant="top" className="rounded-0 p-3" src={imageSrc} />
      <Card.Body>
        <Card.Title className="h6">{title}</Card.Title>
        <div className="text-muted text-small">
          <p className="token-info">
            <small>Token ID: {tokenId}</small>
            <br />
            <small title={owner}>Owner: {owner}</small>
            <br />
            <small>Value: {tokenValue}</small><br/>
            <small>Name: {tokenName}</small>
          </p>
        </div>
      </Card.Body>
      <Card.Footer>
        {success ? (
          <p className="px-4 py-2">
            <small>
              Please wait while your transaction is processed. You will soon be
              the new owner of this token. Refresh this page to check.
            </small>
          </p>
        ) : (
          <Button
            variant="primary"
            className={`rounded-0 text-uppercase ${
              error ? "btn-product-error bg-danger text-white" : ""
            }`}
            onClick={handleBuyToken}
            disabled={status !== Status.READY || tokenValue === null || error}
          >
            {error
              ? error
              : status === Status.READY
              ? `Buy (${tokenValue} cETH)`
              : "Processing..."}
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
