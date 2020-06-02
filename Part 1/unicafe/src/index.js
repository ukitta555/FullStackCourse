import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad, averageScore, positivePercentage, reviews}) =>
{
  if (reviews.length === 0)
  {
    return (
      <>
      <h1> Stats </h1>
      <p> No feedback given :(</p>
      </>
    )
  }
  else {
    return (
      <>
      <h1> Stats </h1>
      <p> good {good} </p>
      <p> neutral {neutral}</p>
      <p> bad {bad} </p>
      <p> all {good + neutral + bad}</p>
      <p> average {averageScore()}</p>
      <p> positive {positivePercentage()*100}%</p>
      </>
    )
  }
}

const Button = ({text, handleClick}) =>
{
    return (<button onClick={handleClick}>{text}</button>)
} 

const App = () =>
{
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [reviews, setReviews] = useState([])
  const handleButtonClick = (value, setValue, score) => () => 
  {
    setValue(value + 1)
    setReviews(reviews.concat(score))
  }
  const averageScore = () =>
  {
    if (reviews.length === 0) return 0
    else {
      return reviews.reduce((accum, entry) => accum + entry, 0) / reviews.length
    }    
  }
  const positivePercentage = () =>
  {
    if (reviews.length === 0) return 0
    else {
      return good / reviews.length
    }
  }

  return (
    <div>
      <h1> Give feedback </h1>
      <Button text = "good" handleClick = {handleButtonClick (good, setGood, 1)} />
      <Button text = "neutral" handleClick = {handleButtonClick (neutral, setNeutral, 0)}/>
      <Button text = "bad" handleClick = {handleButtonClick (bad, setBad, -1)}/>        
      <Statistics good = {good} 
                  bad = {bad}
                  neutral = {neutral} 
                  averageScore = {averageScore}
                  positivePercentage = {positivePercentage}
                  reviews = {reviews}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)