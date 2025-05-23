// Dados dos cômodos e dispositivos
const homeData = {
    sala: {
        icon: 'fa-couch',
        devices: {
            luz: { name: 'Luz Principal', type: 'switch', state: false },
            ventilador: { name: 'Ventilador', type: 'switch', state: false }
        }
    },
    quarto1: {
        icon: 'fa-bed',
        devices: {
            luz: { name: 'Luz', type: 'switch', state: false },
            abajur: { name: 'Abajur', type: 'switch', state: false }
        }
    },
    quarto2: {
        icon: 'fa-bed',
        devices: {
            luz: { name: 'Luz', type: 'switch', state: false },
            ventilador: { name: 'Ventilador de Teto', type: 'switch', state: false }
        }
    },
    garagem: {
        icon: 'fa-car',
        devices: {
            luz: { name: 'Luz da Garagem', type: 'switch', state: false },
            portao: { name: 'Portão', type: 'action', state: false }
        }
    }
};

// Elementos do DOM
const roomsContainer = document.getElementById('roomsContainer');
const controlModal = document.getElementById('controlModal');
const closeModal = document.getElementById('closeModal');
const modalRoomName = document.getElementById('modalRoomName');
const modalIcon = document.getElementById('modalIcon');
const deviceList = document.getElementById('deviceList');
const notification = document.getElementById('notification');

// Carregar os cômodos na página
function loadRooms() {
    roomsContainer.innerHTML = '';
    
    for (const [roomId, roomData] of Object.entries(homeData)) {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.innerHTML = `
            <div class="room-icon">
                <i class="fas ${roomData.icon}"></i>
            </div>
            <div class="room-name">${formatRoomName(roomId)}</div>
            <div class="room-devices">
                ${Object.keys(roomData.devices).length} dispositivo(s)
            </div>
        `;
        
        roomCard.addEventListener('click', () => openControlModal(roomId));
        roomsContainer.appendChild(roomCard);
    }
}

// Abrir modal de controle para um cômodo específico
function openControlModal(roomId) {
    const roomData = homeData[roomId];
    
    // Atualizar cabeçalho do modal
    modalRoomName.textContent = formatRoomName(roomId);
    modalIcon.className = `fas ${roomData.icon}`;
    
    // Limpar lista de dispositivos
    deviceList.innerHTML = '';
    
    // Adicionar cada dispositivo ao modal
    for (const [deviceId, deviceData] of Object.entries(roomData.devices)) {
        const deviceItem = document.createElement('div');
        deviceItem.className = 'device-item';
        
        if (deviceData.type === 'switch') {
            // Dispositivos com liga/desliga (luzes, ventiladores)
            deviceItem.innerHTML = `
                <div class="device-name">
                    <span class="status-indicator ${deviceData.state ? 'status-on' : 'status-off'}"></span>
                    ${deviceData.name}
                </div>
                <div class="device-controls">
                    <button class="btn btn-on" data-room="${roomId}" data-device="${deviceId}" data-action="on">Ligar</button>
                    <button class="btn btn-off" data-room="${roomId}" data-device="${deviceId}" data-action="off">Desligar</button>
                </div>
            `;
        } else if (deviceData.type === 'action') {
            // Dispositivos com ações específicas (portão)
            deviceItem.innerHTML = `
                <div class="device-name">
                    <span class="status-indicator ${deviceData.state ? 'status-on' : 'status-off'}"></span>
                    ${deviceData.name}
                </div>
                <div class="device-controls">
                    <button class="btn btn-action" data-room="${roomId}" data-device="${deviceId}" data-action="open">Abrir</button>
                    <button class="btn btn-action" data-room="${roomId}" data-device="${deviceId}" data-action="close">Fechar</button>
                </div>
            `;
        }
        
        deviceList.appendChild(deviceItem);
    }
    
    // Mostrar o modal
    controlModal.style.display = 'flex';
    
    // Adicionar event listeners aos botões
    document.querySelectorAll('.btn-on, .btn-off, .btn-action').forEach(btn => {
        btn.addEventListener('click', handleDeviceControl);
    });
}

// Fechar o modal
closeModal.addEventListener('click', () => {
    controlModal.style.display = 'none';
});

// Fechar modal ao clicar fora
controlModal.addEventListener('click', (e) => {
    if (e.target === controlModal) {
        controlModal.style.display = 'none';
    }
});

// Manipular controle dos dispositivos
function handleDeviceControl(e) {
    const roomId = e.target.dataset.room;
    const deviceId = e.target.dataset.device;
    const action = e.target.dataset.action;
    
    // Atualizar estado do dispositivo
    if (action === 'on' || action === 'off') {
        homeData[roomId].devices[deviceId].state = (action === 'on');
        showNotification(`${homeData[roomId].devices[deviceId].name} ${action === 'on' ? 'ligado' : 'desligado'}`);
    } else if (action === 'open' || action === 'close') {
        homeData[roomId].devices[deviceId].state = (action === 'open');
        showNotification(`Portão ${action === 'open' ? 'abrindo' : 'fechando'}...`);
        
        // Simular tempo de operação do portão
        setTimeout(() => {
            showNotification(`Portão ${action === 'open' ? 'aberto' : 'fechado'}`);
        }, 2000);
    }
    
    // Atualizar visualização do modal
    openControlModal(roomId);
}

// Mostrar notificação
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Formatar nome do cômodo (ex: "quarto1" -> "Quarto 1")
function formatRoomName(roomId) {
    if (roomId === 'quarto1') return 'Quarto 1';
    if (roomId === 'quarto2') return 'Quarto 2';
    return roomId.charAt(0).toUpperCase() + roomId.slice(1);
}

// Inicializar a página quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    loadRooms();
    
    // Carregar estados salvos do localStorage se existirem
    const savedStates = localStorage.getItem('deviceStates');
    if (savedStates) {
        const states = JSON.parse(savedStates);
        for (const [roomId, devices] of Object.entries(states)) {
            for (const [deviceId, state] of Object.entries(devices)) {
                if (homeData[roomId] && homeData[roomId].devices[deviceId]) {
                    homeData[roomId].devices[deviceId].state = state;
                }
            }
        }
    }
    
    // Salvar estados no localStorage quando a página for fechada
    window.addEventListener('beforeunload', () => {
        const statesToSave = {};
        for (const [roomId, roomData] of Object.entries(homeData)) {
            statesToSave[roomId] = {};
            for (const [deviceId, deviceData] of Object.entries(roomData.devices)) {
                statesToSave[roomId][deviceId] = deviceData.state;
            }
        }
        localStorage.setItem('deviceStates', JSON.stringify(statesToSave));
    });
});