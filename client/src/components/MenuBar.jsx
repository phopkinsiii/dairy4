const MenuBar = ({ editor }) => {
	if (!editor) return null;

	return (
		<div className='flex flex-wrap gap-2 border border-gray-200 p-2 rounded mb-4 bg-white shadow-sm'>
			<button
				type='button'
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={`${
					editor.isActive('bold') ? 'bg-gray-300' : ''
				} px-2 py-1 rounded`}
			>
				Bold
			</button>
			<button
				type='button'
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={`${
					editor.isActive('italic') ? 'bg-gray-300' : ''
				} px-2 py-1 rounded`}
			>
				Italic
			</button>
			<button
				type='button'
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				className={`${
					editor.isActive('underline') ? 'bg-gray-300' : ''
				} px-2 py-1 rounded`}
			>
				Underline
			</button>
			<button
				type='button'
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={`${
					editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
				} px-2 py-1 rounded`}
			>
				H2
			</button>
			<button
				type='button'
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={`${
					editor.isActive('bulletList') ? 'bg-gray-300' : ''
				} px-2 py-1 rounded`}
			>
				• List
			</button>
			<button
				type='button'
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={`${
					editor.isActive('paragraph') ? 'bg-gray-300' : ''
				} px-2 py-1 rounded`}
			>
				Paragraph
			</button>
		</div>
	);
};

export default MenuBar;
