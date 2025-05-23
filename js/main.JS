
// Carrega produtos em destaque na home
async function loadFeaturedProducts() {
    const productsGrid = document.getElementById('featured-products');
    if (!productsGrid) return;
    
    try {
        const response = await fetchData('/featured-products');
        const products = await response.json();
        
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">R$ ${product.price.toFixed(2)}</p>
                    <button class="btn btn-outline" data-product-id="${product.id}">Comprar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Carrega depoimentos
async function loadTestimonials() {
    const testimonialsSlider = document.getElementById('testimonials');
    if (!testimonialsSlider) return;
    
    try {
        const response = await fetchData('/testimonials');
        const testimonials = await response.json();
        
        testimonialsSlider.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial">
                <div class="testimonial-avatar" style="background-image: url('${testimonial.avatar}')"></div>
                <div class="testimonial-content">
                    <p>"${testimonial.text}"</p>
                    <span class="testimonial-author">${testimonial.name}</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadTestimonials();
    updateAuthStatus();
});