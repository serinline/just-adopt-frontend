import React, {useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import MuiAlert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import "../style/NewPet.css"

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


const NewPet = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [description, setDescription] = useState("");
    const [type, setType] = useState("cat");

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const form = useRef();
    const checkBtn = useRef();

    const addNewPet = (name, age, description, type) => {
        return api.post("http://localhost:8080/pets/save",
            {
                name, age, description, type
            });
    }

    const handleAddPet = (e) => {
        e.preventDefault();
        setSuccessful(false);
        form.current.validateAll();
        console.log("name " + name)
        console.log("age " + age)
        console.log("desc " + description)
        console.log("type " + type)

        if (checkBtn.current.context._errors.length === 0) {
            addNewPet(name, age, description, type).then(
                () => {
                    setMessage("New pet was added");
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

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeAge = (e) => {
        const age = e.target.value;
        setAge(age);
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const onChangeType = (e) => {
        const type = e.target.value;
        setType(type);
    };

    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <Form onSubmit={handleAddPet} ref={form}>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <Input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Add name"
                                        value={name}
                                        onChange={onChangeName}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        type="number"
                                        name="age"
                                        className="form-control"
                                        placeholder="Add age"
                                        value={age}
                                        onChange={onChangeAge}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <Input
                                        type="text"
                                        name="description"
                                        className="form-control"
                                        placeholder="Add description"
                                        value={description}
                                        onChange={onChangeDescription}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="select-type">
                                    <strong>Type:</strong>
                                <select className="form-group" value={type} onChange={onChangeType}>
                                    <option value="cat">CAT</option>
                                    <option value="dog">DOG</option>
                                </select>
                            </div>
                                <div className="add-pet-button">
                                    <button className="btn btn-secondary btn-block">Add pet</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <Alert className="alert-valid" severity="info">{message}</Alert>
                        )}
                        <CheckButton style={{display: "none"}} ref={checkBtn}/>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );

};


export default NewPet;