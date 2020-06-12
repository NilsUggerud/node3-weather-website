const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const search = document.querySelector('input');



weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const location = search.value;
    const url = "http://localhost:3000/weather?address=" + location;
    messageTwo.textContent = 'Loading data...';
    messageOne.textContent = '';
    getForecast(url);
})

function getForecast(url){
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if (data.err){
               messageTwo.textContent = data.err;
                
            } else {
                messageOne.textContent = data.address;
                messageTwo.textContent = data.forecast;
            }
        })
    })
}

