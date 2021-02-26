var express = require('express');
var Jimp = require('jimp');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/saveImage', function(req, res, next) {
  const path = './images/'+Date.now()+'.png'

  const imgdata = req.body.image;
  const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  
  fs.writeFileSync(path, base64Data,  {encoding: 'base64'});

  const processedPath = './processedImages/'+Date.now()+'.png';
  Jimp.read(path, (err, img) => {
    if (err) throw err;
    img
      .greyscale() // set greyscale
      .write(processedPath); // save
  });
  return res.send(path);
});

router.get('/getImageNames', function(req, res, next) {
  const imageFolder = './processedImages/';
  const fs = require('fs');
  const imageNames = [];
  fs.readdirSync(imageFolder).forEach(image => {
    imageNames.push(image);
  });
  return res.status(200).json({imageNames});
});

router.get('/:imageId', function(req, res, next) {
  const image = req.params.imageId;
  return res.status(200).sendFile(`./processedImages/${image}`, { root: "./" })
});

router.delete('/:imageId', function(req, res, next) {
  const image = req.params.imageId;
  fs.unlinkSync(`./processedImages/${image}`, { root: "./" })
  return res.status(200).send();
});

module.exports = router;
