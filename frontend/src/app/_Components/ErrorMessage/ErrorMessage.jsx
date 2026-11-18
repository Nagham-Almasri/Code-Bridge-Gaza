import React from 'react'

export default function ErrorMessage({msg}) {
  return (
    <p className="text-red-500 text-[14px] font-normal mt-2">{msg}</p>
  )
}
