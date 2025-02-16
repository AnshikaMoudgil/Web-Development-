// Get elements
const menu = document.querySelector(".menu");
const user = document.querySelectorAll(".user-logo");
const closeLogin = document.querySelector(".close-login");
const login = document.querySelector(".login");
const signInBtn = document.querySelector(".signin-btn");
const cart = document.querySelector(".cart");
const closingBtn = document.querySelector(".closing-btn");
const cartMain = document.querySelector(".cart-main");
const wishlistBtn = document.querySelector(".wishlist-btn");
const showCartBtns = document.querySelectorAll(".showcartmain");
const emptyPara = document.querySelector(".empty-para");

// For showing cart section
const showCartMain = function () {
  cartMain.classList.add("wrapper");
};

showCartBtns.forEach(function (e) {
  e.addEventListener("click", function () {
    showCartMain();
  });
});

// login functionlaity
function Login() {
  const email = $("#login-email").val();
  const password = $("#login-password").val();

  $.ajax({
    type: "POST",
    url: "/login", //update the endpoint based on flask
    data: { email: email, password: password },
    success: function (response) {
      //handle the response from the server
      console.log(response);
    },
    error: function (error) {
      //handle errors
      console.log(error);
    },
  });
}

// For hiding the cart
const hideCartMain = function () {
  cartMain.classList.remove("wrapper");
};

closingBtn.addEventListener("click", hideCartMain);

// For the slide of navbar
menu.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("navshow");
});

function toggleLoginForm() {
  document.querySelector(".login").classList.toggle("wrapper");
}

// For the login form

closeLogin.addEventListener("click", () => {
  toggleLoginForm();
});

signInBtn.addEventListener("click", () => {
  toggleLoginForm();
});

// Contact form
function sendMail() {
  var params = {
    fromName: document.getElementById("fullname").value,
    emailId: document.getElementById("email_id").value,
    message: document.getElementById("message").value,
  };

  const value = document.getElementById("email_id").value;
  if (value.indexOf("@") === -1) {
    alert("Please enter a valid email");
    return;
  } else {
    emailjs
      .send("service_vtkbahe", "template_47nej3m", params)
      .then(function (res) {
        console.log("EmailJS Response:", res);
        const emailsubmission = ` <p class="email_matching heading">Your email has been submitted</p>`;
        document
          .querySelector(".login-form")
          .insertAdjacentHTML("afterbegin", emailsubmission);
      })
      .catch(function (error) {
        console.error("EmailJS Error:", error);
        alert("Error sending email. Please try again.");
      });
    document.getElementById("fullname").value = "";
    document.getElementById("email_id").value = "";
    document.getElementById("message").value = "";
  }
}

// For making add to cart functionality
$(document).ready(function () {
  $(".wishlist-btn").click(function () {
    var productName = $(this).siblings(".productname").text();
    var productPrice = $(this).siblings(".para").text();
    var productImg = $(this).siblings(".productimg").attr("src");

    console.log(
      "Product added to wishlist",
      productName,
      productPrice,
      productImg
    );

    // Add the product to the cart
    addToCart(productName, productPrice, productImg);
  });
});

// Function to add a product to the cart
function addToCart(name, price, imgSrc) {
  // Check if the cart is currently empty
  if ($(".empty-para").is(":visible")) {
    $(".empty-para").hide(); // Hide the empty cart message
    $(".cart-grid").removeClass("hidden"); // Show the cart grid
    $(".totalprice").removeClass("hidden");
    $(".checkoutbtn").removeClass("hidden"); // Show the checkout button
  }

  const existingCartItem = $(".cart-flex").filter(function () {
    return (
      $(this).find(".small-heading").text() === name &&
      $(this).find(".description_para").text() === price
    );
  });

  if (existingCartItem.length > 0) {
    const quantityInput = existingCartItem.find(".quantity-input");
    const currentQuantity = parseInt(quantityInput.val());
    const newQuantity = currentQuantity + 1;
    if (newQuantity > 10) {
      alert("quantity should not exceed 10");
      return;
    }
    quantityInput.val(newQuantity);
  } else {
    // Create a new cart item
    var cartItem = `
 <div class="cart-flex" >
   <div>
     <img src="${imgSrc}" alt="${name}" />
   </div>
   <div class="cart-info">
     <h2 class="small-heading">${name}</h2>
     <p class="description_para">${price}</p>
     <input type="number" min="1" max="10" aria-label="Update quantity" title="Update quantity" class="quantity-input" value="1" />

     <i class="fa-solid fa-trash removebtn" aria-label="Removing-button" title="Remove item"></i>
   </div>
 </div>
`;

    // Append the cart item to the cart grid
    $(".cart-grid").append(cartItem);
  }

  // Update the total price
  updateTotalPrice();

  // Store cart into local storage
  saveCartToLocalStorage();
}

// Event listener for input change on quantity input fields
$(document).on("input", ".quantity-input", function () {
  updateTotalPrice();
  const inputValue = $(this).val();
  if (!inputValue || isNaN(inputValue) || inputValue <= 0) {
    $(this).val(1);
  }
  // Update the total price
  updateTotalPrice();

  if (inputValue > 10) {
    alert("Quantity should not exceed 10!");
    $(this).val(1);
    // You can replace the alert with your custom pop-up or other actions
    updateTotalPrice();
  }
  saveCartToLocalStorage();
});

// Update the total price
updateTotalPrice();

// Function to update the total price
function updateTotalPrice() {
  var total = 0;
  let totalQuantity = 0;

  // Iterate over each cart item
  $(".cart-flex").each(function () {
    var quantity = parseFloat($(this).find(".quantity-input").val());
    var price = parseFloat(
      $(this).find(".description_para").text().replace("£", "")
    );
    totalQuantity += quantity;
    total += quantity * price;
    $(".cart-btns span").text(totalQuantity);
  });

  $(".totalprice div:last-child").text(`£ ${total}`);

  if (total === 0) {
    $(".totalprice").addClass("hidden");
    $(".checkoutbtn").addClass("hidden");
    $(".empty-para").show();
    $(".cart-grid").addClass("hidden");
    $(".cart-btns span").text(0);
  } else {
    $(".totalprice").removeClass("hidden");
    $(".checkoutbtn").removeClass("hidden");
    $(".empty-para").hide();
    $(".cart-grid").removeClass("hidden");
  }
}

// Event listener for remove button click
$(document).on("click", ".removebtn", function () {
  const cartItem = $(this).closest(".cart-flex");
  const removedPrice = parseFloat(
    cartItem.find(".description_para").text().replace("£", "")
  );

  // Remove the cart item
  cartItem.remove();

  // Update the total price
  updateTotalPrice();

  saveCartToLocalStorage();
});

// Function to save cart items to local storage
function saveCartToLocalStorage() {
  const cartItems = [];

  $(".cart-flex").each(function () {
    const name = $(this).find(".small-heading").text();
    const price = $(this).find(".description_para").text();
    const imgSrc = $(this).find("img").attr("src");
    const quantity = $(this).find(".quantity-input").val();

    const cartItem = { name, price, imgSrc, quantity };
    cartItems.push(cartItem);
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to load cart items from local storage
function loadCartFromLocalStorage() {
  const storedCartItems = localStorage.getItem("cartItems");

  if (storedCartItems) {
    const cartItems = JSON.parse(storedCartItems);

    cartItems.forEach((item) => {
      addToCart(item.name, item.price, item.imgSrc);
      const quantityInput = $(".cart-flex").last().find(".quantity-input");
      quantityInput.val(item.quantity);
    });

    // Update total price after loading items
    updateTotalPrice();
  }
}

// transfer the cart data from javascript to database
$(".checkoutbtn").click(function () {
  var cartItems = [];
  $(".cart-flex").each(function () {
    var itemName = $(this).find(".small-heading").text();

    var itemPricetext = $(this).find(".description_para").text();
    var itemPrice = parseFloat(itemPricetext.match(/\d+(\.\d+)?/)[0]);

    var itemImg = $(this).find("img").attr("src");

    var itemQuantity = $(this).find(".quantity-input").val();
    var totalPrice = itemPrice * parseInt(itemQuantity);
    var cartItem = {
      name: itemName,
      price: totalPrice,
      imgSrc: itemImg,
      quantity: itemQuantity,
    };

    cartItems.push(cartItem);
  });
  console.log(cartItems);
  $.ajax({
    type: "POST",
    url: "/checkout",
    contentType: "application/json; charset=utf-8",

    data: JSON.stringify({ cartItems: cartItems }),
    success: function (response) {
      // alert(response.message);
      window.location.href = "/profile";
    },
    error: function (error) {
      console.error("Error updating cart:", error);
    },
  });
});

document.querySelectorAll(".update-btn-profile").forEach(function (btn) {
  btn.addEventListener("click", function () {
    cartMain.classList.add("wrapper");
  });
});

// remove the data from the database
$(document).on("click", ".removedatabasebtn", function () {
  const cartItem = $(this).closest(".item");

  // Create an object representing the item to be removed
  const itemName = cartItem.find(".productname").text();
  const itemToRemove = {
    name: itemName,
  };

  // Send AJAX request to remove the item from the database
  $.ajax({
    type: "POST",
    url: "/remove_item",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({ itemToRemove: itemToRemove }),
    success: function () {
      // Remove the item from the UI
      cartItem.remove();
    },
    error: function (error) {
      console.error("Error removing item:", error);
    },
  });
});

// Load cart items from local storage on page load
$(document).ready(function () {
  loadCartFromLocalStorage();
  updateTotalPrice();
});

// Confirming password for signup
const password = document.querySelectorAll("password"),
  confirm_password = document.querySelectorAll("confirm_password");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity("");
  }
}

$(document).ready(function () {
  $("#logoutBtn").click(function () {
    $("#logoutForm").submit();
  });
});

// Delete profile from the database
function confirmDeleteProfile() {
  const confirmDelete = confirm("Are you sure you want to delete?");
  if (confirmDelete) {
    document.querySelector(".form").submit();
  }
}

// Toggle login

if (user) {
  user.forEach((userbtns) => {
    userbtns.addEventListener("click", () => {
      toggleLoginForm();
    });
  });
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
