document.addEventListener('DOMContentLoaded', function() {
    const reports = {
      'Relatório de Vendas': generateSalesPDF,
      'Relatório de Produtos': generateProductsPDF,
      'Relatório de Despesas': generateExpensesPDF,
      'Relatório de Clientes': generateClientsPDF
    };
  
    function downloadPDF(reportType) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Chama a função correta para gerar o conteúdo do relatório
      reports[reportType](doc);
      
      // Faz o download do PDF
      doc.save(`${reportType}.pdf`);
    }
  
    // Função para gerar o PDF de Relatório de Vendas no iFood
    function generateSalesPDF(doc) {
      addHeader(doc, 'Relatório de Vendas - iFood');
      
      // Tabela de vendas
      const salesData = [
        ['Data', 'Produto', 'Quantidade', 'Valor Total', 'Comissão iFood'],
        ['2024-01-01', 'Hambúrguer Simples', '15', 'R$ 450,00', 'R$ 67,50'],
        ['2024-01-02', 'Pizza Margherita', '8', 'R$ 320,00', 'R$ 48,00'],
        ['2024-01-03', 'Sushi Combo', '10', 'R$ 500,00', 'R$ 75,00'],
        ['2024-01-04', 'Coxinha de Frango', '20', 'R$ 200,00', 'R$ 30,00'],
        ['2024-01-05', 'Feijoada Completa', '5', 'R$ 250,00', 'R$ 37,50'],
        ['2024-01-06', 'Lasanha Bolonhesa', '12', 'R$ 480,00', 'R$ 72,00'],
        ['2024-01-07', 'Pastel de Carne', '30', 'R$ 300,00', 'R$ 45,00'],
        ['2024-01-08', 'Açaí Completo', '18', 'R$ 270,00', 'R$ 40,50'],
        ['2024-01-09', 'Cachorro-Quente', '25', 'R$ 375,00', 'R$ 56,25'],
        ['2024-01-10', 'Salada Caesar', '7', 'R$ 210,00', 'R$ 31,50']
      ];
      
      addTable(doc, salesData, 10, 40);
      addFooter(doc);
    }
  
    // Função para gerar o PDF de Relatório de Produtos no iFood
    function generateProductsPDF(doc) {
      addHeader(doc, 'Relatório de Produtos - iFood');
      
      // Tabela de produtos
      const productsData = [
        ['Produto', 'Categoria', 'Preço'],
        ['Burger', 'Lanches', 'R$ 30,00'],
        ['Margherita', 'Pizzas', 'R$ 40,00'],
        ['Sushi', 'Oriental', 'R$ 50,00'],
        ['Coxinha', 'Salgados', 'R$ 10,00'],
        ['Feijoada', 'Brasileira', 'R$ 50,00'],
        ['Lasanha', 'Massas', 'R$ 40,00'],
        ['Pastel', 'Salgados', 'R$ 10,00'],
        ['Açaí', 'Sobremesas', 'R$ 15,00'],
        ['Hotdog', 'Lanches', 'R$ 15,00'],
        ['Caesar', 'Saladas', 'R$ 30,00']
      ];      
      
      addTable(doc, productsData, 10, 40);
      addFooter(doc);
    }
  
    // Função para gerar o PDF de Relatório de Despesas no iFood
    function generateExpensesPDF(doc) {
      addHeader(doc, 'Relatório de Despesas - iFood');
      
      // Tabela de despesas
      const expensesData = [
        ['Data', 'Descrição', 'Valor'],
        ['2024-01-01', 'Entrega', 'R$ 100,00'],
        ['2024-01-02', 'Comissão', 'R$ 48,00'],
        ['2024-01-03', 'Aluguel', 'R$ 1.200,00'],
        ['2024-01-04', 'Luz', 'R$ 300,00'],
        ['2024-01-05', 'Água', 'R$ 150,00'],
        ['2024-01-06', 'Internet', 'R$ 120,00'],
        ['2024-01-07', 'Material', 'R$ 200,00'],
        ['2024-01-08', 'Marketing', 'R$ 500,00'],
        ['2024-01-09', 'Manutenção', 'R$ 350,00'],
        ['2024-01-10', 'Limpeza', 'R$ 100,00']
      ];      
      
      addTable(doc, expensesData, 10, 40);
      addFooter(doc);
    }
  
    // Função para gerar o PDF de Relatório de Clientes no iFood
    function generateClientsPDF(doc) {
      addHeader(doc, 'Relatório de Clientes - iFood');
      
      // Tabela de clientes
      const clientsData = [
        ['Nome', 'Email', 'Telefone'],
        ['João', 'joao@email.com', '(11) 98765-4321'],
        ['Maria', 'maria@email.com', '(21) 91234-5678'],
        ['Carlos', 'carlos@email.com', '(31) 99876-5432'],
        ['Ana', 'ana@email.com', '(41) 91234-5678'],
        ['Pedro', 'pedro@email.com', '(51) 99765-4321'],
        ['Paula', 'paula@email.com', '(61) 91111-2222'],
        ['Lucas', 'lucas@email.com', '(71) 93333-4444'],
        ['Rita', 'rita@email.com', '(81) 95555-6666'],
        ['Leon', 'leon@email.com', '(91) 96666-7777'],
        ['Lia', 'lia@email.com', '(31) 97777-8888']
      ];      
      
      addTable(doc, clientsData, 10, 40);
      addFooter(doc);
    }
  
    // Função para adicionar o cabeçalho
    function addHeader(doc, title) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(title, 10, 20);
      
      doc.setLineWidth(0.5);
      doc.line(10, 25, 200, 25); // Linha horizontal abaixo do título
    }
  
    // Função para adicionar o rodapé
    function addFooter(doc) {
      const date = new Date().toLocaleDateString();
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text(`Relatório gerado em ${date}`, 10, 290);
      
      doc.line(10, 285, 200, 285); // Linha horizontal acima do rodapé
    }
  
    // Função para adicionar uma tabela ao PDF
    function addTable(doc, data, startX, startY) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      
      const rowHeight = 10;
      const colWidths = [30, 60, 30, 40, 40]; // Largura de cada coluna ajustada
  
      // Cabeçalho
      data[0].forEach((colText, colIndex) => {
        doc.setFont('helvetica', 'bold');
        doc.text(colText, startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), startY);
      });
      
      // Dados da tabela
      data.slice(1).forEach((row, rowIndex) => {
        row.forEach((cellText, colIndex) => {
          doc.setFont('helvetica', 'normal');
          doc.text(cellText, startX + colWidths.slice(0, colIndex).reduce((a, b) => a + b, 0), startY + (rowIndex + 1) * rowHeight);
        });
      });
    }
  
    // Adiciona event listeners para os botões de download
    document.querySelectorAll('button[data-test="login-btn"]').forEach(button => {
      button.addEventListener('click', function() {
        const reportTitle = this.closest('.text-card').querySelector('h2').textContent;
        downloadPDF(reportTitle);
      });
    });
  });
  