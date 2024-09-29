const prompt_1 = "goal : create a university student semester schedule based on the student's interests, courses and daily activities\noutput : each day of the week has a morning, afternoon, and night schedule\neach shedule has a list of activities that the student will do\neach activity has to be generated based on the student's interests, courses and daily activities provided in the input\nfill all activities in the schedule using relevant course, interest descriptions and general information about the course, interest from the input.\ncourses that the user has described hardest should get more frequently featured during the week.  \nactvities should be generated in a way that the student can follow the schedule and do the activities in the order they are listed in the schedule.\ninclude day to day activities in the schedule as well using the time provided in the input (avoid very common tasks like cooking, eating, etc).\nsome activities (upto maximum 5) can be marked as free time, in that case, the activity name will be \"free time\" and the type will be \"free\" and the color will be \"yellow\".\ntype of the activity can be \"course\", \"interest\", \"daily\" or \"free\"\ncolor of the activity has be \"red\" for \"course\", \"blue\" for \"interest\", \"green\" for \"daily\" and \"\"yellow\" for \"free\"\noutput only json strictly\n\ninput data format:\n  {\n      \"id\": \"string\",\n      \"name\": \"string\",\n      \"password\": \"string\",\n      \"university\": \"string\",\n      \"courses\": [\n        {\n          \"course_name\": \"string\",\n          \"course_desc\": \"string\",\n          \"field\": \"string\"\n        }\n      ],\n      \"interests\": [\n        {\n          \"interest_name\": \"string\",\n          \"interest_desc\": \"string\",\n          \"field\": \"string\"\n        }\n      ],\n      \"daytoday_activities\": [\n        {\n          \"activity_name\": \"string\",\n          \"time\": \"string\"\n        }\n      ]\n    }\n  output : format (strict)\n  {\n      \"monday\":\n      {\n        \"morning\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"afternoon\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"night\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]] \n      },\n      \"tuesday\":\n      {\n        \"morning\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"afternoon\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"night\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]] \n      },\n      \"wednesday\":\n      {\n        \"morning\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"afternoon\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"night\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]] \n      },\n      \"thursday\":\n      {\n        \"morning\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"afternoon\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"night\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]] \n      },\n      \"friday\":\n      {\n        \"morning\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"afternoon\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"night\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]] \n      },\n      \"saturday\":\n      {\n        \"morning\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"afternoon\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"night\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]] \n      },\n      \"sunday\":\n      {\n        \"morning\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"afternoon\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]],\n        \"night\": [[\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"], [\"activity\",\"type\",\"color\"]] \n      }    \n  }\n\nexample:\nfor an input:\n{\n    \"id\": \"23456\",\n    \"name\": \"Alice Smith\",\n    \"password\": \"securepass\",\n    \"university\": \"City University\",\n    \"courses\": [\n      {\n        \"course_name\": \"Calculus I\",\n        \"course_feedback\": \"I find it challenging but rewarding!\",\n        \"field\": \"math\"\n      },\n      {\n        \"course_name\": \"Intro to Philosophy\",\n        \"course_feedback\": \"It's thought-provoking and enlightening.\",\n        \"field\": \"humanities\"\n      }\n    ],\n    \"interests\": [\n      {\n        \"interest_name\": \"Psychology\",\n        \"interest_feedback\": \"Understanding human behavior is fascinating.\",\n        \"field\": \"socialsciences\"\n      },\n      {\n        \"interest_name\": \"Graphic Design\",\n        \"interest_feedback\": \"I enjoy creating visual content and being artistic.\",\n        \"field\": \"arts\"\n      }\n    ],\n    \"daytoday_activities\": [\n      {\n        \"activity_name\": \"Yoga\",\n        \"time\": \"6:00 AM to 7:00 AM\"\n      },\n      {\n        \"activity_name\": \"Library Research\",\n        \"time\": \"1:00 PM to 3:00 PM\"\n      },\n      {\n        \"activity_name\": \"Cooking Dinner\",\n        \"time\": \"6:30 PM to 7:30 PM\"\n      }\n    ]\n  }\n\n\n\nthe output should be like:\n{\n    \"monday\": {\n        \"morning\": [\n            [\"Yoga\", \"daily\", \"green\"],\n            [\"Calculus I Study\", \"course\", \"red\"],\n            [\"Graphic Design Practice\", \"interest\", \"blue\"]\n        ],\n        \"afternoon\": [\n            [\"Library Research\", \"daily\", \"green\"],\n            [\"Intro to Philosophy Reading\", \"course\", \"red\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ],\n        \"night\": [\n            [\"Cooking Dinner\", \"daily\", \"green\"],\n            [\"Psychology Exploration\", \"interest\", \"blue\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ]\n    },\n    \"tuesday\": {\n        \"morning\": [\n            [\"Yoga\", \"daily\", \"green\"],\n            [\"Calculus I Problem Set\", \"course\", \"red\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ],\n        \"afternoon\": [\n            [\"Library Research\", \"daily\", \"green\"],\n            [\"Intro to Philosophy Discussion\", \"course\", \"red\"],\n            [\"Graphic Design Project\", \"interest\", \"blue\"]\n        ],\n        \"night\": [\n            [\"Cooking Dinner\", \"daily\", \"green\"],\n            [\"Free Time\", \"free\", \"yellow\"],\n            [\"Psychology Podcast\", \"interest\", \"blue\"]\n        ]\n    },\n    \"wednesday\": {\n        \"morning\": [\n            [\"Yoga\", \"daily\", \"green\"],\n            [\"Calculus I Lecture\", \"course\", \"red\"],\n            [\"Graphic Design Inspiration\", \"interest\", \"blue\"]\n        ],\n        \"afternoon\": [\n            [\"Library Research\", \"daily\", \"green\"],\n            [\"Intro to Philosophy Essay Writing\", \"course\", \"red\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ],\n        \"night\": [\n            [\"Cooking Dinner\", \"daily\", \"green\"],\n            [\"Psychology Case Studies\", \"interest\", \"blue\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ]\n    },\n    \"thursday\": {\n        \"morning\": [\n            [\"Yoga\", \"daily\", \"green\"],\n            [\"Calculus I Study Group\", \"course\", \"red\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ],\n        \"afternoon\": [\n            [\"Library Research\", \"daily\", \"green\"],\n            [\"Intro to Philosophy Debate Prep\", \"course\", \"red\"],\n            [\"Graphic Design Feedback Session\", \"interest\", \"blue\"]\n        ],\n        \"night\": [\n            [\"Cooking Dinner\", \"daily\", \"green\"],\n            [\"Psychology Film Analysis\", \"interest\", \"blue\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ]\n    },\n    \"friday\": {\n        \"morning\": [\n            [\"Yoga\", \"daily\", \"green\"],\n            [\"Calculus I Review\", \"course\", \"red\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ],\n        \"afternoon\": [\n            [\"Library Research\", \"daily\", \"green\"],\n            [\"Intro to Philosophy Group Project\", \"course\", \"red\"],\n            [\"Graphic Design Portfolio Review\", \"interest\", \"blue\"]\n        ],\n        \"night\": [\n            [\"Cooking Dinner\", \"daily\", \"green\"],\n            [\"Psychology Workshop\", \"interest\", \"blue\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ]\n    },\n    \"saturday\": {\n        \"morning\": [\n            [\"Yoga\", \"daily\", \"green\"],\n            [\"Calculus I Practice Exam\", \"course\", \"red\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ],\n        \"afternoon\": [\n            [\"Library Research\", \"daily\", \"green\"],\n            [\"Intro to Philosophy Reading Group\", \"course\", \"red\"],\n            [\"Graphic Design Creative Session\", \"interest\", \"blue\"]\n        ],\n        \"night\": [\n            [\"Cooking Dinner\", \"daily\", \"green\"],\n            [\"Psychology Articles Reading\", \"interest\", \"blue\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ]\n    },\n    \"sunday\": {\n        \"morning\": [\n            [\"Yoga\", \"daily\", \"green\"],\n            [\"Calculus I Revision\", \"course\", \"red\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ],\n        \"afternoon\": [\n            [\"Library Research\", \"daily\", \"green\"],\n            [\"Intro to Philosophy Reflection\", \"course\", \"red\"],\n            [\"Graphic Design Sketching\", \"interest\", \"blue\"]\n        ],\n        \"night\": [\n            [\"Cooking Dinner\", \"daily\", \"green\"],\n            [\"Psychology Reflection Journal\", \"interest\", \"blue\"],\n            [\"Free Time\", \"free\", \"yellow\"]\n        ]\n    }\n}\n"

const description = `Give me a description for the courses using their feedback from the following data
Description is a short para that includes how they can tackle their respective courses efficiently, it should also be directed to that person as if giving advice to them.
It should be very specific to that course and advice should be less general.
Description should be in the format:
{
  "coursename_1" : " ---description---", 
  "coursename_2" : "---description---"
}

data/input is:
`;

const free = `goal: to analyse two university student schedule and to generate a response a coinciding free time and any 2 random interest the two students share.
interests are marked as "type": "interest" in the input json.
free times are maker as "type": "free" in the input json.
find any coinciding free time, their corresponding names and any two random interests from each schedule.
your response should be strictly a json and should follow the response format.

your response format:
{
    "interests": ["interest1","interest2"],
    "names": ["name1","name2"],
    "freetime": ["day","time"]
}

input example:
schedule1 = {
    "id": "10005",
    "name": "David Johnson",
    "monday": {
        "morning": [
            ["Biology 101 Lecture", "course", "red"],
            ["Environmental Science Reading", "interest", "blue"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Physics II Study", "course", "red"],
            ["Environmental Science Project Work", "interest", "blue"],
            ["Free Time", "free", "yellow"]
        ],
        "night": [
            ["Cooking", "daily", "green"],
            ["Biology 101 Study Group", "course", "red"],
            ["Entertainment", "daily", "green"]
        ]
    },
    "tuesday": {
        "morning": [
            ["Biology 101 Lab", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Environmental Science Discussion", "interest", "blue"]
        ],
        "afternoon": [
            ["Physics II Problem Set", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Biology 101 Review", "course", "red"]
        ],
        "night": [
            ["Cooking", "daily", "green"],
            ["Physics II Experiment Preparation", "course", "red"],
            ["Entertainment", "daily", "green"]
        ]
    },
    "wednesday": {
        "morning": [
            ["Biology 101 Lecture", "course", "red"],
            ["Environmental Science Fieldwork", "interest", "blue"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Physics II Revision", "course", "red"],
            ["Environmental Science Research", "interest", "blue"],
            ["Free Time", "free", "yellow"]
        ],
        "night": [
            ["Cooking", "daily", "green"],
            ["Biology 101 Group Study", "course", "red"],
            ["Entertainment", "daily", "green"]
        ]
    },
    "thursday": {
        "morning": [
            ["Physics II Lecture", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Environmental Science Reading", "interest", "blue"]
        ],
        "afternoon": [
            ["Biology 101 Assignment", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Physics II Experiment Review", "course", "red"]
        ],
        "night": [
            ["Cooking", "daily", "green"],
            ["Biology 101 Quiz Preparation", "course", "red"],
            ["Entertainment", "daily", "green"]
        ]
    },
    "friday": {
        "morning": [
            ["Biology 101 Lecture", "course", "red"],
            ["Environmental Science Exploration", "interest", "blue"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Physics II Homework", "course", "red"],
            ["Environmental Science Presentation Preparation", "interest", "blue"],
            ["Free Time", "free", "yellow"]
        ],
        "night": [
            ["Cooking", "daily", "green"],
            ["Biology 101 Review Session", "course", "red"],
            ["Entertainment", "daily", "green"]
        ]
    },
    "saturday": {
        "morning": [
            ["Biology 101 Research", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Environmental Science Writing", "interest", "blue"]
        ],
        "afternoon": [
            ["Physics II Revision", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Biology 101 Practical Work", "course", "red"]
        ],
        "night": [
            ["Cooking", "daily", "green"],
            ["Environmental Science Project Reflection", "interest", "blue"],
            ["Entertainment", "daily", "green"]
        ]
    },
    "sunday": {
        "morning": [
            ["Physics II Study", "course", "red"],
            ["Environmental Science Journaling", "interest", "blue"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Biology 101 Revision", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Environmental Science Community Engagement", "interest", "blue"]
        ],
        "night": [
            ["Cooking", "daily", "green"],
            ["Physics II Group Study", "course", "red"],
            ["Entertainment", "daily", "green"]
        ]
    }
}

schedule 2 = 
{
    "id": "10006",
    "name": "Olivia Williams",
    "monday": {
        "morning": [
            ["Yoga", "daily", "green"],
            ["Calculus I Review Session", "course", "red"],
            ["Graphic Design Inspiration", "interest", "blue"]
        ],
        "afternoon": [
            ["Philosophy Group Discussion", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Graphic Design Project Work", "interest", "blue"]
        ],
        "night": [
            ["Calculus I Practice Problems", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Evening Reflection Journal", "daily", "green"]
        ]
    },
    "tuesday": {
        "morning": [
            ["Yoga", "daily", "green"],
            ["Calculus I Problem Solving", "course", "red"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Intro to Philosophy Reading", "course", "red"],
            ["Graphic Design Concept Sketching", "interest", "blue"],
            ["Library Research", "daily", "green"]
        ],
        "night": [
            ["Calculus I Homework Review", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Graphic Design Tutorial", "interest", "blue"]
        ]
    },
    "wednesday": {
        "morning": [
            ["Yoga", "daily", "green"],
            ["Calculus I Study Group", "course", "red"],
            ["Graphic Design Portfolio Planning", "interest", "blue"]
        ],
        "afternoon": [
            ["Intro to Philosophy Essay Writing", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Graphic Design Project Feedback", "interest", "blue"]
        ],
        "night": [
            ["Calculus I Revision", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Evening Relaxation", "daily", "green"]
        ]
    },
    "thursday": {
        "morning": [
            ["Yoga", "daily", "green"],
            ["Calculus I Mock Test", "course", "red"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Intro to Philosophy Class Discussion", "course", "red"],
            ["Graphic Design Creative Session", "interest", "blue"],
            ["Library Research", "daily", "green"]
        ],
        "night": [
            ["Calculus I Problem Set", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Evening Journal Entry", "daily", "green"]
        ]
    },
    "friday": {
        "morning": [
            ["Yoga", "daily", "green"],
            ["Calculus I Study", "course", "red"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Intro to Philosophy Group Project", "course", "red"],
            ["Graphic Design Portfolio Review", "interest", "blue"],
            ["Library Research", "daily", "green"]
        ],
        "night": [
            ["Calculus I Review Session", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Evening Wind Down", "daily", "green"]
        ]
    },
    "saturday": {
        "morning": [
            ["Yoga", "daily", "green"],
            ["Calculus I Practice Exam", "course", "red"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Intro to Philosophy Reading Group", "course", "red"],
            ["Graphic Design Sketching Session", "interest", "blue"],
            ["Library Research", "daily", "green"]
        ],
        "night": [
            ["Calculus I Concept Review", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Evening Reflection", "daily", "green"]
        ]
    },
    "sunday": {
        "morning": [
            ["Yoga", "daily", "green"],
            ["Calculus I Final Revision", "course", "red"],
            ["Free Time", "free", "yellow"]
        ],
        "afternoon": [
            ["Intro to Philosophy Reflection", "course", "red"],
            ["Graphic Design Creative Exploration", "interest", "blue"],
            ["Library Research", "daily", "green"]
        ],
        "night": [
            ["Calculus I Preparation for Next Week", "course", "red"],
            ["Free Time", "free", "yellow"],
            ["Evening Relaxation", "daily", "green"]
        ]
    }
}

expected response:
{
    "interests": ["Environmental Science"," Graphic Design"],
    "names": ["David Johnson","Olivia Williams"],
    "freetime": ["Saturday","morning"]
}

input:

`;

const interest = `Goal: to generate a paragraph relating two students interests through an activity they can conduct together.
generate a small concise paragraph about an activity both can conduct on their free time by relating their interests in a realistic manner.
your response should be strictly a json

input format :
{
    "interests": ["interest1","interest2"],
    "names": ["name1","name2"],
    "freetime": ["day","time"]
}

response format:
{"text":"You and [name2] seem to be free on [day] [time]. 
Since [name2] is interested in [interest2] and you have 
interests in [interest1],
you both can do [a small concise paragraph about an activity both can conduct in thier free time by relating their interests in a realistic manner]"}

example:

if input is:

{
    "interests": ["Environmental Science"," Graphic Design"],
    "names": ["David Johnson","Olivia Williams"],
    "freetime": ["Saturday","morning"]
}

response should be similar to :

{
  "text": "You and Olivia Williams seem to be free on Saturday mornings. Since Olivia Williams is interested in Graphic Design and you have interests in Environmental Science, you both can plan an outdoor photography session where you capture nature and environmental elements. Olivia can apply her design skills to creatively present the photos, while you focus on the environmental aspects. This activity combines your love for nature and her passion for design, resulting in a collaborative creative project."
}

input: `;

export {interest,prompt_1,description,free};