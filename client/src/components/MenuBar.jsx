// src/components/MenuBar.jsx
import {
	TbBold,
	TbItalic,
	TbUnderline,
	TbStrikethrough,
	TbH1,
	TbH2,
	TbH3,
	TbListNumbers,
	TbList,
	TbAlignLeft,
	TbAlignCenter,
	TbAlignRight,
	TbLink,
	TbPhotoPlus,
} from 'react-icons/tb';
import { useRef } from 'react';

const MenuBar = ({ editor }) => {
	const fileInputRef = useRef();
	if (!editor) return null;

	const handleImageUpload = () => fileInputRef.current?.click();

	const insertImage = (url) => {
		editor.chain().focus().setImage({ src: url }).run();
	};

	const uploadImageToCloudinary = async (file) => {
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
			if (data.secure_url) insertImage(data.secure_url);
		} catch (error) {
			console.error('Cloudinary upload failed:', error);
		}
	};

	const onFileChange = (e) => {
		const file = e.target.files?.[0];
		if (file) uploadImageToCloudinary(file);
	};

	const iconButton = (Icon, onClick, isActive, label) => (
		<button
			type='button'
			onClick={onClick}
			title={label}
			className={`p-2 rounded hover:bg-white/20 transition ${
				isActive ? 'bg-white/20' : 'bg-transparent'
			}`}
		>
			<Icon className='w-6 h-6 text-stone-900 dark:text-stone-800 font-bold' />
		</button>
	);

	return (
		<div className='mb-4 rounded-lg border border-white/30 bg-white/30 dark:bg-white/10 backdrop-blur-md p-2 shadow flex flex-wrap gap-1'>
			{/* Font Size Dropdown */}
			<select
				onChange={(e) =>
					editor.chain().focus().setFontSize(e.target.value).run()
				}
				defaultValue=''
				title='Font Size'
				className='px-2 py-1 text-sm rounded bg-white/20 dark:bg-white/20 text-black border border-white/30'
			>
				<option value='' disabled>
					Font Size
				</option>
				<option value='12'>12px</option>
				<option value='14'>14px</option>
				<option value='16'>16px</option>
				<option value='18'>18px</option>
				<option value='20'>20px</option>
				<option value='24'>24px</option>
			</select>

			{iconButton(
				TbBold,
				() => editor.chain().focus().toggleBold().run(),
				editor.isActive('bold'),
				'Bold'
			)}
			{iconButton(
				TbItalic,
				() => editor.chain().focus().toggleItalic().run(),
				editor.isActive('italic'),
				'Italic'
			)}
			{iconButton(
				TbUnderline,
				() => editor.chain().focus().toggleUnderline().run(),
				editor.isActive('underline'),
				'Underline'
			)}
			{iconButton(
				TbStrikethrough,
				() => editor.chain().focus().toggleStrike().run(),
				editor.isActive('strike'),
				'Strikethrough'
			)}
			{iconButton(
				TbH1,
				() => editor.chain().focus().toggleHeading({ level: 1 }).run(),
				editor.isActive('heading', { level: 1 }),
				'Heading 1'
			)}
			{iconButton(
				TbH2,
				() => editor.chain().focus().toggleHeading({ level: 2 }).run(),
				editor.isActive('heading', { level: 2 }),
				'Heading 2'
			)}
			{iconButton(
				TbH3,
				() => editor.chain().focus().toggleHeading({ level: 3 }).run(),
				editor.isActive('heading', { level: 3 }),
				'Heading 3'
			)}
			{iconButton(
				TbListNumbers,
				() => editor.chain().focus().toggleOrderedList().run(),
				editor.isActive('orderedList'),
				'Ordered List'
			)}
			{iconButton(
				TbList,
				() => editor.chain().focus().toggleBulletList().run(),
				editor.isActive('bulletList'),
				'Bullet List'
			)}
			{iconButton(
				TbAlignLeft,
				() => editor.chain().focus().setTextAlign('left').run(),
				editor.isActive({ textAlign: 'left' }),
				'Align Left'
			)}
			{iconButton(
				TbAlignCenter,
				() => editor.chain().focus().setTextAlign('center').run(),
				editor.isActive({ textAlign: 'center' }),
				'Align Center'
			)}
			{iconButton(
				TbAlignRight,
				() => editor.chain().focus().setTextAlign('right').run(),
				editor.isActive({ textAlign: 'right' }),
				'Align Right'
			)}
			{iconButton(
				TbLink,
				() => {
					const url = window.prompt('Enter URL');
					if (url) editor.chain().focus().setLink({ href: url }).run();
				},
				editor.isActive('link'),
				'Add Link'
			)}
			{iconButton(TbPhotoPlus, handleImageUpload, false, 'Upload Image')}

			<input
				type='file'
				accept='image/*'
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={onFileChange}
			/>
		</div>
	);
};

export default MenuBar;
