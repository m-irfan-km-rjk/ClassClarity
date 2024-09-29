'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../../../config";
import { setDoc,doc, updateDoc } from "firebase/firestore";

export default function SchedulePage() {
    const [user,setUser] = useState(null);
    const [course, setCourse] = useState("");
    const [courseD, setCourseD] = useState("");
    const [ctype, setCtype] = useState("1");

    const [activity, setActivity] = useState("");
    const [activityD, setActivityD] = useState("");
    const [atime, setAtime] = useState("");

    const [tags, setTags] = useState([]);
    const router = useRouter();

    const [courseArray,setCourseArray] = useState([]);
    const [aArray, setAArray] = useState([]);
    const [iArray, setIArray] = useState([]);

    const generatePage = async () => {

        await updateDoc(doc(firestore,"users",user.uid), {
            courses: courseArray,
            interests: iArray,
            daytoday_activities: aArray,
            course_names: courseArray.map((item) => item.course_name),
            change: "yes"
        });

        router.push("/student/schedule/output");
    };

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user) {
                setUser(user);
            } else {
                setUser(null);
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleAddTags = () => {
        if (course || activity) {
            if (course) {
                // Check if the course already exists in tags
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
                setCourse(""); // Reset course input
                setCourseD(""); // Reset course description
            }
    
            if (activity) {
                // Check if the activity already exists in tags
                if (!tags.includes(activity)) {
                    setTags(prev => [...prev, activity]);
                    setAArray(prev => [
                        ...prev,
                        { "activity_name": activity, "time": atime }
                    ]);
                }
                setActivity(""); // Reset activity input
                setActivityD(""); // Reset activity description
                setAtime(""); // Reset activity time
            }
        } else {
            alert("Please add details for either Activity or Course.");
        }
    };
    

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col justify-center items-center w-screen h-screen space-y-4">
            <div className="absolute top-0 p-4 w-full text-center text-xl font-bold text-white bg-blue-600">
                Input Semester Details
            </div>
            <div className="w-[50%] bg-white shadow-lg flex justify-between p-2">
                <div className="input w-full max-w-lg p-2 border-r-2 mr-1">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">Input Course and Skill Details</h3>
                    <div className="courses-details mb-6 space-y-4">
                        <input
                            type="text"
                            id="course-details"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter course name"
                        />
                        <input
                            type="text"
                            id="course-desc"
                            value={courseD}
                            onChange={(e) => setCourseD(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter course description"
                        />
                        <select
                            name="course-type"
                            id="course-type"
                            value={ctype}
                            onChange={(e) => setCtype(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="1">University Course</option>
                            <option value="2">Skill</option>
                        </select>
                    </div>

                    <h3 className="text-xl mb-4 font-semibold text-gray-700 text-center">Input Day-to-Day Activities</h3>
                    <div className="activities-details space-y-4">
                        <input
                            type="text"
                            id="activity-details"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter activity name"
                        />
                        <input
                            type="text"
                            id="activity-desc"
                            value={activityD}
                            onChange={(e) => setActivityD(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter activity description"
                        />
                        <input
                            type="text"
                            id="activity-time"
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
                <div className="w-full flex flex-col space-y-5">
                    <div className="grid grid-row-3 p-2 h-[87.5%] w-full bg-gray-50 overflow-x-hidden overflow-y-auto gap-2 rounded-lg shadow-md border border-gray-300">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-blue-600 inline-flex p-2 items-center justify-between rounded-lg text-white text-sm transition-transform transform hover:scale-105 cursor-pointer"
                            >
                                {tag}
                                <button
                                    onClick={() => handleRemoveTag(index)}
                                    className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                                    aria-label={`Remove tag ${tag}`}
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                    <button className="bg-blue-600 rounded-lg p-2 text-white font-bold hover:bg-blue-800" onClick={generatePage}>
                        Generate Schedule
                    </button>
                </div>
                

            </div>
        </div>
    );
}
