import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';

export default function Landing() {

  const [users, setUsers] = useState([])

  useEffect(() => {

    fetch('https://admin.demo.threekit.com/all')
      .then(response => response.json())
      .then(result => {
        setUsers(result)
        console.log(result)
      })
      .catch(error => console.log('error', error))
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: 'auto',
        padding: 10,
        // width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div className={`${classes.root}`}>
        <Paper elevation={2} className="landing-paper">
          <center>
            <h4>Welcome</h4>
            <p>To get started, navigate to a series of demos by selecting a user from the menu.</p>

          </center>
        </Paper>

      </div>
    </>
  )
}
