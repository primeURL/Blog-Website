import React, { useState } from "react";
import MainHeadingComponent from "./MainHeadingComponent";
import { useHtmlContext } from "../Context/HTMLContext";
let chapterHead = `<h1 style="text-align: center"><span style="color: rgb(186, 55, 42); font-size: 16pt"><strong><span style="font-family: ' Nirmala UI Semilight'">`;
let chapterTail = `</span></strong></span></h1>`;
let paragraphHead = `<p style="margin-right: 140px; margin-left: 140px; text-align: justify">`;
let paragraphTail = `</p>`;
const ChapterCopy = () => {
  const [addChapterDynamically, setAddChapterDynamically] = useState([
    Date.now().toString(),
  ]);
  const { obj, setObject } = useHtmlContext();
  function addChapter() {
    setAddChapterDynamically([...addChapterDynamically, Date.now().toString()]);
  }
  function removeChapter(indexToRemove, chapterToRemove) {
    const newObj = { ...obj };
    const newUpdatedChapters = newObj.chapters.filter(
      (ch) => ch.chapterName !== chapterToRemove
    );
    const updatedChapters = addChapterDynamically.filter(
      (index) => index !== indexToRemove
    );
    setAddChapterDynamically(updatedChapters);
    setObject({ ...newObj, chapters: newUpdatedChapters });
  }
  return (
    <div>
      {addChapterDynamically &&
        addChapterDynamically.map((index) => {
          return (
            <ChapterComponent
              key={index}
              index={index}
              removeChapter={removeChapter}
            />
          );
        })}
      <button
        className="mt-4 btn btn-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 ml-2 border border-blue-500 hover:border-transparent rounded"
        onClick={addChapter}
        type="button"
      >
        Add Chapter
      </button>
    </div>
  );
};

function ChapterComponent({ index, removeChapter }) {
  const [chapter, setMyChapter] = useState("");
  const [flag, setFlag] = useState(false);
  const [editChapter, setEditChapter] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const { obj, setObject } = useHtmlContext();
  const [addHeadingBtn, setAddHeadingBtn] = useState(true);
  const [addMainHeadingDynamically, setAddMainHeadingDynamically] = useState(
    []
  );

  function saveChapter(index) {
    if (!chapter) {
      alert("Enter Valid Chapter Name");
      return;
    }
    if (!isNaN(chapter)) {
      setMyChapter(null);
      alert("Nuber is are not allowed");
      return;
    }

    let chaptereHtmlContent = chapterHead + chapter + chapterTail;
    if (textareaValue) {
      chaptereHtmlContent += paragraphHead + textareaValue + paragraphTail;
    }
    const newObj = { ...obj };

    if (editMode) {
      const newChapters = newObj.chapters.map((ch) => {
        if (ch.chapterId === index) {
          return {
            ...ch,
            chapterName: chapter,
            chapterContent: textareaValue,
            htmlContent: chaptereHtmlContent,
          };
        }
        return ch;
      });
      setObject({...newObj,chapters : newChapters})
    }else{
      const newChapter = {
        chapterName: chapter,
        chapterContent: textareaValue,
        chapterId: index,
        htmlContent: chaptereHtmlContent,
        chapterHeadings: [],
      };
  
      // Append the new chapter to the existing chapters array
      newObj.chapters = [...newObj.chapters, newChapter];
  
      // Update the state with the new object
      setObject(newObj);
    }

    // Create a new chapter object
    
    setAddHeadingBtn(false);
    setEditChapter(true);
  }
  function togglePara() {
    setFlag(!flag);
  }
  function handleEdit() {
    setEditChapter(false);
    setEditMode(true);
  }
  function addMainHeading() {
    // if()
    setAddMainHeadingDynamically([
      ...addMainHeadingDynamically,
      Date.now().toString(),
    ]);
  }
  function removeMainHeading(indexToRemove, mainHeadingToRemove, chapterName) {
    console.log(chapter, mainHeadingToRemove);
    const newObj = { ...obj };
    const updatedChapters = newObj.chapters.map((chapter) => {
      if (chapter.chapterName === chapterName) {
        // Filter out the heading with the specified mainHeading
        const filteredHeadings = chapter.chapterHeadings.filter(
          (heading) => heading.mainHeading !== mainHeadingToRemove
        );
        // Update the chapterHeadings array
        return {
          ...chapter,
          chapterHeadings: filteredHeadings,
        };
      }
      return chapter;
    });
    // const findChapter = newObj.chapters.filter((chapter)=>chapter.chapterName === chapter);
    // const newMainHeadings = findChapter.chapterHeadings.filter((mh)=>mh.mainHeading !== mainHeadingToRemove)
    const updatedHeadings = addMainHeadingDynamically.filter(
      (index) => index !== indexToRemove
    );
    setAddMainHeadingDynamically(updatedHeadings);
    setObject({ ...newObj, chapters: updatedChapters });
  }
  return (
    <>
      <div className="flex">
        <label className="mt-4 ml-2">Chapter</label>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <input
              className="shadow appearance-none border rounded m-4 w-52 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="chapter"
              type="text"
              placeholder="Add Book Chapter"
              onChange={(e) => setMyChapter(e.target.value)}
              disabled={editChapter}
            />
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold h-8 w-20 rounded mt-4 ml-2"
                onClick={togglePara}
              >
                Remove
              </button>
            )}

            {!editChapter ? (
              <button
                className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 w-20 mt-4 ml-2 rounded"
                type="button"
                onClick={() => saveChapter(index)}
              >
                Save
              </button>
            ) : (
              <button
                className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 w-20 mt-4 ml-2 rounded"
                type="button"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
            <button
              type="button"
              className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-8 w-32 mt-4 ml-2 rounded"
              onClick={addMainHeading}
              disabled={addHeadingBtn}
            >
              Add Heading
            </button>
            <button
              className="btn btn-sm bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 h-8 w-34 mt-4 ml-2 rounded"
              type="button"
              onClick={() => removeChapter(index, chapter)}
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
              disabled={editChapter}
            ></textarea>
          )}
          {addMainHeadingDynamically &&
            addMainHeadingDynamically.map((index) => {
              return (
                <MainHeadingComponent
                  key={index}
                  index={index}
                  removeMainHeading={removeMainHeading}
                  chapter={chapter}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ChapterCopy;
