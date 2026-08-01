// =========================================
// SUPABASE CONFIGURATION
// =========================================

const SUPABASE_URL = "https://ffhiixfzovfqsxhtydxk.supabase.co";
const SUPABASE_KEY = "sb_publishable_n5m_FoyO7NbijxFmhYwAqA_0Tpd17Pd";

const form = document.getElementById("reviewForm");
const reviewsContainer = document.getElementById("reviewsContainer");

// Load reviews when page opens
window.onload = loadReviews;

// =========================================
// SUBMIT REVIEW
// =========================================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const review = {

        name: document.getElementById("name").value,
        department: document.getElementById("department").value || "N/A",
        rating: document.getElementById("rating").value,
        message: document.getElementById("review").value

    };

    try {

        const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {

            method: "POST",

            headers: {

                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json",
                "Prefer": "return=representation"

            },

            body: JSON.stringify(review)

        });

        if (!response.ok) {

            console.log(await response.text());
            alert("Unable to submit review.");
            return;

        }

        alert("Review submitted successfully!");

        form.reset();

        loadReviews();

    }

    catch (error) {

        console.error(error);

        alert("Network Error");

    }

});

// =========================================
// LOAD REVIEWS
// =========================================

async function loadReviews() {

    try {

        const response = await fetch(

            `${SUPABASE_URL}/rest/v1/reviews?select=*&order=created_at.desc`,

            {

                headers: {

                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`

                }

            }

        );

        if (!response.ok) {

            console.log(await response.text());
            return;

        }

        const reviews = await response.json();

        displayReviews(reviews);

    }

    catch (error) {

        console.error(error);

    }

}

// =========================================
// DISPLAY REVIEWS
// =========================================

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

            <h3>${item.name}</h3>

            <p><strong>Department:</strong> ${item.department}</p>

            <p><strong>Rating:</strong> ${item.rating}</p>

            <p>${item.message}</p>

            <span>${new Date(item.created_at).toLocaleString()}</span>

        </div>

        `;

    });

}


async function deleteReview(id) {

    if (!confirm("Delete this review?")) return;

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/reviews?id=eq.${id}`,
        {
            method: "DELETE",
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`
            }
        }
    );

    if (response.ok) {
        loadReviews();
    } else {
        alert("Unable to delete review.");
    }
}