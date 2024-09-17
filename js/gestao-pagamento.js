document.getElementById('pagamentoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar os dados do formulário
    const numeroBanco = document.getElementById('numeroBanco').value;
    const agencia = document.getElementById('agencia').value;
    const contaCorrente = document.getElementById('contaCorrente').value;
    const valorSaque = document.getElementById('valorSaque').value;

    // Validar campos
    if (numeroBanco && agencia && contaCorrente && valorSaque) {
        alert('Transferência realizada com sucesso!');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});