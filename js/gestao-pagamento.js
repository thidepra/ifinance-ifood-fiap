document.addEventListener('DOMContentLoaded', function () {
    // Inicializar o saldo
    let saldoAtual = 6826.64;
  
    // Elementos
    const saldoElement = document.querySelector('.text-card h2');
    const saqueInput = document.getElementById('valorSaque');
    const form = document.getElementById('pagamentoForm');
  
    // Atualizar saldo na página
    saldoElement.textContent = `R$ ${saldoAtual.toFixed(2)}`;
  
    // Função para atualizar o saldo
    function atualizarSaldo(valorSaque) {
      // Remove "R$ " e substitui a vírgula por ponto
      const valor = parseFloat(valorSaque.replace('R$', '').replace(/\./g, '').replace(',', '.'));
  
      if (isNaN(valor) || valor <= 0 || valor > saldoAtual) {
        alert('Valor de saque inválido ou superior ao saldo disponível.');
        return;
      }
  
      saldoAtual -= valor;
      saldoElement.textContent = `R$ ${saldoAtual.toFixed(2)}`;
      alert(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`);
    }
  
    // Manipular o envio do formulário
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const valorSaque = saqueInput.value;
      atualizarSaldo(valorSaque);
    });
  });
  