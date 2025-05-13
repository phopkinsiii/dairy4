import React from 'react';

const Logo = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <img
        src="/images/goat_logo1.png"
        alt="Blueberry Dairy Logo"
        className="h-64 w-auto object-contain max-h-[400px] animate-float transition-transform"
      />
    </div>
  );
};

export default Logo;
