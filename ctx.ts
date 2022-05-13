
export const DISCONNECTED = "🔴 Disconnected";
export const CONNECTING = "🟡 Connecting...";
export const CONNECTED = "🟢 Connected";

export const welcome = `
This application sends your chat messages
live across the world using a global
'BroadcastChannel' in Deno Deploy.

`
export const askForName = `Before you can chat, we need a username.
`
export interface Message {
    id: string;
    ts: string;
    user: string;
    body: string;
  }