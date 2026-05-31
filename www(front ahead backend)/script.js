// ============================================
// УВЕДОМЛЕНИЯ
// ============================================

// Функция создания уведомления
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
    `;
    
    container.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease';
    }, 10);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 5000);
}

// Тестовые уведомления
const testNotifications = [
    { title: 'Новый файл', message: 'Пользователь Ivan загрузил файл document.pdf', type: 'success' },
    { title: 'Доступ предоставлен', message: 'Maria предоставила вам доступ к файлу', type: 'info' },
    { title: 'Ошибка', message: 'Не удалось загрузить файл. Размер превышен', type: 'error' },
    { title: 'Система', message: 'Проверьте новые файлы в общем доступе', type: 'info' },
];

let notificationIndex = 0;

// Автоматическая отправка тестовых уведомлений каждые 15 секунд
setInterval(() => {
    const notif = testNotifications[notificationIndex % testNotifications.length];
    showNotification(notif.title, notif.message, notif.type);
    notificationIndex++;
}, 15000);

// Обработчик для кнопки уведомлений в навбаре
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            const notif = testNotifications[Math.floor(Math.random() * testNotifications.length)];
            showNotification(notif.title, notif.message, notif.type);
            
            // Анимация нажатия
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// Вызов уведомления по нажатию пробела
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        const notif = testNotifications[Math.floor(Math.random() * testNotifications.length)];
        showNotification(notif.title, notif.message, notif.type);
    }
});

// ============================================
// ГЛАВНАЯ СТРАНИЦА - DRAG AND DROP
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const uploadBtn = document.getElementById('uploadBtn');
    const warningMessage = document.getElementById('warningMessage');
    
    if (uploadArea && fileInput && uploadBtn) {
        const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 МБ
        
        // Обработчик клика по кнопке
        uploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            fileInput.click();
            
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Обработчик клика по области загрузки
        uploadArea.addEventListener('click', function() {
            fileInput.click();
        });
        
        // Обработчик выбора файла через диалог
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleFile(file);
            }
        });
        
        // Обработчики drag and drop
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file) {
                handleFile(file);
            }
        });
        
        function handleFile(file) {
            if (file.size > MAX_FILE_SIZE) {
                // Файл слишком большой
                warningMessage.textContent = 'Файл слишком большой! Максимальный размер: 100 МБ';
                warningMessage.classList.add('error');
                
                // Анимация встряхивания
                warningMessage.style.animation = 'shake 0.5s ease';
                setTimeout(() => {
                    warningMessage.style.animation = '';
                }, 500);
                
                showNotification('Ошибка', `Файл ${file.name} превышает допустимый размер`, 'error');
            } else {
                // Файл в порядке
                warningMessage.textContent = 'Максимальный размер файла: 100 МБ';
                warningMessage.classList.remove('error');
                
                showNotification('Успех', `Файл ${file.name} успешно загружен`, 'success');
            }
        }
    }
});

// ============================================
// ЧАТ - АВТОМАТИЧЕСКАЯ ПРОКРУТКА ВНИЗ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        // Прокрутка вниз при загрузке
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Прокрутка при отправке сообщения (демо)
        const sendBtn = document.querySelector('.send-btn');
        const chatInput = document.getElementById('chatInput');
        
        if (sendBtn && chatInput) {
            sendBtn.addEventListener('click', function() {
                if (chatInput.value.trim() !== '') {
                    // Создаем новое сообщение
                    const newMessage = document.createElement('div');
                    newMessage.className = 'message my-message';
                    newMessage.innerHTML = `
                        <span class="message-author">Я:</span>
                        <span class="message-text">${chatInput.value}</span>
                    `;
                    
                    chatMessages.appendChild(newMessage);
                    chatInput.value = '';
                    
                    // Прокрутка вниз
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Анимация кнопки
                    this.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 150);
                }
            });
            
            // Отправка по Enter
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendBtn.click();
                }
            });
        }
    }
});

// ============================================
// СПИСОК ПОЛЬЗОВАТЕЛЕЙ
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserInput = document.getElementById('addUserInput');
    
    if (addUserBtn && addUserInput) {
        addUserBtn.addEventListener('click', function() {
            addUserInput.style.display = 'flex';
            
            // Анимация нажатия
            this.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
        
        const confirmAddBtn = document.querySelector('.confirm-add-btn');
        if (confirmAddBtn) {
            confirmAddBtn.addEventListener('click', function() {
                const input = addUserInput.querySelector('input');
                if (input && input.value.trim() !== '') {
                    showNotification('Успех', `Пользователь ${input.value} добавлен`, 'success');
                    addUserInput.style.display = 'none';
                    input.value = '';
                }
            });
        }
    }
    
    // Обработчики для пользователей в списке
    const userItems = document.querySelectorAll('.user-item');
    userItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Не срабатывает при клике на кнопки действий
            if (e.target.closest('.user-action-btn')) return;
            
            const actions = this.querySelector('.user-actions');
            if (actions) {
                const isVisible = actions.style.display === 'flex';
                actions.style.display = isVisible ? 'none' : 'flex';
            }
        });
    });
});

// ============================================
// АВТОРИЗАЦИЯ - ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (authTabs.length > 0 && loginForm && registerForm) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Убираем активный класс со всех вкладок
                authTabs.forEach(t => t.classList.remove('active'));
                // Добавляем активный класс на текущую
                this.classList.add('active');
                
                // Показываем/скрываем формы
                if (tabName === 'login') {
                    loginForm.style.display = 'flex';
                    registerForm.style.display = 'none';
                } else {
                    loginForm.style.display = 'none';
                    registerForm.style.display = 'flex';
                }
                
                // Анимация нажатия
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
        
        // Предотвращаем отправку форм (демо)
        const forms = document.querySelectorAll('.auth-form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Информация', 'Демо-режим: авторизация не реализована', 'info');
            });
        });
    }
});

// ============================================
// АНИМАЦИЯ ДЛЯ КНОПОК
// ============================================

// Добавляем анимацию нажатия для всех кнопок
document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// ДОПОЛНИТЕЛЬНЫЕ АНИМАЦИИ
// ============================================

// Анимация встряхивания для ошибок
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Плавное появление страницы
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
});

console.log('FileShare - Фронтенд загружен');
console.log('Нажмите ПРОБЕЛ для тестового уведомления');