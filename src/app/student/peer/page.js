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
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDnSIPJijuoOpmYKpnSMS3X5Qojmxdz6b8",
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
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDnSIPJijuoOpmYKpnSMS3X5Qojmxdz6b8",
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

            console.log(same);

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
                // Check if the user is not the authenticated user and push to peers array
                if (userData.id !== currentUserId) {
                    setPeers(prevPeers => {
                        const newPeers = new Set(prevPeers);
                        newPeers.add(userData);
                        console.log(newPeers);
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
        <div className="space-y-4 h-screen flex flex-col justify-center items-center">
            <div className="bg-blue-600 head py-4 text-white container mx-auto flex items-center justify-between px-4">
                <div className="logo flex items-center">
                    <Image src="/logo.webp" width={150} height={67} alt="Logo" className="h-12 rounded-lg" />
                </div>
                <h1 className="text-3xl font-bold text-center mx-auto">Potential Peer Group Candidates</h1>
                <nav className="flex items-center space-x-4 text-white">
                    <a href="#" className="hover:text-gray-200">Home</a>
                    <a href="#" className="hover:text-gray-200">About us</a>
                </nav>
            </div>
            <div className="bg-gray-300 p-2 w-[80%] h-[100%] rounded-lg">
                {peers.length > 0 ? (
                    <ul>
                        {peers.map((peer) => (
                            <li key={peer.id} className="p-2 text-center text-xl font-bold border-b border-gray-400 space-x-2">
                                <div className="flex justify-between">{peer.name} - Courses: {peer.course_names.join(", ")}<button className="bg-blue-600 p-2 rounded-lg text-white" onClick={() => handleInterest(peer)}>Description</button></div>
                                <div className="bg-white rounded-lg text-black">{intr[peer.name] && intr[peer.name].text}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">No peers found.</p>
                )}
            </div>
        </div>
    );
}
