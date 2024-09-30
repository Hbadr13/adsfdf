// import React, { useState, useRef, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { lists } from '../../layout/Navbar';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { ProfileImages } from '../../component/ProfileImages';
// import Icons from '../../component/Icons';
// const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// const ListDetailComp = ({ currentList }: { currentList: any }) => {


//     const [listOfNames, setListOfNames] = useState<string[]>([]);
//     const [subListOfNames, setsubListOfNames] = useState<string[]>([]);
//     const [hasMore, setHasMore] = useState(true);
//     const [page, setPage] = useState(1);
//     const re = useRef(0);
//     const lastOne = useRef<HTMLDivElement | null>(null)
//     const alphabetRefs = useRef<(HTMLDivElement | null)[]>([])
//     const [waitData, setWaitData] = useState('wait')
//     const [listInfo, setListInfo] = useState<{ length: number, mostFrequentNames: { name: string; count: number }[] }>({ length: 0, mostFrequentNames: [] });



//     const fetchMoreData = async () => {
//         console.log(listOfNames.length)
//         try {
//             if (!listOfNames.length) {
//                 const response = await fetch(`http://127.0.0.1:3333/${currentList.slug}?page=${page}&limit=1020`);
//                 const data = await response.json();
//                 if (data.list.length === 0) {
//                     setHasMore(false);
//                 } else {
//                     setsubListOfNames(prev => [...prev, ...data.list.slice(0, currentList.slice)]);
//                     setListOfNames(data.list.slice(currentList.slice));
//                     setPage(prev => prev + 1);
//                 }
//                 setWaitData('done')
//                 setListInfo(data.info)
//             }
//             else {
//                 setsubListOfNames(prev => [...prev, ...listOfNames.slice(0, currentList.slice)]);
//                 setListOfNames((prev) => prev.slice(currentList.slice));
//             }
//         } catch (error) {
//             setWaitData('error')
//             console.error(error);
//         }
//     };

//     useEffect(() => {
//         re.current++;
//         if (re.current === 1) return;
//         setsubListOfNames([])
//         setListOfNames([])
//         setHasMore(true)
//         setPage(1)
//         setWaitData('wait')
//         fetchMoreData();
//     }, [currentList]);


//     const scrollToPosition = (index: number) => {
//         if (alphabetRefs.current[index]) {
//             alphabetRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
//         }
//         else if (lastOne.current)
//             lastOne.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
//     }
//     if (waitData == 'error')
//         return <div className="w-full flex flex-col items-center space-y-10 pt-20">
//             <div className=" ">There is a problem</div>
//             <Icons name='NotPossible' />
//         </div>

//     return (
//         <div className="">
//             {
//                 waitData == 'done' ?
//                     <div className=" relative w-full   mt-0 md:mt-6 flex flex-row-reverse justify-center   space-x-0  md:space-x-reverse   md:space-x-6 text-vz-dark-v0 ">
//                         <div className=' absolute right-3 z-10 md:relative  shadow-none md:shadow-sm  w-min md:w-[35%]  bg-transparent md:bg-white   flex items-start space-x-4    md:px-3 pb-3 pt-8  rounded-2xl'>
//                             <div className="flex flex-col space-y-1 mt-16">
//                                 {
//                                     alphabet.map((item, index) =>
//                                         <button key={index} onClick={() => scrollToPosition(index)} className=" text-xs p-0.5 md:px-1 font-semibold bg-vz-blue-v0  text-vz-dark-v0 rounded-sm">
//                                             {item}
//                                         </button>
//                                     )
//                                 }
//                             </div>
//                             <div className=" w-full   hidden md:flex flex-col items-center">
//                                 <div className="p-3 font-bold text-lg truncate">Most frequent names</div>
//                                 {
//                                     !listInfo.mostFrequentNames.length ? <div className="flex flex-col items-center p-4 space-y-8">
//                                         <div className="text-center">This option does not work with a list of more than a million names.</div>
//                                         <Icons name='NotPossible' />
//                                     </div> :
//                                         <div className="w-full space-y-6">

//                                             {
//                                                 listInfo.mostFrequentNames.map((item, index) =>
//                                                     <div key={index} className={` flex flex-col justify-center items-center space-y-4 ${index == 0 ? 'bg-vz-red-v0' : index == 1 ? 'bg-vz-green-v0' : 'bg-vz-blue-v0'}  w-full h-32 truncate rounded-xl `}>
//                                                         <div className="flex items-center space-x-4">
//                                                             <div className="text-xl font-bold"># {index + 1}</div>
//                                                             <div className="">
//                                                                 {item.name}
//                                                             </div>
//                                                         </div>
//                                                         <div className="text-vz-gray-v0">
//                                                             {item.count} times
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             }
//                                         </div>
//                                 }
//                             </div>
//                         </div>
//                         <div className=" relative z-0 bg-white  rounded-2xl  shadow-sm  p-0 md:p-2  w-full  md:w-[65%]">
//                             <div className="flex justify-between items-center  px-4  p-1 md:p-4">
//                                 <div className=" p-1 md:p-3 font-bold text-lg">List of users</div>
//                                 <div className=" flex items-center space-x-2 px-3 py-1 font-bold  bg-vz-gray-v0/30 rounded-full">
//                                     <Icons name='UserIcon' />
//                                     <div className="">{listInfo.length} users</div>
//                                 </div>
//                             </div>
//                             <InfiniteScroll
//                                 className='hideScrollbar overflow-y-scroll '
//                                 height={750}
//                                 dataLength={subListOfNames.length}
//                                 next={fetchMoreData}
//                                 hasMore={hasMore}
//                                 loader={<div className='w-full flex justify-center p-4'>
//                                     <Icons name='LoadingIcon' width={50} height={50} />
//                                 </div>}
//                                 endMessage={<div className='w-full rounded-xl p-4'>

//                                     <div className='flex items-center space-x-2 p-4 bg-vz-green-v0 w-full rounded-xl'>
//                                         <p className=' '>No more users to load</p>
//                                         <Icons name='UserIcon' />
//                                     </div>
//                                 </div>
//                                 }
//                             >
//                                 <div className="divide-y-[1px] divide-vz-gray-v0/30 px-1 md:px-4">
//                                     {subListOfNames.map((item, index) => (
//                                         <div key={index} ref={lastOne} className="truncate">
//                                             {
//                                                 ((index == 0) || (subListOfNames[index][0].toLocaleLowerCase() != subListOfNames[index - 1][0].toLocaleLowerCase())) &&
//                                                 <div ref={(ref) => alphabetRefs.current[(item[0].toLocaleUpperCase().codePointAt(0) || 0) - 65] = ref} className='p-1  md:p-2  w-[90%] md:w-full'>
//                                                     <div className="rounded-l-lg rounded-br-lg  bg-vz-blue-v0  p-1 md:p-1.5  pl-3 md:pl-5 font-bold">
//                                                         {item[0].toLocaleUpperCase()}
//                                                     </div>
//                                                 </div>
//                                             }
//                                             <div key={index} className="flex space-x-2  p-1 md:p-2">
//                                                 <img className=' w-8 h-8 md:w-10 md:h-10 rounded-full' loading="lazy" src={ProfileImages[Math.floor(Math.random() * 10)]} />
//                                                 <div className="">
//                                                     <div className="text-sm  md:text-base font-medium">
//                                                         {item}
//                                                     </div>
//                                                     <div className="text-xs text-vz-gray-v0">{index + 1}</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </InfiniteScroll>
//                         </div>
//                     </div> :
//                     <div className="h-[800px] animate-pulse space-x-6  mt-6 flex overflow-hidden">
//                         <div className=" w-full  md:w-[65%] h-full bg-white rounded-2xl  divide-y-[1px] divide-vz-gray-v0/30 px-4 pt-1  md:pt-28">
//                             {Array.from({ length: 40 }).map((item, index) =>
//                                 <div className='w-full p-2 flex space-x-2' key={index}>
//                                     <div className="w-10 h-10 rounded-full bg-vz-gray-v0/10"></div>
//                                     <div className="space-y-3">
//                                         <div className="w-28 h-2 rounded-full bg-vz-gray-v0/10"></div>
//                                         <div className="w-20 h-2 rounded-full bg-vz-gray-v0/5"></div>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                         <div className=" w-0 hidden md:flex flex-col items-center  md:w-[35%] bg-white rounded-2xl   pt-28  space-y-5">
//                             {Array.from({ length: 3 }).map((item, index) =>
//                                 <div className='w-[80%] max-w-[250px] max- h-36 bg-vz-gray-v0/5 rounded-2xl' key={index}>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//             }

//         </div>
//     );
// };


// const ListDetail = () => {
//     const { slug } = useParams();
//     const currentList = lists.find((it) => it.slug == slug)
//     if (!currentList)
//         return <div className=""></div>
//     return <ListDetailComp currentList={currentList} />
// }

// export default ListDetail;
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { lists } from '../../layout/Navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProfileImages } from '../../component/ProfileImages';
import Icons from '../../component/Icons';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ListDetailComp = ({ currentList }: { currentList: any }) => {

    const [character, setCharacter] = useState('A')
    // const [listOfNames, setListOfNames] = useState<string[]>([]);
    const listOfNames = useRef<string[]>([]);
    // const [subListOfNames, setsubListOfNames] = useState<string[]>([]);
    const [subListOfNamesCopy, setsubListOfNamesCopy] = useState<string[]>([]);
    const subListOfNames = useRef<string[]>([]);
    const [hasMore, setHasMore] = useState(true);
    // const [page, setPage] = useState(1);
    const page = useRef(1);
    const re = useRef(0);
    const lastOne = useRef<HTMLDivElement | null>(null)
    const alphabetRefs = useRef<(HTMLDivElement | null)[]>([])
    // const [waitData, setWaitData] = useState('wait')
    const waitData = useRef('wait')
    const [listInfo, setListInfo] = useState<{ length: number, mostFrequentNames: { name: string; count: number }[] }>({ length: 0, mostFrequentNames: [] });



    const fetchMoreData = async () => {
        console.log(listOfNames.current.length)
        try {
            if (!listOfNames.current.length) {
                const response = await fetch(`http://127.0.0.1:3333/${currentList.slug}?page=${page.current}&limit=1020&character=${character}`);
                const data = await response.json();
                console.log(character, '=========>', data.list)
                if (data.list.length === 0) {
                    setHasMore(false);
                } else {
                    subListOfNames.current = [...subListOfNames.current, ...data.list.slice(0, currentList.slice)];
                    // setsubListOfNamesCopy(subListOfNames.current)
                    listOfNames.current = (data.list.slice(currentList.slice));
                    page.current += 1
                }
                waitData.current = 'done'
                setListInfo(data.info)
            }
            else {
                subListOfNames.current = [...subListOfNames.current, ...listOfNames.current.slice(0, currentList.slice)];
                // setsubListOfNamesCopy(subListOfNames.current)
                listOfNames.current = listOfNames.current.slice(currentList.slice)
            }
        } catch (error) {
            waitData.current = 'error'
            console.error(error);
        }
    };

    useEffect(() => {
        re.current++;
        if (re.current === 1) return;
        // setsubListOfNames([])
        // setListOfNames([])
        // setHasMore(true)
        // setPage(1)
        // setWaitData('wait')
        fetchMoreData();
    }, [character]);

    const handleClickCharacter = ({ character }: { character: string }) => {
        waitData.current = 'wait'
        listOfNames.current = []
        subListOfNames.current = []
        page.current = 1
        setCharacter(character)
        // fetchMoreData();
    }
    const scrollToPosition = (index: number) => {
        if (alphabetRefs.current[index]) {
            console.log('==>', alphabetRefs.current[index])
            alphabetRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        else if (lastOne.current)
            lastOne.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    if (waitData.current == 'error')
        return <div className="w-full flex flex-col items-center space-y-10 pt-20">
            <div className=" ">There is a problem</div>
            <Icons name='NotPossible' />
        </div>

    return (
        <div className="">
            {waitData.current}
            {
                waitData.current == 'done' ?
                    <div className=" relative w-full   mt-0 md:mt-6 flex flex-row-reverse justify-center   space-x-0  md:space-x-reverse   md:space-x-6 text-vz-dark-v0 ">
                        <div className=' absolute right-3 z-10 md:relative  shadow-none md:shadow-sm  w-min md:w-[35%]  bg-transparent md:bg-white   flex items-start space-x-4    md:px-3 pb-3 pt-8  rounded-2xl'>
                            <div className="flex flex-col space-y-1 mt-16">
                                {
                                    alphabet.map((item, index) =>
                                        // <button key={index} onClick={() => { scrollToPosition(index); setCharacter(item) }} className=" text-xs p-0.5 md:px-1 font-semibold bg-vz-blue-v0  text-vz-dark-v0 rounded-sm">
                                        <button key={index} onClick={() => handleClickCharacter({ character: item })} className=" text-xs p-0.5 md:px-1 font-semibold bg-vz-blue-v0  text-vz-dark-v0 rounded-sm">
                                            {item}
                                        </button>
                                    )
                                }
                            </div>
                            <div className=" w-full   hidden md:flex flex-col items-center">
                                <div className="p-3 font-bold text-lg truncate">Most frequent names</div>
                                {
                                    !listInfo.mostFrequentNames.length ? <div className="flex flex-col items-center p-4 space-y-8">
                                        <div className="text-center">This option does not work with a list of more than a million names.</div>
                                        <Icons name='NotPossible' />
                                    </div> :
                                        <div className="w-full space-y-6">

                                            {
                                                listInfo.mostFrequentNames.map((item, index) =>
                                                    <div key={index} className={` flex flex-col justify-center items-center space-y-4 ${index == 0 ? 'bg-vz-red-v0' : index == 1 ? 'bg-vz-green-v0' : 'bg-vz-blue-v0'}  w-full h-32 truncate rounded-xl `}>
                                                        <div className="flex items-center space-x-4">
                                                            <div className="text-xl font-bold"># {index + 1}</div>
                                                            <div className="">
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                        <div className="text-vz-gray-v0">
                                                            {item.count} times
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                        <div className=" relative z-0 bg-white  rounded-2xl  shadow-sm  p-0 md:p-2  w-full  md:w-[65%]">
                            <div className="flex justify-between items-center  px-4  p-1 md:p-4">
                                <div className=" p-1 md:p-3 font-bold text-lg">List of users</div>
                                <div className=" flex items-center space-x-2 px-3 py-1 font-bold  bg-vz-gray-v0/30 rounded-full">
                                    <Icons name='UserIcon' />
                                    <div className="">{listInfo.length} users</div>
                                </div>
                            </div>
                            <InfiniteScroll
                                className='hideScrollbar overflow-y-scroll '
                                height={750}
                                dataLength={subListOfNames.current.length}
                                next={fetchMoreData}
                                hasMore={hasMore}
                                loader={<div className='w-full flex justify-center p-4'>
                                    <Icons name='LoadingIcon' width={50} height={50} />
                                </div>}
                                endMessage={<div className='w-full rounded-xl p-4'>

                                    <div className='flex items-center space-x-2 p-4 bg-vz-green-v0 w-full rounded-xl'>
                                        <p className=' '>No more users to load</p>
                                        <Icons name='UserIcon' />
                                    </div>
                                </div>
                                }
                            >
                                <div className="divide-y-[1px] divide-vz-gray-v0/30 px-1 md:px-4">
                                    {subListOfNames.current.map((item, index) => (
                                        <div key={index} ref={lastOne} className="truncate">
                                            {
                                                ((index == 0) || (subListOfNames.current[index][0].toLocaleLowerCase() != subListOfNames.current[index - 1][0].toLocaleLowerCase())) &&
                                                <div ref={(ref) => alphabetRefs.current[(item[0].toLocaleUpperCase().codePointAt(0) || 0) - 65] = ref} className='p-1  md:p-2  w-[90%] md:w-full'>
                                                    <div className="rounded-l-lg rounded-br-lg  bg-vz-blue-v0  p-1 md:p-1.5  pl-3 md:pl-5 font-bold">
                                                        {item[0].toLocaleUpperCase()}
                                                    </div>
                                                </div>
                                            }
                                            <div key={index} className="flex space-x-2  p-1 md:p-2">
                                                {/* <img className=' w-8 h-8 md:w-10 md:h-10 rounded-full' loading="lazy" src={ProfileImages[Math.floor(Math.random() * 10)]} /> */}
                                                <div className="">
                                                    <div className="text-sm  md:text-base font-medium">
                                                        {item}
                                                    </div>
                                                    <div className="text-xs text-vz-gray-v0">{index + 1}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div> :
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
            }

        </div>
    );
};


const ListDetail = () => {
    const { slug } = useParams();
    const currentList = lists.find((it) => it.slug == slug)
    if (!currentList)
        return <div className=""></div>
    return <ListDetailComp currentList={currentList} />
}

export default ListDetail;
