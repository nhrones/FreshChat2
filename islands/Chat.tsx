/** @jsx h */
import { h, useEffect, useReducer, useState, } from "../client_deps.ts";
import * as ctx from '../ctx.ts';
import ChatHistory from './ChatHistory.tsx'
import SendField from './SendField.tsx'

export default function Chat() {
    const [user, setUser] = useState("");
    
    const [status, setStatus] = useState(ctx.DISCONNECTED);
    
    const [messages, addMessage] = useReducer<ctx.Message[], ctx.Message>(
        (msgs, msg) => [...msgs, msg],
        [],
    );
    
    // useEffect(() => {
    //     localStorage.setItem("username", user);
    // }, [user]);

    useEffect(() => {
        const events = new EventSource("/api/listen");
        setStatus(ctx.CONNECTING);
        events.addEventListener("open", () => setStatus(ctx.CONNECTED));
        events.addEventListener("error", () => {
            switch (events.readyState) {
                case EventSource.OPEN:
                    setStatus(ctx.CONNECTED);
                    break;
                case EventSource.CONNECTING:
                    setStatus(ctx.CONNECTING);
                    break;
                case EventSource.CLOSED:
                    setStatus(ctx.DISCONNECTED);
                    break;
            }
        });

        events.addEventListener("message", (e) => {
            addMessage(JSON.parse(e.data));
        });

    }, []);
    const welcome = (user) ? ctx.welcome : ctx.welcome + ctx.askForName
    return (
        <div class='content'>
            <div class='header'>
                <pre class='banner' id='banner'>Deploy Chat - Status: {status}</pre>
            </div>
            <pre> {welcome} </pre>
            <label for='user' >user</label>
            <input
                id="user"
                title="Username"
                autocomplete="off"
                type="text"
                value={user}
                onInput={(e) => setUser(e.currentTarget.value)}
            />
            <SendField user={user} />
            <ChatHistory status={status} messages={messages} />
        </div>
    );
}
