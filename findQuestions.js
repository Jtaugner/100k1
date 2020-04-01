window.onload = function () {
    let numQuestion = Number(localStorage.getItem('numQuestion'));
    if(document.querySelector('.my_otvet')){
        let question = document.querySelector('h1').textContent;
        let allQuestions = JSON.parse(localStorage.getItem('allQuestions'));
        let arrAnswers = Array.from(document.querySelectorAll('.my_otvet')).reduce((acc, q) => {
            acc.push(q.textContent.substring(3, q.textContent.length-2));
            return acc;
        }, []);
        allQuestions.push([question, arrAnswers]);
        localStorage.setItem('allQuestions', JSON.stringify(allQuestions));
        localStorage.setItem('numQuestion', numQuestion + 1);
        history.back();
    }else{
        if(numQuestion === 14) {
            document.querySelector('.page_next a').click();
            localStorage.setItem('numQuestion', 0);
            return;
        }
        let questions = document.querySelectorAll('article .title a');
        questions[numQuestion].click();
    }

};





