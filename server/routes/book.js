const express = require('express');
const router = express.Router();
const BookSchema = require('../model/BookSchema');

// Handle POST request to insert data

const extractHtmlContentString = (obj) => {
    let result = '';
  
    const traverse = (obj) => {
      if (obj.htmlContent) {
        result += obj.htmlContent;
      }
      if (Array.isArray(obj)) {
        obj.forEach(item => traverse(item));
      } else if (typeof obj === 'object') {
        Object.values(obj).forEach(value => traverse(value));
      }
    };
  
    traverse(obj);
    return result;
  };


router.get('/',async(req,res)=>{
    try {
        const resp =  await BookSchema.find({title : 'Coding Ninjas'})
        res.send(resp)
    } catch (error) {
        res.send(error)
    }
})


router.post('/', async (req, res) => {
    const obj = req.body
    const entireChapterHtmlContent = extractHtmlContentString(obj)
    const newObj = {...obj}
    newObj.entireChapterHtmlContent = entireChapterHtmlContent
    try {

        // let book = await BookSchema.findOne({ title });
     
        // Create a new book instance with data from the request body
        const newBook = new BookSchema(newObj);
        // Save the new book to the database
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;


const chapterMetadata = [
    {
        heading : String,
        subHeading : {
                sh1 : String,
                sh2 : String,
                sh3 : String,
            }
        
    },
    {
        heading : String,
        subHeading : {
            sh1 : String,
            sh2 : String,
            sh3 : String,
        }
    }
]