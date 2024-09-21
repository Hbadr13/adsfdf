import Icons from '../component/Icons'
import { Link, useRoutes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Profile from '../assets/image/6.jpg';

export const lists = [
    {
        id: 0,
        name: 'Small List',
        slug: '1-hundred-names',
        shortName: 'S',
        slice: 33
    },
    {
        id: 1,
        name: 'Medium List',
        slug: '1-thousand-names',
        shortName: 'M',
        slice: 120,
    },
    {
        id: 2,
        name: 'Large List',
        slug: '100-thousand-names',
        shortName: 'L',
        slice: 200,

    },
    {
        id: 3,
        name: 'Extra large List',
        slug: '1-million-names',
        shortName: 'XL',
        slice: 300,
    },
    {
        id: 4,
        name: 'Extra extra large List',
        slug: '10-million-names',
        shortName: 'XXL',
        slice: 400,
    }
];

const Navbar = () => {
    const location = useLocation();
    const pathname = location.pathname.slice(6);

    return (
        <div className="w-full md:mt-6 flex p-1 space-x-1 md:space-x-6">

            <Link to={'#'} className="bg-white rounded-4xl flex items-center  space-x-2 px-2 py-1.5 md:space-x-5  md:px-4 md:py-3 rounded-full  border border-1 md:border-0 border-vz-gray-v0" >
                <Icons name={'MenuIcon'} />
                <div className="font-black  text-sm md:text-lg">
                    LISTS
                </div>
            </Link>
            <ul className='flex justify-between w-full bg-white items-center rounded-full px-4 py-3 space-x-2'>
                {lists.map((item, index) =>
                    <Link reloadDocument to={'list/' + item.slug} key={index}
                        className={` flex items-center space-x-1 ${pathname == item.slug ? 'text-vz-orange-v0' : 'text-gray-600'}`}>
                        <div className={`  text-center  md:pt-[2px]   font-extrabold w-10 md:w-7  h-6 md:h-7  rounded-full  ${pathname == item.slug ? ' block md:block bg-orange-500 text-white' : 'block md:hidden text-orange-500 md:text-white'}`}>{item.shortName}</div>
                        <div className="text-sm lg:text-base hidden md:block font-medium">
                            {item.name}
                        </div>
                    </Link>
                )}
            </ul>
            <div className=" hidden  bg-white rounded-4xl md:flex items-center space-x-5 px-4 rounded-full">
                <button className='hover:bg-vz-blue-v0 duration-300 p-1.5 rounded-full'>
                    <Icons name={'NotificationIcon'} />
                </button>
                <div className='w-10 h-10'>
                    <img className='  rounded-full' loading="lazy" src={Profile} />
                </div>

            </div>
        </div>
    )
}

export default Navbar