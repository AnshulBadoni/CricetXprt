import { io, Socket } from "socket.io-client";

let socket: Socket | null;

export const initSocket = (token: string): Socket => {
    if (!socket) {
        socket = io("http://localhost:5000", { // change to your backend URL
            auth: { token },
            path: "/socket.io",
        });
    }
    return socket;
};

export const getSocket = () => socket;
