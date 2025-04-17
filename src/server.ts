import { Server } from "http";
import app from "./app";
import config from "./app/config";

const main = async () => {
  const server: Server = app.listen(config.port, () => {
    console.log(`${config.app_name} listening on port ${config.port}!`);
  });
};

main();
