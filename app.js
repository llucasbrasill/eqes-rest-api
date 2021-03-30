import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import coursesRouter from './code/routes/coursesRoutes';
import usersRouter from './code/routes/userRoutes';
import authRouter from './code/routes/authRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api/cursos', coursesRouter);
    this.app.use('/api/users', usersRouter);
    this.app.use('/api/auth', authRouter);
  }
}

export default new App().app;
