import Utils from './helpers/utils.js';

import MainMenu from './views/pages/main_menu.js';
import Achivements from './views/pages/achievements.js';
import Credits from './views/pages/credits.js';
import Regulation from './views/pages/regulation.js';
import NewGame from './views/pages/new_game.js';
import GameWindow from './views/pages/game_window.js';
import Win from './views/pages/win.js';


import Error404 from './views/pages/error404.js';






const Routes = {
    '/': MainMenu,
    '/achievements' : Achivements,
    '/credits': Credits,
    '/regulation': Regulation,
    '/new_game': NewGame,
    '/game_window': GameWindow,
    '/win': Win
}

function router(){
    const contentContainer = document.getElementsByClassName('content-conteiner')[0];

    const request = Utils.parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    if(location.hash === '#/achievements'){
        page.getData().then(data => {
            page.render(data).then(html => {
                contentContainer.innerHTML = html;
                page.afterRender();
            });
        });
    } else {
		page.render().then(html => {
        contentContainer.innerHTML = html;
        page.afterRender();
        });
    }

}



window.addEventListener('load', router);
window.addEventListener('hashchange', router);