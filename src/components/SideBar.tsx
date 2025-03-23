import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { Context } from "../context/Context";

const SideBar = () => {

    const [extended, setExtended] = useState(false);
    const {prevPrompts = [], setRecentPrompt = () => {}, prevResponse, setResultData, newChat, setShowResult} = useContext(Context) || {}

    const onPromptClick = async (prompt: string, index: number) => {
        setShowResult && setShowResult(true);
        setRecentPrompt(prompt);
        if (prevResponse) {
            setResultData && setResultData(prevResponse[index]);
        }
        if(window.innerWidth < 768) {
            setExtended(false);
          }
    }

  return (
    <div className='min-h-[100vh] inline-flex flex-col justify-between bg-[#f0f4f9] py-[25px] px-[15px]'>
        <div>
            <img onClick={() => setExtended(prev => !prev)} className=" w-[20px] block ml-[10px] cursor-pointer" src={assets.menu_icon} alt="" />
            <div onClick={() => newChat && newChat()} className="mt-[50px] inline-flex items-center gap-[10px] px-[15px] py-[10px] bg-[#e6eaf1] rounded-4xl text-gray-600 cursor-pointer">
                <img className="w-[20px]" src={assets.plus_icon} alt="add-icon" />
                {extended ? <p className="text-sm sm:text-base">New Chat</p> : null}
            </div>
            {extended ? 
                <div className="flex flex-col fadein">
                <p className="mt-[30px] mb-[20px]">Recent</p>
                <div className="flex flex-col-reverse">
                {prevPrompts.map((prompt:string, index: number) => (
                    <div onClick={() => onPromptClick(prompt, index)} className="flex items-center gap-[10px] p-[10px] rounded-lg text-[#282828] cursor-pointer pr-[20px] hover:bg-[#e2e6eb] text-sm sm:text-base">
                        <img className="w-[20px]" src={assets.message_icon} alt="menu-icon" />
                        <p>{prompt.slice(0,18)} ...</p>
                    </div>
                ))}
                </div>
            </div>
            : null}

        </div>
        <div className="flex flex-col">
            <div className="text-sm sm:text-base flex items-center gap-[10px] p-[10px] rounded-lg text-[#282828] cursor-pointer hover:bg-[#e2e6eb] pr-[10px]">
                <img className="w-[20px]" src={assets.question_icon} alt="Help" />
                {extended ? <p>Help</p> : null}
            </div>
            <div className="text-sm sm:text-base flex items-center gap-[10px] p-[10px] rounded-lg text-[#282828] cursor-pointer hover:bg-[#e2e6eb] pr-[10px]">
                <img className="w-[20px]" src={assets.history_icon} alt="Activity" />
                {extended ? <p>Activity</p> : null}
            </div>
            <div className="text-sm sm:text-base flex items-center gap-[10px] p-[10px] rounded-lg text-[#282828]cursor-pointer hover:bg-[#e2e6eb] pr-[10px]">
                <img className="w-[20px]" src={assets.setting_icon} alt="Settings" />
                {extended ? <p>Settings</p> : null}
            </div>
        </div>
    </div>
  )
}

export default SideBar