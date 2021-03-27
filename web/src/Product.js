import { useRef, useState, useEffect, useCallback } from "react";
import { Card, Button } from "react-bootstrap";

import {
  getAccount,
  getOwner,
  getValue,
  getName,
  getUri,
  buy,
  setTokenValue,
} from "./ethereum";

const Status = {
  READY: "ready",
  PROCESSING: "processing",
};
export function Product({ tokenId, imageSrc, title }) {
  const timer = useRef(null);
  const input = useRef(null);

  const [meta, setMeta] = useState({});

  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.READY);

  const refresh = useCallback(async () => {
    const account = await getAccount();
    const owner = await getOwner(tokenId);
    const value = await getValue(tokenId);
    const name = await getName(tokenId);
    const uri = await getUri(tokenId);

    setMeta({ owner, name, value, uri, userIsOwner: account === owner });
  }, []);

  useEffect(() => {
    refresh();
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
      await buy(tokenId, meta.value.toString());
      setStatus(Status.READY);
      refresh();
    } catch (error) {
      toggleError("Something went wrong. Please try again");
      setStatus(Status.READY);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const value = input.current.value;
    if (!isNaN(value)) {
      setStatus(Status.PROCESSING);
      await setTokenValue(tokenId, value);
      setStatus(Status.READY);
      input.current.value = "";
      refresh();
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
            <small title={meta.owner}>Owner: {meta.owner}</small>
            <br />
            <small>Value: {meta.value}</small>
            <br />
            <small>Name: {meta.name}</small>
            <br />
            <small>Uri: IPFS: {meta.uri}</small>
          </p>
        </div>
      </Card.Body>
      <Card.Footer>
        {meta.userIsOwner ? (
          <p className="user-is-owner px-4 py-2">
            <small>
              You are the owner of this token.{" "}
              <u onClick={handleUpdate}>update value</u>
            </small>
            <form onSubmit={handleUpdate}>
              <input ref={input} />
              <Button
                className="rounded-0"
                type="submit"
                disabled={status === Status.PROCESSING}
              >
                {status === Status.PROCESSING ? "loading" : "Submit"}
              </Button>
            </form>
          </p>
        ) : (
          <Button
            variant="primary"
            className={`rounded-0 text-uppercase ${
              error ? "btn-product-error bg-danger text-white" : ""
            }`}
            onClick={handleBuyToken}
            disabled={status !== Status.READY || !meta.value || error}
          >
            {error
              ? error
              : status === Status.READY
              ? `Buy (${meta.value} cETH)`
              : "Processing..."}
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
