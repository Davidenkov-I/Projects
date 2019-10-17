import Component from '../component.js';

class MainMenu extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
            <div class="main-menu">
                <div class="main-menu__conteiner">
                    <button class="menu-button js-button__new-game">Новая игра</button>
                    <button class="menu-button js-button__options" disabled>Настройки</button>
                    <button class="menu-button js-button__achievements">Рекорды</button>
                    <button class="menu-button js-button__credits">Об игре</button>
                    <button class="menu-button js-button__regulation">Правила</button>
                </div>
            </div>
            `);
        });
    }

    afterRender() {
        this.setActions();    
    }

    setActions(){
        const btnNewGame = document.getElementsByClassName('js-button__new-game')[0],
            //btnOptions = document.getElementsByClassName('js-button__options')[0],
            btnAchievement = document.getElementsByClassName('js-button__achievements')[0],
            btnCredits = document.getElementsByClassName('js-button__credits')[0],
            btnRegulation = document.getElementsByClassName('js-button__regulation')[0];

        btnNewGame.addEventListener('click', () => location.hash = '/new_game');
        //
        btnAchievement.addEventListener('click', () => location.hash = '/achievements');
        btnCredits.addEventListener('click', () => location.hash = '/credits');
        btnRegulation.addEventListener('click', () => location.hash = '/regulation');
    }
}

export default MainMenu;