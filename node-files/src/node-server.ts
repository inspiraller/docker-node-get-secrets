import Fastify from "fastify";
import { getSecrets } from "./get-secrets";

const env = getSecrets(['THEPASSWORD1', 'THEPASSWORD2'])

console.log('NODE_ENV =', process.env.NODE_ENV);
console.log('process.env.THEPASSWORD1=', process.env.THEPASSWORD1); // expect undefined
console.log("parsed THEPASSWORD1=", env.THEPASSWORD1); // expect value 

const server = Fastify();

server.get("/", (req, res) => {
  res.send({ message: "Success" });
});

const closeGracefully = async (signal: number) => {
  console.log(`*^!@4=> Received signal to terminate: ${signal}`)

  await server.close()
  // await db.close() if we have a db connection in this app
  // await other things we should cleanup nicely
  process.kill(process.pid, signal);
}
process.once('SIGINT', closeGracefully)
process.once('SIGTERM', closeGracefully)

const init = async () => {
  console.log("parsed THEPASSWORD1=", env.THEPASSWORD1);
  console.log('parsed THEPASSWORD2=', env.THEPASSWORD2);

  try {
    server.listen({ port: 80, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
    console.log(`*^!@4=> Process id: ${process.pid}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

init();
