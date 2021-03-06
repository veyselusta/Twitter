const { userService, tweetService } = require('../services')

const router = require('express').Router()

router.get('/:userId', async (req,res)=>{
  const user = await userService.find(req.params.userId)

  res.render('user', { user })
})

router.get('/status/:tweetId', async (req,res)=>{
  const { tweetId } = req.params

  const tweet = await tweetService.findByTweetId(tweetId)

  res.send(tweet)
})

router.get('/:userId/followers', async (req,res)=>{
  const user = await userService.find(req.params.userId)
  const followers = user.followers

  res.render('followers', { followers })
})

router.get('/:userId/followings', async (req,res)=>{
  const user = await userService.find(req.params.userId)
  const followings = user.following

  res.render('followings', { followings })
})

router.get('/:userId/likes', async (req,res)=>{
  const user = await userService.find(req.params.userId)
  const likes = user.likedTweets

  res.render('likes', { likes })
})

router.get('/:userId/reply', async (req,res)=>{
  const user = await userService.find(req.params.userId)
  const replies = user.ownReplies

  res.render('replies', { replies })
})

router.post('/create', async(req,res)=>{
  const user = await userService.insert(req.body)

  res.send(user)
})

router.post('/:userId/tweet', async (req,res)=>{
  const { userId } = req.params
  const { text } = req.body

  const tivit = await userService.tweet(text, userId)

  res.send(tivit)
})

router.post('/:userId/retweet', async (req,res)=>{
  const { userId } = req.params
  const { tweetId } = req.body

  const tivit = await userService.retweet(userId, tweetId)

  res.send(tivit)
})

router.post('/:userId/reply', async(req,res)=>{
  const { userId } = req.params
  const { text, tweetId } = req.body

  const tweet = await userService.reply(userId, tweetId, text)  

  res.send(tweet)
})

router.post('/:userId/follow', async (req,res)=>{
  const { userId } = req.params
  const { otherId } = req.body

  const rv = await userService.follow(userId, otherId)

  res.send(rv)
})

router.post('/:userId/like', async (req,res)=>{
  const { userId } = req.params
  const { tweetId } = req.body

  const tweet =await userService.like(userId, tweetId)
  
  res.send(tweet)
})

router.post('/:userId/pintweet', async (req,res)=>{
  const { userId } = req.params
  const { tweetId } = req.body

  const tweet = await userService.pinTweet(userId, tweetId)

  res.send(tweet)
})

router.patch('/:userId', async (req,res)=>{
  const { userId } = req.params
  const { name } = req.body
  
  await userService.update(userId, { name })
  const user = await userService.findBy('_id', userId)

  res.send(user)
})

router.delete('/:userId', async (req,res)=>{
  await userService.removeBy('_id', req.params.userId)

  res.send('ok')
})

module.exports = router