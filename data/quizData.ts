export interface Question {
  id: number;
  type: "short-answer" | "multiple-choice" | "true-false" | "matching-pair";
  text: string;
  options?: string[];
  answer?: string;
  pairs?: { left: string; right: string }[];
}

export interface Quiz {
  id: number;
  title: string;
  subject: string;
  category: string;
  points: number;
  questionsCount: number;
  duration: string;
  questions: Question[];
}

export const quizData: Quiz[] = [
  {
    id: 1,
    title: "Shapes and Spatial Understanding",
    subject: "Mathematics: Module 10 Quiz",
    category: "New",
    points: 20,
    questionsCount: 10,
    duration: "2 mins",
    questions: [
      {
        id: 1,
        type: "short-answer",
        text: "How many edges does a rectangular prism (cuboid) have?",
        answer: "12",
      },
      {
        id: 2,
        type: "multiple-choice",
        text: "A cube has all sides of equal length. Four faces of the cube are painted red. How many smaller cubes will have exactly one red face?",
        options: ["8", "12", "16", "24"],
        answer: "24",
      },
      {
        id: 3,
        type: "true-false",
        text: "A cylinder has two curved surfaces and no flat faces.",
        options: ["True", "False"],
        answer: "False",
      },
      {
        id: 4,
        type: "matching-pair",
        text: "Match each shape with the correct number of sides.",
        pairs: [
          { left: "Triangle", right: "3 sides" },
          { left: "Square", right: "4 sides" },
          { left: "Pentagon", right: "5 sides" },
          { left: "Hexagon", right: "6 sides" },
        ],
      },
      {
        id: 5,
        type: "multiple-choice",
        text: "Which of the following shapes has no edges?",
        options: ["Cube", "Sphere", "Cylinder", "Cone"],
        answer: "Sphere",
      },
      {
        id: 6,
        type: "true-false",
        text: "A square is a type of rectangle.",
        options: ["True", "False"],
        answer: "True",
      },
      {
        id: 7,
        type: "short-answer",
        text: "How many faces does a triangular prism have?",
        answer: "5",
      },
      {
        id: 8,
        type: "multiple-choice",
        text: "Which of the following 3D shapes has a circular base and one vertex?",
        options: ["Cube", "Cylinder", "Cone", "Sphere"],
        answer: "Cone",
      },
      {
        id: 9,
        type: "matching-pair",
        text: "Match each solid shape with its number of faces.",
        pairs: [
          { left: "Cube", right: "6 faces" },
          { left: "Rectangular Prism", right: "6 faces" },
          { left: "Cylinder", right: "3 faces" },
          { left: "Pyramid", right: "5 faces" },
        ],
      },
      {
        id: 10,
        type: "true-false",
        text: "All rectangles are squares.",
        options: ["True", "False"],
        answer: "False",
      },
    ],
  },
];
