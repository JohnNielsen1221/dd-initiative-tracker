// $( document ).ready(function() {
// setup button to save to local storage
$("#addplayerSubmit").click(function () {
    var playerName = $("#playerName").val();
    var playerClass = $("#playerClass").val();
    var arrayForm = [playerName, playerClass];

    // var texttoEnter = arrayForm;
    var texttoEnterJSON = JSON.stringify(arrayForm);
    localStorage.setItem("addplayerSubmitLocalStorage", texttoEnterJSON);
});
    // recall local storage
    // var loadText = function () {
    //     texttoEnter = JSON.parse(localStorage.getItem("addplayerSubmitLocalStorage"));
    //     document.getElementById("addplayerSubmit").value = arrayForm;
    // };
    // loadText();


// });

