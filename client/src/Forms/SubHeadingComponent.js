import React, { useState } from "react";
import { useHtmlContext } from "../Context/HTMLContext";
let subHeadingHead = `<h1 style="text-align: center"><span style="color: rgb(186, 55, 42); font-size: 16pt"><strong><span style="font-family: ' Nirmala UI Semilight'">`;
let subHeadingTail = `</span></strong></span></h1>`;
let paragraphHead = `<p style="margin-right: 140px; margin-left: 140px; text-align: justify">`;
let paragraphTail = `</p>`;
const SubHeadingComponent = ({ index, removeSubHeading,chapter,mainHeading }) => {
  const [subHeadings, setSubHeadings] = useState("");

  const [flag, setFlag] = useState(false);
  const [editSubHeading, setEditSubHeading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const {obj,setObject} = useHtmlContext()
  function togglePara() {
    setFlag(!flag);
  }
  function saveSubHeading(index) {
    let subHeadingHtmlContent = subHeadingHead + subHeadings + subHeadingTail;
    if (textareaValue) {
      subHeadingHtmlContent += paragraphHead + textareaValue + paragraphTail;
    }
    
    const newObj = {...obj}
    if(editMode){
      const chapterName = chapter
      const updatedChapters = newObj.chapters.map(chapter => {
        if (chapter.chapterName === chapterName) {
          const updatedHeadings = chapter.chapterHeadings.map(heading => {
            if (heading.mainHeading === mainHeading) {
              const updatedSubHeadings = heading.subHeadings.map(subHeading => {
                if (subHeading.subHeadingId === index) {
                  return {
                    ...subHeading,
                    title: subHeadings,
                    content: textareaValue,
                    htmlContent: subHeadingHtmlContent
                  };
                } else {
                  return subHeading;
                }
              });
              return { ...heading, subHeadings: updatedSubHeadings };
            } else {
              return heading;
            }
          });
          return { ...chapter, chapterHeadings: updatedHeadings };
        } else {
          return chapter;
        }
      });
      setObject({...newObj,chapters : updatedChapters})
    }else{
      const newSubHeading = {
        title: subHeadings,
        content: textareaValue,
        subHeadingId : index,
        htmlContent: subHeadingHtmlContent
      };
      const filteredChapter = newObj.chapters.filter((data) => data.chapterName === chapter);
      const filteredHeadings = filteredChapter[0].chapterHeadings.filter((data)=>data.mainHeading === mainHeading)
      filteredHeadings[0].subHeadings.push(newSubHeading);
    }
    setEditSubHeading(true)
  }
  function handleEdit() {
    setEditSubHeading(false);
    setEditMode(true);
  }
  return (
    <>
      <div className="flex">
        <label className="mt-4 ml-2">Add SubHeading</label>
        <div className="flex flex-col">
          <div className="flex flex-row">
          <input
              className="shadow appearance-none border rounded m-4 ml-8 w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chapter"
              type="text"
              placeholder="Add Book Heading H1"
              onChange={(e) => setSubHeadings(e.target.value)}
              disabled={editSubHeading}
            />

            {!flag ? (
              <button
                type="button"
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-8 rounded mt-4"
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
                Remove
              </button>
            )}
           {!editSubHeading ? ( <button
              className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 mt-4 ml-2 rounded"
              type="button"
              onClick={()=>saveSubHeading(index)}
            >
              Save
            </button>) : 
           ( <button
              className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 mt-4 ml-2 rounded"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>)}
            <button
              className="btn btn-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 h-8 w-34 mt-4 ml-2 rounded"
              type="button"
              onClick={() => removeSubHeading(index,chapter,mainHeading,subHeadings)}
            >
              Remove
            </button>
          </div>
          {flag && (
          <textarea
            className="textarea textarea-bordered ml-4"
            placeholder="Add chapter Paragraph here"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            disabled={editSubHeading}
          ></textarea>
        )}
        </div>
       
      </div>
    </>
  );
};

export default SubHeadingComponent;
