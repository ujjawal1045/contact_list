const express = require('express');
const req = require('express/lib/request');
const { redirect } = require('express/lib/response');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
 app.set('views',path.join(__dirname,'views'));
 app.use(express.urlencoded());
 app.use(express.static('assets'));

// //middleware1
// app.use(function(req, res, next){
//     //console.log('middleware 1 called');
//     req.myname="upendra";
//     next();
// });

// //middleware2
// app.use(function(req, res, next){
//     //console.log('middleware 2 called');
//     console.log('my name from mW2', req.myname);
//     next();
// });


 var contactlist = [
     
 ]


app.get('/', function(req, res){
    //console.log(__dirname);
    //res.send('<h1>cool, it is running! or is it?</h1>');
    console.log('from the get route controller',req.myname);

    Contact.find({},function(err, contacts){
        if(err){
            console.log('err in finding contact from db');
            return;
        }

            return res.render('home',
            {title: "My first contact list",
            contacts_list: contacts
        });
        
    });



    // return res.render('home',
    //     {title: "My first contact list",
    //     contacts_list: contactlist
    // });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "let us play with ejs"
    });
});

app.post('/create-contact', function(req, res){
    //return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactlist.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact!');
        return;}

        console.log('******', newContact);
        return res.redirect('back');
    });
   
});


app.get('/delete-contact/', function(req, res){
    // console.log(req.params);
    // let phone = req.params.phone;
    console.log(req.query);
    // get the id from query in the url
    let id = req.query.id;
// find the contact in the databse using id and delete it
        Contact.findByIdAndDelete(id, function(err) {
            if(err) {
                console.log('err in finding and deleting obj from databse');
                return;
            }
            return res.redirect('back');
        });
    // let contactindex = contactlist.findIndex(contact => contact.phone == phone);

    // if(contactindex != -1){
    //     contactlist.splice(contactindex, 1);
    // }

    


}); 

app.listen(port, function(err) {
    if(err) {
        console.log('error in running the server', err);
    }
    console.log('yup!My Express Server is running on port :', port);
});