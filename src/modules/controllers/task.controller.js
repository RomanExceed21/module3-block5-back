const Task = require('../../db/models/task/index.js')

module.exports.getAllTasks = (req, res, next) => {
  Task.find().then(result => {
    res.send({data: result});
  });
}

module.exports.createNewTasks =  (req, res, next) => {
  const task = new Task(req.body);
  if (!req.body.text) {
    res.send('Error! Task is empty!!');
  } else {
    task.save().then(result => {
      Task.find().then(result => {
        res.send({data: result});
      });
    });
  }    
};


module.exports.changeTaskInfo = (req, res, next) => {
  if (!req.body._id || !req.body) {
    res.send('Please check id or task. Maybe they are empty');
  } else {
    Task.updateOne({_id: req.body._id}, req.body).then(result => {
      Task.find().then(result => {
        res.send({data: result});
      });
    });
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