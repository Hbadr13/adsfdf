import React from 'react'

const CharacterNotFound = ({ character }: { character: string }) => {
    return (
        <div className="characterNotFoundAnimate  text-sm md:text-base  w-[80%]  max-w-[400px]   bg-red-200 rounded-xl bottom-10  fixed z-20 p-2 py-4 opacity-90 shadow-xl">
            <div className="text-red-600 font-bold">
                No data available for the selected character "{character}".
            </div>
        </div>
    )
}

export default CharacterNotFound