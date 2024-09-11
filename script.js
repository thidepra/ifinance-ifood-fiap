// Função para carregar a navbar dinamicamente
function loadNavbar() {
    fetch('../navbar.html')
      .then(response => response.text())
      .then(data => {
        document.querySelector('#navbar-container').innerHTML = data;
        setupNavbarEvents();
        highlightCurrentPage();
      });
  }
  
  // Adiciona eventos de clique para as opções da navbar
  function setupNavbarEvents() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        window.location.href = `../pages/${item.getAttribute('data-page')}`;
      });
    });
  }
  
  // Destacar a página atual com base na URL
  function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      const page = item.getAttribute('data-page');
      if (page === currentPage) {
        item.classList.add('selected');
      }
    });
  }
  
  // Carrega a navbar ao carregar a página
  document.addEventListener('DOMContentLoaded', loadNavbar);
  