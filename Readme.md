dispatch({
  type: 'ADD_ITEM',
  payload: {
    ...product,
    selectedOption: {
      size: 'gallon', // replace with actual selected value from form or dropdown
      price: 10,
    },
    quantity: 1,
  },
});

