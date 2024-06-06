import express from "express"
import {createTables,showAllTables} from "../controllers/maintance.controllers.js"

const router=express()

router.get("/create",createTables)
router.get("/showAll",showAllTables)

export default router