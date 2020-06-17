// $( document ).ready(function() {

// removes submit form from startup of webpage
window.onload = function () {
    $("PlayerForm").hide();
}

$(document).ready(function () {
    // hides submit form
    $("#addplayerSubmit").click(function () {
        $("PlayerForm").hide();
    });
    // shows submit form
    $("#addPlayerBtn").click(function () {
        $("PlayerForm").show();
    });
});


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
    var conditionsEffectOne = $("#conditionsEffectOne").val();
    var conditionsEffectTwo = $("#conditionsEffectTwo").val();
    var conditionsEffectThree = $("#conditionsEffectThree").val();
    var conditionsEffectFour = $("#conditionsEffectFour").val();

    var loadplayerInfo = function () {
        $("#playerInfo,#playerInfotwo").html("Player Name: " + "<u><b>" + playerName + "</u></b>" + "    Player Class: " + "<u><b>" + playerClass + "</u></b>" + "Player Race: " + "<u><b>" + playerRace + "       " + "</u></b>" + "         Player Health: " + "<u><b>" + healthPoints);

    };
    loadplayerInfo();


    // var arrayForm = [{"playerName" : playerName, playerClass, playerRace, healthPoints, strength, dexterity, intelligence, wisdom, constitution, charisma, weaponsOne, weaponsTwo, weaponsThree, weaponsFour, weaponsFive, weaponsSix, weaponsSeven, weaponsEight, spellOne, spellTwo, spellThree, spellFour, conditionsEffectOne, conditionsEffectTwo, conditionsEffectThree, conditionsEffectFour}];

    var arrayForm = [playerName, playerClass, playerRace, healthPoints, strength, dexterity, intelligence, wisdom, constitution, charisma, weaponsOne, weaponsTwo, weaponsThree, weaponsFour, weaponsFive, weaponsSix, weaponsSeven, weaponsEight, spellOne, spellTwo, spellThree, spellFour, conditionsEffectOne, conditionsEffectTwo, conditionsEffectThree, conditionsEffectFour];


    // var texttoEnter = arrayForm;
    var texttoEnterJSON = JSON.stringify(arrayForm);
    localStorage.setItem("addplayerSubmitLocalStorage", texttoEnterJSON);
    loadText();
});


// recall local storage
var loadText = function () {
    texttoEnter = JSON.parse(localStorage.getItem("addplayerSubmitLocalStorage"));

    // stats list
    var strengthCard = texttoEnter[4];
    var dexterityCard = texttoEnter[5];
    var intelligenceCard = texttoEnter[6];
    var wisdomCard = texttoEnter[7];
    var constitutionCard = texttoEnter[8];
    var charismaCard = texttoEnter[9];

    // $("#stats").html("Strength: " + strengthCard + " + "Dexterity: " + dexterityCard + " Intelligence: " + intelligenceCard + " Wisdom: " + wisdomCard + " Constitution: " + constitutionCard + " Charisma: " + charismaCard);

    $("#stats").html("Strength: " + strengthCard + "~        &          ~" + "Dexterity: " + dexterityCard + "<br></br>" + " Intelligence: " + intelligenceCard + "<br></br>" + " Wisdom: " + wisdomCard + "<br></br>" + " Constitution: " + constitutionCard + "<br></br>" + " Charisma: " + charismaCard);

    // weapons list
    var weaponsOneCard = texttoEnter[10];
    var weaponsTwoCard = texttoEnter[11];
    var weaponsThreeCard = texttoEnter[12];
    var weaponsFourCard = texttoEnter[13];
    var weaponsFiveCard = texttoEnter[14];
    var weaponsSixCard = texttoEnter[15];
    var weaponsSevenCard = texttoEnter[16];
    var weaponsEightCard = texttoEnter[17];

    $("#weapons").html("Weapon I: " + weaponsOneCard + "~        &          ~" + "Weapon II: " + weaponsTwoCard + "<br></br>" + "Weapon III: " + weaponsThreeCard + "~        &          ~" + "Weapon IV: " + weaponsFourCard  + "<br></br>" + "Weapon V: " + "~        &          ~" + weaponsFiveCard + "Weapon VI: " + weaponsSixCard + "<br></br>" + "Weapon VII: " + weaponsSevenCard + "~        &          ~" +  "Weapon VIII: " + weaponsEightCard);

    // spells list
    var spellOneCard = texttoEnter[18];
    var spellTwoCard = texttoEnter[19];
    var spellThreeCard= texttoEnter[20];
    var spellFourCard = texttoEnter[21];

    $("#spells").html("Spell I: " + spellOneCard + "~        &          ~" + "Spell II: " + spellTwoCard + "<br></br>" + "Spell III: " + spellThreeCard + "~        &          ~" + "Spell IV: " + spellFourCard);

    //conditions list
    var conditionsOneCard = texttoEnter[22];
    var conditionsTwoCard = texttoEnter[23];
    var conditionsThreeCard = texttoEnter[24];
    var conditionsFourCard = texttoEnter[25];

    $("#conditions").html("Condition I: " + conditionsOneCard + "~        &          ~" + "Condition II: " + conditionsTwoCard + "<br></br>" + "Condition III: " + conditionsThreeCard + "~        &          ~" + "Condition IV: " + conditionsFourCard);
};

$(document).ready(function () {
    // hides submit form
    $("#addplayerSubmit").click(function () {
        $("PlayerForm").hide();
    });
    // shows submit form
    $("#addPlayerBtn").click(function () {
        $("PlayerForm").show();
    });
});

