$("#addplayerSubmit").click(function () {
    playerFormHandler(event);
});

var playerContainerEl = $("<ul>").addClass("row s12 contain").attr("id", "playerContainer");
var monsterContainerEl = $("<ul>").addClass("row s12 contain").attr("id", "monsterContainer");
var battleContainerEl = $("<ul>").addClass("row s12 contain").attr("id", "battleContainer");
$("#playerColumn .row").append(playerContainerEl);
$("#monsterColumn .row").append(monsterContainerEl);
$("#battleColumn .row").append(battleContainerEl);

$(".contain").sortable({
    connectWith: $(".contain"),
    scroll: true,
    helper: "clone"
})

var createPlayerCard = function (playerData) {
    if (playerData.isPlayer) {
        var rowEl = $("<li>").addClass("row draggable");
        var colEl = $("<div>").addClass("col s12");
        var cardEl = $("<div>").addClass("card player-card s12").attr('draggable', 'true');
        var cardContentEl = $("<div>").addClass("card-content white-text");
        var cardTitle = $("<span>").addClass("card-title").text(playerData.playerName).attr("id", playerData.playerName);
        var cardRaceClass = $("<p>").text(`${playerData.playerRace} ${playerData.playerClass}`);
        var cardHpInput = $('<input>').addClass('center').attr('placeholder', 'HP: ' + playerData.healthPoints);
        var cardAction = $("<div>").addClass("card-action");
        var cardHealthPoints = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", playerData.healthPoints).text("HP");
        var cardSpellButton = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", `${playerData.spellOne}, ${playerData.spellTwo}, ${playerData.spellThree}, ${playerData.spellFour}`).text("Spells");
        var cardStatsButton = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", `${playerData.strength}, ${playerData.dexterity}, ${playerData.intelligence}, ${playerData.wisdom}, ${playerData.constitution}, ${playerData.charisma}`).text("Stats");
        var cardWeapon = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", playerData.weapon).text("Weapon");
        var cardStatusEffect = $("<a>").addClass("btn tooltipped").attr("data-position", "bottom").attr("data-tooltip", playerData.statusEffect).text("Status");

        cardAction.append(cardHealthPoints, cardSpellButton, cardStatsButton, cardWeapon, cardStatusEffect);
        cardContentEl.append(cardTitle, cardRaceClass, cardHpInput, cardAction);
        cardEl.append(cardContentEl);
        colEl.append(cardEl);
        rowEl.append(colEl);
        playerContainerEl.append(rowEl);

        $("<button>").addClass("btn battleBtn").text("Battle!").appendTo(cardContentEl);
    }
}

var createOldPlayerCard = function () {
    persistencyData = JSON.parse(localStorage.getItem("persistencyData"));
    if (!persistencyData) {
        persistencyData = [];
    }

    persistencyData.forEach(player => {
        if (player.isPlayer) {
            playerData = {
                "playerName": player.playerName,
                "playerClass": player.playerClass,
                "playerRace": player.playerRace,
                "healthPoints": player.healthPoints,
                "strength": player.strength,
                "dexterity": player.dexterity,
                "intelligence": player.intelligence,
                "wisdom": player.wisdom,
                "constitution": player.constitution,
                "charisma": player.charisma,
                "weapon": player.weapon,
                "spellOne": player.spellOne,
                "spellTwo": player.spellTwo,
                "spellThree": player.spellThree,
                "spellFour": player.spellFour,
                "statusEffect": player.statusEffect,
                "isPlayer": true
            }
            createPlayerCard(playerData);
        }
    })
}

var createNewPlayerCard = function () {
    var playerName = $("#playerName").val();
    var playerClass = $("#playerClass").text();
    var playerRace = $("#playerRace").text();
    var healthPoints = $("#healthPoints").val();
    var strength = $("#strength").val();
    var dexterity = $("#dexterity").val();
    var intelligence = $("#intelligence").val();
    var wisdom = $("#wisdom").val();
    var constitution = $("#constitution").val();
    var charisma = $("#charisma").val();
    var weapon = $("#weapon").val();
    var spellOne = $("#spellOne").val();
    var spellTwo = $("#spellTwo").val();
    var spellThree = $("#spellThree").val();
    var spellFour = $("#spellFour").val();
    var statusEffect = $("#playerStatus").text();

    var playerData = {
        "playerName": playerName,
        "playerClass": playerClass,
        "playerRace": playerRace,
        "healthPoints": healthPoints,
        "strength": strength,
        "dexterity": dexterity,
        "intelligence": intelligence,
        "wisdom": wisdom,
        "constitution": constitution,
        "charisma": charisma,
        "weapon": weapon,
        "spellOne": spellOne,
        "spellTwo": spellTwo,
        "spellThree": spellThree,
        "spellFour": spellFour,
        "statusEffect": statusEffect,
        "isPlayer": true
    }

    createPlayerCard(playerData);

    persistencyData.push(playerData);

    localStorage.setItem("persistencyData", JSON.stringify(persistencyData));
}

var playerFormHandler = function (event) {
    event.preventDefault();
    createNewPlayerCard()

    M.Dropdown.init(playerFormHandler);

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

    $(".classOption").click(function () {
        $("#playerClass").text($(this).text());
    })

    $(".raceOption").click(function () {
        $("#playerRace").text($(this).text());
    })

    $(".statusOption").click(function () {
        $("#playerStatus").text($(this).text());
    })

    $(".battleBtn").off("click");
    $(".battleBtn").on("click", function () {
        if ($(this).parents("#playerColumn").html() || $(this).parents("#monsterColumn").html()) {
            $(this).closest(".row.draggable").appendTo("#battleContainer");
            $(this).text("Remove");
        }
        else if ($(this).parents("#battleColumn").html()) {
            if ($(this).parents(".player-card").html()) {
                $(this).closest(".draggable").appendTo("#playerContainer");
                $(this).text("Battle!")
            }
            else if ($(this).parents(".monster-card").html()) {
                $(this).closest(".row.draggable").appendTo("#monsterContainer");
                $(this).text("Battle!")
            }

        }
    })
}

createOldPlayerCard();

var getOldMonster = function (persistencyData) {
    persistencyData = JSON.parse(localStorage.getItem("persistencyData"));
    if (!persistencyData) {
        persistencyData = [];
    }

    persistencyData.forEach(monster => {
        if (!monster.isPlayer) {
            var monsterCardEl = document.createElement('div');
            monsterCardEl.classList = ('card monster-card draggable col s12 center');

            var monsterContent = document.createElement('div');
            monsterContent.classList = ('card-content');
            monsterCardEl.appendChild(monsterContent);

            var monsterName = document.createElement('p');
            monsterName.classList = ('card-title monsterName');
            monsterName.innerText = monster.monsterName;
            monsterCardEl.appendChild(monsterName);

            var monsterAttributes = document.createElement('p');
            monsterAttributes.classList = (' monsterAttributes');
            monsterAttributes.innerText = monster.monsterAttributes;
            monsterCardEl.appendChild(monsterAttributes);

            var monsterEditName = document.createElement('input');
            monsterEditName.classList = ('center');
            monsterEditName.setAttribute('placeholder', "Unique Monster Name");
            monsterCardEl.appendChild(monsterEditName);

            var monsterHpInput = document.createElement('input');
            monsterHpInput.classList = ('center');
            monsterHpInput.setAttribute('placeholder', 'HP: ' + monster.monsterHP);
            monsterCardEl.appendChild(monsterHpInput);

            var monsterHP = document.createElement('button');
            monsterHP.classList = ('collapsible');
            monsterHP.innerHTML = (`<li><div class="collapsible-header transparent text-center"><span>HP</span></div><div class="collapsible-body"><span>${monster.monsterHP}</span></div></li>`)
            monsterCardEl.appendChild(monsterHP);

            M.Collapsible.init(monsterHP);

            var monsterStats = document.createElement('button');
            monsterStats.classList = ('collapsible');
            monsterStats.innerHTML = (`<li><div class="collapsible-header transparent text-center"><span>STATS</span></div><div class="collapsible-body"><span>STR: ${+ monster.monsterStrength} <br/> DEX: ${+ monster.monsterDex} <br/> INT: ${+ monster.monsterInt} <br/> WIS: ${+ monster.monsterWis} <br/> CON: ${+ monster.monsterCon} <br/> CHA: ${+ monster.monsterCha}</span></div></li>`)
            monsterCardEl.appendChild(monsterStats);

            M.Collapsible.init(monsterStats);

            var monsterArmorClass = document.createElement('button');
            monsterArmorClass.classList = ('collapsible');
            monsterArmorClass.innerHTML = (`<li><div class="collapsible-header transparent text-center"><span>Armor</span></div><div class="collapsible-body"><span>${monster.monsterArmorClass}</span></div></li>`)
            monsterCardEl.appendChild(monsterArmorClass);

            M.Collapsible.init(monsterArmorClass);

            var monsterSpeed = document.createElement('button');
            monsterSpeed.classList = ('collapsible');
            monsterSpeed.innerHTML = (`<li><div class="collapsible-header transparent text-center"><span>Speed</span></div><div class="collapsible-body"><span>${monster.monsterArmorClass}</span></div></li>`)
            monsterCardEl.appendChild(monsterSpeed);

            M.Collapsible.init(monsterSpeed);

            $("<button>").addClass("btn battleBtn").text("Battle!").appendTo(monsterCardEl);

            var monsterContainerEl = document.getElementById('monsterContainer');
            monsterContainerEl.append(monsterCardEl);
        }
    })
}
persistencyData = JSON.parse(localStorage.getItem("persistencyData"));
if (!persistencyData) {
    persistencyData = [];
}
getOldMonster(persistencyData);

// autocomplete for monsters
const getMonsters = () => {
    // api call for a list of monsters and format it a list of monster names
    fetch('https://www.dnd5eapi.co/api/monsters/')
        .then(response => response.json())
        .then(list => list.results)
        .then(results => results.map(monster => monster.name))
        .then(monsterList => {
            // put that list in an autocomplete copied from https://tarekraafat.github.io/autoComplete.js/#/
            $(document).ready(function () {
                var db = monsterList;
                function popupClearAndHide() {
                    autocomplete_result.innerHTML = "";
                    autocomplete_result.style.display = "none";
                }

                function updPopup() {
                    if (!autocomplete.value) {
                        popupClearAndHide();
                        return;
                    }
                    var a = new RegExp("^" + autocomplete.value, "i");
                    for (var x = 0, b = document.createDocumentFragment(), c = false; x < db.length; x++) {
                        if (a.test(db[x])) {
                            c = true;
                            var d = document.createElement("p");
                            d.innerText = db[x];
                            d.setAttribute("onclick", "autocomplete.value=this.innerText;autocomplete_result.innerHTML='';autocomplete_result.style.display='none';");
                            b.appendChild(d);
                        }
                    }
                    if (c == true) {
                        autocomplete_result.innerHTML = "";
                        autocomplete_result.style.display = "block";
                        autocomplete_result.appendChild(b);
                        return;
                    }
                    popupClearAndHide();
                }

                autocomplete.addEventListener("keyup", updPopup);
                autocomplete.addEventListener("change", updPopup);
                autocomplete.addEventListener("focus", updPopup);
            })
        })
}
getMonsters();
