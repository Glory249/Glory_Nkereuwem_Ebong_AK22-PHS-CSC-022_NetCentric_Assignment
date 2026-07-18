// ===============================
// SUPABASE CONFIG
// ===============================

const SUPABASE_URL = "https://zvnqbpaoivytqqptnyoh.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_qyKx7MHXL4R-aJTtj2dpoA_1PpbEpr0";

// ===============================

const form = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");


// Load reviews immediately
loadReviews();


// ===============================
// Submit Review
// ===============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const review = {

        name: document.getElementById("name").value,

        department:
            document.getElementById("department").value || "N/A",

        rating: document.getElementById("rating").value,

        message: document.getElementById("review").value,

        date: new Date().toLocaleString()

    };

    const response = await fetch(

        `${SUPABASE_URL}/rest/v1/reviews`,

        {

            method: "POST",

            headers: {

                apikey: SUPABASE_KEY,

                Authorization: `Bearer ${SUPABASE_KEY}`,

                "Content-Type": "application/json",

                Prefer: "return=representation"

            },

            body: JSON.stringify(review)

        }

    );

    if (response.ok) {

        form.reset();

        alert("Review submitted successfully!");

        loadReviews();

    } else {

        alert("Unable to submit review.");

    }

});



// ===============================
// LOAD REVIEWS
// ===============================

async function loadReviews() {

    const response = await fetch(

        `${SUPABASE_URL}/rest/v1/reviews?select=*&order=id.desc`,

        {

            headers: {

                apikey: SUPABASE_KEY,

                Authorization: `Bearer ${SUPABASE_KEY}`

            }

        }

    );

    const reviews = await response.json();

    displayReviews(reviews);

}



// ===============================
// DISPLAY REVIEWS
// ===============================

function displayReviews(reviews) {

    reviewsContainer.innerHTML = "";

    if (reviews.length === 0) {

        reviewsContainer.innerHTML =

            "<p style='text-align:center;'>No reviews yet.</p>";

        return;

    }

    reviews.forEach(function (item) {

        reviewsContainer.innerHTML += `

        <div class="review-card">

            <div class="review-header">

                <h3>${item.name}</h3>

                <div class="menu">

                    <button
                    class="menu-btn"
                    onclick="toggleMenu(${item.id})">

                    &#8942;

                    </button>

                    <div
                    class="menu-content"
                    id="menu-${item.id}">

                        <button
                        onclick="replyReview(${item.id})">

                        Reply

                        </button>

                        <button
                        onclick="deleteReview(${item.id})">

                        Delete

                        </button>

                    </div>

                </div>

            </div>

            <p><strong>Department:</strong> ${item.department}</p>

            <p><strong>Rating:</strong> ${item.rating}</p>

            <p>${item.message}</p>

            <span>${item.date}</span>

        </div>

        `;

    });

}



// ===============================
// DELETE REVIEW
// ===============================

async function deleteReview(id) {

    if (!confirm("Delete this review?")) return;

    await fetch(

        `${SUPABASE_URL}/rest/v1/reviews?id=eq.${id}`,

        {

            method: "DELETE",

            headers: {

                apikey: SUPABASE_KEY,

                Authorization: `Bearer ${SUPABASE_KEY}`

            }

        }

    );

    loadReviews();

}



// ===============================
// REPLY REVIEW
// ===============================

async function replyReview(id) {

    const reply = prompt("Enter your reply");

    if (!reply) return;

    await fetch(

        `${SUPABASE_URL}/rest/v1/replies`,

        {

            method: "POST",

            headers: {

                apikey: SUPABASE_KEY,

                Authorization: `Bearer ${SUPABASE_KEY}`,

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                review_id: id,

                reply: reply

            })

        }

    );

    alert("Reply added.");

}



// ===============================
// MENU
// ===============================

function toggleMenu(id) {

    document.querySelectorAll(".menu-content").forEach(function (menu) {

        if (menu.id !== "menu-" + id) {

            menu.style.display = "none";

        }

    });

    const menu = document.getElementById("menu-" + id);

    if (menu.style.display === "block") {

        menu.style.display = "none";

    }

    else {

        menu.style.display = "block";

    }

}



// ===============================
// CLOSE MENU
// ===============================

document.addEventListener("click", function (e) {

    if (!e.target.closest(".menu")) {

        document.querySelectorAll(".menu-content").forEach(function (menu) {

            menu.style.display = "none";

        });

    }

});



// ===============================
// MOBILE MENU
// ===============================

function toggleNavMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("show");

}