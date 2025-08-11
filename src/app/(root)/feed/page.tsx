"use client"
import { useEffect, useState } from "react";
import { initSocket, getSocket } from "../../lib/Socket";
import { Post } from "../../types";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
    id: string;
    username: string;
}

interface SportsFeedProps {
    token: string;
}

export default function SportsFeed({ token }: SportsFeedProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [content, setContent] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [sportType, setSportType] = useState("football");
    const { id: userId } = jwtDecode<JWTPayload>(token);

    useEffect(() => {
        const socket = initSocket(token);

        socket.on("connect", () => {
            console.log("Connected to socket");
            socket.emit("joinSportsFeed");
        });

        socket.on("sportsFeedHistory", (recentPosts: Post[]) => {
            setPosts(recentPosts);
        });

        socket.on("newSportsPost", (post: Post) => {
            setPosts((prev) => [post, ...prev]);
        });

        socket.on("postUpdated", (updatedPost: Post) => {
            setPosts((prev) =>
                prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
            );
        });

        return () => {
            socket.disconnect();
        };
    }, [token]);

    const handlePost = () => {
        const socket = getSocket();
        socket?.emit("postSportsMedia", {
            userId,
            content,
            mediaUrl,
            mediaType: mediaUrl.endsWith(".mp4") ? "video" : "image",
            sportType,
            description: content
        });
        setContent("");
        setMediaUrl("");
    };

    const handleReaction = (postId: string, reaction: string) => {
        const socket = getSocket();
        socket?.emit("reactToPost", {
            postId,
            reaction,
            userId
        });
    };

    const handleComment = (postId: string) => {
        const comment = prompt("Enter your comment:");
        if (comment) {
            const socket = getSocket();
            socket?.emit("commentOnPost", {
                postId,
                comment,
                userId
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Post Form */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <textarea
                    className="w-full border p-2 rounded mb-2"
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="text"
                    className="w-full border p-2 rounded mb-2"
                    placeholder="Media URL"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                />
                <select
                    className="border p-2 rounded mb-2"
                    value={sportType}
                    onChange={(e) => setSportType(e.target.value)}
                >
                    <option value="football">Football</option>
                    <option value="basketball">Basketball</option>
                    <option value="cricket">Cricket</option>
                </select>
                <button
                    onClick={handlePost}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Post
                </button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white p-4 rounded shadow">
                        <div className="flex items-center mb-2">
                            <img
                                src={post.user.avatar || "/avatar.png"}
                                className="w-8 h-8 rounded-full mr-2"
                                alt="avatar"
                            />
                            <span className="font-semibold">{post.user.username}</span>
                        </div>
                        <p className="mb-2">{post.content}</p>
                        {post.mediaUrl && post.mediaType === "image" && (
                            <img src={post.mediaUrl} alt="media" className="rounded mb-2" />
                        )}
                        {post.mediaUrl && post.mediaType === "video" && (
                            <video controls src={post.mediaUrl} className="rounded mb-2" />
                        )}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleReaction(post._id, "like")}
                                className="text-blue-500"
                            >
                                👍 Like
                            </button>
                            <button
                                onClick={() => handleComment(post._id)}
                                className="text-green-500"
                            >
                                💬 Comment
                            </button>
                        </div>
                        {/* Comments */}
                        {post.comments?.length > 0 && (
                            <div className="mt-2 border-t pt-2">
                                {post.comments.map((c, idx) => (
                                    <div key={idx} className="flex items-center mb-1">
                                        <img
                                            src={c.user.avatar || "/avatar.png"}
                                            className="w-6 h-6 rounded-full mr-2"
                                            alt="avatar"
                                        />
                                        <span className="font-semibold">{c.user.username}:</span>
                                        <span className="ml-1">{c.text}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
