"use client"
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiPlus, FiSearch } from 'react-icons/fi';

interface Room {
    id: string;
    name: string;
    topic: string;
    participants: number;
    isLive: boolean;
    matchId?: string;
    createdAt: Date;
}

export default function RoomsPage() {
    const router = useRouter();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newRoom, setNewRoom] = useState({
        name: '',
        topic: '',
        isMatchRelated: false,
        matchId: ''
    });

    // Mock data - replace with API calls
    const rooms: Room[] = [
        {
            id: '1',
            name: 'India vs Australia - 3rd ODI',
            topic: 'Post-match analysis',
            participants: 1243,
            isLive: true,
            matchId: 'match1',
            createdAt: new Date()
        },
        // ... more rooms
    ];

    const filteredRooms = rooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateRoom = () => {
        // In a real app, you would call your API here
        const createdRoom = {
            id: Math.random().toString(36).substring(7),
            ...newRoom,
            participants: 1,
            isLive: true,
            createdAt: new Date()
        };

        // Redirect to the new room
        router.push(`/rooms/${createdRoom.id}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header with search and create button */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Discussion Rooms</h1>
                    <p className="text-neutral-400">Join live cricket discussions or create your own</p>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                        <input
                            type="text"
                            placeholder="Search rooms..."
                            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        <FiPlus /> Create Room
                    </button>
                </div>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                    <Link
                        key={room.id}
                        href={`/rooms/${room.id}`}
                        className="group block bg-neutral-900 rounded-xl border border-neutral-800 hover:border-emerald-500 transition-colors overflow-hidden"
                    >
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-lg text-white group-hover:text-emerald-400 transition-colors">
                                    {room.name}
                                </h3>
                                {room.isLive && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-900/80 text-red-100">
                                        LIVE
                                    </span>
                                )}
                            </div>

                            <p className="text-neutral-400 text-sm mb-4">{room.topic}</p>

                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">
                                    {room.participants.toLocaleString()} participants
                                </span>
                                <span className="text-neutral-500 text-xs">
                                    {new Date(room.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Create Room Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-neutral-900 rounded-xl border border-neutral-800 w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Create New Room</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">
                                    Room Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    value={newRoom.name}
                                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-1">
                                    Discussion Topic
                                </label>
                                <textarea
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    rows={3}
                                    value={newRoom.topic}
                                    onChange={(e) => setNewRoom({ ...newRoom, topic: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isMatchRelated"
                                    checked={newRoom.isMatchRelated}
                                    onChange={(e) => setNewRoom({ ...newRoom, isMatchRelated: e.target.checked })}
                                    className="rounded border-neutral-700 text-emerald-600 focus:ring-emerald-500"
                                />
                                <label htmlFor="isMatchRelated" className="text-sm text-neutral-300">
                                    Related to a specific match
                                </label>
                            </div>

                            {newRoom.isMatchRelated && (
                                <div>
                                    <label className="block text-sm font-medium text-neutral-300 mb-1">
                                        Match ID
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        value={newRoom.matchId}
                                        onChange={(e) => setNewRoom({ ...newRoom, matchId: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateRoom}
                                disabled={!newRoom.name.trim() || !newRoom.topic.trim()}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-800 disabled:text-neutral-600 rounded-lg text-sm font-medium transition-colors"
                            >
                                Create Room
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}