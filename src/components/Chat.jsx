import { useEffect, useRef, useState } from "react";
import { ref as dbRef, onValue, orderByKey, query, limitToLast, off, push, ref } from "firebase/database";
import { auth, database as db } from "../config/firebase";

function Messages() {
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const messagesQuery = query(dbRef(db, "messages"), orderByKey(), limitToLast(50));

        const handleValue = (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setMessages([]);
                return;
            }

            const loadedMessages = Object.entries(data).map(([key, value]) => ({
                key,
                ...value,
            }));
            setMessages(loadedMessages);
        };

        onValue(messagesQuery, handleValue);

        return () => {
            off(messagesQuery, "value", handleValue);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="overflow-y-auto flex flex-col gap-2">
            {messages.map((msg) => (
                <div key={msg.key} className="bg-blue-500 p-2 rounded w-fit max-w-[70%]">
                    <div className="text-xs text-red-900 mb-1">{msg.username}</div>
                    <div className="text-sm">{msg.text}</div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}



function MessageBox() {
    const [message, setMessage] = useState("");

    function sendMessage() {
        const msg = message.trim();
        if (!msg) return;

        const user = auth.currentUser;

        if (!user) return;

        push(ref(db, 'messages'), {
            text: msg,
            createdAt: Date.now(),
            userId: user.uid,
            username: "Anonymous",
        });

        setMessage("");
    }
    return (
        <div className="w-full border-blue-500 border-[2px] grid grid-rows-1 grid-cols-[10fr_1fr]">
            <input
                type="text"
                className="h-full text-center focus:border-none focus:outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
            />
            <button onClick={sendMessage} className="text-white bg-primary-700 cursor-pointer p-1">Send</button>
        </div>
    );
}

function Chat() {
    return (
        <div className="flex justify-center">
            <div className="h-[90vh] w-[90vw] border-blue-900 border-[2px] m-2 p-2 grid grid-rows-[10fr_0.5fr] gap-y-2">
                <Messages />
                <MessageBox />
            </div>
        </div>
    );
}

export default Chat;
