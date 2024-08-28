import { Container, Typography } from "@mui/material";

function Error404() {
  return (
    <div>
      <Container>
        <Typography variant="h1" sx={{ textAlign: "center " }}>
          404 Page Not Found
        </Typography>
      </Container>
    </div>
  );
}

export default Error404;
