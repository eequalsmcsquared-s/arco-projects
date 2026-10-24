type IconName='arrow'|'down'|'menu'|'close'|'plus';
const paths:Record<IconName,string>={arrow:'M5 19 19 5M5 5h14v14',down:'M12 4v16M5 13l7 7 7-7',menu:'M4 6h16M4 12h16M4 18h16',close:'m6 6 12 12M6 18 18 6',plus:'M12 5v14M5 12h14'};
export default function Icon({name='arrow'}:{name?:IconName}){return <svg className="ui-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]}/></svg>}
