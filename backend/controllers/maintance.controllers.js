import {con }from "../db/connectDb.js"

export const showAllTables= async (req, res) =>{
    let allres = [];
        console.log("displaying all Tables");
    
        try {
            await con.query('USE testDB;');
            
            const [studentResult] = await con.query(`select * from student;`);
            allres.push(studentResult);
    
            const [companyResult] = await con.query(`select * from company;`);
            allres.push(companyResult);
    
            res.send(allres);
        } catch (err) {
            console.log(err.sqlMessage);
            res.status(500).send("Internal Server ERROR ",err.sqlMessage);
        }

    
}
export const createDb=async(req, res) =>{
    try {   
        const studentResult = await con.query(` CREATE DATABASE testDB;`);
        res.send(studentResult);
    } catch (err) {
        console.log(err.sqlMessage);
        res.status(500).send("Internal Server ERROR ",err.sqlMessage);
    }
    
}
export const createTables = async (req, res) => {
        let allres = [];
        console.log("creating all Tables");
    
        try {
            await con.query('USE testDB;');
            
            const [studentResult] = await con.query(`create table student(
                studentid int primary key AUTO_INCREMENT,
                name varchar(50),
                department varchar(30),
                mobile_number int,
                email varchar(50),
                dob date,
                gender varchar(50)
                password VARCHAR(255);
            );`);
            allres.push(studentResult);
    
            const [companyResult] = await con.query(`create table company(
                companyid int primary key AUTO_INCREMENT,
                companyname varchar(50),
                industry varchar(50),
                email varchar(40),
                location varchar(40)
                password VARCHAR(255);
            );`);
            allres.push(companyResult);
    
            res.send(allres);
        } catch (err) {
            console.log(err.sqlMessage);
            res.status(500).send("Internal Server ERROR ",err.sqlMessage);
        }

    // let query3=`create table company_profile(companyid int,companyname varchar(30),assets varchar(30),foreign key(companyid) references company(companyid),foreign key(companyname) references company(companyname));`
    // con.query(query3,(err,result)=>{
    //     if (err) throw err;
    //     console.log(result);
    // })
    // let query4=`create table job(jobid  int primary key AUTO_INCREMENT,job_description varchar(30),job_tittle varchar(40),salary int,companyid int,foreign key(companyid) references company(companyid));`
    // con.query(query4,(err,result)=>{
    //     if (err) throw err;
    //     console.log(result);
    // })
    // let query5=`create table interview(interviewid int primary key AUTO_INCREMENT,interview_date date,jobid int,studentid int,foreign key(jobid) references job(jobid),foreign key(studentid) references student(studentid));`
    // con.query(query5,(err,result)=>{
    //     if (err) throw err;
    //     console.log(result);
    // })
    // let query6=``
    // con.query(query6,(err,result)=>{
    //     if (err) throw err;
    //     console.log(result);
    // })


    console.log("created all Tables")
}