import {con }from "../db/connectDb.js"

export const login=async(req, res) =>{
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const [rows] = await con.execute(`SELECT * FROM company WHERE email = ?`,[email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        const user = rows[0];

        if (password !=user.password) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        delete user.password;
        res.cookie("comid",user.companyid)
        res.json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}
export const signup =async (req, res) =>{
    const {name,ind,location,email,password}=req.body;     

    if (!name || !ind || !location || !email || !password ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    console.log("Signup")
    try {
        let query = `INSERT INTO company ( companyname, industry, email, location,password) VALUES (?, ?, ?, ?, ?)`;
        const [result] = await con.execute(query, [name, ind, email,location,password]);
        
        res.cookie("comid",result.companyid)
        res.json({ message: "User registered successfully", result });
    } catch (err) {
        console.log(err.sqlMessage);
        res.status(500).json({"message":err.sqlMessage});
    }
}
export const getProfile=async (req, res) =>{
    const  comid  = req.comid;
    console.log(comid)
    try {
        let query = `SELECT  companyname, industry, email, location FROM company WHERE companyid = ?`;
        const [rows] = await con.execute(query, [comid]); 

        res.json(rows);
    } catch (err) {
        console.log(err.sqlMessage);
        res.status(500).json({"message":`Internal Server Error ${err.sqlMessage}`});
    }
}