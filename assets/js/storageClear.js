var clearAll = document.getElementById('storage-clear');

clearAll.addEventListener('click', function(){
    localStorage.clear();
    window.location.reload();
});