async function fetchProfileData() {
    try {
        // Tenta carregar do GitHub primeiro
        const url = 'https://raw.githubusercontent.com/ThiagoSPaixao/js-developer-portfolio/main/data/profile.json';
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Não foi possível carregar do GitHub');
        }
        
        const profileData = await response.json();
        return profileData;
    } catch (error) {
        console.log('Carregando dados locais:', error);
        
        // Fallback para dados locais
        const localData = {
            "name": "Thiago S. Paixão",
            "photo": "https://avatars.githubusercontent.com/u/152554911?v=4",
            "job": "Desenvolvedor Júnior",
            "location": "Recife - PE",
            "phone": "(81) 99237-9778",
            "email": "thiaguinhoescolhido26@gmail.com",
            "skills": {
                "hardSkills": [
                    {"name": "TypeScript", "logo": "assets/img/skills/typescript.png"},
                    {"name": "JavaScript", "logo": "assets/img/skills/js.png"},
                    {"name": "HTML", "logo": "assets/img/skills/html.png"},
                    {"name": "CSS", "logo": "assets/img/skills/css.png"},
                    {"name": "Git", "logo": "assets/img/skills/git.png"},
                    {"name": "GitHub", "logo": "assets/img/skills/github.png"},
                    {"name": "VSCode", "logo": "assets/img/skills/vscode.png"},
                    {"name": "Windows", "logo": "assets/img/skills/windows.png"}
                ],
                "softSkills": [
                    "Empatia", "Liderança", "Trabalho em equipe", "Flexibilidade", 
                    "Organização", "Rápido Aprendizado", "Proatividade"
                ]
            },
            "languages": ["Português BR", "Inglês (Básico)"],
            "portfolio": [
                {
                    "name": "Criando o meu Portfólio utilizando HTML, CSS e JavaScript",
                    "url": "https://github.com/ThiagoSPaixao/js-developer-portfolio.git",
                    "github": true
                },
                {
                    "name": "Criando um extrator de áudio para Youtube",
                    "url": "https://github.com/ThiagoSPaixao/Youtube_Extractor_Python",
                    "github": true
                },
                {
                    "name": "Dominando o protocolo HTTP e integrando-se com PokeAPI",
                    "url": "https://github.com/ThiagoSPaixao/Pokedex.git",
                    "github": true
                },
                {
                    "name": "Criando um Jogo da Velha com IA",
                    "url": "https://github.com/ThiagoSPaixao/Jogo-da-Velha.git",
                    "github": true
                },
                {
                    "name": "Elaborando um projeto com a DIO",
                    "url": "https://github.com/ThiagoSPaixao/dio-lab-open-source.git",
                    "github": true
                }
            ],
            "professionalExperience": [
                {
                    "name": "Projetos Pessoais",
                    "period": "2023 - Presente",
                    "description": "Desenvolvimento de diversos projetos pessoais utilizando tecnologias como JavaScript, TypeScript, HTML, CSS e Python. Criação de aplicações web, scripts de automação e integração com APIs."
                },
                {
                    "name": "Desafios de Programação",
                    "period": "2023 - Presente",
                    "description": "Resolução de desafios de código e participação em bootcamps da Digital Innovation One. Desenvolvimento de habilidades em lógica de programação, algoritmos e boas práticas de desenvolvimento."
                }
            ]
        };
        
        return localData;
    }
}