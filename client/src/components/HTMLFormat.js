import React, { useContext, useEffect, useState } from "react";
import HTMLContext from "../Context/HTMLContext";
import axios from "axios";
const HTMLFormat = () => {
  // const storedContent = localStorage.getItem('content')
  const [content, setContent] = useState([]);
  const [contentChapter, setContentChapter] = useState([]);
  const [mainHeading, setMainHeadings] = useState([]);
  const [subHeading, setSubHeadings] = useState([]);
  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:4000/book");
        console.log(response.data);
        setContent(response.data[0].entireChapterHtmlContent);
        setContentChapter(response.data[0].chapters);
        addUniqueIdsToHeadings()
      } catch (error) {
        console.log(error);
      }
    }
    fetchBooks();
   
  }, []);
  useEffect(()=>{
    
  },[content])
  const addEventListenersToHeadings = () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    console.log('h',headings)
    headings.forEach((heading) => {
      heading.addEventListener('click', scrollToSection);
    });
  };

  // const scrollToSection = (event) => {
  //   const headingText = event.target.innerText;
  //   console.log('hi',headingText)
  //   const sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  //   sections.forEach((section) => {
  //     if (section.innerText === headingText) {
  //       section.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   });
  // };
  function loadHeadings(chapterName, chapterHeadings) {
    setMainHeadings(chapterHeadings);
  }
  function loadSubHeadings(chapterSubHeadings) {
    setSubHeadings(chapterSubHeadings);
  }
  function addUniqueIdsToHeadings(){
    const sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    // console.log(sections[0].innerText)
    sections.forEach((section, index) => {
      let id = section.innerText
      section.id = `${id}`;
    });

  }
  function scrollToSection(event){
    const headingText = event.target.innerText;
    const sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    sections.forEach((section) => {
      if (section.innerText === headingText) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  return (
    <>
      <div className="grid grid-cols-12 h-screen w-screen">
        <div className="col-span-5">
          <div className="flex">
            <div className="border-4 border-indigo-600">
              {contentChapter &&
                contentChapter.map((data) => {
                  return (
                    <div
                      onClick={() =>
                        loadHeadings(data.chapterName, data.chapterHeadings)
                      }
                      className="p-1"
                    >
                      <span onClick={scrollToSection}>{data.chapterName}</span>
                    
                    </div>
                  );
                })}
            </div>
            <div className="ml-4 mt-4 border-4 border-red-600 p-1">
              {mainHeading &&
                mainHeading.map((data) => {
                  return (
                    <div onClick={() => loadSubHeadings(data.subHeadings)}>
                      <span onClick={scrollToSection}>{data.mainHeading}</span>
                    
                    </div>
                  );
                })}
            </div>
            <div className="ml-4 mt-8 border-4 border-pink-600 p-1">
              {subHeading &&
                subHeading.map((data) => {
                  return <div> <span onClick={scrollToSection}>{data.title}</span> </div>;
                })}
            </div>
          </div>
        </div>
        <div className="col-span-7">
          <div id="htmlContent" className="border-2 border-dotted p-4 border-pink-600 mr-2 h-dvh overflow-scroll">
            {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
          </div>
        </div>
        {/* <button onClick={check}>Check</button> */}
      </div>
      <div>lo
      </div>
    </>
  );
};

function ChapterHeadings({ chapterHeadings }) {
  console.log("cH", chapterHeadings);
  return (
    <>
      <div className="ml-16">
        {chapterHeadings &&
          chapterHeadings.map((data) => {
            return <div>{data.mainHeading}</div>;
          })}
      </div>
    </>
  );
}

export default HTMLFormat;
