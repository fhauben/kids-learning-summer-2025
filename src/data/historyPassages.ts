import { HistoryPassage } from '../types';

// Utility function to shuffle arrays
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const historyPassagesBase: HistoryPassage[] = [
  {
    id: 'columbus',
    title: 'Christopher Columbus',
    person: 'Explorer',
    content: `Christopher Columbus was an Italian explorer who completed four voyages across the Atlantic Ocean under the patronage of the Spanish Crown. His expeditions, sponsored by the Catholic Monarchs of Spain, were the first European contact with the Caribbean, Central America, and South America since the Vikings. Columbus believed he could reach Asia by sailing west from Europe. Though he never realized he had reached the Americas, his voyages led to widespread European exploration and colonization of the New World.`,
    questions: [
      {
        question: 'How many voyages did Columbus make across the Atlantic?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correct: 2
      },
      {
        question: 'Which country sponsored Columbus\'s expeditions?',
        options: ['Italy', 'Portugal', 'Spain', 'England'],
        correct: 2
      },
      {
        question: 'What did Columbus believe he could reach by sailing west?',
        options: ['Africa', 'Asia', 'Australia', 'Antarctica'],
        correct: 1
      }
    ]
  },
  {
    id: 'george-washington',
    title: 'George Washington',
    person: 'Revolutionary War Hero',
    content: `George Washington was an American political leader, military general, and Founding Father who served as the first President of the United States. Washington led Patriot forces to victory in the Revolutionary War and presided at the Constitutional Convention in 1787. As president, he established many precedents for the national government and the presidency in particular. His leadership during the Revolutionary War earned him the title "Father of His Country."`,
    questions: [
      {
        question: 'What title is George Washington known by?',
        options: ['Father of Democracy', 'Father of His Country', 'The Great General', 'The First Leader'],
        correct: 1
      },
      {
        question: 'What war did Washington lead American forces in?',
        options: ['Civil War', 'War of 1812', 'Revolutionary War', 'French and Indian War'],
        correct: 2
      },
      {
        question: 'What convention did Washington preside over in 1787?',
        options: ['Continental Convention', 'Constitutional Convention', 'Colonial Convention', 'Congressional Convention'],
        correct: 1
      }
    ]
  },
  {
    id: 'benjamin-franklin',
    title: 'Benjamin Franklin',
    person: 'Founding Father & Inventor',
    content: `Benjamin Franklin was one of the Founding Fathers of the United States. He was a leading writer, printer, political philosopher, scientist, inventor, and diplomat. Franklin was instrumental in both the American Revolution and the founding of the United States. He is famous for his experiments with electricity, his invention of bifocal glasses, and his role in drafting the Declaration of Independence. His wisdom and wit made him one of the most celebrated Americans of his time.`,
    questions: [
      {
        question: 'What scientific phenomenon did Franklin study?',
        options: ['Gravity', 'Electricity', 'Magnetism', 'Light'],
        correct: 1
      },
      {
        question: 'What type of glasses did Franklin invent?',
        options: ['Reading glasses', 'Sunglasses', 'Bifocal glasses', 'Safety glasses'],
        correct: 2
      },
      {
        question: 'What important document did Franklin help draft?',
        options: ['Constitution', 'Declaration of Independence', 'Bill of Rights', 'Articles of Confederation'],
        correct: 1
      }
    ]
  },
  {
    id: 'thomas-jefferson',
    title: 'Thomas Jefferson',
    person: 'Founding Father & President',
    content: `Thomas Jefferson was the third President of the United States and the primary author of the Declaration of Independence. He was a Virginia planter, politician, lawyer, architect, philosopher, and Founding Father. Jefferson believed in individual liberty and was a strong advocate for democracy and republicanism. During his presidency, he completed the Louisiana Purchase, which doubled the size of the United States. He also founded the University of Virginia and designed its buildings.`,
    questions: [
      {
        question: 'Which number president was Thomas Jefferson?',
        options: ['Second', 'Third', 'Fourth', 'Fifth'],
        correct: 1
      },
      {
        question: 'What major land purchase did Jefferson complete as president?',
        options: ['Alaska Purchase', 'Louisiana Purchase', 'Florida Purchase', 'Texas Purchase'],
        correct: 1
      },
      {
        question: 'What university did Jefferson found?',
        options: ['University of Virginia', 'University of Pennsylvania', 'Harvard University', 'Yale University'],
        correct: 0
      }
    ]
  },
  {
    id: 'john-adams',
    title: 'John Adams',
    person: 'Founding Father & President',
    content: `John Adams was the second President of the United States and a Founding Father. He was a lawyer, diplomat, and political theorist who played a leading role in the American Revolution. Adams served as a diplomat in Europe during the war and helped negotiate the Treaty of Paris, which ended the Revolutionary War. He was also the first Vice President under George Washington. Adams believed strongly in the rule of law and was known for his integrity and dedication to public service.`,
    questions: [
      {
        question: 'Which number president was John Adams?',
        options: ['First', 'Second', 'Third', 'Fourth'],
        correct: 1
      },
      {
        question: 'What treaty did Adams help negotiate to end the Revolutionary War?',
        options: ['Treaty of Versailles', 'Treaty of Paris', 'Treaty of London', 'Treaty of Madrid'],
        correct: 1
      },
      {
        question: 'What position did Adams hold before becoming president?',
        options: ['Secretary of State', 'Vice President', 'Senator', 'Governor'],
        correct: 1
      }
    ]
  },
  {
    id: 'lewis-clark',
    title: 'Lewis and Clark Expedition',
    person: 'Explorers',
    content: `Meriwether Lewis and William Clark led the Corps of Discovery expedition from 1804 to 1806. President Thomas Jefferson commissioned them to explore the western territories acquired in the Louisiana Purchase. The expedition traveled from St. Louis to the Pacific Ocean and back, mapping the territory and establishing trade with Native American tribes. They were guided by Sacagawea, a Shoshone woman who helped them navigate and communicate with various tribes. Their journey provided valuable information about the western frontier.`,
    questions: [
      {
        question: 'Which president commissioned the Lewis and Clark expedition?',
        options: ['George Washington', 'John Adams', 'Thomas Jefferson', 'James Madison'],
        correct: 2
      },
      {
        question: 'Who was the Native American guide who helped Lewis and Clark?',
        options: ['Pocahontas', 'Sacagawea', 'Squanto', 'Tecumseh'],
        correct: 1
      },
      {
        question: 'What was the expedition also known as?',
        options: ['Corps of Discovery', 'Western Expedition', 'Pacific Journey', 'Frontier Mission'],
        correct: 0
      }
    ]
  },
  {
    id: 'paul-revere',
    title: 'Paul Revere',
    person: 'Revolutionary War Hero',
    content: `Paul Revere was an American silversmith and patriot during the American Revolution. He is most famous for his midnight ride on April 18, 1775, to warn the colonial militia that British troops were marching to Lexington and Concord. Revere was a member of the Sons of Liberty and participated in the Boston Tea Party. His ride helped alert the colonists, allowing them to prepare for the battles that would begin the Revolutionary War. He was also a skilled craftsman and businessman in Boston.`,
    questions: [
      {
        question: 'What was Paul Revere\'s profession?',
        options: ['Blacksmith', 'Silversmith', 'Carpenter', 'Farmer'],
        correct: 1
      },
      {
        question: 'What famous event is Paul Revere known for?',
        options: ['Boston Tea Party', 'Midnight Ride', 'Boston Massacre', 'Signing Declaration'],
        correct: 1
      },
      {
        question: 'What group was Paul Revere a member of?',
        options: ['Sons of Liberty', 'Continental Congress', 'Minutemen', 'Patriots Club'],
        correct: 0
      }
    ]
  },
  {
    id: 'betsy-ross',
    title: 'Betsy Ross',
    person: 'Revolutionary War Figure',
    content: `Betsy Ross was an American seamstress who is credited with making the first American flag. According to popular legend, George Washington visited her shop in Philadelphia in 1776 and asked her to sew the first Stars and Stripes flag. While historians debate whether this story is entirely accurate, Ross was indeed a skilled seamstress who made flags during the Revolutionary War period. She ran her own upholstery business and was known for her excellent needlework and patriotic spirit.`,
    questions: [
      {
        question: 'What is Betsy Ross famous for making?',
        options: ['The first American flag', 'Military uniforms', 'Colonial dresses', 'Ship sails'],
        correct: 0
      },
      {
        question: 'What was Betsy Ross\'s profession?',
        options: ['Teacher', 'Seamstress', 'Baker', 'Nurse'],
        correct: 1
      },
      {
        question: 'In which city did Betsy Ross have her shop?',
        options: ['Boston', 'New York', 'Philadelphia', 'Baltimore'],
        correct: 2
      }
    ]
  }
];

export const historyPassages = shuffleArray(historyPassagesBase);