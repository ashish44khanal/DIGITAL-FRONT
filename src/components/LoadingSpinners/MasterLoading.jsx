import { AiOutlineLoading3Quarters } from "react-icons/ai"

function MasterLoading() {
    return (
        <div className="my-4 flex items-center space-x-4 text-xl bg-gray-200 p-10 animate-pulse rounded">
          <AiOutlineLoading3Quarters className="text-green-800 animate-spin" />
          <p> Processing.....</p>
        </div>
    )
}

export default MasterLoading
