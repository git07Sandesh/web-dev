import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.onclick}>{props.text}</button>

    )
}
const StatisticLine = (props) => {
    return (


        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>


    )

}
const Statistic = (props) => {
    const { good, neutral, bad } = props;
    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100 + ' %';

    if (all === 0) {
        return <div>No feedback given</div>;
    }

    return (
        <>
            <table>
                <tbody>
                    <StatisticLine text='good' value={good} />
                    <StatisticLine text='neutral' value={neutral} />
                    <StatisticLine text='bad' value={bad} />
                    <StatisticLine text='all' value={all} />
                    <StatisticLine text='average' value={average} />
                    <StatisticLine text='positive' value={positive} />
                </tbody>
            </table>
        </>
    )
}


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(false)

    const handleGood = () => {
        setGood(good + 1)
        setAll(true);
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(true);
    }
    const handleBad = () => {
        setBad(bad + 1)
        setAll(true);
    }

    return (
        <div>
            <h2>give feedback</h2>

            <Button onclick={handleGood} text='good' />
            <Button onclick={handleNeutral} text='neutral' />
            <Button onclick={handleBad} text='bad' />

            <h2>statistics</h2>
            <Statistic good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App