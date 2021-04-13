const router = require('express').Router();
const { models } = require('../models');

router.post('/comment', async(req, res) => {
    const {content, postId} = req.body.comment;

    try {
        await models.CommentsModel.create({
            content: content,
            postId: postId,
            userId: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    comment: comment,
                    message: 'comment created'
                });
            }
        )
    }catch (err) {
        res.status(500).json({
            error: `Failed to create comment: ${err}`
        });
    };
});

// get all comments
// router.get('/byComment', async (req, res) => {
//     try {
//       const locateComments = await CommentsModel.findAll({
//         where: {
//           id: req.user.id,
//         },
//       });
//       res.status(200).json({
//         message: 'Comments Retrived!',
//         locateComments,
//       });
//     } catch (err) {
//       res.status(500).json({
//         message: `Failed to retrive Comments: ${err}`,
//       });
//     }
//   });

  //comment edit
  router.put('/:id', async (req, res) => {
    const {
    //   firstName: firstName,
    //   lastName: lastName,
      content: content,
    } = req.body;
    try {
      const CommentsUpdated = CommentsModel.update(
        { firstName, lastName, content },
        { where: { id: req.params.id } }
      );
      res.status(200).json({
        message: 'comment successfully updated',
        CommentsUpdated,
      });
    } catch (err) {
      res.status(500).json({
        message: `Failed to update Comment: ${err}`,
      });
    }
  });


  //comment delete
  router.delete('/:id', async (req, res) => {
    try {
      await models.CommentsModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: 'Comments Destroyed',
      });
    } catch (err) {
      res.status(500).json({
        message: `Unable to Destroy Comments: ${err}`,
      });
    }
  });

module.exports = router;