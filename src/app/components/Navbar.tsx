import Link from 'next/link'
import React from 'react'
import { deleteCookieData, getAuthToken } from '../utils/cookies'
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const token = getAuthToken();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-gray-900/50 border-b border-gray-800/30">
            <div className="mx-auto max-w-7xl px-6">
                <div className="relative flex h-16 items-center justify-between">

                    {/* Logo/Brand - Minimalist */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" />
                                <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-14c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z" fill="currentColor" fillOpacity="0.2" />
                            </svg>
                        </div>
                        <span className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">SportEXPRT</span>
                    </Link>

                    {/* Desktop Navigation - Clean Lines */}
                    <div className="hidden lg:flex items-center space-x-1">
                        <NavLink href="#" text="Live" icon="🟢" active />
                        <NavLink href="#" text="Matches" icon="" />
                        <NavLink href="/news" text="News" icon="" />
                        <NavLink href="#" text="Teams" icon="" />
                        {/* <div className="w-px h-6 bg-gray-700 mx-8"></div>
                        <div className='mx-6'>
                            <SearchBar />
                        </div> */}
                    </div>

                    {/* Right Side - Minimal Actions */}
                    <div className="flex items-center space-x-3">
                        <ProfileButton token={token} />

                        <button className="lg:hidden p-1.5 rounded-lg hover:bg-gray-800/30">
                            <svg className="h-6 w-6 text-gray-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar



{/* Reusable Components for Clean Code */ }
const NavLink = ({ href, text, icon, active = false }: { href: string, text: string, icon?: string, active?: boolean }) => (
    <Link href={href} className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all ${active ? 'text-white bg-gray-800/50' : 'text-gray-400 hover:text-white hover:bg-gray-800/20'}`}>
        {icon && <span className="mr-1.5 text-xs">{icon}</span>}
        {text}
    </Link>
);

const SearchBar = () => (
    < div className="relative" >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
        <input
            type="text"
            className="block w-40 pl-10 pr-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/30 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            placeholder="Search..."
        />
    </div >
);

const ProfileButton = (token: any) => {
    const router = useRouter()
    const logout = () => {
        deleteCookieData();
        router.push('/sign-in');
    }
    return (
        <button className="flex items-center space-x-1.5 focus:outline-none group">
            <div className="gap-x-2 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {/* Optional: coin display */}
                {/* <span className="text-sm">100 CC</span> */}
                {/* <img src="/coins.png" alt="coin" className="size-8" /> */}
            </div>

            {token?.token ? (
                <>
                    <div onClick={logout} className="relative inline-block text-left">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <img className="w-8 h-8 rounded-full object-cover" src="/user.png" alt="User" />
                        </div>

                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                            <div className="px-4 py-3">
                                <p className="text-sm font-semibold text-gray-800">Username</p>
                                <p className="text-xs text-gray-500 truncate">user@example.com</p>
                                <p className="mt-2 text-sm text-gray-600">💰 <span className="font-medium">Coins:</span> 1,250</p>
                            </div>
                            <div className="border-t border-gray-200" />
                            <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-xl">
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Link href="/sign-in" className="hidden lg:block px-3 py-1.5 text-sm font-medium border-2 border-gray-400 text-neutral-100 hover:bg-gray-50/10 rounded-xs transition-colors">
                        Log In
                    </Link>
                    <Link href="/sign-up" className="hidden lg:block px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xs transition-colors">
                        Register
                    </Link>
                </>
            )}
        </button>
    );
}
{/* Mobile Menu - Only appears when needed */ }
<div className="lg:hidden hidden" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50">
        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-800/50">Live</a>
        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800/30">Matches</a>

        <Link href="/news" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800/30">News</Link>
        {/* <div className="px-3 py-2">
            <input
                type="text"
                className="block w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/30 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50"
                placeholder="Search..."
            />
        </div> */}
    </div>
</div>