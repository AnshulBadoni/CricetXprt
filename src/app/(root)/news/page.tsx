"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const CricketNewsPage = () => {
    const [news, setNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(
                    "https://news.fcsapi.com/api/news?access_key=YOUR_API_KEY&find=cricket&limit=30&country=in&search_in=title,description"
                );
                const data = await res.json();
                if (data.status && data.response) {
                    const formatted = data.response.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        summary: item.description,
                        time: new Date(item.publishedAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        source: item.site,
                        link: item.source,
                        img: item.image?.img || "/cricket-news-placeholder-dark.jpg",
                        category: ["Match Report", "Analysis", "Opinion", "News"][Math.floor(Math.random() * 4)]
                    }));
                    setNews(formatted);
                }
            } catch (err) {
                console.error("Failed to fetch news", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    const main = news[0];
    const secondary = news.slice(1, 4);
    const latest = news.slice(4, 12);
    const featured = news.slice(12, 18);
    const analysis = news.slice(18, 24);
    const community = news.slice(24, 30);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-900">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <div className="relative w-24 h-24 mb-8">
                            {/* Cricket ball loader - dark theme */}
                            <div className="absolute inset-0 rounded-full bg-neutral-800 border-8 border-neutral-700">
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-700 transform -translate-y-1/2"></div>
                                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-neutral-700 transform -translate-x-1/2"></div>
                                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neutral-500"></div>
                                <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-neutral-500"></div>
                                <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-neutral-500"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-neutral-500"></div>
                            </div>
                            <div className="animate-spin absolute inset-0 rounded-full border-8 border-transparent border-t-neutral-500"></div>
                        </div>
                        <h3 className="text-lg font-medium text-neutral-300">Loading Cricket News</h3>
                        <p className="text-sm text-neutral-500 mt-2">Fetching the latest updates...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 font-serif">
            <Head>
                <title>Cricket News | The Cricket Chronicle</title>
                <meta name="description" content="Authoritative cricket news, match reports, and expert analysis" />
            </Head>

            <Navbar />

            {/* Breaking News Banner */}
            <div className="bg-red-700 text-white mt-16 py-2 px-4 text-sm font-medium text-center">
                BREAKING: {secondary[0]?.title.substring(0, 60)}... • <Link href={secondary[0]?.link} target="_blank" className="underline">Read Now</Link>
            </div>

            {/* Main Featured Story */}
            {main && (
                <section className="border-b border-neutral-800">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="relative overflow-hidden rounded-lg shadow-xl h-96">
                                    <img
                                        src={main.img}
                                        alt={main.title}
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/30 to-transparent"></div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-xs font-medium text-red-500 uppercase tracking-wider mb-2">{main.category}</span>
                                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 font-sans">
                                    {main.title}
                                </h1>
                                <p className="text-neutral-400 mb-6">
                                    {main.summary.substring(0, 200)}...
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-neutral-500">By {main.source}</p>
                                        <p className="text-xs text-neutral-500">{main.time}</p>
                                    </div>
                                    <Link
                                        href={main.link}
                                        target="_blank"
                                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded transition-colors border border-neutral-700"
                                    >
                                        Read Full Story
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Secondary Stories */}
            {secondary.length > 0 && (
                <section className="border-b border-neutral-800 py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-xl font-bold mb-8 pb-2 border-b border-neutral-800 font-sans">Top Stories</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {secondary.map((item) => (
                                <article key={item.id} className="group">
                                    <div className="relative mb-4 overflow-hidden rounded-lg h-48 border border-neutral-800">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-900/90 to-transparent p-4">
                                            <span className="text-xs font-medium text-white">{item.category}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors font-sans">
                                        <Link href={item.link} target="_blank">
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <p className="text-sm text-neutral-400 mb-3 line-clamp-2">{item.summary}</p>
                                    <div className="flex items-center justify-between text-xs text-neutral-500">
                                        <span>{item.source}</span>
                                        <span>{item.time}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Latest News Grid */}
            <section className="border-b border-neutral-800 py-12 bg-neutral-800/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold font-sans">Latest News</h2>
                        {/* <Link href="#" className="text-sm text-neutral-400 hover:text-neutral-200 font-medium">
                            View All News →
                        </Link> */}
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {latest.map((item) => (
                            <article key={item.id} className="bg-neutral-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow border border-neutral-700">
                                <div className="h-40 overflow-hidden">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="text-xs font-medium text-neutral-500">{item.category}</span>
                                    <h3 className="text-base font-bold my-2 font-sans">
                                        <Link href={item.link} target="_blank" className="hover:text-red-500 transition-colors">
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-neutral-500">
                                        <span>{item.source}</span>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Analysis */}
            <section className="border-b border-neutral-800 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-xl font-bold mb-8 pb-2 border-b border-neutral-800 font-sans">Featured Analysis</h2>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {featured.map((item) => (
                            <article key={item.id} className="flex flex-col md:flex-row gap-6 bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                                <div className="md:w-1/3 overflow-hidden rounded-lg">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover min-h-48"
                                    />
                                </div>
                                <div className="md:w-2/3">
                                    <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Expert Analysis</span>
                                    <h3 className="text-xl font-bold my-2 font-sans">
                                        <Link href={item.link} target="_blank" className="hover:text-red-500 transition-colors">
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <p className="text-neutral-400 text-sm mb-3 line-clamp-2">{item.summary}</p>
                                    <div className="flex items-center justify-between text-xs text-neutral-500">
                                        <span>By {item.source}</span>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Opinion Section */}
            <section className="border-b border-neutral-800 py-12 bg-neutral-800/30">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-xl font-bold mb-8 pb-2 border-b border-neutral-800 font-sans">Opinion & Editorials</h2>
                    <div className="space-y-6">
                        {analysis.map((item) => (
                            <article key={item.id} className="pb-6 border-b border-neutral-800 last:border-0 last:pb-0">
                                <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">Opinion</span>
                                <h3 className="text-xl font-bold my-2 font-sans">
                                    <Link href={item.link} target="_blank" className="hover:text-red-500 transition-colors">
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="text-neutral-400 mb-3">{item.summary.substring(0, 200)}...</p>
                                <div className="flex items-center justify-between text-xs text-neutral-500">
                                    <span>By {item.source}</span>
                                    <span>{item.time}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="py-16 bg-neutral-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4 font-sans">Stay Updated with The Cricket Chronicle</h2>
                    <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                        Get the day's top cricket stories delivered to your inbox every morning.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-grow px-4 py-3 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-neutral-400"
                        />
                        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-4">
                        By subscribing, you agree to our Terms of Use and Privacy Policy.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 py-12 border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-sm font-bold text-neutral-300 mb-4 uppercase">Sections</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">News</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Scores</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Series</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Teams</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-neutral-300 mb-4 uppercase">Features</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Opinion</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Analysis</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Interviews</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Stats</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-neutral-300 mb-4 uppercase">Company</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">About Us</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Contact</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Careers</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Advertise</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-neutral-300 mb-4 uppercase">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Terms</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Privacy</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">Cookies</Link></li>
                                <li><Link href="#" className="text-sm text-neutral-500 hover:text-neutral-300">GDPR</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-neutral-800 text-center">
                        <p className="text-sm text-neutral-500">© {new Date().getFullYear()} The Cricket Chronicle. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CricketNewsPage;