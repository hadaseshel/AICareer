import React, { useState } from "react";

export default function Question({ onNext, onPrevious, onSubmit, description, options, isLastQuestion }) {
  const [answer, setAnswer] = useState("");

  const handleOptionChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleNextClick = () => {
    onNext(answer);
    setAnswer("");
  };

  const handlePreviousClick = () => {
    onPrevious();
    setAnswer("");
  };

  const handleSubmitClick = () => {
    onSubmit(answer);
    setAnswer("");
  };

  return (
    <div className="mx-0 mx-sm-auto">
    <div className="text-center">
        <p>
        <strong>{description}</strong>
        </p>
    </div>

    <div className="text-center mb-3">
        <div className="d-inline mx-3">
        Dislike
        </div>

        <form>
            {options.map((option) => (
            <div className="form-check form-check-inline" key={option}>
                <label className="form-check-label">
                <input
                    className="form-check-input"
                    type="radio"
                    value={option}
                    checked={answer === option}
                    onChange={handleOptionChange}
                />
                {option}
                </label >
            </div>
            ))}
        </form>

        <div className="d-inline me-4">
        Like
        </div>
    </div>
    <button className="btn btn-success" onClick={handlePreviousClick}>Previous</button>
    <button className="btn btn-success" onClick={handleNextClick}>Next</button>
    {isLastQuestion && (<button className="btn btn-success" onClick={handleSubmitClick}>Submit</button>)}
    </div>
  );
}

