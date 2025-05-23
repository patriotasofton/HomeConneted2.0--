// Carrega todos os produtos
async function loadAllProducts() {
    const productsGrid = document.getElementById('all-products');
    if (!productsGrid) return;
    
    try {
        const response = await fetchData('/all-products');
        const products = await response.json();
        
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">R$ ${product.price.toFixed(2)}</p>
                    <p class="description">${product.description}</p>
                    <button class="btn btn-primary" data-product-id="${product.id}">Comprar</button>
                </div>
            </div>
        `).join('');
        
        // Filtros
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                const allProducts = document.querySelectorAll('.product-card');
                
                allProducts.forEach(product => {
                    if (filter === 'all' || product.getAttribute('data-category') === filter) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Carrega pacotes de serviços
async function loadPackages() {
    const packagesGrid = document.getElementById('packages');
    if (!packagesGrid) return;
    
    try {
        const response = await fetchData('/packages');
        const packages = await response.json();
        
        packagesGrid.innerHTML = packages.map(pkg => `
            <div class="package-card">
                <div class="package-image" style="background-image: url('${pkg.image}')"></div>
                <h3>${pkg.name}</h3>
                <p class="description">${pkg.description}</p>
                <p class="price">R$ ${pkg.price.toFixed(2)}</p>
                <button class="btn btn-primary" data-package-id="${pkg.id}">Contratar</button>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar pacotes:', error);
    }
}

// Inicialização da página de produtos
document.addEventListener('DOMContentLoaded', () => {
    loadAllProducts();
    loadPackages();
    updateAuthStatus();
});