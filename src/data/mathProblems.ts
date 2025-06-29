import { MathProblem, ClockTime } from '../types';

// Utility function to shuffle arrays
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Expanded Long Division Problems (20 problems)
const longDivisionProblemsBase: MathProblem[] = [
  { id: '1', question: '345 ÷ 9', answer: 38, type: 'long-division', options: [38, 35, 42, 40] },
  { id: '2', question: '486 ÷ 6', answer: 81, type: 'long-division', options: [81, 78, 84, 76] },
  { id: '3', question: '672 ÷ 8', answer: 84, type: 'long-division', options: [84, 82, 86, 88] },
  { id: '4', question: '459 ÷ 7', answer: 65, type: 'long-division', options: [65, 63, 67, 69] },
  { id: '5', question: '936 ÷ 12', answer: 78, type: 'long-division', options: [78, 76, 80, 74] },
  { id: '6', question: '564 ÷ 4', answer: 141, type: 'long-division', options: [141, 139, 143, 137] },
  { id: '7', question: '735 ÷ 5', answer: 147, type: 'long-division', options: [147, 145, 149, 143] },
  { id: '8', question: '896 ÷ 8', answer: 112, type: 'long-division', options: [112, 110, 114, 108] },
  { id: '9', question: '693 ÷ 9', answer: 77, type: 'long-division', options: [77, 75, 79, 73] },
  { id: '10', question: '588 ÷ 6', answer: 98, type: 'long-division', options: [98, 96, 100, 94] },
  { id: '11', question: '847 ÷ 7', answer: 121, type: 'long-division', options: [121, 119, 123, 117] },
  { id: '12', question: '1248 ÷ 12', answer: 104, type: 'long-division', options: [104, 102, 106, 100] },
  { id: '13', question: '455 ÷ 5', answer: 91, type: 'long-division', options: [91, 89, 93, 87] },
  { id: '14', question: '768 ÷ 8', answer: 96, type: 'long-division', options: [96, 94, 98, 92] },
  { id: '15', question: '639 ÷ 9', answer: 71, type: 'long-division', options: [71, 69, 73, 67] },
  { id: '16', question: '714 ÷ 6', answer: 119, type: 'long-division', options: [119, 117, 121, 115] },
  { id: '17', question: '1001 ÷ 7', answer: 143, type: 'long-division', options: [143, 141, 145, 139] },
  { id: '18', question: '540 ÷ 4', answer: 135, type: 'long-division', options: [135, 133, 137, 131] },
  { id: '19', question: '1155 ÷ 11', answer: 105, type: 'long-division', options: [105, 103, 107, 101] },
  { id: '20', question: '1320 ÷ 12', answer: 110, type: 'long-division', options: [110, 108, 112, 106] }
];

// Expanded Multiplication Problems (25 problems)
const multiplicationProblemsBase: MathProblem[] = [
  { id: '1', question: '7 × 8', answer: 56, type: 'multiplication', options: [56, 54, 58, 52] },
  { id: '2', question: '9 × 12', answer: 108, type: 'multiplication', options: [108, 106, 110, 104] },
  { id: '3', question: '6 × 11', answer: 66, type: 'multiplication', options: [66, 64, 68, 62] },
  { id: '4', question: '8 × 9', answer: 72, type: 'multiplication', options: [72, 70, 74, 68] },
  { id: '5', question: '12 × 12', answer: 144, type: 'multiplication', options: [144, 142, 146, 140] },
  { id: '6', question: '7 × 6', answer: 42, type: 'multiplication', options: [42, 40, 44, 38] },
  { id: '7', question: '8 × 7', answer: 56, type: 'multiplication', options: [56, 54, 58, 52] },
  { id: '8', question: '9 × 6', answer: 54, type: 'multiplication', options: [54, 52, 56, 50] },
  { id: '9', question: '11 × 8', answer: 88, type: 'multiplication', options: [88, 86, 90, 84] },
  { id: '10', question: '7 × 9', answer: 63, type: 'multiplication', options: [63, 61, 65, 59] },
  { id: '11', question: '6 × 8', answer: 48, type: 'multiplication', options: [48, 46, 50, 44] },
  { id: '12', question: '12 × 7', answer: 84, type: 'multiplication', options: [84, 82, 86, 80] },
  { id: '13', question: '9 × 8', answer: 72, type: 'multiplication', options: [72, 70, 74, 68] },
  { id: '14', question: '11 × 9', answer: 99, type: 'multiplication', options: [99, 97, 101, 95] },
  { id: '15', question: '6 × 7', answer: 42, type: 'multiplication', options: [42, 40, 44, 38] },
  { id: '16', question: '8 × 11', answer: 88, type: 'multiplication', options: [88, 86, 90, 84] },
  { id: '17', question: '12 × 9', answer: 108, type: 'multiplication', options: [108, 106, 110, 104] },
  { id: '18', question: '7 × 11', answer: 77, type: 'multiplication', options: [77, 75, 79, 73] },
  { id: '19', question: '8 × 12', answer: 96, type: 'multiplication', options: [96, 94, 98, 92] },
  { id: '20', question: '9 × 11', answer: 99, type: 'multiplication', options: [99, 97, 101, 95] },
  { id: '21', question: '6 × 9', answer: 54, type: 'multiplication', options: [54, 52, 56, 50] },
  { id: '22', question: '7 × 12', answer: 84, type: 'multiplication', options: [84, 82, 86, 80] },
  { id: '23', question: '8 × 6', answer: 48, type: 'multiplication', options: [48, 46, 50, 44] },
  { id: '24', question: '11 × 11', answer: 121, type: 'multiplication', options: [121, 119, 123, 117] },
  { id: '25', question: '12 × 8', answer: 96, type: 'multiplication', options: [96, 94, 98, 92] }
];

// Expanded Addition Problems (20 problems)
const additionProblemsBase: MathProblem[] = [
  { id: '1', question: '45 + 37', answer: 82, type: 'addition', options: [82, 80, 84, 78] },
  { id: '2', question: '156 + 247', answer: 403, type: 'addition', options: [403, 401, 405, 399] },
  { id: '3', question: '89 + 56', answer: 145, type: 'addition', options: [145, 143, 147, 141] },
  { id: '4', question: '234 + 189', answer: 423, type: 'addition', options: [423, 421, 425, 419] },
  { id: '5', question: '67 + 48', answer: 115, type: 'addition', options: [115, 113, 117, 111] },
  { id: '6', question: '123 + 456', answer: 579, type: 'addition', options: [579, 577, 581, 575] },
  { id: '7', question: '78 + 94', answer: 172, type: 'addition', options: [172, 170, 174, 168] },
  { id: '8', question: '345 + 267', answer: 612, type: 'addition', options: [612, 610, 614, 608] },
  { id: '9', question: '59 + 73', answer: 132, type: 'addition', options: [132, 130, 134, 128] },
  { id: '10', question: '198 + 356', answer: 554, type: 'addition', options: [554, 552, 556, 550] },
  { id: '11', question: '84 + 67', answer: 151, type: 'addition', options: [151, 149, 153, 147] },
  { id: '12', question: '276 + 189', answer: 465, type: 'addition', options: [465, 463, 467, 461] },
  { id: '13', question: '93 + 58', answer: 151, type: 'addition', options: [151, 149, 153, 147] },
  { id: '14', question: '167 + 234', answer: 401, type: 'addition', options: [401, 399, 403, 397] },
  { id: '15', question: '76 + 85', answer: 161, type: 'addition', options: [161, 159, 163, 157] },
  { id: '16', question: '298 + 147', answer: 445, type: 'addition', options: [445, 443, 447, 441] },
  { id: '17', question: '65 + 79', answer: 144, type: 'addition', options: [144, 142, 146, 140] },
  { id: '18', question: '356 + 278', answer: 634, type: 'addition', options: [634, 632, 636, 630] },
  { id: '19', question: '87 + 96', answer: 183, type: 'addition', options: [183, 181, 185, 179] },
  { id: '20', question: '245 + 367', answer: 612, type: 'addition', options: [612, 610, 614, 608] }
];

// Expanded Subtraction Problems (20 problems)
const subtractionProblemsBase: MathProblem[] = [
  { id: '1', question: '73 - 28', answer: 45, type: 'subtraction', options: [45, 43, 47, 41] },
  { id: '2', question: '154 - 67', answer: 87, type: 'subtraction', options: [87, 85, 89, 83] },
  { id: '3', question: '200 - 143', answer: 57, type: 'subtraction', options: [57, 55, 59, 53] },
  { id: '4', question: '185 - 96', answer: 89, type: 'subtraction', options: [89, 87, 91, 85] },
  { id: '5', question: '92 - 47', answer: 45, type: 'subtraction', options: [45, 43, 47, 41] },
  { id: '6', question: '167 - 89', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] },
  { id: '7', question: '234 - 156', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] },
  { id: '8', question: '145 - 67', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] },
  { id: '9', question: '186 - 98', answer: 88, type: 'subtraction', options: [88, 86, 90, 84] },
  { id: '10', question: '273 - 185', answer: 88, type: 'subtraction', options: [88, 86, 90, 84] },
  { id: '11', question: '156 - 79', answer: 77, type: 'subtraction', options: [77, 75, 79, 73] },
  { id: '12', question: '245 - 167', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] },
  { id: '13', question: '134 - 56', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] },
  { id: '14', question: '298 - 219', answer: 79, type: 'subtraction', options: [79, 77, 81, 75] },
  { id: '15', question: '167 - 89', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] },
  { id: '16', question: '356 - 278', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] },
  { id: '17', question: '123 - 45', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] },
  { id: '18', question: '234 - 147', answer: 87, type: 'subtraction', options: [87, 85, 89, 83] },
  { id: '19', question: '189 - 94', answer: 95, type: 'subtraction', options: [95, 93, 97, 91] },
  { id: '20', question: '267 - 189', answer: 78, type: 'subtraction', options: [78, 76, 80, 74] }
];

// Expanded Clock Times (25 different times)
const clockTimesBase: ClockTime[] = [
  { hour: 3, minute: 15, display: '3:15' },
  { hour: 7, minute: 30, display: '7:30' },
  { hour: 12, minute: 0, display: '12:00' },
  { hour: 9, minute: 45, display: '9:45' },
  { hour: 6, minute: 10, display: '6:10' },
  { hour: 2, minute: 25, display: '2:25' },
  { hour: 11, minute: 50, display: '11:50' },
  { hour: 4, minute: 35, display: '4:35' },
  { hour: 1, minute: 0, display: '1:00' },
  { hour: 8, minute: 15, display: '8:15' },
  { hour: 5, minute: 30, display: '5:30' },
  { hour: 10, minute: 45, display: '10:45' },
  { hour: 3, minute: 0, display: '3:00' },
  { hour: 6, minute: 20, display: '6:20' },
  { hour: 9, minute: 5, display: '9:05' },
  { hour: 12, minute: 30, display: '12:30' },
  { hour: 2, minute: 40, display: '2:40' },
  { hour: 7, minute: 15, display: '7:15' },
  { hour: 4, minute: 0, display: '4:00' },
  { hour: 11, minute: 25, display: '11:25' },
  { hour: 8, minute: 45, display: '8:45' },
  { hour: 1, minute: 30, display: '1:30' },
  { hour: 5, minute: 10, display: '5:10' },
  { hour: 10, minute: 20, display: '10:20' },
  { hour: 6, minute: 0, display: '6:00' }
];

// Export randomized versions
export const longDivisionProblems = shuffleArray(longDivisionProblemsBase);
export const multiplicationProblems = shuffleArray(multiplicationProblemsBase);
export const additionProblems = shuffleArray(additionProblemsBase);
export const subtractionProblems = shuffleArray(subtractionProblemsBase);
export const clockTimes = shuffleArray(clockTimesBase);

// Fraction problems remain the same but shuffled
export const fractionProblems: MathProblem[] = shuffleArray([
  { id: '1', question: 'If you eat 2 slices of pizza out of 8 total slices, what fraction did you eat?', answer: 0.25, type: 'fraction', options: [0.25, 0.5, 0.33, 0.75] },
  { id: '2', question: 'Sarah has 3/4 of a chocolate bar. What decimal is this?', answer: 0.75, type: 'fraction', options: [0.75, 0.25, 0.5, 0.33] },
  { id: '3', question: 'If 1/2 of the class are boys and there are 24 students, how many boys?', answer: 12, type: 'fraction', options: [12, 8, 16, 10] },
  { id: '4', question: 'What is 1/4 as a decimal?', answer: 0.25, type: 'fraction', options: [0.25, 0.5, 0.75, 0.33] },
  { id: '5', question: 'If you have 3/5 of a dollar, how many cents do you have?', answer: 60, type: 'fraction', options: [60, 50, 75, 40] },
  { id: '6', question: 'What fraction of an hour is 15 minutes?', answer: 0.25, type: 'fraction', options: [0.25, 0.5, 0.33, 0.75] }
]);