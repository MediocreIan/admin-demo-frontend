/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import NestedConfig from './NestedConfig'
import TuneIcon from '@material-ui/icons/Tune'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

export default function TemporaryDrawer(props) {
  useEffect(() => {
    // console.log(props)
  }, [])
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false
  })

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role='presentation'
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <NestedConfig data={props.data} configurator={props.configurator} />
    </div>
  )

  return (
    <div>
      <React.Fragment key={'bottom'}>
        <TuneIcon variant="contained" onClick={toggleDrawer('bottom', true)} color="primary">Configure</TuneIcon>
        <Drawer
          anchor={'bottom'}
          open={state['bottom']}
          onClose={toggleDrawer('bottom', false)}
        >
          {list('bottom')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}
