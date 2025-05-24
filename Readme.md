{orders
  .filter((order) => showFulfilled || !order.fulfilled)
  .map((order) => {
    // ... your rendering logic
  })}
