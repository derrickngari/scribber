import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between gap-4 items-center ">
          <a href='/'>
            <h1 className="text-blue-400 text-3xl font-bold">Scribber</h1>
          </a>
          <button className="flex items-center gap-2 cursor-pointer special-button py-2 rounded-lg text-blue-400">
            <p className="text-small font-[500] ">New</p>
            <i className="fa fa-plus"></i>
          </button>
        </header>
  )
}

export default Header