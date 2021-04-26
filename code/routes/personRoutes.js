import { Router } from 'express';
import personController from '../controllers/PersonController';
import auth from '../middlewares/auth';

const router = new Router();

router.get('/', auth, personController.show);
router.post('/', auth, personController.store);
router.put('/', auth, personController.update);
router.delete('/', auth, personController.delete);

export default router;
