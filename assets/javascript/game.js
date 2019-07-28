let random = -1;
let time = 21;;
let rightAnswers = 0;
let wrongAnswers = 0;
let answers = [];
let newEntry;
let value;
let questions;
let timevar;

$.ajax({
    url: "https://opentdb.com/api.php?amount=10&type=multiple",
    method: "GET"
  }).then(function(response) {
        questions = response.results;
        // questions.sort(function(a, b){return 0.5 - Math.random()}); //suffle questions array
        console.log(questions)
      });

    //picks a random question form the array, resets game once all 10 questions were answered

    function newQuestion() {
        $("#start-btn").off();
        console.log(random);
        if(random == 9){
            alert(`Score: ${rightAnswers} right answers, ${wrongAnswers} wrong answers. Click ok for another round.`)
            rightAnswers = 0;
            wrongAnswers = 0;
            time= 21;
            console.log("random" + random)
            location.reload();
        }
        $(".answer").removeClass("red green accent-3").addClass("blue lighten-4");
        newEntry = $("<div>").addClass("entry");
        random++
        populateFields();
    }

    //Populating divs with question and answers

    function populateFields() {
        answers = questions[random].incorrect_answers;
        answers.push(questions[random].correct_answer);
        // answers.sort(function(a, b){return 0.5 - Math.random()}); //shuffle answers
        $("#question").html(`<p>${questions[random].question}</p>`);
        for (i = 0; i < 4; i++) {
            $(`.answer${i}`)
                .html(`<span>${answers[i]}</span>`)
                .attr("value", answers[i]);
            $(`.answer${i}`).addClass("blue lighten-4")
        };
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
        time = 21;
        random++
        wrongAnswers++;
        newEntry.html(`<p>${questions[random].question} Your answer: none, time was up. - incorrect | correct answer: ${questions[random].correct_answer}</p>`);
        $("#tracker").append(newEntry);
        timer();
        newQuestion();
    }

    $(document).ready(function () {


        // creating click events

        $("#start-btn").on("click", function(event){
            timer();
            event.preventDefault();
                newQuestion();
                $("#tracker").empty();
            });
        $("#question").text("Show how much your know!");
        $("#reset-btn").on("click", ()=>{location.reload()});

        // on click check if answer is correct and populating tracker

        $("div.answer").on("click", function () {
            clearInterval(timevar);
            time = 21;
            timer();
            value = ($(this).attr("value"));
                if (questions[random].correct_answer == value) {
                console.log("correct");
                rightAnswers++;
                console.log(this);
                $(this).removeClass("blue lighten-4").addClass("green accent-3");
                newEntry.html(`<p>${questions[random].question} Your answer: ${questions[random].correct_answer} - correct</p>`)
                $("#tracker").append(newEntry);
                setTimeout(newQuestion, 1000);
            }
            else {
                console.log("incorrect");
                console.log(value);
                wrongAnswers++;
                
                newEntry.html(`<p>${questions[random].question} Your answer: ${value} - incorrect | correct answer: ${questions[random].correct_answer}</p>`)
                $(this).removeClass("blue lighten-4").addClass("red accent-3");
                $("#tracker").append(newEntry);
                setTimeout(newQuestion, 1000);
            }
        });
    });