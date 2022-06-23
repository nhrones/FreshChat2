/** @jsx h */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";
import Chat from '../islands/Chat.tsx'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Fresh-Chat</title>
                <link id="favicon" rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;,"/>
                <link rel="stylesheet" href="./style.css" />
            </Head>
            <body>
                <Chat/>
            </body>
        </div>
    )
}