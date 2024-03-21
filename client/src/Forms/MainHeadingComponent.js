import React, { useState } from "react";
import SubHeadingComponent from "./SubHeadingComponent";
import { useHtmlContext } from "../Context/HTMLContext";

let mainHeadingHead = `<h1 style="text-align: center"><span style="color: rgb(186, 55, 42); font-size: 16pt"><strong><span style="font-family: ' Nirmala UI Semilight'">`;
let mainHeadingTail = `</span></strong></span></h1>`;
let paragraphHead = `<p style="margin-right: 140px; margin-left: 140px; text-align: justify">`;
let paragraphTail = `</p>`;
const MainHeadingComponent = ({ index, removeMainHeading, chapter }) => {
  const [addSubHeadingDynamically, setAddSubHeadingDynamically] = useState([]);
  const [mainHeading, setMyMainHeading] = useState("");
  const [addSubHeadingBtn,setAddSubHeadingBtn] = useState(true)
  const [editMainHeading, setEditMainHeading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const {obj,setObject,} = useHtmlContext();

  const [flag, setFlag] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  function addSubHeading() {
    setAddSubHeadingDynamically([
      ...addSubHeadingDynamically,
      Date.now().toString(),
    ]);
  }
  function saveMainHeading(index) {
    console.log(index)
    if (!mainHeading) {
      alert('Enter A Valid Chapter Name');
      return 
   }
  if (!isNaN(mainHeading)) {
      alert('Nuber is are not allowed');
      setMyMainHeading("")
      return 
    }
    let headingHtmlContent = mainHeadingHead + mainHeading + mainHeadingTail;
    if (textareaValue) {
      headingHtmlContent += paragraphHead + textareaValue + paragraphTail;
    }
    const newObj = { ...obj };
    if(editMode){
      console.log(mainHeading)
      const updatedChapters = newObj.chapters.map(chapter => {
        const updatedHeadings = chapter.chapterHeadings.map(heading => {
          if (heading.mainHeadingId === index) {
            return {
              ...heading,
              mainHeading : mainHeading,
              mainHeadingContent : textareaValue,
              htmlContent : headingHtmlContent
            };
          } else {
            return heading;
          }
        });
  
        return { ...chapter, chapterHeadings: updatedHeadings };
      });
      setObject({...newObj, chapters : updatedChapters})
    }else{
      const filteredChapter = newObj.chapters.filter(
        (data) => data.chapterName === chapter
      );
      const newHeading = {
        mainHeading: mainHeading,
        mainHeadingContent: textareaValue,
        mainHeadingId : index,
        htmlContent: headingHtmlContent,
        subHeadings: []
      };
      filteredChapter[0].chapterHeadings.push(newHeading);
  
      setObject(newObj);
    }
    
    setAddSubHeadingBtn(false)
    setEditMainHeading(true)
  }
  function togglePara() {
    setFlag(!flag);
  }
  function handleEdit() {
    setEditMainHeading(false);
    setEditMode(true);
  }
  function removeSubHeading(indexToRemove,chapterName,mainHeading,subHeadings) {
    const newObj = {...obj}
    const updatedChapter = newObj.chapters.map(chapter => {
      if (chapter.chapterName === chapterName) {
        const updatedHeadings = chapter.chapterHeadings.map(heading => {
          if (heading.mainHeading === mainHeading) {
            const updatedSubHeadings = heading.subHeadings.filter(subHeading => {
              return subHeading.title !== subHeadings;
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
    const updatedChapters = addSubHeadingDynamically.filter(
      (index) => index !== indexToRemove
    );
    setAddSubHeadingDynamically(updatedChapters);
    setObject({...newObj, chapters : updatedChapter})
  }

  return (
    <>
      <div className="flex">
        <label className="mt-4 ml-2">Add Heading H1</label>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
              className="shadow appearance-none border rounded m-4 ml-8 w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chapter"
              type="text"
              placeholder="Add Book Heading H1"
              onChange={(e) => setMyMainHeading(e.target.value)}
              disabled={editMainHeading}
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
                className="btn btn-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-8 w-20 rounded mt-4 ml-2"
                onClick={togglePara}
              >
                Remove
              </button>
            )}
           { !editMainHeading ? (<button
              className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 mt-4 ml-2 rounded"
              type="button"
              onClick={()=>saveMainHeading(index)}
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
              type="button"
              className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 mt-4 ml-2 rounded"
              onClick={addSubHeading}
              disabled={addSubHeadingBtn}
            >
              Add SubHeading
            </button>
            <button
              className="btn btn-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 h-8 mt-4 ml-2 rounded"
              type="button"
              onClick={() => removeMainHeading(index,mainHeading,chapter)}
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
              disabled={editMainHeading}
            ></textarea>
          )}
          {addSubHeadingDynamically &&
            addSubHeadingDynamically.map((index) => {
              return (
                <SubHeadingComponent
                  key={index}
                  index={index}
                  removeSubHeading={removeSubHeading}
                  chapter = {chapter}
                  mainHeading = {mainHeading}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MainHeadingComponent;
