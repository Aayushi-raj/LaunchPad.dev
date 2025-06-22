<<<<<<< HEAD
=======
// import React from 'react'
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarGroup,
//     SidebarGroupContent,
//     SidebarGroupLabel,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { Calendar, ChartArea, Globe2, Home, Inbox, Layers2, Search, Settings,LineChart,UserCircle} from "lucide-react"
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'

// const items = [
//     {
//         title: "Workspace",
//         url: "#",
//         icon: Layers2,
//     },
//     {
//         title: "AI Coach",
//         url: "#",
//         icon: LineChart,
//     },
//     {
//         title: "History",
//         url: "#",
//         icon: Globe2,
//     },
//     {
//         title: "Account",
//         url: "#",
//         icon: UserCircle,
//     },

// ]

// export function AppSidebar() {
//     const path = usePathname();
//     return (
//         <Sidebar>
//             <SidebarHeader>
//                 <div className='p-4'>
//                     <Image src={'./logo.svg'} alt='logo' width={100} height={100}
//                         className='w-full h-full' />
//                     <h2 className='text-sm text-gray-400 text-center'>Build Awesome</h2>
//                 </div>
//             </SidebarHeader>
//             <SidebarContent>
//                 <SidebarGroup>

//                     <SidebarGroupContent>
//                         <SidebarMenu className='mt-5'>
//                             {items.map((item, index) => (
//                                 // <SidebarMenuItem key={item.title} className='p-2'>
//                                 //     <SidebarMenuButton asChild className=''>
//                                 <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
//                                  hover:bg-gray-100 rounded-lg ${path.includes(item.url) && 'bg-gray-200ß'}`}>
//                                     <item.icon className='h-5 w-5' />
//                                     <span>{item.title}</span>
//                                 </a>
//                                 //     </SidebarMenuButton>
//                                 // </SidebarMenuItem>
//                             ))}
//                         </SidebarMenu>
//                     </SidebarGroupContent>
//                 </SidebarGroup>
//             </SidebarContent>
//             <SidebarFooter>
//                 <h2 className='p-2 text-gray-400 text-sm'>Copyright @LaunchPad.dev</h2>
//             </SidebarFooter>
//         </Sidebar>
//     )
// }


>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
<<<<<<< HEAD
import { Calendar, ChartArea, Globe2, Home, Inbox, Layers2, Search, Settings,LineChart,UserCircle} from "lucide-react"
=======
import { Calendar, Globe2, Home, Inbox, Layers2, Search, Settings, LineChart, UserCircle } from "lucide-react"
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
    {
<<<<<<< HEAD
        title: "Workspace",
=======
        title: "Dashboard",
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
        url: "#",
        icon: Layers2,
    },
    {
<<<<<<< HEAD
        title: "AI Coach",
=======
        title: "Career Analytics",
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
        url: "#",
        icon: LineChart,
    },
    {
<<<<<<< HEAD
        title: "History",
=======
        title: "Learning History",
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
        url: "#",
        icon: Globe2,
    },
    {
<<<<<<< HEAD
        title: "Account",
        url: "#",
        icon: UserCircle,
    },

]

export function AppSidebar() {
    const path = usePathname();
=======
        title: "Profile Settings",
        url: "#",
        icon: UserCircle,
    },
]

export function AppSidebar() {
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Image src={'./logo.svg'} alt='logo' width={100} height={100}
                        className='w-full h-full' />
                    <h2 className='text-sm text-gray-400 text-center'>Build Awesome</h2>
<<<<<<< HEAD
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                                // <SidebarMenuItem key={item.title} className='p-2'>
                                //     <SidebarMenuButton asChild className=''>
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${path.includes(item.url) && 'bg-gray-200ß'}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                                //     </SidebarMenuButton>
                                // </SidebarMenuItem>
=======
               </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                                <a href={item.url} key={index} className={`p-3 text-sm flex gap-3 items-center
                                 hover:bg-gradient-to-r hover:from-pastel-sky/10 hover:to-pastel-cyan/10 rounded-xl transition-all duration-200 group`}>
                                    <item.icon className='h-5 w-5 text-gray-600 group-hover:text-pastel-sky transition-colors' />
                                    <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.title}</span>
                                </a>
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
<<<<<<< HEAD
                <h2 className='p-2 text-gray-400 text-sm'>Copyright @LaunchPad.dev</h2>
            </SidebarFooter>
        </Sidebar>
    )
}
=======
                <div className="p-4 border-t border-gray-100">
                    <h2 className='text-xs text-gray-400 text-center'>© 2025 Launchpad.dev</h2>
                    <p className='text-xs text-gray-400 text-center mt-1'>All rights reserved</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
