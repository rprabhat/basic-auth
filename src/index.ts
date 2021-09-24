import express from 'express';
import { userService, UserAuth } from './userLogins';
const app = express()
const port = 3000

app.use(express.json())

app.get('/status', (req, res) => { res.status(200).end(); });
app.head('/status', (req, res) => { res.status(200).end(); });

const decodeBasicAuth = (header: string): UserAuth => {
  const [_, encodedAuth] = header.split(' ');
  
  if(encodedAuth){
    const decodedAuth = Buffer.from(encodedAuth, 'base64').toString('binary');
    const [username, password] = decodedAuth.split(':');
    return { userLogin: username, password: password };
  } else 
    return undefined;
}

const unauthorized = (message: string,res: express.Response ) => res.status(401).json({
  ok: false,
  status: 401,
  message: message
});

const basicAuthHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // implementation here
  const header = req.headers.authorization;

  if (!header) {
    unauthorized('Required authorization header not found', res);
    return;
  }

  if (!userService.validateUser(decodeBasicAuth(header))) {
    unauthorized('password does not match', res);
    return;
  }

  // authentication succesful, pass request onto next middleware
  res.status(200);
  next();
}

app.get('/basic-auth', basicAuthHandler, (req: express.Request, res: express.Response) => {
  res.status(200).end();
})

export const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})