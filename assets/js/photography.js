// Array com as imagens e suas categorias
const galleryImages = [
    {
        src: 'assets/img/porshe3.JPG',
        category: 'nature', // nature aqui representa "Carros" conforme o botão
        alt: 'Porsche 911 Turbo S'
    },
    {
        src: 'assets/img/porshe2.jpg',
        category: 'nature',
        alt: 'Porsche 911'
    },
    {
        src: 'assets/img/porshe1.jpg',
        category: 'nature',
        alt: 'Porsche Clássico'
    },
    {
        src: 'assets/img/car.JPG',
        category: 'nature',
        alt: 'Carro Esportivo'
    },
    {
        src: 'assets/img/audi1.jpg',
        category: 'nature',
        alt: 'Audi'
    },
    {
        src: 'assets/img/Porto1.jpg',
        category: 'urban',
        alt: 'Porto'
    },
    {
        src: 'assets/img/Porto2.jpg',
        category: 'urban',
        alt: 'Porto'
    },
    {
        src: 'assets/img/Nature1.jpg',
        category: 'portrait',
        alt: 'Natureza'
    }
];

// Função para criar o HTML das imagens com modal
function createGalleryItems(images) {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';

    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        
        // Adicionar evento de clique para abrir o modal
        galleryItem.addEventListener('click', () => openModal(image.src));
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Função para abrir o modal
function openModal(imageSrc) {
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imageSrc}" alt="Imagem ampliada" class="modal-image">
        </div>
    `;

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target.className === 'photo-modal' || e.target.className === 'close-modal') {
            closeModal(modal);
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });

    document.body.appendChild(modal);
    setTimeout(() => modal.style.opacity = '1', 10);
}

// Função para fechar o modal
function closeModal(modal) {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
}

// Função para mostrar mensagem quando não há imagens
function showEmptyCategoryMessage(category) {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = `
        <div class="empty-category">
            <h3>Conteúdo brevemente adicionado</h3>
            <p>Em breve teremos imagens para a categoria ${category}</p>
        </div>
    `;
}

// Inicializar a galeria e adicionar eventos aos filtros
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar todas as imagens inicialmente
    createGalleryItems(galleryImages);

    // Adicionar eventos aos botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            if (filter === 'all') {
                createGalleryItems(galleryImages);
            } else {
                const filteredImages = galleryImages.filter(img => img.category === filter);
                if (filteredImages.length > 0) {
                    createGalleryItems(filteredImages);
                } else {
                    showEmptyCategoryMessage(
                        filter === 'urban' ? 'Urbano' : 
                        filter === 'portrait' ? 'Natureza' : 
                        filter === '' ? 'Carros' :
                        'Carros'
                    );
                }
            }
        });
    });
}); 