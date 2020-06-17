var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsterList-container')
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
console.log(searchHistory);

$("#addplayerSubmit").click(function (event) {
    event.preventDefault();

    var playerName = $("#playerName").val();
    var playerClass = $("#playerClass").val();
    var playerRace = $("#playerRace").val();
    var healthPoints = $("#healthPoints").val();
    var strength = $("#strength").val();
    var dexterity = $("#dexterity").val();
    var intelligence = $("#intelligence").val();
    var wisdom = $("#wisdom").val();
    var constitution = $("#constitution").val();
    var charisma = $("#charisma").val();
    var weaponsOne = $("#weaponsOne").val();
    var weaponsTwo = $("#weaponsTwo").val();
    var weaponsThree = $("#weaponsThree").val();
    var weaponsFour = $("#weaponsFour").val();
    var weaponsFive = $("#weaponsFive").val();
    var weaponsSix = $("#weaponsSix").val();
    var weaponsSeven = $("#weaponsSeven").val();
    var weaponsEight = $("#weaponsEight").val();
    var spellOne = $("#spellOne").val();
    var spellTwo = $("#spellTwo").val();
    var spellThree = $("#spellThree").val();
    var spellFour = $("#spellFour").val();
    var statusEffectOne = $("#statusEffectOne").val();
    var statusEffectTwo = $("#statusEffectTwo").val();
    var statusEffectThree = $("#statusEffectThree").val();

    var loadplayerInfo = function () {
        $("#playerInfo,#playerInfotwo").html("Player Name: " + "<u><b>" + playerName + "</u></b>" + "    Player Class: " + "<u><b>" + playerClass + "</u></b>" + "Player Race: " + "<u><b>" + playerRace + "       " + "</u></b>" + "         Player Health: " + "<u><b>" + healthPoints);

    };
    loadplayerInfo();


    var arrayForm = [playerName, playerClass, playerRace, healthPoints, strength, dexterity, intelligence, wisdom, constitution, charisma, weaponsOne, weaponsTwo, weaponsThree, weaponsFour, weaponsFive, weaponsSix, weaponsSeven, weaponsEight, spellOne, spellTwo, spellThree, spellFour, statusEffectOne, statusEffectTwo, statusEffectThree, statusEffectFour];

    // var texttoEnter = arrayForm;
    var texttoEnterJSON = JSON.stringify(arrayForm);
    localStorage.setItem("addplayerSubmitLocalStorage", texttoEnterJSON);
    loadText();
});


// recall local storage
var loadText = function () {
    texttoEnter = JSON.parse(localStorage.getItem("addplayerSubmitLocalStorage"));
    $("#inbox").html(texttoEnter[4]);
};



//initialize search for given monster name
searchEl.addEventListener('click', function () {
    var searchTerm = inputEl.value;
    getMonster(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('monster', JSON.stringify(searchHistory));
});

function getMonster(name) {
    axios.get(queryURL + name)
        .then(function (response) {
            var monsterCardEl = document.createElement('div');
            monsterCardEl.classList = ('card monsterList-container');

            var monsterContent = document.createElement('div');
            monsterContent.classList = ('card-content');
            monsterCardEl.appendChild(monsterContent);

            var monsterName = document.createElement('p');
            monsterName.classList = ('card-title monsterName');
            monsterName.innerText = response.data.name;
            monsterCardEl.appendChild(monsterName);

            var monsterInfo = document.createElement('p');
            monsterInfo.classList = ('card-title monsterInfo');
            monsterInfo.innerText = response.data.size + ' ' + response.data.type + ', ' + response.data.alignment;
            monsterCardEl.appendChild(monsterInfo);

            var monsterHP = document.createElement('a');
            monsterHP.classList = ('tooltipped btn');
            monsterHP.setAttribute('data-position', 'right');
            monsterHP.setAttribute('data-tooltip', response.data.hit_points + ' (' + response.data.hit_dice + ')');
            monsterHP.innerText = 'HP';
            monsterCardEl.appendChild(monsterHP);

            M.Tooltip.init(monsterHP);

            var monsterSpeed = document.createElement('a');
            monsterSpeed.classList = ('tooltipped btn');
            monsterSpeed.setAttribute('data-position', 'right');
            monsterSpeed.setAttribute('data-tooltip', response.data.speed);
            monsterSpeed.innerText = 'Speed';
            monsterCardEl.appendChild(monsterSpeed);

            M.Tooltip.init(monsterSpeed);

            // var hpDropdown = document.createElement('ul');
            // hpDropdown.classList = ('dropdown-content');
            // hpDropdown.setAttribute = ('id', 'dropdown1');
            // monsterCardEl.appendChild(hpDropdown);

            // var hpContent = document.createElement('li');
            // hpDropdown.appendChild(hpContent);

            // var hpAnchor = document.createElement('a');
            // hpAnchor.setAttribute ('href', '#!');
            // hpAnchor.innerText = response.data.hit_points;
            // hpContent.appendChild(hpAnchor);

            var monsterStats = document.createElement('a');
            monsterStats.classList = ('tooltipped btn');
            // monsterHP.setAttribute ('href','#');
            monsterStats.setAttribute('data-position', 'right');
            monsterStats.setAttribute('data-tooltip', 'STR: ' + response.data.strength + ' | ' + 'DEX: ' + response.data.dexterity + ' | ' + 'INT: ' + response.data.intelligence + ' | ' + 'WIS: ' + response.data.wisdom + ' | ' + 'CON: ' + response.data.constitution + ' | ' + 'CHA: ' + response.data.charisma);
            monsterStats.innerText = 'STATS';
            monsterCardEl.appendChild(monsterStats);

            M.Tooltip.init(monsterStats);

            monsterContainerEl.appendChild(monsterCardEl);
        });
}

// generates content for the modal
var modalHandler = function (playerEl) {
    var playerContainerEl = $("#monsterList-container") // #monsterList-container needs to be switched to player
    var playerList = playerContainerEl.find(".monsterName") || []; // .monsterName needs to be switched to player name
    console.log(playerList);

    // takes each player entered and makes their name into a button in the modal
    playerList.each(function () {
        var playerName = $(this).text().split(":")[1].trim();
        var modalButtonEl = $("<a>").addClass("waves-effect waves-light btn").text(playerName);
        var modalContentEl = $(".modal-content");
        modalContentEl.append(modalButtonEl); // buttons don't generate with spacing... idk why.
    });
}

$(document).ready(function () {
    $('.tooltipped').tooltip();
});

$(document).ready(function () {
    $('.modal').modal();
});

$("#startBtn").click(function () {
    modalHandler($(this).html())
});

$(document).ready(function () {
    $('.tabs').tabs();
});
