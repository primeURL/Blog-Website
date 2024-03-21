import React, { useState } from "react";
import { useHtmlContext } from "../Context/HTMLContext";

let titleHead = `<h1 style="text-align: center"><span style="color: rgb(186, 55, 42); font-size: 16pt"><strong><span style="font-family: ' Nirmala UI Semilight'">`;
let titleTail = `</span></strong></span></h1>`;
let paragraphHead = `<p style="margin-right: 140px; margin-left: 140px; text-align: justify">`;
let paragraphTail = `</p>`;

const Title = () => {
  const [title, setMyTitle] = useState("");
  const [flag, setFlag] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const { obj, setObject } = useHtmlContext();
  function saveTitle(title, textArea) {
    const newObj = { ...obj };
    if (!title) {
      alert("Enter Valid Title Name");
      return;
    }
    if (newObj.title === title && newObj.content === textArea) {
      alert("Title or Paragraph Alreday Added");
      return;
    }
    let titleHtmlContent = titleHead + title + titleTail;
    if (textareaValue) {
      titleHtmlContent += paragraphHead + textareaValue + paragraphTail;
    }
    setObject({
      ...obj,
      title: title,
      content: textareaValue,
      htmlContent: titleHtmlContent,
    });
    setEditTitle(true);
  }
  function togglePara() {
    setFlag(!flag);
  }
  return (
    <div>
      <div className="flex">
        <label className="m-4">Title</label>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
              className="shadow appearance-none border rounded m-4 w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chapter"
              type="text"
              placeholder="Add Book Title"
              onChange={(e) => setMyTitle(e.target.value)}
              disabled={editTitle}
            />
            {!flag ? (
              <button
                type="button"
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-8  rounded mt-4"
                onClick={() => setFlag(!flag)}
              >
                Add para
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-8 rounded mt-4 ml-2"
                onClick={togglePara}
              >
                Hide
              </button>
            )}
            {!editTitle ? (
              <button
                className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 mt-4 ml-2 rounded"
                type="button"
                onClick={() => saveTitle(title, textareaValue)}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 mt-4 ml-2 rounded"
                type="button"
                onClick={() => setEditTitle(false)}
              >
                Edit
              </button>
            )}
          </div>
          {flag && (
            <textarea
              className="textarea textarea-bordered ml-4"
              placeholder="Add title Paragraph here"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              disabled={editTitle}
            ></textarea>
          )}
        </div>
      </div>
    </div>
  );
};

export default Title;
