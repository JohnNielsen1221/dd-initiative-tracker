var queryURL2 = 'https://www.uzby.com/api.php?min=4&max=9';






function getRandomName() {
    axios.get(queryURL2)
        .then(function (_response) {
            var setRandomName = document.getElementById('random-name');
            
            return(getRandomName)
        M.Tooltip.init(setRandomName);   
        })
}
function setRandomName() {
document.getElementById('random-name').innerText = getRandomName();
}

document.getElementById('generate')
    .addEventListener('click', setRandomName);