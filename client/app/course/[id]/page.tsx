'use client';
import React from 'react';
import CourseDetailsPage from '../../components/Course/CourseDetailsPage';

// Define the type for params
type Props = {
    params: Promise<{ id: string }>;
};

const Page = ({ params }: Props) => {
    const resolvedParams = React.use(params); // Type is now inferred as { id: string }
    return (
        <div>
            <CourseDetailsPage id={resolvedParams.id} />
        </div>
    );
};

export default Page;
















// 'use client'
// import React from "react"
// import CourseDetailsPage from "../../components/Course/CourseDetailsPage"

// const Page = ({params}: any) => {
//     return (
//         <div>
//             <CourseDetailsPage id={params.id} />
//         </div>
//     )
// }

// export default Page;