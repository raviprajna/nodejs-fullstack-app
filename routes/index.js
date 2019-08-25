var express = require('express');
var router = express.Router();

const nextjs = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextjsApp = nextjs({ dev })
const nextjsHandle = nextjsApp.getRequestHandler()

// const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

const userController = require('../controllers').user;
const hotelController = require('../controllers').hotel;

/* SWAGGER page. */
// router.use('/', swaggerUi.serve);
//router.get('/', swaggerUi.setup(swaggerDocument));

nextjsApp.prepare()
.then(() => {
  const server = express()

  server.get('*', (req, res) => {
  console.log(" hhhh ");
    return nextjsHandle(req, res)
  })

})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index', { title: 'Express' });
});

/* User Router */
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

/* Hotel Router */
router.get('/api/hotel', hotelController.list);
router.get('/api/hotel/:id', hotelController.getById);
router.post('/api/hotel', hotelController.add);
router.put('/api/hotel/:id', hotelController.update);
router.delete('/api/hotel/:id', hotelController.delete);

/* Advance Router */
router.post('/api/user/addWithHotels', userController.addWithHotels);

module.exports = router;
