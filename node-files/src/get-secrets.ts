import fs from "fs";

type SecretsArray = string[];
interface SecretsObj {
  [key: string]: string;
}

export const getSecrets = (
  arr: SecretsArray
) => {
  const secretPath =  "/run/secrets/";
  const parsed: SecretsObj = {};
  arr.forEach((item) => {
    try {
      console.log(`try to get file = ${secretPath}${item}`);
      parsed[item] = fs.readFileSync(`${secretPath}${item}`, {
        encoding: "utf8",
      });
    } catch (err: any) {
      if (err.code !== "ENOENT") {
        console.error(`There was a problem getting secret: ${item}`, err);
      }
    }
  });
  return parsed;
};


// const env = getSecrets(['THEPASSWORD1', 'THEPASSWORD2'])

// console.log('NODE_ENV =', process.env.NODE_ENV); 
// console.log('process.env.THEPASSWORD1=', process.env.THEPASSWORD1); // expect undefined
// console.log("parsed THEPASSWORD1=", env.THEPASSWORD1); // expect value 
