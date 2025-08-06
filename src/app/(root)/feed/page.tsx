"use client"
import { useState, useRef, useEffect } from 'react'
import Navbar from '@/app/components/Navbar'


export default function CricketSocialFeed() {
    const [activeTab, setActiveTab] = useState('following')
    const [activePost, setActivePost] = useState(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const storiesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollStories = (direction: any) => {
        if (storiesRef.current) {
            storiesRef.current.scrollBy({
                left: direction === 'right' ? 300 : -300,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 antialiased">
            <div className='pt-16'>
                {/* Enhanced Header with Scroll Effects */}
                <Navbar />
            </div>
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
                {/* Left Sidebar - Stories with Scroll Controls */}
                <div className="md:w-1/5 md:pr-6 mb-6 md:mb-0 relative">
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sticky top-20 border border-gray-700/30 shadow-lg">
                        <h2 className="font-bold text-lg mb-4 flex items-center">
                            <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Stories</span>
                            <span className="ml-auto text-xs text-gray-400/80 flex items-center">
                                <button
                                    onClick={() => scrollStories('left')}
                                    className="p-1 rounded-full hover:bg-gray-700/50 mr-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => scrollStories('right')}
                                    className="p-1 rounded-full hover:bg-gray-700/50"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </span>
                        </h2>
                        <div
                            ref={storiesRef}
                            className="space-y-4 overflow-x-hidden scrollbar-hide"
                            style={{ scrollbarWidth: 'none' }}
                        >
                            <StoryItem username="virat.kohli" image="https://randomuser.me/api/portraits/men/1.jpg" live verified />
                            <StoryItem username="msdhoni" image="https://randomuser.me/api/portraits/men/2.jpg" verified />
                            <StoryItem username="imVkohli" image="https://randomuser.me/api/portraits/men/3.jpg" new />
                            <StoryItem username="rohitsharma" image="https://randomuser.me/api/portraits/men/4.jpg" verified />
                            <StoryItem username="hardikpandya" image="https://randomuser.me/api/portraits/men/5.jpg" new />
                            <StoryItem username="jaspritbumrah" image="https://randomuser.me/api/portraits/men/6.jpg" />
                            <StoryItem username="klrahul" image="https://randomuser.me/api/portraits/men/7.jpg" />
                        </div>
                    </div>
                </div>

                {/* Main Feed */}
                <div className="md:w-3/5">
                    {/* Enhanced Create Post */}
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-700/30 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden shadow-inner border border-gray-500/20 mr-3">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <input
                                type="text"
                                placeholder="What's happening in cricket today?"
                                className="bg-gray-700/50 backdrop-blur-sm rounded-full px-4 py-2 flex-1 outline-none border border-gray-600/30 hover:border-blue-500/30 focus:border-blue-500/50 transition-all placeholder-gray-400/70"
                            />
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-700/30">
                            <div className="flex space-x-4">
                                <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group">
                                    <div className="p-1.5 rounded-full bg-gray-700/50 group-hover:bg-blue-500/10 transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm ml-1">Photo</span>
                                </button>
                                <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group">
                                    <div className="p-1.5 rounded-full bg-gray-700/50 group-hover:bg-blue-500/10 transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm ml-1">Video</span>
                                </button>
                                <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group">
                                    <div className="p-1.5 rounded-full bg-gray-700/50 group-hover:bg-blue-500/10 transition-all">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm ml-1">Location</span>
                                </button>
                            </div>
                            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white px-5 py-1.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-blue-500/20">
                                Post
                            </button>
                        </div>
                    </div>

                    {/* Animated Feed Tabs */}
                    <div className="relative flex border-b border-gray-700/30 mb-6">
                        <button
                            className={`px-4 py-2.5 font-medium text-sm relative z-10 ${activeTab === 'following' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('following')}
                        >
                            Following
                        </button>
                        <button
                            className={`px-4 py-2.5 font-medium text-sm relative z-10 ${activeTab === 'trending' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('trending')}
                        >
                            Trending
                        </button>
                        <button
                            className={`px-4 py-2.5 font-medium text-sm relative z-10 ${activeTab === 'live' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('live')}
                        >
                            Live Matches
                        </button>
                        <div
                            className={`absolute bottom-0 h-0.5 bg-blue-400 transition-all duration-300 ${activeTab === 'following' ? 'left-0 w-20' : activeTab === 'trending' ? 'left-20 w-20' : 'left-40 w-24'}`}
                        ></div>
                    </div>

                    {/* Posts with Enhanced Interactions */}
                    <div className="space-y-6">
                        <Post
                            username="cricket_lover42"
                            userImage="https://randomuser.me/api/portraits/women/44.jpg"
                            time="2h ago"
                            content="Just witnessed the most incredible finish to the India vs Australia match! That last over had me on the edge of my seat. #INDvAUS #CricketAtItsBest"
                            image="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            likes={124}
                            comments={28}
                            shares={12}
                            activePost={activePost}
                            setActivePost={setActivePost}
                            id={1}
                        />

                        <Post
                            username="stats_guru"
                            userImage="https://randomuser.me/api/portraits/men/22.jpg"
                            time="4h ago"
                            content="Virat Kohli's average in run chases since 2019: 68.42 👑 No wonder he's called the chase master! #KingKohli #CricketStats"
                            image="https://images.unsplash.com/photo-1543357486-c250e0b8d08a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                            likes={342}
                            comments={45}
                            shares={67}
                            activePost={activePost}
                            setActivePost={setActivePost}
                            id={2}
                        />

                        <LiveMatchPost
                            team1="IND"
                            team2="ENG"
                            score1="328/7"
                            score2="295"
                            status="India won by 33 runs"
                            time="Live now"
                        />

                        <Post
                            username="wannabe_warner"
                            userImage="https://randomuser.me/api/portraits/men/33.jpg"
                            time="6h ago"
                            content="Trying to perfect my cover drive today at practice. Any tips from the pros out there? #CricketPractice #BattingTips"
                            video="https://example.com/video.mp4"
                            likes={87}
                            comments={15}
                            shares={3}
                            activePost={activePost}
                            setActivePost={setActivePost}
                            id={3}
                        />
                    </div>
                </div>

                {/* Right Sidebar - Trending with Glass Morphism */}
                <div className="md:w-1/5 md:pl-6 mt-6 md:mt-0">
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sticky top-20 border border-gray-700/30 shadow-lg">
                        <h2 className="font-bold text-lg mb-4 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                            Trending Now
                        </h2>

                        <div className="mb-6">
                            <h3 className="text-xs font-medium text-gray-400/80 mb-2 uppercase tracking-wider">#Hashtags</h3>
                            <div className="space-y-3">
                                <TrendingItem tag="INDvAUS" posts="24.5K" trend="up" />
                                <TrendingItem tag="T20WorldCup" posts="18.2K" trend="up" />
                                <TrendingItem tag="ViratKohli" posts="15.7K" trend="steady" />
                                <TrendingItem tag="CricketMemes" posts="12.3K" trend="down" />
                                <TrendingItem tag="IPL2023" posts="9.8K" trend="up" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs font-medium text-gray-400/80 mb-2 uppercase tracking-wider">Live Matches</h3>
                            <div className="space-y-4">
                                <LiveMatchItem team1="AUS" team2="NZ" score1="187/5" score2="163/7" overs="17.3" />
                                <LiveMatchItem team1="SA" team2="PAK" score1="245" score2="198/4" overs="32.1" />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xs font-medium text-gray-400/80 mb-2 uppercase tracking-wider">Suggested Accounts</h3>
                            <div className="space-y-4">
                                <SuggestedUser username="officialbcci" name="BCCI" image="https://randomuser.me/api/portraits/men/60.jpg" verified />
                                <SuggestedUser username="icc" name="ICC" image="https://randomuser.me/api/portraits/men/61.jpg" verified />
                                <SuggestedUser username="cricket_analyst" name="Cricket Analyst" image="https://randomuser.me/api/portraits/women/33.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Enhanced Story Item Component
function StoryItem({ username, image, live = false, new: isNew = false, verified = false }: { username: string, image: string, live?: boolean, new?: boolean, verified?: boolean }) {
    return (
        <div className="flex items-center space-x-3 cursor-pointer group">
            <div className={`relative ${live ? 'ring-2 ring-blue-500 animate-pulse-slow' : isNew ? 'ring-2 ring-gray-500' : 'ring-1 ring-gray-600'} rounded-full p-0.5 transition-all group-hover:ring-2 group-hover:ring-blue-400`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isNew ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-blue-500 to-pink-500'}`}>
                    <div className="w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-700/50">
                        <img src={image} alt={username} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                </div>
                {live && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium shadow-md">
                        LIVE
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium group-hover:text-blue-400 transition-colors flex items-center">
                    {username}
                    {verified && (
                        <svg className="w-3 h-3 ml-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    )}
                </p>
                {isNew && <p className="text-xs text-gray-400/80">New story</p>}
            </div>
        </div>
    )
}

// Enhanced Post Component with Richer Interactions
function Post({ username, userImage, time, content, image, video, likes, comments, shares, activePost, setActivePost, id }: { username: string, userImage: string, time: string, content: string, image?: string, video?: string, likes: number, comments: number, shares: number, activePost: number | null, setActivePost: any, id: number }) {
    const [isLiked, setIsLiked] = useState(false)
    const [currentLikes, setCurrentLikes] = useState(likes)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)

    const handleLike = () => {
        if (isLiked) {
            setCurrentLikes(currentLikes - 1)
        } else {
            setCurrentLikes(currentLikes + 1)
            // Add a small "like" animation effect
            const likeBtn = document.getElementById(`like-btn-${id}`)
            if (likeBtn) {
                likeBtn.classList.add('animate-ping')
                setTimeout(() => likeBtn.classList.remove('animate-ping'), 300)
            }
        }
        setIsLiked(!isLiked)
    }

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M'
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'
        }
        return num.toString()
    }

    return (
        <div className={`bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/30 hover:border-gray-700/50 transition-all ${activePost === id ? 'ring-1 ring-blue-500/30' : ''}`}>
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden shadow-inner border border-gray-500/20">
                        <img src={userImage} alt={username} className="w-full h-full object-cover transition-transform hover:scale-105" />
                    </div>
                    <div>
                        <p className="font-medium flex items-center">
                            {username}
                            <svg className="w-3 h-3 ml-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </p>
                        <p className="text-xs text-gray-400/80">{time}</p>
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-200 p-1 rounded-full hover:bg-gray-700/50 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
                <p className="mb-3 leading-relaxed">{content}</p>

                {image && (
                    <div className="rounded-xl overflow-hidden mb-3 border border-gray-700/30 shadow-inner">
                        <img
                            src={image}
                            alt="Post"
                            className="w-full h-auto max-h-96 object-cover transition-transform duration-500 hover:scale-[1.02] cursor-zoom-in"
                        />
                    </div>
                )}

                {video && (
                    <div className="rounded-xl overflow-hidden mb-3 bg-black aspect-video flex items-center justify-center relative group border border-gray-700/30">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="text-center z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <div className="w-14 h-14 bg-blue-500/90 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                </svg>
                            </div>
                            <p className="text-sm mt-3 text-white/90 font-medium">Watch Video</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Post Stats */}
            <div className="px-4 py-2 border-t border-b border-gray-700/30 flex justify-between text-sm text-gray-400/90">
                <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-gray-800 flex items-center justify-center text-xs text-white">
                            +
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gray-600 border border-gray-800 flex items-center justify-center overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gray-600 border border-gray-800 flex items-center justify-center overflow-hidden">
                            <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <span>{formatNumber(currentLikes)} likes</span>
                </div>
                <div className="flex space-x-3">
                    <span>{formatNumber(comments)} comments</span>
                    <span>{formatNumber(shares)} shares</span>
                </div>
            </div>

            {/* Post Actions */}
            <div className="px-2 py-1.5 flex justify-between">
                <button
                    id={`like-btn-${id}`}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-all ${isLiked ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'}`}
                    onClick={handleLike}
                >
                    <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isLiked ? 1 : 1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Like</span>
                </button>
                <button
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-all ${activePost === id ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'}`}
                    onClick={() => setActivePost(activePost === id ? null : id)}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Comment</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share</span>
                </button>
                <button
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 transition-all"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                >
                    <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </button>
            </div>

            {/* Enhanced Comments Section */}
            {activePost === id && (
                <div className="border-t border-gray-700/30 p-4 bg-gray-800/50">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden shadow-inner border border-gray-500/20">
                            <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 bg-gray-700/50 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-600/30 focus-within:border-blue-500/50 transition-all">
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Write a comment..."
                                    className="bg-transparent border-none outline-none w-full text-gray-200 placeholder-gray-400/70"
                                />
                                <div className="flex space-x-1 ml-2">
                                    <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Comment
                            username="cricket_fan99"
                            userImage="https://randomuser.me/api/portraits/men/41.jpg"
                            time="1h ago"
                            content="Absolutely agree! That match was insane!"
                            likes={12}
                        />
                        <Comment
                            username="sports_enthu"
                            userImage="https://randomuser.me/api/portraits/women/32.jpg"
                            time="45m ago"
                            content="The way they handled pressure was incredible 👏"
                            likes={8}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

// Enhanced Live Match Post Component
function LiveMatchPost({ team1, team2, score1, score2, status, time }: { team1: string, team2: string, score1: string, score2: string, status: string, time: string }) {
    return (
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border-l-4 border-blue-500 hover:shadow-blue-500/10 transition-all">
            <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-400">LIVE MATCH</span>
                    </div>
                    <span className="text-xs text-gray-400/80 bg-gray-700/50 px-2 py-1 rounded-full">{time}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-bold shadow-inner border border-gray-600/30">
                            {team1}
                        </div>
                        <span className="font-medium">{team1}</span>
                    </div>
                    <span className="font-bold bg-gray-700/50 px-3 py-1 rounded-full">{score1}</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-bold shadow-inner border border-gray-600/30">
                            {team2}
                        </div>
                        <span className="font-medium">{team2}</span>
                    </div>
                    <span className="font-bold bg-gray-700/50 px-3 py-1 rounded-full">{score2}</span>
                </div>

                <div className="text-center py-2 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-md font-medium mb-4 border border-gray-600/30">
                    {status}
                </div>

                <div className="flex justify-between rounded-md overflow-hidden shadow-lg">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white py-2.5 transition-all flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Watch Live</span>
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2.5 transition-all flex items-center justify-center space-x-2 border-l border-gray-600/30">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>Match Chat</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

// Enhanced Comment Component
function Comment({ username, userImage, time, content, likes }: { username: string, userImage: string, time: string, content: string, likes: number }) {
    const [isLiked, setIsLiked] = useState(false)
    const [currentLikes, setCurrentLikes] = useState(likes)

    const handleLike = () => {
        if (isLiked) {
            setCurrentLikes(currentLikes - 1)
        } else {
            setCurrentLikes(currentLikes + 1)
        }
        setIsLiked(!isLiked)
    }

    return (
        <div className="flex space-x-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden shadow-inner border border-gray-500/20 flex-shrink-0">
                <img src={userImage} alt={username} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 border border-gray-600/30 group-hover:border-gray-600/50 transition-all">
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm flex items-center">
                            {username}
                            <svg className="w-3 h-3 ml-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </span>
                        <span className="text-xs text-gray-400/80">{time}</span>
                    </div>
                    <p className="text-sm mb-2">{content}</p>
                    <div className="flex items-center space-x-3 text-xs text-gray-400/80">
                        <button
                            className={`flex items-center space-x-1 ${isLiked ? 'text-blue-400' : 'hover:text-gray-300'}`}
                            onClick={handleLike}
                        >
                            <svg className="w-3 h-3" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{currentLikes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
                            <span>Reply</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-gray-300 transition-colors">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Enhanced Trending Item Component
function TrendingItem({ tag, posts, trend = 'steady' }: { tag: string, posts: string, trend?: 'up' | 'down' | 'steady' }) {
    const trendIcons = {
        up: (
            <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        ),
        down: (
            <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        ),
        steady: (
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
        )
    }

    return (
        <div className="flex justify-between items-center group cursor-pointer">
            <div>
                <p className="font-medium group-hover:text-blue-400 transition-colors">#{tag}</p>
                <p className="text-xs text-gray-400/80 flex items-center">
                    {posts} posts
                    <span className="ml-2 flex items-center">
                        {trendIcons[trend]}
                        {trend === 'up' && <span className="text-xs text-green-400 ml-0.5">12%</span>}
                        {trend === 'down' && <span className="text-xs text-red-400 ml-0.5">5%</span>}
                    </span>
                </p>
            </div>
            <button className="text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
            </button>
        </div>
    )
}

// Enhanced Live Match Item Component
function LiveMatchItem({ team1, team2, score1, score2, overs }: { team1: string, team2: string, score1: string, score2: string, overs: string }) {
    return (
        <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-gray-600/50 transition-all border border-gray-600/30 hover:border-blue-500/30 group">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-blue-400">LIVE</span>
                </div>
                <span className="text-xs text-gray-400/80 bg-gray-600/50 px-2 py-1 rounded-full">{overs} overs</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs font-bold shadow-inner border border-gray-500/30">
                        {team1}
                    </div>
                    <span className="text-sm">{team1}</span>
                </div>
                <span className="text-sm font-medium bg-gray-600/30 px-2 py-0.5 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
                    {score1}
                </span>
            </div>
            <div className="flex justify-between items-center mt-1">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-xs font-bold shadow-inner border border-gray-500/30">
                        {team2}
                    </div>
                    <span className="text-sm">{team2}</span>
                </div>
                <span className="text-sm font-medium bg-gray-600/30 px-2 py-0.5 rounded-full group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all">
                    {score2}
                </span>
            </div>
        </div>
    )
}

// Enhanced Suggested User Component
function SuggestedUser({ username, name, image, verified = false }: { username: string, name: string, image: string, verified?: boolean }) {
    const [isFollowing, setIsFollowing] = useState(false)

    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 overflow-hidden shadow-inner border border-gray-500/20 transition-transform group-hover:scale-105">
                    <img src={image} alt={username} className="w-full h-full object-cover" />
                </div>
                <div>
                    <div className="flex items-center space-x-1">
                        <p className="font-medium text-sm group-hover:text-blue-400 transition-colors">{username}</p>
                        {verified && (
                            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        )}
                    </div>
                    <p className="text-xs text-gray-400/80">{name}</p>
                </div>
            </div>
            <button
                className={`text-xs font-medium px-3 py-1 rounded-full transition-all ${isFollowing ? 'bg-gray-700/50 text-gray-400' : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'}`}
                onClick={() => setIsFollowing(!isFollowing)}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    )
}