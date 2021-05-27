import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import "../style/NewQuestion.css"

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
  

const NewQuestion = () => {

    const [questionText, setQuestionText] = useState("")
    const [answers, setAnswers] = useState([{ text: ""}])
    const [questionActiveTime, setQuestionActiveTime] = useState({ days: 0, hours: 0})
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");  

    const form = useRef();
    const checkBtn = useRef();

    const onChangeQuestionText = (e) => {
        const questionText = e.target.value;
        setQuestionText(questionText);
    };
      
    const addAnswer = (questionText, answers, questionActiveTime) => {
        return api.post("http://localhost:8081/voting/question", 
            {
            questionText,
            answers,
            questionActiveTime,
        });
    };
    
    const handleAddQuestion = (e) => {
        e.preventDefault();
        setSuccessful(false);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            addAnswer(questionText, answers, questionActiveTime).then(
            (response) => {
            setMessage("Question was added");
            setSuccessful(true);
            },
            (error) => {
            const resMessage =
                error.message ||
                error.toString();

            setMessage(resMessage);
            setSuccessful(false);
            }
        );
        }
    };

      const handleAnswerChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...answers];
        list[index][name] = value;
        setAnswers(list);
      };
    
      const handleRemoveClick = index => {
        const list = [...answers];
        list.splice(index, 1);
        setAnswers(list);
      };
     
      const handleAddClick = () => {
        setAnswers([...answers, { text: ""}]);
      };


      
      const handleChange = (variableName, newValue) => {
        setQuestionActiveTime(prevTime => {
            return {
                ...prevTime,
                [variableName]: newValue
            }
        });
    }

    return (
    <div>
        <Card variant="outlined">
            <CardContent className="new-question-form">

            <Form onSubmit={handleAddQuestion} ref={form}>
                    {!successful && (
                        <div>
                        <div className="form-group">
                            <Input
                            type="text"
                            name="question"
                            className="form-control"
                            placeholder="Type question"
                            value={questionText}
                            onChange={onChangeQuestionText}
                            validations={[required]}
                            />
                        </div>

                        {answers.map((x, i) => {
                            return (
                            <div className="box">
                                <Input
                                name="text"
                                placeholder="Answer"
                                value={x.text}
                                onChange={e => handleAnswerChange(e, i)}
                                />
                                <div className="btn-box">
                                    {answers.length !== 1 && 
                                    <div className="answer-button">
                                    <Button variant="outlined"
                                        onClick={() => handleRemoveClick(i)}>Remove</Button>
                                    </div>}
                                    {answers.length - 1 === i && 
                                    <div className="answer-button">
                                    <Button variant="outlined" 
                                        onClick={handleAddClick}>Add</Button> 
                                    </div>}
                                </div>
                            </div>
                            );
                        })}

                            <label htmlFor="text">
                                <strong>Question active time</strong>
                            </label>
                                <div className="box">
                                    <label htmlFor="text">Days: </label>
                                        <Input
                                            className="ml10"
                                            placeholder="Days"
                                            value={questionActiveTime.days}
                                            onChange={(e) => handleChange('days', e.target.value)}
                                            validations={[required]}
                                        />
                                    </div>
                                <div className="box">
                                    <label htmlFor="text">Hours: </label>
                                        <Input
                                            className="ml10"
                                            placeholder="Hours"
                                            value={questionActiveTime.hours}
                                            onChange={(e) => handleChange('hours', e.target.value)}
                                            validations={[required]}
                                        />
                                    </div> 

                            <div  className="input-button">
                                <button className="btn btn-primary btn-block">Add question</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <Alert className="alert-valid" severity="info">{message}</Alert>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>

            </CardContent>
        </Card>

    </div>
    );
}

export default NewQuestion;