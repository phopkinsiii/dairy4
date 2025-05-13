import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const BlogEditor = ({ content, onChange }) => {
	const editor = useEditor({
		extensions: [StarterKit, Underline, Link, Image],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) {
		return null;
	}

	const addImage = () => {
		const url = window.prompt('Enter image URL');
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	const addLink = () => {
		const url = window.prompt('Enter URL for link');
		if (url) {
			editor.chain().focus().setLink({ href: url }).run();
		}
	};

	return (
		<div className='bg-white border border-gray-300 rounded-lg p-4'>
			{/* Toolbar */}
			<div className='flex gap-2 mb-4'>
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className='btn'
				>
					Bold
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className='btn'
				>
					Italic
				</button>
				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className='btn'
				>
					Underline
				</button>
				<button onClick={addLink} className='btn'>
					Link
				</button>
				<button onClick={addImage} className='btn'>
					Image
				</button>
			</div>

			{/* Editor Content */}
			<EditorContent
				editor={editor}
				className='min-h-[300px] border border-gray-200 rounded-md p-3'
				onKeyDown={(e) => {
					// Prevent form submission on Enter
					if (e.key === 'Enter' && e.shiftKey === false) {
						e.stopPropagation();
					}
				}}
			/>
		</div>
	);
};

export default BlogEditor;
