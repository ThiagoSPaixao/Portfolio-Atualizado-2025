const acordeonTriggers = document.querySelectorAll('.acordeon .trigger')

acordeonTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
        const acordeon = trigger.parentElement
        const isOpen = acordeon.classList.contains('open')

        // Fechar todos os acordeões
        document.querySelectorAll('.acordeon.open').forEach(openAcordeon => {
            if (openAcordeon !== acordeon) {
                openAcordeon.classList.remove('open')
            }
        })

        // Alternar estado do acordeão clicado
        if (isOpen) {
            acordeon.classList.remove('open')
        } else {
            acordeon.classList.add('open')
        }
    })
})

// Abrir primeiro acordeão por padrão
document.querySelector('.acordeon').classList.add('open')