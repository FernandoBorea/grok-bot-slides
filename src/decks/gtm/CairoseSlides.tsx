import type { ReactNode } from "react";
import { Bot } from "../../components/Bot";
import "./gtm.css";

const bot = { seed: 140, shape: "flower", color: "#ff2c9c" } as const;
function Frame({ n, label, children, className = "" }: { n: number; label: string; children: ReactNode; className?: string }) {
  return <section className={`slide-canvas gtm-pitch ${className}`}>
    <div className="slide-eyebrow">{label}</div>{children}
    <div className="slide-footer"><span>Daniela Huezo · Grok bot for GTM</span><span>{String(n).padStart(2, "0")} / 11</span></div>
  </section>;
}
export function Welcome() {
  return <Frame n={1} label="Una tarea para empezar" className="gp-cover">
    <h1>Grok bot<br/><span className="slide-pink">for GTM</span></h1><p className="gp-cover-line">Investigá tu mercado. Seguí sus cambios. Prepará tu próximo paso.</p><Bot className="gp-cover-bot" {...bot}/>
  </Frame>;
}
export function Speaker() {
  return <Frame n={2} label="Un gusto, soy Daniela" className="gp-speaker">
    <h1>Daniela<br/>Huezo<span className="slide-pink">.</span></h1>
    <div className="gp-roles"><p><span>Ai Labs</span><strong>Co-founder</strong></p><p><span>SpaceXAI &amp; ElevenLabs</span><strong>Ambassador</strong></p><p><span>Mi trabajo</span><strong>AI Product Engineer</strong></p></div>
    <div className="gp-monogram" aria-hidden="true">DH<span>↗</span></div>
  </Frame>;
}
export function Market() {
  return <Frame n={3} label="Go-to-market / Del cliente al aprendizaje" className="">
    <h2>Salir al mercado<br/><span className="slide-pink">requiere más de una respuesta.</span></h2><div className="gp-gtm-map"><section><small>01</small><h3>Entender</h3><p>Cliente · Problema</p><p>Alternativas · Valor</p></section><section><small>02</small><h3>Llegar y vender</h3><p>Diferencia · Mensaje</p><p>Canales · Compra y precio</p></section><section><small>03</small><h3>Aprender y crecer</h3><p>Experiencia · Retención</p><p>Métricas · Ajustes</p></section></div><p className="gp-bottom">En cada parte hay trabajo que podemos encargarle a Grok Bot.</p>
  </Frame>;
}
function BotLabel() { return <div className="gp-bot-label"><Bot {...bot}/><span>Grok Bot<small>ENTREGA ILUSTRATIVA</small></span></div>; }
export function Jobs() {
 return <Frame n={4} label="Tres trabajos para tu GTM">
 <h2>Tu mercado se mueve.<br/><span className="slide-pink">Poné a tu bot a investigarlo.</span></h2>
 <div className="gp-gtm-map"><section><small>01</small><h3>Investigar</h3><p>Quién podría necesitarte</p></section><section><small>02</small><h3>Seguir cambios</h3><p>Qué está pasando ahora</p></section><section><small>03</small><h3>Prepararte</h3><p>Qué podrías hacer después</p></section></div>
 <p className="gp-bottom">Un mismo ejemplo: ofrecés capacitación para equipos de atención.</p>
 </Frame>;
}
export function Research() {
 return <Frame n={5} label="01 / Investigá esto por mí" className="gp-proof">
 <h2>Encontrá empresas.<br/><span className="slide-pink">Traeme razones.</span></h2>
 <div className="gp-proof-grid"><div className="gp-request"><small>EL ENCARGO</small><p>“Investigá empresas que estén ampliando su equipo de atención.”</p><span>Tu oferta: capacitación para esos equipos.</span></div>
 <div className="gp-artifact"><BotLabel/><h3>Empresa A</h3><p className="gp-find">Busca 12 agentes de atención.</p><div className="gp-evidence"><small>FUENTE A CONSULTAR</small><p>Página de empleos de la empresa</p></div><div className="gp-evidence"><small>POR QUÉ MIRARLA</small><p>Podría necesitar formar al nuevo equipo.</p></div></div></div>
 <p className="gp-bottom">Caso ficticio · Una contratación es una señal, no una intención de compra.</p>
 </Frame>;
}
export function Meeting() {
 return <Frame n={6} label="02 / Avisame cuando cambie algo" className="gp-proof">
 <h2>No empezar de cero<br/><span className="slide-pink">cada lunes.</span></h2>
 <div className="gp-proof-grid"><div className="gp-request"><small>LA RUTINA QUE CONFIGURÁS</small><p>“Revisá estas empresas cada semana. Resumí solo lo nuevo.”</p><span>Definís empresas, fuentes y frecuencia.</span></div>
 <div className="gp-artifact"><BotLabel/><h3>Tu resumen semanal</h3><div className="gp-update"><b>01</b><div><p>Empresa A amplía la búsqueda.</p><small>FUENTE: EMPLEOS · VERIFICAR ALCANCE</small></div></div><div className="gp-update"><b>02</b><div><p>Empresa B anuncia una sucursal.</p><small>FUENTE: ANUNCIO · EXPLORAR NECESIDAD</small></div></div></div></div>
 <p className="gp-bottom">Ejemplo ficticio de reporte · En una entrega real, pedí enlaces y fechas.</p>
 </Frame>;
}
export function Compare() {
 return <Frame n={7} label="03 / Ayudame a aprovecharlo" className="gp-proof">
 <h2>Una señal.<br/><span className="slide-pink">Un siguiente paso mejor preparado.</span></h2>
 <div className="gp-proof-grid"><div className="gp-request"><small>EL SIGUIENTE ENCARGO</small><p>“Con esta novedad, prepará una pregunta para validar la necesidad.”</p><span>Empresa A está incorporando personal.</span></div>
 <div className="gp-artifact"><BotLabel/><small>PROPUESTA PARA TU REVISIÓN</small><p className="gp-question">“¿Cómo están preparando al nuevo equipo para atender clientes?”</p><div className="gp-evidence"><small>POR VALIDAR</small><p>Si necesitan apoyo externo para capacitarlo.</p></div></div></div>
 <p className="gp-bottom">Ejemplo ficticio · Vos decidís si corresponde iniciar la conversación.</p>
 </Frame>;
}
export function Brief() {
 return <Frame n={8} label="Cómo empezar / Guía preparada">
 <h2>Así empieza<br/><span className="slide-pink">tu primer encargo.</span></h2>
 <div className="gp-brief"><div><small>EN LA APP</small><p>Abrí la conversación con tu bot.</p></div><div><small>DALE CONTEXTO</small><p>Tu oferta, tu cliente y tus fuentes.</p></div><div><small>PEDÍ ALGO ACOTADO</small><p>Cinco empresas. Razones, enlaces y dudas.</p></div></div>
 <p className="gp-bottom">Primero revisá una entrega. Después configurá el seguimiento.</p>
 </Frame>;
}
export function Followup() {
 return <Frame n={9} label="Mi experiencia / Daniela + Grok Bot">
 <h2>Yo lo usé<br/><span className="slide-pink">para investigar mi mercado.</span></h2>
 <div className="gp-personal"><div><small>MI NECESIDAD</small><p>Entender el mercado<br/>de Cairose.</p></div><div><small>EL TRABAJO CON GROK BOT</small><p>Investigar clientes<br/>y alternativas.</p></div><div><small>MI APORTE</small><p>Revisé los hallazgos.<br/>Afiné el enfoque.</p></div></div>
 <p className="gp-bottom">Cairose: software para floristerías. Usé directamente la aplicación de Grok Bot.</p>
 </Frame>;
}
export function Experience() {
 return <Frame n={10} label="Lo que sí me sirvió">
 <h2>La información,<br/><span className="slide-pink">lista para trabajar con ella.</span></h2>
 <div className="gp-experience"><Bot {...bot}/><div><small>UNA ENTREGA DE GROK BOT</small><p>Un dashboard que pude<br/>consultar y entender.</p></div></div>
 <a className="gp-demo-link" href="https://cairose-gtm-dashboard.vercel.app/" target="_blank" rel="noreferrer">Mostrar mi dashboard ↗</a>
 </Frame>;
}
export function Start() {
 return <Frame n={11} label="Para llevarlo a tu proyecto" className="gp-start">
 <h2>¿Qué te gustaría tener<br/><span className="slide-pink">mejor investigado mañana?</span></h2>
 <div className="gp-followup"><p>Un mercado que querés entender.</p><p>Empresas que te interesa conocer.</p><p>Cambios que no querés perderte.</p></div>
 <p className="gp-bottom">Elegí uno. Dale contexto a Grok Bot. Pedí una primera entrega.</p>
 </Frame>;
}
