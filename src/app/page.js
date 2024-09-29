'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config";
import { FaCalendarCheck,FaKeyboard,FaUsers } from "react-icons/fa";

export default function Home() {
  const [user,setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (curuser) => {
          if(curuser) {
              setUser(curuser);
              console.log(user);
          } else {
              setUser(null);
              router.push("/login");
          }
      });

      return () => unsubscribe();
  },[router]);

  return(
    <div className="max-w-screen-xl mx-auto p-5">
        <nav className="flex justify-between items-center p-4 bg-blue-700 text-white rounded-lg">
            <div className="logo">
                <Image src="/logo.webp" width={150} height={67} alt="Logo" className="rounded-lg"/>
            </div>
            <div className="flex space-x-6">
                <a href="#" className="hover:text-red-400 font-bold">Home</a>
                <a href="#" className="hover:text-red-400 font-bold">Features</a>
                <a href="#" className="hover:text-red-400 font-bold">Contact</a>
            </div>
            
        </nav>
        <section className="flex flex-col lg:flex-row justify-between items-center mt-12 space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="max-w-lg space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-blue-700 tracking-wide">Student Time Scheduler</h1>
                <p className="text-lg text-gray-700">Manage your time effectively and stay organized with our AI-powered Student Time Scheduler. Whether it's planning your day, balancing classNamees, or keeping track of assignments, we've got you covered!</p>
                <button className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition" onClick={()=>router.push("/student/schedule")}>Get Started</button>
            </div>
            <div className="flex-shrink-0">
                <Image src="/home_art2.webp" width={437} height={437} alt="illustration" className="rounded-lg shadow-lg max-w-full"/>
            </div>
        </section>
        <section className="flex flex-col lg:flex-row items-center mt-16 space-y-8 lg:space-y-0 lg:space-x-8 p-8 bg-white rounded-lg shadow-lg">
            <div className="flex-shrink-0">
                <Image src="/home_art1.webp" alt="About Us Image" width={500} height={500} className="rounded-lg shadow-lg max-w-full"/>
            </div>
            <div className="space-y-4 max-w-lg">
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-700">About Us</h2>
                <p className="text-gray-700 text-justify">At Student Time Scheduler, our mission is to help students make the most of their time. We understand the challenges of managing a busy schedule filled with classNamees, study sessions, and extracurricular activities. Our AI-driven platform is designed to streamline your day and ensure you're always on top of your tasks. From personalized study plans to optimized schedules, we are here to make student life more organized and productive.</p>
            </div>
        </section>
        <section className="flex flex-col lg:flex-row items-center mt-16 space-y-8 lg:space-y-0 lg:space-x-8 p-8 bg-white rounded-lg shadow-lg">
  {/* Schedule Button */}
  <button className="rounded-lg flex flex-col items-center justify-center w-full lg:w-1/3 h-32 bg-blue-300 p-4 hover:bg-blue-400 transition-colors" onClick={()=> router.push("/student/schedule/output")}>
    <FaCalendarCheck size={48} />
    <span className="mt-2 text-lg font-semibold">Schedule</span>
  </button>

  {/* Input Button */}
  <button className="rounded-lg flex flex-col items-center justify-center w-full lg:w-1/3 h-32 bg-green-300 p-4 hover:bg-green-400 transition-colors" onClick={()=> router.push("/student/schedule")}>
    <FaKeyboard size={48} />
    <span className="mt-2 text-lg font-semibold">Input Semester Details</span>
  </button>

  {/* Peer Group Button */}
  <button className="rounded-lg flex flex-col items-center justify-center w-full lg:w-1/3 h-32 bg-red-300 p-4 hover:bg-red-400 transition-colors" onClick={()=> router.push("/student/peer")}>
    <FaUsers size={48} />
    <span className="mt-2 text-lg font-semibold">Peer Group</span>
  </button>
</section>


    </div>
);
}
