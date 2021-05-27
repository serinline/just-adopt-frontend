import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "../style/Profile.css"

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
  },
});


const Profile = () => {
  const classes = useStyles();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
      ` <div className="desc-content">
          <Typography variant="h5" component="h2">Your Profile</Typography>
        </div>

        <div className="desc-content">
          <Typography variant="body2" component="p" className="profile-content">
          <strong>Username:</strong> {currentUser.username}
        </Typography>
      </div>

      <div className="desc-content">
        <Typography variant="body2" component="p" className="profile-content">
        <strong>Email:</strong> {currentUser.email}
        </Typography>
      </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
