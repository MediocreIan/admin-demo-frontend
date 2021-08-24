import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom'



export default function Landing() {
  let history = useHistory()

  const [orgs, setOrgs] = useState([]);
  const [height, setHeight] = useState(0);

  useEffect(async () => {
    const c = document.getElementById('container').clientHeight
    setHeight(2 * Math.round((c / 12.8) / 2))
    if (orgs.length < 1) {
      // let users = await getUsers()
      fetch("https://admin.demo.threekit.com/all")
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setOrgs(result)
        }
        )
        .catch(error => console.log('error', error));
    }
  }, [orgs])

  // function getUsers() {
  //   return fetch('https://admin.demo.threekit.com/all')
  //     .then(response => response.json())
  //     .then(result => {
  //       return result
  //     })
  //     .catch(error => console.log('error', error))
  // }

  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: 'auto',
        padding: 10,
        // width: theme.spacing(16),
        // height: theme.spacing(16),
      },
    },
  }));
  const classes = useStyles();

  return (
    <>
      <div className={`${classes.root}`} >
        <Typography
          variant="h6"
          id="no-hover"
          style={{
            display: "block",
            width: "100%",
            textAlign: "center"
          }}
        >categories</Typography>
        <Paper elevation={2} id="container" className="landing-paper" style={{ display: 'flex', minHeight: "60vh" }}>
          <div>
          </div>
          <Grid
            container
            direction='row'
            alignContent='flex-start'
            justifyContent={orgs.length > 0 ? null : 'center'}

            style={{
              maxHeight: '70vh'
            }}
          >
            {orgs.length > 0 ? orgs.map((org) => {
              console.log(org)
              return (<Grid
                key={org.id}
                item
                align='center'
                style={{
                  width: '50%',
                  marginTop: '3px'
                }}
                onClick={() => {
                  history.push(`/listing/${org.name}/${org._id}/${org.publicToken}`)
                }}
              >
                <Typography
                  noWrap
                  variant="body2"
                  style={{
                    textDecoration: "underline",
                  }}
                  id="clickable_typography"
                >{org.name}</Typography>
                {/* <Typography variant="caption">{org.userName}</Typography> */}
              </Grid>)
            }) :
              <>
                {[...Array(height)].map((elementInArray, i) => (
                  < Grid
                    item
                    key={i}
                    align='center'
                    justifyContent='center'
                    style={{
                      width: '45%',
                      margin: '3px'
                    }}
                  >
                    <Skeleton variant="text" style={{ width: '100%' }} />
                  </Grid>
                )
                )}
              </>
            }
          </Grid>
        </Paper>

      </div>
    </>
  )
}
