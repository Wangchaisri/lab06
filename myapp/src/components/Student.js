import  React,{ useState,useEffect } from "react";
import  axios from 'axios'


const Student= ()=>{
     let url = 'http://localhost:8000/api/students'

 const [students,setStudent] = useState('');
 const [name,setName] = useState('');
 const [surname,setSurname] = useState('');
 const [id,setId] = useState('');
 const [Major,setMajor] = useState('');
 const [GPA,setGPA] = useState( );

 useEffect(() => {
    getStudents()
},[]);

 const getStudents = async () => {
    const result = await axios.get(url)
    setStudent(result.data)
     console.log(result.data)
}
const addStudent = async ()=>{
    const result = await axios.post(url,{name,surname,id,Major,GPA
    })
     console.log(result.data)
     getStudents();
}
const getStudent =async (no)=> {
    const result = await axios.get(`http://localhost:8000/api/students/${no}`)
    setName(result.data.name)
    setSurname(result.data.surname)
    setId(result.data.id)
    setMajor(result.data.Major)
    setGPA(result.data.GPA)
} 
const updateStudent =async (no)=> {
    const result = await axios.put(`http://localhost:8000/api/students/${no}`,{
        name,surname,id,Major,GPA})
    setName(result.data.name)
    setSurname(result.data.surname)
    setId(result.data.id)
    setMajor(result.data.Major)
    setGPA(result.data.GPA)
    getStudents();
} 
const deleateStudent =async (no)=> {
    const result = await axios.delete(`http://localhost:8000/api/students/${no}`)
 getStudents()
} 

const printStudent = ()=>{
    if(students && students.length )
    { return students.map((student,index) =>{
        return (
            <li key={index}> {student.name} {student.surname} 
            :{student.id}:{student.Major}:{student.GPA} 
            <button class="btn btn-info btn-sm" onClick={()=>(getStudent(student.no))}> GET</button>
            <button class="btn btn-warning btn-sm" onClick={()=>(updateStudent(student.no))}>update</button>
            <button class="btn btn-danger btn-sm" onClick={()=>(deleateStudent(student.no))}>delete</button>
           </li>
        
        ) 
    })
    }
    else
    {
        return (
            <h2>No Data Student</h2>
        )
    }
}

 
    return(
               
        <div ><h1>Student Data.</h1>
  <ul>{printStudent()}</ul>
  <h2>Get:{name} {surname} {id} {Major} {GPA} </h2>
  <br/>
  <div className="form-group">
  <input  className= "form-control"
  type='text' 
  name='name'
  onChange={ (e)=>setName(e.target.value)}
  placeholder='name'/><br/>
  <input className= "form-control"
  type= 'text'
  name ='surname'
  onChange={ (e)=>setSurname(e.target.value)}
  placeholder ='surname'/><br/>
  <input className= "form-control"
  type='text'
  name= 'id'
  onChange={ (e)=>setId(e.target.value)}
  placeholder='id'/><br/>
  <input className= "form-control"
  type = 'text'
  name = 'Major'
  onChange={ (e)=>setMajor(e.target.value)}
  placeholder= 'major'/><br/>
  <input className= "form-control"
  type= 'number'
  name = 'GPA'
  onChange={ (e)=>setGPA(e.target.value)}
  placeholder = 'GPA' /><br/>
  </div>
<button class="btn btn-success" onClick={addStudent}>add Data</button><br/>

        </div>
      
    )

}  
 export default Student;