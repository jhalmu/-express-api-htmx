import dotenv from 'dotenv';
import express, { NextFunction, Request, RequestHandler, Response } from "express";

dotenv.config();
const app = express();
const port = process.env.PORT

// parse json request body
app.use(express.json());

let users = [
    {
        id: 1,
        name: 'Erkki',
    },
    {
        id: 2,
        name: 'Merkki',
    },
    {
        id: 3,
        name: 'Rooma',
    },
];



const isAuthorized: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'myseacretvalue') {
        next();
    } else {
        res.status(401);
        res.json({ msg: 'No acccess' });
    }
};

// NEEDS AUTH ENDPOINTS

// CREATE
app.post('/users', isAuthorized, (req, res) => {
    const newUser = {
        name: req.body.name,
        id: Date.now()
    };
    users.push(newUser);
    res.json(newUser);
});

// UPDATE
app.put('/users/:id', isAuthorized, (req, res) => {
    const { id, name } = req.body;
    users = users.map((user) => {
        if (user.id === id) {
            user.name = name;
        }
        return user;
    });
    res.json(users);
});

// DELETE
app.delete('/users/:id', isAuthorized, (req, res) => {
    const { id } = req.body;
    users = users.filter((user) => user.id !== id);
    res.json(users);
});

// NOT AUTH ENDPOINTS

// READ
app.get("/users", (req, res) => {
    res.json(users);
});

// GET ONE USER
app.get('/users/:id', (req, res) => {
    const id = +req.params.id;
    const user = users.filter((user) => user.id === id)[0];
    res.json(user);
});




// healthcheck endpoint
app.get("/", (req, res) => {
    res.status(200).send({ status: "ok" });
});

// start
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})