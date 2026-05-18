import { cookies } from "next/headers";

export type Locale = "en" | "it";
export const LOCALES: Locale[] = ["en", "it"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "mai-locale";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const v = store.get(LOCALE_COOKIE)?.value;
  return v === "it" || v === "en" ? v : DEFAULT_LOCALE;
}

type Dict = {
  brand: {
    motto: string;
    mottoTranslation: string;
  };
  offerings: {
    section: string;
    headline: string;
    intro: string;
    card1: {
      eyebrow: string;
      title: string;
      blurb: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      cta: string;
    };
    card2: {
      eyebrow: string;
      title: string;
      blurb: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      cta: string;
    };
  };
  nav: {
    events: string;
    baskets: string;
    chef: string;
    story: string;
    contact: string;
    signIn: string;
    reserve: string;
    account: string;
    admin: string;
  };
  hero: {
    eyebrow: string;
    editionLeft: string;
    editionRight: string;
    headlineA: string;
    headlineB: string;
    description: string;
    ctaReserve: string;
    ctaChef: string;
    scrollCue: string;
  };
  philosophy: {
    section: string;
    headline: string;
    fromWhereWeComeLabel: string;
    fromWhereWeCome: string;
    p1: string;
    p2: string;
    p3: string;
  };
  regions: {
    section: string;
    headlineA: string;
    headlineB: string;
    italianMotto: string;
  };
  upcoming: {
    section: string;
    headlineA: string;
    headlineB: string;
    seeAll: string;
    seatLabel: string;
    seatsLeft: (n: number, total: number) => string;
    soldOut: string;
    next: string;
    pricePerSeat: string;
    date: string;
    time: string;
    seats: string;
    price: string;
    emptyTitle: string;
    emptyReserve: string;
    venue: string;
  };
  chefTeaser: {
    section: string;
    headline: string;
    headlineSecondary: string;
    cta: string;
  };
  basket: {
    section: string;
    headlineA: string;
    headlineB: string;
    description: string;
    cta: string;
    items: { label: string; sub: string }[];
  };
  closer: {
    section: string;
    line1: string;
    line2: string;
    line3: string;
    description: string;
    cta: string;
  };
  events: {
    pageEyebrow: string;
    pageTitle: string;
    pageBlurb: string;
    emptyMessage: string;
    perSeat: string;
  };
  basketsList: {
    eyebrow: string;
    title: string;
    blurb: string;
    empty: string;
    forEvent: (title: string, date: string) => string;
  };
  basketDetail: {
    pairedWith: (title: string, date: string) => string;
    backToBaskets: string;
    shipping: string;
    pickup: string;
    contentsEyebrow: string;
    contentsTitle: (event: string) => string;
    contentsEmpty: string;
  };
  eventDetail: {
    backToAll: string;
    upcoming: string;
    venueLabel: string;
    timeLabel: string;
    seatsLabel: string;
    priceLabel: string;
    sectionEvening: string;
    eveningHeadlineA: string;
    eveningHeadlineB: string;
    sectionBasket: string;
    reserveEyebrow: string;
    perSeat: string;
    takeBasketEyebrow: string;
    pickupOrShipping: string;
    shippingOnly: string;
    signInNote: string;
    signInLink: string;
    signInRest: string;
    descriptionFallback: string;
  };
  chef: {
    heroEyebrow: string;
    titlePrefix: string;
    portraitSection: string;
    portraitHeadlineA: string;
    portraitHeadlineB: string;
    quoteAttribution: string;
    signature: string;
    credentialsSection: string;
    credentialsHeadlineA: string;
    credentialsHeadlineB: string;
    closerSection: string;
    closerHeadlineA: string;
    closerHeadlineB: string;
    closerCta: string;
    origin: string;
  };
  account: {
    welcome: (firstName: string) => string;
    signOut: string;
    ordersTitle: string;
    emptyTitle: string;
    emptyLink: string;
    emptyRest: string;
    headers: {
      date: string;
      item: string;
      qty: string;
      status: string;
      total: string;
    };
    seat: string;
    eventSeat: string;
    basketRow: string;
    pickup: string;
    shipping: string;
  };
};

const en: Dict = {
  brand: {
    motto: "Dal cuore d'Italia, alla tua tavola.",
    mottoTranslation: "From the heart of Italy, to your table.",
  },
  offerings: {
    section: "What we offer",
    headline: "Two ways to taste Italy.",
    intro:
      "Mai is two things: a private Italian tasting evening you can reserve a seat at — and the curated basket of ten Italian goods every guest takes home that night, also available to order separately.",
    card1: {
      eyebrow: "Reservations",
      title: "Italian tasting evenings.",
      blurb:
        "An intimate, sixteen-seat tasting hosted by Chef Maimouna. Wine, cheese, chocolate, and food, sourced from small Italian producers.",
      bullet1: "16 seats, one long table",
      bullet2: "5–6 wines + paired food",
      bullet3: "Included basket to take home",
      cta: "Reserve a seat",
    },
    card2: {
      eyebrow: "Products",
      title: "Italian pantry baskets.",
      blurb:
        "Ten Italian pantry staples — pasta, sauce, wine, cheese, oil — plus the chef's secret recipe cards from that evening, so you can cook the menu at home.",
      bullet1: "Pasta · sauce · wine · cheese · oil",
      bullet2: "Includes the chef's secret recipes",
      bullet3: "Pickup at the event or ship",
      cta: "Browse products",
    },
  },
  nav: {
    events: "Reservations",
    baskets: "Products",
    chef: "The Chef",
    story: "Story",
    contact: "Contact",
    signIn: "Sign in",
    reserve: "Reserve",
    account: "Account",
    admin: "Admin",
  },
  hero: {
    eyebrow: "Mai — An Italian Table",
    editionLeft: "Edition · No. I",
    editionRight: "Season · MMXXVI",
    headlineA: "Italy,",
    headlineB: "one table at a time.",
    description:
      "Intimate evenings of wine, chocolate, and food sourced from small Italian producers — paired with a curated basket of ten goods to take home.",
    ctaReserve: "Reserve a seat",
    ctaChef: "Meet the chef",
    scrollCue: "Scroll",
  },
  philosophy: {
    section: "§01 · Philosophy",
    headline: "A small room.\nA long table.\nItaly, honestly.",
    fromWhereWeComeLabel: "From where we come",
    fromWhereWeCome: "Our roots.",
    p1:
      "We started Mai because the Italy we grew up with — the long Sunday lunches, the small producers, the bottle someone's nonno buried in the cellar — felt very far from how Italian food is sold around us.",
    p2:
      "So we built something small. Sixteen guests, no more. Five or six pours, a few cheeses, a square of chocolate. We tell you where every bottle came from and who made it.",
    p3:
      "And before you leave, you take home a basket of the ten goods we walked through together — so the evening continues at your kitchen counter, with the people who weren't at the table.",
  },
  regions: {
    section: "§02 · Regions",
    headlineA: "Italy is not one flavor.",
    headlineB: "It is a thousand tables.",
    italianMotto: "L'Italia non è un solo sapore.\nÈ mille tavole.",
  },
  upcoming: {
    section: "§03 · Upcoming",
    headlineA: "The calendar.",
    headlineB: "A seat at the table.",
    seeAll: "See all",
    seatLabel: "per seat",
    seatsLeft: (n, total) => `${n} of ${total} seats remaining`,
    soldOut: "Sold out",
    next: "Next evening",
    pricePerSeat: "Per seat",
    date: "Date",
    time: "Time",
    seats: "Seats",
    price: "Price",
    emptyTitle: "The next evening is being prepared.",
    emptyReserve: "Reserve a place for first notice",
    venue: "Venue",
  },
  chefTeaser: {
    section: "§04 · The Chef",
    headline: "Meet the chef.",
    headlineSecondary: "Conosci la chef.",
    cta: "Her story",
  },
  basket: {
    section: "§05 · The Basket",
    headlineA: "A pantry of Italy —",
    headlineB: "with the chef's secret recipes.",
    description:
      "Each basket holds ten Italian pantry essentials — wine, jarred sauces, whole cheeses, dried pasta, single-origin oils — plus Chef Maimouna's hand-written secret recipe cards from that evening. A new basket and new recipes for every cycle.",
    cta: "Browse products",
    items: [
      { label: "Pasta", sub: "Artisan dried pasta from a Gragnano mill" },
      { label: "Sugo", sub: "Jarred Italian tomato sauce" },
      { label: "Pesto", sub: "Genovese basil pesto, jarred" },
      { label: "Vino", sub: "Estate-bottled Italian wines" },
      { label: "Formaggio", sub: "A whole regional cheese wheel" },
      { label: "Olio", sub: "Cold-pressed extra virgin olive oil" },
      { label: "Pomodori", sub: "Sun-dried tomato paste" },
      { label: "Spezie", sub: "Italian spice & herb blend" },
      { label: "Cioccolato", sub: "Single-origin Italian chocolate bar" },
      {
        label: "Ricetta",
        sub: "Chef Maimouna's secret recipe card — new every cycle",
      },
    ],
  },
  closer: {
    section: "§06 · Reserve your evening",
    line1: "One long table.",
    line2: "Sixteen seats.",
    line3: "A new menu every time.",
    description:
      "Each Mai evening is hosted by Chef Maimouna for a single seating of sixteen guests. Reserve before the next is gone — every guest leaves with the basket and the secret recipes from that night.",
    cta: "Reserve a seat",
  },
  events: {
    pageEyebrow: "Reservations",
    pageTitle: "Reserve a seat at the table.",
    pageBlurb:
      "Each tasting is a single seating with a small group. Reserve early — seats are limited, and every evening introduces a different product basket.",
    emptyMessage:
      "The next tasting will be announced soon. Sign up to be the first to know.",
    perSeat: "per seat",
  },
  basketsList: {
    eyebrow: "Italian product baskets",
    title: "Ten Italian goods, hand-picked for each tasting.",
    blurb:
      "Every Mai tasting has its own product basket — the same ten items every guest tasted that night. Buy alongside your seat, or order to ship while supplies last.",
    empty: "The next product basket is being assembled.",
    forEvent: (title, date) => `From ${title} · ${date}`,
  },
  basketDetail: {
    pairedWith: (title, date) => `Paired with ${title} · ${date}`,
    backToBaskets: "← All baskets",
    shipping: "shipping",
    pickup: "or pickup at the event",
    contentsEyebrow: "What's inside",
    contentsTitle: (event) => `Ten goods from ${event}.`,
    contentsEmpty: "The basket contents are being finalized.",
  },
  eventDetail: {
    backToAll: "← All events",
    upcoming: "Upcoming",
    venueLabel: "Venue",
    timeLabel: "Time",
    seatsLabel: "Seats",
    priceLabel: "Price",
    sectionEvening: "§01 · The evening",
    eveningHeadlineA: "What we'll taste",
    eveningHeadlineB: "together.",
    sectionBasket: "§02 · The basket of the night",
    reserveEyebrow: "Reserve a seat",
    perSeat: "per seat",
    takeBasketEyebrow: "Take the basket home",
    pickupOrShipping: "or pickup at the event",
    shippingOnly: "shipping only",
    signInNote: "You'll be prompted to ",
    signInLink: "sign in",
    signInRest: " before payment.",
    descriptionFallback: "Details will be shared closer to the date.",
  },
  chef: {
    heroEyebrow: "Meet the founder",
    titlePrefix: "Portrait",
    portraitSection: "§01 · Portrait",
    portraitHeadlineA: "A kitchen built around",
    portraitHeadlineB: "a long table.",
    quoteAttribution: "— Maimouna",
    signature: "Signature dish",
    credentialsSection: "§02 · Credentials",
    credentialsHeadlineA: "The training behind",
    credentialsHeadlineB: "the table.",
    closerSection: "§03 · The Table",
    closerHeadlineA: "Come sit at Maimouna's",
    closerHeadlineB: "long table.",
    closerCta: "See upcoming events",
    origin: "Origin",
  },
  account: {
    welcome: (n) => `Welcome back${n ? `, ${n}` : ""}.`,
    signOut: "Sign out",
    ordersTitle: "Your orders",
    emptyTitle: "No orders yet — ",
    emptyLink: "see what's coming up",
    emptyRest: ".",
    headers: {
      date: "Date",
      item: "Item",
      qty: "Qty",
      status: "Status",
      total: "Total",
    },
    seat: "Seat",
    eventSeat: "Event seat",
    basketRow: "Basket",
    pickup: "Pickup at event",
    shipping: "Shipping",
  },
};

const it: Dict = {
  brand: {
    motto: "Dal cuore d'Italia, alla tua tavola.",
    mottoTranslation: "Dal cuore d'Italia, alla tua tavola.",
  },
  offerings: {
    section: "Cosa offriamo",
    headline: "Due modi per assaggiare l'Italia.",
    intro:
      "Mai è due cose: una serata privata di degustazione italiana a cui puoi riservare un posto — e il cesto curato di dieci eccellenze italiane che ogni ospite porta a casa, disponibile anche da ordinare separatamente.",
    card1: {
      eyebrow: "Prenotazioni",
      title: "Serate di degustazione italiana.",
      blurb:
        "Una degustazione intima di sedici posti curata dalla Chef Maimouna. Vino, formaggio, cioccolato e cucina, da piccoli produttori italiani.",
      bullet1: "16 posti, una sola tavolata",
      bullet2: "5–6 vini + cibo abbinato",
      bullet3: "Cesto incluso da portare a casa",
      cta: "Riserva un posto",
    },
    card2: {
      eyebrow: "Prodotti",
      title: "Cesti dispensa italiana.",
      blurb:
        "Dieci eccellenze della dispensa italiana — pasta, sugo, vino, formaggio, olio — più le ricette segrete della chef di quella serata, per cucinare il menu a casa.",
      bullet1: "Pasta · sugo · vino · formaggio · olio",
      bullet2: "Include le ricette segrete della chef",
      bullet3: "Ritiro all'evento o spedizione",
      cta: "Esplora i prodotti",
    },
  },
  nav: {
    events: "Prenotazioni",
    baskets: "Prodotti",
    chef: "La Chef",
    story: "Storia",
    contact: "Contatti",
    signIn: "Entra",
    reserve: "Riserva",
    account: "Profilo",
    admin: "Admin",
  },
  hero: {
    eyebrow: "Mai — Una tavola italiana",
    editionLeft: "Edizione · No. I",
    editionRight: "Stagione · MMXXVI",
    headlineA: "L'Italia,",
    headlineB: "una tavola alla volta.",
    description:
      "Serate intime di vino, cioccolato e cucina, da piccoli produttori italiani — accompagnate da un cesto curato di dieci eccellenze da portare a casa.",
    ctaReserve: "Riserva un posto",
    ctaChef: "Conosci la chef",
    scrollCue: "Scorri",
  },
  philosophy: {
    section: "§01 · La filosofia",
    headline: "Una stanza piccola.\nUna tavolata lunga.\nItalia, onestamente.",
    fromWhereWeComeLabel: "Da dove veniamo",
    fromWhereWeCome: "Le nostre radici.",
    p1:
      "Abbiamo iniziato Mai perché l'Italia con cui siamo cresciuti — i lunghi pranzi della domenica, i piccoli produttori, la bottiglia che il nonno aveva sepolto in cantina — sembrava molto lontana da come si vende il cibo italiano qui.",
    p2:
      "Così abbiamo costruito qualcosa di piccolo. Sedici ospiti, non di più. Cinque o sei vini, qualche formaggio, un quadrato di cioccolato. Vi raccontiamo da dove viene ogni bottiglia e chi l'ha fatta.",
    p3:
      "E prima di andarvene, portate a casa un cesto delle dieci eccellenze che abbiamo assaggiato insieme — così la serata continua sul vostro bancone, con chi non era al tavolo.",
  },
  regions: {
    section: "§02 · Le regioni",
    headlineA: "L'Italia non è un solo sapore.",
    headlineB: "È mille tavole.",
    italianMotto: "Dieci regioni.\nDieci storie.",
  },
  upcoming: {
    section: "§03 · Prossimi eventi",
    headlineA: "Il calendario.",
    headlineB: "Un posto a tavola.",
    seeAll: "Vedi tutto",
    seatLabel: "a posto",
    seatsLeft: (n, total) => `${n} di ${total} posti rimasti`,
    soldOut: "Tutto esaurito",
    next: "La prossima serata",
    pricePerSeat: "A posto",
    date: "Data",
    time: "Ora",
    seats: "Posti",
    price: "Prezzo",
    emptyTitle: "La prossima serata è in preparazione.",
    emptyReserve: "Iscriviti per ricevere la notizia",
    venue: "Luogo",
  },
  chefTeaser: {
    section: "§04 · La chef",
    headline: "Conosci la chef.",
    headlineSecondary: "Meet the chef.",
    cta: "Il suo ritratto",
  },
  basket: {
    section: "§05 · Il cesto",
    headlineA: "Una dispensa d'Italia —",
    headlineB: "con le ricette segrete della chef.",
    description:
      "Ogni cesto contiene dieci eccellenze della dispensa italiana — vino, salse in barattolo, formaggi interi, pasta secca, oli monoorigine — più le ricette segrete scritte a mano dalla Chef Maimouna per quella serata. Un nuovo cesto e nuove ricette per ogni ciclo.",
    cta: "Esplora i prodotti",
    items: [
      { label: "Pasta", sub: "Pasta artigianale essiccata di Gragnano" },
      { label: "Sugo", sub: "Sugo italiano in barattolo" },
      { label: "Pesto", sub: "Pesto genovese in barattolo" },
      { label: "Vino", sub: "Vini italiani imbottigliati in tenuta" },
      { label: "Formaggio", sub: "Una forma intera di formaggio regionale" },
      { label: "Olio", sub: "Olio extravergine spremuto a freddo" },
      { label: "Pomodori", sub: "Concentrato di pomodoro essiccato al sole" },
      { label: "Spezie", sub: "Miscela italiana di spezie e erbe" },
      { label: "Cioccolato", sub: "Tavoletta di cioccolato italiano monoorigine" },
      {
        label: "Ricetta",
        sub: "La ricetta segreta della Chef — nuova ogni ciclo",
      },
    ],
  },
  closer: {
    section: "§06 · Riserva la tua serata",
    line1: "Una tavolata lunga.",
    line2: "Sedici posti.",
    line3: "Un menu nuovo ogni volta.",
    description:
      "Ogni serata di Mai è ospitata dalla Chef Maimouna per un'unica tavolata di sedici ospiti. Riserva prima che la prossima sia esaurita — ogni ospite porta a casa il cesto e le ricette segrete della serata.",
    cta: "Riserva un posto",
  },
  events: {
    pageEyebrow: "Prenotazioni",
    pageTitle: "Riserva un posto a tavola.",
    pageBlurb:
      "Ogni serata è un'unica tavolata con un piccolo gruppo. Riserva presto — i posti sono limitati e ogni evento porta un cesto di prodotti diverso.",
    emptyMessage:
      "La prossima serata verrà annunciata presto. Iscriviti per essere il primo a saperlo.",
    perSeat: "a posto",
  },
  basketsList: {
    eyebrow: "Prodotti italiani in cesto",
    title: "Dieci eccellenze italiane, scelte per ogni serata.",
    blurb:
      "Ogni serata di Mai ha il suo cesto di prodotti — le stesse dieci eccellenze che ogni ospite ha assaggiato. Compra insieme al posto, o ordina per spedizione finché disponibile.",
    empty: "Il prossimo cesto è in preparazione.",
    forEvent: (title, date) => `Da ${title} · ${date}`,
  },
  basketDetail: {
    pairedWith: (title, date) => `Abbinato a ${title} · ${date}`,
    backToBaskets: "← Tutti i cesti",
    shipping: "spedizione",
    pickup: "oppure ritiro all'evento",
    contentsEyebrow: "Cosa c'è dentro",
    contentsTitle: (event) => `Dieci eccellenze da ${event}.`,
    contentsEmpty: "Il contenuto del cesto sarà presto finalizzato.",
  },
  eventDetail: {
    backToAll: "← Tutti gli eventi",
    upcoming: "La prossima serata",
    venueLabel: "Luogo",
    timeLabel: "Ora",
    seatsLabel: "Posti",
    priceLabel: "Prezzo",
    sectionEvening: "§01 · La serata",
    eveningHeadlineA: "Cosa assaggeremo",
    eveningHeadlineB: "insieme.",
    sectionBasket: "§02 · Il cesto della serata",
    reserveEyebrow: "Riserva un posto",
    perSeat: "a posto",
    takeBasketEyebrow: "Porta il cesto a casa",
    pickupOrShipping: "oppure ritiro all'evento",
    shippingOnly: "solo spedizione",
    signInNote: "Verrai invitato a ",
    signInLink: "entrare",
    signInRest: " prima del pagamento.",
    descriptionFallback: "I dettagli saranno condivisi più vicini alla data.",
  },
  chef: {
    heroEyebrow: "La fondatrice",
    titlePrefix: "Ritratto",
    portraitSection: "§01 · Il ritratto",
    portraitHeadlineA: "Una cucina costruita attorno a",
    portraitHeadlineB: "una tavolata lunga.",
    quoteAttribution: "— Maimouna",
    signature: "Piatto firma",
    credentialsSection: "§02 · Formazione",
    credentialsHeadlineA: "La formazione dietro",
    credentialsHeadlineB: "la tavola.",
    closerSection: "§03 · A tavola",
    closerHeadlineA: "Vieni alla tavola di",
    closerHeadlineB: "Maimouna.",
    closerCta: "Vedi i prossimi eventi",
    origin: "Origine",
  },
  account: {
    welcome: (n) => `Buon ritorno${n ? `, ${n}` : ""}.`,
    signOut: "Esci",
    ordersTitle: "I tuoi ordini",
    emptyTitle: "Ancora nessun ordine — ",
    emptyLink: "guarda cosa c'è in arrivo",
    emptyRest: ".",
    headers: {
      date: "Data",
      item: "Articolo",
      qty: "Qtà",
      status: "Stato",
      total: "Totale",
    },
    seat: "Posto",
    eventSeat: "Posto evento",
    basketRow: "Cesto",
    pickup: "Ritiro all'evento",
    shipping: "Spedizione",
  },
};

const DICTS: Record<Locale, Dict> = { en, it };

export async function getDictionary(): Promise<Dict> {
  const locale = await getLocale();
  return DICTS[locale];
}

export function getDictionaryFor(locale: Locale): Dict {
  return DICTS[locale];
}

const IT_DAYS = [
  "domenica",
  "lunedì",
  "martedì",
  "mercoledì",
  "giovedì",
  "venerdì",
  "sabato",
];
const IT_MONTHS = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];
const EN_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateLocalized(iso: string, locale: Locale): string {
  const d = new Date(iso);
  if (locale === "it") {
    return `${IT_DAYS[d.getDay()]}, ${d.getDate()} ${IT_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  return `${EN_DAYS[d.getDay()]}, ${EN_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// Choose between an English source field and an Italian translation,
// falling back to the English source when the translation is empty.
export function pickLocalized(
  english: string | null | undefined,
  italian: string | null | undefined,
  locale: Locale,
): string {
  if (locale === "it" && italian && italian.trim().length > 0) return italian;
  return english ?? "";
}
