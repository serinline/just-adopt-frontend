import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

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
      <div className="main-content">
        <Card className={classes.root} variant="outlined">
          <CardContent>
              <div className="image-profile"><PersonIcon fontSize={'large'}/></div>

              <div className="content-profile">
                   <div className="desc-content">
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
              </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default Profile;
