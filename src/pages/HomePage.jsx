import { db } from "../firebase/config";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function HomePage() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "taichungNews"));
    onSnapshot(q, (querySnapshots) => {
      const data = [];
      querySnapshots.forEach((doc) => {
        data.push(doc.data());
      });
      setNewsList(data);
    });
  });

  return (
    <>
      <Box>
        {newsList.map((news) => (
          <Accordion key={news.id}>
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              <Typography>{news.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {news.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
}

export default HomePage;
