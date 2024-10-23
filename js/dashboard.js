window.addEventListener('DOMContentLoaded', function() { 

    const userName = localStorage.getItem('firstName');

    if (userName) {
        document.getElementById('userName').innerText = userName;
    } else {
        document.getElementById('userName').innerText = 'Usuário';  // Caso o nome não esteja no localStorage
    }
});