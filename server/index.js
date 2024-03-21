const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors')
const connectToMongo = require('./db')
const app = express();
const bookRouter = require('./routes/book');


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// app.use(express.urlencoded({extended : false}))
app.use(bodyParser.raw({ limit: '10mb' })); // Set limit for uploaded file size
// app.use(bodyParser.json()) // to get objects from req.body from client
app.use(cors())
connectToMongo()

app.use('/book', bookRouter)

app.get('/',(req,res)=>{
    res.status(200).send('Server running ')
})


/*
app.get('/allChapters/:bookName',async(req,res)=>{
    try {
        const {bookName} = req.params
        const allChapters = await BookSchema.find({bookName : bookName}).select('chapters');
        res.status(201).send(allChapters)
    } catch (error) {
        res.status(201).send('Unable to find All chapters')
    }
})

app.get('/getSingleChapter/:id',async(req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        const singleChapter = await BookSchema.find({_id : id}).select('content');
        res.status(201).send(singleChapter)
    } catch (error) {
        res.status(201).send('Unable to find All chapters')
    }
})

app.post('/upload',upload.single('document'),async (req, res) => {
    try {
        const {chapter,bookName} = req.body
        console.log(chapter);
        console.log(req.file.path);
        const response = await manmoth.convertToHtml({path : req.file.path})

        const html = response.value
        console.log('html',html)
        const htmlContent = `<!DOCTYPE html><html><body>${html}</body></html>`; // Basic HTML structure with extracted text
        const book = await BookSchema.find({chapters : chapter})
        if(book.length === 0){
            const resp = await BookSchema.create({chapters : chapter, content : htmlContent,bookName : bookName});
            res.send(resp); // Send generated HTML content to React app
        }else{
            res.send('Chapter Already Added'); // Send generated HTML content to React app
        }
    } catch (error) {
        console.log(error)
    }
});

app.post('/nestedbook',async(req,res)=>{       
    try {
        const {chapters} = (req.body)
        const response =  await BookModelSchema.find({chapters : chapters})
        console.log(response)
        if(response.length !== 0){
            const bookId = (response[0]._id.toString() );
            const {content : {h1,h2,h3}} = req.body;
            await BookModelSchema.findByIdAndUpdate(bookId, { $push: { "content.h1": { heading: h1.heading, subContent: h1.subContent } } }, { new: true });
            await BookModelSchema.findByIdAndUpdate(bookId, { $push: { "content.h2": { heading: h2.heading, subContent: h2.subContent  } } }, { new: true });
            const resp = await BookModelSchema.findByIdAndUpdate(bookId, { $push: { "content.h3": { heading: h3.heading, subContent: h3.subContent } } }, { new: true });
            res.status(200).send({message : "Updated Successfully",resp})
        }else{
            const {bookName,chapters,content} = (req.body)
            const resp = await BookModelSchema.create({chapters, content ,bookName });
            res.status(200).send({message : "New Entry Created SuccessfullyU",resp})
        }
    } catch (error) {
        res.status(500).send({error})

    }
})

app.post('/postHeading',async(req,res)=>{
    try {
        const { chapter,selectedHeading,textareaValue} = req.body
        const response =  await TestSchema.find({chapter : chapter})
        if(response.length !== 0){
            const bookId = (response[0]._id.toString() );
            let resp = undefined;
            let obj = {
                content : textareaValue
            }
            if(selectedHeading === "H1"){
                resp = await TestSchema.findByIdAndUpdate(bookId, { $push: { "H1": obj } }, { new: true });

            }else if(selectedHeading === "H2"){
                resp = await TestSchema.findByIdAndUpdate(bookId, { $push: { "H2": obj } }, { new: true });

            }else if(selectedHeading === "H3"){
                resp = await TestSchema.findByIdAndUpdate(bookId, { $push: { "H3": obj } }, { new: true });

            }
            res.status(200).send({message : "Updated Successfully",resp})
        }else{
            let { chapter,selectedHeading,textareaValue} = req.body
            let resp = undefined
            let obj = {
                content : textareaValue
            }
            if(selectedHeading === "H1"){
                resp = await TestSchema.create({chapter, H1 : obj});
            }else if(selectedHeading === "H2"){
                resp = await TestSchema.create({chapter, H2 : obj});
            }else if(selectedHeading === "H3"){
                resp = await TestSchema.create({chapter, H3 : obj});
            }
           
            res.status(200).send({message : "New Entry Created SuccessfullyU",resp})
        }
    } catch (error) {
        console.log(error)
    }
})
*/
app.listen(4000, () => console.log('Server listening on port 4000'));



