import { createContext, useState } from "react";
import run from "../config/gemini";

export interface ContextProps {
    onSent: () => Promise<void>;
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
        }, 30 * index)
    }

    const onSent = async () => {
        // Reset the current state
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts(prev => [...prev, input]);
        const response = await run(input);
        setResultData(response);
        setPrevResponse(prev => [...prev, response]);
        let responseArray = response.split(" ");
        setResultData("");
        responseArray.forEach((word, index) => {
          delayPara(index, word);
        });
    
        setLoading(false);
        setInput("");
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
        setResultData
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider