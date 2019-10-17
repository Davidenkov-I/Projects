class Questions{
    getQuestions() {
    	return new Promise(resolve => {
				const xhr = new XMLHttpRequest();

				xhr.open('GET', 'http://localhost:3000/questions', true);

				xhr.onload = () => resolve(JSON.parse(xhr.response));

				xhr.send();
			
		});
    }

}

export default Questions;