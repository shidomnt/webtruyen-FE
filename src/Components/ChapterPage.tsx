import { List, ListItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChapter } from "../api";
import Loading from "./Loading";
import { TruyenContext } from "./TruyenPage";
import { Chapter } from "./types";

export const ChapterPage = () => {
  const [chapter, setChapter] = useState<Chapter>();
  const { chapNumber } = useParams();
  const { truyen } = useContext(TruyenContext);

  useEffect(() => {
    if (truyen) {
      const { slug } = truyen;
      if (slug && chapNumber) {
        getChapter(slug, chapNumber).then((chapterData) => {
          if (chapterData) {
            setChapter(chapterData);
          }
        });
      }
    }
  }, [chapNumber, truyen]);

  if (!chapter) {
    return <Loading />;
  }

  return (
    <List>
      {chapter.images.map((image, index) => (
        <ListItem key={index} sx={{ padding: "0 16px" }}>
          <img
            style={{ width: "100%" }}
            src={image}
            alt={String(chapter.chapNumber)}
          />
        </ListItem>
      ))}
    </List>
  );
};
