import { db, auth } from "../firebase/config";
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
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
  const [searchLoading, setSearchLoading] = useState(false);

  const [newsList, setNewsList] = useState([]);
  // 本地使用
  // const searchNewsApi = "http://localhost:3000/api/v1/AllNews"
  // 正式環境替換為 Railway
  const searchNewsApi = "https://ai-voice-speech-server-production.up.railway.app/api/v1/AllNews";

  useEffect(() => {
    const q = query(
      collection(db, "taichungNews"),
      orderBy("modifyDate", "desc"),
      limit(5)
    );
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

  const handleSearchAllNews = async () => {
    setSearchLoading(true);
    try {
      await fetch(searchNewsApi);
    } catch (error) {
      console.error("Failed fetch news: ", error);
    } finally {
      setSearchLoading(false);
    }
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleSearchAllNews}
                  sx={{ mt: 2 }}
                >
                  抓取當天新聞資料&回傳顯示
                </Button>
              </Box>
              <Box>
                {searchLoading ? (
                  <Box>
                    {searchLoading && <Typography>資料獲取中..</Typography>}
                  </Box>
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
              </Box>
            </Box>
          )}
        </>
      </Container>
    </>
  );
}

export default HomePage;
