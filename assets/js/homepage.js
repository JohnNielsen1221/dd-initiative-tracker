import { modalHandler } from "./modules/battleModal.js";

var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsterList-container')

//initialize search for given city name
searchEl.addEventListener('click',function() {
    var searchTerm = inputEl.value;
    getMonster(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('monster',JSON.stringify(searchHistory));
});

function getMonster(name) {
    var queryURL = 'https://www.dnd5eapi.co/api/monsters/' + name;
    axios.get(queryURL)
    .then (function(response) {
        var monsterEl = document.createElement ('ul');
        monsterEl.classList = 'card list-item';
        monsterEl.setAttribute ('id', 'monster-container');

        var monsterName = document.createElement('li');
        monsterName.innerText = 'Name: ' + response.data.name;
        monsterName.setAttribute("class", "monsterName");
        monsterEl.appendChild(monsterName);

        var monsterHP = document.createElement('li');
        monsterHP.innerText = 'HP: ' + response.data.hit_points;
        monsterHP.setAttribute("id", "monsterHP");
        monsterEl.appendChild(monsterHP);

        monsterContainerEl.appendChild(monsterEl);
    });
}
$(document).ready(function(){
    $('.modal').modal();
});

$("#startBtn").click(function () {
    modalHandler($(this).html())
});