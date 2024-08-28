import { useEffect, useState } from "react";
import { auth, storage } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ref, listAll, getDownloadURL } from "firebase/storage";

function AudioList() {
  const [audioFiles, setAudioFiles] = useState([]);

  //儲存使用者狀態變數，未來可以使用 redux做狀態管理
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscript = onAuthStateChanged(auth, (user) => {
      console.log("目前使用者狀態", user);
      setUser(user);
    });
    return () => unsubscript();
  }, []);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      const listRef = ref(storage, "audio");
      try {
        const res = await listAll(listRef);
        const files = await Promise.all(
          res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );
        setAudioFiles(files);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAudioFiles();
  }, []);

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
              請登入後顯示音源內容
            </Button>
          </Box>
        ) : (
          <>
            <Typography m={2}>Storage List</Typography>
            <Box>
              {audioFiles.map((file, index) => (
                <Box key={index}>
                  <Box>
                    <Typography mt={2} mb={1} ml={2}>
                      {file.name}
                    </Typography>
                    <audio
                      controls
                      src={file.url}
                      style={{ width: "100%" }}
                    ></audio>
                    <Divider />
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default AudioList;
