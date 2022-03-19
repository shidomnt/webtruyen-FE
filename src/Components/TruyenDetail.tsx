import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTruyen } from '../api';
import { SideBar } from './SideBar';
import { Chapter, Truyen } from './types';

export const TruyenDetail = () => {
  const { slug } = useParams();
  const [truyen, setTruyen] = useState<Truyen>();

  useEffect(() => {
    if (slug) {
      getTruyen(slug).then((truyenObj) => {
        setTruyen(truyenObj);
      });
    }
  }, [slug]);

  if (!truyen) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid container item xs={8}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{ textAlign: 'center' }}
              gutterBottom
              component="h5"
            >
              {truyen.title}
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <img
                style={{ width: '100%' }}
                src={truyen.cover}
                alt={truyen.title}
              />
            </Grid>
            <Grid item xs={8}>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={3}>
                      Ten khac
                    </Grid>
                    <Grid item xs={9}>
                      {truyen.otherName.join(' ; ')}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={3}>
                      Tac gia
                    </Grid>
                    <Grid item xs={9}>
                      {truyen.author}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={3}>
                      Tinh trang
                    </Grid>
                    <Grid item xs={9}>
                      {truyen.status}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={3}>
                      The loai
                    </Grid>
                    <Grid item xs={9}>
                      {truyen.kind.join(' - ')}
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {truyen.detail}
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(truyen?.chapters?.[0]!)
                    .filter((key) => !['_id', 'images', 'url'].includes(key))
                    .map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {truyen?.chapters?.map((chapter) => (
                  <TableRow>
                    {Object.keys(chapter)
                      .filter((key) => !['_id', 'images', 'url'].includes(key))
                      .map((key) => (
                        <TableCell key={key}>
                          <Link
                            to={String(chapter.chapNumber)}
                            style={{ textDecoration: 'none' }}
                          >
                            {`Chapter ${chapter[key as keyof Chapter]}`}
                          </Link>
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <SideBar />
      </Grid>
    </Grid>
  );
};
