import express from 'express'
import { login,register} from '../controllers/auth.controller.js'
import { registerSchema, loginSchema } from '../validators/auth.validator.js'
import {validate} from '../middlewares/validate.js'

const router = express.Router({mergeParams: true})

router.post("/register", validate(registerSchema),register)
router.post('/login', validate(loginSchema), login);
export default router