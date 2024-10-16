document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar os dados do formulário
    const codigoValidacao = document.getElementById('codigo').value;

    // Validar campos
    if (codigoValidacao) {
        alert('Cadastro realizado com sucesso!');
        // Aqui você pode enviar os dados para um backend futuramente
        window.location.href = "reconhecimento-facial.html";
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
