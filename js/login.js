document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar os dados do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar campos
    if (email && password) {
        alert('Cadastro realizado com sucesso!');
        // Aqui você pode enviar os dados para um backend futuramente
        window.location.href = "/pages/dashboard.html";
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
