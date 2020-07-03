var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('autocomplete');
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
var sorryButtonEl = document.getElementById('sorry-button');
searchEl.addEventListener('click', function () {
    var searchTerm = inputEl.value.toLowerCase();
    getMonster(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem('monster', JSON.stringify(searchHistory));
});

sorryButtonEl.addEventListener('click', function() {
    $(searchEl).removeClass('modal-trigger');
})

function getMonster(name) {
    if (name.length<1) {
        $(searchEl).addClass('modal-trigger');
        // searchEl.setAttribute('data-target', 'monster-modal');
    } else {
    axios.get(queryURL + name)
        .then(function (response) {
            persistencyData = JSON.parse(localStorage.getItem("persistencyData"));
            if (!persistencyData) {
                persistencyData = [];
            }

            monsterData = {
                "monsterName": response.data.name,
                "monsterAttributes": response.data.size + ', ' + response.data.alignment,
                "monsterHP": response.data.hit_points,
                "monsterStats": 'STR: ' + response.data.strength + ' | ' + 'DEX: ' + response.data.dexterity + ' | ' + 'INT: ' + response.data.intelligence + ' | ' + 'WIS: ' + response.data.wisdom + ' | ' + 'CON: ' + response.data.constitution + ' | ' + 'CHA: ' + response.data.charisma,
                "monsterArmorClass": response.data.armor_class,
                "monsterSpeed": response.data.speed.walk,
                "isPlayer": false
            }

            persistencyData.push(monsterData);

            localStorage.setItem("persistencyData", JSON.stringify(persistencyData));

            var monsterCardEl = document.createElement('div');
            monsterCardEl.classList = ('card monster-card draggable col s12 center');

            var monsterContent = document.createElement('div');
            monsterContent.classList = ('card-content');
            monsterCardEl.appendChild(monsterContent);

            var monsterName = document.createElement('p');
            monsterName.classList = ('card-title monsterName');
            monsterName.innerText = monsterData.monsterName;
            monsterCardEl.appendChild(monsterName);

            var monsterAttributes = document.createElement('p');
            monsterAttributes.classList = (' monsterAttributes');
            monsterAttributes.innerText = monsterData.monsterAttributes;
            monsterCardEl.appendChild(monsterAttributes);

            var monsterEditName = document.createElement('input');
            monsterEditName.classList = ('center');
            monsterEditName.setAttribute('placeholder', "Unique Monster Name");
            monsterCardEl.appendChild(monsterEditName);

            var monsterHpInput = document.createElement('input');
            monsterHpInput.classList = ('center');
            monsterHpInput.setAttribute('placeholder', 'HP: ' + monsterData.monsterHP);
            monsterCardEl.appendChild(monsterHpInput);

            var monsterHP = document.createElement('a');
            monsterHP.classList = ('tooltipped btn');
            monsterHP.setAttribute('data-position', 'right');
            monsterHP.setAttribute('data-tooltip', monsterData.monsterHP);
            monsterHP.innerText = 'HP';
            monsterCardEl.appendChild(monsterHP);

            M.Tooltip.init(monsterHP);

            var monsterStats = document.createElement('a');
            monsterStats.classList = ('tooltipped btn');
            monsterStats.setAttribute('data-position', 'right');
            monsterStats.setAttribute('data-tooltip', monsterData.monsterStats);
            monsterStats.innerText = 'STATS';
            monsterCardEl.appendChild(monsterStats);

            M.Tooltip.init(monsterStats);

            var monsterArmorClass = document.createElement('a');
            monsterArmorClass.classList = ('tooltipped btn');
            monsterArmorClass.setAttribute('data-position', 'right');
            monsterArmorClass.setAttribute('data-tooltip', monsterData.monsterArmorClass);
            monsterArmorClass.innerText = 'Armor';
            monsterCardEl.appendChild(monsterArmorClass);

            M.Tooltip.init(monsterArmorClass);

            var monsterSpeed = document.createElement('a');
            monsterSpeed.classList = ('tooltipped btn');
            monsterSpeed.setAttribute('data-position', 'right');
            monsterSpeed.setAttribute('data-tooltip', monsterData.monsterSpeed);
            monsterSpeed.innerText = 'Speed';
            monsterCardEl.appendChild(monsterSpeed);

            M.Tooltip.init(monsterSpeed);

            $("<button>").addClass("btn battleBtn").text("Battle!").appendTo(monsterCardEl);

            var monsterContainerEl = document.getElementById('monsterContainer');
            monsterContainerEl.append(monsterCardEl);

            $(".battleBtn").off();
            $(".battleBtn").on("click", function () {

                if ($(this).parents("#playerColumn").html() || $(this).parents("#monsterColumn").html()) {
                    $(this).closest(".draggable").appendTo("#battleContainer");
                    $(this).text("Remove");
                }
                else if ($(this).parents("#battleColumn").html()) {
                    if ($(this).parents(".player-card").html()) {
                        $(this).closest(".draggable").appendTo("#playerContainer");
                        $(this).text("Battle!")
                    }
                    else if ($(this).parents(".monster-card").html()) {
                        $(this).closest(".draggable").appendTo("#monsterContainer");
                        $(this).text("Battle!")
                    }

                }
            })
        });
    }    
}
