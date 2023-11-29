import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/all';

const Ime1Context = createContext();

export const Ime1Provider = ({ children }) => {
    const [navBgColor, setNavBgColor] = useState("")

  return (
    <Ime1Context.Provider value={{setNavBgColor, navBgColor}}>
      {children}
    </Ime1Context.Provider>
  );
};

export const useIme1Context = () => useContext(Ime1Context);