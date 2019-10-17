import Component from '../component.js';

import AchievementsData from '../../models/achievementsData.js'

class Achievements extends Component {
	constructor() {
		super();
		
		this.model = new AchievementsData();
    }

    getData() {
        return new Promise(resolve => this.model.getAchievementsList().then(questions => resolve(questions)));
	}

    render(achievements) {
        return new Promise(resolve => {
            resolve(`
                <div class="achievement-content">
                    <button class="menu-button js-back-button">Назад</button>
                    <h1 class="achievements-captions">Результаты игр</h1>
                    <div class="acievements-conteiner">
                        <ul class="achievements-list">
                            ${achievements.map(achievement => this.getAchievementHTML(achievement)).join('\n ')}
                        </ul>
                    </div>
                </div>
            `);
        });
    }

    afterRender() {
        this.setActions();    
    }

    setActions(){
        const btnBack = document.getElementsByClassName('js-back-button')[0];

        btnBack.addEventListener('click', () => location.hash = '/');
    }

    getAchievementHTML(achievement){
        return `
            <li>${achievement.nickname}___${achievement.value}</li>
        `;
    }
}

export default Achievements;