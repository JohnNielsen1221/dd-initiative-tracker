var queryURL2 = 'https://www.uzby.com/api.php?min=4&max=9';
var proxyurl = "https://cors-anywhere.herokuapp.com/";

var generateName = document.getElementById('generate');


    

    
    generateName.addEventListener('click', function() {
        var getName = getRandomName.value;
        setRandomName(getName); 
    });

    fetch(proxyurl + queryURL2)
    .then(function (response) {
        response.queryURL2;
        var setRandomName = document.getElementById('random-name');
        var newName = response.queryURL2;
        
console.log(newName);
    });



function setRandomName() {
    document.getElementById('random-name').innerText = getRandomName();
};


    