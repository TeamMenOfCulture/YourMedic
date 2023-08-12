var express = require('express');
var router = express.Router();
var textToSpeech = require('../helpers/tts');

/* GET home page. */
router.post('/talk', function(req, res, next) {

  textToSpeech(req.body.text, req.body.voice)
  .then(result => {
    res.json(result);    
  })
  .catch(err => {
    res.json({});
  });


});

router.post('/database', async function(req,res){
  id=req.body.id;
  data=req.body.data;

})

router.post("/name", async (req, res) => {
  const id = req.query.id;
  if (id != undefined) {
    rlname = await db
      .collection(id)
      .doc("sQaNcfpgRu7wyzNHfeNDgB7cJil3cb8eYH9pMpTp")
      .get();
    realname = rlname._fieldsProto.myName.stringValue;
    if (realname != undefined) {
      res.status(200).json(realname);
    }
  }
});

module.exports = router;
