<div className='mb-4'>
	<label htmlFor='gender' className='block text-sm font-medium text-gray-700'>
		Gender <span className='text-red-500'>*</span>
	</label>
	<select
		id='gender'
		name='gender'
		required
		className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2'
		value={goat.gender}
		onChange={(e) => setGoat({ ...goat, gender: e.target.value })}
	>
		<option value=''>Select</option>
		<option value='Doe'>Doe</option>
		<option value='Buck'>Buck</option>
		<option value='Wether'>Wether</option>
	</select>
</div>
