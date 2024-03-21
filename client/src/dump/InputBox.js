import React,{useState,useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import HTMLContext from '../Context/HTMLContext'

let titleHead = `<span style="font-size: 16pt; font-family: ' Nirmala UI Semilight'; color: rgb(159, 20, 20);"><strong>`
let titleTail = `</strong></span>`
let chapterHead = `This is chapter Head`
let chapterTail = `This is chapter Tail`
let headingH1Head = 'This is chapter Heading h1 head'
let headingH1Tail = 'This is chapter Heading h1 tail'
let headingSH1Head = 'This is chapter Heading SH1 head'
let headingSH1Tail = 'This is chapter Heading SH1 tail'
let headingSH2Head = 'This is chapter Heading SH2 head'
let headingSH2Tail = 'This is chapter Heading SH2 tail'
let headingSH3Head = 'This is chapter Heading SH3 head'
let headingSH3Tail = 'This is chapter Heading SH3 tail'
const InputBox = () => {

    const [selectedHeading, setSelectedHeading] = useState('Select Heading');
    const [textareaValue, setTextareaValue] = useState('');
    const [chapter, setChapter] = useState('');

    const {content, setContent} = useContext(HTMLContext)
    const handleOptionChange = (event) => {
        let value = (event.target.value)
        setSelectedHeading(value);
        let curPos =  document.getElementById("textArea").selectionStart; 
        console.log('c',curPos)
        const newText = textareaValue.slice(0, curPos) + value + textareaValue.slice(curPos);
        setTextareaValue(newText);
        setContent(newText);
        localStorage.setItem('content', newText);
    };
  
    const handleTextareaChange = (event) => {
      setTextareaValue(event.target.value);
      localStorage.setItem('content', event.target.value);
      // setContent(event.target.value);
    };
  
    const handleSubmit = async(event) => {
      event.preventDefault();
      console.log()
      try {
        let obj = {
            chapter,selectedHeading,textareaValue
        }
        const resp = await axios.post('http://localhost:4000/postHeading',obj)
        console.log(resp.data);
      } catch (error) {
        console.log(error);

      }
 
    };

    const handleButtonClick = (addHeadTail)=>{
        let curPos =  document.getElementById("textArea").selectionStart; 
        console.log('c',curPos)
        const newText = textareaValue.slice(0, curPos) + addHeadTail + textareaValue.slice(curPos);
        setTextareaValue(newText);
    }
  return (
    <>
    <div className='m-4'>
         <form onSubmit={handleSubmit}>
         <div className="m-4 mt-2">
            <label className="block text-gray-700 font-bold mb-2">
              Chapter Name
            </label>
            <input
              className="shadow appearance-none border rounded w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chapter"
              type="text"
              placeholder="Chapters"
              onChange={(e) => setChapter(e.target.value)}
            />
          </div>
          <div className='flex m-4'>
              <div className='flex flex-col'>
                <label className='font-bold'>Tile</label>
                <select onChange={handleOptionChange} className="select select-bordered mr-4">
                        <option disabled selected>Title</option>
                        <option value={titleHead}>Head</option>
                        <option value={titleTail}>Tail</option>
                </select>
              </div>
              <div className='flex flex-col'>
              <label className='font-bold'>Chapter</label>
                <select onChange={handleOptionChange} className="select select-bordered mr-4">
                        <option disabled selected>Chapter</option>
                        <option value={chapterHead}>Head</option>
                        <option value={chapterTail}>Tail</option>
                </select>
              </div>
              <div className='flex flex-col'>
              <label className='font-bold'>Heading H1</label>
                <select onChange={handleOptionChange} className="select select-bordered mr-4">
                        <option disabled selected>Heading H1</option>
                        <option value={headingH1Head}>Head</option>
                        <option value={headingH1Tail}>Tail</option>
                </select>
              </div>
              <div className='flex flex-col'>
              <label className='font-bold'>Heading SH1</label>
                <select onChange={handleOptionChange} className="select select-bordered mr-4">
                        <option disabled selected>Heading SH1</option>
                        <option value={headingSH1Head}>Head</option>
                        <option value={headingSH1Tail}>Tail</option>
                </select>
              </div>
              <div className='flex flex-col'>
              <label className='font-bold'>Heading SH2</label>
                <select onChange={handleOptionChange} className="select select-bordered mr-4">
                        <option disabled selected>Heading SH2</option>
                        <option value={headingSH2Head}>Head</option>
                        <option value={headingSH2Tail}>Tail</option>
                </select>
              </div>
              <div className='flex flex-col'>
              <label className='font-bold'>Heading SH3</label>
                <select onChange={handleOptionChange} className="select select-bordered mr-4">
                        <option disabled selected>Heading SH3</option>
                        <option value={headingSH3Head}>Head</option>
                        <option value={headingSH3Tail}>Tail</option>
                </select>
              </div>
          </div>
            {/* <button type="submit" className='btn btn-primary mr-4 mb-1'onClick={() => handleButtonClick(head)}>Head</button> */}
            {/* <button type="submit" className='btn btn-primary' onClick={() => handleButtonClick(tail)}>Tail</button> */}

         <div className='flex flex-col m-4'>
            <label> Enter Text</label>
            <textarea
            id='textArea'
            value={textareaValue}
            onChange={handleTextareaChange}
            rows={100}
            cols={50}
            className="textarea textarea-bordered h-24" placeholder="Enter source Code"
            />
         </div>
        <button type="submit" className='btn btn-primary ml-4'>Submit</button>
        <Link to='/goLive' target='_blank' rel="noopener noreferrer"> 
            Go Live
             {/* <button type="submit" className='btn btn-primary ml-4'>Go Live</button> */}
        </Link>
      </form>

      <div>
            <div id="htmlContent">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    </div>
   </>
  )
}

export default InputBox


/*
let content = {
    h1 : [
        {
            heading : string,
            content : string,
            h2 : [
                {
                    heading : string,
                    content : string,
                    h3 : [NULL]
                },
                {
                    heading : string,
                    content : string,
                    h3 : [
                        {
                            heading : string,
                            content : string,
                        }
                    ]
                },
                {
                    heading : string,
                    content : string,
                    h3 : [
                        {
                            heading : string,
                            content : string,
                        },
                        {
                            heading : string,
                            content : string,
                        }
                    ]
                },
            ]
        },
        {

        }
    ]
}

let Schema = {
  title : string,
  chapter : [
    {
      name : string,
      content : {
        h1 : [
          {
            heading : string,
            content : string,
            sh1 : {
              heading : string,
              content : string
            },
            sh2 : {
              heading : string,
              content : string
            },
            sh3 : {
              heading : string,
              content : string
            }
          },
          {
            heading : string,
            content : string,
            sh1 : {
              heading : string,
              content : string
            },
            sh2 : {
              heading : string,
              content : string
            },
            sh3 : {
              heading : string,
              content : string
            }
          }
        ]
      }
    }
  ],  
}


let headingSchema = {
  title : String,
  chapter : String,
  h1 : [
    {
      heading : String,
      Sh1 : String,
      Sh2 : String,
      Sh3 : String
    },
    {
      heading : String,
      Sh1 : String,
      Sh2 : String,
      Sh3 : String
    }
  ]
}
*/