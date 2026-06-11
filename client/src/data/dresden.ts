import { Route } from "../types";

export const dresdenClassicRoute: Route = {
  id: "dresden-classic",
  city: "Dresden",
  name: "Dresdner Barock & Elbpanorama",
  nameEn: "Dresden Baroque & Elbe Panorama",
  description:
    "Vom Neumarkt über die Brühlsche Terrasse zum Zwinger – erleben Sie 3,5 km barocke Pracht und den einzigartigen Blick auf die Elbe, der Dresden den Beinamen 'Elbflorenz' einbrachte.",
  descriptionEn:
    "From Neumarkt across the Brühl's Terrace to the Zwinger – experience 3.5 km of Baroque splendor and the unique view of the Elbe that earned Dresden the nickname 'Florence on the Elbe'.",
  imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=800&q=80",
  durationMinutes: 100,
  distanceKm: 3.5,
  priceCents: 499,
  tags: ["barock", "kunst", "geschichte", "elbe"],
  pois: [
    {
      id: "dresden-frauenkirche",
      name: "Frauenkirche",
      nameEn: "Frauenkirche (Church of Our Lady)",
      description:
        "Die Frauenkirche ist das beeindruckendste Symbol der Wiedergeburt Dresdens. 1945 in Schutt und Asche gelegt, lag ihre Ruine 45 Jahre lang als Mahnmal mitten in der Stadt. Dann wurde sie aus den original Trümmern wieder aufgebaut – 2005 geweiht. Die mächtige Steinkuppel – die größte nördlich der Alpen – prägt die Silhouette der Altstadt.",
      descriptionEn:
        "The Frauenkirche is the most impressive symbol of Dresden's rebirth. Destroyed in 1945, its ruins lay as a memorial for 45 years. Then it was rebuilt from the original rubble – consecrated in 2005. The mighty stone dome – the largest north of the Alps – dominates the Old Town skyline.",
      lat: 51.0519,
      lng: 13.7418,
      order: 1,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 15,
      audioDe: "/audio/dresden-frauenkirche_de.mp3",
      audioEn: "/audio/dresden-frauenkirche_en.mp3",
    },
    {
      id: "dresden-neumarkt",
      name: "Neumarkt",
      nameEn: "Neumarkt (New Market)",
      description:
        "Der Neumarkt ist der historische Altstadtkern Dresdens. Nach der fast vollständigen Zerstörung 1945 entstand hier eines der ambitioniertesten Wiederaufbauprojekte Europas. Bürgerinitiativen setzten die originalgetreue Rekonstruktion der barocken Bürgerhäuser durch – und heute kannst du hier wieder das Gefühl der königlichen Residenzstadt spüren.",
      descriptionEn:
        "Neumarkt is Dresden's historic Old Town core. After near-total destruction in 1945, one of Europe's most ambitious reconstruction projects took shape here. Citizen initiatives pushed for faithful reconstruction of Baroque townhouses – today you can once again feel the royal residence city atmosphere.",
      lat: 51.0511,
      lng: 13.7394,
      order: 2,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 8,
      audioDe: "/audio/dresden-neumarkt_de.mp3",
      audioEn: "/audio/dresden-neumarkt_en.mp3",
    },
    {
      id: "dresden-fuerstenzug",
      name: "Fürstenzug",
      nameEn: "Fürstenzug (Procession of Princes)",
      description:
        "Der Fürstenzug ist das größte Porzellanbild der Welt! 102 Meter lang und 23.000 Meißner Porzellanfliesen zeigen den festlichen Zug der Wettiner Herrscher – von 1127 bis 1904. Das Bildnis überlebte die Bombennacht 1945 fast unversehrt. Ein einzigartiges Zeugnis sächsischer Geschichte in Porzellan verewigt.",
      descriptionEn:
        "The Fürstenzug is the world's largest porcelain mural! 102 meters long and made of 23,000 Meissen porcelain tiles, it depicts the ceremonial procession of the Wettin rulers – from 1127 to 1904. The mural survived the 1945 bombing almost unscathed. A unique testimony of Saxon history immortalized in porcelain.",
      lat: 51.0529,
      lng: 13.7391,
      order: 3,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 8,
      audioDe: "/audio/dresden-fuerstenzug_de.mp3",
      audioEn: "/audio/dresden-fuerstenzug_en.mp3",
    },
    {
      id: "dresden-residenz",
      name: "Residenzschloss & Grünes Gewölbe",
      nameEn: "Residence Palace & Green Vault",
      description:
        "Das Residenzschloss war über 400 Jahre Sitz der sächsischen Kurfürsten und Könige. Im Inneren verbirgt sich das Grüne Gewölbe – eine der prächtigsten Schatzkammern Europas. August der Starke ließ hier seine unermesslichen Reichtümer in barocken Wunderkammern inszenieren. Der 'Hofstaat des Großmoguls von Delhi' ist ein überwältigendes Meisterwerk der Goldschmiedekunst.",
      descriptionEn:
        "The Residence Palace was the seat of Saxon prince-electors and kings for over 400 years. Inside lies the Green Vault – one of Europe's most magnificent treasure chambers. Augustus the Strong staged his immeasurable riches here in Baroque wonder rooms. The 'Court of the Grand Mogul of Delhi' is an overwhelming masterpiece of goldsmithing.",
      lat: 51.0529,
      lng: 13.7365,
      order: 4,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 12,
      audioDe: "/audio/dresden-residenz_de.mp3",
      audioEn: "/audio/dresden-residenz_en.mp3",
    },
    {
      id: "dresden-semperoper",
      name: "Semperoper",
      nameEn: "Semper Opera House",
      description:
        "Die Semperoper ist eine der schönsten Opernhäuser der Welt. Zweimal zerstört, zweimal wieder aufgebaut – ein Triumph des Willens. Der Architekt Gottfried Semper schuf ein Meisterwerk der italienischen Renaissance. Richard Strauss, Richard Wagner und Carl Maria von Weber dirigierten hier persönlich ihre Werke.",
      descriptionEn:
        "The Semper Opera House is one of the world's most beautiful opera houses. Destroyed twice, rebuilt twice – a triumph of will. Architect Gottfried Semper created a masterpiece of the Italian Renaissance. Richard Strauss, Richard Wagner, and Carl Maria von Weber personally conducted their works here.",
      lat: 51.0543,
      lng: 13.7339,
      order: 5,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 10,
      audioDe: "/audio/dresden-semperoper_de.mp3",
      audioEn: "/audio/dresden-semperoper_en.mp3",
    },
    {
      id: "dresden-zwinger",
      name: "Zwinger",
      nameEn: "Zwinger Palace",
      description:
        "Der Zwinger ist das barocke Herz Dresdens – ein Gesamtkunstwerk aus Architektur, Skulptur und Gartenkunst. August der Starke ließ ihn als Orangerie und Festspielplatz errichten. Die kronentorartigen Pavillons, der Nymphenbrunnen und die Glockenspielpavillon mit 40 Meißner Porzellanglocken sind weltberühmt. Hier sammelte der Kurfürst seine Kunstschätze – heute beherbergt der Zwinger die Gemäldegalerie Alte Meister mit der Sixtinischen Madonna.",
      descriptionEn:
        "The Zwinger is Dresden's Baroque heart – a total work of art of architecture, sculpture and garden design. Augustus the Strong had it built as an orangery and festival ground. The crown-gate pavilions, the Nymph Fountain and the Carillon Pavilion with 40 Meissen porcelain bells are world-famous. Today it houses the Old Masters Picture Gallery with the Sistine Madonna.",
      lat: 51.0533,
      lng: 13.734,
      order: 6,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 12,
      audioDe: "/audio/dresden-zwinger_de.mp3",
      audioEn: "/audio/dresden-zwinger_en.mp3",
    },
    {
      id: "dresden-bruehlsche-terrasse",
      name: "Brühlsche Terrasse",
      nameEn: "Brühl's Terrace",
      description:
        "Der 'Balkon Europas' – so wird die Brühlsche Terrasse liebevoll genannt. Hoch über der Elbe erhebt sich diese prachtvolle Uferpromenade mit einem atemberaubenden Blick auf die Elbe und die Neustadt. 1738 von Graf Brühl als Privatgarten angelegt, ist sie heute der schönste Spaziergang Dresdens. Folge den Spuren von Caspar David Friedrich, der hier malte.",
      descriptionEn:
        "The 'Balcony of Europe' – that's the affectionate nickname for Brühl's Terrace. This splendid riverside promenade rises high above the Elbe with breathtaking views of the river and Neustadt. Created in 1738 as Count Brühl's private garden, it's now Dresden's most beautiful walk. Follow in the footsteps of Caspar David Friedrich who painted here.",
      lat: 51.0537,
      lng: 13.7423,
      order: 7,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 10,
      audioDe: "/audio/dresden-bruehlsche-terrasse_de.mp3",
      audioEn: "/audio/dresden-bruehlsche-terrasse_en.mp3",
    },
    {
      id: "dresden-hofkirche",
      name: "Hofkirche & Theaterplatz",
      nameEn: "Court Church & Theaterplatz",
      description:
        "Die Hofkirche (Kathedrale Sanctissimae Trinitatis) ist die bedeutendste katholische Kirche Sachsens und die größte Kirchenorgel Sachsens thront hier. Umgeben von Semperoper, Zwinger und Residenzschloss bildet der Theaterplatz einen der schönsten architektonischen Räume Europas – ein barockes Wohnzimmer unter freiem Himmel.",
      descriptionEn:
        "The Court Church (Cathedral of the Holy Trinity) is Saxony's most important Catholic church, housing the largest church organ in Saxony. Surrounded by the Semper Opera, Zwinger and Residence Palace, Theaterplatz forms one of Europe's most beautiful architectural spaces – a Baroque living room under the open sky.",
      lat: 51.0535,
      lng: 13.738,
      order: 8,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 10,
      audioDe: "/audio/dresden-hofkirche_de.mp3",
      audioEn: "/audio/dresden-hofkirche_en.mp3",
    },
    {
      id: "dresden-elbpanorama",
      name: "Elbpanorama & Augustusbrücke",
      nameEn: "Elbe Panorama & Augustus Bridge",
      description:
        "Blick über die Elbe – das berühmte Panorama, das Dresden den Namen 'Elbflorenz' gab. Die Augustusbrücke ist die älteste Steinbrücke Sachsens, 1731 erbaut. Von hier aus siehst du die gesamte Silhouette der Altstadt: Frauenkirche, Hofkirche, Brühlsche Terrasse und die Türme der Stadtmauer. Ein Anblick, der Dichter und Maler seit Jahrhunderten inspiriert.",
      descriptionEn:
        "Look across the Elbe – the famous panorama that gave Dresden the name 'Florence on the Elbe'. The Augustus Bridge is Saxony's oldest stone bridge, built in 1731. From here you see the entire Old Town skyline: Frauenkirche, Court Church, Brühl's Terrace and the city wall towers. A sight that has inspired poets and painters for centuries.",
      lat: 51.055,
      lng: 13.744,
      order: 9,
      imageUrl: "https://images.unsplash.com/photo-1599508706064-3d38baaef236?w=600&q=80",
      duration: 10,
      audioDe: "/audio/dresden-elbpanorama_de.mp3",
      audioEn: "/audio/dresden-elbpanorama_en.mp3",
    },
  ],
};

