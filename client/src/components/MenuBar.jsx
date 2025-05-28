// @ts-nocheck
import { useCallback } from 'react';
import {
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Heading1,
	Heading2,
	Heading3,
	ListOrdered,
	ListBullet,
	AlignLeft,
	AlignCenter,
	AlignRight,
	Link as LinkIcon,
	Image as ImageIcon,
} from '@heroicons/react/24/solid';

const MenuBar = ({ editor }) => {
	if (!editor) return null;

	const uploadImageToCloudinary = useCallback(async () => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'image/*';

		fileInput.onchange = async () => {
			const file = fileInput.files[0];
			if (!file) return;

			const formData = new FormData();
			formData.append('file', file);
			formData.append(
				'upload_preset',
				import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
			);

			try {
				const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
					method: 'POST',
					body: formData,
				});

				const data = await res.json();
				if (data.secure_url) {
					editor.chain().focus().setImage({ src: data.secure_url }).run();
				} else {
					console.error('Cloudinary upload failed:', data);
				}
			} catch (err) {
				console.error('Image upload error:', err);
			}
		};

		fileInput.click();
	}, [editor]);

	return (
		<div className='flex flex-wrap gap-2 mb-4 border-b pb-2'>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				title='Bold'
			>
				<Bold className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				title='Italic'
			>
				<Italic className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				title='Underline'
			>
				<Underline className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				title='Strikethrough'
			>
				<Strikethrough className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				title='Heading 1'
			>
				<Heading1 className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				title='Heading 2'
			>
				<Heading2 className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				title='Heading 3'
			>
				<Heading3 className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				title='Bullet List'
			>
				<ListBullet className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				title='Ordered List'
			>
				<ListOrdered className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('left').run()}
				title='Align Left'
			>
				<AlignLeft className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				title='Align Center'
			>
				<AlignCenter className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				title='Align Right'
			>
				<AlignRight className='h-5 w-5 text-gray-700' />
			</button>
			<button
				onClick={() => {
					const url = window.prompt('Enter URL');
					if (url) {
						editor.chain().focus().setLink({ href: url }).run();
					}
				}}
				title='Insert Link'
			>
				<LinkIcon className='h-5 w-5 text-gray-700' />
			</button>
			<button onClick={uploadImageToCloudinary} title='Upload Image'>
				<ImageIcon className='h-5 w-5 text-gray-700' />
			</button>
		</div>
	);
};

export default MenuBar;
