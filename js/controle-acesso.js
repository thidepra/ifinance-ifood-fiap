document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pagamentoForm');
    const tableBody = document.querySelector('tbody');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio do formulário e o recarregamento da página

        // Coleta os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const cargo = document.getElementById('cargo').value;

        // Verifica se todos os campos estão preenchidos
        if (nome && email && cargo) {
            // Cria uma nova linha para a tabela
            const newRow = document.createElement('tr');

            newRow.innerHTML = `
                <td>${nome}</td>
                <td>${cargo}</td>
                <td class="email">${email}</td>
                <td><button class="tabela-btn">Excluir</button></td>
            `;

            // Adiciona a nova linha ao corpo da tabela
            tableBody.appendChild(newRow);

            // Limpa os campos do formulário
            form.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // Adiciona um evento de clique para excluir a linha da tabela
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('tabela-btn')) {
            const row = event.target.closest('tr');
            row.remove();
        }
    });
});
