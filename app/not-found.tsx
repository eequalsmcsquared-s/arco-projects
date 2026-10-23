import {getSite} from '@/lib/content';
export default async function NotFound(){const {settings:s}=await getSite();return <main className="error-page"><a className="wordmark" href="/">{s.title}</a><p className="eyebrow">404</p><h1>{s.ui.notFoundTitle}</h1><p>{s.ui.notFoundDescription}</p><a className="button" href="/">{s.ui.home} <span aria-hidden="true">↗</span></a></main>}
