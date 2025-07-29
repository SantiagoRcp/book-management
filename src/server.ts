import app from "./app";

const port = process.env.PORT || 8787;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`server is running at http://${host}:${port}`);
});
