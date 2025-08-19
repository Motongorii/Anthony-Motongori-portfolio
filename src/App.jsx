import './App.css'
import React from 'react'
import TopNav from './shared/TopNav.jsx'
import { useAnalyticsInit } from './hooks/useAnalytics'

function Section({ id, title, children, className = '' }) {
	return (
		<section id={id} className={`container-section py-16 md:py-24 ${className}`}>
			<h2 className="section-title mb-6">{title}</h2>
			<div className="section-content space-y-4 text-base/7">{children}</div>
		</section>
	)
}

function Tag({ children }) {
	return <span className="inline-flex items-center rounded-full bg-[--color-surface-muted] px-3 py-1 text-sm text-[--color-text] ring-1 ring-inset ring-[--color-border]">{children}</span>
}

function IconWrapper({ children, className = '' }) {
	return (
		<span className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${className}`}>
			{children}
		</span>
	)
}

function HeroImage() {
	const sources = ['/Moto G.jpg', '/image/Moto G.jpg', '/images/Moto G.jpg']
	const [index, setIndex] = React.useState(0)
	const src = sources[index] || sources[0]
	return (
		<div className="relative group">
			{/* Glowing Edge Effect */}
			<div className="absolute inset-0 bg-gradient-to-r from-brand via-purple-500 to-blue-500 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500 animate-pulse"></div>
			<div className="absolute inset-0 bg-gradient-to-r from-brand via-purple-500 to-blue-500 rounded-3xl blur-md group-hover:blur-lg transition-all duration-500 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
			
			{/* Background Glow */}
			<div className="absolute inset-0 bg-gradient-to-br from-brand/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
			
			{/* Image Container with Proper Fit */}
			<div className="relative w-full h-full rounded-3xl p-1">
				<img
					src={src}
					alt="Anthony Motongori portrait"
					className="w-full h-full object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
					loading="eager"
					decoding="async"
					onError={() => setIndex((i) => (i + 1 < sources.length ? i + 1 : i))}
				/>
			</div>
			
			{/* Subtle Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-3xl"></div>
		</div>
	)
}

function FacebookIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7 icon-glow icon-fb">
			<path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.55v1.86h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94Z" />
		</svg>
	)
}

function InstagramIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7 icon-glow icon-ig">
			<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm12 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
		</svg>
	)
}

function TikTokIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7 icon-glow icon-tt">
			<path d="M14.5 3.01c.69 2.1 2.38 3.69 4.5 4.09v2.3a7.9 7.9 0 0 1-4.5-1.44v6.79a5.75 5.75 0 1 1-5-5.69v2.36a3.38 3.38 0 1 0 2.25 3.17V3h2.75v.01Z" />
		</svg>
	)
}

function LinkedInIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7 icon-glow icon-li">
			<path d="M6.94 8.75V20H3.5V8.75h3.44ZM5.22 4A2.01 2.01 0 0 0 3.2 6.01c0 1.1.9 2 2.02 2a2 2 0 0 0 2-2A2 2 0 0 0 5.22 4Zm6.28 6.25c1.68 0 2.43.92 2.85 1.57v-1.07h3.41V20h-3.41v-4.9c0-1.17-.63-1.9-1.7-1.9-.98 0-1.55.66-1.8 1.3-.09.22-.11.52-.11.82V20h-3.4s.04-7.53 0-8.25h3.4v1.5c.45-.7 1.26-1.6 2.77-1.6Z" />
		</svg>
	)
}

function XIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7 icon-glow icon-x">
			<path d="M3 3h3.5l4.9 6.89L16.9 3H21l-7.16 9.78L21 21h-3.6l-5.07-7.1L7.1 21H3l7.35-9.95L3 3Z" />
		</svg>
	)
}

function YouTubeIcon() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7 icon-glow icon-yt">
			<path d="M21.6 7.2a3 3 0 0 0-2.12-2.12C17.76 4.62 12 4.62 12 4.62s-5.76 0-7.48.46A3 3 0 0 0 2.4 7.2 31.2 31.2 0 0 0 2 12c0 1.63.14 3.17.4 4.8a3 3 0 0 0 2.12 2.12c1.72.46 7.48.46 7.48.46s5.76 0 7.48-.46A3 3 0 0 0 21.6 16.8c.26-1.63.4-3.17.4-4.8 0-1.63-.14-3.17-.4-4.8ZM10.2 9.27 15.45 12 10.2 14.73V9.27Z" />
		</svg>
	)
}

function SocialLink({ href, label, Icon }) {
	return (
		<a href={href} aria-label={label} target="_blank" rel="noreferrer" className="group">
			<IconWrapper className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 hover:shadow-lg transition-all duration-300">
				<Icon />
			</IconWrapper>
		</a>
	)
}

function ContactForm() {
	const [name, setName] = React.useState('')
	const [fromEmail, setFromEmail] = React.useState('')
	const [message, setMessage] = React.useState('')
	const [sent, setSent] = React.useState(false)

	function onSubmit(e) {
		e.preventDefault()
		const mailto = `mailto:antomotongori@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${fromEmail}\n\n${message}`)}`
		window.location.href = mailto
		setSent(true)
	}

	return (
		<form onSubmit={onSubmit} className="space-y-6">
			<div className="space-y-2">
				<label className="block text-sm font-medium text-[--color-text]">Name</label>
				<input 
					value={name} 
					onChange={(e) => setName(e.target.value)} 
					required 
					className="w-full px-4 py-3 rounded-xl border border-[--color-border] bg-[--color-surface] text-[--color-text] placeholder-[--color-subtle] outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-300" 
					placeholder="Your name" 
				/>
			</div>
			<div className="space-y-2">
				<label className="block text-sm font-medium text-[--color-text]">Email</label>
				<input 
					type="email" 
					value={fromEmail} 
					onChange={(e) => setFromEmail(e.target.value)} 
					required 
					className="w-full px-4 py-3 rounded-xl border border-[--color-border] bg-[--color-surface] text-[--color-text] placeholder-[--color-subtle] outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-300" 
					placeholder="you@example.com" 
				/>
			</div>
			<div className="space-y-2">
				<label className="block text-sm font-medium text-[--color-text]">Message</label>
				<textarea 
					value={message} 
					onChange={(e) => setMessage(e.target.value)} 
					required 
					rows={5} 
					className="w-full px-4 py-3 rounded-xl border border-[--color-border] bg-[--color-surface] text-[--color-text] placeholder-[--color-subtle] outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-300 resize-none" 
					placeholder="How can I help?" 
				/>
			</div>
			<div className="flex items-center gap-4">
				<button type="submit" className="btn-primary px-8 py-3 rounded-xl hover:scale-105 transition-transform duration-300">
					{sent ? 'Opening Email...' : 'Send Message'}
				</button>
				{sent && <span className="text-sm text-brand-light flex items-center gap-2">
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
					</svg>
					Email app opening...
				</span>}
			</div>
		</form>
	)
}

export default function App() {
	// Initialize analytics tracking
	useAnalyticsInit();
	
	return (
		<main id="home" className="min-h-screen">
			<TopNav />
			
			{/* Hero Section */}
			<header className="container-section py-20 md:py-32 relative overflow-hidden">
				{/* Background Elements */}
				<div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-purple-500/5 to-blue-500/5"></div>
				<div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
				
				<div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
					<div className="space-y-8">
						<div className="space-y-4">
							<div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-base font-bold border-2 border-green-400 shadow-lg animate-pulse">
								<span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
								🚀 AVAILABLE FOR WORK
							</div>
							<h1 className="hero-title text-5xl md:text-7xl lg:text-8xl leading-tight">
								<span className="hero-kicker block text-xl md:text-2xl mb-4 text-[--color-subtle] font-normal">Hello, I'm</span>
								<span className="bg-gradient-to-r from-brand via-purple-600 to-blue-600 bg-clip-text text-transparent">
									Anthony Motongori
								</span>
							</h1>
						</div>
						
						<p className="text-xl md:text-2xl text-[--color-subtle] leading-relaxed max-w-2xl">
							Software Developer, Graphic Designer, Writer, and Spoken Word Artist crafting digital experiences that inspire and innovate.
						</p>
						
						<div className="flex flex-col sm:flex-row gap-4">
							<a href="/work" className="btn-primary px-8 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
								View My Work
							</a>
							<a href="/#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-xl ring-2 ring-[--color-border] text-[--color-text] hover:bg-[--color-surface-muted] hover:ring-brand transition-all duration-300 text-lg font-medium">
								Let's Connect
							</a>
						</div>
						
						{/* Quick Stats */}
						<div className="grid grid-cols-3 gap-6 pt-8">
							<div className="text-center">
								<div className="text-2xl md:text-3xl font-bold text-brand">5+</div>
								<div className="text-sm text-[--color-subtle]">Projects</div>
							</div>
							<div className="text-center">
								<div className="text-2xl md:text-3xl font-bold text-purple-600">2+</div>
								<div className="text-sm text-[--color-subtle]">Years</div>
							</div>
							<div className="text-center">
								<div className="text-2xl md:text-3xl font-bold text-blue-600">100%</div>
								<div className="text-sm text-[--color-subtle]">Satisfaction</div>
							</div>
						</div>
					</div>
					
					<div className="hero-panel p-4">
						<div className="w-full max-w-md mx-auto">
							<div className="aspect-[4/5] w-full overflow-hidden rounded-3xl">
								<HeroImage />
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* About Section */}
			<Section id="about" title="About Me" className="bg-gradient-to-br from-[--color-surface] to-[--color-surface-muted]">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<p className="text-lg leading-relaxed">
							I craft performant web experiences and compelling visuals, blending code and design with a strong narrative voice. Whether building modern interfaces, shaping brand identities, or performing spoken word, I care about clarity, impact, and emotion.
						</p>
						<p className="text-lg leading-relaxed">
							My approach combines technical expertise with creative vision, ensuring every project not only functions flawlessly but also tells a compelling story that resonates with users.
						</p>
						<div className="flex flex-wrap gap-3">
							<Tag>React & Next.js</Tag>
							<Tag>UI/UX Design</Tag>
							<Tag>Creative Writing</Tag>
							<Tag>Performance</Tag>
						</div>
					</div>
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
						<div className="relative bg-gradient-to-br from-[--color-surface] to-[--color-surface-muted] p-8 rounded-3xl border border-[--color-border] shadow-xl">
							<div className="grid grid-cols-2 gap-6">
								<div className="text-center p-4 bg-brand/10 rounded-2xl">
									<div className="text-3xl font-bold text-brand mb-2">🎯</div>
									<div className="font-semibold">Goal-Oriented</div>
								</div>
								<div className="text-center p-4 bg-purple-500/10 rounded-2xl">
									<div className="text-3xl font-bold text-purple-600 mb-2">🚀</div>
									<div className="font-semibold">Innovation-Driven</div>
								</div>
								<div className="text-center p-4 bg-blue-500/10 rounded-2xl">
									<div className="text-3xl font-bold text-blue-600 mb-2">💡</div>
									<div className="font-semibold">Creative Problem Solver</div>
								</div>
								<div className="text-center p-4 bg-green-500/10 rounded-2xl">
									<div className="text-3xl font-bold text-green-600 mb-2">🤝</div>
									<div className="font-semibold">Collaborative</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* Skills Section */}
			<Section id="skills" title="Expertise & Skills">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="card group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
						<div className="p-8">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold mb-4">Software Development</h3>
							<p className="text-[--color-subtle] mb-6 leading-relaxed">
								Full-stack development with React, TypeScript, Node.js, and modern web technologies. Focus on performance, accessibility, and scalable component systems.
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-sm rounded-full">React</span>
								<span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-sm rounded-full">TypeScript</span>
								<span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-sm rounded-full">Node.js</span>
								<span className="px-3 py-1 bg-blue-500/10 text-blue-600 text-sm rounded-full">REST APIs</span>
							</div>
						</div>
					</div>
					
					<div className="card group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
						<div className="p-8">
							<div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold mb-4">Graphic Design</h3>
							<p className="text-[--color-subtle] mb-6 leading-relaxed">
								Comprehensive design solutions including branding, layout design, posters, and social content. Expert in color theory, typography, and visual communication.
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="px-3 py-1 bg-purple-500/10 text-purple-600 text-sm rounded-full">Branding</span>
								<span className="px-3 py-1 bg-purple-500/10 text-purple-600 text-sm rounded-full">Layout Design</span>
								<span className="px-3 py-1 bg-purple-500/10 text-purple-600 text-sm rounded-full">Typography</span>
								<span className="px-3 py-1 bg-purple-500/10 text-purple-600 text-sm rounded-full">Color Theory</span>
							</div>
						</div>
					</div>
					
					<div className="card group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
						<div className="p-8">
							<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold mb-4">Creative Writing</h3>
							<p className="text-[--color-subtle] mb-6 leading-relaxed">
								Compelling copywriting, essays, scripts, and creative direction. Specializing in narrative structure and emotional storytelling that connects with audiences.
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm rounded-full">Copywriting</span>
								<span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm rounded-full">Scripts</span>
								<span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm rounded-full">Narrative</span>
								<span className="px-3 py-1 bg-green-500/10 text-green-600 text-sm rounded-full">Creative Direction</span>
							</div>
						</div>
					</div>
					
					<div className="card group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
						<div className="p-8">
							<div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
								<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold mb-4">Spoken Word</h3>
							<p className="text-[--color-subtle] mb-6 leading-relaxed">
								Dynamic performance art with mastery of cadence, live presence, and audio production. Creating emotional connections through powerful spoken narratives.
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-sm rounded-full">Performance</span>
								<span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-sm rounded-full">Cadence</span>
								<span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-sm rounded-full">Live Presence</span>
								<span className="px-3 py-1 bg-orange-500/10 text-orange-600 text-sm rounded-full">Audio Production</span>
							</div>
						</div>
					</div>
				</div>
			</Section>

			{/* Work Preview Section */}
			<Section id="work" title="Selected Work" className="bg-gradient-to-br from-[--color-surface-muted] to-[--color-surface]">
				<div className="text-center mb-12">
					<p className="text-lg text-[--color-subtle] mb-6">Explore more on the dedicated page.</p>
					<a className="btn-primary px-8 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-transform duration-300" href="/work">
						View All Projects
					</a>
				</div>
			</Section>

			{/* Writing Preview Section */}
			<Section id="writing" title="Writing & Blog">
				<div className="text-center mb-12">
					<p className="text-lg text-[--color-subtle] mb-6">Read essays and articles on the dedicated page.</p>
					<a className="btn-primary px-8 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-transform duration-300" href="/writing">
						Read My Writing
					</a>
				</div>
			</Section>

			{/* Spoken Word Preview Section */}
			<Section id="spoken-word" title="Spoken Word" className="bg-gradient-to-br from-[--color-surface] to-[--color-surface-muted]">
				<div className="text-center mb-12">
					<p className="text-lg text-[--color-subtle] mb-6">Listen to performances on the dedicated page.</p>
					<a className="btn-primary px-8 py-4 rounded-xl text-lg font-medium hover:scale-105 transition-transform duration-300" href="/spoken-word">
						Listen to Performances
					</a>
				</div>
			</Section>

			{/* Contact Section */}
			<footer id="contact" className="container-section py-20 bg-gradient-to-br from-[--color-surface-muted] to-[--color-surface]">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Create Something Amazing</h2>
					<p className="text-xl text-[--color-subtle] max-w-3xl mx-auto">
						Ready to bring your vision to life? Whether you need a stunning website, compelling design, or creative content, I'm here to help you succeed.
					</p>
				</div>
				
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div className="space-y-8">
						<div>
							<h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
							<p className="text-lg text-[--color-subtle] mb-8">
								Prefer email or a quick message? Use the form or the contact methods below.
							</p>
						</div>
						
						<div className="grid grid-cols-1 gap-4">
							<a href="mailto:antomotongori@gmail.com" className="card contact-card !p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-[--color-subtle]">Email</p>
										<p className="font-mono text-lg font-medium group-hover:text-brand transition-colors">antomotongori@gmail.com</p>
									</div>
								</div>
							</a>
							
							<a href="tel:+254111449213" className="card contact-card !p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.554.89l-1.9 8.71a2 2 0 00-.312 1.101l-.76 4.57a2 2 0 002.75 2.35l4.57-.76a2 2 0 011.1-.312l8.71-1.9a1 1 0 01.89.554L19 12a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1a2 2 0 01-2 2z" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-[--color-subtle]">Phone</p>
										<p className="text-lg font-medium group-hover:text-green-600 transition-colors">+254 111 449 213</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					
					<div className="card p-8">
						<ContactForm />
					</div>
				</div>

				{/* Social Links */}
				<div className="mt-16 text-center">
					<div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
						<SocialLink href="https://web.facebook.com/MotongoriTheSpokesonna" label="Facebook" Icon={FacebookIcon} />
						<SocialLink href="https://www.instagram.com/motongori_the_spokesonna/" label="Instagram" Icon={InstagramIcon} />
						<SocialLink href="https://www.tiktok.com/@spokesonna?lang=en" label="TikTok" Icon={TikTokIcon} />
						<SocialLink href="#" label="LinkedIn" Icon={LinkedInIcon} />
						<SocialLink href="https://x.com/Spokesonna" label="X" Icon={XIcon} />
						<SocialLink href="https://www.youtube.com/@spokesonna" label="YouTube" Icon={YouTubeIcon} />
					</div>
					
					<p className="text-[--color-subtle] text-center mt-8">© {new Date().getFullYear()} Anthony Motongori. All rights reserved.</p>
				</div>
			</footer>
		</main>
	)
}
