import React from 'react'

export default function ErrorMessage({msg}) {
  return (
    <p className="text-red-500 text-sm font-bold">{msg}</p>
  )
}
