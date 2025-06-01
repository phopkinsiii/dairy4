<div
	className='relative flex flex-col items-center'
	onMouseEnter={() => setShowTooltip(true)}
	onMouseLeave={() => setShowTooltip(false)}
>
	{showTooltip && (
		<span
			className='tooltip-glass mb-2'
			style={{
				opacity: 1,
				pointerEvents: 'auto',
			}}
		>
			Toggle Theme
		</span>
	)}

	<button
		onClick={toggleTheme}
		className='p-2 rounded-full transition-colors duration-300 focus:outline-none bg-transparent hover:bg-stone-200 dark:hover:bg-stone-700'
		aria-label='Toggle theme'
	>
		{theme === 'dark' ? (
			<Sun className='w-6 h-6 text-yellow-400' />
		) : (
			<Moon className='w-6 h-6 text-stone-800' />
		)}
	</button>
</div>
