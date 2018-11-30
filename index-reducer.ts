import * as WebSocket from 'ws';
import reducer from './reducer';
import { createState } from './state';
import { overwriteState } from './actions';

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

let state = createState()

wss.on('connection', function connection(ws: WebSocket) {
  ws.on('message', function incoming(message: string) {
    console.log('received: %s', message);

    if (message === "host") {
      console.log("WARNING: There shouldn't be a host!!!!!")
    } else if (message === "client") {
      console.log("Defining client");
      client = ws;
      if (lastRecipient === "client") {
        send(client, lastSignal)
      }
    } else if (ws === client) {
      console.log("Received client signal")
      state = reducer(state, JSON.parse(message))
      send(client, JSON.stringify(overwriteState(state)))
    }
  });
});