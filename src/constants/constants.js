export const EMPTY_BULLETS = "<ul><li><br></li></ul>";

export const formLists = [
  {
    title: "Enchanting Kerala 15 nights & 16 Days",
    days: 15,
    emergencyContact: "Mr Pratheesh Thomas",
    emergencyNumber: "WhatsApp+91-9645379919, +91-99625 79919 +91 90617 68888",

    flights: {
      arrivalCity: "Kochi",
      arrivalFlightNumber: "AI 2517",
      arrivalTime: "15:10",
      departureCity: "Kochi",
      departureFlightNumber: "EY 331",
      departureTime: "09:55",
    },
    emergencyContacts: [{ emergencyContactKerala: "", emergencyNumberUK: "" }],
    transportation: [
      {
        service: "Private Car - English Speaking Driver",
        status: "OK",
        transfers: "Kochi Airport - Hotel in Kochi",
      },

      {
        transfers: "Kochi Hotel - Hotel in Munnar",
        service: "Private Car - English Speaking Driver",
        status: "OK",
      },
      {
        transfers: "Hotel in Munnar - Hotel in Thekkady",
        service: "Private Car - English Speaking Driver",
        status: "OK",
      },
      {
        transfers: "Hotel in Thekkady - Houseboat in Alleppey",
        service: "Private Car - English Speaking Driver",
        status: "OK",
      },
      {
        transfers: "Houseboat in Alleppey - Hotel in Marari",
        service: "Private Car - English Speaking Driver",
        status: "OK",
      },
      {
        transfers: "Hotel in Marari - Kochi Airport",
        service: "Private Car - English Speaking Driver",
        status: "OK",
      },
    ],
    hotelItinerary: [
      {
        duration: 2,
        hotelName: "Fragrant Nature, Munnar",
        mealPlan: "Breakfast & Dinner",
        roomType: "Tropic Green- Double",
        rooms: "1",
        status: "Confirmed",
      },
      {
        duration: 2,
        hotelName: "Fragrant Nature , Kochi",
        mealPlan: "Breakfast & Dinner",
        roomType: "Dukes Chamber-Double",
        rooms: "1",
        status: "Confirmed",
      },
      {
        duration: 2,
        hotelName: "Cardamom County, Thekkady",
        mealPlan: "Breakfast & Dinner",
        roomType: "Periyar cottage- Double",
        rooms: "1",
        status: "Confirmed",
      },
      {
        duration: 1,
        hotelName: "Evergreen, Alleppey",
        mealPlan: "Breakfast & Dinner",
        roomType: "Atrium - Double",
        rooms: "1",
        status: "Confirmed",
      },
      {
        duration: 2,
        hotelName: "Fragrant Nature, Kollam",
        mealPlan: "Breakfast & Dinner",
        roomType: "Lake view – Double",
        rooms: "1",
        status: "Confirmed",
      },

      {
        duration: 6,
        hotelName: "Uday Samudra Leisure Beach Hotel, Kovalam",
        roomType: "Dukes Chamber-Double",
        mealPlan: "Breakfast & Dinner",
        rooms: "1",
        status: "Confirmed",
      },
    ],

    groundItinerary: [
      {
        dailyTasks: [
          {
            time: "",
            task: "Meet & Greet at Kochi International Airport, transfer to the hotel",
          },
          {
            time: "",
            task: "Check in at the hotel at early morning Rest of the  day at leisure at the hotel in Kochi",
          },
          {
            time: "",
            task: "Emergency phone number +91 96453 79919 +91 99625 79919",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between from 19:30 till 22:00 Hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kochi Sightseeing with Guide",
          },
          {
            time: "07:30",
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
            time: "",
            task: "Jewish Synagogue, Dutch Palace Mattanchery",
            bulletPoints: [
              "Jewish Synagogue - Built in 1568 AD, it is the oldest and only operational synagogue in Kochi and holds great historical significance. Marvel the architecture wrapped in distinct painted Chinese tiles, Belgian chandeliers and grand lightings. You will find attractive ancient collections and souvenirs inside.",
              "Dutch Palace Mattanchery–It is a popular Portuguese palace which features Kerala murals depicting portraits and exhibits of the kings of Kochi.",
            ],
          },
          {
            time: "14:30",
            task: "Return the hotel in Kochi, evening at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between  from 19:30 till 22:00 Hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kochi to Munnar",
          },
          {
            time: "09:55",
            task: "Departure time to Munnar is at 09:55 hours",
          },
          {
            time: "12:00",
            task: "Proceed to Munnar",
          },

          {
            time: "13:30",
            task: "Lunch Break at Kothamangalam at Local hotel",
          },
          {
            time: "14:30",
            task: "Proceed to Munnar after Lunch",
          },
          {
            time: "15:30",
            task: "Tea  plantation tour  in Munnar",
          },
          {
            time: "17:30",
            task: "Check in at Munnar hotel, evening at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between  from 19:30 till 22:00 Hours",
          },
        ],
      },

      {
        dailyTasks: [
          {
            time: "",
            task: "Munnar Sightseeing",
          },
          {
            time: "07:30",
            task: "Breakfast at the hotel from 07:30 till 10:00 Clock",
          },
          {
            time: "11:00",
            task: "Visit to Tea Museum",
            bulletPoints: [
              "Tea Museum – The museum depicts the history of tea plantation and processing since the ancient times. You can witness the entire process of tea making right from plantation to tasting the different kinds of teas that are displayed. ",
            ],
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
          {
            time: "19:30",
            task: "Dinner at the hotel between  19:30 till 21:30 hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Munnar to Thekkady",
          },
          {
            time: "07:30",
            task: "Breakfast from 07:30 till 10:00 Hours",
          },
          {
            time: "11:15",
            task: "Depart for Cardamom county, Thekkady  at Thekkady",
          },
          {
            time: "13:15",
            task: "Lunch at Nedumkandam",
          },
          {
            time: "14:15",
            task: "Check in at Cardamom county, Thekkady  at Thekkady",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between  19:30 till 21:30 hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Thekkady Sightseeing",
          },
          {
            time: "07:30",
            task: "Breakfast from 07:30 till 10:00 Hours",
          },
          {
            time: "10:00",
            task: "Spice plantation tour in Thekkady with Guide Spice plantation tour – Thekkady is the heaven of spices and this spice tour will leave your senses tingling with joy. Wander in the captivating farms and witness the plantation of spices like black pepper, cardamom, ginger, curcuma, cinnamon, etc.",
          },
          {
            time: "13:00",
            task: "Lunch Break",
          },
          {
            time: "14:15",
            task: "Boating at Thekkady",
            bulletPoints: [
              "Boating in the Periyar Lake – Enjoy boating while witnessing elephants playing with their babies and other wild animals bathing, drinking and resting along the banks of the lake.",
            ],
          },
          {
            time: "17:30",
            task: "Kathakali & Martial Arts Show",
            bulletPoints: [
              "Kathakali& Martial Arts Show – Catch glimpse of the traditional dance form of Kerala performed by skilled artists and soak in the traditional essence. Watch the martial arts and stunts performed by artists showcasing of body control, flexibility and various form of exercises.",
            ],
          },
          {
            time: "19:30",
            task: "19:30 till 21:30 Hours Dinner at the Hotel",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Depart From Thekkady to Alleppey Houseboat at 08 30 hours",
          },
          {
            time: "07:30",
            task: "Breakfast at the hotel from 07:30  till 08:30 Hours",
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
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Depart to Kollam",
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
            time: "11:30",
            task: "Tea Break at Neendakara near Kollam  if required",
          },
          {
            time: "12:00",
            task: "Visit Munroe Island, a hidden pearl in the backwaters composed of a cluster of 8 beautiful islands. Each of these islands is divided by small water channels and lakes. The place is known for its pristine Backwaters and lively rural life. The island boasts of diverse flora and fauna that attract several Migratory birds. You can explore Munroe Island by country boat ride. It is a phenomenal 2 hour boat ride experience That you will cherish for a lifetime. Munroe Island is named in honour of Resident Colonel John Munro of the former Princely State of Travancore. In 1795, the British established their supremacy in South India and the princely state Of Travancore came under their governance. During his tenure, Munro oversaw the land reclamation Efforts in the delta where Kallada River joins Ashamed Lake and the reclaimed island was named after him as Munroe Island.",
          },
          {
            time: "14:30",
            task: "Check in at the Backwater resort in Kollam",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 21:30 hours.",
            description:
              "Lake side or Pool side dinner in Fragrant Nature resort on day 8 Subject to weather Conditions",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kollam",
          },
          {
            time: "06:00",
            task: "Cooking demonstration at Fragrant Nature backwater resort in Kollam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "",
            task: "1 hour speedboat through the backwaters &mangrove in Kollam",
          },
          {
            time: "",
            task: "Ayurvedic Massage for 2 adults at Kollam Backwater resort for 30 Minutes",
          },
          {
            time: "",
            task: "Full Day is at Leisure",
          },

          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 21:30 hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kollam to Kovalam",
          },
          {
            time: "08:00",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "11:30",
            task: "Depart to Kovalam",
          },
          {
            time: "12:30",
            task: "Lunch Break at Kovalam Beach",
          },
          {
            time: "",
            task: "",
            bulletPoints: [
              "15:00 to 17 00 Hours, you may take some rest and enjoy the in-house resort facilities or head to the famous beaches of Kerala, Kappil Beach (8 km. from the resort) and Varkala Beach (15 km. from the resort).Kappil Beach is a beautiful beach-backwater destination known for its tranquillity, natural beauty and soothing atmosphere. The glittering waters of Arabian Sea, golden sand and thick groves of casuarinas trees make this place a must visit.",
              "Papanasam Beach, Varkala Beach is a beautiful stretch of sand renowned for its solitude and impeccable beauty. The water of the beach is known to have medicinal and curative properties. It is believed that taking a dip in the holy waters can cleanse your body of impurities and all sins. In addition to this, it offers a pleasing view with crystal blue waters and cliffs in the backdrop.",
            ],
          },
          {
            time: "13:00",
            task: "",
            bulletPoints: [
              "Hawa beach - Revel in the stunning coastline of Hawa beach by taking a leisurely walk, bask in the sun and enjoy sun bathing, devour in scrumptious seafood at the nearby shacks; enjoy boat ride; or go surfing on the serene waters.",
            ],
          },
          {
            time: "14:30",
            task: "Check in at the beach resort in Kovalam, Rest of the day is at Leisure",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "09:00",
            bulletPoints: [
              "Full day is at Leisure at the beach Resort",
              "Please note that the Chowara beach can be reached within 10 minutes walk However, it is not a place for swimming.",
            ],
            task: "",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 22:00 hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel between 07:30 till 10:00",
          },
          {
            time: "",
            task: "Full day is at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel Between 19:30 till 22:00 Hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "",
            task: "Full day is at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel Between 19:30 till 22:00 Hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "",
            task: "Full day is at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel Between 19:30 till 22:00 Hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "",
            task: "Full day is at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel Between 19:30 till 22:00 Hours",
          },
        ],
      },
      {
        dailyTasks: [
          {
            time: "",
            task: "Depart Kovalam Trivandrum Airport to UK",
          },
          {
            time: "",
            task: "Distance from Kovalam to Trivandrum Airport is 20 Kms and 45 minutes to Reach. For international flights, it is advisable to depart 4 hours before the departure time from the resort and for domestic flights, depart 2 hours & 30 minutes before the departure time from the resort in Kovalam",
          },
          {
            time: "",
            task: "Emergency number +91 96453 79919,+91 99625 79919",
          },
        ],
      },
    ],
    importantPoints: [
      "Standard Check in time at Kochi hotel is 14 00 Hours, Early Check in is Subject to availability",
      "On Day 3 : Departure time to Munnar is at 09:55 hours",
      "Rajamalai national park remains closed from Mid of January till 5th of April every year, Instead of Rajamalai travellers can visit Thettekad Bird Sanctuary without any additional cost",
      "Houseboat check in time is at 12 00 noon",
      "Breakfast & Dinner Timings at the hotels & Houseboat",
      "Breakfast 07 30 till 10:00 Hours",
      "Dinner 19:30 till 22:00 Hours & Houseboat Dinner from 19:00 hours till 21:00 Hours",
    ],
    travelTips: [
      "All travellers arriving at Kochi International airport on Terminal 3 will be greeted at Pillar No. A 3 & Travellers arriving domestic Airport will be greeted at Terminal 1 Exit Point with traveller’s Name and Company placard",

      "Please ensure that your name can be seen on the placard at the exit point prior to exiting the airport. If you are unable to see your name on the placard, The following emergency numbers are of the airport representatives at Cochin International Airport: WhatsApp & Mobile No  +91 94471 56577 +91 94951 57663",

      "As per the Enchanting Kerala  13 Nights and 14 Days itinerary, we are not giving any programme on day 1 due to long flight duration and Jet lag from UK. We request all travellers to take rest on day 1 and spend the day at leisure using the in-house facilities at the hotel in Kochi. (Swimming pool, Spa and Bar facilities)",
      "On day 2, our driver will report at the Kochi hotel at 09 55 hours, for the Kochi Sightseeing, Evening Kathakali Show at Fort Kochi",
      "On Friday and Saturday, Dutch palace and Jewish Synagogue remains closed so travellers arriving on Thursday will have to go for Kochi sightseeing on day 1 itself.",
      "Travel time from Kovalam to Trivandrum airport is 22 Kms. Hence, we request all travellers to checkout from the resort 3 hours& 35 minutes before the flight departure timings.",
      "Travellers are requested to take care of their belongings and make sure that the travel documents are carried at the time of check out from each hotel (Passports, Cash, Valets and mobile phones, If any valuables are missed at the hotel, it will not be an easy procedure to send a courier to a foreign country as per the laws. The courier companies will not accept mobile phones, Tabs, cash, TC's or any other valuables for delivery in a foreign country",
      "Travellers using online check-in facilities with Emirates, Etihad and other Gulf carriers are requested to inform the driver and hotel front office manager in advance at time of check in, Transfers can be organised as per the traveller’s request.",
    ],
  },
  {
    title: "Kerala Retreat 9 nights & 10 days",
    days: 9,
    emergencyContact: "Mr Pratheesh Thomas",
    emergencyNumber: "WhatsApp+91-9645379919, +91-99625 79919 +91 90617 68888",
    data: {
      flightDetails: {
        arrivalCity: "Kochi",
        arrivalFlightNumber: "EY 332",
        arrivalTime: "14:45",
        departureCity: "Kochi",
        departureFlightNumber: "EY 331",
        departureTime: "09:55",
      },
      hotelItinerary: [
        {
          hotelName: "Monsoon Empress, Kochi",
          roomType: "Monsoon Premium room -  Double",
          duration: 2,
          mealPlan: "Breakfast only",
        },
        {
          hotelName: "Mistletoe, Munnar",
          roomType: "Hill  View- Double",
          duration: 2,
          mealPlan: "Breakfast only",
        },
        {
          hotelName: "Wilder nest  -Thekkady",
          roomType: "Superior - Double",
          duration: 2,
          mealPlan: "Breakfast only",
        },
        {
          hotelName: "Evergreen Houseboat, Alleppey",
          roomType: "A/C Deluxe - Double",
          duration: 1,
          mealPlan: "Breakfast, Lunch & dinner",
        },
        {
          hotelName: "Ragas beach villas, Marari",
          roomType: "Beach view room -Double",
          duration: 2,
          mealPlan: "Breakfast only",
        },
      ],
      transportation: [
        { transfers: "Kochi  Airport - Hotel in Kochi" },
        { transfers: "Kochi Hotel - Hotel in Munnar" },
        { transfers: "Hotel in Munnar - Hotel in Thekkady" },
        { transfers: "Hotel in Thekkady - Houseboat in Alleppey" },
        { transfers: "Houseboat in Alleppey-Hotel in Marari" },
        { transfers: "Hotel in Marari - Kochi Airport" },
      ],
      groundItinerary: {
        dailyTasks: [
          {
            time: "",
            task: "Meet & Greet at Kochi International  Airport at Pillar No A 6, transfer to the hotel",
          },
          {
            time: "",
            task: "Check in at the hotel at after 11 00 hours, rest of the day at leisure",
          },
        ],
        dailyTasks: [
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
        dailyTasks: [
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
        dailyTasks: [
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
        dailyTasks: [
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
        dailyTasks: [
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
        dailyTasks: [
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
        dailyTasks: [
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
        dailyTasks: [
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
        dailyTasks: [
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
      },
      importantPoints: [
        "On Day 3: Departure time to Munnar is at 10 30 hours.",
        "Rajamalai national park remains closed from Mid of January till 5th of April every year. Traveler has the option to visit Thattekad bird sanctuary or Devikulam Tea Factory without any additional cost",
        "Houseboat check in time is at 12 00 noon.AC functions only during the bedtime from 19 00 hours till 07 00 clock next day morning.",
        "Breakfast & Dinner Timings at the hotels & Houseboat",
        "Breakfast 07 30 till 10:15 Hours",
        "Dinner 19:30 till 22:00 Hours & Houseboat Dinner from 19:00 hours till 21:00 Hours",
      ],
      travelTips: [
        "Transfer from Marari Beach to Kochi Airport",
        "Check-in time at the beach resort in Marari beach  is at 14:00 hours & check-out time is 12:00 noon. The visitors can even opt for early check-in and late check-out (subject to availability).",
        "Check out time at the beach resort in Marari Beach is  at 12 00 Noon, If rooms are not available for late check-out, travelers can keep the luggage in the lobby or clock room and use the in-house facilities at the resort like swimming pool. The access to beach, sunbeds etc. are available without any additional cost.",
        "It takes 2 hours  drive from Marari Beach to reach Cochin International airport. The travellers must depart from Marari   5  hours prior for International departures & 4 hours for domestic departures. ",
        "Travellers using online check-in facilities with Emirates, Qatar, Etihad & Air India are requested to inform the driver and hotel front office manager in advance at time of check in, Transfers can be organised as per the traveller’s request.",
        "There will not be any refund for early check out, Unutilized services or No shows",
        "Travellers are requested to take care of their belongings and make sure that the travel documents are carried at the time of check out from each hotel (Passports, Cash, Valets and mobile phones, If any valuables are missed at the hotel, it will not be an easy procedure to send a courier to a foreign country as per the laws. The courier companies will not accept mobile phones, Tabs, cash, TC's or any other valuables for delivery in a foreign country",
      ],
    },
  },

  {
    main: {
      title: "Classic Kerala & Backwaters 10 Nights & 11 days",
      numberOfDays: 10,
      emergencyContact: "Mr. Pratheesh Thomas",
      emergencyNumber: "91-9645379919, 91-99625 79919",
    },

    data: {
      hotelItinerary: [
        {
          hotelName: "Fragrant Nature , Kochi",
          roomType: "Dukes Chamber -Double",
          duration: 2,
          rooms: "1",
          mealPlan: "CP",
          status: "Confirmed",
        },
        {
          hotelName: "Indian Summer House, Muvattupuzha",
          roomType: "Sita room- Double",
          duration: 2,
          mealPlan: "All Meals",
          rooms: "1",
          status: "Confirmed",
        },
        {
          hotelName: "Tall Trees ,Munnar",
          roomType: "Cinnamon l Cottage -Double",
          duration: 1,
          mealPlan: "CP",
          rooms: "1",
          status: "Confirmed",
        },
        {
          hotelName: "Spice village  , Thekkady",
          roomType: "Spice garden cottage -Double",
          duration: 2,
          mealPlan: "CP",
          rooms: "1",
          status: "Confirmed",
        },
        {
          hotelName: "Evergreen Houseboat, Alleppey",
          roomType: "Deluxe Houseboat- Double",
          duration: 1,
          mealPlan: "All Meals",
          rooms: "1",
          status: "Confirmed",
        },
        {
          hotelName: "Marari beach resort , Marari Beach",
          roomType: "Garden Villa-Double",
          duration: 2,
          mealPlan: "CP",
          rooms: "1",
          status: "Confirmed",
        },
      ],
      transportation: [
        {
          transfers: "Kochi  Airport - Hotel in Kochi",
          status: "OK",
          service: "Private Car - English Speaking Driver",
        },
        {
          transfers: "Hotel in Kochi  - Indian Summer house Muvattupuzha",
          status: "OK",
          service: "Private Car - English Speaking Driver",
        },
        {
          transfers: " Indian Summer house Muvattupuzha - Hotel in Munnar",
          status: "OK",
          service: "Private Car - English Speaking Driver",
        },
        {
          transfers: "Hotel in Munnar - Hotel in Thekkady",
          status: "OK",
          service: "Private Car - English Speaking Driver",
        },
        {
          transfers: "Hotel in Thekkady - Alleppey Houseboat",
          status: "OK",
          service: "Private Car - English Speaking Driver",
        },
        {
          transfers: "Alleppey Houseboat - Marari Beach",
          status: "OK",
          service: "Private Car - English Speaking Driver",
        },
        {
          transfers: "Marari Beach-Kochi International Airport",
          status: "OK",
          service: "Private Car - English Speaking Driver",
        },
      ],
      groundItinerary: [
        {
          dailyTasks: [
            {
              time: "",
              task: "Meet & Greet at Kochi International  Airport at Pillar No A 3, transfer to the hotel in Kochi",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
            {
              time: "",
              task: "Emergency phone number  +91 99625 79919 /+91 96453 79919/+91 9061776888",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
            {
              time: "",
              task: "Check in at the hotel in Kochi is at  14 00 hours, Early check in is  Subject to availability Rest of the  day at leisure at the hotel in Kochi",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
            {
              time: "",
              task: "Full Day is at leisure",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
          ],
        },
        {
          dailyTasks: [
            {
              time: "",
              task: "Kochi Sightseeing",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
            {
              time: "12:15",
              task: "Depart for Sightseeing from the hotel",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
            {
              time: "13:45",
              task: "Sightseeing of Kochi, Chinese fishing nets, St Francis Church, Dhobi khana.",
              description: "",
              bulletPoints: [
                "Chinese fishing nets – Enjoy spellbinding experience at 500 years old Chinese Fishing Nets or Cheenvala and witness these majestic nets being suspended in mid-air, row upon row by the fishermen.",
                "St Francis Church – Constructed in 1503, it is the oldest European church in India and has great historical significance. It has beautiful structural design and ambience with deep Dutch and Portuguese influences.",
                "Dhobi khana–You can tour through the ancient shades of Kochi at dhobi khana. Witness array of men and women carrying on laundry work and ironing clothes",
                "Santa Cruz Basilica Kochi-  The Santa Cruz Cathedral Basillica at Fort Kochi is one of  the Heritage edifices of Kerala and visited by tourists the whole year in Kochi.",
              ],
            },
            {
              time: "15:30",
              task: "",
              description: "",
              bulletPoints: [
                "Jewish Synagogue - Built in 1568 AD, it is the oldest and only operational synagogue in Kochi and holds great historical significance. Marvel the architecture wrapped in distinct painted Chinese tiles, Belgian chandeliers and grand lightings. You will find attractive ancient collections and souvenirs inside.",
                "Jewish Synagogue",
                "Dutch Palace Mattanchery–It is a popular Portuguese palace which features Kerala murals depicting portraits and exhibits of the kings of Kochi.",
              ],
            },
            {
              time: "17:00",
              task: "Return the hotel in Kochi, Evening at Leisure",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
          ],
        },
        {
          dailyTasks: [
            {
              time: "",
              task: "Kochi to Indian Summer House Muvattupuzha 1 hour 45 minutes",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
            {
              time: "08:30",
              task: "Breakfast between 07:30 to 09:30 Hour",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },
            {
              time: "10:30",
              task: "Check out from Hotel in Kochi & Depart to Indian Sumer House",
              description: "",
              bulletPoints: "<ul><li><br></li></ul>",
            },

            {
              time: "11:00",
              task: "Visit the Folklore museum in Kochi",
              description:
                "Folklore Museum provide art education to the students and helping to provide visual and academic knowledge to the art lovers, researchers and travelers from all over the world. Folklore museum is the only architectural museum in Kerala and the treasure trove of stone, wood and bronze sculptures, ancient terracotta, stone Age objects, jewelry, paintings, oil lamps, musical instruments, tribal and folk art.",
            },
            {
              time: "11:30",
              task: "Depart to Indian Summer House",
            },
            {
              time: "12:45",
              task: "After Lunch Check in  at Indian Summer House at 14:00 Hours",
            },
            {
              time: "16:00",
              task: "Canoe river crossing & afternoon tea at Mohanan's Tea Shop in the evening relax by pool and freshen up for dinner",
            },
            {
              time: "18:30",
              task: "Cooking class with Chef to prepare evening meal Dinner",
            },
            {
              time: "20:00",
              task: "Dinner Time",
            },
          ],
        },
        {
          dailyTasks: [
            {
              time: "",
              task: "Full day is at Leisure at  Indian Summer House",
            },
          ],
        },
        {
          dailyTasks: [
            {
              time: "",
              task: "Indian Summer House to Munnar ( 2 hours 45 Minutes)",
            },
            {
              time: "09:45",
              task: "Check out & depart to Munnar",
            },
            {
              time: "10:45",
              task: "Visit the Cheeyapara Water falls enroute to Munnar",
            },
            {
              time: "12:00",
              task: "Visit to Tea Museum & Tea Factory",
              description:
                "Tea Museum – The museum depicts the history of tea plantation and processing since the ancient times. You can witness the entire process of tea making right from plantation to tasting the different kinds of teas that are displayed.",
            },
            {
              time: "13:00",
              task: "Lunch Break",
            },
            {
              time: "16:00",
              task: "Check in at the hotel in Munnar",
            },
            {
              time: "18:30",
              task: "Return to the hotel in Munnar",
            },
          ],
          dailyTasks: [
            {
              time: "",
              task: "Munnar to Thekkady (3 hours Drive)",
            },
            {
              time: "07:30",
              task: "Breakfast from 07:30 till 08:30 Hours",
            },
            {
              time: "09:00",
              task: "Depart  to Periyar Wildlife Sanctuary in Thekkady",
            },
            {
              time: "11:30",
              task: "Spice Plantation Visit",
              description:
                "Spice plantation tour – Thekkady  is the heaven of spices and this spice tour will leave your senses tingling with joy. Wander in the captivating farms and witness the plantation of spices like black pepper, cardamom, ginger, curcuma, cinnamon, etc.",
            },
            {
              time: "14:00",
              task: "Check in at the Jungle resort in Thekkady",
            },
          ],
          dailyTasks: [
            {
              time: "",
              task: "Thekkady",
            },
            {
              time: "07:00",
              task: "Breakfast from 07:30 till 08:30 Hours",
            },
            {
              time: "08:45",
              task: "Boating at Thekkady",
              description:
                "Boating in the Periyar Lake – Enjoy boating while witnessing elephants playing with their babies and other wild animals bathing, drinking and resting along the banks of the lake.",
            },
            {
              time: "17:00",
              task: "Kathakali",
              description:
                "Kathakali-Catch glimpse of the traditional dance form of Kerala performed by skilled artists and soak in the traditional essence.",
            },
            {
              time: "19:15",
              task: "Return to the hotel",
            },
          ],
          dailyTasks: [
            {
              time: "",
              task: "Depart to Alleppey Houseboat at 08 30 hours",
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
              time: "12:00",
              task: "Check in at Houseboat proceed for backwater cruise, Overnight stay at the houseboat, Lunch around 13 00 Clock at the houseboat",
            },
            {
              time: "14:30",
              task: "13:30 hours till 17:30 Cruise",
            },
            {
              time: "17:30",
              task: "17:30 till 18:30 Village Walk",
            },
            {
              time: "19:30",
              task: "Dinner between 19:30 till 21:00 hours",
            },
          ],
          dailyTasks: [
            {
              time: "",
              task: "Depart from Alleppey Houseboat  to Marari Beach Last Destination",
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
              time: "14:00",
              task: "",
              bulletPoints: [
                "Check in at the beach resort in Marari Beach",
                "Marari Beach is one of the most beautiful beaches in the world. Marari name has been derived from a local village on the coast of the Arabian Sea “Mararikulum”.  Marari beach in Kerala is titled among the top five Hammock Beaches by National Geographic survey. Marari beach is an ideal location for holidaying with friends and family or for a relaxed getaway. The golden sand and coconut trees along the coastline add to the already existing charm of the place. Marari Beach is known for its white sands and enthralling sunsets.",
              ],
            },
          ],
          dailyTasks: [
            {
              time: "",
              task: "Full day is at Leisure at the beach resort",
            },
          ],
          dailyTasks: [
            {
              time: "",
              task: "Depart Marari to Kochi Airport",
            },
            {
              time: "",
              task: "Distance from Marari beach to Kochi Airport is 95  Kms and takes 2 hours  to Reach during the day time,  For international flights, Travellers must depart  5 hours before the Flight departure time from the resort and for domestic flights, travellers must  depart 4 hours  before the departure time from the Resort",
            },
          ],
        },
      ],
      importantPoints: [
        "Check in time at Kochi hotel is 14 00 hours.",
        "On Day 3: Departure from hotel Kochi is at 10:30  hours.",
        "Activity / Excursion can be done in Thekkady or Munnar depending on time availability.",
        "Rajamalai national park remains closed from Mid of January till 5th of April every year. Traveler has the option to visit Tea Factory without any additional cost.",
        "Houseboat check in time is at 12 00 noon",
        "Breakfast & Dinner Timings at the hotels & Houseboat",
        "Breakfast 07 30 till 10:15 Hours",
        "Houseboat Dinner from 19:00 hours till 21:00 Hours",
      ],

      travelTips: [
        "All travellers arriving at Kochi International airport on Terminal 3 will be greeted at Pillar No. A 3 & Travellers arriving domestic Airport will be greeted at Terminal 1 will be greeted at pillar No.34 with traveller’s Name and Affordable Luxury Travel Company placard.",
        "As per the Enchanting Kerala Days itinerary, we are not giving any programme on day 1 due to long flight duration and Jet lag from UK. We request all travellers to take rest on day 1 and spend the day at leisure using the in-house facilities at the hotel in Kochi. (Swimming pool, Kochi Harbour Cruise & Inhouse facilities at the hotel).",
        "On day 2, our driver will report at the Kochi hotel at 10 00 hours.",
        "On Friday and Saturday, Dutch palace and Jewish Synagogue remain closed so travellers arriving on Thursday will have to go for Kochi sightseeing on day itself.",
      ],
      transferFromMarariToAirport: [],
    },
  },
  ////////////////////////////////////
  {
    title: "Enchanting Kerala 13 nights & 14 - Days Fragrant Nature",
    days: 13,
    data: {
      hotelItinerary: [
        {
          hotelName: "Fragrant Nature , Kochi",
          roomType: "Dukes Chamber-Double",
          duration: 2,
        },
        {
          hotelName: "Fragrant Nature, Munnar",
          roomType: "Tropic Green- Double",
          duration: 2,
        },
        {
          hotelName: "Greenwoods, Thekkady",
          roomType: "Aranya – Double",
          duration: 2,
        },
        {
          hotelName: "Evergreen, Alleppey",
          roomType: "Deluxe  Houseboat- Double",
          duration: 1,
        },
        {
          hotelName: "Fragrant Nature, Kollam",
          roomType: "Atrium- Double",
          duration: 2,
        },
        {
          hotelName: "Travancore Heritage, Kovalam",
          roomType: "Beach Grove - Double",
          duration: 4,
        },
      ],
      transportation: [
        { transfers: "Kochi  Airport - Hotel in Kochi" },
        { transfers: "Kochi in Hotel - Hotel in Munnar" },
        { transfers: "Hotel in Munnar - Hotel in Thekkady" },
        { transfers: "Hotel in Thekkady - Houseboat in Alleppey" },
        { transfers: "Houseboat in Alleppey - Hotel in Kovalam" },
        { transfers: "Hotel in Kovalam - Trivandrum Airport" },
      ],
      groundItinerary: {
        dailyTasks: [
          {
            time: "",
            task: "Meet & Greet at Kochi International  Airport, transfer to the hotel",
          },
          {
            time: "",
            task: "Check in at the hotel at early morning. Rest of the  day at leisure at the hotel in Kochi",
          },
          {
            time: "",
            task: "Emergency phone number +91 96453 79919 +91 99625 79919",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between from 19:30 till 22:00 Hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kochi Sightseeing with Guide",
          },
          {
            time: "07:30",
            task: "Breakfast at the hotel from 07:30 till 10:00 Clock",
          },
          {
            time: "11:00",
            task: "Sightseeing of Kochi, Chinese fishing nets, St Francis Church, Dhobi khana.",
            bulletPoints: [
              "Chinese fishing nets – Enjoy spellbinding experience at 500 years old Chinese Fishing Nets or Cheenvala and witness these majestic nets being suspended in mid-air, row upon row by the fishermen.",
              "St Francis Church – Constructed in 1503, it is the oldest European church in India and has great historical significance. It has beautiful structural design and ambience with deep Dutch and Portuguese influences.",
              "Dhobi khana–You can tour through the ancient shades of Kochi at dhobi khana. Witness array of men and women carrying on laundry work and ironing clothes",
            ],
          },
          {
            time: "",
            task: "Jewish Synagogue, Dutch Palace Mattanchery",
            bulletPoints: [
              "Jewish Synagogue - Built in 1568 AD, it is the oldest and only operational synagogue in Kochi and holds great historical significance. Marvel the architecture wrapped in distinct painted Chinese tiles, Belgian chandeliers and grand lightings. You will find attractive ancient collections and souvenirs inside.",
              "Dutch Palace Mattanchery–It is a popular Portuguese palace which features Kerala murals depicting portraits and exhibits of the kings of Kochi.",
            ],
          },
          {
            time: "14:30",
            task: "Return to the hotel in Kochi, evening at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between from 19:30 till 22:00 Hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kochi to Munnar",
          },
          {
            time: "10:30",
            task: "Departure time to Munnar is at 10:30 hours",
          },
          {
            time: "12:00",
            task: "Proceed to Munnar",
          },
          {
            time: "13:30",
            task: "Lunch Break at Kothamangalam at Local hotel",
          },

          {
            time: "14:30",
            task: "Proceed to Munnar after Lunch",
          },
          {
            time: "15:30",
            task: "Tea plantation tour in Munnar",
          },
          {
            time: "17:00",
            task: "Check in at Munnar hotel, evening at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between from 19:30 till 22:00 Hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Munnar Sightseeing",
          },
          {
            time: "07:30",
            task: "Breakfast at the hotel from 07:30 till 08:30 Clock",
          },
          {
            time: "11:00",
            task: "Visit to Tea Museum",
            bulletPoints: [
              "Tea Museum – The museum depicts the history of tea plantation and processing since the ancient times. You can witness the entire process of tea making right from plantation to tasting the different kinds of teas that are displayed. ",
            ],
          },
          {
            time: "13:30",
            task: "Lunch Break",
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
          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 21:30 hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Munnar to Thekkady",
          },
          {
            time: "07:30",
            task: "Breakfast from 07:30 till 10:00 Hours",
          },
          {
            time: "11:15",
            task: "Depart for WGH Poetree, Thekkady  at Thekkady",
          },
          {
            time: "13:15",
            task: "Lunch at Nedumkandam",
          },
          {
            time: "14:15",
            task: "Check in at WGH Poetree, Thekkady  at Thekkady",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 21:30 hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Thekkady Sightseeing",
          },
          {
            time: "07:30",
            task: "Breakfast from 07:30 till 10:00 Hours",
          },
          {
            time: "10:00",
            task: "Spice plantation tour in Thekkady with Guide.",
            description:
              "Spice plantation tour – Thekkady  is the heaven of spices and this spice tour will leave your senses tingling with joy. Wander in the captivating farms and witness the plantation of spices like black pepper, cardamom, ginger, curcuma, cinnamon, etc.",
          },
          {
            time: "13:00",
            task: "Lunch Break",
          },
          {
            time: "14:15",
            task: "Boating at Thekkady",
            bulletPoints: [
              "Boating in the Periyar Lake – Enjoy boating while witnessing elephants playing with their babies and other wild animals bathing, drinking and resting along the banks of the lake.",
            ],
          },
          {
            time: "17:30",
            task: "Kathakali & Martial Arts Show",
            bulletPoints: [
              "Kathakali& Martial Arts Show – Catch glimpse of the traditional dance form of Kerala performed by skilled artists and soak in the traditional essence. Watch the martial arts and stunts performed by artists showcasing of body control, flexibility and various form of exercises.",
            ],
          },
          {
            time: "19:30",
            task: "19:30 till 21:30 Hours Dinner at the Hotel",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Depart From Thekkady to Alleppey Houseboat at 08 30 hours",
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
        dailyTasks: [
          {
            time: "",
            task: "Depart to Kollam",
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
            time: "11:30",
            task: "Tea Break at Neendakara near Kollam if required",
          },
          {
            time: "12:00",
            task: "Visit Munroe Island, a hidden pearl in the backwaters composed of a cluster of 8 beautiful islands. Each of these islands is divided by small water channels and lakes. The place is known for its pristine Backwaters and lively rural life. The island boasts of diverse flora and fauna that attract several Migratory birds. You can explore Munroe Island by country boat ride. It is a phenomenal 2 hour boat ride experience That you will cherish for a lifetime. Munroe Island is named in honour of Resident Colonel John Munro of the former Princely State of Travancore. In 1795, the British established their supremacy in South India and the princely state Of Travancore came under their governance. During his tenure, Munro oversaw the land reclamation Efforts in the delta where Kallada River joins Ashamed Lake and the reclaimed island was named after him as Munroe Island.",
          },
          {
            time: "14:30",
            task: "Check in at the Backwater resort in Kollam",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 21:30 hours.",
            description:
              "Lake side or Pool side dinner in Fragrant Nature resort on day 8 Subject to weather Conditions",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kollam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "",
            task: "1 hour speedboat through the backwaters & mangrove in Kollam",
          },
          {
            time: "",
            task: "Ayurvedic Massage for 2 adults at Kollam Backwater resort for 30 Minutes",
          },
          {
            time: "06:00",
            task: "Cooking demonstration at Fragrant Nature backwater resort in Kollam ",
          },
          {
            time: "",
            task: "Full Day is at Leisure",
          },

          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 21:30 hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kollam to Kovalam",
          },
          {
            time: "08:00",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "11:30",
            task: "Depart to Kovalam",
          },
          {
            time: "12:30",
            task: "Lunch Break at Kovalam Beach",
          },
          {
            time: "",
            task: "",
            bulletPoints: [
              "15:00 to 17 00 Hours, you may take some rest and enjoy the in-house resort facilities or  head to the famous beaches of Kerala, Kappil Beach (8 km. from the resort) and Varkala Beach (15 km. from the resort).Kappil Beach is a beautiful beach-backwater destination known for its tranquillity, natural beauty and soothing atmosphere. The glittering waters of Arabian Sea, golden sand and thick groves of casuarinas trees make this place a must visit.",
              "Papanasam Beach, Varkala Beach is a beautiful stretch of sand renowned for its solitude and impeccable beauty. The water of the beach is known to have medicinal and curative properties. It is believed that taking a dip in the holy waters can cleanse your body of impurities and all sins. In addition to this, it offers a pleasing view with crystal blue waters and cliffs in the backdrop.",
            ],
          },
          {
            time: "13:00",
            task: "",
            bulletPoints: [
              "Hawa beach - Revel in the stunning coastline of Hawa beach by taking a leisurely walk, bask in the sun and enjoy sun bathing, devour in scrumptious seafood at the nearby shacks; enjoy boat ride; or go surfing on the serene waters.",
            ],
          },
          {
            time: "14:30",
            task: "Check in at the beach resort in Kovalam ,Rest of the day is at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel Between 19:30 till 22:00 Hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel between 07:30 till 10:00",
          },
          {
            time: "09:00",
            bulletPoints: [
              "Full day is at Leisure at the beach Resort",
              "Please note that the Chowara beach can be reached within 10 minutes’ walk However, it is not a place for swimming.",
            ],
            task: "",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 22:00 hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel between 07:30 till 10:00",
          },
          {
            time: "",
            task: "Full day is at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel Between 19:30 till 22:00 Hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "",
            task: "Full day is at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel Between 19:30 till 22:00 Hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Depart Kovalam  Trivandrum Airport to UK",
          },
          {
            time: "",
            task: "Distance from Kovalam to Trivandrum Airport is 20 Kms and 45 minutes to reach. For international flights, it is advisable to depart 4 hours before the departure time from the resort and for domestic flights, depart 2 hours & 30 minutes before the departure time from the resort in Kovalam",
          },
        ],
      },
      importantPoints: [
        "Standard Check in time at Kochi hotel is 14 00 Hours, Early Check in is Subject to availability",
        "On Day 3 : Departure time to Munnar is at 09:55 hours",
        "Rajamalai national park remains closed from Mid of January till 5th of April every year, Instead of Rajamalai travellers can visit Thettekad Bird Sanctuary without any additional cost",
        "Houseboat check in time is at 12 00 noon",
        "Breakfast & Dinner Timings at the hotels & Houseboat",
        "Breakfast 07:30 till 10:00 Hours",
        "Dinner 19:30 till 22:00 Hours & Houseboat Dinner from 19:00 hours till 21:00 Hours",
      ],
      travelTips: [
        "All travellers arriving at Kochi International airport on Terminal 3 will be greeted at Pillar No. A 3 & Travellers arriving domestic Airport will be greeted at Terminal 1 Exit Point with traveller’s Name and Company placard",
        "Please ensure that your name can be seen on the placard at the exit point prior to exiting the airport. If you are unable to see your name on the placard, The following emergency numbers are of the airport representatives at Cochin International Airport: WhatsApp & Mobile No  +91 94471 56577 +91 94951 57663",
        "As per the Enchanting Kerala  13 Nights and 14 Days itinerary, we are not giving any programme on day 1 due to long flight duration and Jet lag from UK. We request all travellers to take rest on day 1 and spend the day at leisure using the in-house facilities at the hotel in Kochi. (Swimming pool, Spa and Bar facilities)",
        "On day 2, our driver will report at the Kochi hotel at 09 55 hours, for the Kochi Sightseeing, Evening Kathakali Show at Fort Kochi",
        "On Friday and Saturday, Dutch palace and Jewish Synagogue remains closed so travellers arriving on Thursday will have to go for Kochi sightseeing on day 1 itself.",
        "Travel time from Kovalam to Trivandrum airport is 22 Kms. Hence, we request all travellers to checkout from the resort 3 hours& 35 minutes before the flight departure timings.",
        "Travellers are requested to take care of their belongings and make sure that the travel documents are carried at the time of check out from each hotel (Passports, Cash, Valets and mobile phones, If any valuables are missed at the hotel, it will not be an easy procedure to send a courier to a foreign country as per the laws. The courier companies will not accept mobile phones, Tabs, cash, TC's or any other valuables for delivery in a foreign country",
        "Travellers using online check-in facilities with Emirates, Etihad and other Gulf carriers are requested to inform the driver and hotel front office manager in advance at time of check in, Transfers can be organised as per the traveller’s request.",
      ],
    },
  },
  {
    title: "Enchanting Kerala 13 nights & 14 Days",
    days: 13,
    data: {
      hotelItinerary: [
        {
          hotelName: "Brunton Boatyard, Kochi",
          roomType: "Sea Facing  -Double",
          duration: 2,
        },
        {
          hotelName: "Windermere estate , Munnar",
          roomType: "Garden room  – Double",
          duration: 2,
        },
        {
          hotelName: "Spice village ,Thekkady",
          roomType: "Spice garden cottage  – Double",
          duration: 2,
        },
        {
          hotelName: "Blue Jelly Cruises, Alleppey",
          roomType: "Luxury Boat– Double",
          duration: 1,
          mealPlan: "Breakfast, Lunch & Dinner",
        },
        {
          hotelName: "The Leela Ashtamudi ,A Raviz Hotel",
          roomType: " Grand Heritage Lake view Room- Double",
          duration: 2,
        },
        {
          hotelName: "The Leela Kovalam A Raviz Hotel , Kovalam",
          roomType: "Sea View Villa - Double",
          duration: 4,
        },
      ],
      transportation: [
        { transfers: "Kochi  Airport - Hotel in Kochi" },
        { transfers: "Hotel in Kochi - Hotel in Munnar" },
        { transfers: "Hotel in Munnar - Hotel in Thekkady" },
        { transfers: "Hotel in Thekkady - Houseboat in Alleppey" },
        { transfers: "Houseboat in Alleppey - Hotel in Kovalam" },
        { transfers: "Hotel in Kovalam - Trivandrum Airport" },
      ],
      groundItinerary: {
        dailyTasks: [
          {
            time: "",
            task: "Meet & Greet at Kochi International  Airport at Pillar No A 3, transfer to the hotel in Cochin, rest of the day is at Leisure",
          },
          {
            time: "",
            task: "Check in at the hotel at after 14 00 hours, Rest of the day at leisure",
          },
          {
            time: "",
            task: "Emergency phone number +91 99625 79919 /+91 96453 79919/+91 9061776888",
          },
          {
            time: "17:30",
            task: "Sunset cruise in a motor boat for all in house guests 17:30 PM",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kochi Sightseeing, Breakfast at the hotel from 07:30 till 10:00 Clock",
          },
          {
            time: "10:30",
            task: "Sightseeing of Kochi",
          },
          {
            time: "",
            task: "Sightseeing of Kochi, Chinese fishing nets, St Francis Church, Dhobi khana.",
            bulletPoints: [
              "Chinese fishing nets – Enjoy spellbinding experience at 500 years old Chinese Fishing Nets or Cheenvala and witness these majestic nets being suspended in mid-air, row upon row by the fishermen.",
              "St Francis Church – Constructed in 1503, it is the oldest European church in India and has great historical significance. It has beautiful structural design and ambience with deep Dutch and Portuguese influences.",
              "Dhobi khana–You can tour through the ancient shades of Kochi at dhobi khana. Witness array of men and women carrying on laundry work and ironing clothes",
            ],
          },
          {
            time: "13:00",
            task: "Lunch Break at a local restaurant in Kochi",
          },
          {
            time: "14:00",
            task: "Jewish Synagogue, Dutch Palace Mattanchery",
            bulletPoints: [
              "Jewish Synagogue - Built in 1568 AD, it is the oldest and only operational synagogue in Kochi and holds great historical significance. Marvel the architecture wrapped in distinct painted Chinese tiles, Belgian chandeliers and grand lightings. You will find attractive ancient collections and souvenirs inside.",
              "Dutch Palace Mattanchery–It is a popular Portuguese palace which features Kerala murals depicting portraits and exhibits of the kings of Kochi.",
            ],
          },
          {
            time: "15:30",
            task: "Return to the hotel",
          },
          {
            time: "",
            task: "Evening High Tea at Brunton boatyard",
          },
          {
            time: "17:30",
            task: "Sunset cruise in a motor boat for all in house guests 17:30 PM",
          },
          {
            time: "20:00",
            task: "Dinner at the Fragrant Nature Kochi",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kochi to Munnar",
          },
          {
            time: "",
            task: "07:00 to 08:00 History Walk (Walking tour of Fort Kochi)",
          },
          {
            time: "10:30",
            task: "Departure time to Munnar is at 10:30 hours",
          },
          {
            time: "13:30",
            task: "Lunch Break at Kothamangalam at Local hotel",
          },
          {
            time: "14:30",
            task: "Proceed to Munnar after Lunch",
          },
          {
            time: "15:30",
            task: "Tea plantation tour in Munnar with Guide",
          },
          {
            time: "17:00",
            task: "Check in at Munnar hotel, evening at Leisure",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Munnar Sightseeing",
          },
          {
            time: "07:30",
            task: "Breakfast at the hotel from 07:30 till 08:30 Clock",
          },
          {
            time: "10:30",
            task: "Depart for Munnar Sightseeing",
          },
          {
            time: "11:00",
            task: "Visit to Tea Museum",
            bulletPoints: [
              "Tea Museum – The museum depicts the history of tea plantation and processing since the ancient times. You can witness the entire process of tea making right from plantation to tasting the different kinds of teas that are displayed. ",
            ],
          },
          {
            time: "13:30",
            task: "Lunch Break",
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
        dailyTasks: [
          {
            time: "",
            task: "Munnar to Thekkady",
          },
          {
            time: "07:30",
            task: "Breakfast from 07:30 till 10:00 Hours",
          },
          {
            time: "11:15",
            task: "Depart for  Spice Village ,Thekkady  at Thekkady",
          },
          {
            time: "13:15",
            task: "Lunch at Nedumkandam",
          },
          {
            time: "14:00",
            task: "Spice plantation tour - Munnar is the heaven of spices and this spice tour will leave your senses tingling with joy. Wander in the captivating farms and witness the plantation of spices like black pepper, cardamom, ginger, curcuma, cinnamon, etc. ",
          },
          {
            time: "14:30",
            task: "Check in at Spice Village ,Thekkady at Thekkady",
          },
          {
            time: "17:30",
            task: "17:30  till 19:30  Leisure at hotel",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Depart to Thekkady for Boating",
          },
          {
            time: "07:30",
            task: "Breakfast from 07:30 till 09:00",
          },
          {
            time: "08:30",
            task: "Depart to Thekkady",
          },
          {
            time: "09:30",
            task: "Boating at Thekkady",
            description:
              "Boating in the Periyar Lake – Enjoy boating while witnessing elephants playing with their babies and other wild animals bathing, drinking and resting along the banks of the lake.",
          },
          {
            time: "11:00",
            task: "Visit to Spice Market (Optional)",
            description:
              "Spice Market – Visit spice market to buy spices like rolls of cinnamon, cardamom, nutmeg, star anise, fenugreek, white and green pepper, coriander, cloves, etc.",
          },
          {
            time: "12:30",
            task: "Lunch Break",
          },
          {
            time: "14:00",
            task: "Optional activities ( Elephant Safari or Elephant bath)",
            description:
              "Elephant Safari / bath – Sit on the back of the giant elephant and get the splendid views of nearby valleys and mountains. You can even feed or bath the elephants.",
          },
          {
            time: "16:30",
            task: "Kathakali & Martial Arts Show",
            description:
              "Kathakali & Martial Arts Show – Catch glimpse of the traditional dance form of Kerala performed by skilled artists and soak in the traditional essence. Watch the martial arts and stunts performed by artists showcasing of body control, flexibility and various form of exercises.",
          },
        ],
        dailyTasks: [
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
            task: "Check in at Houseboat proceed for backwater cruise, Overnight stay at the houseboat, Lunch around 13:00 Clock at the houseboat",
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
            time: "19:30",
            task: "Dinner between 19:00 till 21:00 hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Depart to Kollam",
          },
          {
            time: "08:00",
            task: "Breakfast at the houseboat",
          },
          {
            time: "08:30",
            task: "08:30 till 09:30 Cruise through the backwaters",
          },
          {
            time: "09:30",
            task: "Check out and depart to Kollam",
          },
          {
            time: "13:00",
            task: "Lunch Break at Kollam",
          },
          {
            time: "14:00",
            task: "Visit Munroe Island, a hidden pearl in the backwaters composed of a cluster of 8 beautiful islands. Each of these islands is divided by small water channels and lakes. The place is known for its pristine Backwaters and lively rural life. The island boasts of diverse flora and fauna that attract several Migratory birds. You can explore Munroe Island by country boat ride. It is a phenomenal 2 hour boat ride experience That you will cherish for a lifetime. Munroe Island is named in honour of Resident Colonel John Munro of the former Princely State of Travancore. In 1795, the British established their supremacy in South India and the princely state Of Travancore came under their governance. During his tenure, Munro oversaw the land reclamation Efforts in the delta where Kallada River joins Ashamed Lake and the reclaimed island was named after him as Munroe Island.",
          },
          {
            time: "15:00",
            task: "Check in at The Leela Ashtamudi ,A Raviz Hotel Kollam",
          },
          {
            time: "15:00",
            task: "Rest of the day is at leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel between 19:30 till 21:30 hours.",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kollam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00 Clock",
          },
          {
            time: "09:00",
            task: "Full day is at Leisure 09:00 till 13:00 Hours.",
          },
          {
            time: "19:30",
            task: "Dinner between 19:30 till 21:00 hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Kollam to Kovalam",
          },
          {
            time: "07:30",
            task: "Breakfast at the Hotel from 07:30 till 10:00",
          },
          {
            time: "11:30",
            task: "Depart to Kovalam",
          },
          {
            time: "",
            task: "",
            bulletPoints: [
              "Head to the famous beaches of Kerala, Kappil Beach (8 km. from the resort) and Varkala Beach (15 km. from the resort).Kappil Beach is a beautiful beach-backwater destination known for its tranquillity, natural beauty and soothing atmosphere. The glittering waters of Arabian Sea, golden sand and thick groves of casuarinas trees make this place a must visit.",
              "Papanasam Beach, Varkala Beach is a beautiful stretch of sand renowned for its solitude and impeccable beauty. The water of the beach is known to have medicinal and curative properties. It is believed that taking a dip in the holy waters can cleanse your body of impurities and all sins. In addition to this, it offers a pleasing view with crystal blue waters and cliffs in the backdrop.",
              " Your body of impurities and all sins. In addition to this, it offers a pleasing view with crystal blue waters and cliffs in the backdrop",
            ],
          },
          {
            time: "13:00",
            task: "Lunch Break at Kovalam Beach",
          },
          {
            time: "15:00",
            task: "Hawa beach - Revel in the stunning coastline of Hawa beach by taking a leisurely walk, bask in the sun and enjoy sun bathing, devour in scrumptious seafood at the nearby shacks; enjoy boat ride; or go surfing on the serene waters.",
          },
          {
            time: "15:30",
            task: "Check in at the beach resort in Kovalam ,Rest of the day is at Leisure",
          },
          {
            time: "19:30",
            task: "Dinner at the hotel Between 19:30 till 22:00 Hours",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Full day is at Leisure at the beach resort in Kovalam",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Full day is at Leisure at the beach resort in Kovalam",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Full day is at Leisure at the beach resort in Kovalam",
          },
        ],
        dailyTasks: [
          {
            time: "",
            task: "Depart Kovalam to Trivandrum Airport",
          },
          {
            time: "",
            task: "Distance from Kovalam to Trivandrum Airport is 35 Kms and it takes 40 minutes to reach the Trivandrum International  Airport Reach. For  depart 2 hours & 30 minutes before the departure time from the resort in Kovalam",
          },
        ],
      },
      importantPoints: [
        "Check-in time at Kochi hotel is 14:00 hours. Early check-in is subject to availability.",
        "On Day 3: Departure time to Munnar is at 10:30 hours.",
        "Activity / Excursion can be done in Thekkady or Munnar depending on time availability.",
        "Rajamalai national park remains closed from mid-January till 5th of April every year. Traveler has the option to visit Thattekad bird sanctuary or Top station without any additional cost.",
        "Standard check-in time at the houseboat is after 12:00 Noon.",
        "Breakfast & Dinner Timings at the hotels & Houseboat:",
        "Breakfast 07:30 till 10:15 Hours.",
        "Houseboat Dinner from 19:00 hours till 21:00 Hours.",
      ],
      travelTips: [
        "All travellers arriving at Kochi International airport on Terminal 3 will be greeted at Pillar No. A 3 & Travellers arriving domestic Airport will be greeted in front of Federal bank ATM counter with traveller’s Name and Company placard.",
        "As per the Enchanting Kerala 14 Nights & 15 Days itinerary, we are not giving any programme on day 1 due to long flight duration and Jet lag from UK. We request all travellers to take rest on day 1 and spend the day at leisure using the in-house facilities at the hotel in Kochi. (Swimming pool, Spa, and Bar facilities).",
        "On day 2, our driver will report at the Kochi hotel at 09:55 hours.",
        "On Friday and Saturday, Dutch palace and Jewish Synagogue remain closed so travellers arriving on Thursday will have to go for Kochi sightseeing on day 1 itself.",
        "Travel time from Kovalam to Trivandrum airport is 35 Kms. Hence, we request all travellers to checkout from the resort 3 hours & 30 minutes before the flight departure timings for International departures and 2 hours & 45 minutes before domestic departures.",
        "Travellers using online check-in facilities with Emirates, Etihad, and other Gulf carriers are requested to inform the driver and hotel front office manager in advance at time of check-in. Transfers can be organised as per the traveller’s request.",
        "Travellers are requested to take care of their belongings and make sure that the travel documents are carried at the time of check-out from each hotel (Passports, Cash, Valets, and mobile phones). If any valuables are missed at the hotel, it will not be an easy procedure to send a courier to a foreign country as per the laws. The courier companies will not accept mobile phones, Tabs, cash, TC's, or any other valuables for delivery in a foreign country.",
      ],
    },
  },
];
