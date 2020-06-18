$("#addplayerSubmit").click(function () {
    playerFormHandler(event);
});

var playerFormHandler = function(event) {
    event.preventDefault();

    var playerName = $("#playerName").val();
    console.log(playerName);
    
    var playerClass = $("#playerClass").val();
    console.log(playerClass);
    
    var playerRace = $("#playerRace :selected").text();
    console.log(playerRace);
    
    var healthPoints = $("#healthPoints").val();
    console.log(healthPoints);
    
    var strength = $("#strength").val();
    console.log(strength);
    
    var dexterity = $("#dexterity").val();
    console.log(dexterity);
    
    var intelligence = $("#intelligence").val();
    console.log(intelligence);
    
    var wisdom = $("#wisdom").val();
    console.log(wisdom);
    
    var constitution = $("#constitution").val();
    console.log(constitution);
    
    var charisma = $("#charisma").val();
    console.log(charisma);
    
    var weapon = $("#weapon").val();
    console.log(weapon);
    
    var spellOne = $("#spellOne").val();
    console.log(spellOne);
    
    var spellTwo = $("#spellTwo").val();
    console.log(spellTwo);
    
    var spellThree = $("#spellThree").val();
    console.log(spellThree);
    
    var spellFour = $("#spellFour").val();
    console.log(spellFour);
    
    var statusEffect = $("#statusEffect").val();
    console.log(statusEffect);

    var playerCardContainer = $("#playerCardContainer")
    console.log(playerCardContainer);
    
    var rowEl = $("<div>").addClass("row");
    var colEl = $("<div>").addClass("col s12");
    var cardEl = $("<div>").addClass("card blue-grey darken-1");
    var cardContentEl = $("<div>").addClass("card-content white-text");
    var cardTitle = $("<span>").addClass("card-title").text(playerName).attr("id", playerName);
    var cardRaceClass = $("<p>").text();
    var cardHpInput = $('<input>').attr('placeholder', healthPoints);
    var cardAction = $("<div>").addClass("card-action");
    var cardHealthPoints = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", healthPoints).text("HP");
    var cardSpellButton = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", `${spellOne}, ${spellTwo}, ${spellThree}, ${spellFour}`).text("Spells");
    var cardStatsButton = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", `${strength}, ${dexterity}, ${intelligence}, ${wisdom}, ${constitution}, ${charisma}`).text("Stats");
    var cardWeapon = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", weapon).text("Weapon");
    var cardStatusEffect = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", statusEffect).text("Status");

    cardAction.append(cardHealthPoints, cardSpellButton, cardStatsButton, cardWeapon, cardStatusEffect);
    cardContentEl.append(cardTitle, cardRaceClass, cardHpInput, cardAction);
    cardEl.append(cardContentEl);
    colEl.append(cardEl);
    rowEl.append(colEl);
    playerCardContainer.append(rowEl);

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
    
    
    $('.dropdown-trigger').dropdown();
    
    $(".classOption").click(function() {
        $("#playerClass").text($(this).text());
    })
    
    $(".raceOption").click(function() {
        $("#playerRace").text($(this).text());
    })
    
    $(".statusOption").click(function() {
        $("#playerStatus").text($(this).text());
    })

    // var loadplayerInfo = function () {
    //     $("#playerInfo,#playerInfotwo").html("Player Name: " + "<u><b>" + playerName + "</u></b>" + "    Player Class: " + "<u><b>" + playerClass + "</u></b>" + "Player Race: " + "<u><b>" + playerRace + "       " + "</u></b>" + "         Player Health: " + "<u><b>" + healthPoints);
    
    // };
    // loadplayerInfo();
    
    // var loadText = function () {
    //     texttoEnter = JSON.parse(localStorage.getItem("addplayerSubmitLocalStorage"));
    //     $("#inbox").html(texttoEnter[4]);
    // };
    
    // var arrayForm = [playerName, playerClass, playerRace, healthPoints, strength, dexterity, intelligence, wisdom, constitution, charisma, weaponsOne, weaponsTwo, weaponsThree, weaponsFour, weaponsFive, weaponsSix, weaponsSeven, weaponsEight, spellOne, spellTwo, spellThree, spellFour, statusEffectOne, statusEffectTwo, statusEffectThree, statusEffectFour];
    
    // // var texttoEnter = arrayForm;
    // var texttoEnterJSON = JSON.stringify(arrayForm);
    // localStorage.setItem("addplayerSubmitLocalStorage", texttoEnterJSON);
    // loadText();
}


