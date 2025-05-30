<Route path="/forum" element={<ForumPage />} />
<Route path="/forum/new" element={<ForumPostForm />} />
<Route path="/forum/:id" element={<ForumPost />} />

{userState.user && (
	<div className="relative group">
		<button
			type="button"
			className={`text-xl font-semibold transition-colors ${
				scrolled ? 'text-gray-700' : 'text-white'
			}`}
		>
			Forum ▾
		</button>
		<ul className="absolute left-0 w-48 mt-2 origin-top bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
			<li>
				<Link
					to="/forum"
					className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					All Posts
				</Link>
			</li>
			<li>
				<Link
					to="/forum/new"
					className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					Add Post
				</Link>
			</li>
		</ul>
	</div>
)}
