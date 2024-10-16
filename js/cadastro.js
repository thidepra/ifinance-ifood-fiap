document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar os dados do formulário
    const fullName = document.getElementById('fullName').value;
    const cpf = document.getElementById('cpf').value;
    const logoUrl = document.getElementById('logoUrl').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validar campos
    if (fullName && cpf && logoUrl && phone && email && password) {
        const firstName = removeAccents(fullName.split(' ')[0]); // Remover acentos apenas do primeiro nome

        // Armazena o primeiro nome no local storage
        localStorage.setItem('firstName', firstName);
        
        alert('Cadastro realizado com sucesso!');
        // Aqui você pode enviar os dados para um backend futuramente
        window.location.href = "validacao.html";
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para remover acentos
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
