import { Router } from 'express';
import personController from '../controllers/PersonController';
import auth from '../middlewares/auth';

const router = new Router();

router
  .get('/', auth, personController.show)
  .post('/', auth, personController.store)
  .put('/', auth, personController.update)
  .delete('/', auth, personController.delete);

export default router;
