let random = 0;
let initialTime = 21;
let rightAnswers = 0;
let wrongAnswers = 0;
let answers = [];
let timevar;
let newEntry;
let value;
let questions;

$.ajax({
    url: "https://opentdb.com/api.php?amount=10&type=multiple",
    method: "GET"
  }).then(function(response) {
        questions = response.results;
        // questions.sort(function(a, b){return 0.5 - Math.random()}); //suffle questions array
        console.log(questions)
      });

    //function selects random question from array an checks if alreay used to avoid duplication
    function start(){
        rightAnswers = 0;
        wrongAnswers = 0;
        random = 0;
        time = initialTime;
        clearInterval(timevar);
        newQuestion();
    }

    function newQuestion() {
        console.log(random);
        if(random == 9){
            $("div.answer").off();
            alert(`Score: ${rightAnswers} right answers, ${wrongAnswers} wrong answers. Click ok for another round.`)
            random = 0;
            console.log("random" + random)
            $("#tracker").empty();
            newQuestion();
        }
        $(".answer").removeClass("red green accent-3").addClass("blue lighten-4");
        newEntry = $("<div>").addClass("entry");
        populateFields();
        checkAnswer();
       
        // timer();
    }

    //Populating divs with question and answers

    function populateFields() {
        answers = questions[random].incorrect_answers;
        answers.push(questions[random].correct_answer);
        // answers.sort(function(a, b){return 0.5 - Math.random()}); //shuffle answers
        $("#question").text(questions[random].question);
        for (i = 0; i < 4; i++) {
            $(`.answer${i}`)
                .html(`<span>${answers[i]}</span>`)
                .attr("value", answers[i]);
            $(`.answer${i}`).addClass("blue lighten-4")
        };
    }

    function checkAnswer(){
        $("div.answer").on("click", function () {
            value = ($(this).attr("value"));
            random++;
            if (questions[random].correct_answer == value) {
                console.log("correct");
                rightAnswers++;
                console.log(this);
                $(this).removeClass("blue lighten-4").addClass("green accent-3");
                newEntry.text(questions[random].question + " Your answer: " + questions[random].correct_answer + " -correct")
                $("#tracker").append(newEntry);
            }
            else {
                console.log("incorrect");
                wrongAnswers++;
                newEntry.text(questions[random].question + " Your answer: " + value + " -incorrect | correct answer: " + questions[random].correct_answer)
                $(this).removeClass("blue lighten-4").addClass("red accent-3");
                $("#tracker").append(newEntry);
            }
            setTimeout(newQuestion, 10);
            $("div.answer").off();

            
        });
        }

    function timer() {
        function count(){
            time--;
            console.log(time);
            $("#timer").html(`<h4>${time}</h4>`);
            if (time == 0) {
                stopTimer();
            }
        }
        timevar = setInterval(count, 1000);

    }

    function stopTimer() {
        clearInterval(timevar);
        // let value = questions[random].correct
        // alert(`You ran out of time! Score: ${rightAnswers} right answers, ${wrongAnswers} wrong answers. Click ok for another round.`);
    }

    function resetRound(){
    }

    $(document).ready(function () {
        // newQuestion();

        $("#reset-btn").on("click", start);
        $("#question").text("Show how much your know!");
        $("#start-btn").on("click", start)


    });