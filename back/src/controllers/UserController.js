import express from "express";
import { UserModel } from "../schemas";

class UserController { 
    constructor(){
        const p = 123;
    };

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

    getAll(req,res){
        UserModel.find().then((err,users) => {
            if (err){
                return res.send(err);
            }
            res.json(users);
        });
    }

    update(req,res){
        UserModel.findByIdAndUpdate(req.params.id, {$set:req.body},(err)=>{
            if (err)
                return res.send(err);
            else 
                res.json({message:"User updated"});
        })
    }


    delete(req, res) {
        // const id = req.params.id;
        // UserModel.findOneAndRemove (id)
        // .then(user=>{
        //     if (user) {
        //         res.json({
        //             message: "User deleted"
        //         });
        //     }
        // })
        // .catch(err =>{
        //     res.json({
        //         message: "User not found"
        //     });
        // });
        UserModel.remove({
            _id: req.params.id
        }).then(user => {
            if (user) {
                res.json({
                    message: "User deleted"
                })
            } else {
                res.json({
                    message: "User is not found"
                })
            }
        })
    }
}

export { UserController};