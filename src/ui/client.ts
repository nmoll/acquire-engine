import Peer from "peerjs";

const startConnection = (gameId: string) => {
  const peer = new Peer(gameId);
  console.log("creating a new game: ", { id: peer.id });
  peer.on("connection", (conn) => {
    console.log("connected");
    conn.on("data", (message: string) => {
      console.log("message from peer!", { message });
    });
    conn.on("open", () => {
      conn.send("hello!");
    });
  });
};

const connect = (gameId: string) => {
  console.log("connecting to game id: ", { gameId });
  const peer = new Peer();
  const conn = peer.connect(gameId);
  conn.on("open", () => {
    console.log("connection open! Sending a new message...");
    conn.send("hi!");
  });
};

export const Client = {
  startConnection,
  connect,
};
