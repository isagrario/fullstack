const Header = ({course}) => {
  //console.log(props);
  return (
    
    <h1>{course}</h1>
  )
}

const Part = ({part,exercises}) => {
  return (
    <div>
      <p>{part} {exercises} </p>
      
    </div>
  )
}

const Content = ({parts}) => {
  
  return (
    
    <div>

        {parts.map(part => 
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
    
      
    </div>
   
  )
}

const Total = ({parts}) => {
   const total= parts.reduce((sum, part) => {
         console.log(sum, part.exercises)
        return sum + part.exercises
    },0 )
    
    return (
    <div>
       <p><b>Number of exercises {total}</b></p>
    </div>
  )
}

const Course = ({ course }) => {


    return (    
        
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>

        )
}

export default Course