export interface Topic {
    id: number
    title: string
    paragraph: string
    progress: number
    coverImage: any
}

export interface Faqs {
    question: string
    answer: string
}

export interface Reviews {
    user: string
    rating: number
    comment: string
}

export interface Lessons {
    id: number
    title: string
    lessonNumber: string
}

export interface SubjectCard {
    id: number
    subject: string
    topics: Topic[]
    rating: number
    numberOfStudents: number
    lastUpdated: string
    about: string
    faqs: Faqs[]
    reviews: Reviews[]
    lessons: Lessons[]
}

// export interface CourseCards {
//     id: number
//     course: string
//     topics: Topic[]
// }

export const subjects = [
    'Mathematics', 
    'English Language', 
    'Basic Science', 
    'Quantitative Reasoning', 
    'Verbal Reasoning', 
    'Health Education', 
    'Social Studies', 
    'Home Economics'
]

// export const cards = [
//     'Ongoing',
//     'Completed'
// ]


// // export const coursesCards: CourseCards[] = [
// //     {
// //         id: 
// //     }
// // ]

export const subjectCards: SubjectCard[] = [
    {
        id: 1,
        subject: 'Mathematics',
        rating: 3.1,
        numberOfStudents: 124,
        lastUpdated: "July, 2025",
        about: "Shapes and spatial understanding are fundamental concept that helps us understand the world around us. Shapes are the basic building blocks of objects and spatial understanding involves how those objects are positioned, arranged and related to each other in space. These concepts are crucial for cognitive development, problem solving and navigating our environment.",
        faqs: [
                { 
                    question: "What will I learn?", 
                    answer: "You'll learn fundamental concepts, practical skills, and how to build real-world projects that strengthen your understanding." 
                },
                { 
                    question: "How long is this course?", 
                    answer: "The course takes approximately 4–6 weeks to complete, depending on your pace and schedule." 
                },
                { 
                    question: "Do I need any prior experience?", 
                    answer: "No prior experience is required. The course is beginner-friendly and starts from the basics before advancing gradually." 
                },
                { 
                    question: "Will I get a certificate?", 
                    answer: "Yes, you'll receive a certificate of completion once you finish all the lessons and assessments." 
                },
                { 
                    question: "Can I learn at my own pace?", 
                    answer: "Absolutely. You can take lessons whenever it suits you—there’s no fixed schedule." 
                },
                { 
                    question: "Is there support if I get stuck?", 
                    answer: "Yes, you’ll have access to discussion forums and community support to help you with any questions or challenges." 
                }
                ],
                lessons: [
                { id: 1, title: "Identify and draw straight lines", lessonNumber: "Lesson 1" },
                { id: 2, title: "Draw horizontal and vertical lines", lessonNumber: "Lesson 2" },
                { id: 3, title: "Distinguish straight and curved lines", lessonNumber: "Lesson 3" },
                { id: 4, title: "Identify 2-D shapes", lessonNumber: "Lesson 4" },
                { id: 5, title: "Identify 3-D shapes", lessonNumber: "Lesson 5" },
                { id: 6, title: "Identify right angles and corners", lessonNumber: "Lesson 6" },
                { id: 7, title: "Recognize parallel and perpendicular lines", lessonNumber: "Lesson 7" },
                { id: 8, title: "Draw and label basic geometric figures", lessonNumber: "Lesson 8" },
                { id: 9, title: "Understand symmetry in shapes", lessonNumber: "Lesson 9" },
                { id: 10, title: "Identify shapes in real-life objects", lessonNumber: "Lesson 10" }
                ],
                reviews: [
                { user: "John D.", rating: 4, comment: "Great learning experience!" },
                { user: "Sarah M.", rating: 5, comment: "Very helpful content." },
                { user: "Michael R.", rating: 5, comment: "Well-structured lessons and easy to follow. Highly recommend!" },
                { user: "Aisha K.", rating: 4, comment: "Good course! I just wish there were more examples for advanced topics." },
                { user: "David L.", rating: 5, comment: "Learned more here in a week than I did from YouTube in a month!" },
                { user: "Emily T.", rating: 5, comment: "The visuals and explanations made everything so clear. Loved it!" }
                ],

        topics: [
            { 
                id: 1, 
                title: 'Whole Numbers (1–5)', 
                paragraph: 'Whole numbers are the set of non-negative integers, including zero.', 
                progress: 45, 
                coverImage: require('@/assets/images/whole-numbers.png') 
            },
            { 
                id: 2, 
                title: 'Ordering Numbers', 
                paragraph: 'Learn how to arrange numbers in ascending and descending order.', 
                progress: 30, 
                coverImage: require('@/assets/images/ordering-numbers.png') 
            },
            {
                id: 3,
                title: 'Basic Shapes',
                paragraph: 'Explore the properties of shapes, angles, and patterns in geometry.',
                progress: 60,
                coverImage: require('@/assets/images/shapes.png')
            },
            {
                id: 4,
                title: 'Whole Numbers (6–10)',
                progress: 20,
                paragraph: 'Practice counting and identifying whole numbers from 6 to 10.',
                coverImage: require('@/assets/images/numbers2.png')
            }
        ]
    },
    {
        id: 2,
        subject: 'English Language',
                rating: 3.1,
        numberOfStudents: 124,
        lastUpdated: "July, 2025",
        about: "Shapes and spatial understanding are fundamental concept that helps us understand the world around us. Shapes are the basic building blocks of objects and spatial understanding involves how those objects are positioned, arranged and related to each other in space. These concepts are crucial for cognitive development, problem solving and navigating our environment.",
        faqs: [
                { 
                    question: "What will I learn?", 
                    answer: "You'll learn fundamental concepts, practical skills, and how to build real-world projects that strengthen your understanding." 
                },
                { 
                    question: "How long is this course?", 
                    answer: "The course takes approximately 4–6 weeks to complete, depending on your pace and schedule." 
                },
                { 
                    question: "Do I need any prior experience?", 
                    answer: "No prior experience is required. The course is beginner-friendly and starts from the basics before advancing gradually." 
                },
                { 
                    question: "Will I get a certificate?", 
                    answer: "Yes, you'll receive a certificate of completion once you finish all the lessons and assessments." 
                },
                { 
                    question: "Can I learn at my own pace?", 
                    answer: "Absolutely. You can take lessons whenever it suits you—there’s no fixed schedule." 
                },
                { 
                    question: "Is there support if I get stuck?", 
                    answer: "Yes, you’ll have access to discussion forums and community support to help you with any questions or challenges." 
                }
                ],
                lessons: [
                { id: 1, title: "Identify and draw straight lines", lessonNumber: "Lesson 1" },
                { id: 2, title: "Draw horizontal and vertical lines", lessonNumber: "Lesson 2" },
                { id: 3, title: "Distinguish straight and curved lines", lessonNumber: "Lesson 3" },
                { id: 4, title: "Identify 2-D shapes", lessonNumber: "Lesson 4" },
                { id: 5, title: "Identify 3-D shapes", lessonNumber: "Lesson 5" },
                { id: 6, title: "Identify right angles and corners", lessonNumber: "Lesson 6" },
                { id: 7, title: "Recognize parallel and perpendicular lines", lessonNumber: "Lesson 7" },
                { id: 8, title: "Draw and label basic geometric figures", lessonNumber: "Lesson 8" },
                { id: 9, title: "Understand symmetry in shapes", lessonNumber: "Lesson 9" },
                { id: 10, title: "Identify shapes in real-life objects", lessonNumber: "Lesson 10" }
                ],
                reviews: [
                { user: "John D.", rating: 4, comment: "Great learning experience!" },
                { user: "Sarah M.", rating: 5, comment: "Very helpful content." },
                { user: "Michael R.", rating: 5, comment: "Well-structured lessons and easy to follow. Highly recommend!" },
                { user: "Aisha K.", rating: 4, comment: "Good course! I just wish there were more examples for advanced topics." },
                { user: "David L.", rating: 5, comment: "Learned more here in a week than I did from YouTube in a month!" },
                { user: "Emily T.", rating: 5, comment: "The visuals and explanations made everything so clear. Loved it!" }
                ],

        topics: [
            { 
                id: 1, 
                title: 'Grammar Basics', 
                paragraph: 'Learn about nouns, verbs, adjectives, and how they form sentences.', 
                progress: 70, 
                coverImage: require('@/assets/images/whole-numbers.png') 
            },
            { 
                id: 2, 
                title: 'Comprehension Skills', 
                paragraph: 'Understand how to read and answer comprehension passages correctly.', 
                progress: 40, 
                coverImage: require('@/assets/images/ordering-numbers.png') 
            },
            {
                id: 3,
                title: 'Vocabulary Building',
                paragraph: 'Improve your English vocabulary with common words and meanings.',
                progress: 55,
                coverImage: require('@/assets/images/shapes.png')
            },
            {
                id: 4,
                title: 'Creative Writing',
                paragraph: 'Learn how to write simple sentences, stories, and short essays.',
                progress: 30,
                coverImage: require('@/assets/images/numbers2.png')
            }
        ]
    },
    {
        id: 3,
        subject: 'Basic Science',
                rating: 3.1,
        numberOfStudents: 124,
        lastUpdated: "July, 2025",
        about: "Shapes and spatial understanding are fundamental concept that helps us understand the world around us. Shapes are the basic building blocks of objects and spatial understanding involves how those objects are positioned, arranged and related to each other in space. These concepts are crucial for cognitive development, problem solving and navigating our environment.",
        faqs: [
                { 
                    question: "What will I learn?", 
                    answer: "You'll learn fundamental concepts, practical skills, and how to build real-world projects that strengthen your understanding." 
                },
                { 
                    question: "How long is this course?", 
                    answer: "The course takes approximately 4–6 weeks to complete, depending on your pace and schedule." 
                },
                { 
                    question: "Do I need any prior experience?", 
                    answer: "No prior experience is required. The course is beginner-friendly and starts from the basics before advancing gradually." 
                },
                { 
                    question: "Will I get a certificate?", 
                    answer: "Yes, you'll receive a certificate of completion once you finish all the lessons and assessments." 
                },
                { 
                    question: "Can I learn at my own pace?", 
                    answer: "Absolutely. You can take lessons whenever it suits you—there’s no fixed schedule." 
                },
                { 
                    question: "Is there support if I get stuck?", 
                    answer: "Yes, you’ll have access to discussion forums and community support to help you with any questions or challenges." 
                }
                ],
                lessons: [
                { id: 1, title: "Identify and draw straight lines", lessonNumber: "Lesson 1" },
                { id: 2, title: "Draw horizontal and vertical lines", lessonNumber: "Lesson 2" },
                { id: 3, title: "Distinguish straight and curved lines", lessonNumber: "Lesson 3" },
                { id: 4, title: "Identify 2-D shapes", lessonNumber: "Lesson 4" },
                { id: 5, title: "Identify 3-D shapes", lessonNumber: "Lesson 5" },
                { id: 6, title: "Identify right angles and corners", lessonNumber: "Lesson 6" },
                { id: 7, title: "Recognize parallel and perpendicular lines", lessonNumber: "Lesson 7" },
                { id: 8, title: "Draw and label basic geometric figures", lessonNumber: "Lesson 8" },
                { id: 9, title: "Understand symmetry in shapes", lessonNumber: "Lesson 9" },
                { id: 10, title: "Identify shapes in real-life objects", lessonNumber: "Lesson 10" }
                ],
                reviews: [
                { user: "John D.", rating: 4, comment: "Great learning experience!" },
                { user: "Sarah M.", rating: 5, comment: "Very helpful content." },
                { user: "Michael R.", rating: 5, comment: "Well-structured lessons and easy to follow. Highly recommend!" },
                { user: "Aisha K.", rating: 4, comment: "Good course! I just wish there were more examples for advanced topics." },
                { user: "David L.", rating: 5, comment: "Learned more here in a week than I did from YouTube in a month!" },
                { user: "Emily T.", rating: 5, comment: "The visuals and explanations made everything so clear. Loved it!" }
                ],

        topics: [
            { 
                id: 1, 
                title: 'Living and Non-living Things', 
                paragraph: 'Understand what makes something living or non-living.', 
                progress: 25, 
                coverImage: require('@/assets/images/whole-numbers.png') 
            },
            { 
                id: 2, 
                title: 'The Human Body', 
                paragraph: 'Learn about body parts, functions, and the five senses.', 
                progress: 50, 
                coverImage: require('@/assets/images/ordering-numbers.png') 
            },
            {
                id: 3,
                title: 'The Solar System',
                paragraph: 'Explore the planets, sun, and moon in our solar system.',
                progress: 35,
                coverImage: require('@/assets/images/shapes.png')
            },
            {
                id: 4,
                title: 'Materials Around Us',
                paragraph: 'Identify solid, liquid, and gas materials in our environment.',
                progress: 15,
                coverImage: require('@/assets/images/numbers2.png')
            }
        ]
    },
    {
        id: 4,
        subject: 'Quantitative Reasoning',
                rating: 3.1,
        numberOfStudents: 124,
        lastUpdated: "July, 2025",
        about: "Shapes and spatial understanding are fundamental concept that helps us understand the world around us. Shapes are the basic building blocks of objects and spatial understanding involves how those objects are positioned, arranged and related to each other in space. These concepts are crucial for cognitive development, problem solving and navigating our environment.",
        faqs: [
                { 
                    question: "What will I learn?", 
                    answer: "You'll learn fundamental concepts, practical skills, and how to build real-world projects that strengthen your understanding." 
                },
                { 
                    question: "How long is this course?", 
                    answer: "The course takes approximately 4–6 weeks to complete, depending on your pace and schedule." 
                },
                { 
                    question: "Do I need any prior experience?", 
                    answer: "No prior experience is required. The course is beginner-friendly and starts from the basics before advancing gradually." 
                },
                { 
                    question: "Will I get a certificate?", 
                    answer: "Yes, you'll receive a certificate of completion once you finish all the lessons and assessments." 
                },
                { 
                    question: "Can I learn at my own pace?", 
                    answer: "Absolutely. You can take lessons whenever it suits you—there’s no fixed schedule." 
                },
                { 
                    question: "Is there support if I get stuck?", 
                    answer: "Yes, you’ll have access to discussion forums and community support to help you with any questions or challenges." 
                }
                ],
                lessons: [
                { id: 1, title: "Identify and draw straight lines", lessonNumber: "Lesson 1" },
                { id: 2, title: "Draw horizontal and vertical lines", lessonNumber: "Lesson 2" },
                { id: 3, title: "Distinguish straight and curved lines", lessonNumber: "Lesson 3" },
                { id: 4, title: "Identify 2-D shapes", lessonNumber: "Lesson 4" },
                { id: 5, title: "Identify 3-D shapes", lessonNumber: "Lesson 5" },
                { id: 6, title: "Identify right angles and corners", lessonNumber: "Lesson 6" },
                { id: 7, title: "Recognize parallel and perpendicular lines", lessonNumber: "Lesson 7" },
                { id: 8, title: "Draw and label basic geometric figures", lessonNumber: "Lesson 8" },
                { id: 9, title: "Understand symmetry in shapes", lessonNumber: "Lesson 9" },
                { id: 10, title: "Identify shapes in real-life objects", lessonNumber: "Lesson 10" }
                ],
                reviews: [
                { user: "John D.", rating: 4, comment: "Great learning experience!" },
                { user: "Sarah M.", rating: 5, comment: "Very helpful content." },
                { user: "Michael R.", rating: 5, comment: "Well-structured lessons and easy to follow. Highly recommend!" },
                { user: "Aisha K.", rating: 4, comment: "Good course! I just wish there were more examples for advanced topics." },
                { user: "David L.", rating: 5, comment: "Learned more here in a week than I did from YouTube in a month!" },
                { user: "Emily T.", rating: 5, comment: "The visuals and explanations made everything so clear. Loved it!" }
                ],

        topics: [
            { 
                id: 1, 
                title: 'Patterns and Sequences', 
                paragraph: 'Learn how to identify and complete number patterns.', 
                progress: 40, 
                coverImage: require('@/assets/images/whole-numbers.png') 
            },
            { 
                id: 2, 
                title: 'Comparing Quantities', 
                paragraph: 'Understand how to compare numbers and find differences.', 
                progress: 20, 
                coverImage: require('@/assets/images/ordering-numbers.png') 
            },
            {
                id: 3,
                title: 'Simple Word Problems',
                paragraph: 'Apply reasoning to solve real-world number problems.',
                progress: 55,
                coverImage: require('@/assets/images/shapes.png')
            },
            {
                id: 4,
                title: 'Logical Thinking',
                paragraph: 'Build problem-solving and analytical reasoning skills.',
                progress: 30,
                coverImage: require('@/assets/images/numbers2.png')
            }
        ]
    },
    {
        id: 5,
        subject: 'Verbal Reasoning',
                rating: 3.1,
        numberOfStudents: 124,
        lastUpdated: "July, 2025",
        about: "Shapes and spatial understanding are fundamental concept that helps us understand the world around us. Shapes are the basic building blocks of objects and spatial understanding involves how those objects are positioned, arranged and related to each other in space. These concepts are crucial for cognitive development, problem solving and navigating our environment.",
        faqs: [
                { 
                    question: "What will I learn?", 
                    answer: "You'll learn fundamental concepts, practical skills, and how to build real-world projects that strengthen your understanding." 
                },
                { 
                    question: "How long is this course?", 
                    answer: "The course takes approximately 4–6 weeks to complete, depending on your pace and schedule." 
                },
                { 
                    question: "Do I need any prior experience?", 
                    answer: "No prior experience is required. The course is beginner-friendly and starts from the basics before advancing gradually." 
                },
                { 
                    question: "Will I get a certificate?", 
                    answer: "Yes, you'll receive a certificate of completion once you finish all the lessons and assessments." 
                },
                { 
                    question: "Can I learn at my own pace?", 
                    answer: "Absolutely. You can take lessons whenever it suits you—there’s no fixed schedule." 
                },
                { 
                    question: "Is there support if I get stuck?", 
                    answer: "Yes, you’ll have access to discussion forums and community support to help you with any questions or challenges." 
                }
                ],
                lessons: [
                { id: 1, title: "Identify and draw straight lines", lessonNumber: "Lesson 1" },
                { id: 2, title: "Draw horizontal and vertical lines", lessonNumber: "Lesson 2" },
                { id: 3, title: "Distinguish straight and curved lines", lessonNumber: "Lesson 3" },
                { id: 4, title: "Identify 2-D shapes", lessonNumber: "Lesson 4" },
                { id: 5, title: "Identify 3-D shapes", lessonNumber: "Lesson 5" },
                { id: 6, title: "Identify right angles and corners", lessonNumber: "Lesson 6" },
                { id: 7, title: "Recognize parallel and perpendicular lines", lessonNumber: "Lesson 7" },
                { id: 8, title: "Draw and label basic geometric figures", lessonNumber: "Lesson 8" },
                { id: 9, title: "Understand symmetry in shapes", lessonNumber: "Lesson 9" },
                { id: 10, title: "Identify shapes in real-life objects", lessonNumber: "Lesson 10" }
                ],
                reviews: [
                { user: "John D.", rating: 4, comment: "Great learning experience!" },
                { user: "Sarah M.", rating: 5, comment: "Very helpful content." },
                { user: "Michael R.", rating: 5, comment: "Well-structured lessons and easy to follow. Highly recommend!" },
                { user: "Aisha K.", rating: 4, comment: "Good course! I just wish there were more examples for advanced topics." },
                { user: "David L.", rating: 5, comment: "Learned more here in a week than I did from YouTube in a month!" },
                { user: "Emily T.", rating: 5, comment: "The visuals and explanations made everything so clear. Loved it!" }
                ],

        topics: [
            { 
                id: 1, 
                title: 'Opposites and Synonyms', 
                paragraph: 'Learn words with opposite and similar meanings.', 
                progress: 45, 
                coverImage: require('@/assets/images/whole-numbers.png') 
            },
            { 
                id: 2, 
                title: 'Word Pairs', 
                paragraph: 'Understand how related words connect logically.', 
                progress: 25, 
                coverImage: require('@/assets/images/ordering-numbers.png') 
            },
            {
                id: 3,
                title: 'Sentence Completion',
                paragraph: 'Find the best word to complete a sentence meaningfully.',
                progress: 60,
                coverImage: require('@/assets/images/shapes.png')
            },
            {
                id: 4,
                title: 'Analogies',
                paragraph: 'Practice solving verbal reasoning analogies and relationships.',
                progress: 35,
                coverImage: require('@/assets/images/numbers2.png')
            }
        ]
    },
    {
        id: 6,
        subject: 'Health Education',
                rating: 3.1,
        numberOfStudents: 124,
        lastUpdated: "July, 2025",
        about: "Shapes and spatial understanding are fundamental concept that helps us understand the world around us. Shapes are the basic building blocks of objects and spatial understanding involves how those objects are positioned, arranged and related to each other in space. These concepts are crucial for cognitive development, problem solving and navigating our environment.",
        faqs: [
                { 
                    question: "What will I learn?", 
                    answer: "You'll learn fundamental concepts, practical skills, and how to build real-world projects that strengthen your understanding." 
                },
                { 
                    question: "How long is this course?", 
                    answer: "The course takes approximately 4–6 weeks to complete, depending on your pace and schedule." 
                },
                { 
                    question: "Do I need any prior experience?", 
                    answer: "No prior experience is required. The course is beginner-friendly and starts from the basics before advancing gradually." 
                },
                { 
                    question: "Will I get a certificate?", 
                    answer: "Yes, you'll receive a certificate of completion once you finish all the lessons and assessments." 
                },
                { 
                    question: "Can I learn at my own pace?", 
                    answer: "Absolutely. You can take lessons whenever it suits you—there’s no fixed schedule." 
                },
                { 
                    question: "Is there support if I get stuck?", 
                    answer: "Yes, you’ll have access to discussion forums and community support to help you with any questions or challenges." 
                }
                ],
                lessons: [
                { id: 1, title: "Identify and draw straight lines", lessonNumber: "Lesson 1" },
                { id: 2, title: "Draw horizontal and vertical lines", lessonNumber: "Lesson 2" },
                { id: 3, title: "Distinguish straight and curved lines", lessonNumber: "Lesson 3" },
                { id: 4, title: "Identify 2-D shapes", lessonNumber: "Lesson 4" },
                { id: 5, title: "Identify 3-D shapes", lessonNumber: "Lesson 5" },
                { id: 6, title: "Identify right angles and corners", lessonNumber: "Lesson 6" },
                { id: 7, title: "Recognize parallel and perpendicular lines", lessonNumber: "Lesson 7" },
                { id: 8, title: "Draw and label basic geometric figures", lessonNumber: "Lesson 8" },
                { id: 9, title: "Understand symmetry in shapes", lessonNumber: "Lesson 9" },
                { id: 10, title: "Identify shapes in real-life objects", lessonNumber: "Lesson 10" }
                ],
                reviews: [
                { user: "John D.", rating: 4, comment: "Great learning experience!" },
                { user: "Sarah M.", rating: 5, comment: "Very helpful content." },
                { user: "Michael R.", rating: 5, comment: "Well-structured lessons and easy to follow. Highly recommend!" },
                { user: "Aisha K.", rating: 4, comment: "Good course! I just wish there were more examples for advanced topics." },
                { user: "David L.", rating: 5, comment: "Learned more here in a week than I did from YouTube in a month!" },
                { user: "Emily T.", rating: 5, comment: "The visuals and explanations made everything so clear. Loved it!" }
                ],

        topics: [
            { 
                id: 1, 
                title: 'Personal Hygiene', 
                paragraph: 'Learn the importance of keeping your body clean and healthy.', 
                progress: 70, 
                coverImage: require('@/assets/images/whole-numbers.png') 
            },
            { 
                id: 2, 
                title: 'Nutrition and Food', 
                paragraph: 'Understand food groups and balanced diet essentials.', 
                progress: 45, 
                coverImage: require('@/assets/images/ordering-numbers.png') 
            },
            {
                id: 3,
                title: 'Exercise and Rest',
                paragraph: 'Know how physical activity and rest help your body grow.',
                progress: 60,
                coverImage: require('@/assets/images/shapes.png')
            },
            {
                id: 4,
                title: 'Common Diseases',
                paragraph: 'Identify common illnesses and learn simple prevention methods.',
                progress: 20,
                coverImage: require('@/assets/images/numbers2.png')
            }
        ]
    },
    {
        id: 7,
        subject: 'Social Studies',
               rating: 3.1,
        numberOfStudents: 124,
        lastUpdated: "July, 2025",
        about: "Shapes and spatial understanding are fundamental concept that helps us understand the world around us. Shapes are the basic building blocks of objects and spatial understanding involves how those objects are positioned, arranged and related to each other in space. These concepts are crucial for cognitive development, problem solving and navigating our environment.",
        faqs: [
                { 
                    question: "What will I learn?", 
                    answer: "You'll learn fundamental concepts, practical skills, and how to build real-world projects that strengthen your understanding." 
                },
                { 
                    question: "How long is this course?", 
                    answer: "The course takes approximately 4–6 weeks to complete, depending on your pace and schedule." 
                },
                { 
                    question: "Do I need any prior experience?", 
                    answer: "No prior experience is required. The course is beginner-friendly and starts from the basics before advancing gradually." 
                },
                { 
                    question: "Will I get a certificate?", 
                    answer: "Yes, you'll receive a certificate of completion once you finish all the lessons and assessments." 
                },
                { 
                    question: "Can I learn at my own pace?", 
                    answer: "Absolutely. You can take lessons whenever it suits you—there’s no fixed schedule." 
                },
                { 
                    question: "Is there support if I get stuck?", 
                    answer: "Yes, you’ll have access to discussion forums and community support to help you with any questions or challenges." 
                }
                ],
                lessons: [
                { id: 1, title: "Identify and draw straight lines", lessonNumber: "Lesson 1" },
                { id: 2, title: "Draw horizontal and vertical lines", lessonNumber: "Lesson 2" },
                { id: 3, title: "Distinguish straight and curved lines", lessonNumber: "Lesson 3" },
                { id: 4, title: "Identify 2-D shapes", lessonNumber: "Lesson 4" },
                { id: 5, title: "Identify 3-D shapes", lessonNumber: "Lesson 5" },
                { id: 6, title: "Identify right angles and corners", lessonNumber: "Lesson 6" },
                { id: 7, title: "Recognize parallel and perpendicular lines", lessonNumber: "Lesson 7" },
                { id: 8, title: "Draw and label basic geometric figures", lessonNumber: "Lesson 8" },
                { id: 9, title: "Understand symmetry in shapes", lessonNumber: "Lesson 9" },
                { id: 10, title: "Identify shapes in real-life objects", lessonNumber: "Lesson 10" }
                ],
                reviews: [
                { user: "John D.", rating: 4, comment: "Great learning experience!" },
                { user: "Sarah M.", rating: 5, comment: "Very helpful content." },
                { user: "Michael R.", rating: 5, comment: "Well-structured lessons and easy to follow. Highly recommend!" },
                { user: "Aisha K.", rating: 4, comment: "Good course! I just wish there were more examples for advanced topics." },
                { user: "David L.", rating: 5, comment: "Learned more here in a week than I did from YouTube in a month!" },
                { user: "Emily T.", rating: 5, comment: "The visuals and explanations made everything so clear. Loved it!" }
                ],

        topics: [
            { 
                id: 1, 
                title: 'Family and Community', 
                paragraph: 'Understand family types and roles in a community.', 
                progress: 50, 
                coverImage: require('@/assets/images/whole-numbers.png') 
            },
            { 
                id: 2, 
                title: 'Culture and Traditions', 
                paragraph: 'Learn about different Nigerian cultures and customs.', 
                progress: 30, 
                coverImage: require('@/assets/images/ordering-numbers.png') 
            },
            {
                id: 3,
                title: 'Civic Responsibilities',
                paragraph: 'Know your duties and responsibilities as a citizen.',
                progress: 40,
                coverImage: require('@/assets/images/shapes.png')
            },
            {
                id: 4,
                title: 'Government and Leadership',
                paragraph: 'Understand how government works and why leaders are important.',
                progress: 25,
                coverImage: require('@/assets/images/numbers2.png')
            }
        ]
    },
    {
        id: 8,
        subject: 'Home Economics',
        rating: 3.1,
        numberOfStudents: 124,
        lastUpdated: "July, 2025",
        about: "Shapes and spatial understanding are fundamental concept that helps us understand the world around us. Shapes are the basic building blocks of objects and spatial understanding involves how those objects are positioned, arranged and related to each other in space. These concepts are crucial for cognitive development, problem solving and navigating our environment.",
        faqs: [
                { 
                    question: "What will I learn?", 
                    answer: "You'll learn fundamental concepts, practical skills, and how to build real-world projects that strengthen your understanding." 
                },
                { 
                    question: "How long is this course?", 
                    answer: "The course takes approximately 4–6 weeks to complete, depending on your pace and schedule." 
                },
                { 
                    question: "Do I need any prior experience?", 
                    answer: "No prior experience is required. The course is beginner-friendly and starts from the basics before advancing gradually." 
                },
                { 
                    question: "Will I get a certificate?", 
                    answer: "Yes, you'll receive a certificate of completion once you finish all the lessons and assessments." 
                },
                { 
                    question: "Can I learn at my own pace?", 
                    answer: "Absolutely. You can take lessons whenever it suits you—there’s no fixed schedule." 
                },
                { 
                    question: "Is there support if I get stuck?", 
                    answer: "Yes, you’ll have access to discussion forums and community support to help you with any questions or challenges." 
                }
                ],
                lessons: [
                { id: 1, title: "Identify and draw straight lines", lessonNumber: "Lesson 1" },
                { id: 2, title: "Draw horizontal and vertical lines", lessonNumber: "Lesson 2" },
                { id: 3, title: "Distinguish straight and curved lines", lessonNumber: "Lesson 3" },
                { id: 4, title: "Identify 2-D shapes", lessonNumber: "Lesson 4" },
                { id: 5, title: "Identify 3-D shapes", lessonNumber: "Lesson 5" },
                { id: 6, title: "Identify right angles and corners", lessonNumber: "Lesson 6" },
                { id: 7, title: "Recognize parallel and perpendicular lines", lessonNumber: "Lesson 7" },
                { id: 8, title: "Draw and label basic geometric figures", lessonNumber: "Lesson 8" },
                { id: 9, title: "Understand symmetry in shapes", lessonNumber: "Lesson 9" },
                { id: 10, title: "Identify shapes in real-life objects", lessonNumber: "Lesson 10" }
                ],
                reviews: [
                { user: "John D.", rating: 4, comment: "Great learning experience!" },
                { user: "Sarah M.", rating: 5, comment: "Very helpful content." },
                { user: "Michael R.", rating: 5, comment: "Well-structured lessons and easy to follow. Highly recommend!" },
                { user: "Aisha K.", rating: 4, comment: "Good course! I just wish there were more examples for advanced topics." },
                { user: "David L.", rating: 5, comment: "Learned more here in a week than I did from YouTube in a month!" },
                { user: "Emily T.", rating: 5, comment: "The visuals and explanations made everything so clear. Loved it!" }
                ],
        topics: [
            { 
                id: 1, 
                title: 'Introduction to Home Economics', 
                paragraph: 'Learn the basics of managing home and resources effectively.', 
                progress: 55, 
                coverImage: require('@/assets/images/whole-numbers.png') 
            },
            { 
                id: 2, 
                title: 'Food and Nutrition', 
                paragraph: 'Understand food preparation, hygiene, and dietary balance.', 
                progress: 35, 
                coverImage: require('@/assets/images/ordering-numbers.png') 
            },
            {
                id: 3,
                title: 'Clothing and Sewing',
                paragraph: 'Discover how to care for clothes and basic hand-sewing techniques.',
                progress: 40,
                coverImage: require('@/assets/images/shapes.png')
            },
            {
                id: 4,
                title: 'Household Management',
                paragraph: 'Learn about budgeting, saving, and home maintenance.',
                progress: 30,
                coverImage: require('@/assets/images/numbers2.png')
            }
        ]
    }
]