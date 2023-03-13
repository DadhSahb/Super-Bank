//Q11 Total price
let totalPrice = 0;
for (let i = 0; i < cart.length; i++) {
  const product = cart[i].product;
  const quantity = cart[i].quantity;
  const price = product.productPrice;
  totalPrice += price * quantity;
}

document.getElementById("total-price").innerHTML = `$${totalPrice.toFixed(2)}`;

document.querySelector("tbody").innerHTML = cart_content;
//Q14 Delete Button
const deleteBtns = document.querySelectorAll(".delete-cart-item");
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    const productId = parseInt(e.target.getAttribute("data-product-id"));
    const itemIndex = cart.findIndex((item) => item.product.id === productId);
    if (itemIndex > -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      const row = e.target.closest("tr");
      row.parentNode.removeChild(row);
      totalPrice -=
        cart[itemIndex].product.productPrice * cart[itemIndex].quantity;
      document.getElementById("total-price").innerHTML = `$${totalPrice.toFixed(
        2
      )}`;
    }
  });
});

//Q12: Checking Sufficient fund
const checkoutBtn = document.querySelector("#checkoutBtn");
checkoutBtn.addEventListener("click", () => {
  let members = JSON.parse(localStorage.getItem("logged_members"));
  DepositCheck();

  function DepositCheck() {
    let logged_member = JSON.parse(localStorage.getItem("logged_member"));
    if (logged_member) {
      let deposit = logged_member.deposit;
      if (deposit < totalPrice) {
        alert("Insufficient balance");
      } else {
        //Q15: deduct amount from member's deposit
        logged_member.deposit = deposit - totalPrice;
        localStorage.setItem("logged_member", JSON.stringify(logged_member));

        // create new order
        const order = {
          productId: cart[0].product.productId, // assuming only one product in cart
          memberEmail: logged_member.email,
          amount: totalPrice,
          date: new Date().toLocaleString(),
        };

        // store order in orders storage
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        console.log(orders);
        alert("Success");
        //Q15: amount after deduction
        alert("New amount after Deduction: " + deposit);
      }
    }
  }
});
