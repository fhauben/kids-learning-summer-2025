export interface ScienceQuestion {
  id: string;
  question: string;
  answer: string;
  options: string[];
  type: 'states-of-matter' | 'simple-machines' | 'animal-habitats';
  explanation?: string;
}

export interface MatterState {
  name: string;
  description: string;
  properties: string[];
  examples: string[];
  particleBehavior: string;
  temperature: string;
}

export interface SimpleMachine {
  name: string;
  description: string;
  examples: string[];
  howItWorks: string;
  mechanicalAdvantage: string;
}

export interface AnimalHabitat {
  name: string;
  description: string;
  climate: string;
  animals: string[];
  plants: string[];
  adaptations: string[];
}

// States of Matter Data
export const matterStates: MatterState[] = [
  {
    name: 'Solid',
    description: 'Matter with a definite shape and volume',
    properties: ['Definite shape', 'Definite volume', 'Particles are tightly packed', 'Particles vibrate in place'],
    examples: ['Ice', 'Rock', 'Wood', 'Metal', 'Book'],
    particleBehavior: 'Particles are close together and vibrate in fixed positions',
    temperature: 'Below melting point'
  },
  {
    name: 'Liquid',
    description: 'Matter with a definite volume but no definite shape',
    properties: ['No definite shape', 'Definite volume', 'Particles can slide past each other', 'Takes shape of container'],
    examples: ['Water', 'Milk', 'Juice', 'Oil', 'Honey'],
    particleBehavior: 'Particles are close together but can move around each other',
    temperature: 'Between melting and boiling point'
  },
  {
    name: 'Gas',
    description: 'Matter with no definite shape or volume',
    properties: ['No definite shape', 'No definite volume', 'Particles move freely', 'Fills any container'],
    examples: ['Air', 'Steam', 'Helium', 'Carbon dioxide', 'Oxygen'],
    particleBehavior: 'Particles are far apart and move quickly in all directions',
    temperature: 'Above boiling point'
  }
];

// States of Matter Questions
export const statesOfMatterQuestions: ScienceQuestion[] = [
  {
    id: '1',
    question: 'Which state of matter has a definite shape and volume?',
    answer: 'Solid',
    options: ['Solid', 'Liquid', 'Gas', 'Plasma'],
    type: 'states-of-matter',
    explanation: 'Solids have a definite shape and volume because their particles are tightly packed and vibrate in fixed positions.'
  },
  {
    id: '2',
    question: 'What happens to water when it freezes?',
    answer: 'It changes from liquid to solid',
    options: ['It changes from liquid to solid', 'It changes from solid to liquid', 'It changes from gas to liquid', 'It stays the same'],
    type: 'states-of-matter',
    explanation: 'When water freezes, it changes from a liquid to a solid state. The particles slow down and form a crystal structure.'
  },
  {
    id: '3',
    question: 'Which of these is an example of a gas?',
    answer: 'Air',
    options: ['Air', 'Ice', 'Water', 'Rock'],
    type: 'states-of-matter',
    explanation: 'Air is a mixture of gases (mainly nitrogen and oxygen) that has no definite shape or volume.'
  },
  {
    id: '4',
    question: 'What happens to particles when matter is heated?',
    answer: 'They move faster',
    options: ['They move faster', 'They move slower', 'They stop moving', 'They change color'],
    type: 'states-of-matter',
    explanation: 'When matter is heated, the particles gain energy and move faster, which can cause phase changes.'
  },
  {
    id: '5',
    question: 'Which state of matter takes the shape of its container?',
    answer: 'Both liquid and gas',
    options: ['Solid only', 'Liquid only', 'Gas only', 'Both liquid and gas'],
    type: 'states-of-matter',
    explanation: 'Both liquids and gases take the shape of their container because their particles can move freely.'
  },
  {
    id: '6',
    question: 'What is the process called when a solid turns into a liquid?',
    answer: 'Melting',
    options: ['Melting', 'Freezing', 'Evaporation', 'Condensation'],
    type: 'states-of-matter',
    explanation: 'Melting is the process where a solid changes to a liquid when heat is added.'
  },
  {
    id: '7',
    question: 'Which of these has the most tightly packed particles?',
    answer: 'Ice',
    options: ['Ice', 'Water', 'Steam', 'They are all the same'],
    type: 'states-of-matter',
    explanation: 'Ice (solid) has the most tightly packed particles, while steam (gas) has the most spread out particles.'
  },
  {
    id: '8',
    question: 'What happens when you boil water?',
    answer: 'It changes from liquid to gas',
    options: ['It changes from liquid to gas', 'It changes from gas to liquid', 'It changes from solid to liquid', 'It disappears'],
    type: 'states-of-matter',
    explanation: 'When water boils, it changes from a liquid to a gas (water vapor) as the particles gain enough energy to break free.'
  }
];

// Simple Machines Data
export const simpleMachines: SimpleMachine[] = [
  {
    name: 'Lever',
    description: 'A rigid bar that pivots around a fixed point called a fulcrum',
    examples: ['Seesaw', 'Scissors', 'Crowbar', 'Baseball bat', 'Door'],
    howItWorks: 'Uses a fulcrum to multiply force or change the direction of force',
    mechanicalAdvantage: 'Can multiply force when the effort arm is longer than the load arm'
  },
  {
    name: 'Pulley',
    description: 'A wheel with a groove that holds a rope or cable',
    examples: ['Flagpole', 'Window blinds', 'Crane', 'Well bucket', 'Zip line'],
    howItWorks: 'Changes the direction of force and can multiply force when multiple pulleys are used',
    mechanicalAdvantage: 'Can reduce the amount of force needed to lift heavy objects'
  },
  {
    name: 'Wheel and Axle',
    description: 'A wheel attached to a smaller cylinder (axle) that rotates together',
    examples: ['Car wheel', 'Doorknob', 'Screwdriver', 'Bicycle', 'Roller skates'],
    howItWorks: 'The wheel rotates around the axle, making it easier to move objects',
    mechanicalAdvantage: 'Makes it easier to move heavy objects by reducing friction'
  },
  {
    name: 'Inclined Plane',
    description: 'A flat surface that is higher at one end than the other',
    examples: ['Ramp', 'Stairs', 'Slide', 'Road up a hill', 'Wedge'],
    howItWorks: 'Reduces the force needed to move objects by spreading the work over a longer distance',
    mechanicalAdvantage: 'Makes it easier to lift heavy objects by using less force over a longer distance'
  },
  {
    name: 'Wedge',
    description: 'Two inclined planes joined back to back',
    examples: ['Knife', 'Axe', 'Nail', 'Doorstop', 'Chisel'],
    howItWorks: 'Concentrates force into a small area to split or hold objects',
    mechanicalAdvantage: 'Multiplies force to cut or split materials'
  },
  {
    name: 'Screw',
    description: 'An inclined plane wrapped around a cylinder',
    examples: ['Screw', 'Light bulb', 'Jar lid', 'Bottle cap', 'Spiral staircase'],
    howItWorks: 'Uses rotational force to hold objects together or lift materials',
    mechanicalAdvantage: 'Can hold objects together tightly with less force'
  }
];

// Animal Habitats Data
export const animalHabitats: AnimalHabitat[] = [
  {
    name: 'Desert',
    description: 'A dry, hot environment with very little rainfall',
    climate: 'Hot and dry, very little rain',
    animals: ['Camel', 'Cactus wren', 'Desert tortoise', 'Kangaroo rat', 'Scorpion'],
    plants: ['Cactus', 'Desert sage', 'Joshua tree', 'Mesquite', 'Palm tree'],
    adaptations: ['Store water', 'Nocturnal activity', 'Thick skin', 'Long legs', 'Burrowing']
  },
  {
    name: 'Rainforest',
    description: 'A dense, wet forest with high rainfall and biodiversity',
    climate: 'Warm and wet, lots of rain',
    animals: ['Monkey', 'Parrot', 'Jaguar', 'Tree frog', 'Sloth'],
    plants: ['Giant trees', 'Vines', 'Orchids', 'Ferns', 'Bromeliads'],
    adaptations: ['Climbing ability', 'Bright colors', 'Large leaves', 'Flying', 'Camouflage']
  },
  {
    name: 'Ocean',
    description: 'A vast body of saltwater covering most of Earth',
    climate: 'Varies by depth and location',
    animals: ['Fish', 'Whale', 'Dolphin', 'Shark', 'Sea turtle'],
    plants: ['Seaweed', 'Kelp', 'Algae', 'Coral', 'Seagrass'],
    adaptations: ['Gills for breathing', 'Streamlined bodies', 'Fins for swimming', 'Blubber for warmth', 'Camouflage']
  },
  {
    name: 'Arctic',
    description: 'A cold, frozen environment near the North Pole',
    climate: 'Very cold, snow and ice',
    animals: ['Polar bear', 'Arctic fox', 'Seal', 'Walrus', 'Arctic hare'],
    plants: ['Moss', 'Lichens', 'Arctic willow', 'Dwarf shrubs', 'Grasses'],
    adaptations: ['Thick fur', 'Blubber', 'White camouflage', 'Small ears', 'Hibernation']
  },
  {
    name: 'Grassland',
    description: 'A wide, open area covered with grasses and few trees',
    climate: 'Moderate temperature, seasonal rain',
    animals: ['Lion', 'Zebra', 'Elephant', 'Giraffe', 'Antelope'],
    plants: ['Grasses', 'Wildflowers', 'Small shrubs', 'Herbs', 'Weeds'],
    adaptations: ['Fast running', 'Herding behavior', 'Long legs', 'Sharp eyesight', 'Digging ability']
  }
];

// Animal Habitats Questions
export const animalHabitatsQuestions: ScienceQuestion[] = [
  {
    id: '1',
    question: 'Which habitat is known for being hot and dry with very little rainfall?',
    answer: 'Desert',
    options: ['Desert', 'Rainforest', 'Ocean', 'Arctic'],
    type: 'animal-habitats',
    explanation: 'Deserts are characterized by hot temperatures and very little rainfall, making them one of the driest habitats on Earth.'
  },
  {
    id: '2',
    question: 'What adaptation helps camels survive in the desert?',
    answer: 'Store water in humps',
    options: ['Store water in humps', 'Have thick fur', 'Live in trees', 'Swim in water'],
    type: 'animal-habitats',
    explanation: 'Camels store fat in their humps, which can be converted to water when needed, helping them survive long periods without drinking.'
  },
  {
    id: '3',
    question: 'Which habitat has the most biodiversity (variety of life)?',
    answer: 'Rainforest',
    options: ['Rainforest', 'Desert', 'Arctic', 'Grassland'],
    type: 'animal-habitats',
    explanation: 'Rainforests have the highest biodiversity of any habitat, with millions of different species of plants and animals.'
  },
  {
    id: '4',
    question: 'What adaptation helps polar bears survive in the Arctic?',
    answer: 'Thick fur and blubber',
    options: ['Thick fur and blubber', 'Long legs', 'Bright colors', 'Wings'],
    type: 'animal-habitats',
    explanation: 'Polar bears have thick fur and a layer of blubber (fat) that helps them stay warm in the freezing Arctic temperatures.'
  },
  {
    id: '5',
    question: 'Which habitat covers most of Earth\'s surface?',
    answer: 'Ocean',
    options: ['Ocean', 'Desert', 'Rainforest', 'Grassland'],
    type: 'animal-habitats',
    explanation: 'Oceans cover about 71% of Earth\'s surface, making them the largest habitat on our planet.'
  },
  {
    id: '6',
    question: 'What do animals in the grassland habitat typically eat?',
    answer: 'Grasses and other plants',
    options: ['Grasses and other plants', 'Fish', 'Insects only', 'Other animals only'],
    type: 'animal-habitats',
    explanation: 'Many grassland animals are herbivores that eat grasses and other plants, while some are carnivores that eat the herbivores.'
  },
  {
    id: '7',
    question: 'Which adaptation helps animals survive in the rainforest?',
    answer: 'Bright colors for camouflage',
    options: ['Bright colors for camouflage', 'Thick fur', 'Hibernation', 'Migration'],
    type: 'animal-habitats',
    explanation: 'Many rainforest animals have bright colors that help them blend in with the colorful flowers and leaves, or warn predators they are poisonous.'
  },
  {
    id: '8',
    question: 'What is the main challenge for animals living in the Arctic?',
    answer: 'Extreme cold temperatures',
    options: ['Extreme cold temperatures', 'Too much rain', 'Not enough food', 'Too much heat'],
    type: 'animal-habitats',
    explanation: 'The main challenge in the Arctic is the extreme cold temperatures, which is why animals need special adaptations like thick fur and blubber.'
  }
];

// Helper functions
export const getRandomQuestions = (type: 'states-of-matter' | 'simple-machines' | 'animal-habitats', count: number): ScienceQuestion[] => {
  let questions: ScienceQuestion[] = [];
  
  if (type === 'states-of-matter') {
    questions = statesOfMatterQuestions;
  } else if (type === 'animal-habitats') {
    questions = animalHabitatsQuestions;
  }
  
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getMatterStateByName = (name: string): MatterState | undefined => {
  return matterStates.find(state => state.name.toLowerCase() === name.toLowerCase());
};

export const getSimpleMachineByName = (name: string): SimpleMachine | undefined => {
  return simpleMachines.find(machine => machine.name.toLowerCase() === name.toLowerCase());
};

export const getHabitatByName = (name: string): AnimalHabitat | undefined => {
  return animalHabitats.find(habitat => habitat.name.toLowerCase() === name.toLowerCase());
}; 