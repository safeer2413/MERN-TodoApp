import express from 'express'
import { authUser, registerUser, userLogoutHandler } from '../controller/userController.js'

const userRoutes = express.Router()

// login user
userRoutes.post('/login', authUser)

// register user
userRoutes.post('/register', registerUser)


userRoutes.get('/logout', userLogoutHandler)


export default userRoutes