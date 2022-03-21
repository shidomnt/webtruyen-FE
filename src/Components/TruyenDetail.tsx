import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTruyen } from '../api'
import { SideBar } from './SideBar'
import { Chapter, Truyen } from './types'

export const TruyenDetail = () => {
  const { slug } = useParams()
  const [truyen, setTruyen] = useState<Truyen>()

  useEffect(() => {
    if (slug) {
      getTruyen(slug).then((truyenObj) => {
        setTruyen(truyenObj)
      })
    }
  }, [slug])

  if (!truyen) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid container item xs={8}>
        <Stack spacing={4}>
          <Box>
            <Typography
              sx={{ textAlign: 'center' }}
              gutterBottom
              variant="h4"
              component="div"
            >
              {truyen.title}
            </Typography>
            <Card sx={{ width: '100%', flexDirection: 'column' }}>
              <CardActionArea
                sx={{ display: 'flex', justifyContent: 'flex-start' }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: '200px' }}
                  image={truyen.cover}
                  alt="cover"
                />
                <CardContent>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          Tên khác
                        </Grid>
                        <Grid item xs={9}>
                          {truyen.otherName.join(' ; ')}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          Tác giả
                        </Grid>
                        <Grid item xs={9}>
                          {truyen.author}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          Tình trạng
                        </Grid>
                        <Grid item xs={9}>
                          {truyen.status}
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container>
                        <Grid item xs={3}>
                          Thể loại
                        </Grid>
                        <Grid item xs={9}>
                          {truyen.kind.join(' - ')}
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          <Box>
            <Card sx={{ width: '100%' }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Nội dung chính
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truyen.detail}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Danh sách Chapter</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {truyen?.chapters?.map((chapter) => (
                    <TableRow key={chapter.chapNumber}>
                      {Object.keys(chapter)
                        .filter(
                          (key) => !['_id', 'images', 'url'].includes(key)
                        )
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
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <SideBar />
      </Grid>
    </Grid>
  )
}
