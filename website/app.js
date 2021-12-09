/* Global Variables */
const apiZipURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=920bb21d314b406a5d181848b9f28d1d&units=metric';

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');
const generate = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event Listener
generate.addEventListener('click',()=>{
    const newZip = document.querySelector('#zip').value;
    const feelings = document.querySelector('#feelings').value;

    getWeatherByZipCode(apiZipURL, newZip, apiKey)
    .then((data) => {
            // add the data to post route
            postData('/add', {
                date: newDate,
                temp: data.main.temp,
                content: feelings
            });
            // push the data to the User interface
            updateUI();
        })
});

// Async Get request to api by zip code
const getWeatherByZipCode = async (apiZipURL, zip, apiKey) => {
    const response = await fetch (apiZipURL + zip + apiKey)
    try {
        // transorm data to json
        const data = await response.json();
        return data;
    }
    catch(error) {
        console.log('error', error);
    }
};

// Async Post request
const postData = async (url='', data={})=>{
    const response = await fetch (url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
        },
        // tranform the data to strings
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        // print the data to vertify successful procces
        console.log("Data posted successfully\n",newData);
        return newData;
    }
    catch(error) {
        console.log('error', error);
    }
}
