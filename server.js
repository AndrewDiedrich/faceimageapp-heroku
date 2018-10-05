const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL, //localhost/updated with heroku db
    ssl: true,
    // user : 'postgres',
    // password : '',
    // database : 'smart-brain'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('it is working')})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
//or --->app.post('/signin', signin.handleSignin))
//signin function calls req, res and this side only has ot pass on db and bcrypt
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=> { //function will happen after listen on port 3002
	console.log(`app is running on port ${process.env.PORT}`);
})

/*
--> res = this is working
/signin --> POST = success/fail /anytime we send a password we wanna send with https and not a query string, for security
/register --> POST = user account details created
/profile/:userId --> GET = user
/image --> PUT = updated user object count for rank

*/