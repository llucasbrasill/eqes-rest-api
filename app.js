import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import coursesRouter from './code/routes/coursesRoutes';
import usersRouter from './code/routes/userRoutes';
import andressRouter from './code/routes/andressRoutes';
import personRouter from './code/routes/personRoutes';
import institutionRouter from './code/routes/institutionRoutes';
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
    this.app
      .use('/api/cursos', coursesRouter)
      .use('/api/andress', andressRouter)
      .use('/api/users', usersRouter)
      .use('/api/person', personRouter)
      .use('/api/institution', institutionRouter)
      .use('/api/auth', authRouter);
  }
}

export default new App().app;
