export const consonants = [

{
    name: "m_cons",
    place: "bilabial",
    manner: "nasal",
    class: "sonorant",
    voice: true
},

{
    name: "b_cons",
    place: "bilabial",
    manner: "plosive",
    class: "obstruent",
    voice: true
},

{
    name: "p_cons",
    place: "bilabial",
    manner: "plosive",
    class: "obstruent",
    voice: false
},

{
    name: "v_cons",
    place: "labiodental",
    manner: "fricative",
    class: "obstruent",
    voice: true
},

{
    name: "f_cons",
    place: "labiodental",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "T_cons",
    place: "dental",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "D_cons",
    place: "dental",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "n_cons",
    place: "alveolar",
    manner: "nasal",
    class: "sonorant",
    voice: true
},

{
    name: "d_cons",
    place: "alveolar",
    manner: "plosive",
    class: "obstruent",
    voice: true
},

{
    name: "t_cons",
    place: "alveolar",
    manner: "plosive",
    class: "obstruent",
    voice: false
},

{
    name: "z_cons",
    place: "alveolar",
    manner: "fricative",
    class: "obstruent",
    voice: true
},

{
    name: "s_cons",
    place: "alveolar",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "l_cons",
    place: "alveolar",
    manner: "approximant",
    class: "sonorant",
    voice: true
},

{
    name: "r_cons",
    place: "postalveolar",
    manner: "approximant",
    class: "sonorant",
    voice: true
},

{
    name: "dZ_cons",
    place: "palato-alveolar",
    manner: "affricate",
    class: "obstruent",
    voice: true
},

{
    name: "tS_cons",
    place: "palato-alveolar",
    manner: "affricate",
    class: "obstruent",
    voice: false
},

{
    name: "Z_cons",
    place: "palato-alveolar",
    manner: "fricative",
    class: "obstruent",
    voice: true
},

{
    name: "S_cons",
    place: "palato-alveolar",
    manner: "fricative",
    class: "obstruent",
    voice: false
},

{
    name: "j_cons",
    place: "palatal",
    manner: "approximant",
    class: "sonorant",
    voice: true
},

{
    name: "N_cons",
    place: "velar",
    manner: "nasal",
    class: "sonorant",
    voice: true
},

{
    name: "g_cons",
    place: "velar",
    manner: "plosive",
    class: "obstruent",
    voice: true
},

{
    name: "k_cons",
    place: "velar",
    manner: "plosive",
    class: "obstruent",
    voice: false
},

{
    name: "w_cons",
    place: "labio-velar",
    manner: "approximant",
    class: "sonorant",
    voice: true
},

{
    name: "h_cons",
    place: "glottal",
    manner: "fricative",
    class: "obstruent",
    voice: false
}
];


export const vowels = [

{
    name: "I_vowel",
    vertical: "close",
    horizontal: "front",
    long: false,
    tense: false,
    rounded: false
},

{
    name: "e_vowel",
    vertical: "mid",
    horizontal: "front",
    long: false,
    tense: false,
    rounded: false
},

{
    name: "{_vowel",
    vertical: "open",
    horizontal: "front",
    long: false,
    tense: false,
    rounded: false
},

{
    name: "V_vowel",
    vertical: "open",
    horizontal: "central",
    long: false,
    tense: false,
    rounded: false
},

{
    name: "@_vowel",
    vertical: "mid",
    horizontal: "central",
    long: false,
    tense: false,
    rounded: false

},

{
    name: "U_vowel",
    vertical: "close",
    horizontal: "back",
    long: false,
    tense: false,
    rounded: true

},

{
    name: "Q_vowel",
    vertical: "open",
    horizontal: "back",
    long: false,
    tense: false,
    rounded: true

},

{
    name: "i:_vowel",
    vertical: "close",
    horizontal: "front",
    long: true,
    tense: true,
    rounded: false

},

{
    name: "3:_vowel",
    vertical: "mid",
    horizontal: "central",
    long: true,
    tense: true,
    rounded: false

},

{
    name: "u:_vowel",
    vertical: "close",
    horizontal: "back",
    long: true,
    tense: true,
    rounded: true

},

{
    name: "O:_vowel",
    vertical: "mid",
    horizontal: "back",
    long: true,
    tense: true,
    rounded: true

},

{
    name: "A:_vowel",
    vertical: "open",
    horizontal: "back",
    long: true,
    tense: true,
    rounded: false

},

{
    name: "eI_vowel",
    type: "closing",
    long: true
},

{
    name: "OI_vowel",
    type: "closing",
    long: true
},

{
    name: "aI_vowel",
    type: "closing",
    long: true
},

{
    name: "@U_vowel",
    type: "closing",
    long: true
},

{
    name: "aU_vowel",
    type: "closing",
    long: true
},

{
    name: "e@_vowel",
    type: "centring",
    long: true
},

{
    name: "I@_vowel",
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