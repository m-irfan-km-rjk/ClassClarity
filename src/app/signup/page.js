'use client';

import Image from "next/image";
import { useState } from "react";
import { MdLock, MdMail, MdPerson, MdSchool } from "react-icons/md";
import { auth, firestore } from "../../../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [uni, setUni] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    // Signup handler
    const handleSignup = async () => {
        if (!username) {
            setError("Please provide a username.");
            return;
        }
        if (!password) {
            setError("Please provide a password.");
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile
            await updateProfile(user, {
                displayName: username,
            });

            // Save user info to Firestore
            await setDoc(doc(firestore, "users", user.uid), {
                id: user.uid,
                name: user.displayName,
                university: uni,
            });

            // Clear errors and navigate to the schedule page
            setError(null);
            router.push("/");
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                setError('This email is already in use.');
            } else if (e.code === 'auth/weak-password') {
                setError('The password provided is too weak.');
            } else if (e.code === 'auth/missing-password') {
                setError('Please enter a password.');
            } else {
                setError('An unknown error occurred. Please try again.');
                console.error(e);
            }
        }
    };

    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-300">
            <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-lg shadow-lg p-6 w-96 border border-gray-300">
                <Image src="/logo.webp" width={183} height={37.5} alt="Logo" />
                <hr className="w-full border-gray-300 mb-4" />
                
                {/* Email Input */}
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

                {/* Username Input */}
                <div className="flex items-center border-b-2 border-gray-400 py-2 px-3 w-full">
                    <MdPerson className="text-xl text-gray-600 mr-3" />
                    <input 
                        type="text" 
                        name="username" 
                        className="flex-1 bg-transparent text-gray-800 px-2 focus:outline-none placeholder:text-gray-500" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password Input */}
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

                {/* University Input */}
                <div className="flex items-center border-b-2 border-gray-400 py-2 px-3 w-full">
                    <MdSchool className="text-xl text-gray-600 mr-3" />
                    <input 
                        type="text" 
                        name="university" 
                        className="flex-1 bg-transparent text-gray-800 px-2 focus:outline-none placeholder:text-gray-500" 
                        placeholder="University"
                        value={uni}
                        onChange={(e) => setUni(e.target.value)}
                    />
                </div>

                {/* Error message */}
                {error && <p className="w-full bg-red-400 p-2 text-center text-white">{error}</p>}

                {/* Signup Button */}
                <button className="bg-[#177bcc] hover:bg-blue-400 rounded-lg p-2 text-white w-full font-bold" onClick={handleSignup}>
                    Signup
                </button>
            </div>
        </div>
    );
}
