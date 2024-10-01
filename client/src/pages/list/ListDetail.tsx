import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { lists } from '../../layout/Navbar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProfileImages } from '../../component/ProfileImages';
import Icons from '../../component/Icons';
import MainShimmer from '../../component/mainShimmer';
import CharacterNotFound from '../../component/CharacterNotFound';
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const ListDetailComp = ({ currentList }: { currentList: any }) => {

    const [character, setCharacter] = useState('A')
    const listOfNames = useRef<string[]>([]);
    const [subListOfNamesCopy, setsubListOfNamesCopy] = useState<string[]>([]);
    const subListOfNames = useRef<string[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const page = useRef(1);
    const re = useRef(0);
    const lastOne = useRef<HTMLDivElement | null>(null)
    const alphabetRefs = useRef<(HTMLDivElement | null)[]>([])
    const [characterNotFound, setCharacterNotFound] = useState('')
    const [waitData, setWaitData] = useState('wait')
    const [listInfo, setListInfo] = useState<{ length: number, mostFrequentNames: { name: string; count: number }[], characterCounts: { [key: string]: number } }>({ length: 0, mostFrequentNames: [], characterCounts: {} });


    const fetchMoreData = async () => {
        try {
            setHasMore(true)
            if (!listOfNames.current.length) {
                const response = await fetch(`http://127.0.0.1:3333/${currentList.slug}?page=${page.current}&limit=1020&character=${character}`);
                const data = await response.json();
                if (data.list.length === 0) {
                    setHasMore(false);
                } else {
                    subListOfNames.current = [...subListOfNames.current, ...data.list.slice(0, currentList.slice)];
                    setsubListOfNamesCopy(subListOfNames.current)
                    listOfNames.current = data.list.slice(currentList.slice);
                    page.current += 1
                    if (!listOfNames.current.length)
                        setHasMore(false);
                }
                setWaitData('done')
                setListInfo(data.info)
            }
            else {
                subListOfNames.current = [...subListOfNames.current, ...listOfNames.current.slice(0, currentList.slice)];
                setsubListOfNamesCopy(subListOfNames.current)
                listOfNames.current = listOfNames.current.slice(currentList.slice)
            }
        } catch (error) {
            setWaitData('error')
        }
    };

    useEffect(() => {
        re.current++;
        if (re.current === 1) return;
        fetchMoreData();
    }, [character]);

    const handleClickCharacter = ({ character, index }: { character: string, index: number }) => {
        setCharacterNotFound('')
        if (!listInfo.characterCounts[character]) {
            setTimeout(() => {
                setCharacterNotFound('')
            }, 4000);
            setCharacterNotFound(character)
        }
        else if (alphabetRefs.current[index]) {
            alphabetRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        else {
            listOfNames.current = []
            subListOfNames.current = []
            setsubListOfNamesCopy([])
            page.current = 1
            setCharacter(character)
        }
    }
    // const scrollToPosition = (index: number) => {
    //     if (alphabetRefs.current[index]) {
    //         alphabetRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    //     }
    //     else if (lastOne.current)
    //         lastOne.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // }
    if (waitData == 'error')
        return <div className="w-full flex flex-col items-center space-y-10 pt-20">
            <div className=" ">There is a problem</div>
            <Icons name='NotPossible' />
        </div>

    return (
        <div className="">
            {characterNotFound && <CharacterNotFound character={characterNotFound} />
            }
            {
                waitData == 'done' ?
                    <div className=" relative w-full   mt-0 md:mt-6 flex flex-row-reverse justify-center   space-x-0  md:space-x-reverse   md:space-x-6 text-vz-dark-v0 ">
                        <div className=' absolute right-3 z-10 md:relative  shadow-none md:shadow-sm  w-min md:w-[35%]  bg-transparent md:bg-white   flex items-start space-x-4    md:px-3 pb-3 pt-8  rounded-2xl'>
                            <div className="flex flex-col space-y-1 mt-16">
                                {
                                    alphabet.map((item, index) =>
                                        <button key={index} onClick={() => handleClickCharacter({ character: item, index })} className=" text-xs p-0.5 md:px-1 font-semibold bg-vz-blue-v0  text-vz-dark-v0 rounded-sm">
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
                        {
                            subListOfNamesCopy.length || !listInfo.length ? <div className=" relative z-0  bg-white rounded-2xl  shadow-sm  p-0 md:p-2  w-full  md:w-[65%]">
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
                                    dataLength={subListOfNamesCopy.length}
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
                                        {subListOfNamesCopy.map((item, index) => (
                                            <div key={index} ref={lastOne} className="truncate">
                                                {
                                                    ((index == 0) || (subListOfNamesCopy[index][0].toLocaleLowerCase() != subListOfNamesCopy[index - 1][0].toLocaleLowerCase())) &&
                                                    <div ref={(ref) => alphabetRefs.current[(item[0].toLocaleUpperCase().codePointAt(0) || 0) - 65] = ref} className='p-1  md:p-2  w-[90%] md:w-full'>
                                                        <div className="rounded-l-lg flex items-center space-x-5 rounded-br-lg  bg-vz-blue-v0  p-1 md:p-1.5  pl-3 md:pl-5 ">
                                                            <div className="font-bold">
                                                                {item[0].toLocaleUpperCase()}
                                                            </div>
                                                            <div className="text-sm  flex items-center space-x-2 ">
                                                                <div className="text-blue-700  font-bold">
                                                                    {listInfo.characterCounts[item[0]]}
                                                                </div>
                                                                <div className="font-medium">
                                                                    names start with {item[0].toLocaleUpperCase()}
                                                                </div>
                                                            </div>
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
                            </div> :
                                <div className="relative z-0  bg-white rounded-2xl  shadow-sm  p-0 md:p-2  w-full  md:w-[65%]">
                                    <div className='w-full flex justify-center p-4'>
                                        <Icons name='LoadingIcon' width={50} height={50} />
                                    </div>
                                </div>
                        }
                    </div>
                    :
                    <MainShimmer />
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
