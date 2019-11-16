import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import WcIcon from '@material-ui/icons/Wc';
import FlagIcon from '@material-ui/icons/Flag';

export const MainListItems = withRouter((props) => (
  < Link to="/" >
    <ListItem button selected={props.location && props.location.pathname === '/'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </Link >
))

export const SecondaryListItems = withRouter((props) => {
  const pathname = props.location.pathname
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <Link to="/gender-charts">
        <ListItem button selected={pathname === '/gender-charts'}>
          <ListItemIcon>
            <WcIcon />
          </ListItemIcon>
          <ListItemText primary="Scores by gender" />
        </ListItem>
      </Link>
      <Link to="/country-charts">
        <ListItem button selected={pathname === '/country-charts'}>
          <ListItemIcon>
            <FlagIcon />
          </ListItemIcon>
          <ListItemText primary="Scores by country" />
        </ListItem>
      </Link>

    </div>
  )
})
