price: selectedOption.price, // ✅ critical for subtotal
selectedSize: selectedOption.size,
const handleAddToCart = () => {
  if (!selectedOption) return;

  dispatch({
    type: 'ADD_ITEM',
    payload: {
      ...product,
      quantity: 1,
      price: selectedOption.price,          // ✅ used for subtotal
      selectedSize: selectedOption.size,    // ✅ used for display/grouping
    },
  });

  toast.success(`${product.name} added to cart!`, {
    position: 'bottom-right',
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: 'light',
    className: 'text-sm px-3 py-2 rounded shadow-md border border-green-200',
  });
};

