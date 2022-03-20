import { Autocomplete, Box, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { searchByQuery } from '../api'
import { ReactComponent as Logo } from '../assets/img/logo.svg'
import { Truyen } from './types'

function Dashboard() {
  const [searchInput, setSearchInput] = useState('')
  const [searchOption, setSearchOption] = useState<
    Array<Pick<Truyen, 'title' | 'slug' | 'cover'>>
  >([])

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (searchInput) {
      id = setTimeout(() => {
        searchByQuery({ title: searchInput }).then((options) => {
          if (options) {
            setSearchOption(options)
          }
        })
      }, 500)
    }
    return () => {
      clearTimeout(id)
    }
  }, [searchInput])

  return (
    <React.Fragment>
      <Grid maxWidth={1000} margin="auto" container spacing={2}>
        <Grid container item xs={12} spacing={2} sx={{ height: '100%' }}>
          <Grid
            item
            xs={3}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Link to="/">
              {/* <img style={{height: '100%'}} src={logo} alt="logo"/> */}
              <Logo height={55} />
            </Link>
          </Grid>
          <Grid item xs>
            <Autocomplete
              disablePortal
              options={searchOption}
              renderOption={(props, option) => (
                <Link to={`/truyen-tranh/${option.slug}`} key={option.slug}>
                  <Box sx={{ display: 'flex', padding: '5px' }}>
                    <img
                      src={option.cover}
                      style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                      }}
                      alt=""
                    />
                    <Box sx={{ flex: '1' }}>{option.title}</Box>
                  </Box>
                </Link>
              )}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  label="Tìm kiếm truyện"
                />
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
            {/* <img src={logo} alt="logo" /> */}
            <Logo height={55} />
          </Grid>
          <Grid item xs={8}>
            The loai
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Dashboard
