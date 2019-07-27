let round = 0;
let random;
let questionsUsed = [];
let time = 4;
let rightAnswer = 0;
let timevar;

let questions = [

    question0 = {
        question: "The beaver is the national emblem of which country?",
        answers: ["Canada", "Russia", "Germany", "USA"],
        correct: ["Russia", "Germany", "USA"]
    },

    question1 = {
        question: "How many players are there in a baseball team?",
        answers: ["5", "6", "8", "9"],
        correct: ["5", "6", "9"]
    },

    question2 = {
        question: "What kind of person shall not be honored on a US postal stamp, according to the US postal service and the Citizen’s Stamp Advisory Commitee?",
        answers: ["An Actor", "A living person", "A President", "Employees of the postal service"],
        correct: ["An Actor", "A President", "Employees of the postal service"]
    }
]

//function selects random question from array an checks if alreay used to avoid duplication

function randomQuestion() {
    random = Math.floor(Math.random() * 3);
    console.log(random);
    console.log(questionsUsed.indexOf(random));
    if (questionsUsed.indexOf(random) < 0) {
        console.log("use Question");
        questionsUsed.push(random);
    }
    else if(questions.length == questionsUsed.length){
        alert("done");
        questionsUsed = [];
    }
    else{
            console.log("already used");
            randomQuestion();
        }
        console.log(questionsUsed);
    }


    //Populating divs with question and answers

    function populateFields() {

        $("#question").text(questions[random].question);
        for (i = 0; i < 4; i++) {
            $(`.answer${i}`)
                .text(questions[random].answers[i])
                .attr("value", questions[random].answers[i])
        };

        $("div.answer").on("click", function () {
            let value = ($(this).attr("value"));
            console.log(value);
            if (questions[random].correct.indexOf(value) == -1) {
                console.log("correct");
                rightAnswer++;
                $(this).css("background-color", "green");
            }
            else {
                console.log("incorrect");
                $(this).css("background-color", "red");
            }
            setTimeout(stop, 1500);
            $("div.answer").off();
        });
    }


    function timer() {


        function count() {
            time--;
            console.log(time);
            $("#timer").html(`<h4>${time}</h4>`);
            if (time == 0) {
                stop();
            }
        }
        timevar = setInterval(count, 1000);

    }

    function stop() {
        clearInterval(timevar);
        newQuestion();
    }

    function newQuestion() {
        console.log("NEW");
        time = 4;
        randomQuestion();
        populateFields();
        timer();

    }

    function resetRound() {
        for (i = 0; i < 4; i++) {
            $(`.answer${i}`).css("background-color", "white");
        }
    }

    $(document).ready(function () {
        newQuestion();

        $("#reset-btn").on("click", resetRound);

        $("#question").text(randomQuestion.question);

    });