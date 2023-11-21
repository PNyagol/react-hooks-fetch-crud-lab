import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: formData.answers,
        correctIndex: formData.correctIndex,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddQuestion(data);
      });
  };

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
