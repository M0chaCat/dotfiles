"use strict";(("undefined"!=typeof self?self:global).webpackChunkclient_web=("undefined"!=typeof self?self:global).webpackChunkclient_web||[]).push([[6080],{52633:(e,t,i)=>{i.d(t,{I:()=>o});var a=i(30758),r=i(60007),n=i(89494),s=i(49066),l=i(86070);const o=a.memo((function({uri:e,size:t=r.M.md,className:i,onClick:o,canDownload:c,condensedAll:d}){const[u,A]=(0,s.A)(e),h=(0,n.W)(),g=(0,a.useCallback)((()=>{h({targetUri:e,intent:u?"unsave":"save",type:"click"}),A(!u)}),[h,e,u,A]);return(0,l.jsx)(r.f,{className:i,isFollowing:u,onFollow:g,onClick:o,uri:e,size:t,canDownload:c,condensedAll:d,condensed:!0})}))},88815:(e,t,i)=>{i.d(t,{G:()=>s});var a=i(64721),r=i(84453),n=i(86070);function s({totalItems:e,containsTracks:t,containsEpisodes:i,containsAudiobooks:s}){if(0===e)return null;const l=i&&!s&&!t,o=s&&!t&&!i;let c;return c=t&&!i&&!s?a.Ru.get("tracklist-header.songs-counter",e):l?a.Ru.get("tracklist-header.episodes-counter",e):o?a.Ru.get("tracklist-header.audiobooks-counter",e):a.Ru.get("tracklist-header.items-counter",e),(0,n.jsx)(r.q,{children:c})}},37199:(e,t,i)=>{i.d(t,{k:()=>d});var a=i(30758),r=i(97500),n=i.n(r),s=i(96930),l=i(98643),o=i(98455),c=i(86070);const d=(0,a.memo)((function(e){const{breakpoint:t,className:i,showSeparator:a,isActive:r,...d}=e;return(0,c.jsx)(s.v,{className:n()(i,o.A.entityRow,{[o.A.separator]:a,[o.A.active]:r}),hoverBackgroundColor:"backgroundTintedHighlight",activeBackgroundColor:"backgroundTintedBase",layout:t===l.e.SMALL?"regular":"wide",hoverAnimationDuration:"0ms",horizontalGap:t===l.e.SMALL?"12px":"16px",paddingBlockStart:"12px",paddingBlockEnd:"12px",...d})}))},21426:(e,t,i)=>{i.d(t,{X:()=>l});var a=i(6128);const r="dK79XxAEu3SEKJ2jS_Qy",n="guiUbDD6Ga8Qpatq2jQ8";var s=i(86070);const l=({badges:e,children:t})=>(0,s.jsxs)("div",{className:r,children:[e,(0,s.jsx)(a.E,{variant:"bodySmall",className:n,children:t})]})},88826:(e,t,i)=>{i.d(t,{q:()=>n});var a=i(55530),r=i(86070);const n=e=>(0,r.jsx)(a.R,{size:"small",version:a.H.secondary,...e})},22073:(e,t,i)=>{i.d(t,{k:()=>l});var a=i(95763),r=i(32875),n=i(98455),s=i(86070);const l=({description:e,children:t})=>(0,s.jsxs)("div",{className:n.A.body,children:[e&&(0,s.jsx)(a.v,{lineClamp:2,as:"div",dir:"auto",children:(0,s.jsx)(r.q,{asTextContent:!0,html:e})}),t]})},42664:(e,t,i)=>{i.d(t,{F:()=>n});var a=i(98455),r=i(86070);const n=({actions:e,playButton:t})=>(0,r.jsxs)("div",{className:a.A.footer,children:[(0,r.jsx)("div",{className:a.A.actions,children:e}),t]})},99101:(e,t,i)=>{i.d(t,{e:()=>o});var a=i(98643),r=i(41861),n=i(2535),s=i(23340),l=i(86070);const o=({images:e,breakpoint:t,type:i,name:o})=>{const c=(0,s._)(),d=t===a.e.SMALL?n.Qe.SIZE_64:n.Qe.SIZE_112;return(0,l.jsx)(r.b,{fadeIn:!0,images:c(e,n.BZ[d]),shape:r.u.ROUNDED_CORNERS,size:d,iconSize:t===a.e.SMALL?"medium":"xlarge",type:i,title:o,loadingMode:"eager"})}},97267:(e,t,i)=>{i.d(t,{U:()=>s});var a=i(65583),r=i(98455),n=i(86070);const s=({children:e})=>(0,n.jsx)(a.d,{lineClamp:2,as:"div",dir:"auto",className:r.A.title,children:e})},1195:(e,t,i)=>{i.d(t,{Z:()=>h});var a=i(30758),r=i(1978),n=i(73762),s=i(6128),l=i(61214),o=i(64721),c=i(49066);const d="hOOwEKqNuXrNvOCB1SgZ",u="csEdkIN9z2LjJIuZraqz";var A=i(86070);const h=({uri:e})=>{const[t,i]=(0,c.A)(e),h=(0,r.Zp)(),g=(0,a.useCallback)((()=>{i(!1),h("/",{replace:!0})}),[h,i]);return(0,A.jsxs)("div",{className:d,children:[(0,A.jsx)(n.b,{size:"xxlarge"}),(0,A.jsxs)("div",{className:u,children:[(0,A.jsx)(s.E,{as:"p",variant:"titleSmall",children:o.Ru.get("forbidden-page.title")}),(0,A.jsx)(s.E,{as:"p",variant:"bodySmall",children:o.Ru.get("forbidden-page.description")})]}),t&&(0,A.jsx)(l.$,{colorSet:"invertedLight",onClick:g,children:o.Ru.get("remove_from_your_library")})]})}},32875:(e,t,i)=>{i.d(t,{q:()=>c});var a=i(30758),r=i(97500),n=i.n(r),s=i(75341),l=i(59459),o=i(86070);const c=a.memo(a.forwardRef((function({html:e,onTimeStampClick:t,enableTimestamps:i=!1,enableAutomaticLinkification:r=!1,semanticColor:c="textSubdued",className:d,asTextContent:u=!1},A){const h=(0,a.useMemo)((()=>(0,s.v)(e,t,i,c,r,u)),[i,r,e,t,c,u]);return(0,o.jsx)("div",{ref:A,className:n()(l.A.HTMLDescription,d),children:h})})))},75341:(e,t,i)=>{i.d(t,{v:()=>p});var a=i(30758),r=i(6936),n=i.n(r),s=i(6128);const l=/(\((?:[0-9]{1,3}:){1,2}[0-9]{2}\))/g;var o=i(55285),c=i(86070);const d=/((?:(?:https?:\/\/)|www\.)(?:(?:(?:[a-z\u00a1-\uffff0-9][-_]*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?:[/?#][^\s"]*)?)/gi,u=/^https?:\/\//;function A(e){return"string"==typeof e?(0,c.jsx)(c.Fragment,{children:e.split(d).map(((e,t)=>t%2?(0,c.jsx)(o.N,{to:`${u.test(e)?"":"https://"}${e}`,children:e},t):e))}):e}var h=i(47723),g=i(59459);const m=(e=(()=>{}),t,i,r)=>{let n=0;const l={_:(e,t,s)=>{const l=void 0===t?e:s;return(0,c.jsx)(a.Fragment,{children:i&&!r?A(l):l},"fragment"+n++)}};if(r)return l;return{...l,p:e=>(0,c.jsx)(s.E,{as:"p",variant:"bodyMedium",semanticColor:t,className:g.A.Paragraph,children:i?A(e.children):e.children}),a:t=>t.href?.startsWith("#t=")?(0,c.jsx)(h.D,{onClick:e,children:t.children}):t.href?(0,c.jsx)(o.N,{to:t.href,children:t.children}):(0,c.jsx)(c.Fragment,{children:t.children}),ul:e=>(0,c.jsx)("ul",{className:g.A.List,children:e.children}),ol:e=>(0,c.jsx)("ol",{className:g.A.List,children:e.children}),li:e=>(0,c.jsx)(s.E,{as:"li",variant:"bodyMedium",semanticColor:t,className:g.A.ListItem,children:i?A(e.children):e.children}),br:()=>(0,c.jsx)("br",{}),h1:e=>(0,c.jsx)(s.E,{as:"h1",variant:"bodyMediumBold",semanticColor:t,className:g.A.Heading,children:e.children}),h2:e=>(0,c.jsx)(s.E,{as:"h2",variant:"bodyMediumBold",semanticColor:t,className:g.A.Heading,children:e.children}),h3:e=>(0,c.jsx)(s.E,{as:"h3",variant:"bodyMediumBold",semanticColor:t,className:g.A.Heading,children:e.children}),h4:e=>(0,c.jsx)(s.E,{as:"h4",variant:"bodyMediumBold",semanticColor:t,className:g.A.Heading,children:e.children}),h5:e=>(0,c.jsx)(s.E,{as:"h5",variant:"bodyMediumBold",semanticColor:t,className:g.A.Heading,children:e.children}),h6:e=>(0,c.jsx)(s.E,{as:"h6",variant:"bodyMediumBold",semanticColor:t,className:g.A.Heading,children:e.children}),time:t=>(0,c.jsx)(h.D,{onClick:e,children:t.children})}},p=(e,t=(()=>{}),i=!1,a="textSubdued",r=!1,s=!1)=>{const o=i?e.split(l).map((e=>e.match(l)?`(<time>${e.replace("(","").replace(")","")}</time>)`:e)).join(""):e;let c;try{c=n()(o,{transform:m(t,a,r,s),dangerouslySetChildren:[]})}catch{c=e}return c}},37651:(e,t,i)=>{i.d(t,{x:()=>l});var a=i(45129),r=i(43494),n=i(86764),s=i(86070);const l=({gatedEntityRelations:e,isLocked:t})=>{if(!e)return!1;const i=e?.entitiesWithValueProps?.at(0),l=i?.valueProps.at(0)?.displayText,o=t?i?.summary?.forUserWithoutAccess:i?.summary?.forUserWithAccess;if(!l||!i)return null;const c=(0,s.jsx)(n.E,{icon:t?a.u:void 0,text:l});return o?(0,s.jsx)(r.Zp,{label:o,children:c}):c}},48253:(e,t,i)=>{i.d(t,{P:()=>u});var a=i(63166),r=i(37651),n=i(19412),s=i(71502),l=i(44632),o=i(91616),c=i(30057),d=i(86070);const u=({episode:e})=>{const t=(0,a.NC)(n.MCN,{loadingValue:!1}),{badges:i}=(0,c.b)((e=>"contentRating"in e)(e)?{contentRating:e?.contentRating?.label,isPaywalled:e.podcastSubscription?.isPaywalled}:{isExplicit:e?.isExplicit,isMOGEFRestricted:e?.is19PlusOnly,isPaywalled:e.podcastSubscription?.isPaywalled}),u=e.gatedEntityRelations&&e.gatedEntityRelations.entitiesWithValueProps.at(0),A=!(!u||u.uri===e.uri&&e.podcastSubscription?.isUserSubscribed);return(0,d.jsxs)(d.Fragment,{children:[i.explicit&&(0,d.jsx)(s.U,{}),t&&u?(0,d.jsx)(r.x,{gatedEntityRelations:e.gatedEntityRelations,isLocked:A}):i.paid&&(0,d.jsx)(l.y,{}),i.nineteen&&(0,d.jsx)(o.q,{size:16})]})}},89318:(e,t,i)=>{i.d(t,{P:()=>a.P});var a=i(48253)},7038:(e,t,i)=>{i.d(t,{_:()=>d});var a=i(30758),r=i(21743),n=i(97500),s=i.n(n);const l="eqw9lvuoZHrkWMTdyTpY",o="lb08f71wES9AQnKx6e0R";var c=i(86070);const d=a.memo((function(e){const{triggerOnInitialLoad:t=!1,onReachBottom:i,showScrollbar:n=!0,horizontalScroll:d=!1,className:u}=e,{ref:A,inView:h}=(0,r.Wx)({initialInView:t});return(0,a.useEffect)((()=>{h&&i&&i()}),[h,i]),(0,c.jsxs)("div",{className:s()({[o]:!n,[l]:d},u),"data-testid":"infinite-scroll-list",children:[e.children,(0,c.jsx)("div",{ref:A})]})}))},22590:(e,t,i)=>{i.d(t,{M:()=>c});var a=i(21743),r=i(30758);const n=[],s=(e,t)=>{const i=[];let a=e,r=t;for(;a>0;){const t=Math.ceil(a/r);i.push({first:e-a,nrItems:t}),a-=t,r--}return i};var l=i(86070);const o=e=>{const{itemsInNode:t,renderItem:i,renderPlaceholder:r,estimatedHeight:n,scrollNodeRef:c,nrRowsOverscan:d=10,nrInitialInView:u=0,firstIndex:A,heights:h,fanOut:g=2}=e,{ref:m,inView:p,entry:E}=(0,a.Wx)({root:c.current,rootMargin:d*n+"px 0px",initialInView:A<u}),x=`${A}-${t}`;h[x]??=n*t,E?.boundingClientRect?.height&&(h[x]=E.boundingClientRect.height);const y=h[x];return 0===t?null:p?1===t?(0,l.jsx)("div",{ref:m,role:"presentation",children:i(A,y)}):(0,l.jsx)("div",{ref:m,role:"presentation",children:s(t,g).map((({first:t,nrItems:i},a)=>(0,l.jsx)(o,{...e,itemsInNode:i,firstIndex:A+t},a)))}):(0,l.jsx)("div",{ref:m,role:"presentation",children:r(`${y}px`)})},c=e=>{const t=(e=>{const t=n.find((t=>t.key===e))?.heights||{},i=(0,r.useCallback)((t=>{if(!e)return;const i=n.findIndex((t=>t.key===e));-1===i?n.push({key:e,heights:t}):(n[i].heights=t,n.push(n.splice(i,1)[0])),n.length>10&&n.shift()}),[e]),a=(0,r.useRef)({...t});return(0,r.useEffect)((()=>()=>{i(a.current)}),[i]),a.current})(e.persistanceKey);return(0,l.jsx)(o,{...e,itemsInNode:e.totalCount,firstIndex:0,heights:t,nrInitialInView:e.nrInitialInView})}},16657:(e,t,i)=>{i.d(t,{u:()=>a});let a=function(e){return e.TITLE="title",e.SUBTITLE="subTitle",e}({})},98643:(e,t,i)=>{i.d(t,{$:()=>s,e:()=>n});var a=i(90861),r=i(90089);const n={SMALL:"small",LARGE:"large"},s=()=>(0,r.y)()===a.E.SMALL?"small":"large"},28981:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Kt});var a=i(30758),r=i(16348),n=i(63166),s=i(64721),l=i(23893),o=i(18212),c=i(30494),d=i(9498),u=i(86399),A=i(78358),h=i(35844),g=i(89865),m=i(61656),p=i(42074);let E=function(e){return e.SHOW_ALPHABETICAL="SHOW_ALPHABETICAL",e.BOOK_ALPHABETICAL="BOOK_ALPHABETICAL",e.EPISODE_ALPHABETICAL="EPISODE_ALPHABETICAL",e.PLAYLIST_ALPHABETICAL="PLAYLIST_ALPHABETICAL",e.ALBUM_ALPHABETICAL="ALBUM_ALPHABETICAL",e.ADDED_AT="ADDED_AT",e.CREATOR_NAME="CREATOR_NAME",e.CREATOR_NAME_ALPHABETICAL="CREATOR_NAME_ALPHABETICAL",e.ALBUM_CREATOR_NAME="ALBUM_CREATOR_NAME",e.RECENTLY_PLAYED="RECENTLY_PLAYED",e.MOST_RELEVANT="MOST_RELEVANT",e.CUSTOM_ORDER="CUSTOM_ORDER",e}({});const x={"show-alphabetical":E.SHOW_ALPHABETICAL,"book-alphabetical":E.BOOK_ALPHABETICAL,"episode-alphabetical":E.EPISODE_ALPHABETICAL,"playlist-alphabetical":E.PLAYLIST_ALPHABETICAL,"album-alphabetical":E.ALBUM_ALPHABETICAL,"recently-added":E.ADDED_AT,"creator-name":E.CREATOR_NAME,"creator-name-alphabetical":E.CREATOR_NAME_ALPHABETICAL,"album-creator-name":E.ALBUM_CREATOR_NAME,"recently-played":E.RECENTLY_PLAYED,"playlist-most-relevant":E.MOST_RELEVANT,"playlist-custom-order":E.CUSTOM_ORDER},y={[E.RECENTLY_PLAYED]:{key:"recently-played",get value(){return s.Ru.get("collection.sort.recently-played")}},[E.ADDED_AT]:{key:"recently-added",get value(){return s.Ru.get("collection.sort.recently-added")}},[E.SHOW_ALPHABETICAL]:{key:"show-alphabetical",get value(){return s.Ru.get("collection.sort.alphabetical")}},[E.BOOK_ALPHABETICAL]:{key:"book-alphabetical",get value(){return s.Ru.get("collection.sort.alphabetical")}},[E.EPISODE_ALPHABETICAL]:{key:"episode-alphabetical",get value(){return s.Ru.get("collection.sort.alphabetical")}},[E.PLAYLIST_ALPHABETICAL]:{key:"playlist-alphabetical",get value(){return s.Ru.get("collection.sort.alphabetical")}},[E.ALBUM_CREATOR_NAME]:{key:"album-creator-name",get value(){return s.Ru.get("collection.sort.creator")}},[E.CREATOR_NAME]:{key:"creator-name",get value(){return s.Ru.get("collection.sort.creator")}},[E.CREATOR_NAME_ALPHABETICAL]:{key:"creator-name-alphabetical",get value(){return s.Ru.get("collection.sort.alphabetical")}},[E.ALBUM_ALPHABETICAL]:{key:"album-alphabetical",get value(){return s.Ru.get("collection.sort.alphabetical")}},[E.MOST_RELEVANT]:{key:"playlist-most-relevant",get value(){return s.Ru.get("collection.sort.most-relevant")}},[E.CUSTOM_ORDER]:{key:"playlist-custom-order",get value(){return s.Ru.get("collection.sort.custom-order")}}};E.ADDED_AT,E.ALBUM_ALPHABETICAL,E.CREATOR_NAME,E.ADDED_AT,m.uY.ADDED_AT,m.xB.DESC,E.ALBUM_ALPHABETICAL,m.uY.NAME,m.xB.ASC,E.CREATOR_NAME,m.uY.ARTIST_NAME,m.xB.ASC;E.ADDED_AT,E.CREATOR_NAME_ALPHABETICAL,E.ADDED_AT,m.af.ADDED_AT,m.xB.DESC,E.CREATOR_NAME_ALPHABETICAL,m.af.NAME,m.xB.ASC;E.ADDED_AT,E.SHOW_ALPHABETICAL,E.ADDED_AT,m.WW.ADDED_AT,m.xB.DESC,E.SHOW_ALPHABETICAL,m.WW.NAME,m.xB.ASC;E.ADDED_AT,E.BOOK_ALPHABETICAL,E.ADDED_AT,m.Ev.ADDED_AT,E.BOOK_ALPHABETICAL,m.Ev.NAME;E.MOST_RELEVANT,E.RECENTLY_PLAYED,E.ADDED_AT,E.PLAYLIST_ALPHABETICAL,E.CUSTOM_ORDER,E.ADDED_AT,p.nw.ADDED_AT,p.xB.DESC,E.RECENTLY_PLAYED,p.nw.RECENTLY_PLAYED,p.xB.ASC,E.PLAYLIST_ALPHABETICAL,p.nw.NAME,p.xB.ASC,E.MOST_RELEVANT,p.nw.RELEVANCE,p.xB.DESC,E.CUSTOM_ORDER;E.ADDED_AT,E.ADDED_AT,E.ADDED_AT,E.MOST_RELEVANT,E.ADDED_AT;var C=i(86070);const L=e=>e===E.ADDED_AT?m.xB.DESC:m.xB.ASC,f={option:E.ADDED_AT,order:m.xB.DESC},b={[m.xB.ASC]:m.xB.DESC,[m.xB.DESC]:m.xB.ASC},T=(0,a.createContext)({setSortState:()=>{throw new Error("setSortState must be used within a LibrarySortProvider")},sortState:f}),P=a.memo((function({uri:e,children:t,defaultSortOption:i}){const a={option:i,order:L(i)};return(0,C.jsx)(h.E,{uri:e,defaultState:a,sortContext:T,children:t})}));var j=i(69319),S=i(16683),R=i(97152),_=i(29294),D=i(35067),v=i(11717),I=i(1335);const k=a.memo((function({sortOptions:e,onSort:t}){const{sortState:i,setSortState:r}=(0,a.useContext)(T),n=(0,a.useCallback)((e=>{const a=x[e];t?.(a),r(((e,t,i)=>t!==e?{option:e,order:L(e)}:{option:e,order:b[i]})(a,i.option,i.order))}),[t,r,i.option,i.order]),s=e.map((e=>y[e])),l=y[i.option];return(0,C.jsx)(I.g,{options:s,onSelect:n,selected:l,sortOrder:(o=i.order,o===m.xB.ASC?g.H.ASC:g.H.DESC)});var o}));var N=i(1620);const B="gWfUTJg52F5eTzM6M82w",O=a.memo((function({canSort:e,canFilter:t,filterPlaceholder:i,sortOptions:r}){const{spec:n,logger:s}=(0,N.r)(D.E,{}),l=(0,a.useCallback)((()=>{s.logInteraction(n.filterFieldFactory().keyStrokeFilter())}),[s,n]),o=(0,a.useCallback)((()=>{s.logInteraction(n.filterFieldFactory().hitClearFilter())}),[s,n]);return(0,C.jsxs)("div",{className:B,children:[t?(0,C.jsx)(a.Suspense,{fallback:null,children:(0,C.jsx)(v.S,{placeholder:i,onFilter:l,onClear:o})}):null,e?(0,C.jsx)(k,{sortOptions:r}):null]})}));var M=i(81719);const w={[m.ci.NAME]:u.lU.TITLE,[m.ci.SHOW_NAME]:u.lU.SHOW,[m.ci.ADDED_AT]:u.lU.ADDED_AT},H=[E.ADDED_AT,E.CREATOR_NAME,E.EPISODE_ALPHABETICAL],U={[E.ADDED_AT]:m.ci.ADDED_AT,[E.CREATOR_NAME]:m.ci.SHOW_NAME,[E.EPISODE_ALPHABETICAL]:m.ci.NAME};const F=(e,t)=>{if(function(e){return H.includes(e)}(e))return{field:U[e],order:t}},W=(e,t)=>{if(!H.includes(e))return;return(e=>{if(!e?.field)return;const t=w[e.field];if(!t)return;return u.SL[t].map((t=>e.order?`${t} ${e.order}`:t)).join(",")})(F(e,t))};var Y=i(49811),z=i(19412),V=i(39733),G=i(19240);const Q="wmGcau34_eXQOX37kUTc",$="Yxy9nPtcdgz7zbBsWVKg",K=({metadata:e,canSort:t,backgroundColor:i,isPlaying:a,isOnline:r,togglePlay:n})=>{const l=(0,V.f)(),{uri:o,name:c}=e,d=e.totalLength>0,u=(0,Y.j)();return(0,C.jsx)(j.E,{backgroundColor:i,children:(0,C.jsxs)(S.S,{children:[d&&(0,C.jsx)(_.D,{onClick:()=>n(),isPlaying:a,size:u,uri:o,disabled:!r,ariaPlayLabel:s.Ru.get("playlist.a11y.play",c),ariaPauseLabel:s.Ru.get("playlist.a11y.pause",c)}),t&&(0,C.jsx)("div",{className:$,children:(0,C.jsx)(R.u,{property:z.ucV,renderNewExperience:()=>(0,C.jsx)(M.d,{sortOptions:[G.nw.TITLE,G.nw.ADDED_AT,G.nw.PUBLISH_DATE,G.nw.SHOW_NAME],defaultSortField:G.nw.ADDED_AT,filterPlaceholder:s.Ru.get("playlist.search_in_playlist")}),renderOldExperience:()=>(0,C.jsx)(O,{canSort:l.getCapabilities().canSort,canFilter:l.getCapabilities().canFilter,filterPlaceholder:s.Ru.get("playlist.search_in_playlist"),sortOptions:H})})})]})})};var X=i(13377),q=i(48732),Z=i(68371),J=i(42514),ee=i(30860),te=i(89318),ie=i(92057),ae=i(89494),re=i(46832),ne=i(83989),se=i(95309),le=i(90089),oe=i(49066),ce=i(88417),de=i(40564),ue=i(24902),Ae=i(8652);const he="sxxBMk7G1OGo4uYIgPdQ",ge="wpP88qSwGpDQbc_ogyXW",me={small:64,standard:300,large:640,xlarge:1024},pe=a.memo((function({index:e,contextUri:t,episode:i,onRemove:r,usePlayContextItem:n}){const s=(0,a.useRef)(i.duration.milliseconds-i.playedState.timeLeft.milliseconds),l=i.uri,[o,c]=(0,a.useState)(i.playedState.state===Ae.M.Completed),{filter:d}=(0,a.useContext)(A.g),{draggable:u,onDragStart:h}=(0,ie.P)(),g=(0,le.y)(),m=(0,ae.W)(),[p]=(0,oe.A)(l,!0),{isPlayable:E}=(0,re.g)(i.uri,{isPlayable:i.isPlayable}),x=(0,ne.n)(),{isPlaying:y,isActive:L,togglePlay:f}=n({uri:l,index:e}),[b]=(0,de.S)(1e4,(e=>e?.item?.uri===l));(0,a.useEffect)((()=>{y&&(s.current=b)}),[y,b]);const{isPlaying:T,isActive:P,togglePlay:j}=(0,ce.P)({uri:l,pages:[{items:[{type:ue.c.EPISODE,uri:l,uid:null,provider:null}]}]},{featureIdentifier:"your_library",referrerIdentifier:"your_library"});(0,a.useEffect)((()=>{p||r()}),[p,r]),(0,a.useEffect)((()=>{y||i.duration.milliseconds<=s.current&&c(!0)}),[y,i.duration.milliseconds]);const S=(0,a.useCallback)((e=>{e||(s.current=0),c(e)}),[]),R=(0,a.useCallback)((e=>{if(e.target!==e.currentTarget)return;let a=`${i.name}`;i.show?.name&&(a+=` • ${i.show.name}`),h(e,{itemUris:[l],dragLabelText:a,contextUri:t})}),[t,i.name,i.show?.name,l,h]),_=(0,a.useCallback)((()=>{m({type:"click",targetUri:l,intent:"navigate"})}),[l,m]),D=(0,a.useCallback)((()=>{x?(m({type:"click",intent:y?"pause":"play"}),f()):(m({type:"click",intent:T?"pause":"play"}),j())}),[x,y,T,m,f,j]),v=(0,a.useCallback)((e=>(0,C.jsx)(J.M,{searchWords:[d],textToHighlight:e})),[d]),I=i.podcastSubscription?.isPaywalled??!1,k=i.podcastSubscription?.isUserSubscribed??!1;let N=!1;return(L||!x&&P)&&(N=!0),p?(0,C.jsxs)(se.pZ,{value:"row",index:e,children:[(0,C.jsx)("hr",{className:he,"aria-hidden":!0}),(0,C.jsx)(X.h,{menu:(0,C.jsx)(q.b,{uri:l,contextUri:t,showUri:i.show?.uri,isPlayed:o,onMarkAsPlayed:S}),children:(0,C.jsx)(Z.k,{requestId:i.requestId,index:e,uri:l,uid:l,size:g,images:i.images.map((e=>({url:e.url,width:e.width||(e.label?me[e.label]:null),height:e.height||(e.label?me[e.label]:null)}))),isPaywalled:I,isUserSubscribed:k,name:i.name,highlightText:v,showName:i.show?.name,showUri:i.show?.uri,description:i.description,isPlayable:E,fullyPlayed:o,durationMs:i.duration.milliseconds,releaseDate:i.release.date||"",resumePositionMs:s.current,draggable:u,handleDragStart:R,handlePlaybackClick:D,handleClick:_,isCurrentlyPlaying:N,isPlaying:x?y:T,position:N?b:void 0,episodeSharingInfo:null,onMarkAsPlayed:S,badges:(0,C.jsx)(te.P,{episode:i}),playButtonWrapper:e=>(0,C.jsx)(ee.N,{enabled:I&&!k,showUri:i.show?.uri||void 0,renderInline:!1,children:e})})})]}):null}));var Ee=i(7038),xe=i(90861),ye=i(20520);const Ce=a.memo((function({contextUri:e,usePlayContextItem:t}){const i=(0,V.f)(),{sortState:r}=(0,a.useContext)(T),[n,s]=(0,a.useState)({totalLength:0,unfilteredTotalLength:0,offset:0,items:[],limit:50}),l=(0,a.useRef)(!1),o=(0,a.useRef)(0),c=(0,a.useRef)(0),{filter:d}=(0,a.useContext)(A.g),u=(0,a.useCallback)((()=>{c.current++}),[]),{ref:h,breakpoint:g}=(0,ye.x)({[xe.E.MEDIUM]:0,[xe.E.LARGE]:600}),m=(0,a.useCallback)(((e=!1)=>{const t=o.current;null!==t&&(l.current||(l.current=!0,(async e=>{const t=await i.getEpisodes({offset:Math.max(0,e-c.current),limit:50,sort:F(r.option,r.order),filter:d});return c.current=0,t})(Number(t)).then((i=>{s((a=>{const r=Number(i.offset)+i.items.length,n=e?[]:[...a.items];return n.splice(Number(t),i.items.length,...i.items),o.current=r<i.totalLength?r:null,{...i,items:n}})),l.current=!1}))))}),[d,i,r]);return(0,a.useEffect)((()=>{o.current=0,m(!0)}),[m]),(0,C.jsx)(le.o.Provider,{value:g,children:(0,C.jsx)(se.pZ,{value:"track-list",children:(0,C.jsx)("div",{ref:h,children:(0,C.jsx)(Ee._,{onReachBottom:m,triggerOnInitialLoad:!0,children:n.items.map(((i,a)=>(0,C.jsx)("div",{className:ge,children:(0,C.jsx)(pe,{index:a,episode:i,contextUri:e,onRemove:u,usePlayContextItem:t},`${i.uri}/${a}`)},`${a}${i.uri}`)))})})})})}));var Le=i(6128),fe=i(87244),be=i(76418),Te=i(29080),Pe=i(7777),je=i(98991),Se=i(65866),Re=i(9756),_e=i(88815),De=i(771),ve=i(17067),Ie=i(43156),ke=i(41861);const Ne=({metadata:e,backgroundColor:t,isPlaying:i,isOnline:r,togglePlay:n})=>{const{uri:l,name:o,images:c,totalLength:d,owner:u}=e,A=(0,a.useMemo)((()=>({id:u.username,uri:u.uri,name:u.username,displayName:u.displayName||void 0,images:u.images||[]})),[u]);return(0,C.jsxs)(fe.z,{backgroundColor:t,children:[(0,C.jsxs)(Pe.h,{children:[(0,C.jsx)(_.D,{size:"medium",onClick:()=>n(),isPlaying:i,uri:l,disabled:!r,ariaPlayLabel:s.Ru.get("playlist.a11y.play",o),ariaPauseLabel:s.Ru.get("playlist.a11y.pause",o)}),(0,C.jsx)(je.X,{text:o})]}),(0,C.jsx)(be.K,{images:c,name:o,shape:ke.u.ROUNDED_CORNERS,renderImage:()=>(0,C.jsx)(Ie.b,{})}),(0,C.jsxs)(Te.Y,{children:[(0,C.jsx)(Le.E,{variant:"bodySmallBold",children:s.Ru.get("playlist")}),(0,C.jsx)(ve.mm,{canEdit:!1,onClick:()=>{},children:o}),(0,C.jsxs)(Se.X,{children:[(0,C.jsx)(Re.j,{creators:[A]}),(0,C.jsx)(De.J,{}),(0,C.jsx)(_e.G,{totalItems:d,containsEpisodes:!0})]})]})]})};var Be=i(95440),Oe=i(75627),Me=i(75308),we=i(96613),He=i(7619);const Ue={get[G.YB.AVAILABLE_OFFLINE](){return s.Ru.get("download.available-offline")},get[G.YB.UNPLAYED](){return s.Ru.get("shows.filter.unplayed")},get[G.YB.IN_PROGRESS](){return s.Ru.get("shows.filter.in-progress")}};var Fe=i(43915);const We=({filterPredicates:e,className:t})=>{const{canFilter:i}=(0,Fe.m)().getCapabilities(),{filterPredicate:a,setFilterPredicate:r}=(0,He.jP)();return i?a?(0,C.jsxs)("div",{className:t,children:[(0,C.jsx)(Me.m,{onClick:()=>r(null),"aria-label":s.Ru.get("web-player.your-library-x.clear_filters")}),(0,C.jsx)(we.v,{onClick:()=>r(null),selected:!0,selectedColorSet:"invertedLight",children:Ue[a]},a)]}):(0,C.jsx)("div",{className:t,children:e.map((e=>(0,C.jsx)(we.v,{onClick:()=>r(a?null:e),selected:a===e,selectedColorSet:"invertedLight",children:Ue[e]},e)))}):null};var Ye=i(19486),ze=i(60815),Ve=i(97500),Ge=i.n(Ve),Qe=i(1978),$e=i(91825),Ke=i(60278),Xe=i(66810),qe=i(52633),Ze=i(49740),Je=i(8541),et=i(44979),tt=i(1467),it=i(21426),at=i(88826),rt=i(37199);var nt=i(22073),st=i(42664),lt=i(99101),ot=i(97267),ct=i(16657),dt=i(98643),ut=i(55285),At=i(13117),ht=i(84889),gt=i(39235),mt=i(25336),pt=i(73927),Et=i(22727),xt=i(56106),yt=i(63112),Ct=i(11716),Lt=i(37659),ft=i(98455);const bt=(0,a.memo)((function({episode:e,contextUri:t,usePlayContextItem:i,index:r,sharingInfo:n,uid:l,showSeparator:o=!1,highlightText:c=(e=>e),...d}){const{name:u,description:A,show:h,type:g,uri:m,duration:p,mediaType:E,release:x,images:y}=e,L=(0,Ct.s)(),{spec:f}=(0,N.r)(Ke.m,{data:{position:r,uri:m}}),b=h?.name,T=h?.uri,P=(0,Oe.o_h)(T)?.toURLPath(!0),j=e.podcastSubscription?.isPaywalled??!1,S=e.podcastSubscription?.isUserSubscribed??!1,R=j&&!S,_=E?.includes(Ae.C.Video)??!1,D=(0,Qe.Zp)(),v=(0,Oe.o_h)(m).toURLPath(!0),I=(0,dt.$)(),[k,B]=(0,oe.A)(m),O=(0,Et.T)(m),{isPlaying:M,isActive:w,togglePlay:H}=i({uri:m,index:r}),U=I===dt.e.SMALL?"small":"medium",{resumePositionMs:F,onToggleMarkAsPlayed:W,isFullyPlayed:Y}=((e,t)=>{const{uri:i,duration:r,playedState:n}=e,s=(0,a.useRef)(r.milliseconds-n.timeLeft.milliseconds),[l,o]=(0,a.useState)(n.state===Ae.M.Completed),[c]=(0,de.S)(1e4,(e=>e?.item?.uri===i)),d=(0,a.useCallback)((e=>{e||(s.current=0),o(e)}),[]);return(0,a.useEffect)((()=>{t&&(s.current=c)}),[t,c]),{resumePositionMs:s.current,isFullyPlayed:l,onToggleMarkAsPlayed:d}})(e,M),z=[u,...b?[b]:[]].join(" • "),{draggable:V,onDragStart:G}=(0,ie.P)({itemUris:[m],dragLabelText:z}),Q=(0,gt.v)(m),$=(0,a.useCallback)((e=>{if(e.stopPropagation(),R)L.logInteraction(f.playButtonFactory().hitShowPaywall({paywalledItem:m}));else{const e=(0,mt.$I)({isPlaying:M,isActive:w,spec:f.playButtonFactory(),logger:L,uri:m});H({loggingParams:e})}}),[w,M,L,f,H,R,m]),K=(0,C.jsx)(ot.U,{children:c(u,ct.u.TITLE)}),Z=(0,C.jsx)(nt.k,{description:A,children:(0,C.jsx)(it.X,{badges:(0,C.jsx)(te.P,{episode:e}),children:p.milliseconds&&(0,C.jsx)(Lt.j,{isPlaying:!1,fullyPlayed:Y,durationMs:p.milliseconds,position:F,releaseDate:x.date})})}),J=(0,C.jsx)(q.b,{uri:m,uid:l,contextUri:t,showUri:T,isPlayed:Y,onMarkAsPlayed:W}),ae=(0,C.jsx)(Xe.M,{className:Ge()({[ft.A.visibleAction]:k}),isAdded:k,onClick:()=>{B(!k)},size:U,isEpisode:!0,condensedAll:!0}),re=(0,C.jsx)(ht.g,{size:U,uri:m}),ne=(0,C.jsxs)(C.Fragment,{children:[Q?re:ae,(0,C.jsx)(qe.I,{className:Ge()({[ft.A.visibleAction]:(0,pt.X)(O)}),uri:m,size:U,canDownload:!j||j&&S,onClick:(e,t)=>{t===xt.NV.ADD&&L.logInteraction(f.downloadButtonFactory().hitDownload({itemToDownload:m}))},condensedAll:!0}),(0,C.jsx)(Je.w,{uri:m,sharingInfo:n??null,interactionData:{intent:"share",type:"click"},size:U,onClick:()=>{L.logInteraction(f.shareButtonFactory().hitShare({entityToBeShared:m,shareId:n?.shareId??""}))},condensedAll:!0}),(0,C.jsx)(et.b,{menu:J,children:(0,C.jsx)(Ze.e,{label:s.Ru.get("more.label.context",u),size:U,onClick:()=>{L.logInteraction(f.contextMenuButtonFactory().hitUiReveal())},condensedAll:!0})})]}),se=(0,C.jsx)(st.F,{actions:ne,playButton:(0,C.jsx)(ee.N,{enabled:j&&!S,showUri:T||void 0,children:(0,C.jsx)(at.q,{onClick:$,isPlaying:M,ariaPlayLabel:s.Ru.get("tracklist.a11y.play",u,b),ariaPauseLabel:s.Ru.get("tracklist.a11y.pause",u,b),locked:R})})}),le=(0,C.jsx)(lt.e,{images:y,name:u,type:g,breakpoint:I}),ce=(0,C.jsxs)($e.j,{lineClamp:2,children:[_&&(0,C.jsx)(At.T,{}),b&&P&&(0,C.jsx)(X.h,{menu:(0,C.jsx)(tt.H,{uri:T??""}),onShow:()=>{L.logInteraction(f.podcastLinkFactory().secondaryHitUiReveal())},children:(0,C.jsx)(ut.N,{to:P,onClick:()=>{L.logInteraction(f.podcastLinkFactory().hitUiNavigate({destination:P}))},children:(0,C.jsx)(Le.E,{variant:"bodySmall",semanticColor:"textSubdued",children:c(b,ct.u.SUBTITLE)})})})]});return(0,C.jsx)(yt.r,{spec:f,children:(0,C.jsx)(X.h,{menu:J,onShow:()=>{L.logInteraction(f.secondaryHitUiReveal())},children:(0,C.jsx)(rt.k,{draggable:V,onDragStart:G,breakpoint:I,id:`book-${m}`,media:le,title:K,body:Z,subtitle:ce,footer:se,isActive:w,onClick:()=>{D(v)},showSeparator:o,...d})})})}));var Tt=i(34002),Pt=i(36667),jt=i(64497),St=i(22590),Rt=i(65234),_t=i(1476);const Dt=({renderItem:e})=>{const t=(0,Rt.v7)(),{getItem:i,nrValidItems:r,invalidateCache:n}=(0,jt.K_)(),{playlist:{metadata:s}}=(0,Pt.gU)();(0,_t.H)(s.uri,n);const l=(0,a.useCallback)((e=>(0,C.jsx)("div",{style:{height:e}})),[]),o=(0,a.useCallback)(((t,a)=>{const r=i(t);return r?e(r,t):l(`${a}px`)}),[i,e,l]),c="POP"===(0,Qe.wQ)()?0:10;return(0,C.jsx)(Tt.R,{firstInteractiveIsWrapper:!0,"aria-rowcount":r,"aria-colcount":6,children:(0,C.jsx)(St.M,{totalCount:r,estimatedHeight:200,renderItem:o,renderPlaceholder:l,scrollNodeRef:t,nrRowsOverscan:10,persistanceKey:s.uri,nrInitialInView:c})})};var vt=i(13563);const It=({children:e,index:t})=>(0,C.jsx)(vt.W,{"aria-posinset":t,children:e});var kt=i(44984);const Nt=(0,a.memo)((function({usePlayContextItem:e,contextUri:t}){const{contentsOptions:{filter:i}}=(0,Ye.g)(),r=(0,a.useCallback)(((e,t)=>"string"!=typeof i?e:t===ct.u.TITLE||t===ct.u.SUBTITLE?(0,C.jsx)(J.M,{searchWords:[i],textToHighlight:e}):e),[i]),n=(0,a.useCallback)(((i,a)=>(0,kt.xp)(i)?(0,C.jsx)(It,{index:a,children:(0,C.jsx)(bt,{index:a,episode:i,contextUri:t,usePlayContextItem:e,showSeparator:0!==a,highlightText:r})},`${i.uri}/${a}`):null),[t,r,e]);return(0,C.jsx)(Dt,{renderItem:n})}));function Bt(e){return{url:e.url,width:e.width,height:e.height}}var Ot=i(8476),Mt=i(95052),wt=i(66679),Ht=i(84058),Ut=i(50885);const Ft="zX8QX7OLPnU9eLrJV3Cd",Wt="hILz7Al7z5E0yyQdBo_K",Yt=()=>{const e=(0,Ot.z)("#006450"),t=(0,ne.n)(),{user:i}=(0,Be.d4)(Mt.Ht),n=(0,Fe.m)(),{canSort:l,canFilter:d}=n.getCapabilities(),{playlist:{metadata:u},contentsOptions:A}=(0,Ye.g)(),h=(0,a.useMemo)((()=>{const e=(e=>({type:ue.c.USER,uri:e?.uri??"",username:e?.id??"",displayName:e?.display_name??null,images:e?.images?.map(Bt)??[]}))(i);return{...u,owner:e,name:s.Ru.get("sidebar.your_episodes")}}),[u,i]),{isPlaying:g,togglePlay:m,usePlayContextItem:p}=(0,ce.P)((0,Ut.A)(h.uri,A),{featureIdentifier:"your_library",referrerIdentifier:"your_library"},{shuffle:!1,repeat:Ht.p.REPEAT_NONE}),E=i?(0,Oe.fHB)(i.id,"your-episodes").toURI():"";return(0,C.jsxs)("section",{className:Ft,"data-testid":"your-episodes-page",children:[(0,C.jsx)(o.Q,{children:s.Ru.get("sidebar.your_episodes")}),(0,C.jsx)(Ne,{metadata:h,backgroundColor:e,isPlaying:g,isOnline:t,togglePlay:m}),(0,C.jsxs)("div",{children:[(0,C.jsx)(K,{metadata:h,backgroundColor:e,isPlaying:g,isOnline:t,togglePlay:m,canSort:l||d}),(0,C.jsxs)("div",{className:"contentSpacing",children:[(0,C.jsx)(We,{className:Wt,filterPredicates:[G.YB.UNPLAYED,G.YB.AVAILABLE_OFFLINE,G.YB.IN_PROGRESS]}),h.totalLength>0?(0,C.jsx)(Nt,{usePlayContextItem:p,contextUri:E}):(0,C.jsx)(c.p,{message:s.Ru.get("collection.empty-page.episodes-subtitle"),title:s.Ru.get("collection.empty-page.episodes-title"),linkTo:"/genre/podcasts-web",linkTitle:s.Ru.get("collection.empty-page.shows-cta"),renderInline:!0,children:(0,C.jsx)(r.P,{"aria-hidden":"true"})})]})]})]})},zt=(0,a.memo)((function(){return(0,C.jsx)(ze.W,{uri:wt.H3,children:(0,C.jsx)(Yt,{})})}));var Vt=i(40610),Gt=i(18032);const Qt=({metadata:e,canSort:t})=>{const i=(0,Ot.z)("#006450"),n=(0,ne.n)(),{sortState:d}=(0,a.useContext)(T),{filter:h}=(0,a.useContext)(A.g),{isPlaying:g,togglePlay:m,usePlayContextItem:p}=(0,ce.P)({uri:e.uri,metadata:{[Gt.W.SORTING_CRITERIA]:W(d.option,d.order),[Gt.W.FILTERING_PREDICATE]:(0,u.ly)(h)}},{featureIdentifier:"your_library",referrerIdentifier:"your_library"},{shuffle:!1,repeat:Ht.p.REPEAT_NONE});return(0,C.jsxs)("section",{className:Q,"data-testid":"your-episodes-page",children:[(0,C.jsx)(o.Q,{children:s.Ru.get("sidebar.your_episodes")}),(0,C.jsx)(Ne,{metadata:e,backgroundColor:i,isPlaying:g,isOnline:n,togglePlay:m}),(0,C.jsxs)("div",{children:[(0,C.jsx)(K,{metadata:e,backgroundColor:i,isPlaying:g,isOnline:n,togglePlay:m,canSort:t}),(0,C.jsx)("div",{className:"contentSpacing",children:e.totalLength>0?(0,C.jsx)(Ce,{contextUri:e.uri,usePlayContextItem:p}):(0,C.jsx)(c.p,{message:s.Ru.get("collection.empty-page.episodes-subtitle"),title:s.Ru.get("collection.empty-page.episodes-title"),linkTo:"/genre/podcasts-web",linkTitle:s.Ru.get("collection.empty-page.shows-cta"),renderInline:!0,children:(0,C.jsx)(l.v,{href:"/genre/podcasts-web",children:(0,C.jsx)(r.P,{"aria-hidden":"true","aria-label":s.Ru.get("collection.empty-page.episodes-title")})})})})]})]})},$t=(0,a.memo)((function(){const e=(0,V.f)().getCapabilities(),t=(0,Vt.u)();return t?(0,C.jsx)(P,{uri:t.uri,defaultSortOption:E.ADDED_AT,children:(0,C.jsx)(A.s,{uri:t.uri,children:(0,C.jsx)(Qt,{metadata:t,canSort:e.canSortTracksAndEpisodes&&t.totalLength>0})})}):(0,C.jsx)(d.LoadingPage,{hasError:!1,errorMessage:s.Ru.get("error.not_found.title.page"),loadOffline:e.canModifyOffline})})),Kt=(0,a.memo)((function(){return(0,n.NC)(z.ucV)?(0,C.jsx)(zt,{}):(0,C.jsx)($t,{})}))},50885:(e,t,i)=>{function a(e,t){return{uri:e,playlistQueryOptions:t}}i.d(t,{A:()=>a})},98455:(e,t,i)=>{i.d(t,{A:()=>a});const a={entityRow:"ci11tAmTK1LnxThQkXPy",actions:"_2sJPwAAp1wY1Ftke6iFe",visibleAction:"yuNzasMLs7hvemHI4d8Q",active:"dNymWGRudMrTI6ot9FBg",title:"luWcW9hkbLdFxRQB0yGb",body:"abYR6tZoE7BdzThmWTb0",footer:"GOcKQxqNMhGzbGiAXBig",separator:"yFQjuDAhri_egM1pwn70"}},59459:(e,t,i)=>{i.d(t,{A:()=>a});const a={Heading:"playlist-playlist-heading",HTMLDescription:"playlist-playlist-playlistDescription",List:"playlist-playlist-list",ListItem:"playlist-playlist-listItem",Paragraph:"playlist-playlist-paragraph"}}}]);
//# sourceMappingURL=xpui-routes-collection-episodes.js.map