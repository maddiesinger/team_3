<script>
    import { getLocalStorage } from "../utils.mjs";

// props
export let key = "";

// state vars
let list = [];
let itemTotal = 0;
let shipping = 0;
let tax = 0;
let orderTotal = 0;
let quantity = 0;

// initial setup
const init = function () {
  list = getLocalStorage(key);
  calculateItemSummary(list);
};
// calculate order subtotal from the cart items
const calculateItemSummary = function () {
  // calculate the total of all the items in the cart
  list.array.forEach(item => {
    itemTotal += (item.FinalPrice * item.Quantity)
    quantity += item.Quantity
  });
  
};
// calculate the shipping, tax, and orderTotal
const calculateOrdertotal = function () {
    
    tax = itemTotal * .06
    shipping = 10 + 2(quantity - 1)
    orderTotal = itemTotal + shipping + tax
 
};

// initial setup
init(); 
</script>


  <form class=shipping_form>
  <fieldset class="shipping">
    <legend>Shipping</legend>
    <label for="fname">First Name</label>
    <input id="ship_fname" name="fname" required>
    <label for="lname">Last Name</label>
    <input id="ship_lname" name="lname" required>
    <label for="street">Street</label>
    <input id="ship_street" name="street" required>
    <label for="city">City</label>
    <input id="ship_city" name="city" required>
    <label for="state">Name</label>
    <input id="ship_state" name="state" required>
    <label for="zip">Name</label>
    <input id="ship_zip" name="zip" required>
  </fieldset>
  </form>
  
  <form class=payment_form>
    <fieldset class="payment">
      <legend>Payment</legend>
      <label for="cardNumber">Card Number</label>
      <input type="number" id="paymment_cardNumber" name="cardNumber" required maxlength="16" minlength="16">
      <label for="exp ">Expiration</label>
      <input type="date" id="paym_exp" name="exp" required placeholder="mm/yy">
      <label for="securityCode">Security Code</label>
      <input type="number" id="paymment_securityCode" name="securityCode" required maxlength="3" minlength="3">
    </fieldset>
    </form>

  <fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <p>Item Subtotal</p>
    <p>${itemTotal}</p>
    <p>Shipping Estimate</p>
    <p>${shipping}</p>
    <p>Tax</p>
    <p>${tax}</p>
    <p><strong>Order Total</strong></p>
    <p>${orderTotal}</p>

  </fieldset>