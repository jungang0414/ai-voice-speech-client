import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { query, onSnapshot, collection, orderBy } from "firebase/firestore";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function SingleNews() {
  const [data, setData] = useState([]);
  //文章標題、內容
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  //儲存使用者狀態變數
  const [user, setUser] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    //依照時間排序，取出最新文章
    const q = query(
      collection(db, "singleNews"),
      orderBy("modifyDate", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setData(data);
      setTitle(data[0].name);
      setText(data[0].cleanedContent);
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
  const searchAPI =
    "https://ai-voice-speech-server-production.up.railway.app/api/v1/singleNews";

  const createAPI =
    "https://ai-voice-speech-server-production.up.railway.app/api/v1/createVoice";

  const handleSearchNowNews = async () => {
    setSearchLoading(true);
    try {
      await fetch(searchAPI);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setSearchLoading(false);
      alert("已獲取最新文章資料");
    }
  };

  const handleCreateVoice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(createAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, title }),
      });
      // 待增加使用者體驗 例: 等待時間確認
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Failed Post: ", error);
    } finally {
      alert("音源生成完畢");
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
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                variant="contained"
                onClick={handleSearchNowNews}
                sx={{ mt: 2 }}
              >
                抓取單一資料&回傳顯示
              </Button>
              <Button
                variant="contained"
                onClick={handleCreateVoice}
                sx={{ mt: 2 }}
              >
                生成音源
              </Button>
            </Box>
            {data.length > 0 && (
              <>
                {searchLoading ? (
                  <Box>
                    {searchLoading && <Typography>資料獲取中..</Typography>}
                  </Box>
                ) : (
                  <Box>
                    {" "}
                    <Typography mt={2}>{data[0].name}</Typography>
                    <Divider />
                    <Typography mt={2} mb={2}>
                      {data[0].cleanedContent}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" align="justify">
                      {data[0].content}
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default SingleNews;
