import React, { useState, useEffect  } from "react";

import Typography from '@material-ui/core/Typography';
import "../style/Questions.css"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";



function  Cats() {
    const [cats, setCats] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/pets/all/cat", {
            method: "GET",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setCats(data);
            });
    }, []);
    return (
        <div>
            <Card variant="outlined">
                <CardContent>
                    <ItemListerCats cats={cats} />
                </CardContent>
            </Card>
        </div>
    );

};

const ItemListerCats = (props) =>
    <div>
    { props.cats.map(cat => (
        <div key={cat.id}>
            <Typography variant="h4" component="h4">Imię: {cat.name}</Typography>
            <div className="label">
                <div className = "title2">Wiek: { cat.age } </div>
                <div className = "title2">Opis: { cat.description } </div>
            </div>
        </div>
    ))}
    </div>


export default Cats;