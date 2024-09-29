'use client';

import Image from "next/image";
import { useState } from "react";
import { MdLock, MdMail } from "react-icons/md";
import { GrGoogle } from "react-icons/gr";
import { auth } from "../../../config";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const gprovider = new GoogleAuthProvider();

    const handleLogin = async () => {
        const userCred = await signInWithEmailAndPassword(auth,email,password);
        router.push("/");//Change the route here
    };

    const handleGoogleLogin = async () => {
        const guser = await signInWithPopup(auth,gprovider);
        router.push("/components/mainPage");
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-300">
            <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-lg shadow-lg p-6 w-96 border border-gray-300">
                <Image src="/logo.webp" width={183} height={37.5} alt="Logo" />
                <hr className="w-full border-gray-300 mb-4" />
                
                <div className="flex items-center border-b-2 border-gray-400 py-2 px-3 w-full">
                    <MdMail className="text-xl text-gray-600 mr-3" />
                    <input 
                        type="email" 
                        name="email" 
                        className="flex-1 bg-transparent text-gray-800 px-2 focus:outline-none placeholder:text-gray-500" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex items-center border-b-2 border-gray-400 py-2 px-3 w-full">
                    <MdLock className="text-xl text-gray-600 mr-3" />
                    <input 
                        type="password" 
                        name="password" 
                        className="flex-1 bg-transparent text-gray-800 px-2 focus:outline-none placeholder:text-gray-500" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="bg-[#177bcc] hover:bg-blue-400 rounded-lg p-2 text-white w-full font-bold" onClick={handleLogin}>Login</button>
                <button className="bg-[#177bcc] hover:bg-blue-400 rounded-lg p-2 text-white w-full font-bold" onClick={() => router.push("/signup")}>Signup</button>
                <button className="bg-[#177bcc] hover:bg-blue-400 rounded-lg p-2 text-white w-full font-bold flex justify-center gap-2" onClick={handleGoogleLogin}><GrGoogle size={20}/>Login with Google</button>
            </div>
        </div>
    );
}
