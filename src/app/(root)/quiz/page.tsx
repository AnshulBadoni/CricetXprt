"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";

const questions = [
    {
        id: 1,
        question: "Which player holds the record for the most goals in World Cup history?",
        options: ["Miroslav Klose", "Pelé", "Ronaldo Nazário", "Lionel Messi"],
        answer: "Miroslav Klose",
    },
    {
        id: 2,
        question: "In cricket, what is a 'duck'?",
        options: [
            "A type of bowling",
            "A score of zero",
            "A six-run hit",
            "An illegal move",
        ],
        answer: "A score of zero",
    },
    {
        id: 3,
        question: "Which NBA team has won the most championships?",
        options: [
            "Los Angeles Lakers",
            "Golden State Warriors",
            "Boston Celtics",
            "Chicago Bulls",
        ],
        answer: "Boston Celtics",
    },
];

const ongoingQuizzes = [
    {
        id: "quiz1",
        title: "Football Legends Trivia",
        status: "Live Now",
        players: 1250,
        category: "Football",
        difficulty: "Medium"
    },
    {
        id: "quiz2",
        title: "Cricket World Cup Challenge",
        status: "Starting Soon",
        startTime: "10:30 AM IST",
        players: 430,
        category: "Cricket",
        difficulty: "Hard"
    },
    {
        id: "quiz3",
        title: "NBA All-Time Greats Quiz",
        status: "Live Now",
        players: 820,
        category: "Basketball",
        difficulty: "Easy"
    },
];

export default function QuizPage() {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const currentQuestion = questions[current];

    const handleOptionClick = (option) => {
        if (showFeedback) return;
        setSelected(option);
    };

    const handleNext = () => {
        if (!selected) return;
        if (selected === currentQuestion.answer) setScore((prev) => prev + 1);
        setShowFeedback(true);
    };

    useEffect(() => {
        if (!showFeedback) return;

        const timer = setTimeout(() => {
            setShowFeedback(false);
            setSelected(null);

            if (current + 1 < questions.length) {
                setCurrent(current + 1);
            } else {
                setShowResult(true);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [showFeedback]);

    const handleRestart = () => {
        setCurrent(0);
        setSelected(null);
        setScore(0);
        setShowResult(false);
        setShowFeedback(false);
    };

    const startQuiz = () => {
        setQuizStarted(true);
        setCurrent(0);
        setSelected(null);
        setScore(0);
        setShowResult(false);
    };

    const percentScore = Math.round((score / questions.length) * 100);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-sans`}>
            {/* Navigation/Header */}
            <div className="mb-20">
                <Navbar />
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!quizStarted ? (
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        {/* Hero Section - Enhanced */}
                        <div className="lg:w-1/2 space-y-8">
                            <div className="space-y-4">
                                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400">
                                    Premium Sports Quiz
                                </span>
                                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                                        Challenge
                                    </span> Your Sports IQ
                                </h1>
                                <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Join thousands of sports enthusiasts in daily trivia battles. Prove your knowledge, climb the leaderboards, and earn exclusive rewards.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={startQuiz}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Start Quiz Now
                                </button>
                                <button className="px-8 py-4 border border-blue-500/50 text-blue-400 hover:bg-blue-900/20 hover:border-blue-400 rounded-xl font-medium transition-all flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                    How It Works
                                </button>
                            </div>

                            {/* Stats - Enhanced */}
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:border-blue-400 transition-all`}>
                                    <div className="text-3xl font-bold text-blue-400 mb-1">50+</div>
                                    <div className="text-sm text-gray-400">Premium Quizzes</div>
                                </div>
                                <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:border-purple-400 transition-all`}>
                                    <div className="text-3xl font-bold text-purple-400 mb-1">10K+</div>
                                    <div className="text-sm text-gray-400">Active Players</div>
                                </div>
                                <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:border-green-400 transition-all`}>
                                    <div className="text-3xl font-bold text-green-400 mb-1">24/7</div>
                                    <div className="text-sm text-gray-400">Live Competitions</div>
                                </div>
                            </div>

                            {/* Trust Indicators */}
                            <div className="mt-8">
                                <p className="text-sm text-gray-400 mb-3">Trusted by sports enthusiasts worldwide</p>
                                <div className="flex flex-wrap gap-4">
                                    {["ESPN", "Bleacher Report", "The Athletic", "Sports Illustrated"].map((brand) => (
                                        <div key={brand} className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-gray-400 text-sm font-medium`}>
                                            {brand}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Image/Illustration - Enhanced */}
                        <div className="lg:w-1/2 relative">
                            <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} p-3`}>
                                <img
                                    src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80"
                                    alt="Sports Quiz"
                                    className="w-full h-auto rounded-2xl object-cover"
                                    loading="lazy"
                                />
                                <div className={`absolute bottom-0 left-0 right-0 p-6 ${darkMode ? 'bg-gradient-to-t from-gray-900/90 to-transparent' : 'bg-gradient-to-t from-white/90 to-transparent'}`}>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <h3 className="font-bold text-lg">Featured Tournament</h3>
                                            <p className="text-sm">Football World Cup History</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                                </svg>
                                                Live Now
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map((i) => (
                                                    <img
                                                        key={i}
                                                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                                                        className="w-6 h-6 rounded-full border-2 border-gray-800"
                                                        alt="Player"
                                                    />
                                                ))}
                                            </div>
                                            <span className="ml-2 text-xs text-gray-400">+1,247 playing</span>
                                        </div>
                                        <div className="text-xs px-2 py-1 bg-gray-700/50 rounded-full">
                                            Prize: $500
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-600/10 rounded-full blur-xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-600/10 rounded-full blur-xl"></div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quiz Section */}
                        <div className={`lg:col-span-2 rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            {/* ... rest of the quiz section remains the same ... */}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* ... rest of the sidebar remains the same ... */}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className={`py-12 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Sportify Quiz</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                                The ultimate destination for sports trivia enthusiasts to test their knowledge and compete with others.
                            </p>
                            <div className="flex space-x-4">
                                {['twitter', 'facebook', 'instagram', 'discord'].map((social) => (
                                    <a key={social} href="#" className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition`}>
                                        <span className="sr-only">{social}</span>
                                        {/* Icon would go here */}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                {['Home', 'Quizzes', 'Leaderboard', 'Rewards'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition`}>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Categories</h3>
                            <ul className="space-y-2">
                                {['Football', 'Basketball', 'Cricket', 'Tennis', 'Baseball', 'More...'].map((sport) => (
                                    <li key={sport}>
                                        <a href="#" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition`}>
                                            {sport}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                                Subscribe to get updates on new quizzes and tournaments.
                            </p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className={`px-4 py-2 rounded-l-lg text-sm w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                />
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} text-center text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        &copy; {new Date().getFullYear()} Sportify Quiz. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}