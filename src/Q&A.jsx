/* eslint-disable react/prop-types */
// this component needs to display our questions and answers
// we navigate here after a category has been selected

import { useState } from "react";
import shuffle from "lodash.shuffle";

function Questions(props) {
  console.log("this is props in questions", props);
  // props.data is an array, only show questions if data has any data
  const isQuestionsEmpty = props.data.length === 0;

  //this is so we can cycle through our questions
  const [questionObjectIndex, setQuestionObjectIndex] = useState(0);
  //this is so we can record how many questions are correct
  const [recordedCorrectAnswers, setRecordedCorrectAnswers] = useState([]);
  //this is so we can select whatever answer we want and change it up until we submit it
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNextQuestionClick = () => {
    if (selectedAnswer === props.data[questionObjectIndex].correct_answer) {
      setRecordedCorrectAnswers(recordedCorrectAnswers.concat([selectedAnswer]));
      // if isCorrect is true, then change the state to + 1, else do nothing
      console.log(recordedCorrectAnswers);
    }

    setQuestionObjectIndex(
      questionObjectIndex === props.data.length - 1
        ? questionObjectIndex
        : questionObjectIndex + 1
    );
  };

  // when we click the data that we are getting needs to be the answer string and the isCorrect
  //
  const handleSelectedAnswerClick = (event) => {
    // setSelectedAnswer(selectedAnswer === isCorrect);
    console.log("this is event", event);
    // answer is event.target.innerText -- technically not react, but the only way out is down
    // if we have time, we'll change it to make answers its own compontent
    setSelectedAnswer(event.target.innerText);
  };

  // when we click next question, we need to record isCorrect true/false
  // count how many true (correct)
  // display count at end of quiz

  const incorrectAnswers = props.data.incorrect_answers;
  console.log("this is incorrect answers", incorrectAnswers);

  /**
   * props.data is an array like:
   * [
   *   {
      "type": "multiple",
      "difficulty": "easy",
      "category": "Entertainment: Music",
      "question": "What album did Bon Iver release in 2016?",
      "correct_answer": "22, A Million",
      "incorrect_answers": [
          "Bon Iver, Bon Iver",
          "Blood Bank EP",
          "For Emma, Forever Ago"
      ]
    }
    ...
  ]
   */

  // we need to combine the correct answer with the incorrect answers, while keeping track of what the correct answer is
  // we need to shuffle the combined list
  //we need to take those list items as a new list below the question
  // they need to be buttons or in some way clickable so we can register an answer

  const allAnswers = [];
  if (props.data.length > 0) {
    //this is adding the correct answer
    allAnswers.push({
      answerString: props.data[questionObjectIndex].correct_answer,
      isCorrect: true,
    });
    //next we add the incorrect answers
    props.data[questionObjectIndex].incorrect_answers.forEach(
      (incorrectAnswer) => {
        allAnswers.push({
          answerString: incorrectAnswer,
          isCorrect: false,
        });
      }
    );
  }
  // console.log("this is allAnswers", allAnswers);

  const shuffledAnswers = shuffle(allAnswers);

  // console.log("this is shuffledAnswers", shuffledAnswers);

  // on the click of my answer
  // SELECT the answer (change the color of the button to indicate the change)
  // disable the next button until a selection is made
  // if a selection has been made
  //when we click the next button
  // record the value of isCorrect from the selected answer
  // and add it to an empty array

  return isQuestionsEmpty ? null : (
    <div>
      {/* this code was for displaying our questions in a list */}
      {/* {props.data.map((questionObject) => (
        <div>{questionObject.question}</div>
        
      ))
      } */}
      <strong>Question:</strong> {props.data[questionObjectIndex].question}
      <br></br>
      <strong>Answers:</strong>{" "}
      {shuffledAnswers.map((answer) => (
        <button onClick={handleSelectedAnswerClick} key={answer.answerString}>
          {answer.answerString}
        </button>
      ))}
      <br></br>
      <button onClick={handleNextQuestionClick}>Next Question</button>
    </div>
  );
}

export default Questions;
