// import React from 'react'
// import Link from 'next/link'
// import { Position, Handle } from '@xyflow/react'
// function TurboNode({ data }: any) {
//     return (
//         <div className='rounded-lg border border-gray-300 bg-yellow-100'>
//             <div className='font-bold text-lg text-gray-800'>{data.title}</div>
//             <p className='text-sm text-gray-600 mt-1 line-clamp-2'>{data.description}</p>
//             <Link href={data?.link} target='_blank' className='text-blue-600 underline text-sm mt-2 inline-block'>Learn More</Link>
//             <Handle type='target' position={Position.Top}></Handle>
//             <Handle type='source' position={Position.Bottom}></Handle>
//         </div>
//     )
// }

// export default TurboNode

import React, { useState } from 'react';
import Link from 'next/link';
import { Position, Handle } from '@xyflow/react';

function TurboNode({ data }: any) {
    // If you want local toggle state (you can also manage this globally if needed)
    const [checked, setChecked] = useState(data.completed || false);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        // If you want to notify the parent or store this, you can call data.onToggle?.()
    };

    return (
        <div className="bg-purple-50 border border-gray-800 rounded-2xl shadow-md p-4 w-72 text-left">
            <div className="flex items-start justify-between">
                {/* Title */}
                <div className="text-lg font-semibold text-purple-800">{data.title}</div>
                {/* Completion Checkbox */}
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                    className="ml-2 mt-1 accent-purple-600"
                    title="Mark as complete"
                />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 mt-1 line-clamp-3">
                {data.description}
            </p>

            {/* Tags */}
            {data?.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {data.tags.map((tag: string, index: number) => (
                        <span
                            key={index}
                            className="text-xs px-2 py-1 bg-white border border-purple-300 text-purple-700 rounded-full font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Learn More Link */}
            {data?.link && (
                <Link
                    href={data.link}
                    target="_blank"
                    className="inline-block mt-3 text-sm text-blue-600 underline"
                >
                    Learn More
                </Link>
            )}

            {/* XYFlow Handles */}
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export default TurboNode;