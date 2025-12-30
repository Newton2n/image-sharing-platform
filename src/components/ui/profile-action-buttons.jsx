"use client"
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link'
import { useSelector } from 'react-redux'
const ProfileActionButtons = () => {

const accountDetails = useSelector((state) => state.auth.userData);
  return (
      <div className="flex justify-center space-x-3 mb-8">
            {accountDetails && (
              <Link href={"/editprofile"}>
                <button className="cursor-pointer px-6 py-3 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-200 transition duration-150 shadow-md">
                  Edit Profile
                </button>
              </Link>
            )}
            {!accountDetails && (
              <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition duration-150 shadow-lg">
                Follow
              </button>
            )}

            <button className="p-3 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition duration-150 shadow-md ">
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div> 
  )
}

export default ProfileActionButtons