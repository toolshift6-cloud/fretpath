export const LEVELS = [
  {
    id: 1,
    title: 'Zero to First Chord',
    subtitle: 'Build your foundation',
    color: '#4A9EFF',
    xpRequired: 0,
    lessons: [
      {
        id: 'L1-1',
        title: 'Anatomy of Your Guitar',
        description: 'Learn the parts of the guitar — headstock, neck, body, strings, frets, and more.',
        duration: 15,
        xp: 50,
        type: 'theory',
        content: {
          overview: 'Before you play a single note, knowing your instrument gives you a huge advantage. Every term your teacher uses will make sense immediately.',
          sections: [
            {
              heading: 'The Headstock',
              text: 'The headstock sits at the top of the neck and holds the tuning pegs (also called tuning machines or machine heads). Turning these pegs tightens or loosens the strings, changing their pitch.',
            },
            {
              heading: 'The Neck & Fretboard',
              text: 'The long wooden piece is the neck. On its face is the fretboard (or fingerboard), divided by metal strips called frets. Pressing a string behind a fret shortens its vibrating length and raises the pitch. Fret numbers count up from the headstock: the fret closest to the headstock is fret 1.',
            },
            {
              heading: 'The Nut',
              text: 'The small white or bone-colored piece where the neck meets the headstock is the nut. It has small grooves that guide the strings and determines the spacing between them.',
            },
            {
              heading: 'The Body',
              text: 'The large hollow (acoustic) or solid (electric) section. Acoustic guitars use the hollow body to amplify the strings naturally. Electric guitars use pickups — magnets under the strings — to convert vibrations to an electrical signal.',
            },
            {
              heading: 'The Strings',
              text: 'Standard guitars have 6 strings, numbered 1–6 from thinnest to thickest. The thinnest string (1st string, high E) is closest to the floor when you hold the guitar. The thickest (6th string, low E) is closest to your chin. From low to high: E A D G B e.',
            },
            {
              heading: 'The Bridge & Saddle',
              text: 'The bridge anchors the strings to the body. The saddle (like the nut at the body end) transmits string vibration into the body.',
            },
          ],
          fretboard: null,
          checklist: [
            'I can name the 6 parts of the guitar (headstock, neck, body, nut, bridge, strings)',
            'I know string numbers 1–6 (thin to thick)',
            'I know string names: E A D G B e',
            'I understand what frets are and how they work',
          ],
        },
      },
      {
        id: 'L1-2',
        title: 'Holding Your Guitar',
        description: 'Proper posture and hand position — the foundation of pain-free playing.',
        duration: 10,
        xp: 40,
        type: 'technique',
        content: {
          overview: 'Good posture prevents injury and makes everything else easier. Most beginners develop bad habits here that take months to undo.',
          sections: [
            {
              heading: 'Sitting Position',
              text: 'Sit on the edge of a firm chair (not a soft couch — you\'ll sink). Rest the guitar body on your right thigh (if right-handed). The neck should angle upward slightly, around 30–45 degrees. Keep your back straight — the guitar should come to YOU, not you hunching over it.',
            },
            {
              heading: 'Fretting Hand (Left Hand)',
              text: 'Your thumb goes on the back of the neck, roughly behind the middle finger. Keep a slight curve in all fingers — like you\'re holding a tennis ball. Your fingertips (not the pads) press the strings. Nails on the fretting hand must be short.',
            },
            {
              heading: 'Strumming Hand (Right Hand)',
              text: 'Your right arm drapes over the body. The strumming motion comes from your elbow and wrist — NOT your whole arm. When using a pick, hold it between thumb and the side of your index finger. Only about 1/4 inch of pick should stick out.',
            },
            {
              heading: 'Common Mistakes',
              text: '1. Guitar sliding down your leg — hold it against your body with your forearm. 2. Fretting thumb poking over the top of the neck — keep it behind. 3. Hunching over to see your hands — this causes back pain. Trust your fingers.',
            },
            {
              heading: 'Finger Numbering',
              text: 'Every lesson from here on refers to your fretting fingers by number, not name: 1 = index, 2 = middle, 3 = ring, 4 = pinky (the thumb is never numbered — it stays behind the neck). The standard rule for a one-finger-per-fret position is: finger 1 covers the closest fret, finger 2 the next fret up, finger 3 the one after that, and finger 4 the farthest fret. For example, in 1st position your index (1) sits on fret 1, middle (2) on fret 2, ring (3) on fret 3, and pinky (4) on fret 4 — and the same finger-to-fret spacing repeats as you move up the neck. Chord diagrams will always use these numbers and colors so you instantly know which finger goes where.',
            },
          ],
          fretboard: {
            chord: 'Finger Numbers (1st Position)',
            fingers: [
              { string: 3, fret: 1, finger: 1 },
              { string: 3, fret: 2, finger: 2 },
              { string: 3, fret: 3, finger: 3 },
              { string: 3, fret: 4, finger: 4 },
            ],
            openStrings: [],
            mutedStrings: [],
          },
          checklist: [
            'Guitar rests on my right thigh comfortably',
            'My back is straight — I\'m not hunching',
            'Fretting hand thumb is on the back of the neck',
            'I\'m pressing with my fingertips, not the pads',
            'I can hold a pick at 45 degrees with about 1/4" exposed',
            'I know my fretting fingers by number: 1=index, 2=middle, 3=ring, 4=pinky',
          ],
        },
      },
      {
        id: 'L1-3',
        title: 'Tuning Your Guitar',
        description: 'Get in tune using the built-in chromatic tuner.',
        duration: 15,
        xp: 60,
        type: 'practical',
        content: {
          overview: 'A guitar out of tune sounds bad no matter how well you play. Tuning your guitar before every practice session is non-negotiable — and it trains your ear.',
          sections: [
            {
              heading: 'Standard Tuning',
              text: 'The 6 open strings (thickest to thinnest) are: E2 – A2 – D3 – G3 – B3 – E4. A memory trick: "Eddie Ate Dynamite, Good Bye Eddie."',
            },
            {
              heading: 'Using a Tuner',
              text: 'The chromatic tuner on this screen listens through your microphone. Pluck each string one at a time and watch the tuner. The note name will appear. Use the tuning peg for that string to adjust — turn SLOWLY. If the needle is to the left, the string is flat (too low) — tighten. If right, the string is sharp (too high) — loosen.',
            },
            {
              heading: 'Tuning Tip',
              text: 'Always approach the correct pitch from BELOW (flat). This keeps the string more stable. If you go past the note and it\'s sharp, loosen it past flat, then bring it back up again.',
            },
            {
              heading: 'Relative Tuning (No Tuner)',
              text: 'If you have no tuner, you can tune relative to the 6th string. Once low E sounds right, press fret 5 of string 6 — that note is A. Match open string 5 to it. Press fret 5 of string 5 = D. Match string 4. Press fret 5 of string 4 = G. Match string 3. Press fret 4 (not 5!) of string 3 = B. Match string 2. Press fret 5 of string 2 = high E. Match string 1.',
            },
          ],
          fretboard: null,
          checklist: [
            'I know standard tuning: E A D G B e',
            'I can use the chromatic tuner to check each string',
            'I know which direction to turn the peg to raise or lower pitch',
            'I approach notes from below when tuning',
          ],
          hasTuner: true,
        },
      },
      {
        id: 'L1-4',
        title: 'Your First Note: Open E',
        description: 'Play your very first notes on the open strings.',
        duration: 10,
        xp: 50,
        type: 'practical',
        content: {
          overview: 'Before chords, we start with individual notes. Playing open strings (no fingers on the fretboard) gives you a feel for the instrument and trains your picking hand.',
          sections: [
            {
              heading: 'Plucking / Picking',
              text: 'With a pick: angle it slightly (not perpendicular to the strings). Strike downward through the string with a loose wrist. The motion is mostly wrist, not elbow. With fingers: use the pad of your thumb for the 3 thick strings, and your index/middle fingers for the thinner strings.',
            },
            {
              heading: 'Playing Open Strings',
              text: 'Pluck each string one at a time from the 6th (thickest, low E) to the 1st (thinnest, high E). Let each note ring. If it buzzes or mutes: your right hand may be touching a neighboring string, or you\'re picking too hard at first. Start gentle.',
            },
            {
              heading: 'Your First Pattern',
              text: 'Try this pattern: pluck strings 6, 5, 4, 3, 2, 1, then back down 1, 2, 3, 4, 5, 6. Say the note names out loud as you play: "E A D G B e e B G D A E." This is great ear training.',
            },
          ],
          fretboard: { highlightStrings: [1, 2, 3, 4, 5, 6], highlightFrets: [], notes: [] },
          requiredNote: {
            note: 'E4',
            label: 'Pluck your open 1st string (high e) and hold it steady — we\'ll listen through your mic to confirm it rings true before you move on.',
          },
          checklist: [
            'I can pluck individual strings cleanly without buzzing',
            'I can play the up-and-down open string pattern',
            'I know which string produces which note name',
          ],
        },
      },
      {
        id: 'L1-5',
        title: 'The Em Chord',
        description: 'Your first full chord — E minor. Two fingers, big sound.',
        duration: 20,
        xp: 80,
        type: 'chord',
        content: {
          overview: 'E minor is one of the easiest chords to play and one of the most powerful-sounding. It uses all 6 strings and only 2 fingers.',
          sections: [
            {
              heading: 'Finger Placement',
              text: 'Place your middle finger on string 5, fret 2. Place your ring finger on string 4, fret 2. All other strings ring open. Strum all 6 strings downward.',
            },
            {
              heading: 'Getting a Clean Sound',
              text: 'Press just hard enough that the strings don\'t buzz — but not so hard that your hand cramps. Make sure your fingers are curved — if they\'re flat they\'ll accidentally mute neighboring strings. Your fingertips should press right behind the fret (the metal strip), not on top of it.',
            },
            {
              heading: 'Common Em Problems',
              text: '1. Buzzing — finger not pressed firmly enough, or not curved enough. 2. Dead string — finger accidentally touching a neighboring string. 3. Muted open strings — check your fretting fingers aren\'t leaning over.',
            },
            {
              heading: 'Em Chord Name',
              text: '"Em" means E minor. The notes are E, G, B — the E minor triad. Minor chords have a darker, sadder sound than major chords. Em is used in thousands of songs: "Hotel California," "Stairway to Heaven," "Wish You Were Here" all use Em.',
            },
          ],
          fretboard: {
            chord: 'Em',
            fingers: [
              { string: 5, fret: 2, finger: 2 },
              { string: 4, fret: 2, finger: 3 },
            ],
            openStrings: [1, 2, 3, 6],
            mutedStrings: [],
          },
          checklist: [
            'I can place my fingers on Em without looking at this screen',
            'All 6 strings ring clearly when I strum Em',
            'I can strum Em 10 times in a row cleanly',
            'My hand returns to position quickly after moving away',
          ],
        },
      },
      {
        id: 'L1-6',
        title: 'The Am Chord',
        description: 'A minor — three fingers, emotional sound.',
        duration: 20,
        xp: 80,
        type: 'chord',
        content: {
          overview: 'Am (A minor) is your second chord. Combined with Em, you can already play parts of many famous songs.',
          sections: [
            {
              heading: 'Finger Placement',
              text: 'Index finger: string 2, fret 1. Middle finger: string 4, fret 2. Ring finger: string 3, fret 2. Strum strings 5 through 1 only — mute string 6 with the side of your index finger or by avoiding it.',
            },
            {
              heading: 'The Tricky String 6',
              text: 'You DON\'T strum the low E string with Am. Practice starting your strum from the 5th string. Alternatively, let the tip of your index finger lightly touch string 6 to mute it — even if you accidentally hit it, it won\'t sound.',
            },
            {
              heading: 'Em to Am Transition',
              text: 'This is your first chord change! Practice slowly: play Em (hold 4 beats), lift fingers, place Am (hold 4 beats). The key is lifting all fingers AT THE SAME TIME and placing all Am fingers AT THE SAME TIME. Start very slow — speed will come.',
            },
          ],
          fretboard: {
            chord: 'Am',
            fingers: [
              { string: 2, fret: 1, finger: 1 },
              { string: 4, fret: 2, finger: 2 },
              { string: 3, fret: 2, finger: 3 },
            ],
            openStrings: [1, 5],
            mutedStrings: [6],
          },
          checklist: [
            'I can place Am cleanly with all 3 fingers',
            'String 1 (high e) rings open and clearly',
            'String 6 (low E) is muted',
            'I can switch from Em to Am in 4 beats at 60 BPM',
          ],
        },
      },
      {
        id: 'L1-7',
        title: 'The G Major Chord',
        description: 'G major — the king of open chords.',
        duration: 25,
        xp: 100,
        type: 'chord',
        content: {
          overview: 'G major is the most versatile open chord. It\'s used in pop, rock, country, and folk. It\'s a bit trickier to place than Em and Am — worth the effort.',
          sections: [
            {
              heading: 'Finger Placement',
              text: 'Middle finger: string 6, fret 3. Index finger: string 5, fret 2. Ring finger: string 1, fret 3. All other strings ring open. Strum all 6 strings.',
            },
            {
              heading: 'Alternative Fingering (4-finger G)',
              text: 'Many players use: Ring finger on string 6 fret 3, Middle finger on string 5 fret 2, Pinky on string 1 fret 3, Index finger on string 2 fret 0 (open). This makes transitioning to C major much easier — try both and stick with what feels natural.',
            },
            {
              heading: 'G Chord Sound',
              text: 'G major has a bright, full, open sound. The notes are G, B, D. It\'s the "I chord" in the key of G — the tonal home. Songs in G major feel resolved when they land on G.',
            },
          ],
          fretboard: {
            chord: 'G',
            fingers: [
              { string: 6, fret: 3, finger: 2 },
              { string: 5, fret: 2, finger: 1 },
              { string: 1, fret: 3, finger: 3 },
            ],
            openStrings: [2, 3, 4],
            mutedStrings: [],
          },
          checklist: [
            'I can form G major cleanly',
            'All 6 strings ring clearly',
            'I can switch G → Em in 4 beats at 60 BPM',
            'I know the notes in G: G, B, D',
          ],
        },
      },
      {
        id: 'L1-8',
        title: 'The C Major Chord',
        description: 'C major — opens up the key of C and G.',
        duration: 25,
        xp: 100,
        type: 'chord',
        content: {
          overview: 'C major completes the core starter set. With G, C, D, Em, and Am you can play thousands of songs.',
          sections: [
            {
              heading: 'Finger Placement',
              text: 'Ring finger: string 5, fret 3. Middle finger: string 4, fret 2. Index finger: string 2, fret 1. Strings 3 and 1 ring open. Mute string 6.',
            },
            {
              heading: 'Why C Is Tricky',
              text: 'C requires fingers on three different frets, stretched across the fretboard. The ring finger is particularly demanding. Practice placing and releasing slowly. Your hand will adapt within a few sessions.',
            },
            {
              heading: 'The G – C Transition',
              text: 'This is one of the most common chord changes in popular music. Notice that when using the 4-finger G chord, your index finger is already near fret 1 of string 2 — this is a "pivot finger" that barely moves. Watch for these anchor fingers; they make transitions faster.',
            },
          ],
          fretboard: {
            chord: 'C',
            fingers: [
              { string: 5, fret: 3, finger: 3 },
              { string: 4, fret: 2, finger: 2 },
              { string: 2, fret: 1, finger: 1 },
            ],
            openStrings: [1, 3],
            mutedStrings: [6],
          },
          checklist: [
            'I can place C major cleanly',
            'Strings 1 and 3 ring open',
            'String 6 is muted',
            'I can switch G → C and C → G at 60 BPM',
          ],
        },
      },
      {
        id: 'L1-9',
        title: 'The D Major Chord',
        description: 'D major — bright and punchy.',
        duration: 20,
        xp: 100,
        type: 'chord',
        content: {
          overview: 'D major rounds out the essential open chords. Together with G, C, Em, and Am you now have the full toolkit for Level 1 songs.',
          sections: [
            {
              heading: 'Finger Placement',
              text: 'Index finger: string 3, fret 2. Middle finger: string 1, fret 2. Ring finger: string 2, fret 3. String 4 rings open. Mute strings 5 and 6. Only strum strings 4–1.',
            },
            {
              heading: 'D Shape Tip',
              text: 'The D chord is compact — your three fingers cluster on frets 2 and 3. Make sure your fingers are curved so they don\'t accidentally touch string 1. String 1 must ring as a clear open note.',
            },
            {
              heading: 'The Power Trio: G – C – D',
              text: 'G, C, and D are the three chords of the key of G major. Millions of songs use only these three. Practice cycling: G (4 beats) → C (4 beats) → D (4 beats) → G. This is your most important chord progression.',
            },
          ],
          fretboard: {
            chord: 'D',
            fingers: [
              { string: 3, fret: 2, finger: 1 },
              { string: 1, fret: 2, finger: 2 },
              { string: 2, fret: 3, finger: 3 },
            ],
            openStrings: [4],
            mutedStrings: [5, 6],
          },
          checklist: [
            'I can place D major cleanly',
            'Only strumming strings 4–1',
            'String 1 rings clearly',
            'I can cycle G – C – D at 60 BPM',
          ],
        },
      },
      {
        id: 'L1-10',
        title: 'Your First Song: Knocking on Heavens Door',
        description: 'G – D – Am – Am using everything you\'ve learned.',
        duration: 30,
        xp: 150,
        type: 'song',
        content: {
          songId: 's1', // links to the matching entry in src/data/songs.js for the Song Library "Learned" badge
          overview: 'You now know every chord in this Bob Dylan classic. The entire song is G – D – Am repeated. Let\'s put it all together.',
          sections: [
            {
              heading: 'The Chord Progression',
              text: 'Verse: G (2 beats) – D (2 beats) – Am (4 beats). This repeats through the entire song. Simple, emotional, timeless.',
            },
            {
              heading: 'Strumming Pattern',
              text: 'Start with simple downstrokes, one per beat. Once comfortable, try: Down – Down – Up – Down – Up (D-D-U-D-U). Count aloud: "1 – 2 – and – 3 – and."',
            },
            {
              heading: 'Performance Tips',
              text: 'Don\'t stop if you make a mistake — keep the rhythm going. A player who maintains rhythm with imperfect chords sounds far better than one who stops to correct every mistake. Rhythm is everything.',
            },
          ],
          fretboard: null,
          chords: ['G', 'D', 'Am'],
          songChords: [
            { name: 'G', fretboard: { chord: 'G', fingers: [{ string: 6, fret: 3, finger: 2 }, { string: 5, fret: 2, finger: 1 }, { string: 1, fret: 3, finger: 3 }], openStrings: [2, 3, 4], mutedStrings: [] } },
            { name: 'D', fretboard: { chord: 'D', fingers: [{ string: 3, fret: 2, finger: 1 }, { string: 1, fret: 2, finger: 2 }, { string: 2, fret: 3, finger: 3 }], openStrings: [4], mutedStrings: [5, 6] } },
            { name: 'Am', fretboard: { chord: 'Am', fingers: [{ string: 2, fret: 1, finger: 1 }, { string: 4, fret: 2, finger: 2 }, { string: 3, fret: 2, finger: 3 }], openStrings: [1, 5], mutedStrings: [6] } },
          ],
          tabs: [
            'Chord progression (repeat throughout):',
            'G          D          Am         Am',
            '/ / / /    / / / /    / / / /    / / / /',
          ],
          checklist: [
            'I can play through the full progression once at 60 BPM',
            'My chord transitions happen in time without stopping',
            'I\'m strumming with a consistent rhythm',
            'I can play along with the original song at reduced speed',
          ],
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Rhythm & Song Builder',
    subtitle: 'Feel the groove',
    color: '#C4832A',
    xpRequired: 700,
    lessons: [
      { id: 'L2-1', title: 'Strumming Fundamentals', description: 'Down strums, up strums, and your first patterns.', duration: 20, xp: 80, type: 'technique', content: { overview: 'Rhythm is the heartbeat of music. A consistent strum with basic chords will always sound better than perfectly placed chords with no rhythm.', sections: [{ heading: 'The Down-Up Motion', text: 'Think of your strumming hand as a pendulum. It swings down (hitting the strings) and up (missing or hitting the strings). The key insight: your hand moves DOWN and UP constantly, in time — whether you actually hit the strings or not. This keeps you in time.' }, { heading: 'Basic Patterns', text: 'Pattern 1 (rock): D D D D. Pattern 2 (folk): D D-U D-U. Pattern 3 (pop): D D-U-D-U D-U. Count as you play.' }], fretboard: null, checklist: ['I can strum down-only in perfect time', 'I can add up-strums without losing the beat', 'I can play a D-D-U-D-U pattern'] } },
      { id: 'L2-2', title: 'Reading Chord Charts', description: 'Understand chord diagrams and chord charts.', duration: 15, xp: 60, type: 'theory', content: { overview: 'Chord charts (or "charts") are the shorthand musicians use to communicate songs. Master these and you can learn any song.', sections: [{ heading: 'Chord Diagrams', text: 'A chord diagram shows you the fretboard from the front. Vertical lines = strings (left is low E, thickest; right is high e, thinnest). Horizontal lines = frets, numbered down from the nut. Colored dots = where to press, numbered by which finger to use (1=index, 2=middle, 3=ring, 4=pinky). An X above a string means mute it (don\'t play it). An O above a string means play it open (no finger).' }, { heading: 'Reading the Example Below', text: 'The diagram shows C major. Reading left to right: X (string 6, low E — muted, don\'t strum it), 3 (string 5, fret 3 — ring finger), 2 (string 4, fret 2 — middle finger), O (string 3 — open), 1 (string 2, fret 1 — index finger), O (string 1, high e — open). This is exactly the same shape you learned in "The C Major Chord" lesson — chord diagrams are just a faster way to write down what you already know how to play.' }, { heading: 'Lead Sheets', text: 'A lead sheet shows chord names above lyrics. When you see "G" above a word, you switch to G chord there. Simple as that.' }], fretboard: { chord: 'C', fingers: [{ string: 5, fret: 3, finger: 3 }, { string: 4, fret: 2, finger: 2 }, { string: 2, fret: 1, finger: 1 }], openStrings: [1, 3], mutedStrings: [6] }, checklist: ['I can read a chord diagram', 'I can follow a lead sheet with chord changes'] } },
      { id: 'L2-3', title: 'Basic Music Theory', description: 'Notes, scales, and the major scale formula.', duration: 25, xp: 100, type: 'theory', content: { overview: 'You don\'t need a music degree — just the 20% of theory that explains 80% of everything you\'ll play.', sections: [{ heading: 'The 12 Notes', text: 'Western music uses 12 notes that repeat (each repetition is an octave higher). They are: A, A#/Bb, B, C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab. The distance between each is a "half step" (one fret on guitar).' }, { heading: 'The Major Scale', text: 'A major scale uses the formula: W W H W W W H (W = whole step = 2 frets, H = half step = 1 fret). Starting from C: C D E F G A B C. This gives us the do-re-mi you already know. The diagram below shows one full octave of C major in open position — notice the note names follow exactly that pattern.' }], fretboard: { scale: 'C_major', notes: [{ string: 5, fret: 3, isRoot: true }, { string: 4, fret: 0 }, { string: 4, fret: 2 }, { string: 4, fret: 3 }, { string: 3, fret: 0 }, { string: 3, fret: 2 }, { string: 2, fret: 0 }, { string: 2, fret: 1, isRoot: true }] }, checklist: ['I know the 12 note names', 'I understand half steps and whole steps', 'I can spell the C major scale'] } },
      { id: 'L2-4', title: 'Power Chords', description: 'The backbone of rock — 2-note chords you can slide anywhere.', duration: 20, xp: 100, type: 'chord', content: { overview: 'Power chords are two-note chords (root + fifth) that sound massive through distortion. Every rock song ever made uses them.', sections: [{ heading: 'The Shape', text: 'Index finger on the root note (e.g., string 6, fret 5 = A). Ring finger two frets up, one string down (string 5, fret 7). Strum only those 2 strings. That\'s A5 (A power chord).' }, { heading: 'Moving It Around', text: 'The shape never changes. Slide it to any root note on string 6 or string 5. Every position has the same sound — just a different key.' }], fretboard: { chord: 'E5', fingers: [{ string: 5, fret: 2, finger: 3 }], openStrings: [6], mutedStrings: [1, 2, 3, 4] }, checklist: ['I can play a power chord cleanly', 'I can slide power chords to different positions', 'I can play a simple power chord riff'] } },
      { id: 'L2-5', title: 'Song: Horse With No Name', description: 'Em and D6add9 — just two chords, the whole song.', duration: 25, xp: 120, type: 'song', content: { songId: 's2', overview: 'This America classic uses literally two chords the entire song. Perfect for practicing chord transitions and consistent strumming.', sections: [{ heading: 'The Two Chords', text: 'Em: standard Em fingering. D6add9 (or "Dadd9"): like D major but move your index finger from string 3 fret 2 to string 3 open — index goes to string 2, fret 2 instead.' }, { heading: 'Strumming', text: 'Straight down-strums work perfectly: D D D D D D (6 strums per bar). The rhythm is steady and hypnotic.' }], fretboard: null, songChords: [{ name: 'Em', fretboard: { chord: 'Em', fingers: [{ string: 5, fret: 2, finger: 2 }, { string: 4, fret: 2, finger: 3 }], openStrings: [1, 2, 3, 6], mutedStrings: [] } }, { name: 'D6add9', fretboard: { chord: 'D6add9', fingers: [{ string: 2, fret: 2, finger: 1 }, { string: 1, fret: 2, finger: 2 }], openStrings: [3, 4], mutedStrings: [5, 6] } }], checklist: ['I can switch between the two chords in time', 'I can play through the full verse', 'My strumming is consistent throughout'] } },
    ],
  },
  {
    id: 3,
    title: 'Intermediate Player',
    subtitle: 'Expand your range',
    color: '#E8C87A',
    xpRequired: 1500,
    lessons: [
      { id: 'L3-1', title: 'Barre Chords: F Major', description: 'The infamous F chord — the beginner\'s final boss.', duration: 30, xp: 150, type: 'chord', content: { overview: 'Barre chords use your index finger to press all 6 strings at once, acting like a capo. Master this and you unlock every major and minor chord.', sections: [{ heading: 'The Barre', text: 'Lay your index finger flat across ALL 6 strings at fret 1. The key: roll your finger slightly toward the headstock (toward the bony edge, not the pad). Press firmly. This is hard — it takes weeks of daily practice for most people.' }, { heading: 'F Major Shape', text: 'Barre at fret 1 + ring finger on string 5 fret 3 + middle finger on string 4 fret 2 + pinky on string 3 fret 3. This is the "E shape" barre chord. The same shape starting at fret 3 gives you G major.' }], fretboard: { chord: 'F', fingers: [{ string: 1, fret: 1, finger: 1, barre: true }, { string: 5, fret: 3, finger: 3 }, { string: 4, fret: 2, finger: 2 }, { string: 3, fret: 3, finger: 4 }], openStrings: [], mutedStrings: [] }, checklist: ['I can barre all 6 strings at fret 1', 'All strings ring when I play F major', 'I can switch between open chords and F', 'I understand how barre chords move up the neck'] } },
      { id: 'L3-2', title: 'Pentatonic Scale', description: 'The scale behind every rock solo ever.', duration: 25, xp: 120, type: 'scale', content: { overview: 'The pentatonic minor scale is the most important scale in rock, blues, and country. 5 notes that always sound right.', sections: [{ heading: 'The Pattern', text: 'Box 1 in Am (starting at fret 5): String 6: frets 5, 8. String 5: frets 5, 7. String 4: frets 5, 7. String 3: frets 5, 7. String 2: frets 5, 8. String 1: frets 5, 8.' }, { heading: 'Using It', text: 'Play up and down the scale to get it in your fingers. Then try playing just 2-3 notes at a time. Add bends, hammer-ons, and slides. Solo is just the pentatonic scale played with feeling.' }], fretboard: { scale: 'Am_pentatonic', notes: [{ string: 6, fret: 5 }, { string: 6, fret: 8 }, { string: 5, fret: 5 }, { string: 5, fret: 7 }, { string: 4, fret: 5 }, { string: 4, fret: 7 }, { string: 3, fret: 5 }, { string: 3, fret: 7 }, { string: 2, fret: 5 }, { string: 2, fret: 8 }, { string: 1, fret: 5 }, { string: 1, fret: 8 }] }, checklist: ['I can play the pentatonic box up and down', 'I can play it in time with a metronome at 80 BPM', 'I can improvise a short riff using only these notes'] } },
      { id: 'L3-3', title: 'Fingerpicking Basics', description: 'Travis picking and finger independence.', duration: 25, xp: 130, type: 'technique', content: { overview: 'Fingerpicking opens up an entirely different world of sound — from classical to folk to blues. It uses both hands at once, each with its own job: your left hand (fretting hand) holds the chord shape, exactly like strumming, while your right hand (picking hand) plucks individual strings instead of strumming all of them.', sections: [{ heading: 'Two Hands, Two Jobs', text: 'Left hand (fretting hand): forms the chord and holds it down for the whole pattern — nothing new here, it works just like every chord you\'ve learned. Right hand (picking hand): instead of strumming, each finger is assigned its own string(s) and plucks them in a repeating sequence. This lesson is all about training that right hand.' }, { heading: 'Finger Assignments (Picking Hand)', text: 'Classical/fingerstyle notation names picking-hand fingers p-i-m-a (from the Spanish pulgar-índice-medio-anular). Thumb (p) covers the bass strings 6, 5, 4. Index (i) covers string 3. Middle (m) covers string 2. Ring (a) covers string 1. The thumb usually keeps a steady low-string pulse while the fingers pick out the higher strings.' }, { heading: 'Basic Pattern', text: 'On a G chord, left hand holds the G shape while the right hand plays: p-i-m-a-m-i (thumb-index-middle-ring-middle-index). This is the foundation of Travis picking. Start very slow — the goal is independence between fingers, not speed.' }], fretboard: null, pickingHand: [{ finger: 'p', label: 'Thumb', strings: [6, 5, 4], color: '#4A9EFF' }, { finger: 'i', label: 'Index', strings: [3], color: '#C4832A' }, { finger: 'm', label: 'Middle', strings: [2], color: '#E8C87A' }, { finger: 'a', label: 'Ring', strings: [1], color: '#FF6B6B' }], checklist: ['I know which hand is the fretting hand and which is the picking hand', 'I understand finger assignments p-i-m-a', 'I can play a simple fingerpicking pattern on one chord', 'I can apply the pattern to a chord change'] } },
      { id: 'L3-4', title: 'Reading Guitar Tabs', description: 'The universal notation system for guitar.', duration: 15, xp: 80, type: 'theory', content: { overview: 'Tabs let you learn any song from the internet in minutes. No music reading required.', sections: [{ heading: 'Tab Format', text: '6 horizontal lines = 6 strings (bottom line = low E, top line = high e). Numbers = fret to press. 0 = open string. Read left to right.' }, { heading: 'Example: Smoke on the Water Riff', text: 'Below is the famous riff in tab form, plus a visual breakdown of exactly where those notes live on the neck and the order you play them in.' }], fretboard: null, tabs: ['e|------------------|', 'B|------------------|', 'G|--0-3-5-0-3-6-5---|', 'D|--0-3-5-0-3-6-5---|', 'A|------------------|', 'E|------------------|'], checklist: ['I can read a basic guitar tab', 'I know which line represents which string', 'I can play a 3-note riff from a tab'] } },
    ],
  },
  {
    id: 4,
    title: 'Genre Explorer',
    subtitle: 'Find your sound',
    color: '#C4832A',
    xpRequired: 2500,
    lessons: [
      { id: 'L4-1', title: 'Blues: 12-Bar Blues', description: 'The foundation of all blues, rock, and jazz.', duration: 30, xp: 150, type: 'theory', content: { overview: 'The 12-bar blues is THE most important chord progression in popular music. Learn it and you can jam with any blues musician.', sections: [{ heading: 'The Progression in A', text: 'Bars 1-4: A7. Bars 5-6: D7. Bars 7-8: A7. Bar 9: E7. Bar 10: D7. Bars 11-12: A7 (turnaround to E7).' }, { heading: 'The Feel', text: 'Blues is about feel, not perfection. Bend notes. Slow down. Let notes breathe. The spaces between notes matter as much as the notes themselves.' }], fretboard: null, progression: [{ chord: 'A7', bars: 4 }, { chord: 'D7', bars: 2 }, { chord: 'A7', bars: 2 }, { chord: 'E7', bars: 1 }, { chord: 'D7', bars: 1 }, { chord: 'A7', bars: 1 }, { chord: 'E7', bars: 1 }], chordReferences: [{ name: 'A7', fretboard: { chord: 'A7', fingers: [{ string: 4, fret: 2, finger: 1 }, { string: 2, fret: 2, finger: 2 }], openStrings: [5, 3, 1], mutedStrings: [6] } }, { name: 'D7', fretboard: { chord: 'D7', fingers: [{ string: 2, fret: 1, finger: 1 }, { string: 1, fret: 2, finger: 2 }, { string: 3, fret: 2, finger: 3 }], openStrings: [4], mutedStrings: [5, 6] } }, { name: 'E7', fretboard: { chord: 'E7', fingers: [{ string: 5, fret: 2, finger: 2 }, { string: 3, fret: 1, finger: 1 }], openStrings: [1, 2, 4, 6], mutedStrings: [] } }], checklist: ['I can play through 12-bar blues in A', 'I know the I-IV-V chord relationship', 'I can solo over 12-bar blues with pentatonic'] } },
      { id: 'L4-2', title: 'Rock: Palm Muting & Riffs', description: 'The technique behind every rock rhythm guitar part.', duration: 25, xp: 120, type: 'technique', content: { overview: 'Palm muting gives rock guitar its chug. Combined with power chords, it\'s the sound of Metallica, AC/DC, and Green Day.', sections: [{ heading: 'Palm Muting', text: 'Rest the heel of your picking hand lightly on the strings near the bridge. You want partial muting — strings still vibrate but are dampened. Too far from bridge = fully muted. Too close = no muting. Find the sweet spot.' }, { heading: 'Classic Rock Riff', text: 'Try: E5 palm-muted 4 times, then unmuted full strum. The contrast between muted and open is what drives rock rhythms.' }], fretboard: { chord: 'E5', fingers: [{ string: 5, fret: 2, finger: 3 }], openStrings: [6], mutedStrings: [1, 2, 3, 4] }, checklist: ['I can palm mute cleanly', 'I can switch between muted and open strumming', 'I can play a simple rock riff with palm muting'] } },
      { id: 'L4-3', title: 'Country: Chicken Pickin\'', description: 'The bright, twangy sound of country guitar.', duration: 25, xp: 120, type: 'technique', content: { overview: 'Country guitar is defined by its bright tone, hybrid picking, and the "chicken pickin\'" technique.', sections: [{ heading: 'Hybrid Picking', text: 'Hold a pick normally but also use your middle and ring fingers to pluck strings. This lets you pick bass strings with the pick and treble strings with fingers simultaneously.' }, { heading: 'Country Bends', text: 'Country players bend strings up to exactly one whole step (or a perfect fourth/fifth). The key is accuracy — you must land exactly on the target pitch. Practice bending to a fretted note and checking your accuracy.' }], fretboard: null, checklist: ['I can use hybrid picking', 'I can bend accurately to the target pitch', 'I can play a country-style lick'] } },
    ],
  },
  {
    id: 5,
    title: 'Technique Mastery',
    subtitle: 'Pro-level tools',
    color: '#4A9EFF',
    xpRequired: 4000,
    lessons: [
      { id: 'L5-1', title: 'Hammer-Ons & Pull-Offs', description: 'Legato technique for smooth, fast playing.', duration: 20, xp: 120, type: 'technique', content: { overview: 'Hammer-ons and pull-offs let you play fast notes without picking each one. They\'re the foundation of fluid, lyrical playing.', sections: [{ heading: 'Hammer-On', text: 'Pick a note, then forcefully "hammer" another finger onto a higher fret on the same string. The second note sounds without picking. Notated as 5h7 in tabs.' }, { heading: 'Pull-Off', text: 'Have two fingers on a string. Pull the higher finger off while keeping the lower finger pressed. The lower note sounds. Notated as 7p5.' }], fretboard: null, tabs: ['B|--5h7p5-----------|'], checklist: ['I can do clean hammer-ons', 'I can do clean pull-offs', 'I can combine them: 5h7p5 on one string'] } },
      { id: 'L5-2', title: 'Vibrato', description: 'The technique that makes notes sing.', duration: 20, xp: 120, type: 'technique', content: { overview: 'Vibrato is what separates good players from great ones. It\'s the subtle oscillation of pitch that gives notes life and expression.', sections: [{ heading: 'Classical Vibrato', text: 'Roll your fretting finger up and down the string (parallel to frets). The string deflects slightly, causing pitch variation. This gives a smooth, violin-like vibrato.' }, { heading: 'Rock Vibrato', text: 'Bend the string side-to-side repeatedly. Wider bends, more dramatic sound. Think B.B. King, David Gilmour, Eric Clapton.' }], fretboard: null, checklist: ['I can apply steady vibrato to sustained notes', 'My vibrato is consistent (not random wavering)', 'I can vary vibrato speed and depth expressively'] } },
      { id: 'L5-3', title: 'String Bending', description: 'The most expressive technique in guitar.', duration: 25, xp: 150, type: 'technique', content: { overview: 'String bending is THE defining technique of blues and rock guitar. When you hear a guitarist "cry" — that\'s a bend.', sections: [{ heading: 'How to Bend', text: 'Fret a note. Using 2-3 fingers behind your main finger for support, push the string toward the ceiling (or pull it toward the floor on the lower strings). A full-step bend raises the pitch by 2 frets.' }, { heading: 'Types of Bends', text: 'Half-step: 1 fret up. Full-step: 2 frets up. Unison bend: bend one string to match the pitch of the next string. Pre-bend: bend, then pick (you hear the pitch released back down).' }], fretboard: null, checklist: ['I can bend a full step accurately', 'I can control the speed of my bends', 'I can do a unison bend that sounds in tune'] } },
    ],
  },
  {
    id: 6,
    title: 'Pro Level',
    subtitle: 'Master the instrument',
    color: '#E8C87A',
    xpRequired: 6000,
    lessons: [
      { id: 'L6-1', title: 'Modes of the Major Scale', description: 'Dorian, Mixolydian, and beyond.', duration: 40, xp: 200, type: 'theory', content: { overview: 'Modes are the same major scale starting on different degrees. They each have a distinct character and are used in specific genres and contexts.', sections: [{ heading: 'The 7 Modes', text: 'Ionian (1st — bright, happy major), Dorian (2nd — minor but bright, used in rock/jazz), Phrygian (3rd — dark, Spanish flavor), Lydian (4th — dreamy, floating), Mixolydian (5th — bluesy major, rock), Aeolian (6th — natural minor, dark), Locrian (7th — diminished, very tense).' }, { heading: 'Dorian Mode', text: 'Dorian is used by Carlos Santana, the Doors, and in countless jazz tunes. It\'s a natural minor scale with a raised 6th. In Am Dorian: A B C D E F# G A. That F# (instead of F) is the color note. The diagram below maps out that exact scale on the A string.' }], fretboard: { scale: 'A_dorian', notes: [{ string: 5, fret: 0, isRoot: true }, { string: 5, fret: 2 }, { string: 5, fret: 3 }, { string: 5, fret: 5 }, { string: 5, fret: 7 }, { string: 5, fret: 9 }, { string: 5, fret: 10 }, { string: 5, fret: 12, isRoot: true }] }, checklist: ['I understand what a mode is', 'I can play Dorian mode from any root', 'I can identify the mood/character of at least 3 modes'] } },
      { id: 'L6-2', title: 'Improvisation', description: 'Make music in the moment.', duration: 30, xp: 200, type: 'technique', content: { overview: 'Improvisation is the ultimate guitar skill — real-time musical conversation. It\'s learnable by anyone.', sections: [{ heading: 'Start Simple', text: 'Over a backing track in Am, use only 3 notes from the pentatonic scale. Don\'t rush. Leave space. Listen to what you played before playing the next note. Music is conversation, not monologue.' }, { heading: 'Motivic Development', text: 'Take a short 3-4 note idea (a motif). Play it. Then repeat it starting on a different note. Then play it backwards. Then change the rhythm. One idea can become a 16-bar solo.' }], fretboard: null, checklist: ['I can improvise for 30 seconds without stopping', 'I can develop a motif across a solo', 'My solos have phrases with starts and ends, not random notes'] } },
      { id: 'L6-3', title: 'Writing Your First Song', description: 'Chord progressions, melody, and arrangement.', duration: 45, xp: 250, type: 'composition', content: { overview: 'You already know everything you need to write a song. Here\'s how to put it together.', sections: [{ heading: 'Chord Progression First', text: 'Choose a key (G is friendly). Pick 3-4 chords from that key. In G major: G, Am, C, D, Em, Bm are all diatonic (they "belong"). A common progression: G – Em – C – D. Try it. Does it feel like a verse? A chorus? Trust your instincts.' }, { heading: 'Melody Over Chords', text: 'Hum or sing a melody while playing your chord progression. Don\'t think — just let notes come. Record yourself (your phone is fine). Listen back. The parts you liked? That\'s your song.' }], fretboard: null, chordReferences: [{ name: 'G', fretboard: { chord: 'G', fingers: [{ string: 6, fret: 3, finger: 2 }, { string: 5, fret: 2, finger: 1 }, { string: 1, fret: 3, finger: 3 }], openStrings: [2, 3, 4], mutedStrings: [] } }, { name: 'Em', fretboard: { chord: 'Em', fingers: [{ string: 5, fret: 2, finger: 2 }, { string: 4, fret: 2, finger: 3 }], openStrings: [1, 2, 3, 6], mutedStrings: [] } }, { name: 'C', fretboard: { chord: 'C', fingers: [{ string: 5, fret: 3, finger: 3 }, { string: 4, fret: 2, finger: 2 }, { string: 2, fret: 1, finger: 1 }], openStrings: [1, 3], mutedStrings: [6] } }, { name: 'D', fretboard: { chord: 'D', fingers: [{ string: 3, fret: 2, finger: 1 }, { string: 1, fret: 2, finger: 2 }, { string: 2, fret: 3, finger: 3 }], openStrings: [4], mutedStrings: [5, 6] } }], checklist: ['I\'ve written a 4-chord progression that feels intentional', 'I\'ve recorded a complete verse with chords and melody', 'I can play my song from start to finish'] } },
    ],
  },
]

export const getLevelById = (id) => LEVELS.find(l => l.id === parseInt(id))
export const getLessonById = (levelId, lessonId) => {
  const level = getLevelById(levelId)
  return level?.lessons.find(l => l.id === lessonId)
}
export const getTotalXPForLevel = (levelId) => {
  const level = getLevelById(levelId)
  return level?.lessons.reduce((sum, l) => sum + l.xp, 0) || 0
}
