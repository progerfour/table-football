import express from "express";
import { UserModel } from "../schemas";

class UserController { 
    constructor(){
        const p = 123;
    };
    index(req,res){
        const id = req.params.id;
        UserModel.findById(id,(err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "Not found"
                });
            }
            res.json(user);
        });
    }

    create(req, res) {
        const postData = {
          name: req.body.name
        };
        const user = new UserModel(postData);
        user
        .save()
        .then((obj) => {
         res.json(obj); 
        })
        .catch(reason =>{
          res.json(reason);
        });
    }

    delete(req, res) {
        const id = req.params.id;
        UserModel.findOneAndRemove (id)
        .then(user=>{
            if (user) {
                res.json({
                    message: "User deleted"
                });
            }
        })
        .catch(err =>{
            res.json({
                message: "User not found"
            });
        });
    }
}

export { UserController};