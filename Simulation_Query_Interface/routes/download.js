var express = require('express');
var router = express.Router();
var url = require('url');

/* GET users listing. */
router.get('/', function(req, res, next) {

	//post url 받은거 parsing
	var uri = url.parse(req.url, true);

	//path를 받아서 download
	//path가 null일 경우에는 alert 
	//path가 null이 아닐 경우에는 다운로드
	if(uri.query.path == ""){
		res.send('<script type="text/javascript">alert("download path null");javascript:history.back(-1);</script>');
	}
	else{ 
		res.download(uri.query.path);
	}
});

module.exports = router;
