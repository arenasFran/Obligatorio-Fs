import express from 'express'
import { updateUser } from '../controllers/user.controller.js'
const router = express.Router({mergeParams: true})

router.patch("/user", updateUser)

export default router