import { AdminModel } from "../schemas";

class AdminController { 
    constructor(){
       
    };
 
    create(req, res) {
        const postData = {
            login: req.body.login,
            password: req.body.password
        };
        const admin = new AdminModel(postData);
        admin
        .save()
        .then((obj) => {
        console.log("admin создан");
         res.json(obj); 
        })
        .catch(reason =>{
            console.log("произошла ошибка", reason);
          res.json(reason);
        });
    } 

    check(req,res){
        var login ="", password ="";      
        AdminModel.find({}, function (err, admins) {
            if (err) {
               return err;
            }
            login = admins[0].login;          
            password = admins[0].password 
            console.log("login",login);
            console.log("password",password);
        }).then( () => {
            console.log("req",req.query);
            if (req.query.login === login && req.query.password === password)
                return res.json({status:"OK"});
            else 
                return res.json({status:"error", message:"неверный логин/пароль"});
        });
    }

}

export {AdminController};

