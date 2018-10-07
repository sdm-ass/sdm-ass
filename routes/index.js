var express = require('express');
var router = express.Router();
var crypto = require('crypto');
<<<<<<< HEAD
const mysql = require('./../database');
=======
var time = require('silly-datetime');
const mysql = require('./../database');

>>>>>>> add with input_happiness_level
/* GET home page. */
router.get('/', function(req, res, next) {
    var query = 'SELECT * FROM article ORDER BY articleID DESC';
    mysql.query(query, function(err, rows, fields){
       var articles = rows;
       articles.forEach(function(ele) {
           var year = ele.articleTime.getFullYear();
           var month = ele.articleTime.getMonth() + 1 > 10 ? ele.articleTime.getMonth() : '0' + (ele.articleTime.getMonth() + 1);
           var date = ele.articleTime.getDate() > 10 ? ele.articleTime.getDate() : '0' + ele.articleTime.getDate();
           ele.articleTime = year + '-' + month + '-' + date;
       });
       res.render("index", {articles: articles,user:req.session.user});
    });
});
<<<<<<< HEAD
=======

router.get('/register',function(req,res,next){
    res.render('register',{user:req.session.user});
    
    });
    
    router.get('/input_happiness_level',function(req,res,next){
        
        res.render('input_happiness_level',{user:req.session.user});
        });

    router.post('/register',function(req,res,next){
    var name = req.body.name;
    var password = req.body.password;
    var hash = crypto.createHash('md5');
    hash.update(password);
    password = hash.digest('hex');
    var query = 'INSERT author SET authorName=' + mysql.escape(name) + ',authorPassword=' + mysql.escape(password);
    mysql.query(query, function(err, rows, fields) {
       if(err) {
           console.log(err);
           return;
       }
       res.redirect('/login');
    });
    });
    

    router.get('/aside',function(req,res,next){
        res.render('aside',{user:req.session.user});
    })

>>>>>>> add with input_happiness_level
router.get('/login', function(req, res, next) {
  res.render('login', {message:'',user:req.session.user});
});
router.get('/new', function(req, res, next) {
    res.render('new', {message:'',user:req.session.user});
  });
router.post('/login', function(req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var hash = crypto.createHash('md5');
    hash.update(password);
    password = hash.digest('hex');
    var query = 'SELECT * FROM author WHERE authorName=' + mysql.escape(name) + ' AND authorPassword=' + mysql.escape(password);
<<<<<<< HEAD
=======
   console.log(query);
>>>>>>> add with input_happiness_level
    mysql.query(query, function(err, rows, fields) {
        if(err) {
            console.log(err);
            return;
        }
        var user = rows[0];
        if(!user) {
<<<<<<< HEAD
            res.render('login', {message:'用户名或者密码错误'});
            return;
        }
        req.session.user = user;
        res.redirect('/');
    });
=======
            res.render('login', {message:'The username or the password is wrong.'});
            return;
        }
    
    req.session.user = user;
    res.redirect('/');
    });

>>>>>>> add with input_happiness_level
});
router.get('/articles/:articleID', function(req, res, next) {
   var articleID = req.params.articleID;
   var query = 'SELECT * FROM article WHERE articleID=' + mysql.escape(articleID);
   mysql.query(query, function(err, rows, fields) {
      if(err) {
          console.log(err);
          return;
      }
      var query = 'UPDATE article SET articleClick=articleClick+1 WHERE articleID=' + mysql.escape(articleID);
      var article = rows[0];
<<<<<<< HEAD
=======
    
>>>>>>> add with input_happiness_level
      mysql.query(query, function(err, rows, fields) {
         if(err) {
             console.log(err)
             return;
         }
          var year = article.articleTime.getFullYear();
          var month = article.articleTime.getMonth() + 1 > 10 ? article.articleTime.getMonth() : '0' + (article.articleTime.getMonth() + 1);
          var date = article.articleTime.getDate() > 10 ? article.articleTime.getDate() : '0' + article.articleTime.getDate();
          article.articleTime = year + '-' + month + '-' + date;
          res.render('article', {article:article,user:req.session.user});
      });
   });
});
<<<<<<< HEAD
router.get('/edit', function(req, res, next) {
    var user = req.session.user;
    if(!user) {
        res.redirect('/login');
        return;
    }
   res.render('edit',{user:req.session.user});
});
router.post('/edit', function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var author = req.session.user.authorName;
    var query = 'INSERT article SET articleTitle=' + mysql.escape(title) + ',articleAuthor=' + mysql.escape(author) + ',articleContent=' + mysql.escape(content) + ',articleTime=CURDATE()';
    mysql.query(query, function(err, rows, fields) {
       if(err) {
           console.log(err);
           return;
       }
       res.redirect('/');
    });
});
=======

router.post('/input_happiness_level', function(req, res, next) {
    var happiness_level = req.body.radio;
    var author = req.session.user.authorName;
    var group = req.session.user.group;
    var role = req.session.user.role;
    var submitTime = time.format(new Date(),'YYYY-MM-DD HH:mm:ss');
  //  INSERT author VALUES(DEFAULT, 'node', 'e10adc3949ba59abbe56e057f20f883e')
    var query = 'INSERT happiness_level VALUES(DEFAULT,'+mysql.escape(author)+','+mysql.escape(happiness_level)+','+mysql.escape(submitTime)+','+mysql.escape(group)+','+mysql.escape(role)+')';

    //var  query = 'INSERT INTO happiness_level(authorName,happinesslevel,submitTime,group,role) VALUES('+mysql.escape(author) +','+ mysql.escape(happiness_level)+','+ mysql.escape(submitTime)+','+ mysql.escape(group) +','+mysql.escape(role) +')'; 
    console.log(query);
    mysql.query(query, function(err, rows, fields) {
        if(err) {
            console.log(err)
            return;
        }
        var user = rows[0];
        req.session.user = user;
     });

   
   res.render('input_happiness_level',{user:req.session.user})
   res.redirect('/');

});


>>>>>>> add with input_happiness_level
router.get('/friends', function(req, res, next){
    res.render('friends', {user:req.session.user});
});
router.get('/about', function(req, res, next) {
   res.render('about', {user:req.session.user});
});

<<<<<<< HEAD
=======


>>>>>>> add with input_happiness_level
//add router post
router.post('/about', function (req, res, next) {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    connection.query('SELECT `ID`, `hapi_level` FROM `hapi_level`', function(err, rows, fields) {
      console.log("aaaa");
      if (err) throw err;
      var rows = calculate(rows);
      res.send(JSON.stringify(rows));
    });
  })
//add router post
router.get('/logout', function(req, res, next) {
   req.session.user = null;
   res.redirect('/');
});
router.get('/modify/:articleID', function(req, res, next) {
    var articleID = req.params.articleID;
    var user = req.session.user;
    var query = 'SELECT * FROM article WHERE articleID=' + mysql.escape(articleID);
    if(!user) {
        res.redirect('/login');
        return;
    }
    mysql.query(query, function(err, rows, fields) {
        if(err) {
            console.log(err);
            return;
        }
        var article = rows[0];
        var title = article.articleTitle;
        var content = article.articleContent;
        console.log(title,content);
        res.render('modify', {user:user,title: title, content: content});
    });
});
router.post('/modify/:articleID', function(req, res, next) {
    var articleID = req.params.articleID;
    var user = req.session.user;
    var title = req.body.title;
    var content = req.body.content;
    var query = 'UPDATE article SET articleTitle=' + mysql.escape(title) + ',articleContent=' + mysql.escape(content) + 'WHERE articleID=' + mysql.escape(articleID);
    mysql.query(query, function(err, rows, fields) {
        if(err) {
            console.log(err);
            return;
        }
        res.redirect('/');
    });
});
router.get('/delete/:articleID', function(req, res, next) {
    var articleID = req.params.articleID;
    var user = req.session.user;
    var query = 'DELETE FROM article WHERE articleID=' + mysql.escape(articleID);
    if(!user) {
        res.redirect('/login');
        return;
    }
    mysql.query(query, function(err, rows, fields) {
        res.redirect('/')
    });
});
module.exports = router;
