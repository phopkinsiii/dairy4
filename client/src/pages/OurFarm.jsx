'use client';
import { Title, Meta, Link as HeadLink } from 'react-head';

const values = [
	{
		name: 'Regenerate the Land',
		description:
			'We farm in a way that gives back more than we take — building soil health, capturing carbon, and increasing biodiversity to create a living legacy.',
	},
	{
		name: 'Grow with Purpose',
		description:
			'We produce food that nourishes the body and respects the Earth. From our goats to our orchards, everything is grown with intention and care.',
	},
	{
		name: 'Protect Future Generations',
		description:
			'We believe that we should leave the planet better than we found it. Our commitment is to sustainability not just for today, but for tomorrow’s children.',
	},
	{
		name: 'Live in Harmony with Nature',
		description:
			'We honor the rhythms of nature — respecting the seasons, the soil, and the animals. Farming with nature, not against it, is the path we walk daily.',
	},
	{
		name: 'Stewardship Over Ownership',
		description:
			'The land doesn’t belong to us — we belong to it. We care for our farm as a sacred trust, with humility, accountability, and deep respect.',
	},
	{
		name: 'Beauty Has Purpose',
		description:
			'We believe beauty in farming is more than visual — it’s an expression of health, balance, and the deep joy that comes from working with living things.',
	},
];

const team = [
	{
		name: 'Michael Foster',
		role: 'Co-Founder / CTO',
		imageUrl:
			'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
	},
	// More people...
];
const blogPosts = [
	{
		id: 1,
		title: 'Vel expedita assumenda placeat aut nisi optio voluptates quas',
		href: '#',
		description:
			'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
		imageUrl:
			'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
		date: 'Mar 16, 2020',
		datetime: '2020-03-16',
		author: {
			name: 'Michael Foster',
			imageUrl:
				'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		},
	},
	// More posts...
];
const footerNavigation = {
	main: [
		{ name: 'Home', href: '/' },
		{ name: 'Blog', href: '#' },
		{ name: 'Products', href: '/products' },
		{ name: 'Contact Us', href: '/contact' },
		{ name: 'Accessibility', href: '#' },
		{ name: 'Partners', href: '#' },
	],
	social: [
		{
			name: 'Facebook',
			href: '#',
			icon: (props) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path
						fillRule='evenodd'
						d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
						clipRule='evenodd'
					/>
				</svg>
			),
		},
		{
			name: 'Instagram',
			href: '#',
			icon: (props) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path
						fillRule='evenodd'
						d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
						clipRule='evenodd'
					/>
				</svg>
			),
		},
		{
			name: 'X',
			href: '#',
			icon: (props) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path d='M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z' />
				</svg>
			),
		},
		{
			name: 'GitHub',
			href: '#',
			icon: (props) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path
						fillRule='evenodd'
						d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
						clipRule='evenodd'
					/>
				</svg>
			),
		},
		{
			name: 'YouTube',
			href: '#',
			icon: (props) => (
				<svg fill='currentColor' viewBox='0 0 24 24' {...props}>
					<path
						fillRule='evenodd'
						d='M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z'
						clipRule='evenodd'
					/>
				</svg>
			),
		},
	],
};

export default function OurFarm() {
	return (
		<>
			{/* SEO Metadata */}
			<Title>About Our Farm | Blueberry Dairy</Title>
			<Meta
				name='description'
				content="Discover Blueberry Dairy's regenerative farming practices, Nigerian Dwarf dairy goats, and commitment to healthy food and a cleaner planet."
			/>
			<HeadLink rel='canonical' href='https://blueberrydairy.com/our-farm' />
			<div
				className='relative min-h-screen bg-cover bg-center bg-fixed'
				style={{
					backgroundImage: "url('/images/rolling_hills.jpg')",
				}}
			>
				{/* Combined dark + gradient overlay */}
				<div className='absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent' />
				<main className='relative z-10 min-h-screen'>
					{/* Hero section */}
					<div className='relative isolate -z-10'>
						<div className='overflow-hidden'>
							<div className='mx-auto max-w-7xl px-8 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32'>
								<div className='mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center'>
									<div className='relative w-full lg:max-w-xl lg:shrink-0 xl:max-w-2xl'>
										<h1 className='text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl'>
											Healthy Food From Healthy Soil!
										</h1>
										<p className='mt-8 text-lg font-medium text-pretty text-white sm:max-w-md sm:text-xl/8 lg:max-w-none'>
											At Blueberry Dairy and Hickory Cove Orchards, we believe
											in producing wholesome food the way nature intended. From
											our organically grown apples and blueberries to our
											pasture-raised Nigerian Dwarf dairy goats, everything we
											do is centered on sustainability, integrity, and health.
										</p>
									</div>
									<div className='mt-14 flex justify-end gap-6 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0'>
										<div className='ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80'>
											<div className='relative'>
												<img
													alt=''
													src='/images/blueberrieslg.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
										</div>
										<div className='mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36'>
											<div className='relative'>
												<img
													alt=''
													src='/images/house.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
											<div className='relative'>
												<img
													alt=''
													src='/images/pond3.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
										</div>
										<div className='w-44 flex-none space-y-8 pt-32 sm:pt-0 p-4'>
											<div className='relative'>
												<img
													alt=''
													src='/images/apple1.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
											<div className='relative'>
												<img
													alt=''
													src='/images/milk1.jpg'
													className='aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg'
												/>
												<div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset' />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Content section */}
					<div className='mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8'>
						<div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
							<h2 className='text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl'>
								Our mission
							</h2>
							<div className='mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row'>
								<div className='lg:w-full lg:max-w-2xl lg:flex-auto'>
									<p className='text-xl/8 text-white'>
										At Blueberry Dairy and Hickory Cove Orchards, our mission is
										to nourish people and planet through regenerative
										agriculture. We’re committed to producing wholesome,
										nutrient-dense food while preserving the natural beauty and
										health of our land. Every practice we follow is rooted in
										sustainability, stewardship, and a desire to leave the Earth
										better than we found it — for our children, our community,
										and all future generations.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Image section */}

					{/* Values section */}
					<div className='mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8'>
						<div className='mx-auto max-w-2xl lg:mx-0'>
							<h2 className='text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl'>
								Our values
							</h2>
							<h3 className="text-lg text-white italic mt-2">
								A life rooted in reverence for the land, guided by purpose, and lived in harmony with nature.
							</h3>
						</div>
						<dl className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
							{values.map((value) => (
								<div key={value.name}>
									<dt className='font-semibold text-white'>{value.name}</dt>
									<dd className='mt-1 text-white'>{value.description}</dd>
								</div>
							))}
						</dl>
					</div>

					{/* Logo cloud */}
					<div className='relative isolate -z-10 mt-32 sm:mt-48'></div>

					{/* Team section */}
					<div className='mx-auto mt-32 max-w-7xl px-6 sm:mt-48 lg:px-8'>
						<div className='mx-auto max-w-2xl lg:mx-0'>
							<h2 className='text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl'>
								Our team
							</h2>
							<p className='mt-6 text-lg/8 text-white'>
								We’re a dynamic group of individuals who are passionate about
								what we do and dedicated to delivering the best results for our
								clients.
							</p>
						</div>
						<ul
							role='list'
							className='mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6'
						>
							{team.map((person) => (
								<li key={person.name}>
									<img
										alt=''
										src={person.imageUrl}
										className='mx-auto size-24 rounded-full'
									/>
									<h3 className='mt-6 text-base/7 font-semibold tracking-tight text-white'>
										{person.name}
									</h3>
									<p className='text-sm/6 text-white'>{person.role}</p>
								</li>
							))}
						</ul>
					</div>

					{/* Blog section */}
					<div className='mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8'>
						<div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-none'>
							<h2 className='text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl'>
								From the blog
							</h2>
							<p className='mt-2 text-lg/8 text-white'>
								Learn how to grow your business with our expert advice.
							</p>
						</div>
						<div className='mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
							{blogPosts.map((post) => (
								<article
									key={post.id}
									className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80'
								>
									<img
										alt=''
										src={post.imageUrl}
										className='absolute inset-0 -z-10 size-full object-cover'
									/>
									<div className='absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40' />
									<div className='absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset' />

									<div className='flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300'>
										<time dateTime={post.datetime} className='mr-8'>
											{post.date}
										</time>
										<div className='-ml-4 flex items-center gap-x-4'>
											<svg
												viewBox='0 0 2 2'
												className='-ml-0.5 size-0.5 flex-none fill-white/50'
											>
												<circle r={1} cx={1} cy={1} />
											</svg>
											<div className='flex gap-x-2.5'>
												<img
													alt=''
													src={post.author.imageUrl}
													className='size-6 flex-none rounded-full bg-white/10'
												/>
												{post.author.name}
											</div>
										</div>
									</div>
									<h3 className='mt-3 text-lg/6 font-semibold text-white'>
										<a href={post.href}>
											<span className='absolute inset-0' />
											{post.title}
										</a>
									</h3>
								</article>
							))}
						</div>
					</div>
				</main>

				{/* Footer */}
				<footer className='relative z-10'>
					<div className='mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8'>
						<nav
							aria-label='Footer'
							className='-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6'
						>
							{footerNavigation.main.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className='text-white hover:text-white'
								>
									{item.name}
								</a>
							))}
						</nav>
						<div className='mt-16 flex justify-center gap-x-10'>
							{footerNavigation.social.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className='text-white hover:text-gray-800'
								>
									<span className='sr-only'>{item.name}</span>
									<item.icon aria-hidden='true' className='size-6' />
								</a>
							))}
						</div>
						<p className='mt-10 text-center text-sm/6 text-white'>
							&copy; 2024 Your Company, Inc. All rights reserved.
						</p>
					</div>
				</footer>
			</div>
		</>
	);
}
