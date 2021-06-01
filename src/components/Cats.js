import React, { useState, useEffect  } from "react";

import Typography from '@material-ui/core/Typography';
import "../style/Questions.css"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';

import "../style/pet.css"
import UploadImages from "./UploadImages";

const useStyles = makeStyles({
    root: {
        maxWidth: 900,
    },
});

function  Cats() {
    const [cats, setCats] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined);

    const classes = useStyles();
    let props = {
        catData: cats,
        styleData: classes,
        user: currentUser
    };

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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user)
        if (user) {
            setCurrentUser(user);
            console.log(user)
        }
    }, []);

    return (
        <div className="main-content">
            <Card variant="outlined">
                <ItemListerCats {...props} />
            </Card>
        </div>
    );

}

const ItemListerCats = (props) =>
    <div className="pet-content">
    { props.catData.map(cat => (
        <div key={cat.id}>

            <Card className={props.styleData.root}>
                <CardContent>
                    <div className="pet-photo">
                        {cat.image && <img src={`data:image/jpeg;base64,${cat.image.data}`} alt="cat"/>}
                    </div>
                    <div className="card-content">
                        <Typography gutterBottom variant="h5" component="h2">
                            Imię: {cat.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Wiek: około { cat.age } lat
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Opis: { cat.description }
                        </Typography>
                    </div>
                    {props.user.admin && cat.image === null && <UploadImages name={cat.name}/>}
                </CardContent>
            </Card>
        </div>
    ))}
    </div>

export default Cats;