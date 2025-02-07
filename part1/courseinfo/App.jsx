const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Part = (props) => {
  return(
    <>
      <p>{props.part_no} {props.exercises_no}</p>
    </>
    )
    }

const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {
  return (
    <>
      <Part part_no = {part1} exercises_no = {exercises1} />
      <Part part_no = {part2} exercises_no = {exercises2} />
      <Part part_no = {part3} exercises_no = {exercises3} />
    </>
  )
}
const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.totalexercises}</p>
    </>
  )
}


const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1} 
        part3={part3} 
        part2={part2} 
        exercises1={exercises1} 
        exercises2={exercises2} 
        exercises3={exercises3} 
      />
      <Total totalexercises={exercises1 + exercises2 + exercises3} />

    </div>
  )
}

export default App
