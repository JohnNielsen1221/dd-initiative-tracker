var queryURL2 = 'https://www.uzby.com/api.php?min=3&max=8';
var nameEl = document.getElementById('nameBtn');
var nameRand = JSON.parse(localStorage.getitem('names');

nameEl.addEventListener('click', function () {
    var nameGen = queryURL2.value;
    nameRand.fetch(queryURL2);
    localStorage.setItem('randomName', JSON.stringify(nameGen));
})

$(function(){
	var minlen = $("#minlen").text(),
		maxlen = $("#maxlen").text();
		$("#min").val(minlen);
		$("#max").val(maxlen);
	$("#slider-range").slider({
		range: true,
		min: 2,
		max: 40,
		values: [minlen, maxlen],
		step: 1,
		slide: function(event, ui){
			$("#amount").html(ui.values[0] +" - "+ ui.values[1]);
			$("#min").val(ui.values[0]);
			$("#max").val(ui.values[1]);
		}
	});
	$("#amount").html($("#slider-range").slider("values", 0) +" - "+ $("#slider-range").slider("values", 1));
});

function randomName () {
    axios.get(queryURL2)
        .then(response => {
            console.log(response.data);
        }) 

        }
        