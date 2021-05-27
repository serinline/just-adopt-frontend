import React, { useState, useEffect  } from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Form from "react-validation/build/form";
import Typography from '@material-ui/core/Typography';
import "../style/Questions.css"
import Button from '@material-ui/core/Button';
import dateFormat from 'dateformat';
import MuiAlert from '@material-ui/lab/Alert';

import {api} from "../api.js";


function Alert(props) {
  return <MuiAlert elevation={4} variant="filled" {...props} />;
}

const required = (value) => {
  if (!value) {
    return (
      <Alert className="alert-valid" severity="error">Field is required</Alert>
    );
  }
};


function  Questions() {
    const [questions, setQuestions] = useState([])
    const [questionId, setQuestionId] = useState(0)
    const [question, setQuestion] = useState({})
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
      fetch("http://localhost:8081/voting/questions", {
          method: "GET",
          dataType: "JSON",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          }
        })
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data);
          setQuestion(data[0])
        });
    }, []);

    function handleQuestionIdChange(event){
      setQuestionId(event.target.value)
      loadQuestion(event.target.value)  
    }

    function loadQuestion(id){
      fetch(`http://localhost:8081/voting/question/${id}`, {
        method: "GET",
        dataType: "JSON",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          }
        })
      .then(res => { 
          return res.json()
      }) 
      .then(json => {
          setQuestion(json)
      })
    }

    const handleVote = (e) => {
      e.preventDefault();
      setSuccessful(false);
      return api.post(`http://localhost:8081/voting/${questionId}/votes`, 
          {
            questionId,
            answerIdAndPreference
      }).then(
        () => {
          setMessage("Thank your for your vote");
          setSuccessful(true);
        },
        (error) => {
          console.log(error)
          setSuccessful(false);
          setMessage("You have already voted!");
        }
      );
    }


    return (
        <div className="questions">
           <select onChange={handleQuestionIdChange}>
              {questions.map((question) => 
                <option key={question.id} value={question.id}> {question.questionText} </option>
              )}
            </select>
            <div className="question-content">

              <Card variant="outlined">
                <CardContent>
                  <ItemListerQuestion question={question}/>
                  <Form onSubmit={handleVote}> 
                    <div className="input-button">
                      <button className="btn btn-primary btn-block">Vote</button> 
                    </div>
                  </Form> 
                </CardContent>
              </Card>
            </div>

            {message && (
              <div>
                { successful ? 
                <Alert className="alert-valid" severity="success">{message}</Alert> 
                : 
                <Alert className="alert-valid" severity="info">{message}</Alert>
                }
              </div>
            )}


      </div>
  );
};

function createSelectItems(size) {
  let items = [];         
  for (let i = 0; i <= size; i++) {             
       items.push(<option key={i} value={i} validations={[required]}>{i}</option>);
  }
  return items;
}  

var answerIdAndPreference = []

const onDropdownSelected = (id, value) => {
  var foundIndex = answerIdAndPreference.findIndex(e => e.answerId === id)
  if(foundIndex === -1){
    answerIdAndPreference.push({ answerId: id, preference: value})
    return;
  }
  answerIdAndPreference[foundIndex] = { answerId: id, preference: value}
}

const ItemListerQuestion = (props) => {

  const [winner, setWinner] = useState({answerText: ""})
  const currQuestion = props.question
  const id = props.question.id


  function getWinner(idWin) {
    console.log(idWin)
    fetch(`http://localhost:8081/voting/${idWin}/winner`, {
          method: "GET",
          dataType: "JSON",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          }
        })
      .then(res => { 
          return res.json()
      }) 
      .then(json => {
        setWinner(json)
      });
      console.log(winner)
    }

  return (
    <div>
      <Typography variant="h5" component="h2">{ currQuestion.questionText }</Typography>

            <div className="question-text">{ currQuestion.answerList && currQuestion.answerList.map(answer => (
                <div className="questions-list" key={answer.id}> 
                  <div className="answer-text">{ answer.answerText }</div>
                    <select 
                      className="select-answer"
                      onChange={(e) => onDropdownSelected(answer.id, e.target.value)} 
                      label="preferences">
                        {createSelectItems(props.question.answerListLength)}
                    </select> 
                </div>
                )) }
                </div>

                <div className="question-content">
                <Button variant="outlined" onClick={() => getWinner(id)}> 
                  Check winner!
                  </Button>
                 <ItemListerWinner winner={winner} />
                  
                  </div>

            <div className="question-content"> <strong>Expires on:</strong> { dateFormat(currQuestion.endTime, "dddd, mmmm dS, yyyy, h:MM:ss TT") }</div>
  </div> 
)}

const ItemListerWinner = (props) => {
  console.log(props.winner.answerText)
  return <div><strong>Current winner:</strong> {props.winner.answerText}</div>
}

export default Questions;