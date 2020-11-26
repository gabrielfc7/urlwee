import express from 'express';
import LinksRouter from "./routes/links";
import cors from 'cors';

//craição de uma nova aplicação express
const app = express();
//aplicação esta usando o tipo json de dados
app.use(express.json());
app.use(cors());
app.use(LinksRouter);

export default app;

