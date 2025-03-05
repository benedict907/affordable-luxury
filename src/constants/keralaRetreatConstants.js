export const hotelItinerary = [
  {
    name: "Monsoon Empress, Kochi",
    roomType: "Monsoon Premium room -  Double",
    durationNights: 2,
    mealPlan: "Breakfast only",
  },
  {
    name: "Mistletoe, Munnar",
    roomType: "Hill  View- Double",
    durationNights: 2,
    mealPlan: "Breakfast only",
  },
  {
    name: "Wilder nest  -Thekkady",
    roomType: "Superior - Double",
    durationNights: 2,
    mealPlan: "Breakfast only",
  },
  {
    name: "Evergreen Houseboat, Alleppey",
    roomType: "A/C Deluxe - Double",
    durationNights: 1,
    mealPlan: "Breakfast, Lunch & dinner",
  },
  {
    name: "Ragas beach villas, Marari",
    roomType: "Beach view room -Double",
    durationNights: 2,
    mealPlan: "Breakfast only",
  },
];

export const transportationDocument = [
  { transfer: "Kochi  Airport - Hotel in Kochi" },
  { transfer: "Kochi Hotel - Hotel in Munnar" },
  { transfer: "Hotel in Munnar - Hotel in Thekkady" },
  { transfer: "Hotel in Thekkady - Houseboat in Alleppey" },
  { transfer: "Houseboat in Alleppey-Hotel in Marari" },
  { transfer: "Hotel in Marari - Kochi Airport" },
];

export const groundItinerary = {
  day1: [
    {
      time: "",
      task: "Meet & Greet at Kochi International  Airport at Pillar No A 6, transfer to the hotel",
    },
    {
      time: "",
      task: "Check in at the hotel at after 11 00 hours, rest of the day at leisure",
    },
  ],
  day2: [
    {
      time: "",
      task: "Breakfast at the hotel from 07:30 till 10:00 Clock",
    },
    {
      time: "10:00",
      task: "Sightseeing of Kochi, Chinese fishing nets, St Francis Church, Dhobi khana.",
      bulletPoints: [
        "Chinese fishing nets – Enjoy spellbinding experience at 500 years old Chinese Fishing Nets or Cheenvala and witness these majestic nets being suspended in mid-air, row upon row by the fishermen.",
        "St Francis Church – Constructed in 1503, it is the oldest European church in India and has great historical significance. It has beautiful structural design and ambience with deep Dutch and Portuguese influences.",
        "Dhobi khana–You can tour through the ancient shades of Kochi at dhobi khana. Witness array of men and women carrying on laundry work and ironing clothes",
      ],
    },
    {
      time: "12:00",
      task: "Jewish Synagogue, Dutch Palace Mattanchery",
      bulletPoints: [
        "Jewish Synagogue - Built in 1568 AD, it is the oldest and only operational synagogue in Kochi and holds great historical significance. Marvel the architecture wrapped in distinct painted Chinese tiles, Belgian chandeliers and grand lightings. You will find attractive ancient collections and souvenirs inside.",
        "Dutch Palace Mattanchery–It is a popular Portuguese palace which features Kerala murals depicting portraits and exhibits of the kings of Kochi.",
      ],
    },
    {
      time: "13:00",
      task: "Lunch break at Fort kochi",
    },
    {
      time: "",
      task: "Afternoon is at leisure",
    },
  ],
  day3: [
    {
      time: "",
      task: "Breakfast from 07:30 till 10:00 clock",
    },
    {
      time: "10:30",
      task: "Departure time to Munnar is at 10 : 30 hours",
    },
    {
      time: "11:00",
      task: "En-route Visit to Hill palace Museum in Thripunithara",
      description:
        "Hill palace Museum – Built in 1865, it is the largest and first ever heritage archaeological museum in Kerala. Marvel the traditional Kerala style of architecture, sculptures, antique ceramics, oil-paintings, murals, manuscripts and belongings of the Kochi royal family.",
    },

    {
      time: "13:30",
      task: "Lunch at Munnar",
    },
    {
      time: "14:00",
      task: "Check in at the hotel at after 14 00 hours, rest of the day at leisure",
    },
  ],
  day4: [
    {
      time: "",
      task: "Munnar Sightseeing",
    },
    {
      time: "07:30",
      task: "Breakfast at the hotel from 07:30 till 08:30 Hours",
    },
    {
      time: "12:00",
      task: "Visit to Tea Museum",
      bulletPoints: [
        "Tea Museum – The museum depicts the history of tea plantation and processing since the ancient times. You can witness the entire process of tea making right from plantation to tasting the different kinds of teas that are displayed. ",
      ],
    },

    {
      time: "13:00",
      task: "Lunch break",
    },

    {
      time: "14:30",
      task: "Sightseeing of Mattupetty,Kundala,Eco point,Pothamedu View point & Tea Museum",
      bulletPoints: [
        "Mattupetty – It is a beautiful picnic spot where you can enjoy breath-taking views of valley sitting along the serene lake and dam. The lush tea plantations and forests in and around Mattupetty are also popular for trekking.",
        "Kundala – This picturesque place is famous for the cherry blossoms which appear twice in a year and NeelaKurunji flowers which bloom once in twelve years. You can visit the Kundala Lake or Asia’s first Arch dam and enjoy boating or visit Aruvikkad Waterfall nearby.",
        "Eco point–It is popular for its natural echo phenomenon and visitors love walking in the lush greenery surrounding the place.",
        "Pothamedu View point - Set amidst tea and coffee plantations and undulating hills, this place is a paradise for nature lovers. It offers panoramic views of the town and adjoining valleys.",
      ],
    },
    {
      time: "18:30",
      task: "Return to the hotel in Munnar",
    },
  ],
  day5: [
    {
      time: "",
      task: "Munnar to Thekkady",
    },
    {
      time: "07:30",
      task: "Breakfast from 07:30 till 10:00 Hours",
    },
    {
      time: "10:15",
      task: "Depart for Thekkady",
    },
    {
      time: "12:15",
      task: "Lunch at Thekkady",
    },
    {
      time: "14:15",
      task: "Check in at the Resorts in Thekkady",
    },
    {
      time: "17:30",
      task: "17:30 till 19:30 hours at Leisure",
    },
    {
      time: "19:30",
      task: "19:30 till 21:30 Hours Dinner at the Hotel",
    },
  ],
  day6: [
    {
      time: "",
      task: "Depart to Thekkady for Boating",
    },
    {
      time: "07:30",
      task: "Breakfast at the hotel from 07:30 till 09:00",
    },
    {
      time: "08:30",
      task: "Depart to Thekkady",
    },
    {
      time: "09:30",
      task: "Boating at Thekkady",
      bulletPoints: [
        "Boating in the Periyar Lake – Enjoy boating while witnessing elephants playing with their babies and other wild animals bathing, drinking and resting along the banks of the lake.",
      ],
    },
    {
      time: "11:00",
      task: "Visit to Spice Market ( Optional)",
      description:
        "Spice Market – Visit spice market to buy spices like rolls of cinnamon, cardamom, nutmeg, star anise, fenugreek, white and green pepper, coriander, cloves, etc.",
    },
    {
      time: "12:30",
      task: "Lunch Break",
    },
    {
      time: "14:00",
      task: "Optional activities ( Elephant Safari or Elephant bath )",
      description:
        "Elephant Safari / bath – Sit on the back of the giant elephant and get the splendid views of nearby valleys and mountains. You can even feed or bath the elephants.",
    },
    {
      time: "16:00",
      task: "Return to Hotel in Thekkady",
    },
    {
      time: "19:30",
      task: "19:30 till 21:30 Hours Dinner at the Hotel",
    },
  ],
  day7: [
    {
      time: "",
      task: "Depart to Alleppey Houseboat at 08 30 hours via Kuttikanam Hills",
    },
    {
      time: "07:30",
      task: "Breakfast at the hotel from 07:30 till 08:30 Hours",
    },
    {
      time: "08:30",
      task: "Check out & Depart to Alleppey Houseboat",
    },
    {
      time: "10:30",
      task: "Tea Break at Kanjirapally for 30 minutes",
    },
    {
      time: "12:15",
      task: "Check in at Houseboat proceed for backwater cruise, Overnight stay at the houseboat, Lunch around 13 00 Clock at the houseboat",
    },
    {
      time: "14:30",
      task: "14:30 hours till 17:30 Cruise",
    },
    {
      time: "17:30",
      task: "17:30 till 18:30 Village Walk",
    },
    {
      time: "19:00",
      task: "Dinner between 19:00 till 21:00 hours",
    },
  ],
  day8: [
    {
      time: "",
      task: "Depart to Marari",
    },
    {
      time: "08:00",
      task: "Breakfast at the houseboat",
    },
    {
      time: "09:30",
      task: "08:30 till 09:30 Cruise through the backwaters",
    },
    {
      time: "09:30",
      task: "Check out and depart to Marari",
    },
    {
      time: "19:30",
      task: "After lunch check in at the resort in Marari",
    },
  ],
  day9: [
    {
      time: "",
      task: "Marari",
    },
    {
      time: "07:30",
      task: "Breakfast at the hotel Between 07:30 till 10:00 Clock",
    },
    {
      time: "09:00",
      task: "Full day is at leisure at beach resort",
    },
    {
      time: "19:30",
      task: "Dinner between 19:30 till 21:00 hours",
    },
  ],
  day10: [
    {
      time: "",
      task: "Depart Marari to Kochi Airport ( 2 hours Drive)",
    },
    {
      time: "",
      task: "Distance from Marari beach to Kochi Airport is 95  Kms and takes 2 hours  to Reach during the day time,  For international flights, Travellers must depart  5 hours before the Flight departure time from the resort and for domestic flights, travellers must  depart 4 hours  before the departure time from the Resort",
    },
    {
      time: "",
      task: "Emergency number +91 96453 79919,+91 99625 79919",
    },
  ],
};

export const importantPoints = [
  "On Day 3: Departure time to Munnar is at 10 30 hours.",
  "Rajamalai national park remains closed from Mid of January till 5th of April every year. Traveler has the option to visit Thattekad bird sanctuary or Devikulam Tea Factory without any additional cost",
  "Houseboat check in time is at 12 00 noon.AC functions only during the bedtime from 19 00 hours till 07 00 clock next day morning.",
  "Breakfast & Dinner Timings at the hotels & Houseboat",
  "Breakfast 07 30 till 10:15 Hours",
  "Dinner 19:30 till 22:00 Hours & Houseboat Dinner from 19:00 hours till 21:00 Hours",
];

export const travelTips = [
  "Transfer from Marari Beach to Kochi Airport",
  "Check-in time at the beach resort in Marari beach  is at 14:00 hours & check-out time is 12:00 noon. The visitors can even opt for early check-in and late check-out (subject to availability).",
  "Check out time at the beach resort in Marari Beach is  at 12 00 Noon, If rooms are not available for late check-out, travelers can keep the luggage in the lobby or clock room and use the in-house facilities at the resort like swimming pool. The access to beach, sunbeds etc. are available without any additional cost.",
  "It takes 2 hours  drive from Marari Beach to reach Cochin International airport. The travellers must depart from Marari   5  hours prior for International departures & 4 hours for domestic departures. ",
  "Travellers using online check-in facilities with Emirates, Qatar, Etihad & Air India are requested to inform the driver and hotel front office manager in advance at time of check in, Transfers can be organised as per the traveller’s request.",
  "There will not be any refund for early check out, Unutilized services or No shows",
  "Travellers are requested to take care of their belongings and make sure that the travel documents are carried at the time of check out from each hotel (Passports, Cash, Valets and mobile phones, If any valuables are missed at the hotel, it will not be an easy procedure to send a courier to a foreign country as per the laws. The courier companies will not accept mobile phones, Tabs, cash, TC's or any other valuables for delivery in a foreign country",
];
