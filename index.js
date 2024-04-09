const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},

];

app.get('/', (req,res) => {
    res.send('HELLO WORLD==');
});

app.get('/api/courses', (req,res)=> {
    res.send(courses);
});


app.get('/api/courses/:id', (req,res) => {
     const course = courses.find(c =>c.id === parseInt(req.params.id));
     if (!course) return res.status(404).send('The course with the given ID was not found.');// 404 
     res.send(course);
});

//multiple params in the route
/*app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.params);
});                 */
 // if i need to sort the values by there name ?sortBy=name we use query string to give additional data for backend sservices
//params for essential data and query string for additional data
//to read query string we go into query instead of params like this res.send(req.query);


app.post('api/courses', (req,res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.ValidationError(req.body, schema);
    console.log(result);
    
    if(result.error) {
        //400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');// 404 

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c =>c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');// 404 

    const index = courses.indexOf(courses);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
}

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ${port}...'));

