let bodyParser = require('body-parser')
let urlencodeParser = bodyParser.urlencoded({
    extended: false
})
let Router = require('./route')


module.exports = class indexRouter extends Router {
    constructor(config, logger, manager) {
        super(config, logger, manager)
        // Setup router
        this.router.get('/', this.getHomePage)
        this.router.get('/login', this.getLoginPage)
        this.router.post('/login', urlencodeParser, this.postLoginPage.bind(this))
        this.router.get('/register', this.getRegisterPage)
        this.router.post('/register', urlencodeParser, this.postRegisterPage.bind(this))
        this.router.get('/logout', this.getLogoutPage)
        this.router.get('/manager', this.requireLogin, this.getManagerPage)
    }

    /* GET home page. */
    getHomePage(req, res, next) {
        if (!req.session) {
            res.redirect('/login')
        } else {
            res.render('index', {
                title: 'Express',
                messange: 'Hello World'
            })
        }
    }

    /* GET login page. */
    getLoginPage(req, res, next) {
        res.render('login', {
            result: ''
        })
    }

    /* POST login page. */
    postLoginPage(req, res, next) {
        console.log(Object.keys(req))
        console.log('req : ', req.method, req.url, req.statusCode, req.sessionID)
        console.log('req.params: ', req.params)
        console.log('req.body: ', req.body)
        console.log('req.session: ', req.session);
        console.log('req.query: ', req.query);
        var obj = {
            username: req.body.username,
            password: req.body.password
        }


        this.manager.login(obj, (err, doc) => {
            if (err) {
                logger.error(err)
                res.render('login', {
                    result: err
                })
            } else {
                // logger.info(`go to manager page ${doc}`)
                //logger.info()
                //var tuananh = req.session;
                //logger.info(tuananh);
                //tuananh.username = doc.username;
                //tuananh.password = doc.password;
                // req.session.username = doc.username
                // req.session.password = doc.password
                //logger.info(tuananh);
                res.redirect('manager')
            }
        })
    }

    /* GET register page. */
    getRegisterPage(req, res, next) {
        res.render('register', {
            result: ''
        })
    }

    /* POST register page. */
    postRegisterPage(req, res, next) {
        let arr = ['username', "email", "password"];
        for (let i = 0; i < arr.length; i++) {
            if (!req.body.hasOwnProperty(arr[i])) {
                res.render('register', {
                    result: "data not exist" + arr[i]
                })
                return next();
            }
        }
        let obj = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
        this.manager.register(obj, (err, result) => {
            if (err) {
                res.render('login', {
                    result: err
                })
            } else {
                res.redirect('manager')
            }
        })
    }

    /* GET logout page. */
    getLogoutPage(req, res, next) {
        if (req.session) {
            // delete session object
            req.session.destroy(function (err) {
                if (err) {
                    return next(err)
                }
                res.redirect('/login')
            })
        }
    }

    /* GET search page. */
    getManagerPage(req, res, next) {
        res.render('manager')
    }

    // router.get('/test/:i', (req, res, next) => {
    //     req.query
    // })
}