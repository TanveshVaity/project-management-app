import { ReactNode } from "react";
import Navbar from "./Navbar";


const DashboardWrapper = ({ children}  : {children : ReactNode}) =>{
    return(
        <div className="flex min-h-screen w-full bg-gray-900">
            <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg md:pl-64`}>
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardWrapper;