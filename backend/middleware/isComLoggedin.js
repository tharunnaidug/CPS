import express from "express"

export const isLoggedIn =(req, res, next) => {
    console.log(req.cookies.comid,"cc")
    if (!req.cookies.comid) {
        return res.status(400).json({ error: "No Companyid Found" })
    }
    req.comid=req.cookies.comid;
    next();
}