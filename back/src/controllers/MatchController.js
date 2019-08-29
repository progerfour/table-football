import { MatchModel, UserModel } from "../schemas";

class MatchController { 

  constructor(){
   
  };

  create(req, res) {
    let random = require('random');
    let users =[];
    UserModel.find({isPlayer:true}, (err, result) =>{
      if (err){
          console.log("users",result);
          return res.send(err);
      }
      console.log(result);
      users = result;
    }).then (()=>{ 
      const count = users.length-1;
      console.log(count);
      if (count == 1) {
        return res.json({message: "winner is founded!"});
      }
      let player1 =0, player2=0;
      while (player1 == player2) {
        player1 = random.int(0, count);
        player2 = random.int(0, count);
      }
      const postData = {
        id_player1: users[player1]._id,
        id_player2: users[player2]._id,
        score_p1:0,
        score_p2:0,
        isEnd:false
      };

      const match = new MatchModel(postData);
      match
      .save()
      .then((obj) => {
      console.log("текущий матч создан");
        let send = {
          ...obj._doc,
          avatar1: users[player1].avatar,
          avatar2: users[player2].avatar,
          name1: users[player1].name,
          name2: users[player2].name,
        }
        res.json(send); 
      })
      .catch(reason =>{
        console.log("произошла ошибка", reason);
        res.json(reason);
      });
    })      
    .catch(reason =>{
      console.log("произошла ошибка", reason);
      res.json(reason);
    });
  } 

  getCurrient(req,res) {
    let send = {};
    MatchModel.find({isEnd:false}, (err, matches) =>{
      if (err){
          return res.send(err);
      }
      send = matches[0]._doc;
  }).then(() => {
    UserModel.findById(send.id_player1, (err, result) =>{
      if (err){
          console.log("id",send.id_player1);
          return res.send({"по айди не нашелся":err});
      }
      send = { 
        ...send, 
        avatar1: result.avatar,
        name1 : result.name
      };
      console.log(send);
    }).then(()=>{
      UserModel.findById(send.id_player2, (err, result) =>{
        if (err){
            console.log("id",send.id_player2);
            return res.send({"по айди не нашелся":err});
        }
        console.log(result);
        send = { 
          ...send, 
          avatar2: result.avatar,
          name2 : result.name
        };
      }).then(() => {
        res.json(send);
      })
    })
  })
}

  update(req,res){
    MatchModel.findByIdAndUpdate(req.params.id, {$set:req.body},(err)=>{
      if (err)
        return res.send(err);
      else 
        res.json({message:"match updated"});
    })
  }
}

export {MatchController};

