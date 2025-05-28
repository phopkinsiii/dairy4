// @ts-nocheck
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Heading from '@tiptap/extension-heading';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';

import MenuBar from './MenuBar';

const BlogEditor = ({ content, setContent }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({ openOnClick: false }),
			Image,
			Heading.configure({ levels: [1, 2, 3] }),
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			BulletList,
			OrderedList,
			ListItem,
		],
		content: content || '',
		onUpdate({ editor }) {
			const html = editor.getHTML();
			setContent(html);
		},
		autofocus: true,
	});

	// Keep editor in sync with external content prop
	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content, false);
		}
	}, [content, editor]);

	return (
		<div className="border border-gray-300 rounded-md p-4 bg-white">
			{editor && <MenuBar editor={editor} />}
			<EditorContent
				editor={editor}
				className="prose max-w-none min-h-[300px] focus:outline-none"
			/>
		</div>
	);
};

export default BlogEditor;
