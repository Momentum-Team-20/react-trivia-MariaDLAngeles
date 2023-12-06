// this component needs to display our questions and answers
// we navigate here after a category has been selected

import axios from "axios";
import { useEffect, useState } from "react";

function Questions(props) {
  console.log("this is props in questions", props);
  // props.data is an array, only show questions if data has any data
  const isQuestionsEmpty = props.data.length === 0;

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


  return isQuestionsEmpty ? null : (
    <div>
      QUESTION:
      <br></br>
      {props.data.map((questionObject) => (
        <div>{questionObject.question}</div>
      ))
      }
    </div>
  );
}

export default Questions;
