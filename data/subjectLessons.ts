// data/lessonData.ts
export interface LessonContent {
  introduction: {
    title: string;
    points: string[];
  };
  properties: {
    title: string;
    points: string[];
  };
  types: {
    title: string;
    points: string[];
  };
  howToIdentify: {
    title: string;
    points: string[];
  };
}

export const dummyLesson = {
  id: 1,
  title: "Identify and Draw Straight Lines - Lesson 1",
  lessonNumber: "Lesson 1",
  lastUpdated: "July, 2025",
  views: 31,
  downloads: 124,
  coverImage: require('../assets/images/whole-numbers.png'), // Use any placeholder image
  content: {
    introduction: {
      title: "What is a straight Line",
      points: [
        "A straight line is the shortest distance between two points",
        "It goes in one direction without curving",
        "It can extend infinitely in both directions"
      ]
    },
    properties: {
      title: "Properties of a Straight Line",
      points: [
        "No curves or bends - it is always flat",
        "Has no thickness - Only length",
        "It can be horizontal, vertical or slanted (Diagonal)"
      ]
    },
    types: {
      title: "Types of Straight Line",
      points: [
        "Horizontal Lines - It goes from left to right (Like the horizon)",
        "Vertical Lines - It goes up and down",
        "Slanted Lines - It goes at an angle"
      ]
    },
    howToIdentify: {
      title: "How to Identify a Straight Line",
      points: [
        "Look for a path that doesn't change direction",
        "Place a ruler along the path. If it matches perfectly, it's a straight line"
      ]
    }
  }
};