"use client"
import React from 'react'

function Button(
    {
    children,
    type ='button',
    bgColor ='',
    textColor ='',
    className ='',
    ...props
}
){
  return (
    <button className={ `px-2 py-2 rounded-lg transition-all duration-200${bgColor} ${textColor} ${className}`}{...props}>
    {children}
    </button>
  )
}

export default Button