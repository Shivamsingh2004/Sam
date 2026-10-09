import { useState } from 'react';
import { ArrowUpRight, Monitor, Tablet, Smartphone, Menu, X, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import data from '@/data/portfolio.json';

export const sections = ['about', 'experience', 'skills', 'projects', 'research', 'education', 'certifications', 'contact'];
export function PortfolioNavigation() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="portfolio-header"><a href="#home" className="wordmark">SHIVAM SINGH<span>DEVELOPER & RECRUITER</span></a><div className="header-links"><a href={data.socials[0].url} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href={data.socials[1].url} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href="mailto:shivamgovindsingh1@gmail.com">Mail <ArrowUpRight /></a></div><Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></header>
    <nav aria-label="Sections" className={`portfolio-nav ${open ? 'is-open' : ''}`}>{sections.map((id) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{id === 'research' ? 'Research & honors' : id}</a>)}<a href="#home" aria-label="Back to top"><ArrowUp size={16} /></a></nav>
  </>;
}

export function Filter({ items, value, onChange, label }: { items: {id:string;label:string}[]; value:string; onChange:(value:string)=>void; label:string }) {
  return <div className="filter-bar" role="group" aria-label={label}>{items.map((item) => <Button key={item.id} variant="ghost" className={value === item.id ? 'filter active' : 'filter'} aria-pressed={value === item.id} onClick={() => onChange(item.id)}>{item.label}</Button>)}</div>;
}

export function PortfolioProjects() {
  const [filter, setFilter] = useState('all');
  const [preview, setPreview] = useState<(typeof data.projects)[number] | null>(null);
  const [device, setDevice] = useState('desktop');
  return <>
    <Filter items={data.projectFilters} value={filter} onChange={setFilter} label="Project categories" />
    <div className="project-list">{data.projects.filter((p) => filter === 'all' || p.categories.includes(filter)).map((project) => <article className="project-row" key={project.title}>
      <div className="project-number">0{data.projects.indexOf(project) + 1}<span>{project.categories.join(' / ')}</span></div>
      <div><h3>{project.title}</h3><p>{project.description}</p><div className="technology-list">{project.tags.filter((t) => t !== 'FEATURED FULL STACK APP').map((tag) => <span key={tag}>{tag}</span>)}{project.title === 'Task Management Application' && <span>React.js · REST API · User Authentication · Tailwind CSS · Vercel Deployment</span>}</div>
      <div className="project-actions"><Button variant="outline" onClick={() => { setDevice('desktop'); setPreview(project); }}><Monitor /> Live preview</Button>{project.links.map((link) => <Button asChild variant="link" key={link.url}><a href={link.url} target="_blank" rel="noreferrer">{link.label.startsWith('Open') ? 'Visit website' : link.label}<ArrowUpRight /></a></Button>)}</div></div>
    </article>)}</div>
    <Dialog open={Boolean(preview)} onOpenChange={(open) => { if (!open) setPreview(null); }}><DialogContent className="preview-dialog"><DialogTitle>{preview?.title}</DialogTitle><DialogDescription className="preview-description">{preview?.url}</DialogDescription><div className="preview-tools">{[{id:'desktop',Icon:Monitor},{id:'tablet',Icon:Tablet},{id:'mobile',Icon:Smartphone}].map(({id,Icon}) => <Button key={id} variant={device === id ? 'secondary' : 'ghost'} size="icon" aria-label={id} title={id} aria-pressed={device === id} onClick={() => setDevice(id)}><Icon /></Button>)}<Button asChild variant="link"><a href={preview?.url} target="_blank" rel="noreferrer">Open website <ArrowUpRight /></a></Button></div><div className={`preview-frame ${device}`}>{preview && <iframe title={`${preview.title} live preview`} src={preview.url} />}</div></DialogContent></Dialog>
  </>;
}

export function PortfolioSkills() {
  const [filter, setFilter] = useState('all');
  return <><Filter items={data.skillFilters} value={filter} onChange={setFilter} label="Skill categories" /><div className="skills-grid">{data.skills.filter((s) => filter === 'all' || s.id === filter).map((group) => <div className="skill-group" key={group.id}><h3>{group.title}</h3><div className="skill-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}</div></>;
}

export function PortfolioContactForm() {
  const [feedback, setFeedback] = useState('');
  return <form className="contact-form" onSubmit={(event) => {
    event.preventDefault(); const fields = new FormData(event.currentTarget);
    const name = String(fields.get('name') || '').trim(); const email = String(fields.get('email') || '').trim(); const subject = String(fields.get('subject') || '').trim(); const message = String(fields.get('message') || '').trim();
    if (!name || !email || !subject || !message) { setFeedback('Please complete all fields.'); return; }
    window.location.href = `mailto:shivamgovindsingh1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    setFeedback('Your email draft is ready. Send it from your email app.');
  }}><h3>Send me a message</h3><div className="form-pair"><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input type="email" name="email" autoComplete="email" required /></label></div><label>Subject<input name="subject" required /></label><label>Message<textarea name="message" rows={4} required /></label><Button type="submit" variant="outline">Compose email <ArrowUpRight /></Button>{feedback && <p role="status">{feedback}</p>}</form>;
}