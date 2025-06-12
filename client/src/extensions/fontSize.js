// @ts-nocheck
// src/extensions/FontSize.js
import { Mark, mergeAttributes } from '@tiptap/core';

const FontSize = Mark.create({
	name: 'fontSize',

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	addAttributes() {
		return {
			fontSize: {
				default: null,
				parseHTML: (element) => element.style.fontSize.replace('px', ''),
				renderHTML: (attributes) => {
					if (!attributes.fontSize) return {};
					return {
						style: `font-size: ${attributes.fontSize}px`,
					};
				},
			},
		};
	},

	parseHTML() {
		return [
			{
				style: 'font-size',
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'span',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0,
		];
	},

	addCommands() {
		return {
			setFontSize:
				(size) =>
				({ commands }) => {
					return commands.setMark(this.name, { fontSize: size });
				},
			unsetFontSize:
				() =>
				({ commands }) => {
					return commands.unsetMark(this.name);
				},
		};
	},
});

export default FontSize;
