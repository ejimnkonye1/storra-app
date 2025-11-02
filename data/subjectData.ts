export interface Topic {
    id: number
    title: string
    paragraph: string
    progress: number
    coverImage: any
}

export interface SubjectCard {
    id: number
    subject: string
    topics: Topic[]
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