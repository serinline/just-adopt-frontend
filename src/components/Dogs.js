import React, {useState, useEffect} from "react";

import Typography from '@material-ui/core/Typography';
import "../style/Questions.css"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "../style/Questions.css"
import { makeStyles } from '@material-ui/core/styles';

import "../style/pet.css"
import UploadImages from "./UploadImages";

const useStyles = makeStyles({
    root: {
        maxWidth: 900,
    },
});

function Dogs() {
    const [dogs, setDogs] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined);

    const classes = useStyles();
    let props = {
        dogData: dogs,
        styleData: classes,
        user: currentUser
    };

    useEffect(() => {
        fetch("https://justadopt-6ygf3gqmiq-uc.a.run.app/pets/all/dog", {
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
                <ItemListerDogs {...props} />
            </Card>
        </div>
    );

}

const ItemListerDogs = (props) =>
    <div className="pet-content">
        { props.dogData.map(dog => (
            <div key={dog.id}>

                <Card className={props.styleData.root}>
                    <CardContent>
                        <div className="pet-photo">
                            {dog.image && <img src={`data:image/jpeg;base64,${dog.image.data}`} alt="dog"/>}
                        </div>
                        <div className="card-content">
                            <Typography gutterBottom variant="h5" component="h2">
                                Imię: {dog.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Wiek: około { dog.age } lat
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Opis: { dog.description }
                            </Typography>
                        </div>
                        {props.user.admin && dog.image === null && <UploadImages name={dog.name}/>}
                    </CardContent>
                </Card>
            </div>
        ))}
    </div>


export default Dogs;