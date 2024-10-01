import React from 'react'

const MainShimmer = () => {
    return (
        <div className="h-[800px] animate-pulse space-x-6  mt-6 flex overflow-hidden">
            <div className=" w-full  md:w-[65%] h-full bg-white rounded-2xl  divide-y-[1px] divide-vz-gray-v0/30 px-4 pt-1  md:pt-28">
                {Array.from({ length: 40 }).map((item, index) =>
                    <div className='w-full p-2 flex space-x-2' key={index}>
                        <div className="w-10 h-10 rounded-full bg-vz-gray-v0/10"></div>
                        <div className="space-y-3">
                            <div className="w-28 h-2 rounded-full bg-vz-gray-v0/10"></div>
                            <div className="w-20 h-2 rounded-full bg-vz-gray-v0/5"></div>
                        </div>
                    </div>
                )}
            </div>
            <div className=" w-0 hidden md:flex flex-col items-center  md:w-[35%] bg-white rounded-2xl   pt-28  space-y-5">
                {Array.from({ length: 3 }).map((item, index) =>
                    <div className='w-[80%] max-w-[250px] max- h-36 bg-vz-gray-v0/5 rounded-2xl' key={index}>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MainShimmer