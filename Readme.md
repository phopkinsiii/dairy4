{product.priceOptions?.length > 0 ? (
  product.priceOptions.map((option, index) => (
    <p key={index} className='text-green-700 font-semibold text-sm'>
      ${option.price.toFixed(2)} per {option.size}
    </p>
  ))
) : (
  <p className='text-green-700 font-semibold text-sm'>
    ${product.price?.toFixed(2)}
  </p>
)}

