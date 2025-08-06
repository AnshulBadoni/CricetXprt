const TeamBadge = ({ name, logo, size = 'medium', isDark = false }: any) => {
  const sizes: any = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizes[size]} ${isDark ? 'bg-[#1A237E]' : 'bg-white'} rounded-full p-1 shadow-md flex items-center justify-center border ${isDark ? 'border-[#303F9F]' : 'border-gray-200'}`}>
        <img src={logo} alt={name} className="object-contain w-full h-full" />
      </div>
      <span className={`text-xs mt-2 font-medium text-center ${isDark ? 'text-white' : 'text-gray-700'}`}>
        {name}
      </span>
    </div>
  );
};

export default TeamBadge;