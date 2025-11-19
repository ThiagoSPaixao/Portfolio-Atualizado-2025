// Gerenciamento de tema claro/escuro
const themeToggle = document.getElementById('themeToggle')
const themeIcon = themeToggle.querySelector('i')

// Verificar preferência salva ou preferência do sistema
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

// Aplicar tema salvo
document.documentElement.setAttribute('data-theme', savedTheme)
updateThemeIcon(savedTheme)

// Alternar tema
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    updateThemeIcon(newTheme)
})

// Atualizar ícone do tema
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon')
        themeIcon.classList.add('fa-sun')
    } else {
        themeIcon.classList.remove('fa-sun')
        themeIcon.classList.add('fa-moon')
    }
}