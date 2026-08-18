let quantity = 0;
let total = 0;

document.querySelector("#minus").addEventListener("click", () => {
  quantity = quantity - 1;
  if (quantity > 1) {
    document.querySelector("#quantity").textContent = quantity;
  }
});

document.querySelector("#plus").addEventListener("click", () => {
  quantity = quantity + 1;
  document.querySelector("#quantity").textContent = quantity;
});

document.querySelector(".add-button").addEventListener("click", () => {
    total += quantity
    document.querySelector("#badge").textContent = `Cart (${total})`;
    renderTotal()
})

function renderTotal() {
    document.querySelector(".cart-summary").innerHTML = `Total: <strong> ${total} items</strong>`
}