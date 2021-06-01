import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PetsIcon from '@material-ui/icons/Pets';
import "../style/Homepage.css"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});


const Homepage = () => {
  const classes = useStyles();

  return (
    <div className="main-content">
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className="desc-content">
        <Typography variant="h4" component="h4"></Typography>
          <Typography variant="h4" component="h4">Krakowskie schronisko dla zwierząt <PetsIcon/></Typography>
          <Typography variant="body2" component="p" className="profile-content">
        </Typography>
        </div>

        <div className="desc-content">
          <Typography variant="body2" component="p" className="profile-content">
          Witaj na stronie krakowskiego schroniska dla bezdomnych zwierząt. Zapraszamy do przeglądania pupili, które
          czekają na dom.
        </Typography>
        </div>

        <div className="desc-content">
        <Typography variant="h5" component="h2">Nie czekaj, znajdź przyjaciela!</Typography>
        </div>

      </CardContent>
    </Card>
    </div>
  );
};

export default Homepage;
