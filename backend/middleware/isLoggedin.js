import express from "express"

export const isLoggedIn =(req, res, next) => {
    console.log(req.cookies)
    if (!req.cookies.sid) {
        return res.status(400).json({ error: "No Sid Found" })
    }
    req.sid=req.cookies.sid;
    next();
}