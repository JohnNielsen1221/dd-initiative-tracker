var queryURL2 = 'https://www.uzby.com/api.php?min=4&max=9';



function options 
    method: 'GET',
    mode: 'no-cors'


function getRandomName() {
    axios.get(queryURL2)
        .then(function (response) {
            var setRandomName = document.getElementById('random-name');
        })
}
function setRandomName() {
document.getElementById('random-name').innerText = getRandomName();
}

document.getElementById('generate')
    .addEventListener('click', setRandomName);