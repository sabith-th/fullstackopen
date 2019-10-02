import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ text, count }) => (
  <tr>
    <td>{text}</td>
    <td>{count}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral }) => {
  const total = good + neutral + bad;
  const getAverageRating = () => (good * 1 + bad * -1) / total;
  const getPositiveRatingPercent = () => (good / total) * 100;

  if (total === 0) {
    return <h3>No feedback given</h3>;
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" count={good} />
        <Statistic text="neutral" count={neutral} />
        <Statistic text="bad" count={bad} />
        <Statistic text="all" count={total} />
        <Statistic text="average" count={getAverageRating()} />
        <Statistic text="positive" count={`${getPositiveRatingPercent()} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGoodCount = () => setGood(good + 1);
  const addNeutralCount = () => setNeutral(neutral + 1);
  const addBadCount = () => setBad(bad + 1);

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give Feedback</h2>
      <Button onClick={addGoodCount} text="good" />
      <Button onClick={addNeutralCount} text="neutral" />
      <Button onClick={addBadCount} text="bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
