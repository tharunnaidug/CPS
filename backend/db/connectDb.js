import mysql from "mysql2/promise"

export const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tarun',
    database: 'testDB'
});

// export const connectdb=()=>{
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });
// }
