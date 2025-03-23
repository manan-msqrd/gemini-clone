import { useContext } from "react"
import { assets } from "../assets/assets"
import { Context } from "../context/Context"
import ReactMarkdown from "react-markdown";

const Main = () => {

    const context = useContext(Context);
    const { onSent, recentPrompt, showResult, resultData, loading, setInput, newChat, input } = context || {}

    return (
        <div className="flex-1 min-h-[100vh] pb-[15vh] relative">
            <div className="flex items-center justify-between p-[20px] text-[22px] text-[#585858]">
                <p onClick={() => newChat && newChat()} className="cursor-pointer">Gemini</p>
                <img className="w-[40px] rounded-[50%]" src={assets.user_icon} alt="" />
            </div>
            <div className="max-w-[900px] m-auto">
                {!showResult ?
                    <>
                        <div className="mx-[50px] my-0 text-[#c4c7c5] font-medium p-[20px] text-[36px] sm:text-[56px] ">
                            <p>
                                <span className="bg-clip-text text-transparent bg-[linear-gradient(16deg,#4b90ff,#ff5546)]">
                                    Hello, Dev
                                </span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="hidden sm:grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[15px] p-[20px]">
                            <div onClick={() => {onSent && onSent("Suggest beautiful places to see on an upcoming trip to Singapore");
                            }} className="h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] cursor-pointer relative hover:bg-[#dfe4ea]">
                                <p className="text-[#585858] text-[17px]">Suggest beautiful places to see on an upcoming trip to Singapore</p>
                                <img className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" src={assets.compass_icon} alt="" />
                            </div>
                            <div onClick={() => {onSent && onSent("Briefly summarize this concept : Software Development Life Cycle");}} className="h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] cursor-pointer relative hover:bg-[#dfe4ea]">
                                <p className="text-[#585858] text-[17px]">Briefly summarize this concept : Software Development Life Cycle</p>
                                <img className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" src={assets.bulb_icon} alt="" />
                            </div>
                            <div onClick={() => {onSent && onSent("Brainstorm team building activities");}} className="h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] cursor-pointer relative hover:bg-[#dfe4ea]">
                                <p className="text-[#585858] text-[17px]">Brainstorm team building activities</p>
                                <img className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" src={assets.message_icon} alt="" />
                            </div>
                            <div onClick={() => {onSent && onSent("Suggest beautiful places to see on an upcoming road trip");}} className="h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] cursor-pointer relative hover:bg-[#dfe4ea]">
                                <p className="text-[#585858] text-[17px]">Give me productivity tips based on the most recent researches</p>
                                <img className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div className="max-h-[70vh] overflow-y-auto p-[20px] scrollbar-hidden">
                        <div className="mx-0 my-[40px] flex items-center gap-[20px]">
                            <img className="w-[40px] rounded-[50%]" src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="flex items-start gap-[20px]">
                            <img className="w-[40px]" src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className="flex w-full flex-col gap-[10px]">
                                    <hr className="rounded border-0 bg-[linear-gradient(to_right,_#9ed7ff,_#ffffff,_#9ed7ff)] bg-[length:800px_50px] h-[20px] animate-loader" />
                                    <hr className="rounded border-0 bg-[linear-gradient(to_right,_#9ed7ff,_#ffffff,_#9ed7ff)] bg-[length:800px_50px] h-[20px] animate-loader" />
                                    <hr className="rounded border-0 bg-[linear-gradient(to_right,_#9ed7ff,_#ffffff,_#9ed7ff)] bg-[length:800px_50px] h-[20px] animate-loader" />
                                </div>
                                : <p className="text-[17px]/1.8 font-light">{
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-3" {...props} />,
                                            p: ({ node, ...props }) => <p className="my-2" {...props} />,
                                            li: ({ node, ...props }) => <li className="ml-5 list-disc" {...props} />,
                                            code: ({ node, className, children, ...props }) => (
                                                <code className="bg-gray-200 rounded px-1 font-mono text-sm" {...props}>
                                                    {children}
                                                </code>
                                            ),
                                            pre: ({ node, className, children, ...props }) => (
                                                <pre className="bg-gray-100 p-3 rounded overflow-x-auto" {...props}>
                                                    {children}
                                                </pre>
                                            ),
                                        }}
                                    >
                                        {resultData || ""}
                                    </ReactMarkdown>
                                }</p>
                            }
                        </div>
                    </div>}


                <div className="absolute w-full bottom-0 max-w-[900px] px-[10px] py-[20px] m-auto">
                    <div className="flex items-center justify-between gap-[20px] bg-[#f0f4f9] px-[20px] py-[10px] rounded-[50px]">
                        <input onChange={(e) => setInput && setInput(e.target.value)} value={input} className="flex-1 bg-transparent border-none outline-none p-[8px] text-[18px] font-light" type="text" placeholder="Enter a prompt here..." />
                        <div className="flex items-center gap-[15px]">
                            {input ? 
                            <img onClick={async () => {
                                if (onSent) {
                                  onSent();
                                  setInput && setInput(""); // Clear the input box after onSent completes
                                }
                              }} className="cursor-pointer w-[24px]" src={assets.send_icon} alt="" />
                            : null}
                        </div>
                    </div>
                    <p className="text-[13px] mx-auto my-[15px] text-center font-extralight">
                        Gemini can make mistakes, so double-check it
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main