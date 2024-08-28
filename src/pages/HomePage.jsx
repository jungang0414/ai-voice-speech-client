import { db, auth } from "../firebase/config";
import { query, collection, onSnapshot } from "firebase/firestore";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import SignIn from "../components/SignIn";

function HomePage() {
  //儲存使用者狀態變數
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "taichungNews"));
    const unsubscribe = onSnapshot(q, (querySnapshots) => {
      const data = [];
      querySnapshots.forEach((doc) => {
        data.push(doc.data());
      });
      setNewsList(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("目前使用者狀態 :", user);
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const onSignOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {user ? (
              <Box
                sx={{
                  mt: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button variant="outlined" onClick={onSignOut}>
                  登出
                </Button>
              </Box>
            ) : null}
          </>
        )}
        <>
          {!user ? (
            <SignIn />
          ) : (
            <Box>
              {newsList.map((news) => (
                <Accordion key={news.id}>
                  <AccordionSummary
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>{news.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{news.content}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </>
      </Container>
    </>
  );
}

export default HomePage;
