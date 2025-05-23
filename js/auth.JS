

// Cadastro
async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const cpf = document.getElementById('register-cpf').value;
    const phone = document.getElementById('register-phone').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    try {
        const newUser = await api.registerUser({
            name,
            cpf,
            phone,
            email,
            password
        });
        
        alert(`Cadastro realizado com sucesso, ${newUser.name}! Faça login para continuar.`);
        window.location.href = 'login.html';
    } catch (error) {
        alert(error.message);
    }
}

// Área do cliente - carrega dados do usuário
async function loadClientData() {
    const user = await api.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return;
    }
    
    // Preenche os dados do usuário na página
    if (document.getElementById('client-name')) {
        document.getElementById('client-name').textContent = user.name;
    }
    if (document.getElementById('client-email')) {
        document.getElementById('client-email').textContent = user.email;
    }
}

// Atualiza o status de autenticação no header
async function updateAuthStatus() {
    const authButtons = document.querySelector('.auth-buttons');
    if (!authButtons) return;
    
    try {
        const user = await api.getCurrentUser();
        if (user) {
            authButtons.innerHTML = `
                <a href="carrinho.html" id="cart-icon" class="cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </a>
                <a href="area-cliente.html" class="btn btn-outline">Minha Conta</a>
                <button id="logout-btn" class="btn btn-primary">Sair</button>
            `;
            
            document.getElementById('logout-btn').addEventListener('click', async () => {
                await api.logoutUser();
                window.location.href = 'index.html';
            });
        }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
    }
}

// Inicialização das páginas de autenticação
document.addEventListener('DOMContentLoaded', () => {
    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Cadastro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Atualiza status de autenticação
    updateAuthStatus();
    
    // Carrega dados do cliente se estiver na área logada
    if (window.location.pathname.includes('area-cliente') || 
        window.location.pathname.includes('carrinho')) {
        loadClientData();
    }
});
