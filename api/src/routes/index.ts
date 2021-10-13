import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req:Request, res:Response, next:Next) => {
  res.send('index');
});

module.exports = router;
