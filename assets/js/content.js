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
    motto: "I design by connecting dots and making art of them",
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
        "Maggo is a talking, perceptive editorial magazine developed for the Mag to Mag 2024 Festival with Rufa around the theme of \"intelligence.\" The core idea is, what if a magazine had its own mind, and could actually talk to you?",
      sections: [
        {
          heading: "Typographic storytelling",
          body:
            "Every page relies entirely on typography and color to carry tone of voice, narrative arc and emotional nuance. Feelings stemmed from letterform, scale, spacing, and hue. This became the project's skill: typography conveying emotion like a face or photo. Maggo is a fundamentally different take on what editorial design can be, trading the image-driven conventions of the format for a voice-driven one.",
          images: [
            { src: "assets/images/projects/maggo/01.jpg" },
            { src: "assets/images/projects/maggo/02.jpg" }
          ]
        },
        {
          heading: "A paper companion",
          body:
            "Ahead of the physical launch, we run Maggo's social media presence, a Q&A format where the magazine itself asked questions and started conversations with readers, building anticipation before the issue existed in print. We also led a collaboration with SLAB Letterpress to produce a limited postcard series using rare, vintage letterpress type, extending Maggo's voice into a tactile, collectible object.",
          images: [
            { src: "assets/images/projects/maggo/03.jpg" },
            { src: "assets/images/projects/maggo/04.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/maggo/05.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/maggo/06.jpg" }
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
        "Enifolia is a concept game that uses gamification, sustainability, and behavioral design to nudge Enel Energia customers toward better household energy habits. It was born out of a two-hour group brainstorming session during a workshop on Neuromarketing & Behavioral Data-Driven Design, led by Dr. Andrea Ciceri.",
      sections: [
        {
          heading: "Abstract behavior into tangible",
          body:
            "Energy-saving behavior is hard to sustain because the payoff is invisible and delayed, Enifolia turns that abstract behavior into something tangible and ongoing to care for. It's a pet-care and collection game built around a virtual tree leaf: every month a customer unlocks a new tree species to nurture, gradually building a personal forest. That commitment pays back directly, with a €0.20 credit on the Eni bill for every tree planted, turning an ecological action into an actual economic one.",
          images: [
            { src: "assets/images/projects/enifolia/01.jpg" },
            { src: "assets/images/projects/enifolia/02.jpg" }
          ]
        },
        {
          heading: "Life-cycle logic",
          body:
            "My contribution was the game's concept and its point of difference, rather than generic pet-care visuals, I proposed using original artist-made illustrations for the trees and leafs. I worked on the UX&UI design and directed the illustration process for the leafs, made the UI visually narrate a leaf's full life cycle, from growth through to either bloom or death, so the interface itself reinforces the goal, care for it. I made that life-cycle logic legible entirely through UI and illustration, without instructions doing the work the player needed to feel the stakes of their energy habits through the state of the leaf itself, not through a dashboard or a score.",
          images: [
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
        "Abstract Entity Atlas is a test-taking platform that generates a personal and unique data-map, built to raise awareness of how our online identity is actually shaped by data, not by who we are physically, but by what we do, click, and share.",
      sections: [
        {
          heading: "You are your data",
          body:
            "The platform is a personality test with a twist, instead of telling you which \"type\" of person you are, it tells you which \"type\" of data profile you are. Users answer ten questions about their internet habits, why they go online, which platforms they use, and how they use them, and the platform translates those answers into a personalised infographic map, almost like a diagnostic readout of their digital self. The project's central argument is online, you are your data, nothing more and nothing less.",
          images: [
            { src: "assets/images/projects/abstract-entity-atlas/01.jpg" },
            { src: "assets/images/projects/abstract-entity-atlas/02.jpg" },
            { src: "assets/images/projects/abstract-entity-atlas/03.jpg" },
            { src: "assets/images/projects/abstract-entity-atlas/04.jpg" }
          ]
        },
        {
          heading: "Reconfigurable system",
          body:
            "As founder, I led every layer of this: the concept, the UX/UI, the infographic system, and the editorial book documenting it all. The map itself is a modular, reconfigurable system, visually researched from the internal architecture of electronic chips, and I structured the whole interface like a motherboard: a central archetype connects outward to the user's social channels and media usage via \"cables\", each one worth 10% of the test answers. I designed both an active state (every element switched on) and an inactive state (elements not selected), plus a mobile layout built specifically for social sharing. Beyond the map, I designed and built the website home, archetype deep-dives, and project rationale, and produced an editorial book covering the research and design process behind the whole system.",
          images: [
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
        "Bozza is an editorial project created for the 2025 ARF! Festival to document the creative journey of students in RUFA's Graphic Design Comics and Illustration program.",
      sections: [
        {
          heading: "A student sketchbook",
          body:
            "It was conceived as a record of a three-year learning process: each issue corresponds to one academic year. The editorial style aims to represent the essence of exploring a student sketchbook, showcasing the variety of projects created each year and how the complexity and media evolve to enhance their skills. The project was well received at the festival, and by making three years of student growth visible and tangible, it ended up drawing new students to the university.",
          images: [
            { src: "assets/images/projects/bozza/01.jpg" },
            { src: "assets/images/projects/bozza/02.jpg" }
          ]
        },
        {
          heading: "What counted",
          body:
            "The team had to work through 300+ individual student works, decide what actually represented meaningful development, and make it into a coherent editorial narrative. We wanted the reader to see early exercises next to later, more complex projects, and watch skill and media evolve in real time across the pages. The challenging part was judgment under pressure, with a tight timeline, the team had to be critical about what counted as strong work. My contribution spanned both the conceptual and editorial sides, I worked on the publication's name and identity, and on collecting and curating the body of student work. I then moved into editing and editorial development for the full booklet.",
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
      intro:
        "This project was a brief pairing The Clash's self-titled 1977 album with the artist Jean-Michel Basquiat, developed in my first year of university, working under an art director. I had to merge two voices, one musical, one visual, rather than just borrowing Basquiat's aesthetic as decoration.",
      sections: [
        {
          heading: "Two systems at once",
          body:
            "We were walking a line between two systems at once: staying true to Basquiat's storytelling, his rawness, his symbolism, while still functioning as an actual Clash album, with all the format conventions that involves. The result is a cover that keeps Basquiat's visual storytelling intact, but built specifically to carry The Clash's politics and packaged as a concept for a complete, market-ready release.",
          images: [
            { src: "assets/images/projects/theclash-x-basquiat/01.jpg" },
            { src: "assets/images/projects/theclash-x-basquiat/02.jpg" },
            { src: "assets/images/projects/theclash-x-basquiat/03.jpg" }
          ]
        },
        {
          heading: "The message",
          body:
            "I researched Basquiat's visual language to create an illustration that captures The Clash's critique of capitalism, depicting band members as fighters against money.",
          images: [
            { src: "assets/images/projects/theclash-x-basquiat/04.jpg" },
            { src: "assets/images/projects/theclash-x-basquiat/05.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/theclash-x-basquiat/06.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/theclash-x-basquiat/07.jpg" }
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
        "This advertising campaign was commissioned by Scomodo, a youth community founded in Rome in 2016 to drive social and cultural change by empowering young people. They needed to attract new members to their shared spaces where younger people can express themselves and pursue what they're actually passionate about, stepping out of their comfort zone.",
      sections: [
        {
          heading: "Into the right space",
          body:
            "I built the campaign around the line \"Step out of your comfort zone, step into the right space\", pushing on the \"growing\" aspects of teens, reframing the ask not as risk, but as trade: give up the comfort zone, gain a space actually built for you. The tone stayed direct and authentic, speaking to young people's real desire to grow, be challenged, and belong to something, while the illustrations did the work of making that message feel immediate and approachable rather than abstract.",
          images: [
            { src: "assets/images/projects/scomodo/01.jpg" },
            { src: "assets/images/projects/scomodo/02.jpg" }
          ]
        },
        {
          heading: "A new direction",
          body:
            "As co-art director, copywriter, illustrator, and editor, I developed the campaign idea and copy, and created the illustration style and graphics that carry it. The problem was twofold, first a positioning problem: how do you convince someone to step outside their comfort zone and into a space they've never been, when the whole appeal of a comfort zone is that it's comfortable? Second, a brand problem: Scomodo's communication had always been text driven, so any new direction had to feel like a natural evolution of their identity. We wanted it to read as more professional and more considered, while still unmistakably being Scomodo.",
          images: [
            { src: "assets/images/projects/scomodo/03.jpg" },
            { src: "assets/images/projects/scomodo/04.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/scomodo/05.jpg" }
          ]
        },
        {
          heading: "",
          body: "",
          images: [
            { src: "assets/images/projects/scomodo/06.jpg" }
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
      { t: ", drawing inspiration from " },
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
      { label: "Instagram — design", href: "https://www.instagram.com/vitto_gd/" }
    ]
  }
};
