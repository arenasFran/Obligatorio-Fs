import express from 'express'
import { updateUser } from '../controllers/user.controller.js'
const router = express.Router({mergeParams: true})

router.patch("/", updateUser)

export default router