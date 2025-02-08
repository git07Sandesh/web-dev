const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}
const Part = (props) => {
  return (
    <>
      <p>{props.part_name} {props.exercises_no}</p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      <Part part_name={parts[0].name} exercises_no={parts[0].exercises} />
      <Part part_name={parts[1].name} exercises_no={parts[1].exercises} />
      <Part part_name={parts[2].name} exercises_no={parts[2].exercises} />
    </>
  )
}
const Total = ({ parts }) => {
  return (
    <>
      <p> Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />

    </div>
  )
}

export default App
