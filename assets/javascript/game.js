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
let questionsUsed = [0];
// selecting random question

// function checkForUsed(){
//     if(questions[random].used === false){
//         console.log("true");
        
//     }
//     else{
//         console.log("repeat");
//         checkForUsed();
//     }
// }


function randomQuestion(){
    let random = Math.floor(Math.random() * 3);
    if(questionsUsed.indexOf(random)){
        console.log("repeat");
        randomQuestion();
        random = undefined;
    }
    else{
        console.log("not used");
        questions.push(random);
    }
    console.log(questionsUsed);
}

$(document).ready(function () {


//check if question already used

randomQuestion();




$("#question").text(randomQuestion.question);





});