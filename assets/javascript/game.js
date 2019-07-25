let questions = [

question1 = {
    question: "The beaver is the national emblem of which country?",
    answers: ["Canada","Russia","Germany","USA"],
    correct: 0,
},

question2 = {
    question: "How many players are there in a baseball team?",
    answers: ["5","6","8","9"],
    correct: 3,
},

question3 = {
    question: "What kind of person shall not be honored on a US postal stamp, according to the US postal service and the Citizen’s Stamp Advisory Commitee?",
    answers: ["An Actor","A living person","A President","Employees of the postal service"],
    correct: 1,
}

]

let round = 0;
let random;
let questionsUsed = [];
// selecting random qu0estion

// function checkForUsed(){
//     if(questions[random].used === false){
//         console.log("true");
        
//     }
//     else{
//         console.log("repeat");
//         checkForUsed();
//     }
// }

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

$(document).ready(function () {


randomQuestion();

//Populating divs with question and answers

$("#question").text(questions[random].question);
$(".answer1").text(questions[random].answers[0]);
$(".answer2").text(questions[random].answers[1]);
$(".answer3").text(questions[random].answers[2]);
$(".answer4").text(questions[random].answers[3]);



$("#question").text(randomQuestion.question);

});