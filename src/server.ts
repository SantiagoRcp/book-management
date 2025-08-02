import app from "./app";
import { PORT, HOST } from "./config/index";

const port = PORT;
const host = HOST;

app.listen(port, () => {
  console.log(`server is running at http://${host}:${port}`);
});
