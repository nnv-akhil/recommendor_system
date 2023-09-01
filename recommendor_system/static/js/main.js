let json_data;
const data = {
    like: new Set(),
    add_to_cart: new Set(),
    buy_now: new Set(),
    save_for_later: new Set(),
    view: new Set()
};
let userId;

function updateSpecialDivContent(product) {
    const specialDiv = document.querySelector(".special.product");
    const specialButtons = specialDiv.querySelectorAll(".bt");

    specialDiv.querySelector("img").src = product.image_link;
    specialDiv.querySelector("h1").textContent = product.name;
    specialDiv.querySelector("p").textContent = product.price;
    specialDiv.style.display = "block";

    specialButtons.forEach(button => {
        button.style.display = "block"; // Show special div buttons
    });
}

function attachClickEvent(productDivs) {
    productDivs.forEach((productDiv, index) => {
        const product = json_data[index];
        productDiv.querySelector("img").src = product.image_link;
        productDiv.querySelector("h1").textContent = product.name;
        productDiv.querySelector("p").textContent = product.price;

        productDiv.addEventListener("click", () => {
            updateSpecialDivContent(product);
            userId = product.prod_id; // Replace with the actual user ID
            console.log(userId);
            data["view"].add(userId); // Add the user ID to the set
            // console.log(data); 
            // Print the updated data object
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const getRecommendationBtn = document.getElementById("getRecommendationBtn");
    const productDivs = document.querySelectorAll(".pro");

    // Hide the product divs initially
    productDivs.forEach(productDiv => {
        productDiv.style.display = "none";
    });

    getRecommendationBtn.addEventListener("click", function () {
        // Hide the "Get Recommendation" button
        getRecommendationBtn.style.display = "none";

        // Show the product divs
        productDivs.forEach(productDiv => {
            productDiv.style.display = "block";
        });

        // Make the AJAX request and handle response
        var formData = new FormData();
        // formData.append('q', value);
        $.ajax({
            url: "/recommend", // Replace with your Flask backend endpoint
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                json_data = response;
                attachClickEvent(productDivs);
            },
            error: function (error) {
                console.error(error);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const closeButton = document.querySelector(".close-btn");

    closeButton.addEventListener("click", function() {

        console.log(data);
        for (const key in data) {
            if (data.hasOwnProperty(key) && data[key] instanceof Set) {
                data[key] = Array.from(data[key]);
            }
        }
        $.ajax({
            url: "/update", // Replace with your server update route
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(response) {
                // Handle the response from the server
                console.log("Server response:", response);

                // AJAX request to fetch content of get_sub route
                // $.ajax({
                //     url: "/get_sub", // Replace with your server get_sub route
                //     type: "GET",
                //     success: function(subResponse) {
                //         // Handle the content of get_sub route
                //         console.log("get_sub content:", subResponse);

                //         // Update your page content using subResponse
                //         // For example, if you have a <div> with id "subContent"
                //         document.getElementById("subContent").innerHTML = subResponse;
                //     },
                //     error: function(subError) {
                //         console.error("Error fetching get_sub content:", subError);
                //     }
                // });
            },
            error: function(error) {
                console.error("Error updating data:", error);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".bt");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const buttonClass = button.classList[0]; // Get the first class from the button

            if (data.hasOwnProperty(buttonClass)) {
                data[buttonClass].add(userId); // Add the user ID to the set
                // console.log(data); // Print the updated data object
            }
        });
    });
});
