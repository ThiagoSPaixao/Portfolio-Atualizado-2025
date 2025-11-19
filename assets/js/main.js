// Função para simular um delay (para ver a tela de loading)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateProfileInfo(profileData) {
    const photo = document.getElementById('profile.photo');
    photo.src = profileData.photo;
    photo.alt = profileData.name;

    const name = document.getElementById('profile.name');
    name.innerText = profileData.name;

    const job = document.getElementById('profile.job');
    if (job.querySelector('span')) {
        job.querySelector('span').innerText = profileData.job;
    } else {
        job.innerText = profileData.job;
    }

    const location = document.getElementById('profile.location');
    if (location.querySelector('span')) {
        location.querySelector('span').innerText = profileData.location;
    } else {
        location.innerText = profileData.location;
    }

    const phone = document.getElementById('profile.phone');
    phone.innerText = profileData.phone;
    phone.href = `tel:${profileData.phone}`;

    const email = document.getElementById('profile.email');
    email.innerText = profileData.email;
    email.href = `mailto:${profileData.email}`;
}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile.skills.softSkills');
    if (profileData.skills && profileData.skills.softSkills) {
        softSkills.innerHTML = profileData.skills.softSkills.map(skill => `
            <div class="soft-skill-item">${skill}</div>
        `).join('');
    }
}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile.skills.hardSkills');
    if (profileData.skills && profileData.skills.hardSkills) {
        hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `
            <div class="skill-item">
                <img src="${skill.logo}" alt="${skill.name}" title="${skill.name}" class="skill-icon">
                <p class="skill-name">${skill.name}</p>
            </div>
        `).join('');
    }
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages');
    if (profileData.languages) {
        languages.innerHTML = profileData.languages.map(language => {
            return `
                <li>
                    ${language}
                </li>
            `;
        }).join('');
    }
}

function updatePortfolio(profileData) {
    const portfolio = document.getElementById('profile.portfolio');
    if (profileData.portfolio) {
        portfolio.innerHTML = profileData.portfolio.map(project => {
            // Determinar tecnologias baseadas no projeto
            let technologies = ['JavaScript', 'HTML', 'CSS'];
            if (project.name.includes('TypeScript') || project.url.includes('typescript')) {
                technologies = ['TypeScript', 'JavaScript', 'HTML', 'CSS'];
            } else if (project.name.includes('Python')) {
                technologies = ['Python'];
            } else if (project.name.includes('DIO')) {
                technologies = ['Git', 'GitHub', 'Open Source'];
            }
            
            return `
                <div class="portfolio-item" data-tech="${technologies.map(tech => tech.toLowerCase()).join(' ')}">
                    <div class="portfolio-header">
                        <i class="${project.github ? 'fab fa-github' : 'fas fa-external-link-alt'}"></i>
                        <h3>${project.name}</h3>
                    </div>
                    <div class="portfolio-body">
                        <p class="portfolio-description">Projeto desenvolvido ${project.name.includes('DIO') ? 'como parte do bootcamp da Digital Innovation One' : 'para demonstrar habilidades em desenvolvimento web'}.</p>
                        <div class="portfolio-footer">
                            <a href="${project.url}" target="_blank" class="portfolio-link">
                                Ver Projeto <i class="fas fa-arrow-right"></i>
                            </a>
                            <div class="portfolio-tech">
                                ${technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Adicionar funcionalidade de filtro
        setupPortfolioFilter();
    }
}

function setupPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-tech').includes(filter)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function updateProfessionalExperience(profileData) {
    const professionalExperience = document.getElementById('profile.professionalExperience');
    if (profileData.professionalExperience) {
        professionalExperience.innerHTML = profileData.professionalExperience.map(experience => {
            return `
                <li class="experience-item">
                    <div class="experience-header">
                        <h3 class="title">${experience.name}</h3>
                        <span class="period">
                            <i class="fas fa-calendar-alt"></i>
                            ${experience.period}
                        </span>
                    </div>
                    <p class="experience-description">${experience.description}</p>
                </li>
            `;
        }).join('');
    }
}

// Esconder tela de loading quando a página carregar
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
});

(async () => {
    try {
        // Mostrar loading
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }

        // Pequeno delay para garantir que o loading seja visível
        await delay(500);
        
        const profileData = await fetchProfileData();
        
        // Atualizar todas as seções
        updateProfileInfo(profileData);
        updateSoftSkills(profileData);
        updateHardSkills(profileData);
        updateLanguages(profileData);
        updatePortfolio(profileData);
        updateProfessionalExperience(profileData);
        
        // Esconder loading após um pequeno delay
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 500);
        
    } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #FF6584; margin-bottom: 1rem;"></i>
                    <p>Erro ao carregar o portfólio. Por favor, recarregue a página.</p>
                    <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1.5rem; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-redo"></i> Recarregar
                    </button>
                </div>
            `;
        }
    }
})();