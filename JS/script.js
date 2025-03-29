function viewProduct(productId) {
    // Store product ID in localStorage
    localStorage.setItem("selectedProduct", productId);
    // Redirect to product details page
    window.location.href = "product.html";
}

const products = {
    1: {
        name: "Handcrafted Sunflower",
        price: "₹349",
        description: "Beautiful handmade cotton sunflower decoration.",
        image: "img/product1.webp",
        rating: "⭐ 4.8/5",
        reviews: "150 reviews"
    },
    2: {
        name: "Elegant Rose",
        price: "₹499",
        description: "Elegant handcrafted rose for your decor.",
        image: "img/product2.webp",
        rating: "⭐ 4.7/5",
        reviews: "120 reviews"
    },
    3: {
        name: "Decorative Lily",
        price: "₹599",
        description: "Handmade lily to enhance your home decor.",
        image: "img/product3.webp",
        rating: "⭐ 4.9/5",
        reviews: "180 reviews"
    },
    4: {
        name: "Decorative Lily",
        price: "₹599",
        description: "Handmade lily to enhance your home decor.",
        image: "img/product4.jpeg",
        rating: "⭐ 4.9/5",
        reviews: "180 reviews"
    },
    5: {
        name: "Decorative Lily",
        price: "₹599",
        description: "Handmade lily to enhance your home decor.",
        image: "img/product5.webp",
        rating: "⭐ 4.9/5",
        reviews: "180 reviews"
    },
    6: {
        name: "Decorative Lily",
        price: "₹599",
        description: "Handmade lily to enhance your home decor.",
        image: "img/product5.webp",
        rating: "⭐ 4.9/5",
        reviews: "180 reviews"
    },
    7: {
        name: "Decorative Lily",
        price: "₹599",
        description: "Handmade lily to enhance your home decor.",
        image: "img/product5.webp",
        rating: "⭐ 4.9/5",
        reviews: "180 reviews"
    },
    8: {
        name: "Decorative Lily",
        price: "₹599",
        description: "Handmade lily to enhance your home decor.",
        image: "img/product5.webp",
        rating: "⭐ 4.9/5",
        reviews: "180 reviews"
    },
    9: {
        name: "Decorative Lily",
        price: "₹599",
        description: "Handmade lily to enhance your home decor.",
        image: "img/product5.webp",
        rating: "⭐ 4.9/5",
        reviews: "180 reviews"
    },
    10: {
        name: "Decorative Champa",
        price: "₹599",
        description: "Handmade lily to enhance your home decor.",
        image: "img/product5.webp",
        rating: "⭐ 4.9/5",
        reviews: "180 reviews"
    },
    16: {
        name: "T-shirt",
        price: "₹149",
        description: "Cotton T-shirt",
        image: "img/tshirt.jpg",
        rating: "⭐ 4.1/5",
        reviews: "61 reviews"
    },
    21: {
        name: "Beaded Necklace",
        price: "₹599",
        description: "A colorful bead necklace with a pendant",
        image: "img/necklace1.jpg",
        rating: "⭐ 4.1/5",
        reviews: "72 reviews"
    }
};

const productImage = document.getElementById("product-image");
const zoomLens = document.getElementById("zoom-lens");

productImage.addEventListener("mousemove", function (event) {
    zoomLens.style.display = "block";

    let x = event.pageX - productImage.offsetLeft;
    let y = event.pageY - productImage.offsetTop;

    zoomLens.style.left = `${x - 50}px`; /* Adjust positioning */
    zoomLens.style.top = `${y - 50}px`;
});

productImage.addEventListener("mouseleave", function () {
    zoomLens.style.display = "none";
});

// Load product details
window.onload = function () {
    const productId = localStorage.getItem("selectedProduct");
    if (productId && products[productId]) {
        document.getElementById("product-image").src = products[productId].image;
        document.getElementById("product-name").textContent = products[productId].name;
        document.getElementById("product-price").textContent = "Price: " + products[productId].price;
        document.getElementById("product-description").textContent = products[productId].description;
        document.getElementById("product-rating").textContent = "Rating: " + products[productId].rating;
        document.getElementById("product-reviews").textContent = "Reviews: " + products[productId].reviews;
    }
};

// Functions for buttons
function addToCart() {
    alert("Item added to cart!");
}

function buyNow() {
    alert("Proceeding to checkout!");
}

const customizeButton = document.getElementById('customizeButton');
const colorOptions = document.getElementById('colorOptions');
const colorButtons = document.querySelectorAll('.color-button');
const selectedColorDiv = document.getElementById('selectedColor');
const colorName = document.getElementById('colorName');

// Show color options when 'Customize Product' is clicked
customizeButton.addEventListener('click', () => {
    colorOptions.classList.toggle('hidden');
});

// Handle color button clicks
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedColor = button.getAttribute('data-color');
        colorName.textContent = selectedColor;
        selectedColorDiv.classList.remove('hidden');
    });
});