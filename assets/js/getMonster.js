var searchEl = document.getElementById('search-button');
var searchHistory = JSON.parse(localStorage.getItem('monster')) || [];
var inputEl = document.getElementById('monster-input');
var monsterContainerEl = document.getElementById('monsterColumn')
var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
console.log(searchHistory);

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
            var queryURL = 'https://www.dnd5eapi.co/api/monsters/';
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

// export { getMonster };