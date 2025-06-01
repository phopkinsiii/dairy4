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
import MenuBar from '../../components/MenuBar';

const BlogEditor = ({ content, setContent }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link.configure({ openOnClick: false }),
			Image.configure({
				HTMLAttributes: {
					class: 'max-w-full h-auto rounded-md my-4',
				},
			}),
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

	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content, false);
		}
	}, [content, editor]);
	//  className='min-h-screen bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-100 px-4 py-8'
	return (
		<div
			className='border rounded-md p-4 min-h-screen px-4 py-8'
			style={{
				backgroundColor: 'var(--bg-color)',
				color: 'var(--text-color)',
				borderColor: 'var(--border-color)',
			}}
		>
			{editor && <MenuBar editor={editor} />}
			<EditorContent
				editor={editor}
				className='editor-content'
				style={{
					backgroundColor: 'var(--input-bg)',
					color: 'var(--text-color)',
					padding: '1rem',
					borderRadius: '8px',
					border: '1px solid var(--border-color)',
					minHeight: '300px',
				}}
			/>
		</div>
	);
};

export default BlogEditor;
