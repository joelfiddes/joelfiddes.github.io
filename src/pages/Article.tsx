import { useParams, Link } from 'react-router-dom'
import Label from '../components/Label'
import SectionContactFramerComponent from '../framer/section-contact'
import news from '../data/news.json'
import nepalStorm from '../content/news/nepal-storm.html?raw'

// Articles written by Mountain Futures, as opposed to the link-out items that
// make up most of the news list. Keyed by the `slug` field in news.json.
const BODIES: Record<string, string> = {
  'nepal-storm-september-2026': nepalStorm,
}

type Item = { title: string; date: string; summary: string; tags: string[]; slug?: string; link?: string }

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function Article() {
  const { slug } = useParams()
  const item = (news as Item[]).find(n => n.slug === slug)
  const body = slug ? BODIES[slug] : undefined

  if (!item || !body) {
    return (
      <section
        className="w-full flex flex-col items-center"
        style={{ padding: '200px 16px 120px 16px' }}
      >
        <div className="w-full max-w-[720px] flex flex-col gap-[16px]">
          <Label text="News" />
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', letterSpacing: '-0.03em', color: 'var(--unframer-forrest)' }}>
            Article not found
          </h1>
          <Link to="/news" style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#0E7A7A' }}>
            ← All news
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <style>{ARTICLE_CSS}</style>
      <section
        className="w-full flex flex-col items-center"
        style={{
          backgroundImage: 'url(/images/contour-lines.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '160px 16px 80px 16px',
        }}
      >
        <div className="w-full max-w-[760px]">
          <Link to="/news" className="article-back">← All news</Link>

          <div className="flex flex-col gap-[16px]" style={{ paddingBottom: '32px' }}>
            <Label text="News" />
            <h1 className="article-title">{item.title}</h1>
            <div className="article-meta">
              <span>{formatDate(item.date)}</span>
              <span className="article-tags">
                {item.tags.map((t, i) => <span key={i} className="article-tag">{t}</span>)}
              </span>
            </div>
          </div>

          <div className="article-body" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </section>

      <SectionContactFramerComponent.Responsive style={{ width: '100%' }} />
    </>
  )
}

const ARTICLE_CSS = `
.article-back{font-family:'DM Mono',monospace;font-size:12px;letter-spacing:-0.02em;
  color:var(--unframer-neutral-400);text-decoration:none;display:inline-block;margin-bottom:28px}
.article-back:hover{color:#0E7A7A}
.article-title{font-family:'Inter',sans-serif;font-size:clamp(28px,4.2vw,42px);line-height:1.12em;
  letter-spacing:-0.035em;font-weight:500;color:var(--unframer-forrest);max-width:22ch}
.article-meta{display:flex;gap:16px;align-items:center;flex-wrap:wrap;
  font-family:'DM Mono',monospace;font-weight:300;font-size:12px;letter-spacing:-0.02em;
  color:var(--unframer-neutral-400)}
.article-tags{display:flex;gap:6px;flex-wrap:wrap}
.article-tag{font-family:'DM Mono',monospace;font-weight:300;font-size:10px;letter-spacing:-0.02em;
  color:var(--unframer-forrest);background:var(--unframer-accent-blue);padding:2px 8px;border-radius:2px}

.article-body{font-family:'Inter',sans-serif;font-size:15px;line-height:1.68em;
  letter-spacing:-0.015em;color:var(--unframer-forrest)}
.article-body p{margin:0 0 18px}
.article-body .lead{font-family:'Geist',sans-serif;font-size:1.12rem;line-height:1.45em;
  letter-spacing:-0.03em;margin-bottom:32px}
.article-body h2{font-family:'Inter',sans-serif;font-size:20px;line-height:1.3em;
  letter-spacing:-0.03em;font-weight:500;margin:44px 0 14px}
/* The project defines no mf-cyan variable, and the brand cyan #35E4E4 sits at
   1.4:1 on the #F5F5F5 ground. This is that hue taken down to 4.7:1. */
.article-body a{color:#0E7A7A;text-decoration:underline;text-underline-offset:2px;
  text-decoration-thickness:1px;text-decoration-color:rgba(14,122,122,.4)}
.article-body a:hover{text-decoration-color:#0E7A7A}

.article-body .figs{display:grid;gap:1px;background:var(--unframer-neutral-300);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));margin:0 0 36px;
  border:1px solid var(--unframer-neutral-300)}
.article-body .fig-box{background:var(--unframer-neutral-100);padding:16px 16px 14px;
  display:flex;flex-direction:column}
.article-body .fig-v{font-family:'Inter',sans-serif;font-size:30px;line-height:1.05;
  letter-spacing:-0.04em;font-weight:500;color:var(--unframer-forrest)}
.article-body .fig-v i{font-style:normal;font-size:0.48em;color:var(--unframer-neutral-400);
  margin-left:3px}
.article-body .fig-k{font-family:'DM Mono',monospace;font-weight:300;font-size:10px;
  letter-spacing:-0.01em;text-transform:uppercase;color:var(--unframer-neutral-400);margin:10px 0 3px}
.article-body .fig-d{font-size:12.5px;line-height:1.45em;color:var(--unframer-forrest)}

.article-body figure{margin:28px 0 32px}
.article-body figure img{width:100%;height:auto;display:block;
  border:1px solid var(--unframer-neutral-300)}
.article-body figure.narrow img{max-width:420px}
.article-body .pair{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.article-body figcaption{font-family:'DM Mono',monospace;font-weight:300;font-size:11px;
  line-height:1.5em;letter-spacing:-0.01em;color:var(--unframer-neutral-400);margin-top:10px}

.article-body .tablewrap{overflow-x:auto;margin:0 0 22px}
.article-body table{width:100%;border-collapse:collapse;font-size:13.5px}
.article-body th,.article-body td{text-align:left;padding:9px 14px 9px 0;
  border-bottom:1px solid var(--unframer-grey)}
.article-body th{font-family:'DM Mono',monospace;font-weight:300;font-size:10px;
  text-transform:uppercase;letter-spacing:-0.01em;color:var(--unframer-neutral-400)}
.article-body td.n,.article-body th.n{text-align:right;padding-right:0;
  font-variant-numeric:tabular-nums}
.article-body tr.hl td{font-weight:500}

.article-body .caveat{background:var(--unframer-mf-light-grey);padding:22px 24px;margin:36px 0 24px}
.article-body .caveat h3{font-family:'DM Mono',monospace;font-weight:300;font-size:11px;
  text-transform:uppercase;letter-spacing:0.02em;color:var(--unframer-forrest);margin:0 0 12px}
.article-body .caveat ul{margin:0;padding-left:18px}
.article-body .caveat li{font-size:13px;line-height:1.55em;margin-bottom:8px;
  color:var(--unframer-forrest)}
.article-body .outro{font-size:13.5px;color:var(--unframer-neutral-400);margin-top:28px}
`
