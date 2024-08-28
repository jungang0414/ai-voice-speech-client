import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { query, onSnapshot, collection } from "firebase/firestore";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function SingleNews() {
  const [data, setData] = useState([]);

  //儲存使用者狀態變數
  const [user, setUser] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "singleNews"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setData(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscript = onAuthStateChanged(auth, (user) => {
      console.log("目前使用者狀態", user);
      setUser(user);
    });
    return () => unsubscript();
  }, []);

  //正式環境再將這裡修改成自己的API，這裡使用Railway製作後端
  const url =
    "https://ai-voice-speech-server-production.up.railway.app/api/v1/singleNews";

  const handleSearchNowNews = () => {
    try {
      fetch(url);
      alert("獲取最新文章資料");
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <>
      <Container>
        {!user ? (
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button LinkComponent={Link} to={"/"} variant="outlined">
              請登入後顯示文章內容
            </Button>
          </Box>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={handleSearchNowNews}
              sx={{ mt: 2 }}
            >
              抓取單一資料&回傳顯示
            </Button>
            {data.length > 0 && (
              <>
                <Typography mt={2}>{data[0].name}</Typography>
                <Divider />
                <Typography mt={2} mb={2}>
                  {data[0].cleanedContent}
                </Typography>
                <Divider />
                <Typography variant="body1" align="justify">
                  {data[0].content}
                </Typography>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default SingleNews;
