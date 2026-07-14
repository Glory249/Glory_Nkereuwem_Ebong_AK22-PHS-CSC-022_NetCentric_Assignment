const form = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");

// Load reviews from Local Storage
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

// Show reviews immediately
displayReviews();


// ===============================
// Submit Review
// ===============================
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const review = {

        name: document.getElementById("name").value,

        department: document.getElementById("department").value || "N/A",

        rating: document.getElementById("rating").value,

        message: document.getElementById("review").value,

        date: new Date().toLocaleString(),

        replies: []

    };

    // Add newest review first
    reviews.unshift(review);

    saveReviews();

    form.reset();

    alert("Review submitted successfully!");

});


// ===============================
// Display Reviews
// ===============================
function displayReviews() {

    reviewsContainer.innerHTML = "";

    if (reviews.length === 0) {

        reviewsContainer.innerHTML = `
            <p style="text-align:center;">
                No reviews yet.
            </p>
        `;

        return;

    }

    reviews.forEach(function (item, index) {

        let replyHTML = "";

        if (item.replies && item.replies.length > 0) {

            item.replies.forEach(function (reply) {

                replyHTML += `
                <div class="reply-box">

                    <strong>Reply:</strong><br>

                    ${reply}

                </div>
                `;

            });

        }

        reviewsContainer.innerHTML += `

        <div class="review-card">

            <div class="review-header">

                <h3>${item.name}</h3>

                <div class="menu">

                    <button
                        class="menu-btn"
                        onclick="toggleMenu(${index})">

                        &#8942;

                    </button>

                    <div
                        class="menu-content"
                        id="menu-${index}">

                        <button onclick="replyReview(${index})">

                            Reply

                        </button>

                        <button onclick="deleteReview(${index})">

                            Delete

                        </button>

                    </div>

                </div>

            </div>

            <p><strong>Department:</strong> ${item.department}</p>

            <p><strong>Rating:</strong> ${item.rating}</p>

            <p>${item.message}</p>

            <span>${item.date}</span>

            ${replyHTML}

        </div>

        `;

    });

}


// ===============================
// Reply Review
// ===============================
function replyReview(index) {

    const reply = prompt("Enter your reply:");

    if (reply === null || reply.trim() === "") {

        return;

    }

    reviews[index].replies.push(reply);

    saveReviews();

}


// ===============================
// Delete Review
// ===============================
function deleteReview(index) {

    const answer = confirm("Delete this review?");

    if (!answer) return;

    reviews.splice(index, 1);

    saveReviews();

}


// ===============================
// Toggle Menu
// ===============================
function toggleMenu(index) {

    const allMenus = document.querySelectorAll(".menu-content");

    allMenus.forEach(function (menu) {

        if (menu.id !== "menu-" + index) {

            menu.style.display = "none";

        }

    });

    const currentMenu = document.getElementById("menu-" + index);

    if (currentMenu.style.display === "block") {

        currentMenu.style.display = "none";

    } else {

        currentMenu.style.display = "block";

    }

}


// ===============================
// Close Menu When Clicking Outside
// ===============================
document.addEventListener("click", function (e) {

    if (!e.target.closest(".menu")) {

        document.querySelectorAll(".menu-content").forEach(function (menu) {

            menu.style.display = "none";

        });

    }

});


// ===============================
// Save Reviews
// ===============================
function saveReviews() {

    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayReviews();

}