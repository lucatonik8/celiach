export type Look = {
  title: string;
  kind: 'Editorial' | 'Campaña' | 'Videoclip' | 'Tour';
  meta: [string, string][];
  published?: { text: string; url?: string };
  video?: string;
  prendas?: string[];
};

export const contacto = {
  email: 'celiachxvilla@gmail.com',
  telefono: '+34 625 33 99 60',
  instagram: '@celiachx',
};

export const formacion = {
  meta: [
    ['Programa', 'Máster en Marketing de Moda'],
    ['Enfoque', 'Estrategia de marca'],
    ['Nota final', '8,3 — Notable Alto'],
  ] as [string, string][],
  intro:
    'Máster en Marketing especializado en moda, centrado en el desarrollo estratégico de marca: desde el análisis de mercado hasta la construcción de una propuesta de negocio completa.',
  areas: [
    ['Análisis estratégico de mercado', 'Estudio de tendencias de consumo, identificación de oportunidades y definición de espacio competitivo.'],
    ['Desarrollo de propuesta de marca', 'Construcción de concepto, posicionamiento, propuesta de valor y modelo de negocio de forma coherente.'],
    ['Diseño de estrategia de comunicación', 'Planteamiento de campañas y acciones de lanzamiento alineadas con el posicionamiento de marca.'],
    ['Pensamiento crítico y argumentación', 'Capacidad de justificar decisiones estratégicas con base analítica y rigor.'],
  ] as [string, string][],
};

export const looks: Look[] = [
  {
    title: 'AmadecaZa',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘AmadecaZa’’'],
      ['Rol', 'Estilista'],
      ['Fotógrafo/a', 'Buprago @buprago'],
      ['Modelo/s', 'Bea Jimeno @jimenobeis'],
      ['Fecha', '2023'],
    ],
    published: { text: 'Publicado en Folie Magazine web', url: 'https://www.folie.es/post/editorial-amadecaza' },
  },
  {
    title: 'Beer Real',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘Beer real’’'],
      ['Rol', 'Estilista'],
      ['Fotógrafo/a', 'Buprago @buprago & Luis Soto @luuissoto_'],
      ['Modelo/s', '@ya.roslava, @aaruma, @claudiaa.rguezz_, @angievalencia797 & @arayyy02'],
      ['Fecha', '2023'],
    ],
    published: { text: 'Publicado en Folie Magazine web', url: 'https://www.folie.es/post/editorial-beer-real' },
    prendas: ['@capitansiroco:', '@fracomina_official', '@guess', '@champion', '@moschino', '@blumarine', '@isabellablancheparis', '@adidas', '@drmartenssofficial', '@nike'],
  },
  {
    title: 'Adidas x Bad Bunny',
    kind: 'Campaña',
    meta: [
      ['Proyecto', 'Campaña Adidas x Bad Bunny con FOOTDISTRICT'],
      ['Rol', 'Asistente de estilismo para María @lawiwikk_'],
      ['Fotógrafo/a', 'Buprago @buprago'],
      ['Modelo/s', 'Oier, Gloria, Iandra, Alma & Víctor'],
      ['Fecha', '2025'],
    ],
  },
  {
    title: 'Ca7riel & Paco Amoroso — Supersónicos',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Ca7riel y Paco Amoroso para ACERO MAGAZINE vol.9'],
      ['Rol', 'Asistente de estilismo para María @lawiwikk_'],
      ['Fotógrafo/a', 'Eduardo Montes @madkidmontes'],
      ['Modelo/s', 'Ca7riel y Paco Amoroso @ca7rielypacoamoroso'],
      ['Fecha', '2024'],
    ],
    published: { text: 'Publicado en ACERO MAGAZINE vol.9 en print y en web', url: 'https://acero.metalmagazine.eu/post/ca7riel-paco-amoroso-acero-vol-9' },
    prendas: ['@yabangbcn', '@paolamolet_official', '@dsas3_studio', '@evadehouse', '@coldculture', '@dsquared2', '@organic.anxiety', '@elarmariodepepa', '@pelonio', '@dameapresparis', '@pringastudio', '@alejandrestudio', '@dicesmeu', '@damianslatt', '@aflameconcept'],
  },
  {
    title: 'Deleusse',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘Deleusse’’ para FUCKING YOUNG!'],
      ['Rol', 'Estilista'],
      ['Fotógrafo/a', 'Camilo Delpin @camilodelpin'],
      ['Modelo', 'Jean Deleusse @jean.de_leusse'],
      ['Fecha', '2025'],
    ],
    published: { text: 'Publicado en FUCKING YOUNG! web', url: 'https://fuckingyoung.es/deleusse/' },
    prendas: ['@viacomunicacion', '@masconceptmenswear', '@drmartensofficial', '@karllagerfeld', '@manemanestudio', '@wearespastor'],
  },
  {
    title: 'Tiago PZK — Ser y estar, no parecer',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Tiago PZK para ACERO MAGAZINE vol.11'],
      ['Rol', 'Asistente de estilismo para María @lawiwikk_'],
      ['Fotógrafo/a', 'Eduardo Montes @madkidmontes'],
      ['Modelo', 'Tiago PZK @gotti'],
      ['Fecha', '2025'],
    ],
    published: { text: 'Publicado en ACERO MAGAZINE vol.11 en print y en web', url: 'https://acero.metalmagazine.eu/post/tiago-pzk-acero-vol-11' },
    prendas: ['@floriacharchives', '@carrieristudio', '@garcia_mochales', '@elixir.worldwide', '@drmartensofficial', '@pelonio', '@daysofwarbrand', '@dameapresparis', '@patequilux', '@lecua_press', '@diesel', '@elarmariodepepa', '@aile_brand'],
  },
  {
    title: 'Polina',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘Polina’’'],
      ['Rol', 'Estilista'],
      ['Fotógrafo/a', 'Luis Calvo @l.negativos'],
      ['Modelo', 'Polina @polannica'],
      ['Fecha', '2025'],
    ],
  },
  {
    title: 'L0rna — El peso de ser tan joven y molar tanto',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'L0rna para ACERO MAGAZINE vol.11'],
      ['Rol', 'Asistente de estilismo para María @lawiwikk_'],
      ['Fotógrafo/a', 'Kali Elías @kalielias'],
      ['Modelo', 'L0rna @l0rnasf'],
      ['Fecha', '2025'],
    ],
    published: { text: 'Publicado en ACERO MAGAZINE vol.11 en print y en web', url: 'https://acero.metalmagazine.eu/post/l0rna-acero-vol-11' },
    prendas: ['@lecua_press', '@keperezaxico', '@iwualstudio', '@kaos_design_official', '@elarmariodepepa', '@diesel', '@gederosa_'],
  },
  {
    title: 'Unreachable',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘Unreachable’’ para ISSUE MEN 74'],
      ['Rol', 'Asistente de estilismo para Andrea Estirado @andreaesti.vege'],
      ['Fotógrafo/a', 'Arden @arden__arden'],
      ['Modelo/s', 'Capri Jones, Daniel Efuman, Hugo, Mario Fuentes, Campillejo twins, Duke & Rodrigo Terron'],
      ['Fecha', '2026'],
    ],
    published: { text: 'Publicado en ISSUE MAGAZINE MEN VOL.74 en print' },
    prendas: ['@isabelmarant', '@eaftimos', '@emeerree.studio', '@pelonio', '@sebago_world', '@thecruditecompany', '@dior', '@fendi', '@ihousesc', '@dim_spain', '@abanderado_es', '@trastiendapress', '@vanesavegavv', '@guillermo.justicia', '@nimph_', '@rubearth', '@thorns.thorns', '@enaut__', '@xxlcomunicacion', '@karllagerfeld', '@moschino', '@viacomunicacion', '@j.borgesio'],
  },
  {
    title: 'Renacer — Lia Kali',
    kind: 'Videoclip',
    meta: [
      ['Proyecto', 'Videoclip ‘‘Renacer’’ LIA KALI'],
      ['Rol', 'Auxiliar de estilista para Atenea @ateneamartinezmolina'],
      ['Director/a', 'Ismael de la Trinidad @ismaelxtwo'],
      ['Artista/s', 'Lia Kali @liakali'],
      ['Fecha', '2025'],
    ],
    video: 'https://youtu.be/I4Xx9GA4bXo',
  },
  {
    title: 'Por si te vas — Fernandocosta ft Lia Kali',
    kind: 'Videoclip',
    meta: [
      ['Proyecto', 'Videoclip ‘‘Por si te vas’’ FERNANDOCOSTA FT LIA KALI'],
      ['Rol', 'Asistente de estilismo para María @lawiwikk_'],
      ['Director/a', 'Oleg Brovchenko @olegbrovchenko.es'],
      ['Artista/s', 'Fernandocosta @fernanditoactivated @lia.kali_'],
      ['Fecha', '2025'],
    ],
    video: 'https://youtu.be/PuCGF1fvDdk',
  },
  {
    title: 'Kaelis Tour',
    kind: 'Tour',
    meta: [
      ['Proyecto', 'Tour ‘‘KAELIS’’ LIA KALI'],
      ['Rol', 'Asistente de estilismo para María @lawiwikk_'],
      ['Director/a de show', 'Lena Zafra @lenazafra'],
      ['Artista/s', 'Equipo en escenario de Lia Kali @lia.kali_'],
      ['Fecha', '2025'],
    ],
  },
  {
    title: 'Sin autotune — Lola Indigo',
    kind: 'Videoclip',
    meta: [
      ['Proyecto', 'Videoclip ‘‘Sin autotune’’ LOLA INDIGO'],
      ['Rol', 'Cast wardrobe assist para Andrea Estirado @andreaesti.vege'],
      ['Director/a', 'Willy Rodríguez @willyrg'],
      ['Artista/s', 'Cast (figuración)'],
      ['Fecha', '2025'],
    ],
    video: 'https://youtu.be/SHOYtsAvux4',
  },
  {
    title: 'Japi Mil — Delaporte',
    kind: 'Videoclip',
    meta: [
      ['Proyecto', 'Videoclip ‘‘Japi Mil’’ DELAPORTE'],
      ['Rol', 'Asistente de estilismo para Giovanna Real @joanarealm'],
      ['Director/a', 'Silvia Huelves @silviahuelves'],
      ['Artista/s', 'Delaporte @delaporte.music'],
      ['Fecha', '2025'],
    ],
    video: 'https://www.youtube.com/watch?v=vrPzweYZeLI',
  },
  {
    title: 'Bailar y llorar — Vicco',
    kind: 'Videoclip',
    meta: [
      ['Proyecto', 'Videoclip ‘‘Bailar y llorar’’ VICCO'],
      ['Rol', 'Asistente de estilista para María @lawiwikk_ y estilista en set'],
      ['Director/a', 'Albert Marcos @albertmarcos_'],
      ['Artista/s', 'Vicco @viccovicco'],
      ['Fecha', '2025'],
    ],
    video: 'https://www.youtube.com/watch?v=_vfJ11ITepk',
  },
  {
    title: 'Big Boy — yyy891',
    kind: 'Videoclip',
    meta: [
      ['Proyecto', 'Videoclip ‘‘Big boy’’ yyy891'],
      ['Rol', 'Estilista'],
      ['Director/a', 'Ezewkiel @ezewkiel'],
      ['Artista/s', 'yyy891 @yyynestrosa'],
      ['Fecha', '2025'],
    ],
    video: 'https://www.youtube.com/watch?v=tPbqN7xphcY',
  },
  {
    title: 'Rave',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘Rave’’ para IDEM instituto de estilismo y moda'],
      ['Rol', 'Estilista'],
      ['Fotógrafo/a', 'Javier @javier_j.l'],
      ['Modelo/s', 'Laura Torres @laurat_29'],
      // En el PDF la fecha aparece como "año" (sin rellenar)
    ],
    prendas: ['@descaro.secondhand', '@newrock', '@diesel'],
  },
  {
    title: 'Oliver',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘OLIVER’’'],
      ['Rol', 'Estilista y fotógrafa'],
      ['Fotógrafo/a', 'Celia Luengo @celiachx'],
      ['Modelo/s', 'Oliver Villamea @olivervillamea'],
      ['Fecha', '2026'],
    ],
  },
  {
    title: 'Lucía',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘LUCÍA’’'],
      ['Rol', 'Estilista y fotógrafa'],
      ['Fotógrafo/a', 'Celia Luengo @celiachx'],
      ['Modelo/s', 'Lucía García @luciaagarciia'],
      ['Fecha', '2024'],
    ],
  },
  {
    title: 'Elena',
    kind: 'Editorial',
    meta: [
      ['Proyecto', 'Editorial ‘‘ELENA’’'],
      ['Rol', 'Estilista y fotógrafa'],
      ['Fotógrafo/a', 'Celia Luengo @celiachx'],
      ['Modelo/s', 'Elena Rapún @elenarapun'],
      ['Fecha', '2024'],
    ],
  },
];
