import { useState } from 'react'
import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'

type Publication = {
  authors: string
  year: number
  title: string
  venue: string
  type: 'peer-reviewed' | 'report' | 'book' | 'thesis' | 'policy'
  link?: string
}

const allPublications: Publication[] = [
  // 2026
  { authors: 'Pokhrel, P., Griffioen, J., Bogaard, T.A., Kraaijenbrink, P.D.A., Fiddes, J., & Immerzeel, W.W.', year: 2026, title: 'Upstream hydrology and the importance of snowmelt in buffering droughts in the Karnali basin in Nepal', venue: 'Frontiers in Water, 7', type: 'peer-reviewed', link: 'https://doi.org/10.3389/frwa.2025.1720178' },
  // 2025
  { authors: 'Khanal, S., Faezeh, N., Fiddes, J., Kraaijenbrink, P., Immerzeel, W., et al.', year: 2025, title: 'Guidelines for Glacio-hydrological Modelling in High Mountain Asia', venue: 'FutureWater Report 265', type: 'report', link: 'https://www.futurewater.eu/projects/development-of-a-glacio-hydrological-model-and-iwrm-plan-for-the-uttarakhand-subbasin-in-india/' },
  { authors: 'Khanal, S., Droogers, P., Nick, F., Kraaijenbrink, P., Immerzeel, W., & Fiddes, J.', year: 2025, title: 'Mountain Water Management under Climate Change in Zarafshon River Basin', venue: 'GIZ/TRIGGER', type: 'report', link: 'https://www.futurewater.eu/projects/integrated-water-resources-management-in-tajikistan/' },
  { authors: 'Boj Garcia, E., Khanal, S., Immerzeel, W., Droogers, P., Zwarts, M., Fiddes, J., et al.', year: 2025, title: 'Melting Mountains, Securing Water: a Policy Note for Advancing Mountain Water Management to Strengthen Livelihoods in Tajikistan and Central Asia', venue: 'GIZ/TRIGGER', type: 'policy', link: 'https://www.futurewater.nl/wp-content/uploads/2025/11/Tajikistan-Glaciers-Policy-Note.pdf' },
  { authors: 'Luojus, K., & WMO GCW Snow Watch Team (incl. Fiddes, J.)', year: 2025, title: 'WMO GCW Snow Assessment for Winter 2024-2025, Northern Hemisphere and Regional Aspects', venue: 'WMO', type: 'report', link: 'https://globalcryospherewatch.org/snow-assessments-2025/' },
  // 2024
  { authors: 'González-Herrero, S., Sigmund, A., Haugeneder, M., Hames, O., Huwald, H., Fiddes, J., & Lehning, M.', year: 2024, title: 'Using the sensible heat flux eddy covariance-based exchange coefficient to calculate latent heat from moisture mean gradients on snow', venue: 'Boundary Layer Meteorology', type: 'peer-reviewed', link: 'https://doi.org/10.1007/s10546-024-00864-y' },
  { authors: 'Luojus, K., & WMO GCW Snow Watch Team (incl. Fiddes, J.)', year: 2024, title: 'WMO GCW Snow Assessment for Winter 2023-2024, Northern Hemisphere and Regional Aspects', venue: 'WMO', type: 'report', link: 'https://globalcryospherewatch.org/snow-assessments-2024/' },
  { authors: 'WMO Global Cryosphere Watch', year: 2024, title: 'Status of the Monitoring of the Cryosphere in Central Asia', venue: 'WMO GCW Report No. 1', type: 'report', link: 'https://library.wmo.int/records/item/69490' },
  // 2023
  { authors: 'Filhol, S., Fiddes, J., & Aalstad, K.', year: 2023, title: 'TopoPyScale: A Python Package for Hillslope Climate Downscaling', venue: 'Journal of Open Source Software, 8(86)', type: 'peer-reviewed', link: 'https://doi.org/10.21105/joss.05202' },
  { authors: 'Martin, L.C.P., Westermann, S., Magni, M., Brun, F., Fiddes, J., et al.', year: 2023, title: 'Recent ground thermo-hydrological changes in a southern Tibetan endorheic catchment and implications for lake level changes', venue: 'Hydrology and Earth System Sciences, 27', type: 'peer-reviewed', link: 'https://doi.org/10.5194/hess-27-4409-2023' },
  { authors: 'Luojus, K., & WMO GCW Snow Watch Team (incl. Fiddes, J.)', year: 2023, title: 'WMO GCW Snow Assessment for Winter 2022-2023, Northern Hemisphere and Regional Aspects', venue: 'WMO', type: 'report', link: 'https://globalcryospherewatch.org/snow-assessments/' },
  // 2022
  { authors: 'Alonso-González, E., Aalstad, K., Baba, M.W., Revuelto, J., López-Moreno, J.I., Fiddes, J., et al.', year: 2022, title: 'The Multiple Snow Data Assimilation System (MuSA v1.0)', venue: 'Geoscientific Model Development, 15(24)', type: 'peer-reviewed', link: 'https://doi.org/10.5194/gmd-15-9127-2022' },
  { authors: 'Fiddes, J., Aalstad, K., & Lehning, M.', year: 2022, title: 'TopoCLIM: rapid topography-based downscaling of regional climate model output in complex terrain v1.1', venue: 'Geoscientific Model Development, 15', type: 'peer-reviewed', link: 'https://doi.org/10.5194/gmd-15-1753-2022' },
  { authors: 'Kronenberg, M., van Pelt, W., Machguth, H., Fiddes, J., Hoelzle, M., & Pertziger, F.', year: 2022, title: 'Long-Term Firn and Mass Balance Modelling for Abramov Glacier in the Data-Scarce Pamir Alay', venue: 'The Cryosphere, 16(12)', type: 'peer-reviewed', link: 'https://doi.org/10.5194/tc-16-5001-2022' },
  { authors: 'Kruyt, B., Mott, R., Fiddes, J., Gerber, F., Sharma, V., & Reynolds, D.', year: 2022, title: 'A Downscaling Intercomparison Study: The Representation of Slope-and Ridge-Scale Processes in Models of Different Complexity', venue: 'Frontiers in Earth Science, 10', type: 'peer-reviewed', link: 'https://doi.org/10.3389/feart.2022.789332' },
  { authors: 'Khanal, S., Nick, F., Fiddes, J., Kraaijenbrink, P., Immerzeel, W., & Hunink, J.E.', year: 2022, title: 'Present-day and Future Changes in the Hydrology of the Bhagirathi Basin', venue: 'FutureWater Report 252', type: 'report', link: 'https://www.futurewater.eu/projects/development-of-a-glacio-hydrological-model-and-iwrm-plan-for-the-uttarakhand-subbasin-in-india/' },
  { authors: 'Bellprat, O., Spirig, C., Flubacher, M., Grandjean, J., Roulet, Y.-A., Moret, L., Bavay, M., Fiddes, J., et al.', year: 2022, title: 'A low-cost approach to develop Weather, Water and Climate Services (WWCS) in rural areas of Tajikistan', venue: 'EMS Annual Meeting 2022, Bonn', type: 'report' },
  { authors: 'Bavay, M., Fiddes, J., Fierz, C., Lehning, M., Monti, F., & Egger, T.', year: 2022, title: 'The MeteoIO pre-processing library for operational applications', venue: 'Proceedings, International Snow Science Workshop, Innsbruck', type: 'report' },
  // 2021
  { authors: 'Shugar, D.H., et al.', year: 2021, title: 'A massive rock and ice avalanche caused the 2021 disaster at Chamoli, Indian Himalaya', venue: 'Science, 373(6552)', type: 'peer-reviewed', link: 'https://doi.org/10.1126/science.abh4455' },
  { authors: 'Allen, S., Frey, H., & Fiddes, J.', year: 2021, title: 'Assessment of Contributing Factors of the May 2021 Disasters in Tajikistan', venue: 'PreventionWeb', type: 'report', link: 'https://www.preventionweb.net/publication/assessment-contributing-factors-may-2021-disasters-tajikistan-forensic-study-under' },
  // 2020
  { authors: 'Barandun, M., Fiddes, J., Scherler, M., Mathys, T., Saks, T., Petrakov, D., & Hoelzle, M.', year: 2020, title: 'The State and Future of the Cryosphere in Central Asia', venue: 'Water Security, 11', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.wasec.2020.100072' },
  { authors: 'Bavay, M., Fiddes, J., & Godøy, Ø.', year: 2020, title: 'Automatic Data Standardization for the Global Cryosphere Watch Data Portal', venue: 'Data Science Journal, 19(1)', type: 'peer-reviewed', link: 'https://doi.org/10.5334/dsj-2020-006' },
  { authors: 'Bender, E., Lehning, M., & Fiddes, J.', year: 2020, title: 'Changes in Climatology, Snow Cover, and Ground Temperatures at High Alpine Locations', venue: 'Frontiers in Earth Science, 8', type: 'peer-reviewed', link: 'https://doi.org/10.3389/feart.2020.00100' },
  { authors: 'Philipson, C.D., Cutler, M.E.J., Brodrick, P.G., Asner, G.P., Boyd, D.S., Costa, P.M., Fiddes, J., et al.', year: 2020, title: 'Active Restoration Accelerates the Carbon Recovery of Human-Modified Tropical Forests', venue: 'Science, 369(6505)', type: 'peer-reviewed', link: 'https://doi.org/10.1126/science.aay4490' },
  // 2019
  { authors: 'Fiddes, J., Aalstad, K., & Westermann, S.', year: 2019, title: 'Hyper-resolution ensemble-based snow reanalysis in mountain regions using clustering', venue: 'Hydrology and Earth System Sciences, 23', type: 'peer-reviewed', link: 'https://doi.org/10.5194/hess-23-1-2019' },
  { authors: 'Hoelzle, M., Barandun, M., Bolch, T., Fiddes, J., Gafurov, A., Muccione, V., Saks, T., & Shaghedanova, M.', year: 2019, title: 'The Status and Role of the alpine Cryosphere in Central Asia', venue: 'The Aral Sea Basin: Water for Sustainable Development in Central Asia, Routledge', type: 'book', link: 'https://doi.org/10.4324/9780429436475-8' },
  { authors: 'Muccione, V., & Fiddes, J.', year: 2019, title: 'State of the Knowledge on Water Resources and Natural Hazards under Climate Change in Central Asia and South Caucasus', venue: 'Managing Disaster Risks and Water under Climate Change', type: 'report' },
  { authors: 'Muccione, V., Huggel, C., Salzmann, N., Fiddes, J., Nussbaumer, S.U., Novikov, V., & Hughes, G.', year: 2019, title: 'Climate-cryosphere-water nexus: Central Asia outlook', venue: 'Zoï Environment Network', type: 'report' },
  // 2016
  { authors: 'Allen, S.K., Fiddes, J., Linsbauer, A., Randhawa, S.S., & Salzmann, N.', year: 2016, title: 'Indo-Swiss partnership initiates first local permafrost studies in the Indian Himalaya', venue: 'Current Science, 111(3)', type: 'peer-reviewed', link: 'https://doi.org/10.18520/cs/v111/i3/550-553' },
  // 2015
  { authors: 'Fiddes, J., Endrizzi, S., & Gruber, S.', year: 2015, title: 'Large-area land surface simulations in heterogeneous terrain driven by global data sets: application to mountain permafrost', venue: 'The Cryosphere, 9', type: 'peer-reviewed', link: 'https://doi.org/10.5194/tc-9-411-2015' },
  // 2014
  { authors: 'Fiddes, J., & Gruber, S.', year: 2014, title: 'TopoSCALE v.1.0: downscaling gridded climate data in complex terrain', venue: 'Geoscientific Model Development, 7', type: 'peer-reviewed', link: 'https://doi.org/10.5194/gmd-7-387-2014' },
  { authors: 'Fiddes, J.T.', year: 2014, title: 'Subgrid Simulation of Land Surface Variables in Heterogeneous and Remote Environments: Application to Mountain Permafrost', venue: 'Doctoral dissertation, ETH Zurich', type: 'thesis', link: 'https://www.zora.uzh.ch/id/eprint/105313/' },
  // 2013
  { authors: 'Habib, H., Anceno, A.J., Fiddes, J., Beekma, J., Ilyuschenko, M., Nitivattananon, V., & Shipin, O.V.', year: 2013, title: 'Jumpstarting post-conflict strategic water resources protection from a changing global perspective: Gaps and prospects in Afghanistan', venue: 'Journal of Environmental Management, 129', type: 'peer-reviewed', link: 'https://doi.org/10.1016/j.jenvman.2013.07.019' },
  // 2012
  { authors: 'Fiddes, J., & Gruber, S.', year: 2012, title: 'TopoSUB: a tool for efficient large area numerical modelling in complex topography at sub-grid scales', venue: 'Geoscientific Model Development, 5', type: 'peer-reviewed', link: 'https://doi.org/10.5194/gmd-5-1245-2012' },
  { authors: 'Schmid, M.-O., Gubler, S., Fiddes, J., & Gruber, S.', year: 2012, title: 'Inferring snow pack ripening and melt out from distributed ground surface temperature measurements', venue: 'The Cryosphere, 6', type: 'peer-reviewed', link: 'https://doi.org/10.5194/tc-6-1127-2012' },
  // 2011
  { authors: 'Gubler, S., Fiddes, J., Keller, M., & Gruber, S.', year: 2011, title: 'Scale-dependent measurement and analysis of ground surface temperature variability in alpine terrain', venue: 'The Cryosphere, 5(2)', type: 'peer-reviewed', link: 'https://doi.org/10.5194/tc-5-431-2011' },
  { authors: 'Beekma, J., & Fiddes, J.', year: 2011, title: 'Floods and droughts: The Afghan water paradox', venue: 'Afghanistan Human Development Report 2011', type: 'report', link: 'https://www.researchgate.net/publication/263506846_Floods_and_droughts_The_Afghan_water_paradox' },
  // 2010
  { authors: 'Keller, M., Hungerbuehler, G., Knecht, O., Sheikh, S., Beutel, J., Gubler, S., Fiddes, J., & Gruber, S.', year: 2010, title: 'iAssist: rapid deployment and maintenance of tiny sensing systems', venue: 'Proceedings of the 8th ACM Conference on Embedded Networked Sensor Systems (SenSys \'10)', type: 'peer-reviewed', link: 'https://doi.org/10.1145/1869983.1870043' },
  { authors: 'Fiddes, J.', year: 2010, title: 'Climbs and expeditions: Asia, Afghanistan, Hindu Kush, Koh-i-Beefy', venue: 'American Alpine Journal, 52(84)', type: 'report', link: 'https://publications.americanalpineclub.org/articles/12201025500/Koh-i-Beefy-ca-5400m' },
  // 2007
  { authors: 'Fiddes, J.', year: 2007, title: 'Afghanistan: Implications Of Climate Change For Water Resources In The Kunduz River Basin', venue: 'Climate Challenges: Bridging the Knowledge Gap, Mercy Corps', type: 'report', link: 'https://www.mercycorps.org/files/file1198714955.pdf' },
]

const typeLabels: Record<string, string> = {
  'peer-reviewed': 'Peer-reviewed',
  report: 'Report',
  book: 'Book chapter',
  thesis: 'Thesis',
  policy: 'Policy note',
}

const typeColors: Record<string, string> = {
  'peer-reviewed': 'var(--unframer-mf-cyan, #35E4E4)',
  report: 'var(--unframer-accent-blue, #B9FFFF)',
  book: '#D5F0A3',
  thesis: '#a78bfa',
  policy: '#fbbf24',
}

export default function Publications() {
  const [filter, setFilter] = useState<string>('all')

  const types = ['all', ...Object.keys(typeLabels)]
  const filtered = filter === 'all' ? allPublications : allPublications.filter(p => p.type === filter)

  // Group by year
  const byYear: Record<number, Publication[]> = {}
  for (const p of filtered) {
    if (!byYear[p.year]) byYear[p.year] = []
    byYear[p.year].push(p)
  }
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <>
      <section
        className="w-full flex flex-col items-center"
        style={{
          backgroundColor: '#F5F5F5',
          padding: '160px 16px 80px 16px',
        }}
      >
        <div className="w-full max-w-[1200px]">
          {/* Header */}
          <div style={{ paddingBottom: '40px' }}>
            <div className="max-w-[700px] flex flex-col gap-[24px]">
              <Label text="Publications" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                Peer-reviewed articles, reports, and book chapters from the Mountain Futures team.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-[8px]" style={{ paddingBottom: '40px' }}>
            {types.map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontWeight: 300,
                  fontSize: '13px',
                  letterSpacing: '-0.03em',
                  padding: '6px 14px',
                  borderRadius: '0px',
                  border: '1px solid',
                  borderColor: filter === t ? 'var(--unframer-forrest)' : 'var(--unframer-neutral-300)',
                  backgroundColor: filter === t ? 'var(--unframer-forrest)' : 'transparent',
                  color: filter === t ? '#fff' : 'var(--unframer-forrest)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t === 'all' ? `All (${allPublications.length})` : `${typeLabels[t]} (${allPublications.filter(p => p.type === t).length})`}
              </button>
            ))}
          </div>

          {/* Publications by year */}
          <div className="flex flex-col">
            {years.map(year => (
              <div key={year}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 300,
                    fontSize: '28px',
                    letterSpacing: '-0.05em',
                    color: 'var(--unframer-forrest)',
                    padding: '32px 0 16px 0',
                    borderBottom: '1px solid var(--unframer-neutral-300)',
                  }}
                >
                  {year}
                </div>
                {byYear[year].map((p, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '20px 0',
                      borderBottom: '1px solid var(--unframer-neutral-200, #e4e4e4)',
                    }}
                  >
                    <div className="flex items-start gap-[12px]">
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '11px',
                          fontWeight: 400,
                          letterSpacing: '-0.02em',
                          padding: '3px 8px',
                          backgroundColor: typeColors[p.type] || '#e4e4e4',
                          color: 'var(--unframer-forrest)',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {typeLabels[p.type] || p.type}
                      </span>
                      <div>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px',
                            lineHeight: '1.55em',
                            letterSpacing: '-0.03em',
                            fontWeight: 500,
                          }}
                        >
                          {p.link ? (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'var(--unframer-neutral-300)', textUnderlineOffset: '3px' }}
                              onMouseEnter={e => { e.currentTarget.style.textDecorationColor = 'var(--unframer-mf-cyan, #35E4E4)' }}
                              onMouseLeave={e => { e.currentTarget.style.textDecorationColor = 'var(--unframer-neutral-300)' }}
                            >
                              {p.title}
                            </a>
                          ) : p.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            lineHeight: '1.55em',
                            letterSpacing: '-0.03em',
                            color: 'var(--unframer-neutral-400)',
                            marginTop: '4px',
                          }}
                        >
                          {p.authors}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            lineHeight: '1.55em',
                            letterSpacing: '-0.03em',
                            fontStyle: 'italic',
                            color: 'var(--unframer-neutral-400)',
                          }}
                        >
                          {p.venue}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
