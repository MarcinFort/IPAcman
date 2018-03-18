export const consonants = [

{
    name: "m",
    place: "bilabial",
    manner: "nasal",
    class: "sonorant",
    voice: true
},

{
    name: "b",
    place: "bilabial",
    manner: "plosive",
    class: "obstruent",
    voice: true
},

{
    name: "p",
    place: "bilabial",
    manner: "plosive",
    class: "obstruent",
    voice: false
},

{
    name: "v",
    place: "labiodental",
    manner: "fricative",
    class: "obstruent",
    voice: true
},

{
    name: "f",
    place: "labiodental",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "T",
    place: "dental",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "D",
    place: "dental",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "n",
    place: "alveolar",
    manner: "nasal",
    class: "sonorant",
    voice: true
},

{
    name: "d",
    place: "alveolar",
    manner: "plosive",
    class: "obstruent",
    voice: true
},

{
    name: "t",
    place: "alveolar",
    manner: "plosive",
    class: "obstruent",
    voice: false
},

{
    name: "z",
    place: "alveolar",
    manner: "fricative",
    class: "obstruent",
    voice: true
},

{
    name: "s",
    place: "alveolar",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "l",
    place: "alveolar",
    manner: "approximant",
    class: "sonorant",
    voice: true
},

{
    name: "r",
    place: "postalveolar",
    manner: "approximant",
    class: "sonorant",
    voice: true
},

{
    name: "dZ",
    place: "palato-alveolar",
    manner: "affricate",
    class: "obstruent",
    voice: true
},

{
    name: "tS",
    place: "palato-alveolar",
    manner: "affricate",
    class: "obstruent",
    voice: false
},

{
    name: "Z",
    place: "palato-alveolar",
    manner: "fricative",
    class: "obstruent",
    voice: true
},

{
    name: "S",
    place: "palato-alveolar",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "j",
    place: "palatal",
    manner: "approximant",
    class: "sonorant",
    voice: true
},

{
    name: "N",
    place: "velar",
    manner: "nasal",
    class: "sonorant",
    voice: true
},

{
    name: "g",
    place: "velar",
    manner: "plosive",
    class: "obstruent",
    voice: true
},

{
    name: "k",
    place: "velar",
    manner: "plosive",
    class: "obstruent",
    voice: false
},

{
    name: "w",
    place: "labio-velar",
    manner: "approximant",
    class: "sonorant",
    voice: true
},

{
    name: "h",
    place: "glottal",
    manner: "fricative",
    class: "obstruent",
    voice: false
}
];


export const vowels = [

{
    name: "I",
    vertical: "close",
    horizontal: "front",
    long: false,
    tense: false,
    rounded: false
},

{
    name: "e",
    vertical: "mid",
    horizontal: "front",
    long: false,
    tense: false,
    rounded: false
},

{
    name: "{",
    vertical: "open",
    horizontal: "front",
    long: false,
    tense: false,
    rounded: false
},

{
    name: "V",
    vertical: "open",
    horizontal: "central",
    long: false,
    tense: false,
    rounded: false
},

{
    name: "@",
    vertical: "mid",
    horizontal: "central",
    long: false,
    tense: false,
    rounded: false

},

{
    name: "U",
    vertical: "close",
    horizontal: "back",
    long: false,
    tense: false,
    rounded: true

},

{
    name: "Q",
    vertical: "open",
    horizontal: "back",
    long: false,
    tense: false,
    rounded: true

},

{
    name: "i:",
    vertical: "close",
    horizontal: "front",
    long: true,
    tense: true,
    rounded: false

},

{
    name: "3:",
    vertical: "mid",
    horizontal: "central",
    long: true,
    tense: true,
    rounded: false

},

{
    name: "u:",
    vertical: "close",
    horizontal: "back",
    long: true,
    tense: true,
    rounded: true

},

{
    name: "O:",
    vertical: "mid",
    horizontal: "back",
    long: true,
    tense: true,
    rounded: true

},

{
    name: "A:",
    vertical: "open",
    horizontal: "back",
    long: true,
    tense: true,
    rounded: false

},

{
    name: "eI",
    type: "closing",
    long: true
},

{
    name: "OI",
    type: "closing",
    long: true
},

{
    name: "aI",
    type: "closing",
    long: true
},

{
    name: "@U",
    type: "closing",
    long: true
},

{
    name: "aU",
    type: "closing",
    long: true
},

{
    name: "e@",
    type: "centring",
    long: true
},

{
    name: "I@",
    type: "centring",
    long: true
},

{
    name: "U@",
    type: "centring",
    long: true
}
];

export const phonemes = consonants.concat(vowels);