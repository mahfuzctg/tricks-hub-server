
import express from 'express';
import { authControllers } from './auth.controllers';


import { authValidations } from './auth.validations';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
const router = express.Router();


router.post('/register', validateRequest(userValidations.userValidationSchema) , authControllers.createUser )

router.post('/login', validateRequest(authValidations.loginValidationSchema) , authControllers.loginUser )

export const AuthRoutes = router;