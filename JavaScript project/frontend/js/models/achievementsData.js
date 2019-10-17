class AchievementsData{
    getAchievementsList() {
    	return new Promise(resolve => {    
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/achievements', true);

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
		});
    }

    addAchievements(newAchievements) {
		return new Promise(resolve => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/achievements', true);
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => resolve(JSON.parse(xhr.response));

			xhr.send(JSON.stringify(newAchievements));
		});
	}

}

export default AchievementsData;