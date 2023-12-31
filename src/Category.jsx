/* eslint-disable react/prop-types */
import axios from "axios";
import Questions from "./Q&A";

function Category(props) {
  console.log(props);
  // // when we select a category, navigate to the page and return a string with the questions

  const handleSelectedCategoryClick = () => {
    axios
      // what i'm trying to do below is send a request for 10 questions from one category of the Trivia API and have them appear when we click the button
      .get(`https://opentdb.com/api.php?amount=10&category=${props.id}`)
      .then((result) => {
        console.log("result: ", result);
        props.setSelectedQAData(result.data.results);
        props.selectCategory(props.id);
      });
  };

    return (
    <div className="selected-category-div">
      {props.showQuestions === false ? (<button
        className="category-buttons"
        onClick={handleSelectedCategoryClick}> 
        {props.name}
      </button>) : null}
      {props.showQuestions === true ? (
        <Questions
          data={props.selectedQAData}
          selectCategory={props.selectCategory}
        />
      ) : null}
    </div>
  );
}

export default Category;
