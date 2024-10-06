'use client'

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { auth, firestore } from "../../../../config";
import { useRouter } from "next/navigation";
import { collection, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import { free, interest } from "../../../../vars";

export default function PeerPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const [peers, setPeers] = useState([]);
    const [same, setSame] = useState(null);
    const [my, setMy] = useState(null);
    const [intr,setIntr] = useState({});

    const handleInterest = async (input) => {
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
                method: "post",
                data: {
                    "contents": {
                        "parts" : [{"text": free+JSON.stringify(my)+" "+JSON.stringify(input)}]
                    },
                },
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const generatedSchedule = response.data.candidates[0].content.parts[0].text;
            setSame(JSON.parse(generatedSchedule.replace(/```json|```/g, '').trim()));

            const responsed = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
                method: "post",
                data: {
                    "contents": {
                        "parts" : [{"text": interest+generatedSchedule}]
                    },
                },
                headers: {
                    "Content-Type": "application/json"
                }
            
            });

            const generatedIntr = responsed.data.candidates[0].content.parts[0].text;
            setIntr((prev) => {
                let temp = {...prev};
                temp[input.name] = JSON.parse(generatedIntr.replace(/```json|```/g, '').trim());
                return temp;
            });
        } catch (error) {
            console.error("Error generating data:", error);
        }
    };

    const findUserByCourse = async (courseName, currentUserId) => {
        const q = query(collection(firestore, "users"), where("course_names", "array-contains", courseName));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.id !== currentUserId) {
                    setPeers(prevPeers => {
                        const newPeers = new Set(prevPeers);
                        newPeers.add(userData);
                        return Array.from(newPeers);
                    });
                } else {
                    setMy(userData);
                }
            });
        } catch (error) {
            console.error("Error fetching users by course:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userData = (await getDoc(doc(firestore, "users", currentUser.uid))).data();
                if (userData && userData.course_names) {
                    const courses = userData.course_names;
                    courses.forEach((course) => {
                        findUserByCourse(course, currentUser.uid);
                    });
                }
            } else {
                setUser(null);
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    return (
        <div className="space-y-4 min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
            {/* Header Section */}
            <header className="bg-blue-600 shadow-lg w-full py-4 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <Image src="/logo.webp" width={150} height={67} alt="Logo" className="h-12 rounded-lg shadow-lg" />
                </div>
                <h1 className="text-3xl font-bold mx-auto">Potential Peer</h1>
                <nav className="space-x-4">
                    <a href="/" className="hover:text-gray-300 transition-colors">Home</a>
                    <a href="#" className="hover:text-gray-300 transition-colors">About Us</a>
                </nav>
            </header>

            {/* Main Content Section */}
            <main className="bg-gray-300 rounded-lg p-6 w-4/5 max-w-4xl shadow-xl">
                {peers.length > 0 ? (
                    <ul className="space-y-4">
                        {peers.map((peer) => (
                            <li key={peer.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-600">{peer.name} - Courses: {peer.course_names.join(", ")}</div>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors" onClick={() => handleInterest(peer)}>
                                        View Plan
                                    </button>
                                </div>
                                {intr[peer.name] && (
                                    <div className="bg-gray-100 p-4 mt-2 rounded-lg shadow-inner">
                                        <p className="text-gray-700">{intr[peer.name].text}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-lg font-semibold">No peers found.</p>
                )}
            </main>
        </div>
    );
}
