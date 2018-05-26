import * as WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

let host: WebSocket;
let client: WebSocket;

let lastSignal: String;
let lastRecipient: String;

function send(ws: WebSocket, msg: String) {
  if (ws.readyState === ws.OPEN) {
    ws.send(msg)
  } else {
    console.log("Not open")
  }
}

wss.on('connection', function connection(ws: WebSocket) {
  ws.on('message', function incoming(message: string) {
    console.log('received: %s', message);

    if (message === "host") {
      console.log("Defining host");
      host = ws;
      if (lastRecipient === "host") {
        send(host, lastSignal)
      }
    } else if (message === "client") {
      console.log("Defining client");
      client = ws;
      if (lastRecipient === "client") {
        send(client, lastSignal)
      }
    } else if (ws === host) {
      console.log("Received host signal")
      if (client) {
        console.log("Sending to client")
        send(client, message)
      } else {
        console.log("No client yet, saving for later")
        lastSignal = message
        lastRecipient = "client"
      }
    } else if (ws === client) {
      console.log("Received client signal")
      if (host) {
        console.log("Sending to host")
        send(host, message);
      } else {
        console.log("No client yet, saving for later")
        lastSignal = message
        lastRecipient = "host"
      }
    }
  });
});