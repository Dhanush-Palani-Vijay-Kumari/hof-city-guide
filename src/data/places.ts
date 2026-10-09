export type Category = 'history' | 'nature' | 'culture'
type L = { en: string; de: string }
export interface Place {
  id: string
  name: string
  cat: Category
  lat: number
  lng: number
  desc: L
  q: L
  o: string[] | { en: string[]; de: string[] }
  a: number
}
// NOTE: coordinates are approximate. Verify them in Google Maps before relying on the 100 m check-in.
export const places: Place[] = [
  {
    id: 'rathaus',
    name: 'Rathaus Hof',
    cat: 'history',
    lat: 50.3173,
    lng: 11.9151,
    desc: {
      en: 'The town hall stands in the heart of the old town and reflects how Hof was rebuilt after a devastating city fire.',
      de: 'Das Rathaus steht im Herzen der Altstadt und erinnert an den Wiederaufbau Hofs nach einem verheerenden Stadtbrand.',
    },
    q: {
      en: 'In which year did a great fire destroy much of Hof?',
      de: 'In welchem Jahr zerstörte ein großer Stadtbrand weite Teile Hofs?',
    },
    o: ['1723', '1823', '1923'],
    a: 1,
  },
  {
    id: 'lorenzkirche',
    name: 'Lorenzkirche',
    cat: 'history',
    lat: 50.3171,
    lng: 11.9139,
    desc: {
      en: 'St. Lorenz is the main Protestant church of Hof, a landmark of the old town with a tall tower.',
      de: 'St. Lorenz ist die evangelische Hauptkirche Hofs und mit ihrem hohen Turm ein Wahrzeichen der Altstadt.',
    },
    q: {
      en: 'Which saint gives the main Protestant church its name?',
      de: 'Welcher Heilige gibt der evangelischen Hauptkirche ihren Namen?',
    },
    o: ['St. Lorenz', 'St. Peter', 'St. Georg'],
    a: 0,
  },
  {
    id: 'michaeliskirche',
    name: 'Michaeliskirche',
    cat: 'history',
    lat: 50.3188,
    lng: 11.9137,
    desc: {
      en: 'A second historic church of the city, named after an archangel and a quiet stop away from the main streets.',
      de: 'Eine zweite historische Kirche der Stadt, benannt nach einem Erzengel, abseits der Hauptstraßen.',
    },
    q: {
      en: 'Which archangel gives this church its name?',
      de: 'Welcher Erzengel gibt dieser Kirche ihren Namen?',
    },
    o: ['Michael', 'Gabriel', 'Raphael'],
    a: 0,
  },
  {
    id: 'museum',
    name: 'Museum Bayerisches Vogtland',
    cat: 'history',
    lat: 50.3178,
    lng: 11.9134,
    desc: {
      en: 'The regional museum tells the story of the Bavarian Vogtland, its crafts, industry and everyday life.',
      de: 'Das Regionalmuseum erzählt die Geschichte des Bayerischen Vogtlands, seines Handwerks, seiner Industrie und des Alltags.',
    },
    q: {
      en: 'Which region does the museum focus on?',
      de: 'Auf welche Region konzentriert sich das Museum?',
    },
    o: ['Vogtland', 'Allgäu', 'Altmühltal'],
    a: 0,
  },
  {
    id: 'theresienstein',
    name: 'Theresienstein',
    cat: 'nature',
    lat: 50.3286,
    lng: 11.9087,
    desc: {
      en: "Hof's large city park with old trees, paths and viewpoints is the favourite place for walks and relaxing.",
      de: 'Hofs großer Stadtpark mit altem Baumbestand, Wegen und Aussichtspunkten ist beliebt für Spaziergänge und Erholung.',
    },
    q: {
      en: 'Which city is home to the Theresienstein park?',
      de: 'In welcher Stadt liegt der Park Theresienstein?',
    },
    o: ['Hof', 'Bayreuth', 'Plauen'],
    a: 0,
  },
  {
    id: 'tierpark',
    name: 'Tierpark Theresienstein',
    cat: 'nature',
    lat: 50.3277,
    lng: 11.9103,
    desc: {
      en: 'A small zoo inside the park, popular with families and a nice break during a walk.',
      de: 'Ein kleiner Tierpark im Stadtpark, bei Familien beliebt und eine schöne Pause beim Spaziergang.',
    },
    q: {
      en: 'In which Bavarian administrative district is Hof?',
      de: 'In welchem bayerischen Regierungsbezirk liegt Hof?',
    },
    o: ['Oberfranken', 'Schwaben', 'Oberpfalz'],
    a: 0,
  },
  {
    id: 'untreusee',
    name: 'Untreusee',
    cat: 'nature',
    lat: 50.3347,
    lng: 11.9437,
    desc: {
      en: 'A recreational lake near the city, ideal for swimming in summer and for walks and cycling around the shore.',
      de: 'Ein Naherholungssee bei der Stadt, im Sommer zum Baden und rund ums Ufer zum Spazieren und Radfahren ideal.',
    },
    q: {
      en: 'What is Untreusee best suited for?',
      de: 'Wofür eignet sich der Untreusee am besten?',
    },
    o: {
      en: ['Swimming and walking', 'Skiing', 'Glacier hiking'],
      de: ['Baden und Spazieren', 'Skifahren', 'Gletscherwandern'],
    },
    a: 0,
  },
  {
    id: 'freiheitshalle',
    name: 'Freiheitshalle',
    cat: 'culture',
    lat: 50.3128,
    lng: 11.9218,
    desc: {
      en: "The city's event hall hosts concerts, theatre and shows, and is the home stage of the Hofer Symphoniker.",
      de: 'Die Veranstaltungshalle der Stadt zeigt Konzerte, Theater und Shows und ist die Heimbühne der Hofer Symphoniker.',
    },
    q: { en: 'Which orchestra is based in Hof?', de: 'Welches Orchester hat seinen Sitz in Hof?' },
    o: ['Hofer Symphoniker', 'Berliner Philharmoniker', 'Wiener Symphoniker'],
    a: 0,
  },
  {
    id: 'filmtage',
    name: 'Hofer Filmtage (Scala)',
    cat: 'culture',
    lat: 50.3189,
    lng: 11.917,
    desc: {
      en: "Every autumn the Internationale Hofer Filmtage bring filmmakers and fans to the city, one of Germany's best known film festivals.",
      de: 'Jeden Herbst bringen die Internationalen Hofer Filmtage Filmschaffende und Fans in die Stadt, eines der bekanntesten deutschen Filmfestivals.',
    },
    q: {
      en: 'In which year were the Hofer Filmtage founded?',
      de: 'In welchem Jahr wurden die Hofer Filmtage gegründet?',
    },
    o: ['1957', '1967', '1977'],
    a: 1,
  },
  {
    id: 'hochschule',
    name: 'Hochschule Hof',
    cat: 'culture',
    lat: 50.3238,
    lng: 11.9376,
    desc: {
      en: 'The University of Applied Sciences brings students from many countries to Hof and shapes the young side of the city.',
      de: 'Die Hochschule für angewandte Wissenschaften bringt Studierende aus vielen Ländern nach Hof und prägt die junge Seite der Stadt.',
    },
    q: { en: 'In which German state is Hof located?', de: 'In welchem Bundesland liegt Hof?' },
    o: ['Bayern', 'Sachsen', 'Hessen'],
    a: 0,
  },
  {
    id: 'saale',
    name: 'Saaleauen',
    cat: 'nature',
    lat: 50.3152,
    lng: 11.9185,
    desc: {
      en: 'Walk or cycle along the river Saale, which flows through the city and gives it the full name Hof (Saale).',
      de: 'Spazieren oder Radfahren entlang der Saale, die durch die Stadt fließt und ihr den vollen Namen Hof (Saale) gibt.',
    },
    q: { en: 'Which river flows through Hof?', de: 'Welcher Fluss fließt durch Hof?' },
    o: ['Saale', 'Elbe', 'Rhein'],
    a: 0,
  },
  {
    id: 'altstadt',
    name: 'Altstadt Hof',
    cat: 'history',
    lat: 50.3176,
    lng: 11.9161,
    desc: {
      en: 'The old town invites you to stroll between shops, cafés and historic buildings that were rebuilt after the great fire.',
      de: 'Die Altstadt lädt zum Bummeln zwischen Geschäften, Cafés und historischen Gebäuden ein, die nach dem großen Brand wieder aufgebaut wurden.',
    },
    q: {
      en: 'What can you mainly do in the old town?',
      de: 'Was kann man in der Altstadt vor allem tun?',
    },
    o: {
      en: ['Shop and visit cafés', 'Ski', 'Surf'],
      de: ['Einkaufen und Cafés besuchen', 'Skifahren', 'Surfen'],
    },
    a: 0,
  },
]
