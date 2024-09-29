'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../../../config";
import { updateDoc, doc } from "firebase/firestore";

export default function SchedulePage() {
    const [user, setUser] = useState(null);
    const [course, setCourse] = useState("");
    const [courseD, setCourseD] = useState("");
    const [ctype, setCtype] = useState("1");

    const [activity, setActivity] = useState("");
    const [activityD, setActivityD] = useState("");
    const [atime, setAtime] = useState("");

    const [tags, setTags] = useState([]);
    const router = useRouter();

    const [courseArray, setCourseArray] = useState([]);
    const [aArray, setAArray] = useState([]);
    const [iArray, setIArray] = useState([]);

    const generatePage = async () => {
        await updateDoc(doc(firestore, "users", user.uid), {
            courses: courseArray,
            interests: iArray,
            daytoday_activities: aArray,
            course_names: courseArray.map((item) => item.course_name),
            change: "yes"
        });
        router.push("/student/schedule/output");
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleAddTags = () => {
        if (course || activity) {
            if (course) {
                if (!tags.includes(course)) {
                    setTags(prev => [...prev, course]);
                    if (ctype === "2") {
                        setIArray(prev => [
                            ...prev,
                            { "interest_name": course, "interest_feedback": courseD }
                        ]);
                    } else {
                        setCourseArray(prev => [
                            ...prev,
                            { "course_name": course, "course_feedback": courseD }
                        ]);
                    }
                }
                setCourse(""); 
                setCourseD(""); 
            }

            if (activity) {
                if (!tags.includes(activity)) {
                    setTags(prev => [...prev, activity]);
                    setAArray(prev => [
                        ...prev,
                        { "activity_name": activity, "time": atime }
                    ]);
                }
                setActivity(""); 
                setActivityD(""); 
                setAtime(""); 
            }
        } else {
            alert("Please add details for either Activity or Course.");
        }
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen p-6 bg-gray-50 space-y-6">
            <div className="absolute top-0 p-4 w-full text-center text-2xl font-bold text-white bg-blue-600 shadow-lg">
                Input Semester Details
            </div>

            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col lg:flex-row justify-between space-y-6 lg:space-y-0 lg:space-x-6">
                
                <div className="w-full lg:w-1/2 p-4 bg-gray-100 rounded-lg border border-gray-300">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">Input Course and Skill Details</h3>
                    
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter course name"
                        />
                        <input
                            type="text"
                            value={courseD}
                            onChange={(e) => setCourseD(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter course description"
                        />
                        <select
                            value={ctype}
                            onChange={(e) => setCtype(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="1">University Course</option>
                            <option value="2">Interest</option>
                        </select>
                    </div>

                    <h3 className="text-xl font-semibold my-6 text-gray-700 text-center">Input Day-to-Day Activities</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter activity name"
                        />
                        <input
                            type="text"
                            value={activityD}
                            onChange={(e) => setActivityD(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter activity description"
                        />
                        <input
                            type="text"
                            value={atime}
                            onChange={(e) => setAtime(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter time allotted per day in hours"
                        />
                        <button className="bg-blue-600 w-full rounded-lg p-2 text-white font-bold hover:bg-blue-800 mt-2" onClick={handleAddTags}>
                            Add to Board
                        </button>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col space-y-6">
                    <div className="p-4 h-full bg-white rounded-lg shadow-lg border border-gray-300 overflow-auto">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">Added Items</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-600 p-2 text-white rounded-lg inline-flex justify-between items-center text-sm transition-transform transform hover:scale-105 cursor-pointer"
                                >
                                    {tag}
                                    <button
                                        onClick={() => handleRemoveTag(index)}
                                        className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <button className="bg-blue-600 w-full rounded-lg p-2 text-white font-bold hover:bg-blue-800" onClick={generatePage}>
                        Generate Schedule
                    </button>
                </div>
            </div>
        </div>
    );
}
