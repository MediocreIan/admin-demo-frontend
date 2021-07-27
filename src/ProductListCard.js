import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

export default function MediaControlCard(props) {
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory()
    console.log(props.userId)


    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {props.product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.product.description}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" onClick={() => {
                        history.push(`/details/${props.userId}/${props.product.id}`)
                    }}>
                        details
                    </Typography>

                </CardContent>
            </div>
            <CardMedia
                className={classes.cover}
                image={props.product.image}
                title="Live from space album cover"
            />
        </Card>
    );
}