import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const generateNextAnecdote = () => setSelected(Math.floor(Math.random() * 6));
  const addVote = () => {
    const copyOfPoints = [...points];
    copyOfPoints[selected] += 1;
    setPoints(copyOfPoints);
    const newMaxIndex = copyOfPoints.reduce(
      (maxI, el, i, arr) => (arr[maxI] > el ? maxI : i),
      0
    );
    if (newMaxIndex !== maxIndex) {
      setMaxIndex(newMaxIndex);
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <button onClick={addVote}>Vote</button>
      <button onClick={generateNextAnecdote}>Next Anecdote</button>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[maxIndex]}
      <br />
      has {points[maxIndex]} votes
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
