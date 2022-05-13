/** @jsx h */
import { h, } from "../client_deps.ts";
import { Message } from '../ctx.ts';

export default function ChatHistory(props: { status: string, messages: Message[] }) {
    return (
        <div>
            <ul class='messages'>
                {props.messages.map((msg) => (
                    <li>{'>>  '} <b>{msg.user}</b>: {msg.body} </li>
                ))}
            </ul>
        </div>
    );
}
