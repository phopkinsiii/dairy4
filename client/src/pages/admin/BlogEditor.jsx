// @ts-nocheck
import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

const BlogEditor = ({ content, setContent }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Image,
			Heading.configure({ levels: [1, 2, 3] }),
			BulletList,
			OrderedList,
			ListItem,
		],
		content: content || '',

		onUpdate({ editor }) {
			const html = editor.getHTML();
			console.log('🔄 Tiptap updated content:', html);
			setContent(html);
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
