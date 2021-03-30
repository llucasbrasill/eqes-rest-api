import { Router } from 'express';
import authController from '../controllers/AuthController';

const router = new Router();

router.get('/', authController.index);
router.post('/', authController.store);
/*
router.get('/id', authController.show);
router.put('/', authController.update);
router.delete('/', authController.delete);
*/

export default router;
