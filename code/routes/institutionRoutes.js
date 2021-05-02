import { Router } from 'express';
import institutionController from '../controllers/InstitutionController';
import auth from '../middlewares/auth';

const router = new Router();

router
  .get('/', auth, institutionController.show)
  .post('/', auth, institutionController.store)
  .put('/', auth, institutionController.update)
  .delete('/', auth, institutionController.delete);

export default router;
