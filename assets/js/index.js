
/* ================================================
   Função para exibir a seção correspondente
================================================ */

// Função para mostrar a secção correspondente
function showSection(sectionId) {
  // Esconde todas as secções
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.display = 'none'; 
  });

  // Mostra a secção escolhida
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = 'block'; 
  }
}

// Por padrão, exibe a secção do Linktree ao carregar a página
window.onload = function() {
  showSection('linktree'); 
};

/* ================================================
   Função para alternar o menu hambúrguer
================================================ */

// Função para alternar o menu hambúrguer
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');


menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open'); 
});

/* ================================================
   Função para o formulário de login e exibição de mensagens de status
================================================ */

// Função para validar o login e exibir mensagens
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  // Obtendo os valores dos campos de input (usuário e senha)
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Validando se os campos foram preenchidos
  if (!username || !password) {
    showStatusMessage('Por favor, preencha todos os campos.', 'error'); 
  } else {
    showStatusMessage('Entrando...', 'success'); 
    
    setTimeout(function() {
      const success = Math.random() > 0.5; 
      if (success) {
        showStatusMessage('Login bem-sucedido! Bem-vindo!', 'success'); 
      } else {
        showStatusMessage('Falha no login. Tente novamente.', 'error'); 
      }
    }, 2000); 
  }
});

// Função para exibir mensagens de status
function showStatusMessage(message, type) {
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = message; 
  statusMessage.className = 'status-message ' + type; 
  statusMessage.style.display = 'block'; 
}

// Animações suaves ao scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Tema escuro/claro
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Carregar preferência de tema
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
}

// Efeito de digitação para o título
const typeWriter = (text, element, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Animação de contagem para estatísticas
const animateNumbers = () => {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.dataset.count);
        let current = 0;
        const increment = target / 100;
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        updateCount();
    });
};

// Indicador de scroll
const updateScrollIndicator = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-indicator').style.width = scrolled + '%';
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1');
    typeWriter(title.textContent, title);
    animateNumbers();
    window.addEventListener('scroll', updateScrollIndicator);
});
