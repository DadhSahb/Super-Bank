const updateTotalPrice = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.productPrice,
    0
  );
  document.getElementById("total-price").innerHTML = totalPrice;
};

updateTotalPrice();
