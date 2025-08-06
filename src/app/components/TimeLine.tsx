const TimelineEvent = ({ event }: any) => {
    const getEventIcon = () => {
        switch (event.type) {
            case 'goal':
                return (
                    <div className="w-6 h-6 rounded-full bg-[#1DB954] flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </div>
                );
            case 'yellow':
                return (
                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                );
            case 'red':
                return (
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                );
            case 'sub':
                return (
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                );
            default:
                return <div className="w-6 h-6 rounded-full bg-gray-300"></div>;
        }
    };

    const getEventDescription = () => {
        switch (event.type) {
            case 'goal':
                return (
                    <>
                        <span className="font-medium">{event.player}</span>
                        {event.assist && <span className="text-gray-500"> (assist: {event.assist})</span>}
                    </>
                );
            case 'yellow':
                return <span className="font-medium">{event.player} - Yellow Card</span>;
            case 'red':
                return <span className="font-medium">{event.player} - Red Card</span>;
            case 'sub':
                return (
                    <>
                        <span className="font-medium">{event.playerIn}</span>
                        <span className="text-gray-500"> replaces </span>
                        <span className="font-medium">{event.playerOut}</span>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex items-start">
            <div className="flex flex-col items-center mr-3">
                {getEventIcon()}
                <div className="w-px h-8 bg-gray-200 mt-1"></div>
            </div>
            <div className="flex-1">
                <div className="text-sm">
                    {getEventDescription()}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    {event.minute}'
                </div>
            </div>
        </div>
    );
};

export default TimelineEvent;