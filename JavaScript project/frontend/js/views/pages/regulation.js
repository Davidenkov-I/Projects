import Component from '../component.js';

class Regulation extends Component {
    render() {
        return new Promise(resolve => {
            resolve(`
            <div class="regulations">
                <div class="regulations__conteiner">
                    <div class="regulations__text-conteiner">
                        <p class="regulations-text">Задается вопрос и выдается 4 варианта ответа, один из которых является верным. 
                            Отвечая на заданный вопрос игрок зарабатывает определенную сумму денег, которая возрастает от вопроса к вопросу. 
                            Также в распоряжении игрока имеется 3 подсказки: звонок другу, 50 на 50, и помощь зала.
                        </p>
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

export default Regulation;