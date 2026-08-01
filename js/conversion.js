const SUPABASE_URL = "https://ffhiixfzovfqsxhtydxk.supabase.co";

const SUPABASE_KEY = "sb_publishable_n5m_FoyO7NbijxFmhYwAqA_0Tpd17Pd";

const form = document.getElementById("convertForm");

const history = document.getElementById("history");

loadHistory();

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;

    const type = document.getElementById("type").value;

    const value = parseFloat(document.getElementById("value").value);

    let result;
    let displayResult;

    if (type === "CM → M") {

        result = value / 100;

        displayResult = `${value} cm = ${result} m`;

    }

    else if (type === "KM → M") {

        result = value * 1000;

        displayResult = `${value} km = ${result} m`;

    }

    else {

        result = value * 1000;

        displayResult = `${value} kg = ${result} g`;

    }

    const response = await fetch(

        `${SUPABASE_URL}/rest/v1/conversions`,

        {

            method: "POST",

            headers: {

                apikey: SUPABASE_KEY,

                Authorization: `Bearer ${SUPABASE_KEY}`,

                "Content-Type": "application/json",

                Prefer: "return=representation"

            },

            body: JSON.stringify({

                name: name,

                conversion_type: type,

                input_value: value,

                result: displayResult

            })

        }

    );

    if (response.ok) {

        alert("Conversion saved successfully.");

        form.reset();

        loadHistory();

    }

    else {

        console.log(await response.text());

        alert("Unable to save.");

    }

});

async function loadHistory() {

    const response = await fetch(

        `${SUPABASE_URL}/rest/v1/conversions?select=*&order=id.desc`,

        {

            headers: {

                apikey: SUPABASE_KEY,

                Authorization: `Bearer ${SUPABASE_KEY}`

            }

        }

    );

    const data = await response.json();

    history.innerHTML = "";

    if (data.length === 0) {

        history.innerHTML = "<p style='text-align:center'>No conversion history yet.</p>";

        return;

    }

    data.forEach(function (item) {

        history.innerHTML += `

        <div class="history-card">

            <h3>${item.name}</h3>

            <p><strong>${item.conversion_type}</strong></p>

            <p>${item.result}</p>

            <div class="date">

                ${new Date(item.created_at).toLocaleString()}

            </div>

        </div>

        `;

    });

}