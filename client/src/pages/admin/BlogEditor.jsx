// @ts-nocheck
import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const BlogEditor = ({ content, setContent }) => {
	const editor = useEditor({
		extensions: [StarterKit, Underline, Link, Image],
		content: content || '',

		onUpdate({ editor }) {
			setContent(editor.getHTML());
		},
	});

	// ⚠️ Ensure the editor content updates when prop changes (e.g., fetched from DB)
	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content);
		}
	}, [content, editor]);

	return (
		<div className='border border-gray-300 rounded-md p-4 bg-white'>
			<EditorContent editor={editor} />
		</div>
	);
};

export default BlogEditor;
