import { places, type Place } from './places'
type L = { en: string; de: string }
type O = string[] | { en: string[]; de: string[] }
export interface Q {
  q: L
  o: O
  a: number
}
const x = (en: string, de: string, o: O, a = 0): Q => ({ q: { en, de }, o, a })
const t = (en: string[], de: string[]): O => ({ en, de })
// second question of each quiz module (the first one lives in places.ts)
const extra: Record<string, Q> = {
  rathaus: x('Which city does this town hall serve?', 'Welcher Stadt dient dieses Rathaus?', [
    'Hof',
    'Plauen',
    'Selb',
  ]),
  lorenzkirche: x(
    'Which denomination is the main church of Hof?',
    'Welcher Konfession gehört die Hauptkirche Hofs an?',
    t(['Protestant', 'Orthodox', 'Buddhist'], ['Evangelisch', 'Orthodox', 'Buddhistisch']),
  ),
  michaeliskirche: x(
    'In which country is the Michaeliskirche?',
    'In welchem Land steht die Michaeliskirche?',
    t(['Germany', 'Austria', 'Switzerland'], ['Deutschland', 'Österreich', 'Schweiz']),
  ),
  museum: x(
    'What does the museum mainly show?',
    'Was zeigt das Museum vor allem?',
    t(
      ['Regional history', 'Space travel', 'Dinosaurs'],
      ['Regionalgeschichte', 'Raumfahrt', 'Dinosaurier'],
    ),
  ),
  theresienstein: x(
    'What is the Theresienstein?',
    'Was ist der Theresienstein?',
    t(['A city park', 'A railway', 'A bridge'], ['Ein Stadtpark', 'Eine Eisenbahn', 'Eine Brücke']),
  ),
  tierpark: x(
    'Which animals live in a Tierpark?',
    'Welche Tiere leben in einem Tierpark?',
    t(['Zoo animals', 'Only robots', 'Only fossils'], ['Zootiere', 'Nur Roboter', 'Nur Fossilien']),
  ),
  untreusee: x(
    'What is the Untreusee?',
    'Was ist der Untreusee?',
    t(['A lake', 'A mountain', 'A castle'], ['Ein See', 'Ein Berg', 'Ein Schloss']),
  ),
  freiheitshalle: x(
    'What events does the Freiheitshalle host?',
    'Welche Veranstaltungen finden in der Freiheitshalle statt?',
    t(
      ['Concerts and shows', 'Horse races', 'Ski jumping'],
      ['Konzerte und Shows', 'Pferderennen', 'Skispringen'],
    ),
  ),
  filmtage: x(
    'In which season do the Hofer Filmtage take place?',
    'In welcher Jahreszeit finden die Hofer Filmtage statt?',
    t(['Autumn', 'Spring', 'Summer'], ['Herbst', 'Frühling', 'Sommer']),
  ),
  hochschule: x(
    'What type of university is Hochschule Hof?',
    'Was für eine Hochschule ist die Hochschule Hof?',
    t(
      ['University of Applied Sciences', 'Art academy', 'Military academy'],
      ['Hochschule für angewandte Wissenschaften', 'Kunstakademie', 'Militärakademie'],
    ),
  ),
  saale: x('What is the full name of the city?', 'Wie lautet der volle Name der Stadt?', [
    'Hof (Saale)',
    'Hof (Elbe)',
    'Hof (Rhein)',
  ]),
  altstadt: x(
    'In which country is Hof?',
    'In welchem Land liegt Hof?',
    t(['Germany', 'Czechia', 'Austria'], ['Deutschland', 'Tschechien', 'Österreich']),
  ),
}
export const quizOf = (p: Place): Q[] => [{ q: p.q, o: p.o, a: p.a }, extra[p.id]]
export const totalQ = places.reduce((n, p) => n + quizOf(p).length, 0)
