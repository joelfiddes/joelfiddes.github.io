import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'

type MediaItem = {
  title: string
  url: string
  type: 'video' | 'article' | 'presentation' | 'webinar' | 'website'
  source: string
  description: string
  year: number
}

const media: MediaItem[] = [
  // 2025
  { title: 'CROMO-ADAPT Project Website', url: 'https://cromoadapt.tilda.ws/', type: 'website', source: 'CROMO-ADAPT', description: 'Cryospheric Observation and Modelling for Improved Adaptation in Central Asia. Project portal with resources, news, and outputs.', year: 2025 },
  { title: 'Expert Dialogue on Mountains and Climate Change — SBSTA 60', url: 'https://adaptationataltitude.org/knowledge-base/adaptation-in-mountains/expert-dialogue-on-mountains-and-climate-change-sbsta-60/', type: 'presentation', source: 'Adaptation at Altitude / UNFCCC', description: 'Expert dialogue mandated by COP28, bringing together scientists and policymakers on mountain climate impacts.', year: 2025 },
  // 2024
  { title: 'Adaptation at Altitude — Taking Action in the Mountains', url: 'https://vimeo.com/932803657', type: 'video', source: 'Vimeo / Zoï Environment Network', description: 'Documentary on disappearing glaciers, risks to mountain communities, and the need for integrated policy action.', year: 2024 },
  { title: 'A@A Knowledge Network Learning Event', url: 'https://youtu.be/NT5LrA8Tklg', type: 'webinar', source: 'YouTube / Adaptation at Altitude', description: 'Recording from the October 2024 learning event on adaptation solutions in mountain regions.', year: 2024 },
  { title: 'New Adaptation at Altitude Documentary Highlights the Crucial Role of Mountains', url: 'https://www.fao.org/mountain-partnership/news/newsroom/news-detail/New-Adaptation-at-Altitude-documentary-highlights-the-crucial-role-of-mountains-in-our-world/en', type: 'article', source: 'FAO Mountain Partnership', description: 'Coverage of the Adaptation at Altitude documentary release (April 2024).', year: 2024 },
  { title: 'Adaptation at Altitude — Adaptation to Climate Change in the Andes', url: 'https://www.genevawaterhub.org/news/adaptation-altitude-video-adaptation-climate-change-andes', type: 'video', source: 'Geneva Water Hub', description: 'Peru\'s adaptation strategies including agroclimatic information, river basin management, and early warning systems.', year: 2024 },
  { title: 'Adaptation at Altitude — Adaptation in the Mountains of East Africa', url: 'https://www.genevawaterhub.org/news/adaptation-altitude-video-adaptation-climate-change-mountains-east-africa', type: 'video', source: 'Geneva Water Hub', description: 'Restoration of degraded mountain areas and collaborative forest management in Uganda.', year: 2024 },
  { title: 'Adaptation at Altitude — How is Switzerland Adapting?', url: 'https://www.genevawaterhub.org/news/adaptation-altitude-how-switzerland-adapting-climate-change-mountains', type: 'video', source: 'Geneva Water Hub', description: 'Glacier loss, rising temperatures, and natural hazards in the Swiss Alps.', year: 2024 },
  // 2023
  { title: 'Mountains, Parliaments, and the Global Goal on Adaptation — Preparing for COP28', url: 'https://www.genevawaterhub.org/news/adaptation-altitude-webinar-mountains-parliaments-and-global-goal-adaptation-preparing-cop28', type: 'webinar', source: 'Geneva Water Hub', description: 'Webinar on parliamentary action and climate adaptation ahead of COP28 (November 2023).', year: 2023 },
  { title: 'Observing Snow and Ice to Strengthen Climate Resilience in Central Asia', url: 'https://www.deza.eda.admin.ch/en/observing-snow-and-ice-to-strengthen-climate-resilience-in-central-asias-mountain-regions', type: 'article', source: 'SDC / DEZA', description: 'Feature on CROMO-ADAPT including photos by Joel Fiddes of permafrost monitoring in Tajikistan.', year: 2023 },
  // 2022
  { title: 'New Swiss Project on Snow, Glaciers and Permafrost Launches in Tajikistan', url: 'https://www.eda.admin.ch/countries/tajikistan/en/home/news/news.html/content/countries/tajikistan/en/meta/news/2022/June/cromoadapt', type: 'article', source: 'SDC', description: 'Official announcement of the CROMO-ADAPT kick-off workshop in Dushanbe (June 2022).', year: 2022 },
  // 2021
  { title: 'Chamoli Disaster Could Happen Again', url: 'https://www.wsl.ch/en/news/chamoli-disaster-could-happen-again/', type: 'article', source: 'WSL', description: 'Coverage of the Science paper on the 2021 Chamoli rock-ice avalanche. Simon Allen co-author.', year: 2021 },
  { title: 'The Global Distribution of Mountain Adaptation Projects', url: 'https://www.slideshare.net/weADAPT/the-global-distribution-of-mountain-adaptation-projects-by-simon-allen', type: 'presentation', source: 'SlideShare / weADAPT', description: 'Simon Allen\'s analysis of 400+ mountain adaptation projects funded between 2010–2019.', year: 2021 },
  // 2020
  { title: 'Adaptation at Altitude — Mountains at the Frontline of Climate Change', url: 'https://www.unep.org/regions/europe/our-projects/adaptation-altitude-mountains-frontline-climate-change', type: 'article', source: 'UNEP', description: 'UNEP programme page for Adaptation at Altitude.', year: 2020 },
  // 2010
  { title: 'BBC Scotland — Afghanistan Climbing Expedition', url: 'http://news.bbc.co.uk/2/hi/uk_news/scotland/8535351.stm', type: 'article', source: 'BBC News', description: 'Coverage of Joel Fiddes leading the first ascent of Koh-i-Beefy (5,410m) in the Hindu Kush.', year: 2010 },
]

const typeLabels: Record<string, string> = {
  video: 'Video',
  article: 'Article',
  presentation: 'Presentation',
  webinar: 'Webinar',
  website: 'Website',
}

const typeColors: Record<string, string> = {
  video: 'var(--unframer-mf-cyan, #35E4E4)',
  article: 'var(--unframer-accent-blue, #B9FFFF)',
  presentation: '#D5F0A3',
  webinar: '#a78bfa',
  website: '#fbbf24',
}

export default function Media() {
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
          <div style={{ paddingBottom: '40px' }}>
            <div className="max-w-[700px] flex flex-col gap-[24px]">
              <Label text="Media" />
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: '1.14rem',
                  lineHeight: '1.35em',
                  letterSpacing: '-0.03em',
                  color: 'var(--unframer-forrest)',
                }}
              >
                Videos, articles, presentations, and webinars featuring our work.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {media.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-[12px]"
                style={{
                  textDecoration: 'none',
                  padding: '20px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid var(--unframer-neutral-200, #e4e4e4)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--unframer-mf-cyan, #35E4E4)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(53, 228, 228, 0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--unframer-neutral-200, #e4e4e4)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-center gap-[8px]">
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '11px',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      padding: '3px 8px',
                      backgroundColor: typeColors[item.type] || '#e4e4e4',
                      color: 'var(--unframer-forrest)',
                    }}
                  >
                    {typeLabels[item.type]}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '11px',
                      color: 'var(--unframer-neutral-400)',
                    }}
                  >
                    {item.year}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      color: 'var(--unframer-neutral-400)',
                    }}
                  >
                    {item.source}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    lineHeight: '1.4em',
                    letterSpacing: '-0.03em',
                    fontWeight: 500,
                    color: 'var(--unframer-forrest)',
                  }}
                >
                  {item.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    lineHeight: '1.55em',
                    letterSpacing: '-0.03em',
                    color: 'var(--unframer-neutral-400)',
                  }}
                >
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}
