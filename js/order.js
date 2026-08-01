const SUPABASE_URL = "https://ffhiixfzovfqsxhtydxk.supabase.co";
const SUPABASE_KEY = "sb_publishable_n5m_FoyO7NbijxFmhYwAqA_0Tpd17Pd";

const form = document.getElementById("orderForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const order = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        state: document.getElementById("state").value,
        city: document.getElementById("city").value,
        product: document.getElementById("product").value,
        quantity: parseInt(document.getElementById("quantity").value),
        amount: document.getElementById("amount").value,
        payment_reference: document.getElementById("payment_reference").value
    };

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/orders`,
        {
            method: "POST",
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal"
            },
            body: JSON.stringify(order)
        }
    );

    if (response.ok) {

        alert("Order placed successfully!");

        form.reset();

    } else {

        alert("Unable to place order.");

        console.log(await response.text());

    }

});