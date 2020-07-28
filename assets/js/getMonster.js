var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('autocomplete');
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
var sorryButtonEl = document.getElementById('sorry-button');
var nonMonsterInput = document.getElementById('non-monster-modal');
searchEl.addEventListener('click', function () {
    var searchTerm = inputEl.value.toLowerCase();
    getMonster(searchTerm);
});

addEventListener('click', function () {
    $(searchEl).removeClass('modal-trigger');
})

function formatName(name) {
    return name.replace(' ', '-');
}

function getMonster(name) {
    name = formatName(name)
    if (name.length < 1) {
        $(searchEl).addClass('modal-trigger');
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
                    // "monsterStats": 'STR: ' + response.data.strength + '\nDEX: ' + response.data.dexterity + '\nINT: ' + response.data.intelligence + '\nWIS: ' + response.data.wisdom + '\nCON: ' + response.data.constitution + '\nCHA: ' + response.data.charisma,
                    "monsterStrength": response.data.strength,
                    "monsterDex": response.data.dexterity,
                    "monsterInt": response.data.intelligence,
                    "monsterWis": response.data.wisdom,
                    "monsterCon": response.data.constitution,
                    "monsterCha": response.data.constitution,
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

                var monsterHP = document.createElement('button');
                monsterHP.classList = ('collapsible');
                monsterHP.innerHTML = (`<li><div class="collapsible-header transparent text-center"><span>HP</span></div><div class="collapsible-body"><span>${monsterData.monsterHP}</span></div></li>`)
                monsterCardEl.appendChild(monsterHP);

                M.Collapsible.init(monsterHP);

                var monsterStats = document.createElement('button');
                monsterStats.classList = ('collapsible');
                monsterStats.innerHTML = (`<li><div class="collapsible-header transparent text-center"><span>STATS</span></div><div class="collapsible-body"><span>STR: ${+ monsterData.monsterStrength} <br/> DEX: ${+ monsterData.monsterDex} <br/> INT: ${+ monsterData.monsterInt} <br/> WIS: ${+ monsterData.monsterWis} <br/> CON: ${+ monsterData.monsterCon} <br/> CHA: ${+ monsterData.monsterCha}</span></div></li>`)
                monsterCardEl.appendChild(monsterStats);

                M.Collapsible.init(monsterStats);
                
                var monsterArmorClass = document.createElement('button');
                monsterArmorClass.classList = ('collapsible');
                monsterArmorClass.innerHTML = (`<li><div class="collapsible-header transparent text-center"><span>Armor</span></div><div class="collapsible-body"><span>${monsterData.monsterArmorClass}</span></div></li>`)
                monsterCardEl.appendChild(monsterArmorClass);

                M.Collapsible.init(monsterArmorClass);

                var monsterSpeed = document.createElement('button');
                monsterSpeed.classList = ('collapsible');
                monsterSpeed.innerHTML = (`<li><div class="collapsible-header transparent text-center"><span>Speed</span></div><div class="collapsible-body"><span>${monsterData.monsterArmorClass}</span></div></li>`)
                monsterCardEl.appendChild(monsterSpeed);

                M.Collapsible.init(monsterSpeed);

                $("<button>").addClass("btn battleBtn").text("Battle!").appendTo(monsterCardEl);

                // $("<button>").addClass("btn deleteBtn").text("DELETE").appendTo(monsterCardEl);

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
            })
            .catch(error => {
                if (error) {
                    $('#non-monster-modal').modal('open');
                }
            })

    }
}
