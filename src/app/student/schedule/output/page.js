    'use client';

    import axios from "axios";
    import { description, prompt_1 } from "../../../../../vars";
    import { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import { doc, getDoc, updateDoc } from "firebase/firestore";
    import { firestore, auth } from "../../../../../config";

    export default function OutputPage() {
        const router = useRouter();
        const [user, setUser] = useState(null);
        const [data, setData] = useState(null);
        const [desc, setDesc] = useState(null);
        var generatedSchedule;
        var generatedDesc;

        const generateData = async (input) => {
            try {
                const response = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDnSIPJijuoOpmYKpnSMS3X5Qojmxdz6b8", {
                    "contents": {
                        "parts": [{ "text": prompt_1 + "input : " + JSON.stringify(input) }]
                    }
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const responsed = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDnSIPJijuoOpmYKpnSMS3X5Qojmxdz6b8", {
                    "contents": {
                        "parts": [{ "text": description + JSON.stringify(input) }]
                    }
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                generatedSchedule = response.data.candidates[0].content.parts[0].text;
                generatedDesc = responsed.data.candidates[0].content.parts[0].text;

                setData(JSON.parse(generatedSchedule.replace(/```json|```/g, '').trim()));
                setDesc(JSON.parse(generatedDesc.replace(/```json|```/g, '').trim()));
            } catch (error) {
                console.error("Error generating data:", error);
            }
        };

        const saveSchedule = async () => {
            if (user) {
                await updateDoc(doc(firestore, "users", auth.currentUser.uid), {
                    schedule: JSON.stringify(data),
                    desc: JSON.stringify(desc),
                    change: "no"
                });
            } else {
                console.error("User not defined while updating document");
            }
        };

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
                if (authUser) {
                    setUser(authUser);
                    const out = (await getDoc(doc(firestore, "users", authUser.uid))).data();
                    if (out) {
                        if (out["change"] === "yes") {
                            await generateData(out);
                        } else {
                            setData(JSON.parse(out["schedule"].replace(/```json|```/g, '').trim()));
                            setDesc(JSON.parse(out["desc"].replace(/```json|```/g, '').trim()));
                        }
                    } else {
                        console.error("No data found for user:", authUser.uid);
                    }
                } else {
                    setUser(null);
                    router.push("/login");
                }
            });

            return () => unsubscribe();
        }, [router]); // Added router as a dependency

        if (!(data && desc && user)) {
            return <div>Loading...</div>;
        }

        return (
            <div className="p-3 w-full h-auto space-y-4">
                <div className="w-full h-full grid grid-cols-8 bg-gray-200 grid-rows-4 gap-2 p-2 border-2 border-black">
                    {/* Time of Day Column */}
                    <div className="p-2 font-bold text-center bg-blue-100 border border-black">Time</div>
                    {Object.keys(data).map((day, index) => (
                        <div key={index} className="p-2 font-bold text-center bg-blue-100 border border-black">
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                        </div>
                    ))}
                    {/* Morning Time Label */}
                    <div className="p-2 font-bold text-center bg-yellow-200 border border-black">Morning</div>
                    {Object.keys(data).map((day, index) => (
                        <div key={index + "morning"} className="p-2 border border-black bg-green-100">
                            {data[day].morning.map((activity, i) => (
                                <div key={i} className={`text-sm ${activity[2]}`}>
                                    {activity[0]} ({activity[1]})
                                </div>
                            ))}
                        </div>
                    ))}
                    {/* Afternoon Time Label */}
                    <div className="p-2 font-bold text-center bg-yellow-200 border border-black">Afternoon</div>
                    {Object.keys(data).map((day, index) => (
                        <div key={index + "afternoon"} className="p-2 border border-black bg-yellow-100">
                            {data[day].afternoon.map((activity, i) => (
                                <div key={i} className={`text-sm ${activity[2]}`}>
                                    {activity[0]} ({activity[1]})
                                </div>
                            ))}
                        </div>
                    ))}
                    {/* Night Time Label */}
                    <div className="p-2 font-bold text-center bg-yellow-200 border border-black">Night</div>
                    {Object.keys(data).map((day, index) => (
                        <div key={index + "night"} className="p-2 border border-black bg-gray-100">
                            {data[day].night.map((activity, i) => (
                                <div key={i} className={`text-sm ${activity[2]}`}>
                                    {activity[0]} ({activity[1]})
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                <button className="bg-blue-600 p-2 text-white w-full rounded-lg" onClick={saveSchedule}>
                    Save Schedule to Database
                </button>
                <div className="w-auto h-auto p-2 border-2 border-black">
                    {Object.keys(desc).map((crs, index) => (
                        <span className="space-y-4" key={index}>
                            <p className="text-3xl font-bold p-1">{crs.toUpperCase()}</p>
                            <p>{desc[crs]}</p>
                        </span>
                    ))}
                </div>
            </div>
        );
    }
