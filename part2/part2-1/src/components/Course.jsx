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
            {parts.map(part => (<Part key={part.id} part_name={part.name} exercises_no={part.exercises} />))}
        </>
    )
}


const Course = ({ key, course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <h4>Total of {total} exercises</h4>
        </div>
    )
}

export default Course;