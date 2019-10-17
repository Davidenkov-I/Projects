import Component from '../component.js';

import AchievementsData from '../../models/achievementsData.js';

class GameWindow extends Component {
	constructor() {
		super();
		
        this.achievement = new AchievementsData();
    }
    
    getDataAchievements() {
        return new Promise(resolve => this.achievement.getAchievementsList().then(achievement => resolve(achievement)));
	}
    


    render() {
        return new Promise(resolve => {
            resolve(`
            <div class="game-window">
                <div class="game-window__left">
                    <div class="game-left__screen">

                    </div>
                    <div class="game-left__questions">
                        <div class="question-field">
                            <p class="questions-text">Место для различных вопросов в игре</p>
                        </div>
                        <div class="answers-field answers-field__top">
                            <button class="button-answer js-button-answer_A" data-value="A" data-active="true"><span>A:</span></button>
                            <button class="button-answer js-button-answer_B" data-value="B" data-active="true"><span>B:</span></button>
                        </div>
                        <div class="answers-field answers-field__bottom">
                            <button class="button-answer js-button-answer_C" data-value="C" data-active="true"><span>C:</span></button>
                            <button class="button-answer js-button-answer_D" data-value="D" data-active="true"><span>D:</span></button>
                        </div>
                    </div>
                </div>
                <div class="game-window__right">
                    <div class="right-field__menu">
                        <button class="menu-button button__main-menu">Главное меню</button>
                        <button class="menu-button button__give-money">Забрать деньги</button>
                    </div>
                    <div class="right-field__hints">
                        <button class="botton-hint js-botton-hint__50">50/50</button>
                        <button class="botton-hint js-botton-hint__hall">Помощь зала</button>
                        <button class="botton-hint js-botton-hint__call">Звонок другу</button>
                    </div>
                    <div class="right-field__stages">
                        <ul class="stages-conteiner">
                            <li class="fireproof">1000000</li>
                            <li>500000</li>
                            <li>250000</li>
                            <li>126000</li>
                            <li>64000</li>
                            <li class="fireproof">32000</li>
                            <li>16000</li>
                            <li>8000</li>
                            <li>4000</li>
                            <li>2000</li>
                            <li class="fireproof">1000</li>
                            <li>500</li>
                            <li>300</li>
                            <li>200</li>
                            <li>100</li>
                        </ul>
                    </div>
                </div>
            </div>
            `);
        });
    }

    afterRender() {
        this.setActions();
    }

    setActions(){
        const btnBack = document.getElementsByClassName('button__main-menu')[0],
            btnGiveMoney = document.getElementsByClassName('button__give-money')[0],
            btnHint50 = document.getElementsByClassName('js-botton-hint__50')[0],
            btnHintHall = document.getElementsByClassName('js-botton-hint__hall')[0],
            btnHintCall = document.getElementsByClassName('js-botton-hint__call')[0],
            btnsAnswer = [
                document.getElementsByClassName('js-button-answer_A')[0],
                document.getElementsByClassName('js-button-answer_B')[0],
                document.getElementsByClassName('js-button-answer_C')[0],
                document.getElementsByClassName('js-button-answer_D')[0]
            ],
            questionText = document.getElementsByClassName('questions-text')[0],
            stages = document.getElementsByTagName('li'),
            screen = document.getElementsByClassName('game-left__screen')[0];



        let questions = JSON.parse(localStorage.getItem('questions')),
            hints = JSON.parse(localStorage.getItem('hints')),
            status = +JSON.parse(localStorage.getItem('status')),
            questionNumber = this.questionNumber(),
            nickname = JSON.parse(localStorage.getItem('nickname'));


        
        hints.fifty === 1 ? btnHint50.disabled = false : btnHint50.disabled = true;
        hints.hall === 1 ? btnHintHall.disabled = false : btnHintHall.disabled = true;
        hints.call === 1 ? btnHintCall.disabled = false : btnHintCall.disabled = true;

        this.questionsLoad(questions, status, questionNumber, questionText, btnsAnswer, stages, btnGiveMoney, btnHint50, btnHintHall, btnHintCall);




        btnBack.addEventListener('click', () => {
            if (confirm('Вы уверены что хотите выйти?')){
                location.hash = '/';
            }            
        });
        btnGiveMoney.addEventListener('click', () => {
            if (confirm('Вы уверены что хотите забрать деньги?')){
                this.saveAchievements(nickname, this.decipherStageGiveMoney(JSON.parse(localStorage.getItem('status'))));
                location.hash = '/';
            }            
        });

        btnHint50.addEventListener('click', () =>{
            btnHint50.disabled = true;
            hints.fifty = 0;
            localStorage.setItem('hints', JSON.stringify(hints));

            this.btnFifty(questions, JSON.parse(localStorage.getItem('status')), questionNumber , btnsAnswer);
        });
        btnHintHall.addEventListener('click', () =>{
            btnHintHall.disabled = true;
            hints.hall = 0;
            localStorage.setItem('hints', JSON.stringify(hints));

            this.btnHall(questions, JSON.parse(localStorage.getItem('status')), questionNumber, screen);
        });
        btnHintCall.addEventListener('click', () =>{
            btnHintCall.disabled = true;
            hints.call = 0;
            localStorage.setItem('hints', JSON.stringify(hints));

            this.btnCall(questions, JSON.parse(localStorage.getItem('status')), questionNumber, screen);
        });

        btnsAnswer[0].addEventListener('click', () =>{
            this.btnAnswer(questions, questionNumber, JSON.parse(localStorage.getItem('status')), btnsAnswer[0], btnsAnswer, nickname, questionText, stages, btnGiveMoney, btnHint50, btnHintHall, btnHintCall);
        });
        btnsAnswer[1].addEventListener('click', () =>{
            this.btnAnswer(questions, questionNumber, JSON.parse(localStorage.getItem('status')), btnsAnswer[1], btnsAnswer, nickname, questionText, stages, btnGiveMoney, btnHint50, btnHintHall, btnHintCall);
        });
        btnsAnswer[2].addEventListener('click', () =>{
            this.btnAnswer(questions, questionNumber, JSON.parse(localStorage.getItem('status')), btnsAnswer[2], btnsAnswer, nickname, questionText, stages, btnGiveMoney, btnHint50, btnHintHall, btnHintCall);
        });
        btnsAnswer[3].addEventListener('click', () =>{
            this.btnAnswer(questions, questionNumber, JSON.parse(localStorage.getItem('status')), btnsAnswer[3], btnsAnswer, nickname, questionText, stages, btnGiveMoney, btnHint50, btnHintHall, btnHintCall);
        });


    }

    questionsLoad(questions, status, questionNumber, questionText, btnsAnswer, stages, btnGiveMoney, btnHint50, btnHintHall, btnHintCall){
        questionText.innerHTML = questions[status][questionNumber]['question'];
        btnsAnswer[0].innerHTML = `<span>A:</span> ${questions[status][questionNumber]['a']}`;
        btnsAnswer[1].innerHTML = `<span>B:</span> ${questions[status][questionNumber]['b']}`;
        btnsAnswer[2].innerHTML = `<span>C:</span> ${questions[status][questionNumber]['c']}`;
        btnsAnswer[3].innerHTML = `<span>D:</span> ${questions[status][questionNumber]['d']}`;

        btnsAnswer.forEach(element => {
            element.disabled = false;
            if(element.classList.contains('answer-true')){
                element.classList.remove('answer-true');
            }
        });

        this.stageLoad(status, stages);

        if(JSON.parse(localStorage.getItem('game-status')) == 'losing'){
            this.editGameLosing(btnsAnswer, btnGiveMoney, btnHint50, btnHintHall, btnHintCall);
        }
    }

    stageLoad(status, stages){
        if(status<16){
            let index = stages.length - status;
            stages[index].classList.add('stages-focus');
            if(index < 14 && index >= 0){
                if(stages[index + 1].classList.contains('stages-focus')){
                    stages[index + 1].classList.remove('stages-focus');
                }
            }
        }
    }


    questionNumber(){
        if(localStorage.getItem('questionNumber')){
            return JSON.parse(localStorage.getItem('questionNumber'));
        } else {
            return 1;
        }
    }

    btnFifty(questions, status, questionNumber , btnsAnswer){
        const twoOption = twoLetter(questions, status, questionNumber);

        fiftyOfFifty(twoOption, btnsAnswer);

        function fiftyOfFifty (twoOption, btnsAnswer){

            for(let i = 0; i < twoOption.length; i++){
                clearBtn(twoOption[i], btnsAnswer);
            }

            function clearBtn(letter, btnsAnswer){
                switch(letter){
                    case 'A': 
                        btnsAnswer[0].disabled = true;
                        btnsAnswer[0].innerHTML = '';
                        break;
                    case 'B': 
                        btnsAnswer[1].disabled = true;
                        btnsAnswer[1].innerHTML = '';
                        break;
                    case 'C': 
                        btnsAnswer[2].disabled = true;
                        btnsAnswer[2].innerHTML = '';
                        break;
                    case 'D': 
                        btnsAnswer[3].disabled = true;
                        btnsAnswer[3].innerHTML = '';
                        break;    
                }
            }
        }

        function twoLetter(questions, status, questionNumber) {
            let i = 0;
            const number = [];
            while (i < 1) {
                number[0] = transformNumberToLetter(getRandomInt(1, 5));
                if(number[0] !== questions[status][questionNumber]['answer']){
                    i++;
                }
            }
            i = 0;
            while (i < 1) {
                number[1] = transformNumberToLetter(getRandomInt(1, 5));
                if(number[1] !== questions[status][questionNumber]['answer'] && number[0] !== number[1]){
                    i++;
                }
            }

            return number;
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        function transformNumberToLetter(number){
            switch(number){
                case 1:
                    return 'A';
                case 2:
                    return 'B';
                case 3:
                    return 'C';
                case 4:
                    return 'D';
            }
        }
    }

    btnHall(questions, status, questionNumber, screen){
        screen.innerHTML = `
                            <div class="hint">
                                <h1 class="hint-text">Зал думает что это : ${questions[status][questionNumber]['answer']}</h1>
                                <button class="hint-btn">Ок</button>
                            </div>
                            `;

        const btnHint = document.getElementsByClassName('hint-btn')[0];

        btnHint.addEventListener('click', () => screen.innerHTML = '');
        
    }

    btnCall(questions, status, questionNumber, screen){
        screen.innerHTML = `
                            <div class="hint">
                                <h1 class="hint-text">Друг думает что это : ${questions[status][questionNumber]['answer']}</h1>
                                <button class="hint-btn">Ок</button>
                            </div>
                            `;

        const btnHint = document.getElementsByClassName('hint-btn')[0];

        btnHint.addEventListener('click', () => screen.innerHTML = '');

    }

    btnAnswer(questions, questionNumber, status, btnAnswerFocus, btnsAnswer, nickname, questionText, stages, btnGiveMoney, btnHint50, btnHintHall, btnHintCall){
        btnAnswerFocus.classList.add('answer-focus');

        btnsAnswer.forEach(element =>  element.disabled = true);
        /*
        btnsAnswer[0].disabled = true;
        btnsAnswer[1].disabled = true;
        btnsAnswer[2].disabled = true;
        btnsAnswer[3].disabled = true;
        */

        if(btnAnswerFocus.dataset.value === questions[status][questionNumber]['answer']){
            btnAnswerFocus.classList.remove('answer-focus');
            btnAnswerFocus.classList.add('answer-true');
            if(status<15){
                    status += 1;
                    localStorage.setItem('status', JSON.stringify(status));
                    this.questionsLoad(questions, status, questionNumber, questionText, btnsAnswer, stages, btnGiveMoney, btnHint50, btnHintHall, btnHintCall);              
            } else {
                this.saveAchievements(nickname, this.decipherStageLosing(status));
                location.hash = '/win';
            }
            

        } else {
            btnAnswerFocus.classList.remove('answer-focus');
            btnAnswerFocus.classList.add('answer-false');
            btnGiveMoney.disabled = true;
            btnHint50.disabled = true;
            btnHintHall.disabled = true;
            btnHintCall.disabled = true;

            const answerInformation = {
                answerFalse : btnAnswerFocus.dataset.value,
                answerTrue : questions[status][questionNumber]['answer']
            };
            
            localStorage.setItem('game-status', JSON.stringify('losing'));
            localStorage.setItem('gameInformation', JSON.stringify( answerInformation ));

            switch(questions[status][questionNumber]['answer']){
                case 'A' :
                        btnsAnswer[0].classList.add('answer-true');
                    break;
                case 'B' :
                        btnsAnswer[1].classList.add('answer-true');
                    break;
                case 'C' :
                        btnsAnswer[2].classList.add('answer-true');
                    break;
                case 'D' :
                        btnsAnswer[3].classList.add('answer-true');
                    break;
            }
            this.saveAchievements(nickname, this.decipherStageLosing(status));
        }
    
    }

    saveAchievements(nickname, value){
        const newAchievement = {
            nickname,
            value
        };

        this.achievement.addAchievements(newAchievement);
    }

    decipherStageLosing(status){
        switch(status){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return 0;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return 1000;
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                return 32000;
        }
    }

    decipherStageGiveMoney(status){
        switch(status){
            case 1:
                return 0;
            case 2:
                return 100;
            case 3:
                return 200;
            case 4:
                return 300;
            case 5:
                return 500;
            case 6:
                return 1000;
            case 7:
                return 2000;
            case 8:
                return 4000;
            case 9:
                return 8000;
            case 10:
                return 16000;
            case 11:
                return 32000;
            case 12:
                return 64000;
            case 13:
                return 126000;
            case 14:
                return 250000;
            case 15:
                return 500000;
        }
    }

    editGameLosing(btnsAnswer, btnGiveMoney, btnHint50, btnHintHall, btnHintCall){
        const answerPlayer = JSON.parse(localStorage.getItem('gameInformation'));

        btnGiveMoney.disabled = true;
        btnHint50.disabled = true;
        btnHintHall.disabled = true;
        btnHintCall.disabled = true;
        btnsAnswer.forEach(element => {
            element.disabled = true;
            /*
            if (answerPlayer.answerTrue === element.dataset.value){
                element.classList.add('answer-true');
            }
            if (answerPlayer.answerFalse === element.dataset.value){
                element.classList.add('answer-false');
            }*/

            switch(element.dataset.value){
                case answerPlayer.answerTrue:
                    element.classList.add('answer-true');
                    break;
                case answerPlayer.answerFalse:
                    element.classList.add('answer-false');
                    break; 
            }
        });
    }
}

export default GameWindow;