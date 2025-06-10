<div className='relative min-h-screen w-full overflow-hidden'>
  {/* Animated Background */}
  <div
    className='absolute inset-0 bg-cover bg-center animate-zoom-in-once z-0'
    style={{
      backgroundImage: `url('https://res.cloudinary.com/dzhweqopn/image/upload/v1749518190/blue_ridge_parkway_yoxhuz.jpg')`,
      filter: 'blur(8px) brightness(90%)',
    }}
  />

  {/* Your Foreground Content */}
  <div className='relative z-10 px-6 py-24 text-center text-white'>
    <h1 className='text-5xl font-bold drop-shadow-md mb-6'>
      Welcome to Blueberry Dairy
    </h1>
    <p className='max-w-2xl mx-auto text-xl backdrop-blur-sm bg-black/30 p-4 rounded-lg'>
      Discover our fresh, local products and our story of regenerative farming.
    </p>
  </div>
</div>
