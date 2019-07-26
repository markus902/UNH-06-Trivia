let questions = [

question0 = {
    question: "The beaver is the national emblem of which country?",
    answers: ["Canada","Russia","Germany","USA"],
    incorrect: ["Russia","Germany","USA"]
},

question1 = {
    question: "How many players are there in a baseball team?",
    answers: ["5","6","8","9"],
    correct: ["5","6","9"]
},

question2 = {
    question: "What kind of person shall not be honored on a US postal stamp, according to the US postal service and the Citizen’s Stamp Advisory Commitee?",
    answers: ["An Actor","A living person","A President","Employees of the postal service"],
    correct: ["An Actor","A President","Employees of the postal service"]
}
]

let round = 0;
let random;
let questionsUsed = [];
let time;
let rightAnswer;

//function selects random question from array an checks if alreay used to avoid duplication

function randomQuestion(){
    random = Math.floor(Math.random() * 3);
    console.log(random);
    if(questionsUsed.indexOf(random) == false){
        console.log("repeat");
        randomQuestion();
    }
    else{
        console.log("not used");
        questionsUsed.push(random);
    }
    console.log(questionsUsed);
}

//Populating divs with question and answers

function populateFields(){
    $("#question").text(questions[random].question);
    for(i = 0; i < 4; i++){
        $(`.answer${i}`)
            .text(questions[random].answers[i])
            .attr("value", questions[random].answers[i])};
}


//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
    }

function timer(setTime){

    let timevar = setInterval(count, 1000);

    function count(){
        setTime--;
        console.log(setTime);
        if(setTime == 0){
            stop();
        }
    }
    function stop(){
        clearInterval(timevar);
    }

}



$(document).ready(function () {


randomQuestion();
populateFields();
timer(3);

//adds click events and checks if answer is correct

$("div.answer").on("click", function () {
    let value = ($(this).attr("value"));
    console.log(value);
    if(questions[random].correct.indexOf(value) == -1){
        console.log("correct");
        $(this).css("background-color", "green");
    }
    else{
        console.log("incorrect");
        $(this).css("background-color", "red");
    }
    
    // let answer = questions[random]
});


$("#question").text(randomQuestion.question);

});