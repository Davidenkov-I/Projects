import Component from '../component.js';

class Win extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
                <h1 class="page-title">Вы выиграли!!!</h1>
                <div class="win-conteiner">
                    <button class="menu-button button__main-menu button__win">Главное меню</button>
                </div>
            `);
        });
    }

    afterRender() {
        this.setActions();    
    }

    setActions(){
        const btnMainMenu = document.getElementsByClassName('button__main-menu')[0];

        btnMainMenu.addEventListener('click', () => location.hash = '/');
    }
}

export default Win;