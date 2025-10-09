import { useAuthStore } from "../store/useAuthStore"

function ChatPage(){
    const {logout} = useAuthStore()
    
    return(
        <div className="max-w-fit w-full p-4 text-center  z-10">

        <div className="  text-shadow-pink-600 text-red-400 text-5xl  text-shadow-lg m-4 font-semibold">
           < div className=" text-2xl animate-bounce pb-4"> Chat Page</div> coming sooooon!!!!!!!!!
            TYSMMMMMMMMM <span className="text-3xl ">for logging in</span> <div className=" pt-8 text-7xl  animate-ping-smooth transition-all duration-200 ">💖💖</div>
        </div>
        <div>
            <button onClick={logout}
            className="auth-btn ">Logout</button>
        </div>
        </div>
    )
}

export default ChatPage