import { createContext, useState } from "react";
import run from "../config/gemini";

interface ContextProps {
    onSent: () => Promise<void>;
    recentPrompt: string;
    resultData: string;
    showResult: boolean;
    loading: boolean;
    setInput: (input: string) => void;
  }

export const Context = createContext<ContextProps | undefined>(undefined);

const ContextProvider = (props:any) => {

    const [input, setInput] = useState<string>("");
    const [recentPrompt, setRecentPrompt] = useState<string>("");
    const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [resultData, setResultData] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const onSent = async () => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await run(input)
        setResultData(response) 
        setLoading(false)
        setInput("")
    }

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
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider