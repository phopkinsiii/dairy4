<div className="flex flex-wrap gap-4 justify-end mb-4">
	<button
		onClick={() => setShowFulfilled((prev) => !prev)}
		className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
	>
		{showFulfilled ? 'Hide Fulfilled Orders' : 'Show Fulfilled Orders'}
	</button>

	<button
		onClick={() => setShowDateFilter((prev) => !prev)}
		className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
	>
		{showDateFilter ? 'Hide Date Filter' : 'Filter by Date'}
	</button>
</div>
