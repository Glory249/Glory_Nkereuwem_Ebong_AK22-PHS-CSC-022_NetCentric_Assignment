const SUPABASE_URL = "https://ffhiixfzovfqsxhtydxk.supabase.co";
const SUPABASE_KEY = "sb_publishable_n5m_FoyO7NbijxFmhYwAqA_0Tpd17Pd";

const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const customer = {

        fullname: document.getElementById("fullname").value,

        email: document.getElementById("email").value,

        subject: document.getElementById("subject").value,

        message: document.getElementById("message").value

    };

    try {

        const response = await fetch(

            `${SUPABASE_URL}/rest/v1/contacts`,

            {

                method: "POST",

                headers: {

                    apikey: SUPABASE_KEY,

                    Authorization: `Bearer ${SUPABASE_KEY}`,

                    "Content-Type": "application/json",

                    Prefer: "return=representation"

                },

                body: JSON.stringify(customer)

            }

        );

        if (!response.ok) {

            console.log(await response.text());

            alert("Unable to send message.");

            return;

        }

        alert("Message sent successfully!");

        form.reset();

    }

    catch (error) {

        console.log(error);

        alert("Network Error.");

    }

});