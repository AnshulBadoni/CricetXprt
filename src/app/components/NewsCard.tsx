const NewsCard = ({ article }:any) => {
    return (
        <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            {/* Image with gradient overlay */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium px-3 py-1 bg-[#0A174E] text-white rounded-full">
                        {article.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {article.time}
                    </span>
                </div>

                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#0A174E] transition-colors">
                    {article.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                </p>

                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden mr-2">
                            <img
                                src={`https://i.pravatar.cc/150?u=${article.author}`}
                                alt={article.author}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-xs text-gray-500">{article.author}</span>
                    </div>

                    <button className="text-xs font-medium text-[#1DB954] hover:text-[#0A174E] flex items-center transition-colors">
                        Read more
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;