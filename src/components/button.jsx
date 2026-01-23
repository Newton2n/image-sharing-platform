"use client"
import React from 'react'

function Button(
    {
    children,
    type ='button',
    bgColor ='',
    textColor ='',
    className ='',
    padding ="p-2",
    ...props
}
){
  return (
    <button className={ ` rounded-lg transition-all duration-200 ${padding} ${bgColor} ${textColor} ${className}`}{...props}>
    {children}
    </button>
  )
}

export default Button