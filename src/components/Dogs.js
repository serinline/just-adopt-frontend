import React, { useState, useEffect  } from "react";

import Typography from '@material-ui/core/Typography';
import "../style/Questions.css"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";



function  Dogs() {
    const [dogs, setDogs] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/pets/all/dog", {
            method: "GET",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setDogs(data);
            });
    }, []);
    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <ItemListerCats dogs={dogs} />
                </CardContent>
            </Card>
        </div>
    );

};

const ItemListerCats = (props) =>
    <div>
        { props.dogs.map(dog => (
            <div key={dog.id}>
                <Typography variant="h4" component="h4">Imię: {dog.name}</Typography>
                <div className="label">
                    <div className = "title2">Wiek: { dog.age } </div>
                    <div className = "title2">Opis: { dog.description } </div>
                </div>
            </div>
        ))}
    </div>


export default Dogs;