const router = require('express').Router();

const {
    getAllUsers,
    getUsersByID,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);

router
    .route('/:id')
    .get(getUsersByID)
    .put(updateUsers)
    .delete(deleteUsers);

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;