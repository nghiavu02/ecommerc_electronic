import React from "react";

const SelectOption = ({icons})=>{
    return (
        <div className="w-10 h-10 rounded-full border bg-white shadow-md flex justify-center items-center hover:bg-gray-800 hover:text-white cursor-pointer">{icons}</div>
    )
}
export default SelectOption