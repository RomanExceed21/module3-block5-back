const Task = require('../../db/models/task/index.js')

module.exports.getAllTasks = (req, res, next) => {
  Task.find().then(result => {
    res.send({data: result});
  });
}

module.exports.createNewTasks =  (req, res, next) => {
  const task = new Task(req.body);
  if (!(req.body.hasOwnProperty('text')) || !(req.body.hasOwnProperty('isCheck'))) {   
    res.send('Parameters were lost!!'); 
  } else if ((!req.body.text) || (req.body.isCheck)) {
    res.send('Error! You need input all data!!');
  } else {
    task.save().then(result => {
      Task.find().then(result => {
        res.send({data: result});
      });
    });
  }
};

module.exports.changeTaskInfo = (req, res, next) => {
  if ((req.body._id) && (req.body.text)) {
    Task.updateOne({_id: req.body._id}, req.body).then(result => {
      Task.find().then(result => {
        res.send({data: result});
      });
    });
  } else {
    res.send('Please check id or task. Maybe they are empty');
  }
};

module.exports.deleteTask = (req, res, next) => {
  if (!req.query._id) {
    res.send('Error! Id is empty!!');
  } else {
    Task.deleteOne({_id: req.query._id}).then(result => {
      Task.find().then(result => {
        res.send({data: result});
      }); 
    });
  }  
};