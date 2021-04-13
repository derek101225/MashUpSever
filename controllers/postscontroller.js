const router = require('express').Router();
const { models } = require('../models');
// const {PostModel} = require('../models/posts')



router.post('/post', async(req, res) => {
    const {content} = req.body.post;

    try{
        await models.PostsModel.create({
            content: content,
            userId: req.user.id
        })
        .then(
            posts => {
                res.status(201).json({
                    posts: posts,
                    message: 'post Created',
                });
            }
        )
    } catch(err) {
        res.status(500).json({
            error: `Failed to create post: ${err}`
        });
    };
});


/// post edit
router.put('/:id',  async (req, res) => {
    const {
        content: content,
        
    } = req.body;
    try {
        const PostsUpdated = models.PostsModel.update({content},
            {where: { id: req.params.id}});
            res.status(200).json({
                message: 'Post successfully updated',
                PostsUpdated
            });

    }catch(err) {
        res.status(500).json({
            message: `Failed to update Post: ${err}`,
        })
    }
});

// post delete
router.delete('/:id', async (req, res) => {
    try{
        await models.PostsModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Post Destroyed"
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy Post: ${err}`
        })
    }
});

//get all post
// router.get('/bypost',   (req, res) => {
   
    
//          PostModel.findAll()
        
//         .then(post => {
//             res.status(200).json({
//                 post: post,
//                 message: "Post retrived"
//             })
//         })

//     catch (err){
//         res.status(500).json({
//             message: `Failed to retrive post ${err}`
//         })
//     }
      
// })


// router.get("/bypost",  (req, res) => {
//     PostModel.findOne()
//         .then((posts) => res.status(200).json(posts))
//         .catch(err => res.status(500).json({ error: err }))
// });

module.exports = router;