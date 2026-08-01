const orderTable = document.getElementById("orderTable");
const orderCount = document.getElementById("orderCount");

loadOrders();


const SUPABASE_URL = "https://ffhiixfzovfqsxhtydxk.supabase.co";
const SUPABASE_KEY = "sb_publishable_n5m_FoyO7NbijxFmhYwAqA_0Tpd17Pd";

// ===============================

const reviewTable = document.getElementById("reviewTable");
const contactTable = document.getElementById("contactTable");
const conversionTable = document.getElementById("conversionTable");

const reviewCount = document.getElementById("reviewCount");
const contactCount = document.getElementById("contactCount");
const conversionCount = document.getElementById("conversionCount");

const search = document.getElementById("search");

let contacts = [];

loadReviews();
loadContacts();
loadConversions();

// ===============================
// LOAD REVIEWS
// ===============================

async function loadReviews(){

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/reviews?select=*`,
        {
            headers:{
                apikey:SUPABASE_KEY,
                Authorization:`Bearer ${SUPABASE_KEY}`
            }
        }
    );

    const reviews = await response.json();

    reviewCount.textContent = reviews.length;

    reviewTable.innerHTML="";

    reviews.forEach(item=>{

        reviewTable.innerHTML+=`

        <tr>

        <td>${item.name}</td>

        <td>${item.department}</td>

        <td>${item.rating}</td>

        <td>${item.message}</td>

        </tr>

        `;

    });

}

// ===============================
// LOAD CONTACTS
// ===============================

async function loadContacts(){

    const response = await fetch(

        `${SUPABASE_URL}/rest/v1/contacts?select=*`,

        {

            headers:{

                apikey:SUPABASE_KEY,

                Authorization:`Bearer ${SUPABASE_KEY}`

            }

        }

    );

    contacts = await response.json();

    contactCount.textContent = contacts.length;

    displayContacts(contacts);

}

// ===============================
// DISPLAY CONTACTS
// ===============================

function displayContacts(data){

    contactTable.innerHTML="";

    data.forEach(item=>{

        contactTable.innerHTML+=`

        <tr>

        <td>${item.fullname}</td>

        <td>${item.email}</td>

        <td>${item.subject}</td>

        <td>${item.message}</td>

        </tr>

        `;

    });

}

// ===============================
// SEARCH
// ===============================

search.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const filtered=contacts.filter(item=>

        item.fullname.toLowerCase().includes(value) ||

        item.email.toLowerCase().includes(value)

    );

    displayContacts(filtered);

});

// ===============================
// LOAD CONVERSIONS
// ===============================

async function loadConversions(){

    const response = await fetch(

        `${SUPABASE_URL}/rest/v1/conversions?select=*`,

        {

            headers:{

                apikey:SUPABASE_KEY,

                Authorization:`Bearer ${SUPABASE_KEY}`

            }

        }

    );

    const conversions = await response.json();

    conversionCount.textContent = conversions.length;

    conversionTable.innerHTML="";

    conversions.forEach(item=>{

        conversionTable.innerHTML+=`

        <tr>

        <td>${item.conversion_type}</td>

        <td>${item.input_value}</td>

        <td>${item.result}</td>

        </tr>

        `;

    });



async function loadOrders() {

    try {

        const response = await fetch(

            `${SUPABASE_URL}/rest/v1/orders?select=*&order=id.desc`,

            {

                headers: {

                    apikey: SUPABASE_KEY,

                    Authorization: `Bearer ${SUPABASE_KEY}`

                }

            }

        );

        if (!response.ok) {

            console.log(await response.text());

            return;

        }

        const orders = await response.json();

        orderCount.textContent = orders.length;

        orderTable.innerHTML = "";

        orders.forEach(order => {

            orderTable.innerHTML += `

            <tr>

                <td>${order.fullname}</td>

                <td>${order.product}</td>

                <td>${order.quantity}</td>

                <td>${order.amount}</td>

                <td>${order.phone}</td>

                <td>${order.payment_reference}</td>

            </tr>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}



}