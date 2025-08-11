"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useRef, useEffect } from "react";

export default function SupportChatPage() {
    const [messages, setMessages] = useState<{ role: string; content: string; time: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const newMessages = [...messages, { role: "user", content: input, time: timestamp }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("https://apifreellm.com/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama-3.3-70b-instruct",
                    message: input,
                }),
            });

            const data = await res.json();
            const reply = data?.response || "No response";
            setMessages([...newMessages, { role: "assistant", content: reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
        } catch (error) {
            setMessages([...newMessages, { role: "assistant", content: "Error: " + error, time: timestamp }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
            {/* Chat Container */}
            <div className="mb-16">
                <Navbar />
            </div>
            <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-6 p-6 bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-800">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                            {/* Avatar */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-green-600 to-green-800 text-white font-bold">
                                {msg.role === "user" ? "U" : "AI"}
                            </div>

                            {/* Message */}
                            <div className={`max-w-lg px-4 py-3 rounded-2xl shadow-md ${msg.role === "user" ? "bg-green-700 text-white rounded-tr-none" : "bg-gray-800 text-gray-100 rounded-tl-none"
                                }`}>
                                <p className="text-sm">{msg.content}</p>
                                <span className="block text-[10px] mt-1 text-gray-400">{msg.time}</span>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
                            <div className="bg-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-400 italic">
                                <span className="animate-pulse">Typing...</span>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="mt-4 flex">
                    <input
                        type="text"
                        className="flex-1 p-3 rounded-l-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        className="px-6 py-3 bg-green-600 text-white rounded-r-xl hover:bg-green-500 transition-colors font-medium shadow-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div >
    );
}
