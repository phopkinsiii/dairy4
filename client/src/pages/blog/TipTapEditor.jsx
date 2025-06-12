// @ts-nocheck
// src/pages/TipTapEditor.jsx
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
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontSize from '../../extensions/fontSize';
import MenuBar from '../../components/MenuBar';

const TipTapEditor = ({
	content,
	setContent,
	placeholder = 'Write something...',
	height = 'min-h-[300px]',
}) => {
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
			TextStyle,
			Color,
			FontSize,
		],
		content: content || '',
		autofocus: true,
		onUpdate({ editor }) {
			const html = editor.getHTML();
			setContent(html);
		},
		editorProps: {
			attributes: {
				class: `editor-content focus:outline-none ${height}`,
			},
			handlePaste(view, event) {
				const html = event.clipboardData?.getData('text/html');
				if (!html) return false;

				event.preventDefault();
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');

				doc
					.querySelectorAll('[style]')
					.forEach((el) => el.removeAttribute('style'));
				doc
					.querySelectorAll('meta, style, font, o\\:p')
					.forEach((el) => el.remove());

				const cleaned = doc.body.innerHTML;
				editor.commands.insertContent(cleaned);
				return true;
			},
		},
	});

	useEffect(() => {
		if (editor && content !== editor.getHTML()) {
			editor.commands.setContent(content, false);
		}
	}, [content, editor]);

	return (
		<div className='bg-white/30 dark:bg-white/10 backdrop-blur-md rounded-lg border border-white/30 p-4 shadow'>
			{editor && <MenuBar editor={editor} />}
			<EditorContent
				editor={editor}
				className={`bg-transparent font-bold text-black ${height} px-4 py-3 rounded border-2 border-white`}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TipTapEditor;
