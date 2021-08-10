import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom'


export default function Landing() {
  let history = useHistory()

  const [users, setUsers] = useState([])
  const [orgs, setOrgs] = useState([]);

  useEffect(async () => {
    if (orgs.length < 1) {
      let users = await getUsers()
      fetch("https://admin.demo.threekit.com/orgs")
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setOrgs(result)
        }
        )
        .catch(error => console.log('error', error));
    }
  }, [orgs])

  function getUsers() {
    return fetch('https://admin.demo.threekit.com/all')
      .then(response => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error))
  }

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
          <Grid
            container
            direction='row'

            style={{
              maxHeight: '70vh'
            }}
          >
            {orgs.length > 0 ? orgs.map((org) => {
              return (<Grid
                key={org.id}
                item
                align='center'
                style={{
                  width: '50%',
                  marginTop: '3px'
                }}
                onClick={() => {
                  history.push(`/listing/${org.userName}/${org.userId}/${org.publicToken}`)
                }}
              >
                <Typography
                  noWrap
                  variant="body2"
                  style={{
                    textDecoration: "underline",
                  }}
                >{org.name}</Typography>
                {/* <Typography variant="caption">{org.userName}</Typography> */}
              </Grid>)
            }) : null}
          </Grid>
        </Paper>

      </div>
    </>
  )
}
