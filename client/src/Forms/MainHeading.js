import React,{useState}from 'react'
import { useHtmlContext } from "../Context/HTMLContext";

let mainHeadingHead = `<h1 style="text-align: center"><span style="color: rgb(186, 55, 42); font-size: 16pt"><strong><span style="font-family: ' Nirmala UI Semilight'">`;
let mainHeadingTail= `</span></strong></span></h1>`;
let paragraphHead = `<p style="margin-right: 140px; margin-left: 140px; text-align: justify">`;
let paragraphTail = `</p>`;
const MainHeading = () => {
    const [mainHeading, setMyMainHeading] = useState("");
    const [flag, setFlag] = useState(false);
    const [textareaValue, setTextareaValue] = useState("");
    const { setMainHeading, setMainHeadingContent, setMainHeadingHtmlContent } = useHtmlContext();
    function saveTitle() {
      let titleHtmlContent = mainHeadingHead + mainHeading + mainHeadingTail;
      if (textareaValue) {
        titleHtmlContent += paragraphHead + textareaValue + paragraphTail;
      }
      setMainHeading(mainHeading);
      setMainHeadingContent(textareaValue);
      setMainHeadingHtmlContent(titleHtmlContent);
    }
    function togglePara() {
      setFlag(!flag);
    }
    return (
      <div>
        <div className="flex">
          <label className="mt-4 ml-2">MainHeading</label>
          <div className="flex flex-col">
            <input
              className="shadow appearance-none border rounded m-4 w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chapter"
              type="text"
              placeholder="Add Chapter Main Heading"
              onChange={(e) => setMyMainHeading(e.target.value)}
            />
            {flag && (
              <textarea
                className="textarea textarea-bordered ml-4"
                placeholder="Add  Main Heading Paragraph here"
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

export default MainHeading