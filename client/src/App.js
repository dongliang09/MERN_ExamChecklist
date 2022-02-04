import React, {useState, useEffect} from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [ListofExam, setListofExam] = useState([]);
  const [name, setName] =useState("");
  const [date, setDate] =useState("");

  const addExam = () => {
    Axios.post("http://localhost:3001/createExam",
      {name:name, date:date})
    .then(() => {
      setListofExam([...ListofExam, {name:name, date:date}]);
    });
  };

  const updateExam = (id) => {
    const newName = prompt("Please enter new name");
    //const newDate = prompt("Please enter new name");
    console.log(newName)
    Axios.put("http://localhost:3001/updateExam",
      {newName:newName, id:id})
    .then(() => {
      setListofExam(ListofExam.map((val) => {
        return val._id === id ? {_id:id, name:val.name} : val;
      }));
    });
  };

  const deleteExam = (id) => {
    Axios.delete(`http://localhost:3001/deleteExam/${id}`)
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getExam")
    .then((response)=>{
      setListofExam(response.data)
    });
  },[ListofExam]);

  return (
    <div className="App">
      <h1>2022 Spring Quarter Exam Checklist</h1>
      <div className="checklist-container" >
          <div className="add-item"> 
            <input type="date" min="2022-01-01" max="2023-12-31"
              onChange={(event)=> {setDate(event.target.value);}}
            />
            <input id="quizName" type="text" placeholder="Enter your exam name here ..."
              onChange={(event) => {setName(event.target.value);}}
            />
            <button onClick={addExam}>Add</button>
          </div>
      </div>
      <div className="examDisplay">
        {ListofExam.map((val)=>{
          const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"];
          return(  
            <div className="display-one">
              <div className="calendar">
                <div className="calendar-month">{month[new Date(val.date).getUTCMonth()]}</div>
                <div className="calendar-day">{new Date(val.date).getUTCDate()}</div>
              </div>
              <div className="display-content">{val.name}</div>
              <div className="display-update-x">
                <button onClick={() => updateExam(val._id)}>Update</button>
                <button onClick={() => deleteExam(val._id)}>X</button>
              </div> 
            </div>)
        })} 
      </div>
    </div>
  );
}

export default App;
