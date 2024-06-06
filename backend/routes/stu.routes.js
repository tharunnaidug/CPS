import express from "express"
import {login,signup,getPro} from "../controllers/stu.controllers.js"
import {isLoggedIn} from "../middleware/isLoggedin.js"

const router=express()

router.post("/signup",signup)
router.post("/login",login)
router.post("/getPro",isLoggedIn,getPro)

export default router
