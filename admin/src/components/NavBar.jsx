import {assets} from "../assets/assets.js"

const NavBar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between px-[4%] py-2">
        <img className="w-[max(10%,120px)]" src={assets.adminLogo} alt="" />
        <button onClick={() => setToken("")} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-gray-700 active:bg-gray-800 scale-90">Logout</button>
    </div>
  )
}
export default NavBar