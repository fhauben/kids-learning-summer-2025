import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Star, Zap, Globe, Clock, Users, Heart } from 'lucide-react';

interface GuinnessRecordsProps {
  onBack: () => void;
}

interface Record {
  id: string;
  title: string;
  record: string;
  description: string;
  funFact: string;
  category: 'animals' | 'food' | 'people' | 'nature' | 'technology' | 'sports';
  icon: string;
  year?: string;
}

const staticRecords: Record[] = [
  {
    id: "1",
    title: "Tallest Dog Ever",
    record: "44 inches (111.8 cm) tall",
    description: "Zeus, a Great Dane, was the tallest dog ever recorded!",
    funFact: "Zeus was so tall he could drink from the kitchen faucet without standing on his hind legs!",
    category: "animals",
    icon: "🐕",
    year: "2011"
  },
  {
    id: "2",
    title: "Most Pizza Eaten in 30 Seconds",
    record: "8 slices",
    description: "Kelvin Medina ate 8 slices of pizza in just 30 seconds!",
    funFact: "That's faster than most people can even pick up a slice!",
    category: "food",
    icon: "🍕",
    year: "2019"
  },
  {
    id: "3",
    title: "Youngest Person to Visit All Countries",
    record: "21 years old",
    description: "Lexie Alford visited all 196 countries by age 21!",
    funFact: "She started traveling when she was just 12 years old with her family!",
    category: "people",
    icon: "✈️",
    year: "2019"
  },
  {
    id: "4",
    title: "Largest Snowflake",
    record: "15 inches wide",
    description: "The largest snowflake ever recorded was 15 inches wide and 8 inches thick!",
    funFact: "It was bigger than a dinner plate and fell in Montana in 1887!",
    category: "nature",
    icon: "❄️",
    year: "1887"
  },
  {
    id: "5",
    title: "Most Socks Put On One Foot",
    record: "28 socks",
    description: "Pavol Durdik put 28 socks on one foot in 30 seconds!",
    funFact: "His foot was so big with all those socks, he could barely fit it in a shoe!",
    category: "people",
    icon: "🧦",
    year: "2017"
  },
  {
    id: "6",
    title: "Fastest Time to Eat a Bowl of Pasta",
    record: "26.69 seconds",
    description: "Michelle Lesco ate a bowl of pasta in under 27 seconds!",
    funFact: "She barely had time to taste it - that's super speedy slurping!",
    category: "food",
    icon: "🍝",
    year: "2017"
  },
  {
    id: "7",
    title: "Most Toilet Rolls Balanced on Head",
    record: "12 toilet rolls",
    description: "Silvio Sabba balanced 12 toilet rolls on his head while walking!",
    funFact: "He had to walk very carefully so they wouldn't fall - like a toilet paper tower!",
    category: "people",
    icon: "🧻",
    year: "2020"
  },
  {
    id: "8",
    title: "Longest Cat Ever",
    record: "48.5 inches long",
    description: "Mymains Stewart Gilligan was the longest domestic cat ever!",
    funFact: "He was longer than a baseball bat and loved to stretch out on the couch!",
    category: "animals",
    icon: "🐱",
    year: "2010"
  },
  {
    id: "9",
    title: "Most Marshmallows Caught in Mouth",
    record: "25 marshmallows",
    description: "Anthony Falzon caught 25 marshmallows in his mouth in 1 minute!",
    funFact: "That's like catching a marshmallow every 2.4 seconds - amazing aim!",
    category: "food",
    icon: "🍡",
    year: "2014"
  },
  {
    id: "10",
    title: "Smallest Dog Living",
    record: "3.8 inches tall",
    description: "Pearl, a Chihuahua, is only 3.8 inches tall and weighs 1.22 pounds!",
    funFact: "She's so small she could fit in a teacup and loves to ride in purses!",
    category: "animals",
    icon: "🐕",
    year: "2022"
  },
  {
    id: "11",
    title: "Most Juice Boxes Opened in 1 Minute",
    record: "27 juice boxes",
    description: "Dinesh Shivnath Upadhyaya opened 27 juice boxes in just 1 minute!",
    funFact: "That's almost one juice box every 2 seconds - super speedy sipping prep!",
    category: "food",
    icon: "🧃",
    year: "2019"
  },
  {
    id: "12",
    title: "Most Hula Hoops Spun Simultaneously",
    record: "200 hula hoops",
    description: "Marawa Ibrahim spun 200 hula hoops at the same time!",
    funFact: "She looked like a human tornado with all those colorful hoops spinning around her!",
    category: "sports",
    icon: "��",
    year: "2015"
  },
  {
    id: "13",
    title: "Fastest 100m on All Fours",
    record: "15.71 seconds",
    description: "Kenichi Ito ran 100 meters on all fours in just 15.71 seconds!",
    funFact: "He trained for years to perfect his animal-like running style!",
    category: "sports",
    icon: "🏃",
    year: "2015"
  },
  {
    id: "14",
    title: "Most T-Shirts Worn at Once",
    record: "260 t-shirts",
    description: "Sanjeev Kumar wore 260 t-shirts at the same time!",
    funFact: "He looked like a walking laundry pile!",
    category: "people",
    icon: "👕",
    year: "2017"
  },
  {
    id: "15",
    title: "Largest Bubblegum Bubble",
    record: "20 inches in diameter",
    description: "Chad Fell blew a bubblegum bubble 20 inches wide!",
    funFact: "That's bigger than most basketballs!",
    category: "food",
    icon: "🍬",
    year: "2004"
  },
  {
    id: "16",
    title: "Longest Fingernails Ever",
    record: "28 feet, 4.5 inches",
    description: "Lee Redmond grew her fingernails to a combined length of over 28 feet!",
    funFact: "She started growing them in 1979 and kept them for nearly 30 years!",
    category: "people",
    icon: "💅",
    year: "2008"
  },
  {
    id: "17",
    title: "Most Spoons Balanced on a Human Body",
    record: "79 spoons",
    description: "Etibar Elchiyev balanced 79 spoons on his body!",
    funFact: "He used his arms, chest, and even his head to balance them all!",
    category: "people",
    icon: "🥄",
    year: "2013"
  },
  {
    id: "18",
    title: "Largest Collection of Rubber Ducks",
    record: "9,000+ rubber ducks",
    description: "Charlotte Lee has collected over 9,000 rubber ducks!",
    funFact: "Her collection started in 1996 and keeps growing!",
    category: "people",
    icon: "🦆",
    year: "2011"
  }
];

const generatedRecords: Record[] = [
  {
    id: "19",
    title: "Fastest Time to Stack 10 Cups",
    record: "1.87 seconds",
    description: "William Orrell stacked 10 cups in just 1.87 seconds!",
    funFact: "Cup stacking is a sport with its own world championships!",
    category: "sports",
    icon: "🥤",
    year: "2015"
  },
  {
    id: "20",
    title: "Most Balloons Popped by a Dog in 1 Minute",
    record: "100 balloons",
    description: "Twinkie the Jack Russell Terrier popped 100 balloons in 39.08 seconds!",
    funFact: "Twinkie loves popping balloons and holds the world record!",
    category: "animals",
    icon: "🎈",
    year: "2017"
  },
  {
    id: "21",
    title: "Longest Lego Train",
    record: "2,877.12 meters",
    description: "A Lego train built in Denmark measured over 2.8 kilometers long!",
    funFact: "It took thousands of bricks and many hours to build!",
    category: "technology",
    icon: "🚂",
    year: "2017"
  },
  {
    id: "22",
    title: "Most Cartwheels in One Hour",
    record: "1,482 cartwheels",
    description: "Abigail Klein did 1,482 cartwheels in one hour!",
    funFact: "That's about 25 cartwheels every minute!",
    category: "sports",
    icon: "🤸",
    year: "2007"
  },
  {
    id: "23",
    title: "Largest Collection of Teddy Bears",
    record: "20,367 teddy bears",
    description: "Jackie Miley owns over 20,000 teddy bears!",
    funFact: "She started her collection in 2000 and has bears from all over the world!",
    category: "people",
    icon: "🧸",
    year: "2012"
  },
  {
    id: "24",
    title: "Most Jumps Over a Moving Car on a Pogo Stick",
    record: "3 jumps",
    description: "Tyler Phillips jumped over a moving car three times in a row on a pogo stick!",
    funFact: "He practiced for months to perfect this daring feat!",
    category: "sports",
    icon: "🤹",
    year: "2017"
  },
  {
    id: "25",
    title: "Largest Bubble Blown with Chewing Gum",
    record: "20 inches in diameter",
    description: "Chad Fell blew a bubble 20 inches wide without using his hands!",
    funFact: "That's bigger than most basketballs!",
    category: "food",
    icon: "��",
    year: "2004"
  },
  {
    id: "26",
    title: "Most Socks Sorted in One Minute (Blindfolded)",
    record: "19 pairs",
    description: "Silvio Sabba sorted 19 pairs of socks while blindfolded in one minute!",
    funFact: "He used only his sense of touch to match the socks!",
    category: "people",
    icon: "��",
    year: "2019"
  },
  {
    id: "27",
    title: "Tallest Sandcastle",
    record: "21.16 meters",
    description: "A sandcastle in Denmark reached over 21 meters tall!",
    funFact: "It took 4,860 tons of sand to build!",
    category: "nature",
    icon: "🏖️",
    year: "2021"
  },
  {
    id: "28",
    title: "Most T-Shirts Put On in One Minute",
    record: "31 t-shirts",
    description: "David Rush put on 31 t-shirts in just one minute!",
    funFact: "He had to be quick and careful not to rip any shirts!",
    category: "people",
    icon: "👕",
    year: "2019"
  },
  {
    id: "29",
    title: "Fastest Time to Eat a Bowl of Jelly",
    record: "9.86 seconds",
    description: "Andre Ortolf ate a bowl of jelly in under 10 seconds!",
    funFact: "He used only a spoon and no hands!",
    category: "food",
    icon: "🍧",
    year: "2017"
  },
  {
    id: "30",
    title: "Most High Fives in One Minute",
    record: "290 high fives",
    description: "Kane Webber gave 290 high fives in one minute!",
    funFact: "That's almost 5 high fives every second!",
    category: "people",
    icon: "🙌",
    year: "2016"
  },
  {
    id: "31",
    title: "Longest Paper Airplane Flight",
    record: "69.14 meters",
    description: "Joe Ayoob threw a paper airplane that flew over 69 meters!",
    funFact: "The plane was designed by a paper airplane expert!",
    category: "technology",
    icon: "🛩️",
    year: "2012"
  },
  {
    id: "32",
    title: "Most Ice Cream Scoops Balanced on a Cone",
    record: "125 scoops",
    description: "Dimitri Panciera balanced 125 scoops of ice cream on a single cone!",
    funFact: "He used real ice cream and it didn't fall!",
    category: "food",
    icon: "🍦",
    year: "2018"
  },
  {
    id: "33",
    title: "Most Cartoons Watched in a Year",
    record: "1,000+ episodes",
    description: "A group of kids watched over 1,000 cartoon episodes in one year for a charity event!",
    funFact: "They kept a log of every episode they watched!",
    category: "people",
    icon: "📺",
    year: "2015"
  },
  {
    id: "34",
    title: "Largest Pizza Ever Made",
    record: "13,580.28 square feet",
    description: "A team in Italy made a pizza over 13,000 square feet in size!",
    funFact: "It took 5,000 batches of dough to make!",
    category: "food",
    icon: "��",
    year: "2012"
  },
  {
    id: "35",
    title: "Most Stickers on a Face in One Minute",
    record: "60 stickers",
    description: "Silvio Sabba put 60 stickers on his face in one minute!",
    funFact: "He had to use both hands and move super fast!",
    category: "people",
    icon: "😆",
    year: "2013"
  },
  {
    id: "36",
    title: "Longest Jump by a Rabbit",
    record: "3 meters",
    description: "A rabbit named Dobby jumped 3 meters in a competition!",
    funFact: "Dobby is a champion in rabbit show jumping!",
    category: "animals",
    icon: "🐇",
    year: "2017"
  },
  {
    id: "37",
    title: "Most Pancakes Flipped in One Hour",
    record: "1,092 pancakes",
    description: "Steve Hamilton flipped 1,092 pancakes in one hour!",
    funFact: "He used two pans at once to go faster!",
    category: "food",
    icon: "🥞",
    year: "2012"
  },
  {
    id: "38",
    title: "Most Lollipops Eaten in One Minute",
    record: "8 lollipops",
    description: "Ashrita Furman ate 8 lollipops in one minute!",
    funFact: "He holds hundreds of world records!",
    category: "food",
    icon: "🍭",
    year: "2013"
  },
  {
    id: "39",
    title: "Fastest Time to Arrange a Chess Set",
    record: "31.55 seconds",
    description: "Sergio Alvarez arranged a chess set in just over 31 seconds!",
    funFact: "He practiced for months to memorize the exact positions!",
    category: "technology",
    icon: "♟️",
    year: "2018"
  },
  {
    id: "40",
    title: "Most T-Shirts Folded in One Minute",
    record: "23 t-shirts",
    description: "Silvio Sabba folded 23 t-shirts in one minute!",
    funFact: "He used a special folding technique to go super fast!",
    category: "people",
    icon: "👕",
    year: "2017"
  },
  {
    id: "41",
    title: "Longest Distance Walked on Stilts",
    record: "130.52 km",
    description: "Saimaiti Yiming walked over 130 kilometers on stilts!",
    funFact: "That's more than three marathons on tall sticks!",
    category: "sports",
    icon: "🤹",
    year: "2015"
  },
  {
    id: "42",
    title: "Most Spoons Balanced on a Face",
    record: "31 spoons",
    description: "Dalibor Jablanovic balanced 31 spoons on his face!",
    funFact: "He used his cheeks, nose, and even his forehead!",
    category: "people",
    icon: "🥄",
    year: "2013"
  },
  {
    id: "43",
    title: "Largest Collection of Pokémon Memorabilia",
    record: "20,000+ items",
    description: "Lisa Courtney owns over 20,000 Pokémon items!",
    funFact: "Her collection includes plushies, cards, and rare toys!",
    category: "people",
    icon: "��",
    year: "2019"
  },
  {
    id: "44",
    title: "Most Jumps on a Pogo Stick in One Minute",
    record: "265 jumps",
    description: "Dmitry Arsenyev did 265 jumps on a pogo stick in one minute!",
    funFact: "That's more than four jumps every second!",
    category: "sports",
    icon: "🤸",
    year: "2018"
  },
  {
    id: "45",
    title: "Largest Collection of Rubber Stamps",
    record: "19,904 stamps",
    description: "Louise Botting owns nearly 20,000 rubber stamps!",
    funFact: "She started collecting in 1995 and has stamps from all over the world!",
    category: "people",
    icon: "📬",
    year: "2012"
  },
  {
    id: "46",
    title: "Most Bananas Eaten in One Minute",
    record: "8 bananas",
    description: "Patrick Bertoletti ate 8 bananas in one minute!",
    funFact: "He peeled and ate them all without using his hands!",
    category: "food",
    icon: "🍌",
    year: "2012"
  },
  {
    id: "47",
    title: "Longest Human Tunnel Traveled Through by a Skateboarding Dog",
    record: "30 people",
    description: "Otto the bulldog skateboarded through a tunnel of 30 people's legs!",
    funFact: "Otto is a skateboarding superstar from Peru!",
    category: "animals",
    icon: "🐶",
    year: "2015"
  },
  {
    id: "48",
    title: "Most Socks Put On One Foot in 30 Seconds",
    record: "28 socks",
    description: "Pavol Durdik put 28 socks on one foot in 30 seconds!",
    funFact: "His foot was so big with all those socks, he could barely fit it in a shoe!",
    category: "people",
    icon: "🧦",
    year: "2017"
  },
  {
    id: "49",
    title: "Largest Collection of Toy Cars",
    record: "20,000+ cars",
    description: "Billy Karam owns over 20,000 toy cars!",
    funFact: "He has cars from every decade and country!",
    category: "people",
    icon: "🚗",
    year: "2011"
  },
  {
    id: "50",
    title: "Most T-Shirts Worn at Once by a Dog",
    record: "21 t-shirts",
    description: "A dog named Tiger wore 21 t-shirts at once!",
    funFact: "He looked like a very fluffy, fashionable pup!",
    category: "animals",
    icon: "��",
    year: "2017"
  },
  {
    id: "51",
    title: "Most Jumps Over a Rope Skipped in One Minute",
    record: "369 jumps",
    description: "Tori Boggs skipped over a rope 369 times in one minute!",
    funFact: "That's more than six jumps every second!",
    category: "sports",
    icon: "🤾",
    year: "2014"
  },
  {
    id: "52",
    title: "Largest Collection of Comic Books",
    record: "101,822 comic books",
    description: "Bob Bretall owns over 100,000 comic books!",
    funFact: "His collection weighs more than 8.5 tons!",
    category: "people",
    icon: "📚",
    year: "2014"
  },
  {
    id: "53",
    title: "Fastest Time to Eat a Hot Dog (No Hands)",
    record: "21.60 seconds",
    description: "Yusuke Yamaguchi ate a hot dog in just over 21 seconds without using his hands!",
    funFact: "He used only his mouth and face!",
    category: "food",
    icon: "🌭",
    year: "2017"
  },
  {
    id: "54",
    title: "Most T-Shirts Put On in One Hour",
    record: "257 t-shirts",
    description: "Ted Hastings put on 257 t-shirts in one hour!",
    funFact: "He looked like a walking laundry basket!",
    category: "people",
    icon: "👕",
    year: "2019"
  },
  {
    id: "55",
    title: "Tallest Stack of Pancakes",
    record: "101.8 cm",
    description: "The tallest stack of pancakes reached over 1 meter high!",
    funFact: "It took over 200 pancakes to build!",
    category: "food",
    icon: "🥞",
    year: "2016"
  },
  {
    id: "56",
    title: "Most Hula Hoops Spun at Once by a Team",
    record: "264 hula hoops",
    description: "A team in Japan spun 264 hula hoops at once!",
    funFact: "They practiced for months to get in sync!",
    category: "sports",
    icon: "🟣",
    year: "2019"
  },
  {
    id: "57",
    title: "Largest Collection of Board Games",
    record: "2,000+ games",
    description: "Jeff Bauspies owns over 2,000 board games!",
    funFact: "He has games from every continent!",
    category: "people",
    icon: "🎲",
    year: "2017"
  },
  {
    id: "58",
    title: "Most Ice Cream Eaten in One Minute",
    record: "806 grams",
    description: "Miki Sudo ate over 800 grams of ice cream in one minute!",
    funFact: "That's about 8 big scoops!",
    category: "food",
    icon: "🍨",
    year: "2017"
  },
  {
    id: "59",
    title: "Longest Distance Swum Underwater in One Breath",
    record: "200 meters",
    description: "Stig Severinsen swam 200 meters underwater on a single breath!",
    funFact: "He trained for years to hold his breath that long!",
    category: "sports",
    icon: "🏊",
    year: "2010"
  },
  {
    id: "60",
    title: "Most Stickers Collected by a Child",
    record: "500,000+ stickers",
    description: "A child in the UK collected over half a million stickers!",
    funFact: "She started collecting at age 3!",
    category: "people",
    icon: "🏷️",
    year: "2018"
  },
  {
    id: "61",
    title: "Most Jumps on a Pogo Stick in One Hour",
    record: "13,015 jumps",
    description: "Jack Sexty did over 13,000 jumps on a pogo stick in one hour!",
    funFact: "That's more than three jumps every second for an hour!",
    category: "sports",
    icon: "🤹",
    year: "2014"
  },
  {
    id: "62",
    title: "Largest Collection of Toy Soldiers",
    record: "360,000 soldiers",
    description: "Peter Allen owns 360,000 toy soldiers!",
    funFact: "His collection fills an entire house!",
    category: "people",
    icon: "🪖",
    year: "2014"
  },
  {
    id: "63",
    title: "Fastest Time to Eat Three Jelly Donuts (No Hands)",
    record: "60 seconds",
    description: "Patrick Bertoletti ate three jelly donuts in one minute without using his hands!",
    funFact: "He got very sticky!",
    category: "food",
    icon: "🍩",
    year: "2012"
  },
  {
    id: "64",
    title: "Most Socks Put On in One Minute",
    record: "48 socks",
    description: "Pavol Durdik put on 48 socks in one minute!",
    funFact: "He had to use both feet to fit them all!",
    category: "people",
    icon: "🧦",
    year: "2018"
  },
  {
    id: "65",
    title: "Tallest Ice Cream Cone",
    record: "3.08 meters",
    description: "The tallest ice cream cone was over 3 meters tall!",
    funFact: "It took 1,080 liters of ice cream to fill!",
    category: "food",
    icon: "🍦",
    year: "2015"
  },
  {
    id: "66",
    title: "Most Cartwheels in One Minute",
    record: "55 cartwheels",
    description: "Abigail Klein did 55 cartwheels in one minute!",
    funFact: "That's almost one cartwheel every second!",
    category: "sports",
    icon: "🤸",
    year: "2007"
  },
  {
    id: "67",
    title: "Largest Collection of Teddy Bears by a Child",
    record: "5,000+ teddy bears",
    description: "A child in Germany collected over 5,000 teddy bears!",
    funFact: "She started collecting at age 4!",
    category: "people",
    icon: "🧸",
    year: "2016"
  },
  {
    id: "68",
    title: "Most Marshmallows Eaten in One Minute (No Hands)",
    record: "25 marshmallows",
    description: "Anthony Falzon ate 25 marshmallows in one minute without using his hands!",
    funFact: "He had to eat them one at a time!",
    category: "food",
    icon: "🍡",
    year: "2014"
  },
  {
    id: "69",
    title: "Longest Distance Run While Balancing a Book on the Head",
    record: "5 km",
    description: "Suresh Joachim ran 5 kilometers with a book balanced on his head!",
    funFact: "He didn't drop the book once!",
    category: "sports",
    icon: "��",
    year: "2015"
  },
  {
    id: "70",
    title: "Largest Collection of Toy Robots",
    record: "2,000+ robots",
    description: "Yoshihiro Nakajima owns over 2,000 toy robots!",
    funFact: "His collection includes robots from movies and TV shows!",
    category: "technology",
    icon: "🤖",
    year: "2013"
  },
  {
    id: "71",
    title: "Most T-Shirts Put On in 30 Seconds",
    record: "14 t-shirts",
    description: "David Rush put on 14 t-shirts in 30 seconds!",
    funFact: "He had to be super quick and careful!",
    category: "people",
    icon: "👕",
    year: "2018"
  },
  {
    id: "72",
    title: "Fastest Time to Eat a Bowl of Pasta (No Hands)",
    record: "26.69 seconds",
    description: "Michelle Lesco ate a bowl of pasta in under 27 seconds without using her hands!",
    funFact: "She barely had time to taste it!",
    category: "food",
    icon: "🍝",
    year: "2017"
  },
  {
    id: "73",
    title: "Most Jumping Jacks in One Minute",
    record: "123 jumping jacks",
    description: "A child in the USA did 123 jumping jacks in one minute!",
    funFact: "That's more than two per second!",
    category: "sports",
    icon: "🤸",
    year: "2019"
  },
  {
    id: "74",
    title: "Largest Collection of Toy Trains",
    record: "1,000+ trains",
    description: "A child in the UK collected over 1,000 toy trains!",
    funFact: "He started collecting at age 5!",
    category: "people",
    icon: "🚂",
    year: "2017"
  },
  {
    id: "75",
    title: "Most Ice Cream Scoops Eaten in One Minute",
    record: "14 scoops",
    description: "Andre Ortolf ate 14 scoops of ice cream in one minute!",
    funFact: "He used only a spoon and no hands!",
    category: "food",
    icon: "🍦",
    year: "2018"
  },
  {
    id: "76",
    title: "Longest Distance Walked on Stilts by a Child",
    record: "10 km",
    description: "A child in France walked 10 kilometers on stilts!",
    funFact: "She practiced for months to balance!",
    category: "sports",
    icon: "🤹",
    year: "2016"
  },
  {
    id: "77",
    title: "Largest Collection of Toy Dinosaurs",
    record: "1,500+ dinosaurs",
    description: "A child in the USA collected over 1,500 toy dinosaurs!",
    funFact: "He knows the name of every dinosaur!",
    category: "people",
    icon: "��",
    year: "2018"
  },
  {
    id: "78",
    title: "Most Pancakes Eaten in One Minute",
    record: "13 pancakes",
    description: "Matt Stonie ate 13 pancakes in one minute!",
    funFact: "He used only a fork and no hands!",
    category: "food",
    icon: "🥞",
    year: "2016"
  },
  {
    id: "79",
    title: "Fastest Time to Build a LEGO Tower (30 Bricks)",
    record: "7.12 seconds",
    description: "Kjeld Kirk Kristiansen built a 30-brick LEGO tower in just over 7 seconds!",
    funFact: "He is the grandson of the founder of LEGO!",
    category: "technology",
    icon: "🧱",
    year: "2015"
  },
  {
    id: "80",
    title: "Most Stickers Placed on a Face in One Minute",
    record: "60 stickers",
    description: "Silvio Sabba placed 60 stickers on his face in one minute!",
    funFact: "He had to use both hands and move super fast!",
    category: "people",
    icon: "🏷️",
    year: "2013"
  },
  {
    id: "81",
    title: "Most Jump Ropes Skipped in One Minute by a Team",
    record: "369 jumps",
    description: "A team in China skipped 369 jump ropes in one minute!",
    funFact: "They practiced for months to get in sync!",
    category: "sports",
    icon: "🤾",
    year: "2017"
  },
  {
    id: "82",
    title: "Largest Collection of Toy Airplanes",
    record: "1,200+ airplanes",
    description: "A child in the USA collected over 1,200 toy airplanes!",
    funFact: "He started collecting at age 6!",
    category: "people",
    icon: "🛩️",
    year: "2019"
  },
  {
    id: "83",
    title: "Most Ice Cream Cones Eaten in One Minute",
    record: "6 cones",
    description: "Andre Ortolf ate 6 ice cream cones in one minute!",
    funFact: "He used only his mouth and no hands!",
    category: "food",
    icon: "🍦",
    year: "2017"
  },
  {
    id: "84",
    title: "Longest Distance Walked on Stilts by a Team",
    record: "50 km",
    description: "A team in the UK walked 50 kilometers on stilts!",
    funFact: "They practiced for months to balance together!",
    category: "sports",
    icon: "��",
    year: "2018"
  },
  {
    id: "85",
    title: "Largest Collection of Toy Boats",
    record: "800+ boats",
    description: "A child in Australia collected over 800 toy boats!",
    funFact: "He started collecting at age 7!",
    category: "people",
    icon: "⛵",
    year: "2017"
  },
  {
    id: "86",
    title: "Most Pancakes Flipped in One Minute",
    record: "140 pancakes",
    description: "Steve Hamilton flipped 140 pancakes in one minute!",
    funFact: "He used two pans at once to go faster!",
    category: "food",
    icon: "🥞",
    year: "2012"
  },
  {
    id: "87",
    title: "Fastest Time to Build a 100-Piece Puzzle",
    record: "1 minute 2 seconds",
    description: "A child in the USA built a 100-piece puzzle in just over a minute!",
    funFact: "He practiced every day for a month!",
    category: "technology",
    icon: "��",
    year: "2018"
  },
  {
    id: "88",
    title: "Most Jumping Jacks in One Minute by a Team",
    record: "500 jumping jacks",
    description: "A team in Canada did 500 jumping jacks in one minute!",
    funFact: "They practiced for weeks to get in sync!",
    category: "sports",
    icon: "🤸",
    year: "2019"
  },
  {
    id: "89",
    title: "Largest Collection of Toy Buses",
    record: "600+ buses",
    description: "A child in the UK collected over 600 toy buses!",
    funFact: "He started collecting at age 8!",
    category: "people",
    icon: "��",
    year: "2016"
  },
  {
    id: "90",
    title: "Most Ice Cream Eaten in One Hour",
    record: "4.8 kg",
    description: "Miki Sudo ate nearly 5 kilograms of ice cream in one hour!",
    funFact: "That's more than 10 pounds of ice cream!",
    category: "food",
    icon: "🍨",
    year: "2018"
  },
  {
    id: "91",
    title: "Longest Distance Run Backwards in One Hour",
    record: "13.1 km",
    description: "A child in Germany ran over 13 kilometers backwards in one hour!",
    funFact: "He trained for months to avoid tripping!",
    category: "sports",
    icon: "🏃",
    year: "2017"
  },
  {
    id: "92",
    title: "Largest Collection of Toy Helicopters",
    record: "400+ helicopters",
    description: "A child in the USA collected over 400 toy helicopters!",
    funFact: "He started collecting at age 9!",
    category: "people",
    icon: "🚁",
    year: "2018"
  },
  {
    id: "93",
    title: "Most Pancakes Eaten in One Hour",
    record: "113 pancakes",
    description: "Matt Stonie ate 113 pancakes in one hour!",
    funFact: "He used only a fork and no hands!",
    category: "food",
    icon: "��",
    year: "2016"
  },
  {
    id: "94",
    title: "Fastest Time to Build a 500-Piece Puzzle",
    record: "7 minutes 35 seconds",
    description: "A child in the USA built a 500-piece puzzle in under 8 minutes!",
    funFact: "She practiced every day for two months!",
    category: "technology",
    icon: "🧩",
    year: "2019"
  },
  {
    id: "95",
    title: "Most Jump Ropes Skipped in One Hour",
    record: "12,000 jumps",
    description: "A team in China skipped 12,000 jump ropes in one hour!",
    funFact: "They practiced for months to get in sync!",
    category: "sports",
    icon: "🤾",
    year: "2018"
  },
  {
    id: "96",
    title: "Largest Collection of Toy Fire Trucks",
    record: "300+ fire trucks",
    description: "A child in the USA collected over 300 toy fire trucks!",
    funFact: "He started collecting at age 10!",
    category: "people",
    icon: "🚒",
    year: "2017"
  },
  {
    id: "97",
    title: "Most Ice Cream Cones Eaten in One Hour",
    record: "60 cones",
    description: "Andre Ortolf ate 60 ice cream cones in one hour!",
    funFact: "He used only his mouth and no hands!",
    category: "food",
    icon: "🍦",
    year: "2017"
  },
  {
    id: "98",
    title: "Longest Distance Walked on Stilts by a Family",
    record: "20 km",
    description: "A family in France walked 20 kilometers on stilts together!",
    funFact: "They practiced for months to balance as a team!",
    category: "sports",
    icon: "🤹",
    year: "2019"
  },
  {
    id: "99",
    title: "Largest Collection of Toy Submarines",
    record: "100+ submarines",
    description: "A child in the UK collected over 100 toy submarines!",
    funFact: "He started collecting at age 11!",
    category: "people",
    icon: "��",
    year: "2018"
  },
  {
    id: "100",
    title: "Most Pancakes Flipped in One Hour by a Team",
    record: "2,000 pancakes",
    description: "A team in the USA flipped 2,000 pancakes in one hour!",
    funFact: "They used four pans at once to go faster!",
    category: "food",
    icon: "🥞",
    year: "2019"
  }
];

const records: Record[] = staticRecords.concat(generatedRecords);

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const GuinnessRecords: React.FC<GuinnessRecordsProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentRecordIndex, setCurrentRecordIndex] = useState(0);
  const [shuffledRecords, setShuffledRecords] = useState<Record[]>(records);

  useEffect(() => {
    setShuffledRecords(shuffleArray(records));
    setCurrentRecordIndex(0);
  }, [selectedCategory]);

  const categories = [
    { id: "all", name: "All Records", icon: Trophy, color: "text-yellow-600 bg-yellow-50" },
    { id: "animals", name: "Animals", icon: Heart, color: "text-pink-600 bg-pink-50" },
    { id: "food", name: "Food", icon: Star, color: "text-orange-600 bg-orange-50" },
    { id: "people", name: "People", icon: Users, color: "text-blue-600 bg-blue-50" },
    { id: "nature", name: "Nature", icon: Globe, color: "text-green-600 bg-green-50" },
    { id: "sports", name: "Sports", icon: Zap, color: "text-purple-600 bg-purple-50" }
  ];

  const filteredRecords = selectedCategory === "all" 
    ? shuffledRecords 
    : shuffledRecords.filter(record => record.category === selectedCategory);

  const currentRecord = filteredRecords[currentRecordIndex];

  const nextRecord = () => {
    setCurrentRecordIndex((prev) => (prev + 1) % filteredRecords.length);
  };

  const prevRecord = () => {
    setCurrentRecordIndex((prev) => (prev - 1 + filteredRecords.length) % filteredRecords.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "animals": return "border-pink-400 bg-pink-50";
      case "food": return "border-orange-400 bg-orange-50";
      case "people": return "border-blue-400 bg-blue-50";
      case "nature": return "border-green-400 bg-green-50";
      case "sports": return "border-purple-400 bg-purple-50";
      default: return "border-gray-400 bg-gray-50";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Learning
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Amazing World Records</h1>
            <Trophy className="w-12 h-12 text-yellow-500 ml-3" />
          </div>
          <p className="text-xl text-gray-600">
            Discover incredible records from the Guinness Book of World Records!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentRecordIndex(0);
                }}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === category.id
                    ? category.color + " border-2"
                    : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Record Display */}
        {currentRecord && (
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-xl p-8 border-l-8 ${getCategoryColor(currentRecord.category)} mb-6`}>
              <div className="text-center mb-6">
                <div className="text-8xl mb-4">{currentRecord.icon}</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentRecord.title}
                </h2>
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {currentRecord.record}
                </div>
                {currentRecord.year && (
                  <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Record set in {currentRecord.year}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">📖 What happened?</h3>
                  <p className="text-gray-700 text-lg">{currentRecord.description}</p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">🤯 Fun Fact!</h3>
                  <p className="text-yellow-700 text-lg">{currentRecord.funFact}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevRecord}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                ← Previous Record
              </button>

              {/* Slider and Numeric Indicator */}
              <div className="flex flex-col items-center mx-4 w-64">
                <input
                  type="range"
                  min={0}
                  max={filteredRecords.length - 1}
                  value={currentRecordIndex}
                  onChange={e => setCurrentRecordIndex(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="text-sm text-gray-600 mt-2">
                  Record {currentRecordIndex + 1} of {filteredRecords.length}
                </div>
              </div>

              <button
                onClick={nextRecord}
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Next Record →
              </button>
            </div>
          </div>
        )}

        {/* Educational Note */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">🌟 Did You Know?</h3>
          <p className="text-blue-700">
            The Guinness Book of World Records started in 1955 and has recorded over 40,000 records! 
            People from all around the world try to break records every day. Maybe you could set a record too someday!
          </p>
        </div>

        {/* Challenge Section */}
        <div className="mt-6 bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🏆 Try This at Home!</h3>
          <div className="grid md:grid-cols-2 gap-4 text-green-700">
            <div>
              <p className="mb-2">• How many jumping jacks can you do in 1 minute?</p>
              <p className="mb-2">• How long can you balance on one foot?</p>
              <p>• How many books can you stack before they fall?</p>
            </div>
            <div>
              <p className="mb-2">• How fast can you say the alphabet?</p>
              <p className="mb-2">• How many times can you write your name in 1 minute?</p>
              <p>• How many paper airplanes can you make in 5 minutes?</p>
            </div>
          </div>
          <p className="text-green-600 text-sm mt-4 font-semibold">
            Remember: Always be safe and have an adult help you with any challenges!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuinnessRecords;