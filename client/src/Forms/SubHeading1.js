import React,{useState} from 'react'
import { useHtmlContext } from "../Context/HTMLContext";

let subHeading1Head = `<h1 style="text-align: center"><span style="color: rgb(186, 55, 42); font-size: 16pt"><strong><span style="font-family: ' Nirmala UI Semilight'">`;
let subHeading1Tail = `</span></strong></span></h1>`;
let paragraphHead = `<p style="margin-right: 140px; margin-left: 140px; text-align: justify">`;
let paragraphTail = `</p>`;

const SubHeading1 = () => {
    const [subHeading1, setMySubHeading1] = useState("");
    const [flag, setFlag] = useState(false);
    const [textareaValue, setTextareaValue] = useState("");
    const { setSubHeading1, setSubHeading1Content, setSubHeading1HtmlContent } = useHtmlContext();
    function saveTitle() {
      let titleHtmlContent = subHeading1Head + subHeading1 + subHeading1Tail;
      if (textareaValue) {
        titleHtmlContent += paragraphHead + textareaValue + paragraphTail;
      }
      setSubHeading1(subHeading1);
      setSubHeading1Content(textareaValue);
      setSubHeading1HtmlContent(titleHtmlContent);
    }
    function togglePara() {
      setFlag(!flag);
    }
    return (
      <div>
        <div className="flex">
          <label className="mt-4 ml-2">SubHeading1</label>
          <div className="flex flex-col">
            <input
              className="shadow appearance-none border rounded m-4 w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chapter"
              type="text"
              placeholder="Add SubHeading1"
              onChange={(e) => setMySubHeading1(e.target.value)}
            />
            {flag && (
              <textarea
                className="textarea textarea-bordered ml-4"
                placeholder="Add SubHeading1 Paragraph here"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              ></textarea>
            )}
          </div>
  
          {!flag ? (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-8 w-20 rounded mt-4"
              onClick={() => setFlag(!flag)}
            >
              Add para
            </button>
          ) : (
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-8 w-20 rounded mt-28 ml-2"
              onClick={togglePara}
            >
              Remove
            </button>
          )}
  
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 w-20 mt-4 ml-2 rounded" type="button" onClick={saveTitle}>
            Save
          </button>
        </div>
      </div>
    );
}

export default SubHeading1