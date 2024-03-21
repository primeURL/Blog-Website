import React, {useState,useEffect} from "react";
import Title from "../Forms/Title";
import { useHtmlContext } from "../Context/HTMLContext";
import ChapterCopy from "../Forms/ChapterCopy";

const AddBook = () => {

    const {obj,setObject} = useHtmlContext()    
    async function handleSubmit(e) {
        e.preventDefault();
        
        // try {
        //     const response = await axios.post('http://localhost:4000/book',obj);
        //     console.log(response.data);

        // } catch (error) {
        //     console.log(error);
        // }

        console.log(obj)
        // setObject((prevObj)=>{
        //     return {...prevObj,title:title,content:content,htmlContent:titleHtmlContent}
        // })
      }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Title/>
        <ChapterCopy/>
        {/* <MainHeading/>   */}
        <button type="submit" className="btn btn-primary m-4 mt-10 py-2">
          Save to DB
        </button>
      </form>
    </div>
  );
};

export default AddBook;
