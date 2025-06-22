import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get('recordId');

    if (!recordId) {
        return NextResponse.json({ error: 'Missing recordId' }, { status: 400 });
    }

    // Simulated roadmap data
    const roadmapData = {
        roadmapTitle: "Full Stack Developer Roadmap",
        description:
            "This roadmap outlines the path to becoming a full stack developer. It covers frontend, backend, and database technologies, starting with fundamentals and progressing to advanced concepts and specializations. Follow this roadmap to acquire the necessary skills and knowledge to build complete web applications.",
        duration: "6-18 months",
        initialNodes: [
            {
                id: "1",
                position: { x: 0, y: 0 },
                data: {
                    title: "Fundamentals",
                    description:
                        "Essential building blocks: basic programming concepts, data structures, algorithms, and version control.",
                    link: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
                },
                type: "turbo",
            },
            {
                id: "2",
                position: { x: 0, y: 200 },
                data: {
                    title: "HTML & CSS",
                    description:
                        "Learn to structure web content and style its appearance. Master semantic HTML and CSS layouts.",
                    link: "https://www.freecodecamp.org/learn/responsive-web-design/",
                },
                type: "turbo",
            },
            {
                id: "3",
                position: { x: 0, y: 400 },
                data: {
                    title: "JavaScript",
                    description:
                        "Add interactivity and dynamic behavior to web pages. Understand DOM manipulation and asynchronous programming.",
                    link: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
                },
                type: "turbo",
            },
            {
                id: "4",
                position: { x: -300, y: 600 },
                data: {
                    title: "React",
                    description:
                        "A popular JavaScript library for building user interfaces. Learn component-based architecture and state management.",
                    link: "https://react.dev/learn",
                },
                type: "turbo",
            },
            {
                id: "5",
                position: { x: 300, y: 600 },
                data: {
                    title: "Angular",
                    description:
                        "A comprehensive framework by Google for building complex web applications. Focuses on TypeScript and modularity.",
                    link: "https://angular.io/tutorial",
                },
                type: "turbo",
            },
            {
                id: "6",
                position: { x: 600, y: 600 },
                data: {
                    title: "Vue.js",
                    description:
                        "A progressive JavaScript framework for building user interfaces. Known for its simplicity and ease of integration.",
                    link: "https://vuejs.org/guide/introduction.html",
                },
                type: "turbo",
            },
            {
                id: "7",
                position: { x: 0, y: 800 },
                data: {
                    title: "State Management (Redux/Context API)",
                    description:
                        "Manage application state effectively using patterns like Redux or React's Context API.",
                    link: "https://redux.js.org/",
                },
                type: "turbo",
            },
            {
                id: "8",
                position: { x: 0, y: 1000 },
                data: {
                    title: "Node.js & Express",
                    description:
                        "Build server-side applications with JavaScript. Express simplifies routing and middleware management.",
                    link: "https://nodejs.org/en/docs/",
                },
                type: "turbo",
            },
            {
                id: "9",
                position: { x: -300, y: 1200 },
                data: {
                    title: "Databases (SQL/NoSQL)",
                    description:
                        "Understand relational (SQL) databases like PostgreSQL or MySQL and NoSQL databases like MongoDB.",
                    link: "https://www.mongodb.com/learn",
                },
                type: "turbo",
            },
            {
                id: "10",
                position: { x: 300, y: 1200 },
                data: {
                    title: "API Development (REST/GraphQL)",
                    description:
                        "Design and implement APIs using RESTful principles or GraphQL for efficient data fetching.",
                    link: "https://graphql.org/",
                },
                type: "turbo",
            },
            {
                id: "11",
                position: { x: -300, y: 1400 },
                data: {
                    title: "Testing (Unit/Integration/E2E)",
                    description:
                        "Write tests to ensure code quality and prevent regressions. Cover different levels of testing.",
                    link: "https://jestjs.io/",
                },
                type: "turbo",
            },
            {
                id: "12",
                position: { x: 300, y: 1400 },
                data: {
                    title: "Deployment (AWS/Azure/GCP)",
                    description:
                        "Deploy your application to a cloud platform like AWS, Azure, or Google Cloud Platform.",
                    link: "https://aws.amazon.com/",
                },
                type:"turbo",
            },
            {
                id: "13",
                position: { x: 0, y: 1600 },
                data: {
                    title: "Continuous Integration/Continuous Deployment (CI/CD)",
                    description:
                        "Automate the build, test, and deployment process for faster and more reliable releases.",
                    link: "https://www.atlassian.com/continuous-delivery/continuous-integration",
                },
                type: "turbo",
            },
        ],
        initialEdges: [
            { id: "e1-2", source: "1", target: "2" },
            { id: "e2-3", source: "2", target: "3" },
            { id: "e3-4", source: "3", target: "4" },
            { id: "e3-5", source: "3", target: "5" },
            { id: "e3-6", source: "3", target: "6" },
            { id: "e4-7", source: "4", target: "7" },
            { id: "e5-7", source: "5", target: "7" },
            { id: "e6-7", source: "6", target: "7" },
            { id: "e7-8", source: "7", target: "8" },
            { id: "e8-9", source: "8", target: "9" },
            { id: "e8-10", source: "8", target: "10" },
            { id: "e9-11", source: "9", target: "11" },
            { id: "e10-12", source: "10", target: "12" },
            { id: "e11-13", source: "11", target: "13" },
            { id: "e12-13", source: "12", target: "13" },
        ],
    };


    const formatted = "```json\n" + JSON.stringify(roadmapData, null, 2) + "\n```";

    return NextResponse.json({ content: formatted });
}

