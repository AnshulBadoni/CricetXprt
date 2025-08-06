const AuthHeroSection = () => (
    <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-2/3 bg-gradient-to-br from-gray-900 to-gray-800 items-center justify-center p-12 relative overflow-hidden">
        {/* Subtle sport pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>

        {/* Abstract sport icon */}
        <div className="absolute top-12 right-12 opacity-10">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white" />
                <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="white" />
            </svg>
        </div>

        <div className="max-w-2xl text-white relative z-10">
            <div className="flex items-center mb-6">
                <div className="w-8 h-0.5 bg-blue-400 mr-3"></div>
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                    Performance Intelligence
                </span>
            </div>

            <h2 className="text-4xl font-bold mb-6 leading-tight">
                Cricket Fan<br />
                Live Score, Fantasy Team, and More
            </h2>

            <p className="text-lg mb-8 text-gray-300">
                Professional-grade analytics for athletes and teams who demand precision.
            </p>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 p-5 rounded-xl backdrop-blur-sm border border-white border-opacity-10">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12H18L15 21L9 3L6 12H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-600">Biometric Tracking</h3>
                    <p className="text-sm text-gray-500">Advanced metrics for peak performance</p>
                </div>

                <div className="bg-white bg-opacity-10 p-5 rounded-xl backdrop-blur-sm border border-white border-opacity-10">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="font-semibold mb-2 text-gray-600">Team Sync</h3>
                    <p className="text-sm text-gray-500">Coordinated training programs</p>
                </div>
            </div>
        </div>
    </div>
);

export default AuthHeroSection;