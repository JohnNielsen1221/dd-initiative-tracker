var queryURL2 = 'https://www.uzby.com/api.php?min=3&max=8';
var nameEl = document.getElementById('nameBtn');
var nameRand = JSON.parse(localStorage.getitem('names');

nameEl.addEventListener('click', function () {
    var nameGen = queryURL2.value;
    nameRand.fetch(queryURL2);
    localStorage.setItem('randomName', JSON.stringify(nameGen));
})

function randomName () {
    axios.get(queryURL2)
        .then(response => {
            console.log(response.data);
        }) 

        }
        