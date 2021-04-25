import { Router } from 'express';
import userController from '../controllers/UserController';
import auth from '../middlewares/auth';

const router = new Router();
router.get('/:id', userController.show);
router.get('/', userController.index);
router.post('/', userController.store);
router.put('/', auth, userController.update);
router.delete('/', auth, userController.delete);

export default router;
