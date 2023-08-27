import React from 'react'
import deleteImage from "../../assets/delete.svg";
const Delete = () => {
  return (
    <div className="flex gap-1" >
    <div className="shrink-0">
        <img
            className="w-5 block"
            src={deleteImage}
            alt="Delete"
        />
    </div>
    <div className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
        Delete
    </div>
</div>
  )
}

export default Delete