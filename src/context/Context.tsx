import { createContext, useState } from "react";
import run from "../config/gemini";

export interface ContextProps {
    onSent: (prompt?:string) => void;
    recentPrompt: string;
    resultData: string;
    showResult: boolean;
    loading: boolean;
    prevPrompts: string[];
    setPrevPrompts: (prevPrompts: string[]) => void;
    prevResponse: string[];
    setPrevResponse: (prevResponse: string[]) => void;
    setRecentPrompt: (recentPrompt: string) => void;
    input: string;
    setInput: (input: string) => void;
    setResultData: (resultData: string) => void;
    newChat: () => void;
  }

export const Context = createContext<ContextProps | undefined>(undefined);

const ContextProvider = (props:any) => {

    const [input, setInput] = useState<string>("");
    const [recentPrompt, setRecentPrompt] = useState<string>("");
    const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
    const [prevResponse, setPrevResponse] = useState<string[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [resultData, setResultData] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const delayPara = (index:number, nextword:string) => {
        setTimeout(() => {
            setResultData(prev => prev + nextword + " ")
        }, 25 * index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt?:string) => {
        const currentPrompt = prompt || input;
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(currentPrompt);
        setPrevPrompts(prev => [...prev, currentPrompt]);
        const response = await run(currentPrompt);
        setResultData(response);
        setPrevResponse(prev => [...prev, response]);
        let responseArray = response.split(" ");
        setResultData("");
        responseArray.forEach((word, index) => {
          delayPara(index, word);
        });
    
        setLoading(false);
        setInput("");
        prompt="";
      };

    const contextValue = {
        prevPrompts,
        setPrevPrompts, 
        onSent,
        setRecentPrompt, 
        recentPrompt, 
        showResult, 
        loading, 
        resultData,
        input,
        setInput,
        prevResponse,
        setPrevResponse,
        setResultData,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider