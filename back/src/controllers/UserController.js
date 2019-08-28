import { UserModel, AvatarModel } from "../schemas";

class UserController { 
    constructor(){
        const p = 123;
    };
 
    getAvatar(){
        var id, number;
        console.log("getAvatar");
        AvatarModel.find({}, function (err, avatars) {
            console.log("find");
            if (err) {
               return err;
            }
            console.log("avatars",avatars);
            number = +avatars[0].number < 30 ? +avatars[0].number + 1 : 1;
            id = avatars[0]._id;           
        }).then( () => {
            const send = {"number":number};
            console.log("send",send);
            AvatarModel.findByIdAndUpdate(id, {$set:send},(err)=>{
                if (err)
                    return err;
                else 
                    return send;
            })  
        });
        return 0;
    }

    create(req, res) {
        console.log("пришли данные о пользователе", req.body);
        //avatar begin
        var id, number;
        console.log("getAvatar");
        AvatarModel.find({}, function (err, avatars) {
            console.log("find");
            if (err) {
               return res.json(err);
            }
            console.log("avatars",avatars);
            number = +avatars[0].number < 30 ? +avatars[0].number + 1 : 1;
            id = avatars[0]._id;           
        }).then( () => {
            const send = {"number":number};
            console.log("send",send);
            AvatarModel.findByIdAndUpdate(id, {$set:send},(err)=>{
                if (err)
                    return res.json(err);
            })  
        })
        //avatar end
        .then(()=>{
            const postData = {
                name: req.body.name,
                avatar: number + ".jpg"
              };
              const user = new UserModel(postData);
              user
              .save()
              .then((obj) => {
              console.log("пользователь создан");
               res.json(obj); 
              })
              .catch(reason =>{
                  console.log("произошла ошибка", reason);
                res.json(reason);
              });
        })

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
        UserModel.find({}, (err, users) =>{
            if (err){
                console.log("users",users);
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

    newAvatar(){
        const number = new AvatarModel({number: 1});
        number
        .save()
        .then((obj) => {
         res.json(obj); 
        })
        .catch(reason =>{
            console.log("произошла ошибка", reason);
          res.json(reason);
        });
    }

    
}

export {UserController};

