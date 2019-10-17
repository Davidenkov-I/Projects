import Component from '../component.js';

class Credits extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
            <div class="credits">
                <div class='credits__conteiner'>
                    <div class="credits__text">
                        <p class="credits__text-heading">Об игре</h1>
                        <p class="credits__text-base">Данная игра разработана как дипломный проект по курсу JavaScript в IT-Academy</p>
                        <p class="credits__text-heading">Разработчики</p>
                        <p class="credits__text-base">Главный программист, главный дизайнер, тестировщик - Давыденков Илья Дмитриевич</p>
                        <p class="credits__text-heading">Версия:</p>
                        <p class="credits__text-base">v0.8 beta</p>
                    </div>
                    <button class="menu-button js-back-button">Назад</button>
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
}

export default Credits;