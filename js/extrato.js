function openModal(cliente, metodo, valor) {
    document.getElementById('cliente').textContent = cliente;
    document.getElementById('metodo').textContent = metodo;
    document.getElementById('valor').textContent = valor;
    var modal = new bootstrap.Modal(document.getElementById('pedidoModal'));
    modal.show();
}