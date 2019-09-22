import { MatchModel, UserModel } from "../schemas";

class MatchController { 

  constructor(){    
  };

  create() {
    let random = require('random');
    let users = [];
    let minWin;
    return  UserModel.find({isPlayer:true}, (err, result) =>{
      if (err){
          return err;
      }
      console.log(result);
      users = result;
    }).then (()=>{           
      if (users.length == 1) {
        return {isWinner:true,user:users[0],message: "winner is founded!"};
      }
      minWin = users[0].win;
      for (let i=1;i<users.length;i++){
        if (minWin > users[i].win)
          minWin = users[i].win;
      }
      console.log("minWin",minWin);

      let player1, player2;
      let minList = users.filter(user => user.win === minWin);
      console.log("minList.length",minList.length);
      if (minList.length === 1) {
        player1 = minList[0];//users.findIndex(user => user.win === minWin)
        console.log("player1",player1);
        const minList_1 = users.filter(user => user.win === minWin+1);
        player2 = minList_1[random.int(0, minList_1.length-1)];
        console.log("player2",player2);
      } else {
        var index = random.int(0, minList.length-1);
        player1 = minList[index];
        console.log("player1 " + index,player1);
        minList.splice(index,1);
        console.log("получившийся minList",minList);
        player2 = minList[random.int(0, minList.length-1)];
        console.log("player2",player2);
      }

      const postData = {
        id_player1: player1._id,
        id_player2: player2._id,
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
          avatar1: player1.avatar,
          avatar2: player2.avatar,
          name1: player1.name,
          name2: player2.name,
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
    return UserModel.findById(idloser,(err,result)=>{
      if (err)
          return {"error":err};
      else 
          numberWins = result.win;
    }).then(()=>{
      return UserModel.findById(idwin,(err,result)=>{
        if (err)
            return {"error":err};
        else 
            numberWins = numberWins > result.win ? numberWins + 1 : result.win+1;
      }).then(()=>{
        return UserModel.findByIdAndUpdate(idwin, {$set:{win: numberWins}},(err) => {
          if (err)
          return res.send(err);
        }).then( ()=> {
          return UserModel.findByIdAndUpdate(idloser, {$set:{wasted: 1, isPlayer: false}},(err) => {
            if (err)
            return res.send(err);
          })
        })
      });
    });
  }
}

export {MatchController};

