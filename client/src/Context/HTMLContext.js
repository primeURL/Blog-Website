import React, { createContext,useContext, useState } from 'react';

const HTMLContent = createContext();

export const useHtmlContext = ()=>{
   return useContext(HTMLContent)
}


export const ContentProvider = ({ children }) => {

  let object = {
    title : '',
    content : '',
    htmlContent : '',
    chapters : []
}
  const [obj,setObject] = useState(object)


  return (
    <HTMLContent.Provider value={{obj,setObject}}>
      {children}
    </HTMLContent.Provider>
  );
};

export default HTMLContent;