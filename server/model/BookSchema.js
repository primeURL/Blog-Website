const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define SubHeading Schema
const subHeadingSchema = new Schema({
    title: String,
    content: String,
    subHeadingId : String,
    htmlContent: String  // assuming you want to store HTML content as well
});

// Define Heading Schema
const headingSchema = new Schema({
    mainHeading: String,
    mainHeadingContent: String,
    mainHeadingId : String,
    htmlContent: String, // assuming you want to store HTML content as well
    subHeadings: [subHeadingSchema]
});

// Define Chapter Schema
const chapterSchema = new Schema({
    chapterName: String,
    chapterContent: String,
    chapterId : String,
    htmlContent: String, // assuming you want to store HTML content as well
    chapterHeadings: [headingSchema]
});

// Define Book Schema
const bookSchema = new Schema({
    title: String,
    content: String,
    htmlContent: String, // assuming you want to store HTML content as well
    entireChapterHtmlContent : String,
    chapters: [chapterSchema]
});

module.exports = mongoose.model("bookschema", bookSchema);
