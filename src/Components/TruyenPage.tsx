import { Box, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getTruyen } from "../api";
import { Truyen } from "./types";

interface TruyenContext {
  truyen: Truyen | undefined;
}

const TruyenContext = React.createContext<TruyenContext>({
  truyen: undefined,
});

export const TruyenPage = () => {
  const { slug } = useParams();
  const [truyen, setTruyen] = useState<Truyen>();

  useEffect(() => {
    if (slug) {
      getTruyen(slug).then((truyenObj) => {
        setTruyen(truyenObj);
      });
    }
  }, [slug]);

  return (
    <TruyenContext.Provider value={{ truyen }}>
      <Outlet />
    </TruyenContext.Provider>
  );
};

export { TruyenContext };
