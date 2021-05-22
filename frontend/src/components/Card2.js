import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from "react-player";


const useStyles = makeStyles({
  root: {
    maxWidth: 265,
    marginLeft: '50px',
  },
  media: {
    height: 140,
  },
  title:{
      marginBottom: '15px'
  },
  container: {
      display: 'flex',
      justifyContent: 'center',
      alignContent:'center',
      alignItems: 'center'
  },
  precaution: {
    marginTop: '50px'
  },
  video:{
    display: 'inline-block',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: '40px',
  },
  container2: {
    display: 'flex',
    justifyContent: 'center',
    alignContent:'center',
    alignItems: 'center',
    marginTop: '20px'
}
});


function Card2() {
    const classes = useStyles();

    return (
        <>
        <div className={classes.container}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Annual Wellness Visit
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Set healthy goals for the coming year with a speciality trained people.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Advanced Care Planning
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Get assistance with creating end-of-life documents and plans.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Physical Intergration
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Connect the dots with symptoms and with physical conditions.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
        <div className={classes.container2} >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Collaborative Care Model
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        All providers remain up-to-date on their patient's physical records.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                         Patient Monitoring
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Smart Devices mointer patients chronic conditions and records it.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        Chronic Care
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Providers can keep track of patient's condition over period of time.
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
        <div className={classes.precaution}>
            <Typography variant="h4" color="textSecondary" component="p" className={classes.title}>
                        Precautions to take care during covid
            </Typography>
            <ReactPlayer className= {classes.video} url="https://www.youtube.com/watch?v=IT7ghcGy6r0"/>
            <ReactPlayer className= {classes.video} url="https://www.youtube.com/watch?v=BtN-goy9VOY"/>
        </div>
        </>
    )
}

export default Card2
