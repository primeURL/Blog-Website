import React, { useState } from "react";
import { useHtmlContext } from "../Context/HTMLContext";

let chapterHead = `<h1 style="text-align: center"><span style="color: rgb(186, 55, 42); font-size: 16pt"><strong><span style="font-family: ' Nirmala UI Semilight'">`;
let chapterTail = `</span></strong></span></h1>`;
let paragraphHead = `<p style="margin-right: 140px; margin-left: 140px; text-align: justify">`;
let paragraphTail = `</p>`;
const Chapter = () => {
  const [chapter, setMyChapter] = useState("");
  const [flag, setFlag] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const { setChapterName, setChapterContent, setChapterHtmlContent } =
    useHtmlContext();

  const [addChapterDynamically, setAddChapterDynamically] = useState([
    Date.now().toString(),
  ]);
  const [addHeadingDynamically, setAddHeadingDynamically] = useState([]);
  console.log('c',addHeadingDynamically)
  function saveTitle() {
    let titleHtmlContent = chapterHead + chapter + chapterTail;
    if (textareaValue) {
      titleHtmlContent += paragraphHead + textareaValue + paragraphTail;
    }
    setChapterName(chapter);
    setChapterContent(textareaValue);
    setChapterHtmlContent(titleHtmlContent);
  }
  function togglePara() {
    setFlag(!flag);
  }
  function addChapter() {
    setAddChapterDynamically([...addChapterDynamically, Date.now().toString()]);
  }
  function removeChapter(indexToRemove) {
    const updatedChapters = addChapterDynamically.filter(
      (index) => index !== indexToRemove
    );
    setAddChapterDynamically(updatedChapters);
  }
  function addHeading() {
    setAddHeadingDynamically([...addHeadingDynamically, Date.now().toString()]);

  }
  return (
    <div>
      {addChapterDynamically &&
        addChapterDynamically.map((index) => {
          return (
            <div className="flex">
              <label className="mt-4 ml-2">Chapter</label>
              <div className="flex flex-col">
                <input
                  className="shadow appearance-none border rounded m-4 w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="chapter"
                  type="text"
                  placeholder="Add Book Chapter"
                  onChange={(e) => setMyChapter(e.target.value)}
                />
                {flag && (
                  <textarea
                    className="textarea textarea-bordered ml-4"
                    placeholder="Add chapter Paragraph here"
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                  ></textarea>
                )}

                    {/* Heading Code Start here  */}
                    {addHeadingDynamically && addHeadingDynamically.map((index)=>{
                      return (
                        <div>
                        <div className="ml-5">
                          <label>Add Heading H1</label>
                          <input
                            className="shadow appearance-none border rounded ml-8 w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="chapter"
                            type="text"
                            placeholder="Add Book Heading H1"
                          />
                        
                        </div>
                        <button
                            className="bg-transparent mt-2  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 ml-2 border border-blue-500 hover:border-transparent rounded"
                            onClick={addHeading}
                          >
                            Add Another Heading
                          </button>
                      </div>
                      )
                    })}
                    {/* Heading Code End here  */}
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

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 w-20 mt-4 ml-2 rounded"
                type="button"
                onClick={saveTitle}
              >
                Save
              </button>
              <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 w-32 mt-4 ml-2 rounded"
              onClick={addHeading}>
                AddHeadingH1
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 h-8 w-24 mt-4 ml-2 rounded"
                type="button"
                onClick={() => removeChapter(index)}
              >
                Remove
              </button>
            </div>
          );
        })}
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 ml-2 border border-blue-500 hover:border-transparent rounded"
        onClick={addChapter}
      >
        Add Chapter
      </button>
    </div>
  );
};

export default Chapter;
