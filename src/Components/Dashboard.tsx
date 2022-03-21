import { Autocomplete, Container, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { searchByQuery } from "../api";
import { ReactComponent as Logo } from "../assets/img/logo.svg";
import { Truyen } from "./types";

function Dashboard() {
  const [searchInput, setSearchInput] = useState("");
  const [searchOption, setSearchOption] = useState<
    Array<Pick<Truyen, "title" | "slug" | "cover">>
  >([]);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (searchInput) {
      id = setTimeout(() => {
        searchByQuery({ title: searchInput }).then((options) => {
          if (options) {
            setSearchOption(options);
          }
        });
      }, 500);
    }
    return () => {
      clearTimeout(id);
    };
  }, [searchInput]);

  return (
    <React.Fragment>
      <Container sx={{ width: "1000px" }}>
        <Stack spacing={2}>
          <Grid
            container
            spacing={2}
            sx={{ height: "100%", padding: "16px 0" }}
          >
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
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) => true}
                renderOption={(props, option) => (
                  <li {...props} key={option.slug}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/truyen-tranh/${option.slug}`}
                    >
                      {option.title}
                    </Link>
                  </li>
                )}
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
              <Link to="/login">Login</Link> /
              <Link to="/register">Register</Link>
            </Grid>
          </Grid>
          <Outlet />
          <Grid container>
            <Grid item xs={4}>
              {/* <img src={logo} alt="logo" /> */}
              <Logo height={55} />
            </Grid>
            <Grid item xs={8}>
              Thong tin lien he....
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
