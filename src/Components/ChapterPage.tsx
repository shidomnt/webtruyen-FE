import { Box, CircularProgress, List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChapter } from '../api';
import { Chapter } from './types';

export const ChapterPage = () => {
  const [chapter, setChapter] = useState<Chapter>();
  const { slug, chapNumber } = useParams();

  useEffect(() => {
    if (slug && chapNumber) {
      getChapter(slug, chapNumber)
        .then(chapterData => {
          if (chapterData) {
            setChapter(chapterData);
          }
        })
    }
  }, [slug, chapNumber])

  if (!chapter) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List>
      {
      chapter.images.map(image => (
        <ListItem>
          <img src={image} alt={String(chapter.chapNumber)} />
        </ListItem>
      ))
    }
    </List>
  );
};
