var queryURL2 = 'https://www.uzby.com/api.php?min=4&max=9';
var proxyurl = "https://cors-anywhere.herokuapp.com/";
var setRandomName = document.getElementById('random-name');
var generateName = document.getElementById('generate');


    generateName.addEventListener('click', function() {
        var getName = getRandomName.value;
        getRandomName(getName); 
    });


function getRandomName() {
    axios.get(proxyurl + queryURL2)
        .then(function (response) {
            var setRandomName = document.getElementById('random-name');
        })
};
console.log(getRandomName);

function setRandomName() {
    document.getElementById('random-name').innerText = getRandomName();
};

