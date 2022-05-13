/** @jsx h */
import { h, useCallback, useState, } from "../client_deps.ts";

export default function SendField(props: { user: string }) {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const disabled = sending || props.user === '';
    const sendDisabled = sending || props.user === '' || message === '';

    const onSubmit = useCallback((e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!disabled) {
            setSending(true);
            fetch("/api/send", {
                method: "POST",
                body: JSON.stringify({ user: props.user, body: message }),
            }).then(() => setMessage("")).finally(() => setSending(false));
        }
    }, [message, props.user, disabled]);

    return (
        <div class='footer' >
            <form onSubmit={onSubmit}>
                <input type="text" value={message}
                    placeholder="Type a message.."
                    onInput={(e) => setMessage(e.currentTarget.value)}
                    disabled={disabled}
                />
                <button type="submit" disabled={sendDisabled}>Send</button>
            </form>
        </div>
    );
}