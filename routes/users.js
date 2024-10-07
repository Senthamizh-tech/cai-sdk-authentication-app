var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config');
const getOrderStatus = require("../helper/orderAPI");
var jwt = require('jsonwebtoken');
const verbiageBuilder = require('../helper/verbiageBuilder');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  var identity = req.body.identity;
  var clientId = req.body.clientId;
  var clientSecret = req.body.clientSecret;
  var isAnonymous = req.body.isAnonymous || false;
  var aud = req.body.aud || "https://idproxy.kore.com/authorize";

  var options = {
    "iat": new Date().getTime(),
    "exp": new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
    "aud": aud,
    "iss": clientId,
    "sub": identity,
    "isAnonymous": isAnonymous
  }
	var token = jwt.sign(options, clientSecret);
  res.send({"jwt":token});
});

router.get('/verbiagebuilder', function(req, res, next) {
  res.send({"data": verbiageRespData});
});

router.get("/orderStatus", async function (req, res, next) {
const resp = await getOrderStatus(req.query.orderId);
  res.send({
    order_status: resp[0].orderStatus,
    name:resp[0].Name
  });
});

router.post('/v1/verbiagebuilder', function(req, res, next) {
  const language = req.body.currentLang;
  const verbiageBuilderData = language === 'en' ? verbiage_En_RespData : verbiage_Fr_RespData;
  let result = verbiageBuilderData.filter((ele) => ele.RESPONSE_ID === req.body.responseId);
  res.send({"data": result});
});

router.post('/v2/verbiagebuilder', function(req, res, next) {
  const language = req.body.currentLang;
  const verbiageBuilderData = language === 'en' ? verbiage_En_RespData : verbiage_Fr_RespData;
  res.send({"data": verbiageBuilderData});
});

module.exports = router;
