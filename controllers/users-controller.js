const { Users } = require('../models');


const usersController = {
// create a new User
createUsers({ body }, res) {
  Users.create(body)
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => res.status(400).json(err));
},

// get all users
getAllUsers(req, res) {
  Users.find({})
  .populate({
    path: 'thoughts',
    select: '-__v'
  })
  .populate({
    path: 'friends',
    select: '-__v'
})
  .select('-__v')
    .then(dbUsersData => res.json(dbUsersData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},

//get user by id 
getUsersByID(req, res) {
  Users.findOne({})
  .populate({
    path: 'thoughts',
    select: '-__v'
  })
  .populate({
    path: 'friends',
    select: '-__v'
})
  .select('-__v')
  .then(dbUsersData => {
    if(!dbUsersData) {
        res.status(404).json({message: 'No User with this ID!'});
        return;
    }
    res.json(dbUsersData)
})
.catch(err => {
    console.log(err);
    res.status(400).json(err)
})
},

// Update user by ID
updateUsers({params, body}, res) {
  Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
      .then(dbUsersData => {
          if(!dbUsersData) {
              res.status(404).json({message: 'No User with this ID!'});
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.json(err))
},

//delete user
deleteUsers({params}, res) {
  Users.findOneAndDelete({_id: params.id})
      .then(dbUsersData => {
          if(!dbUsersData) {
              res.status(404).json({message: 'No User with this ID!'});
              return;
          }
          res.json(dbUsersData);
      })
      .catch(err => res.status(400).json(err));
},

//add friend
addFriend({params}, res) {
  Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
      .populate({
          path: 'friends',
          select: '-__v'
      })
      .select('-__v')
      .then(dbUsersData => {
          if (!dbUsersData) {
              res.status(404).json({message: 'No User with this ID!'});
              return;
          }
          res.json(dbUsersData);
      })
      .catch(err => res.json(err));
},

//delete friend
deleteFriend({ params }, res) {
  Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
      .populate({
          path: 'friends',
          select: '-__v'
      })
      .select('-__v')
      .then(dbUsersData => {
          if(!dbUsersData) {
              res.status(404).json({message: 'No User with this ID!'});
              return;
          }
          res.json(dbUsersData);
      })
      .catch(err => res.status(400).json(err));
}

};

module.exports = usersController;