<script>
  import { getLocalStorage, formDataToJSON } from "../utils.mjs";
  import {checkout} from "../externalServices.mjs";

// props
export let key = "";

// state vars
let list = [];
let itemTotal = 0;
let shipping = 0;
let tax = 0;
let orderTotal = 0;

// initial setup
const init = function () {
  list = getLocalStorage(key);
  calculateItemSummary(list);
};
// calculate order subtotal from the cart items
const calculateItemSummary = function() {
  // calculate the total of all the items in the cart
  const amounts = list.map((item) => item.FinalPrice);
  itemTotal = amounts.reduce((sum, item) => sum + item);
};
  
// calculate the shipping, tax, and orderTotal
const calculateOrdertotal = function () {
    tax = (itemTotal * .06).toFixed(2)
    shipping = 10 + (list.length - 1) * 2;
    orderTotal = (
      parseFloat(itemTotal) +
      parseFloat(shipping) +
      parseFloat(tax)
    ).toFixed(2);
};

// transform the current cart contents to a simpler format keeping just the things we need to send to checkout
const packageItems = function (items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  };

  const handleSubmit = async function (e) {
    const json = formDataToJSON(this);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = orderTotal;
    json.tax = tax;
    json.shipping = shipping;
    json.items = packageItems(list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

// initial setup
init(); 
</script>

<form class=shipping_form>
<fieldset class="shipping">
    <legend>Shipping</legend>
    <label for="fname">First Name</label><br>
    <input id="ship_fname" name="fname" required><br>
    <label for="lname">Last Name</label><br>
    <input id="ship_lname" name="lname" required><br>
    <label for="street">Street</label><br>
    <input id="ship_street" name="street" required><br>
    <label for="city">City</label><br>
    <input id="ship_city" name="city" required><br>
    <label for="state">State</label><br>
    <input id="ship_state" name="state" required><br>
    <label for="zip">Zip</label><br>
    <input id="ship_zip" name="zip" required on:blur={calculateOrdertotal}><br>
</fieldset>

<fieldset class="payment">
      <legend>Payment</legend>
      <label for="cardNumber">Card Number</label><br>
      <input type="number" id="paymment_cardNumber" name="cardNumber" placeholder="No spaces or dashes!" maxlength="16" minlength="16"><br>
      <label for="exp ">Expiration</label><br>
      <input id="paym_exp" name="exp" required placeholder="mm/yy"><br>
      <label for="securityCode">Security Code</label><br>
      <input type="number" id="paymment_securityCode" name="securityCode" required maxlength="3" minlength="3">
    </fieldset>

    <fieldset class="checkout-summary">
      <legend>Order Summary</legend>
      <ul>
        <li>
          <label for="cartTotal">Item Subtotal({list.length})</label>
          <p name="cartTotal" id="cartTotal">${itemTotal}</p>
        </li>
        <li>
          <label for="shipping">Shipping Estimate</label>
          <p id="shipping">${shipping}</p>
        </li>
        <li>
          <label for="tax">Tax</label>
          <p id="tax">${tax}</p>
        </li>
        <li>
          <label for="orderTotal"><b>Order Total</b></label>
          <p id="orderTotal">${orderTotal}</p>
        </li>
      </ul>
    </fieldset>
<button id="checkoutSubmit" type="submit">Checkout</button>
</form>

<style>
form {
  max-width:25vw;
  
}
.shipping{
  padding: 15px;
}

.shipping input, .shipping label, .payment input, .payment label{
  padding:5px 0px 5px 0px;
  width:100%;
  margin:3px 0px 7px 0px;
}

#checkoutSubmit{
  margin-top:10px ;
}
</style>