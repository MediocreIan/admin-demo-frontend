import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Hidden from '@material-ui/core/Hidden'
import { useHistory } from 'react-router-dom'

const drawerWidth = '100%'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

export default function Landing(props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [users, setUsers] = useState([])

  const classes = useStyles()
  const { window } = props
  const container =
    window !== undefined ? () => window().document.body : undefined
  function toggleDrawer() {
    setDrawerOpen(!drawerOpen)
  }
  let history = useHistory()

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('https://admin.demo.threekit.com/all', requestOptions)
      .then(response => response.json())
      .then(result => {
        setUsers(result)
      })
      .catch(error => console.log('error', error))
  }, [])

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {/* <Divider /> */}
      <List>
        {users.map((user, index) => (
          <ListItem
            button
            key={user.name}
            onClick={() => {
              history.push(
                `/listing/${user.name}/${user._id}/${user.publicToken}`
              )
              toggleDrawer()
            }}
          >
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={() => {
              setDrawerOpen(!drawerOpen)
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Threekit
          </Typography>
          <Button color='inherit'><img src="/logo.png" style={{
            height: '50px'
          }}></img></Button>
        </Toolbar>
      </AppBar>
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor='top'
          open={drawerOpen}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  )
}
