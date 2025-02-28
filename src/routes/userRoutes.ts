import express from 'express';
import { createUser, validateUser } from '../controllers/UserController';

const router = express.Router();

router.post('/users', validateUser, createUser);

export default router;
