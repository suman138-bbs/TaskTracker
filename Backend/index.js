import express from 'express';
import mysql from 'mysql';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173/"],
        credentials:true
    }
))
app.use(cookieParser());
app.use(express.json())
app.use(express.static('public'))



const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: process.env.DB_Password,  // Your SQL DB or(root password)
    insecureAuth: true,
    database: process.env.DB_Name   //Your SQL DB Name
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
})

con.connect(function (err) {
    if (err) {
        console.log("Error in connection",err.message)
    } else {
        console.log("connected")
    }
})
app.put('/editTask/:Id', (req, res) => {
    const id = req.params.Id;
    const sql = "UPDATE tasks SET name = ?,description = ?,start = ?,end = ? WHERE id = ?";
    const data = [
        req.body.name,
        req.body.description,
        req.body.start,
        req.body.end,
        id,
        

    ]
    con.query(sql, data, (err,result) => {
        if (err) return res.json({ Message: err.message })
        return res.json({
            Status: "Success",
            Message:result
        })
    }
    )
    

})

app.get('/get/:Id', (req,res) => {
    const id = req.params.Id;
    const sql = 'SELECT * FROM tasks where id = ?'
    con.query(sql, id, (err,result) => {
        if (err) return res.json({ Error: err.message })
        return res.json({Status:"Success",Result:result})
    })
})

app.get('/getTask', (req,res) => {
    const sql = 'SELECT * FROM tasks';
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: 'Error in fetching Data from sql' })
        return res.json({
            Status: 'Success',
            Result:result
        })
    })
})

const verifyUser = (req,res,next) => {
     const token = req.cookies.token;
    if (!token) {
        return res.json({Error:"You are not authenticated"})
    } else {
        Jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Wrong token" })
            req.role=decoded.role
            next()
        })
    }
}

app.get('/taskCount', (req, res) => {
    const sql = 'SELECT count(id) as task from tasks';
    con.query(sql, (err, result) => {
        if (err) res.json({ Error: err.message })
        else {
            
        return  res.json({result})
        }
    })
})




app.get('/dashbord', verifyUser,(req,res) => {
   return res.json({Status:"Success",role:req.role})
})



app.post('/userlogin', (req, res) => {
    console.log("Employee Url Hit")
    const sql = "SELECT * FROM users Where email=?";
     con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
         if (result.length > 0) {
             bcrypt.compare(req.body.password.toString(), result[0].password, (err,response) => {
                 if (err) return res.send({ Error: err.message })
                 if (response) {
                     const id = result[0].id;
                    const token = Jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '5m'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"})

                 }
            })
            
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})





app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status:"Success"})
})


app.post('/signUp',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO users (`email`,`name`,`password`,`image`,`address`) VALUES (?, ?, ?, ?, ?)";

    bcrypt.hash(req.body.password.toString(), 10, (err,hash) => {
        if (err) return res.json({ Error: 'Error in Hashing Password' }) 
        const values = [
            req.body.email,
            req.body.name,
            hash,
            req.file.filename,
            req.body.address,
            
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: err.message })
            return res.json({Status:"Success"})
        })
    })
})


app.delete('/deleteTask/:userId', (req, res) => {
    console.log("Delete Api Hit")
    const id = req.params.userId
    
    const sql = "DELETE FROM tasks WHERE id=?";
    con.query(sql, id, (err,result) => {
        if (err) return res.json({ Error: Error.message })
        return res.json({Message:result})
    })

})


app.post('/createTask',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO tasks (`name`,`description`,`start`,`end`) VALUES (?, ?, ?, ?)";

    const values = [
            req.body.name,
            req.body.description,
            req.body.start,
            req.body.end
        ]
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: err.message })
            return res.json({Status:"Success"})
        })
    
})

app.listen(8080, () => {
    console.log(`server running at PORT 8080`)
})