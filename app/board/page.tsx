"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Body from "@/components/Body";
import TaskProvider from "@/context/TaskContext";
import Input from "@/components/Input";

export default function Page() {
    

    return (
        <div className='  bg-gray-50 w-full relative overflow-hidden' >

            
        
              
        
              <main className="w-full">
              
              <Body  />
              </main>
            </div>
    );
}