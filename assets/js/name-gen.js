var queryURL2 = 'https://www.uzby.com/api.php?min=4&max=9';
var proxyurl= "https://cors-anywhere.herokuapp.com/";




function getRandomName() {
    axios.get(proxyurl + queryURL2)
        .then(function (_response) {
            var setRandomName = document.getElementById('random-name');
            
            console.log(setRandomName);
        
          
        })
}
function setRandomName() {
document.getElementById('random-name').innerText = getRandomName();
}

document.getElementById('generate')
    .addEventListener('click', getRandomName);