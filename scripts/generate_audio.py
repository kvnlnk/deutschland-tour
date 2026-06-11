#!/usr/bin/env python3
"""Generate audio files for POI descriptions using edge-tts."""

import json
import os
import asyncio
import edge_tts

AUDIO_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "server", "audio")
VOICE = "de-DE-KatjaNeural"  # Natural German female voice
VOICE_EN = "en-US-JennyNeural"  # Natural English female voice

POIS = [
    {
        "id": "brandenburger-tor",
        "text_de": "Das Brandenburger Tor ist das bekannteste Wahrzeichen Berlins und ein Symbol der deutschen Einheit. Erbaut zwischen 1788 und 1791 im Auftrag von König Friedrich Wilhelm II., war es Teil der Zollmauer und wurde später zum Triumphbogen umgestaltet. Während der Teilung Deutschlands stand das Tor im Sperrgebiet direkt an der Mauer. Nach dem Mauerfall 1989 wurde es zum Symbol der Wiedervereinigung – hier feierten Hunderttausende die Öffnung der Grenze.",
        "text_en": "The Brandenburg Gate is Berlin's most famous landmark and a symbol of German unity. Built between 1788 and 1791 by order of King Frederick William II, it was part of the customs wall and later redesigned as a triumphal arch. During the division of Germany, the gate stood in the restricted area directly at the wall. After the fall of the Wall in 1989, it became a symbol of reunification – hundreds of thousands celebrated the opening of the border here.",
    },
    {
        "id": "reichstag",
        "text_de": "Der Reichstag beherbergt den Deutschen Bundestag und ist einer der meistbesuchten Parlamentssitze der Welt. Die Glaskuppel von Sir Norman Foster bietet einen spektakulären Blick über Berlin. Der Reichstagsbrand 1933 wurde von den Nationalsozialisten als Vorwand für die Ausschaltung politischer Gegner genutzt. 1945 hisste die Rote Armee die sowjetische Flagge auf dem Gebäude – eine ikonische Kriegsfotografie.",
        "text_en": "The Reichstag houses the German Bundestag and is one of the most visited parliament buildings in the world. Sir Norman Foster's glass dome offers spectacular views over Berlin. The Reichstag fire of 1933 was used by the Nazis as a pretext to eliminate political opponents. In 1945, the Red Army hoisted the Soviet flag over the building – an iconic war photograph.",
    },
    {
        "id": "holocaust-mahnmal",
        "text_de": "Das Holocaust-Mahnmal besteht aus 2711 Betonstelen auf einem wellenförmigen Gelände. Es erinnert an die sechs Millionen jüdischen Opfer des Nationalsozialismus und wurde 2005 eingeweiht. Entworfen von Peter Eisenman, ist der Ort bewusst begehbar – die enger werdenden Gänge und die wellige Bodenbewegung sollen ein Gefühl von Verlorenheit und Beklemmung vermitteln.",
        "text_en": "The Holocaust Memorial consists of 2,711 concrete stelae on a wave-shaped field. It commemorates the six million Jewish victims of National Socialism and was inaugurated in 2005. Designed by Peter Eisenman, the site is intentionally accessible – the narrowing corridors and undulating ground are meant to convey a sense of disorientation and unease.",
    },
    {
        "id": "potsdamer-platz",
        "text_de": "Der Potsdamer Platz war in den 1920er Jahren der verkehrsreichste Platz Europas und lag nach dem Mauerbau im Niemandsland zwischen Ost und West. Heute ist er ein modernes Geschäftsviertel mit Hochhäusern, Kinos und dem Sony Center. Nach der Wiedervereinigung entstand hier eines der größten Bauprojekte Europas.",
        "text_en": "Potsdamer Platz was the busiest square in Europe in the 1920s and after the Wall was built lay in no-man's land between East and West. Today it's a modern business district with skyscrapers, cinemas, and the Sony Center. After reunification, one of Europe's largest construction projects emerged here.",
    },
    {
        "id": "checkpoint-charlie",
        "text_de": "Der berühmteste Grenzübergang zwischen Ost und West während des Kalten Krieges. Hier standen sich 1961 amerikanische und sowjetische Panzer auf nur 50 Meter Distanz gegenüber – der Höhepunkt der Berlin-Krise. Checkpoint Charlie war nur für Angehörige der Alliierten und Ausländer passierbar. Das Schild You are leaving the American sector wurde zum Symbol der Teilung.",
        "text_en": "The most famous border crossing between East and West during the Cold War. In 1961, American and Soviet tanks faced each other here at just 50 meters distance – the height of the Berlin Crisis. Checkpoint Charlie was only passable for Allied personnel and foreigners. The sign 'You are leaving the American sector' became a symbol of division.",
    },
    {
        "id": "gendarmenmarkt",
        "text_de": "Der Gendarmenmarkt gilt als der schönste Platz Berlins. Umrahmt vom Französischen und Deutschen Dom und dem Konzerthaus, bildet er ein architektonisches Ensemble von Weltbedeutung. Der Platz entstand im 17. Jahrhundert und wurde nach den Gendarmen benannt, die hier stationiert waren.",
        "text_en": "Gendarmenmarkt is considered Berlin's most beautiful square. Framed by the French and German Cathedrals and the Concert Hall, it forms an architectural ensemble of world significance. The square was created in the 17th century and named after the gendarmes who were stationed here.",
    },
    {
        "id": "berliner-dom",
        "text_de": "Der Berliner Dom ist die größte evangelische Kirche Deutschlands und ein Meisterwerk des Historismus. Die 85 Meter hohe Kuppel prägt die Silhouette der Stadt und kann bestiegen werden. Erbaut von 1894 bis 1905 als zentrale Kirche der Hohenzollern, überstand der Dom den Zweiten Weltkrieg schwer beschädigt.",
        "text_en": "Berlin Cathedral is the largest Protestant church in Germany and a masterpiece of historicism. Its 85-meter-high dome dominates the city's skyline and can be climbed. Built from 1894 to 1905 as the central church of the Hohenzollerns, the cathedral survived World War II heavily damaged.",
    },
    {
        "id": "museumsinsel",
        "text_de": "Die Museumsinsel ist ein UNESCO-Weltkulturerbe und beherbergt fünf Weltklasse-Museen. Das Pergamonmuseum, die Alte Nationalgalerie und das Neue Museum sind nur einige der Highlights. Die Museumsinsel entstand im 19. Jahrhundert als preußisches Eiland der Künste.",
        "text_en": "Museum Island is a UNESCO World Heritage site housing five world-class museums. The Pergamon Museum, the Old National Gallery, and the New Museum are just some of the highlights. Museum Island was created in the 19th century as a Prussian 'island of the arts'.",
    },
    {
        "id": "alexanderplatz",
        "text_de": "Der Alexanderplatz ist einer der bekanntesten Plätze Berlins und ein Verkehrsknotenpunkt im Herzen der Stadt. Der 368 Meter hohe Fernsehturm ist das höchste Bauwerk Deutschlands. Er wurde 1969 als Prestigeprojekt der DDR eingeweiht und ist heute das meistbesuchte Wahrzeichen Berlins.",
        "text_en": "Alexanderplatz is one of Berlin's most famous squares and a transport hub in the heart of the city. The 368-meter-high TV tower is the tallest building in Germany. It was inaugurated in 1969 as a prestige project of the GDR and is now Berlin's most visited landmark.",
    },
]


async def generate_all():
    os.makedirs(AUDIO_DIR, exist_ok=True)
    total = len(POIS)
    for i, poi in enumerate(POIS, 1):
        for lang, text in [("de", poi["text_de"]), ("en", poi["text_en"])]:
            voice = VOICE if lang == "de" else VOICE_EN
            filename = f"{poi['id']}_{lang}.mp3"
            filepath = os.path.join(AUDIO_DIR, filename)
            if os.path.exists(filepath):
                print(f"[{i}/{total}] SKIP {filename} (exists)")
                continue
            print(f"[{i}/{total}] Generating {filename}...")
            communicate = edge_tts.Communicate(text, voice)
            await communicate.save(filepath)
            print(f"  → Saved {filename}")

    print(f"\nDone! Generated {total} POIs × 2 languages = {total * 2} audio files")


if __name__ == "__main__":
    asyncio.run(generate_all())
