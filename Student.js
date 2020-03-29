
let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of oulsr routes will be prefixed with /api
    app.use('/api', bodyParser.json(), router);   //[use json]
    app.use('/api', bodyParser.urlencoded({ extended: false }), router);

        let students = [{'no':0,'id':5735512123,'name':'Selena','surname': 'Gomez','Major':'CoE','GPA':3.91},
                        {'no':1,'id':5735512321,'name':'Lalisa','surname': 'Manoban','Major':'CoE','GPA':3.98}
        ];

    router.route('/students')
    .get((req, res) =>  res.json(students) )

    .post( (req, res)=> {
        var student = {};
        student.no =  students[students.length-1].no+1;
        student.id = req.body.id
        student.name = req.body.name
        student.surname = req.body.surname
        student.Major = req.body.Major
        student.GPA = req.body.GPA
        students.push(student);
        res.json( {message: 'student created!'} )
    });

router.route('/students/:student_no')
   .get ( (req,res) => {
        let no = req.params.student_no
        let index = students.findIndex( student => (student.no === +no) )
        res.json(students[index])                   // get a student
    })  

   .put ( (req,res) => {                               // Update a student
       let no = req.params.student_no
       let index = students.findIndex( student => (student.no === +no) )
       students[index].id = req.body.id; 
       students[index].name = req.body.name;   
       students[index].surname = req.body.surname; 
       students[index].Major = req.body.Major; 
       students[index].GPA = req.body.GPA; 
       res.json({ message: 'student updated!' + req.params.student_no});
   })

   .delete ( (req,res) => {                   // Delete a student
       // delete     students[req.params.student_no]
       let no = req.params.student_no
       let index = students.findIndex( student => student.no === +no  )
       students.splice(index,1) 
       res.json({ message: 'student deleted: ' + req.params.student_no});
   })

app.use("*", (req,res) => res.status(404).send('404 Not found') );
app.listen(8000,  () => console.log("Server is running") );
