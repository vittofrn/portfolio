/* ============================================================================
   content.js  —  THE ONLY FILE YOU NEED TO EDIT TO ADD WORK
   ----------------------------------------------------------------------------
   Everything on the site is built from this file. Add a project, add a photo,
   change a word — it all happens here. Nothing else needs touching.

   HOW TO ADD A PROJECT
   1. Drop your images in  assets/images/projects/<slug>/
   2. Copy one of the blocks in `projects` below and change the fields.
   3. Commit. Done.

   Any image that isn't there yet renders as a blank paper slot with its
   caption written on it, so the site never looks broken while you fill it in.
   ========================================================================== */

window.SITE = {

  /* -------------------------------------------------------------- identity */
  identity: {
    name: "Vittoria Fornari",
    shorthand: "vitto",
    role: "graphic & visual designer",
    tagline: "I'm drawn to varied, of all kinds projects. I believe good design starts with openness: understanding a problem from every point of view.",
    // the line pinned to the right edge of the homepage, opposite `role`
    motto: "I design by connecting dots that were never meant to meet",
    location: "Between Rome and Barcelona",
    // Your mascot logo. PNG with transparency. If it's missing the
    // wordmark below is used instead — nothing breaks.
    logo: "assets/logo.png",
    // the wordmark in the navbar: the name drawn with the mascot as the O
    logotype: "assets/logotype.png",
    email: "vittoriaafornari003@gmail.com"
  },

  /* ------------------------------------------------------------------ hero */
  // The sketchbook cover. `label` is the sticker on the front.
  cover: {
    label: "works",
    volume: "vol. 01",
    years: "2023 — 2026",
    scribble: "everything I've made and kept"
  },

  /* -------------------------------------------------------------- projects */
  // Order here = order on the site. `cover` is the image that flies out of
  // the sketchbook and sits in the grid.
  projects: [
    {
      slug: "maggo",
      title: "Maggo",
      category: "Editorial design / Social media",
      year: "2024",
      // one line, shown under the title in the grid
      blurb: "A magazine with a mind of its own.",
      cover: "assets/images/projects/maggo/cover.jpg",
      // size in the grid: "wide" | "tall" | "regular"
      size: "wide",
      intro:
        "Maggo is a talking, perceptive editorial magazine developed for the Mag to Mag 2024 Festival with RUFA around the theme of intelligence. The core idea: what if a magazine had its own mind, and could actually talk to you?",
      sections: [
        {
          heading: "Typographic storytelling",
          body:
            "Every page relies entirely on typography and colour to carry tone of voice, narrative arc and emotional nuance. Feeling came out of letterform, scale, spacing and hue. That became the skill the project was really about — typography conveying emotion the way a face or a photograph does. Maggo trades the image-driven conventions of the format for a voice-driven one.",
          images: [
            { src: "assets/images/projects/maggo/01.jpg" },
            { src: "assets/images/projects/maggo/02.jpg" },
            { src: "assets/images/projects/maggo/03.jpg" }
          ]
        },
        {
          heading: "A paper companion",
          body:
            "Ahead of the physical launch we ran Maggo's social presence as a Q&A, where the magazine itself asked the questions and started conversations with readers — building an audience before the issue existed in print. We also led a collaboration with SLAB Letterpress on a limited postcard series using rare vintage letterpress type, extending Maggo's voice into something you could hold and keep.",
          images: [
            { src: "assets/images/projects/maggo/04.jpg" },
            { src: "assets/images/projects/maggo/05.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/maggo/06.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/maggo/07.jpg" }
          ]
        }
      ],
      credits: ["Mag to Mag Festival 2024", "RUFA", "SLAB Letterpress"]
    },

    {
      slug: "enifolia",
      title: "Enifolia",
      category: "UX & UI / App design",
      year: "2024",
      blurb: "A leaf you have to keep alive.",
      cover: "assets/images/projects/enifolia/cover.jpg",
      size: "regular",
      intro:
        "Enifolia is a concept game that uses gamification, sustainability and behavioural design to nudge Enel Energia customers toward better household energy habits. It came out of a two-hour group brainstorm during a workshop on Neuromarketing & Behavioural Data-Driven Design led by Dr. Andrea Ciceri.",
      sections: [
        {
          heading: "Making an abstract habit tangible",
          body:
            "Energy saving is hard to sustain because the payoff is invisible and delayed. Enifolia turns it into something you can hold and have to look after. It's a pet-care and collection game built around a virtual leaf: every month you unlock a new tree species to nurture, gradually building a personal forest. The commitment pays back directly — €0.20 credit on the Eni bill for every tree planted — turning an ecological action into an economic one.",
          images: [
            { src: "assets/images/projects/enifolia/01.jpg" }
          ]
        },
        {
          heading: "Life-cycle logic",
          body:
            "My contribution was the concept and its point of difference: instead of generic pet-care visuals, I proposed original artist-made illustrations for the trees and leaves. I worked on the UX and UI and directed the illustration, making the interface narrate a leaf's full life cycle — growth through to bloom or death — so the UI itself reinforces the goal. The stakes had to be legible without instructions: you feel your energy habits through the state of the leaf, not through a dashboard or a score.",
          images: [
            { src: "assets/images/projects/enifolia/02.jpg" },
            { src: "assets/images/projects/enifolia/03.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/enifolia/04.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/enifolia/05.jpg" }
          ]
        }
      ],
      credits: ["Workshop led by Dr. Andrea Ciceri", "Concept, UX/UI, illustration direction"]
    },

    {
      slug: "abstract-entity-atlas",
      title: "Abstract Entity Atlas",
      category: "UX & UI / Infographics / Editorial design",
      year: "2025",
      blurb: "Who you are online, mapped.",
      cover: "assets/images/projects/abstract-entity-atlas/cover.jpg",
      size: "tall",
      intro:
        "My thesis project: a website and an editorial book exploring the distance between real and digital identity, and the archetypes people build for themselves online.",
      sections: [
        {
          heading: "A book and a site, built together",
          body:
            "The Atlas exists in two forms that argue with each other — a printed editorial volume and a live site. The book was organised across roughly fifty spreads split into sections, each colour-coded so the structure stayed legible while it grew. Journey maps were set A5 in a black-and-white editorial style, deliberately quiet against a palette of pink, coral, amber, lime and purple used everywhere else.",
          images: [
            { src: "assets/images/projects/abstract-entity-atlas/01.jpg" },
            { src: "assets/images/projects/abstract-entity-atlas/02.jpg" },
            { src: "assets/images/projects/abstract-entity-atlas/03.jpg" }
          ]
        },
        {
          heading: "Structure as content",
          body:
            "Alongside the visual work sits the information architecture: user flows, sitemaps and prototypes, drawn as SVG so they could live in both the book and the browser. Mapping identity meant the diagrams weren't documentation of the project — they were the project.",
          images: [
            { src: "assets/images/projects/abstract-entity-atlas/04.jpg" },
            { src: "assets/images/projects/abstract-entity-atlas/05.jpg" },
            { src: "assets/images/projects/abstract-entity-atlas/06.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/abstract-entity-atlas/07.jpg" },
            { src: "assets/images/projects/abstract-entity-atlas/08.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/abstract-entity-atlas/09.jpg" }
          ]
        }
      ],
      link: { label: "See the live site", href: "https://vittofrn.github.io/abstract-entity-atlas/" },
      credits: ["BA thesis, RUFA", "Editorial design, IA, prototyping"]
    },

    {
      slug: "bozza",
      title: "Bozza",
      category: "Editorial design",
      year: "2025",
      blurb: "Three years of learning, in print.",
      cover: "assets/images/projects/bozza/cover.jpg",
      size: "regular",
      intro:
        "Bozza is an editorial project made for the 2025 ARF! Festival, documenting the creative journey of students in RUFA's Graphic Design, Comics and Illustration programme.",
      sections: [
        {
          heading: "A student sketchbook",
          body:
            "It was conceived as a record of a three-year learning process, one issue per academic year. The editorial style set out to capture what it feels like to page through someone's sketchbook — the range of what gets made in a year, and the way complexity and media shift as skill builds. It landed well at the festival, and by making three years of growth visible and tangible it ended up drawing new students to the university.",
          images: [
            { src: "assets/images/projects/bozza/01.jpg" },
            { src: "assets/images/projects/bozza/02.jpg" }
          ]
        },
        {
          heading: "Deciding what counted",
          body:
            "The team worked through more than three hundred individual student works and had to judge what actually represented meaningful development, then shape it into a narrative. We wanted early exercises sitting next to later, harder projects so you could watch the change happen across the pages. The difficult part was judgement under pressure — a tight timeline and the need to be critical about what was genuinely strong. My contribution ran across both the conceptual and editorial sides: the publication's name and identity, collecting and curating the body of work, then editing and editorial development for the full booklet.",
          images: [
            { src: "assets/images/projects/bozza/03.jpg" },
            { src: "assets/images/projects/bozza/04.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/bozza/05.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/bozza/06.jpg" }
          ]
        }
      ],
      credits: ["ARF! Festival 2025", "RUFA", "Naming, curation, editorial development"]
    },

    {
      slug: "theclash-x-basquiat",
      title: "The Clash × Basquiat",
      category: "Album design / Illustration",
      year: "2024",
      blurb: "Two kinds of noise, one sleeve.",
      cover: "assets/images/projects/theclash-x-basquiat/cover.jpg",
      size: "regular",
      // Nothing written yet — the page still works, it just shows the images.
      intro:
        "An album design exercise putting the visual language of The Clash against Basquiat's mark-making.",
      sections: [
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/theclash-x-basquiat/01.jpg" },
            { src: "assets/images/projects/theclash-x-basquiat/02.jpg" },
            { src: "assets/images/projects/theclash-x-basquiat/03.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/theclash-x-basquiat/04.jpg" },
            { src: "assets/images/projects/theclash-x-basquiat/05.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/theclash-x-basquiat/06.jpg" },
            { src: "assets/images/projects/theclash-x-basquiat/07.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/theclash-x-basquiat/08.jpg" }
          ]
        }
      ],
      credits: []
    },

    {
      slug: "scomodo",
      title: "Scomodo",
      category: "Advertising / Illustration / Copywriting",
      year: "2024",
      blurb: "Uncomfortable on purpose.",
      cover: "assets/images/projects/scomodo/cover.jpg",
      size: "wide",
      intro:
        "An advertising and illustration project written and drawn to sit awkwardly with its reader.",
      sections: [
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/scomodo/01.jpg" },
            { src: "assets/images/projects/scomodo/02.jpg" },
            { src: "assets/images/projects/scomodo/03.jpg" },
            { src: "assets/images/projects/scomodo/04.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/scomodo/05.jpg" },
            { src: "assets/images/projects/scomodo/06.jpg" },
            { src: "assets/images/projects/scomodo/07.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/scomodo/08.jpg" },
            { src: "assets/images/projects/scomodo/09.jpg" },
            { src: "assets/images/projects/scomodo/10.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/scomodo/11.jpg" }
          ]
        }
      ],
      credits: []
    }
  ],

  /* The archive / pinboard section was removed when the homepage became the
     map. Its four images are still in assets/images/archive/ if you want it
     back — the entries looked like:
       { title: "...", year: "2025", src: "assets/images/archive/01.jpg",
         note: "..." }                                                     */

  /* ------------------------------------------------------------------ about */
  about: {
    portrait: "assets/images/about/portrait.jpg",
    // the big opening line at the top of the section. `b: true` on a segment
    // bolds it — this is what used to be the first line of `body` below,
    // pulled out and given the emphasis treatment.
    headline: [
      { t: "hi, i'm " },
      { t: "Vittoria Fornari", b: true },
      { t: ", graphic and visual designer with an art background, aiming to turn " },
      { t: "design into art", b: true },
      { t: " — drawing inspiration from " },
      { t: "raw life experience", b: true },
      { t: "." }
    ],
    body: [
      "I was born in a small town in Italy and moved to Rome to study. I've worked with clients to help tell their stories, giving audiences the feel of a brand that's been curated and cared for.",
      "I'm drawn to varied projects of all kinds. I think good design starts with openness — understanding a problem from every point of view."
    ],
    education: [
      { what: "BA Graphic Design, 110/110", where: "Rome University of Fine Arts (RUFA), Rome" },
      { what: "Diploma in Graphic Design, 100/100", where: "Liceo Artistico A. Calcagnadoro, Rieti" }
    ],
    disciplines: [
      { title: "Visual identity", desc: "Logo systems, typography, brand guidelines" },
      { title: "Editorial design", desc: "Layout, typesetting, publication design" },
      { title: "UI & UX", desc: "Interface design, design systems, prototyping" },
      { title: "Social media", desc: "Content systems, campaigns, reels, brand films" },
      { title: "Illustration", desc: "Custom graphics, iconography, visual storytelling" }
    ]
  },

  /* ---------------------------------------------------------------- contact */
  contact: {
    line: "Let's grab a coffee",
    sub: "I'm always open to meet new people, let's have a chat about what we love.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/vittoria-fornari-6405b0313/" },
      { label: "Behance", href: "https://www.behance.net/vittoriafornari2" },
      { label: "Instagram — design", href: "https://www.instagram.com/vitto_gd/" },
      { label: "Instagram — personal", href: "https://www.instagram.com/jeonvitto/" }
    ]
  }
};
