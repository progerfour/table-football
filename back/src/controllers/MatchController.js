import { MatchModel, UserModel } from "../schemas";


class MatchController { 

  constructor(){
   
  };

  create() {
    let random = require('random');
    let users =[];
    return  UserModel.find({isPlayer:true}, (err, result) =>{
      if (err){
         
          return err;
      }
      console.log(result);
      users = result;
    }).then (()=>{ 
      const count = users.length-1;
     
      if ( users.length == 1) {
        return {isWinner:true,user:users[0],message: "winner is founded!"};
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
      return match
      .save()
      .then((obj) => {
        let send = {
          ...obj._doc,
          avatar1: users[player1].avatar,
          avatar2: users[player2].avatar,
          name1: users[player1].name,
          name2: users[player2].name,
        }
        console.log("текущий матч создан",send);
         return send; 
      })
      .catch(reason =>{
        console.log("произошла ошибка", reason);
        return reason;
      });
    })      
    .catch(reason =>{
      console.log("произошла ошибка", reason);
      return reason;
    });
  } 

  getCurrient(req,res) {
    let send;
    MatchModel.find({isEnd:false}, (err, matches) =>{
      if (err){
          return res.send(err);
      }
      if (matches.length > 0)
        send = matches[0]._doc;
  }).then(() => {
    console.log("send",send);
    if (!send) {
      return {errMsg: "нет текущего матча"}
    }
    UserModel.findById(send.id_player1, (err, result) =>{
      if (err){
          return res.send({"по айди не нашелся 1":err});
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
            return res.send({"по айди не нашелся 2":err});
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

  updateScore({_id, player, score}) {
    let match;

    return MatchModel.findById(_id,(err,curMatch)=>{
      if (err)
        return err;
      else {
        console.log("match is found");
        match = curMatch;
      }
    }).then( () =>{
      player == 1 ? 
      match.score_p1 = match.score_p1 + score
      : match.score_p2 = match.score_p2 + score;
      match.isEnd = match.score_p1 == 10  || match.score_p2 == 10;
      
      return MatchModel.findByIdAndUpdate(_id, {$set:match},(err) => {
        if (err)
        return res.send(err);
      })
    })
  }

  ended(match){
      let idwin = match.score_p1 == 10 ? match.id_player1 :  match.id_player2,
      idloser = match.score_p1 == 10 ? match.id_player2 :  match.id_player1,
      numberWins = 0;
      UserModel.findById(idwin,(err,result)=>{
        if (err)
            return {"error":err};
        else 
            numberWins = result.win + 1;
      }).then(()=>{
        UserModel.findByIdAndUpdate(idwin, {$set:{win: numberWins}},(err) => {
          if (err)
          return res.send(err);
        }).then( ()=> {
          return UserModel.findByIdAndUpdate(idloser, {$set:{wasted: 1, isPlayer: false}},(err) => {
            if (err)
            return res.send(err);
          })
      })
    });
  }
}

export {MatchController};

