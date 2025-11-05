// data/quizData.ts
export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: number;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'matching_pair';
  question: string;
  options?: QuizOption[];
  pairs?: { left: string; right: string }[];
  correctAnswer?: string;
  image?: any;
}

export interface Quiz {
  id: string;
  title: string;
  subtitle: string;
  coverImage: any;
  totalPoints: number;
  totalQuestions: number;
  estimatedTime: string;
  status: 'new' | 'incomplete' | 'retake' | 'completed';
  questions: QuizQuestion[];
}

export const quizzes: Quiz[] = [
  // NEW QUIZZES
  {
    id: '1',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'new',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'A cube has six sides of equal length. If one face of the cube is painted red and then the cube is cut into 64 smaller, equal-sized cubes, how many of the smaller cubes will have exactly one red face?',
        options: [
          { id: 'A', text: '8', isCorrect: false },
          { id: 'B', text: '12', isCorrect: true },
          { id: 'C', text: '24', isCorrect: false },
          { id: 'D', text: '36', isCorrect: false },
        ],
      },
      {
        id: 2,
        type: 'true_false',
        question: 'A cylinder has two curved surfaces and no flat faces.',
        options: [
          { id: 'true', text: 'True', isCorrect: false },
          { id: 'false', text: 'False', isCorrect: true },
        ],
      },
      {
        id: 3,
        type: 'short_answer',
        question: 'How many edges does a rectangular prism (cuboid) have?',
        correctAnswer: '12',
      },
      {
        id: 4,
        type: 'matching_pair',
        question: 'Match each shape with the correct number of sides.',
        pairs: [
          { left: 'Triangle', right: '6 sides' },
          { left: 'Pentagon', right: '4 sides' },
          { left: 'Square', right: '3 sides' },
          { left: 'Hexagon', right: '5 sides' },
        ],
      },
      {
        id: 5,
        type: 'multiple_choice',
        question: 'Which 3D shape has exactly one curved surface and one flat circular base?',
        options: [
          { id: 'A', text: 'Sphere', isCorrect: false },
          { id: 'B', text: 'Cone', isCorrect: true },
          { id: 'C', text: 'Cylinder', isCorrect: false },
          { id: 'D', text: 'Pyramid', isCorrect: false },
        ],
      },
      {
        id: 6,
        type: 'true_false',
        question: 'All rectangles are squares, but not all squares are rectangles.',
        options: [
          { id: 'true', text: 'True', isCorrect: false },
          { id: 'false', text: 'False', isCorrect: true },
        ],
      },
      {
        id: 7,
        type: 'short_answer',
        question: 'What is the total number of vertices in a triangular pyramid?',
        correctAnswer: '4',
      },
      {
        id: 8,
        type: 'multiple_choice',
        question: 'A square has all sides of equal length. If one face of the cube is painted red and then the cube is cut into 64 smaller, equal-sized cubes, how many of the smaller cubes will have exactly one red face?',
        options: [
          { id: 'A', text: '8', isCorrect: false },
          { id: 'B', text: '12', isCorrect: true },
          { id: 'C', text: '24', isCorrect: false },
          { id: 'D', text: '36', isCorrect: false },
        ],
      },
      {
        id: 9,
        type: 'matching_pair',
        question: 'Match each 3D shape with its number of faces.',
        pairs: [
          { left: 'Cube', right: '5 faces' },
          { left: 'Triangular Pyramid', right: '6 faces' },
          { left: 'Rectangular Prism', right: '4 faces' },
          { left: 'Square Pyramid', right: '5 faces' },
        ],
      },
      {
        id: 10,
        type: 'true_false',
        question: 'A pentagon has more sides than a hexagon.',
        options: [
          { id: 'true', text: 'True', isCorrect: false },
          { id: 'false', text: 'False', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'new',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question for People & Culture quiz',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
          { id: 'C', text: 'Option C', isCorrect: false },
          { id: 'D', text: 'Option D', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'new',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'new',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'new',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'new',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },

  // INCOMPLETE QUIZZES
  {
    id: '7',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '8',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '9',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '10',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '11',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '12',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '13',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '14',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '15',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '16',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'incomplete',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },

  // RETAKE QUIZZES
  {
    id: '17',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'retake',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '18',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'retake',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '19',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'retake',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '20',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'retake',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '21',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'retake',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '22',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'retake',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '23',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'retake',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '24',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'retake',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },

  // COMPLETED QUIZZES
  {
    id: '25',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'completed',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '26',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'completed',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '27',
    title: 'Shapes and Spatial Understanding',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'completed',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
  {
    id: '28',
    title: 'People & Culture Mastery',
    subtitle: 'Mathematics: Module 10 Quiz',
    coverImage: require('../assets/images/shapes.png'),
    totalPoints: 20,
    totalQuestions: 10,
    estimatedTime: '20mins',
    status: 'completed',
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Sample question',
        options: [
          { id: 'A', text: 'Option A', isCorrect: false },
          { id: 'B', text: 'Option B', isCorrect: true },
        ],
      },
    ],
  },
];