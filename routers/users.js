import express from "express";
import {createUser, getUserByName} from "../src/helper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

async function  genPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log({salt, hashPassword});
    return hashPassword;
}

    router.post("/signup", async function (request, response) {
    const {username, password} = request.body;
    const hashPassword = await  genPassword(password);
    const newUser = {
        username: username,
        password: hashPassword,
    };
    const result = await createUser(newUser);
    response.send(result);
    });
    router.post("/login", async function (request, response) {
        const {username, password} = request.body;
        const userFromDB = await getUserByName(username);
        console.log(userFromDB);
        response.send(userFromDB);

        if(!userFromDB){
            response.status(401).send({ message: "Invalid credentials"});
        } else{
            const storedPassword = userFromDB.password;
            const isPasswordMatch = await bcrypt.compare(password, storedPassword);
            console.log("isPasswordMatch",isPasswordMatch);
            if(isPasswordMatch){
                const token = jwt.sign({id: userFromDB._id},process.env.SECRET_KEY);
                response.send({message: "Successfull login", token: token});
            }else{
                response.status(401).send({ message: "Invalid credentials"});
            }
            response.send(userFromDB);
        }
    });
    export const usersRouter = router;