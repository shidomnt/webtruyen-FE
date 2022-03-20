import { Autocomplete, Grid, TextField } from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../assets/img/logo.png';

function Dashboard() {
  return (
    <React.Fragment>
      <Grid
        maxWidth={1000}
        margin="auto"
        container
        spacing={2}
      >
        <Grid container item xs={12} spacing={2}>
          <Grid
            item
            xs={3}
            container
            alignItems="center"
            justifyContent="center"
          >
            <img src={logo} alt="logo"/>
          </Grid>
          <Grid item xs>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              renderInput={(params) => (
                <TextField {...params} label="Tìm kiếm truyện" />
              )}
            />
          </Grid>
          <Grid item xs={3} container justifyContent="center">
            <Link to="/login">Login</Link> /<Link to="/register">Register</Link>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={4}>
            <img src={logo} alt="logo" />
          </Grid>
          <Grid item xs={8}>
            The loai
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Dashboard;
