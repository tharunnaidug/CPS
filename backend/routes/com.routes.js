import express from "express"
import {login,signup,getProfile} from "../controllers/com.controllers.js"
import{isLoggedIn} from "../middleware/isComLoggedin.js"

const router=express()

router.post("/signup",signup)
router.post("/login",login)
router.post("/getProfile",isLoggedIn,getProfile)

export default router