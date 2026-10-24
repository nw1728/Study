// Everyone on the team, as one flat list. `subteam` holds a subteam's slug;
// the two are joined back together when a page renders (src/content/useMembers.js).
//
// One list rather than a list inside each subteam, because people join and
// leave roughly every three months: during a changeover you want to see
// everyone at once, and moving someone is one dropdown, not a delete and a
// retype. Members without a photo show their initials.
export const members = [
  { id: 'marijn-gashroff', name: 'Marijn Gashroff', role: 'Team Manager', photo: '/images/members/marijn-gashroff.jpg', subteam: 'management' },
  { id: 'nikolaos-diamantopoulos', name: 'Nikolaos Diamantopoulos', role: 'Financial Manager', photo: '/images/members/nikolaos-diamantopoulos.jpg', subteam: 'management' },
  { id: 'mariam-adela-mosallam', name: 'Mariam Adela Mosallam', role: 'External Affairs Manager', photo: '/images/members/mariam-adela-mosallam.jpg', subteam: 'management' },
  { id: 'zodi-minetti', name: 'Zodi Minetti', role: 'Transitional Manager', subteam: 'management' },
  { id: 'myrto-pierrakou', name: 'Myrto Pierrakou', role: 'Mechanical Team Lead', photo: '/images/members/myrto-pierrakou.jpg', subteam: 'mechanical' },
  { id: 'adriana-gea-gonzalez', name: 'Adriana Gea Gonzalez', role: 'Mechanical Engineer', subteam: 'mechanical' },
  { id: 'erik-rusnak', name: 'Erik Rusnák', role: 'Mechanical Engineer', photo: '/images/members/erik-rusnak.jpg', subteam: 'mechanical' },
  { id: 'ludwig-franz-kumpf', name: 'Ludwig Franz Kumpf', role: 'Mechanical Engineer', photo: '/images/members/ludwig-franz-kumpf.jpg', subteam: 'mechanical' },
  { id: 'alimkhan-tlepbergen', name: 'Alimkhan Tlepbergen', role: 'Mechanical Engineer', photo: '/images/members/alimkhan-tlepbergen.jpg', subteam: 'mechanical' },
  { id: 'ernesto-castro-martin', name: 'Ernesto Castro Martín', role: 'Electrical Team Lead', photo: '/images/members/ernesto-castro-martin.jpg', subteam: 'electrical' },
  { id: 'sasha-vyrovets', name: 'Sasha Vyrovets', role: 'Electrical Engineer', subteam: 'electrical' },
  { id: 'nicholas-bajada', name: 'Nicholas Bajada', role: 'Electrical Engineer', subteam: 'electrical' },
  { id: 'renata-gonta', name: 'Renata Gonța', role: 'Electrical Engineer', photo: '/images/members/renata-gonta.jpg', subteam: 'electrical' },
  { id: 'janos-katai', name: 'János Kátai', role: 'Electrical Engineer', photo: '/images/members/janos-katai.jpg', subteam: 'electrical' },
  { id: 'nikolaos-diamantopoulos-2', name: 'Nikolaos Diamantopoulos', role: 'Embedded Team Lead', photo: '/images/members/nikolaos-diamantopoulos-embedded.jpg', subteam: 'embedded' },
  { id: 'shishir-sudeesh-nambiar', name: 'Shishir Sudeesh Nambiar', role: 'Embedded Engineer', photo: '/images/members/shishir-sudeesh-nambiar.jpg', subteam: 'embedded' },
  { id: 'jaron-lendering', name: 'Jaron Lendering', role: 'Embedded Engineer', photo: '/images/members/jaron-lendering.jpg', subteam: 'embedded' },
  { id: 'irem-civginer', name: 'İrem Civginer', role: 'Embedded Engineer', photo: '/images/members/irem-civginer.jpg', subteam: 'embedded' },
  { id: 'lisa-te-braak', name: 'Lisa te Braak', role: 'Embedded Engineer', photo: '/images/members/lisa-te-braak.jpg', subteam: 'embedded' },
  { id: 'ege-daglar', name: 'Ege Daglar', role: 'Control Engineer', photo: '/images/members/ege-daglar.jpg', subteam: 'control' },
  { id: 'mohammed-mosallam', name: 'Mohammed Mosallam', role: 'Control Engineer', photo: '/images/members/mohammed-mosallam.jpg', subteam: 'control' },
  { id: 'naren-niranjan', name: 'Naren Niranjan', role: 'Control Engineer', photo: '/images/members/naren-niranjan.jpg', subteam: 'control' },
  { id: 'rowan-ali', name: 'Rowan Ali', role: 'Control Engineer', photo: '/images/members/rowan-ali.jpg', subteam: 'control' },
  { id: 'dmytro-khorsun', name: 'Dmytro Khorsun', role: 'Software & AI Team Lead', photo: '/images/members/dmytro-khorsun.jpg', subteam: 'software-&-ai' },
  { id: 'candela-cimadevilla-gonzalez', name: 'Candela Cimadevilla Gonzalez', role: 'Software & AI Engineer', photo: '/images/members/candela-cimadevilla-gonzalez.jpg', subteam: 'software-&-ai' },
  { id: 'andrei-badea', name: 'Andrei Badea', role: 'Software & AI Engineer', photo: '/images/members/andrei-badea.jpg', subteam: 'software-&-ai' },
  { id: 'narendra-setty', name: 'Narendra Setty', role: 'Software & AI Engineer', photo: '/images/members/narendra-setty.jpg', subteam: 'software-&-ai' },
  { id: 'illia-guzerya', name: 'Illia Guzerya', role: 'Software & AI Engineer', photo: '/images/members/illia-guzerya.jpg', subteam: 'software-&-ai' },
  { id: 'demir-koksal', name: 'Demir Koksal', role: 'Scientific Researcher', subteam: 'science' },
  { id: 'nathalie-kamp', name: 'Nathalie Kamp', role: 'Education', photo: '/images/members/nathalie-kamp.jpg', subteam: 'education' },
  { id: 'mariam-adela-mosallam-2', name: 'Mariam Adela Mosallam', role: 'PR Lead', photo: '/images/members/mariam-adela-mosallam-pr.jpg', subteam: 'public-relations' },
]
