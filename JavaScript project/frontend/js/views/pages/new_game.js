import Component from '../component.js';

import Questions from '../../models/questions.js';

class NewGame extends Component {
	constructor() {
		super();
		
        this.model = new Questions();
    }

    getData() {
        return new Promise(resolve => this.model.getQuestions().then(questions => resolve(questions)));
    }


    render() {
        return new Promise(resolve => {
            resolve(`
            <div class="new-game">
                <div class="new-game__conteiner">
                    <form class="new-game__nickname">
                        <p class="new-game__text-form">Введите имя:</p>
                        <input class="new-game__input-field" type="text" maxlength="45">
                        <button class="new-game__button-form js-button-nickname" type="submit" disabled>Начать игру</button>
                    </form>
                </div>
                <button class="menu-button js-back-button">Назад</button>
                <p class="new-game__conect-text"></p>
            </div>
            `);
        });
    }

    afterRender() {
        this.setActions();
        this.getData().then(data => {    
            if(!localStorage.getItem('questions')){
                localStorage.setItem('questions', JSON.stringify(data));
            }
        }); 
    }

    setActions(){
        const btnNickname = document.getElementsByClassName('js-button-nickname')[0],
            inputNickname = document.getElementsByClassName('new-game__input-field')[0],
            btnBack = document.getElementsByClassName('js-back-button')[0];

        inputNickname.addEventListener('keydown', () => {
            inputNickname.value ? btnNickname.disabled = false : btnNickname.disabled = true;
        });
        btnNickname.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.setItem('nickname', JSON.stringify(inputNickname.value));
            localStorage.setItem('status', JSON.stringify(1));
            localStorage.setItem('hints', JSON.stringify({ fifty : 1, hall : 1, call : 1 }));
            localStorage.setItem('game-status', JSON.stringify('game'));
            localStorage.setItem('gameInformation', JSON.stringify( { answerFalse: 0, answerTrue : 0 }));
            location.hash = '/game_window';
        });
        btnBack.addEventListener('click', () => location.hash = '/');
    }
}

export default NewGame;