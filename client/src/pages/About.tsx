// import React from "react";
// import {
//     List,
//     AutoSizer,
//     CellMeasurer,
//     CellMeasurerCache,
//     ListRowProps,
// } from "react-virtualized";
// import TenMillionNames from "../names/10-million.json";

// import thsaned100 from '../names/100-thousand.json'
// const tenMillionNames: string[] = TenMillionNames as string[];


// // Define a type for the rowRenderer parameters
// interface RowRendererProps extends ListRowProps {
//     index: number;
//     key: string;
//     style: React.CSSProperties;
//     parent: any; // You might want to use a more specific type for parent if known
// }

// export default function App() {
//     const cache = React.useRef(
//         new CellMeasurerCache({
//             fixedWidth: true,
//             defaultHeight: 100,
//         })
//     );

//     const [time, setTime] = React.useState(new Date());

//     React.useEffect(() => {
//         const interval = setInterval(() => {
//             setTime(new Date());
//         }, 1000);

//         return () => clearInterval(interval);
//     }, []);

//     // Define the rowRenderer function with custom types
//     const rowRenderer = ({
//         key,
//         index,
//         style,
//         parent
//     }: RowRendererProps) => {
//         const person = thsaned100[index];

//         return (
//             <CellMeasurer
//                 key={key}
//                 cache={cache.current}
//                 parent={parent}
//                 columnIndex={0}
//                 rowIndex={index}
//             >
//                 <div style={style}>
//                     <h2>{person}:{index}</h2>
//                 </div>
//             </CellMeasurer>
//         );
//     };

//     return (
//         <div>
//             <h1>{time.toISOString()}{tenMillionNames.length}</h1>

//             <div style={{ width: "100%", height: "100vh" }}>
//                 <AutoSizer>
//                     {({ width, height }: { width: number; height: number }) => (
//                         <List
//                             width={width}
//                             height={height}
//                             rowHeight={cache.current.rowHeight}
//                             deferredMeasurementCache={cache.current}
//                             rowCount={thsaned100.length}
//                             rowRenderer={rowRenderer}
//                         />
//                     )}
//                 </AutoSizer>
//             </div>
//         </div>
//     );
// }


import React from "react";

import { List, AutoSizer } from "react-virtualized";


const Render = ({ listOfNames }: { listOfNames: Array<string> }) => {
    return (
        <div>
            <h1>List of Names</h1>
            <div style={{ width: "100%", height: "100vh" }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <List

                            width={width}
                            height={height}
                            rowCount={listOfNames.length}
                            rowHeight={30}
                            rowRenderer={({ key, index, style }) => (
                                <div key={key} style={style}>
                                    {listOfNames[index]} : {index}
                                </div>
                            )}
                        />
                    )}
                </AutoSizer>
            </div>
        </div>
    );
}

export default function App() {
    const tenMillionNames: string[] = [] as string[];

    return (
        <div className="">
            <Render listOfNames={tenMillionNames.slice(0, 1000000)} />
            <div className="h-40 w-full bg-red-300"></div>
            <Render listOfNames={tenMillionNames.slice(1000000, 2000000)} />
        </div>
    )

}
