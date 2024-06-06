import {con }from "../db/connectDb.js"

export const login=async(req, res) =>{
    const { email, password } = req.body;
    console.log("Login")

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const [rows] = await con.execute(`SELECT * FROM student WHERE email = ?`,[email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid Email" });
        }

        const user = rows[0];

        if (password !=user.password) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        delete user.password;
        res.cookie("sid",user.studentid)
        res.json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}
export const signup =async(req, res) =>{
    const {name,dep,mobno,email,dob,gender,password}=req.body;   
    if (!name || !dep || !mobno || !email || !dob || !gender || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    console.log("Signup")
    try {
        let query = `INSERT INTO student (name, department, mobile_number, email, dob, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await con.execute(query, [name, dep, mobno, email, dob, gender,password]);
        
        res.cookie("sid",result.studentid)
        res.json({ message: "User registered successfully", result });
    } catch (err) {
        console.log(err.sqlMessage);
        res.status(500).json({"message":err.sqlMessage});
    }
}

export const getPro=async(req, res) =>{
    const  sid  = req.sid;
    console.log(sid)
    try {
        let query = `SELECT name, email, dob, gender,department,mobile_number FROM student WHERE studentid = ?`;
        const [rows] = await con.execute(query, [sid]); 

        res.json(rows);
    } catch (err) {
        console.log(err.sqlMessage);
        res.status(500).json({"message":`Internal Server Error ${err.sqlMessage}`});
    }
}