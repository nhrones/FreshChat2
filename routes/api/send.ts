
import { HandlerContext } from "../../server_deps.ts";
import { Message } from "../../ctx.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
    const msg = await _req.json();

    const user = msg["user"];
    if (typeof user !== "string") {
        return new Response("invalid user", { status: 400 });
    }

    const body = msg["body"];
    if (typeof body !== "string") {
        return new Response("invalid body", { status: 400 });
    }

    const channel = new BroadcastChannel("chat");

    const message: Message = {
        id: crypto.randomUUID(),
        ts: new Date().toISOString(),
        user,
        body,
    };

    channel.postMessage(message);
    channel.close();

    return new Response("message sent");
}
