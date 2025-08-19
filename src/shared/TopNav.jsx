import React from 'react'

export default function TopNav() {
	const links = [
		{ href: '/', label: 'Home', match: /^\/$/ },
		{ href: '/#about', label: 'About', match: null },
		{ href: '/#skills', label: 'Expertise', match: null },
		{ href: '/work', label: 'Work', match: /^\/work/ },
		{ href: '/writing', label: 'Writing', match: /^\/writing/ },
		{ href: '/spoken-word', label: 'Spoken Word', match: /^\/spoken-word/ },
	]
	const path = typeof window !== 'undefined' ? window.location.pathname : '/'
	return (
		<header className="topbar sticky top-0 z-50">
			<div className="container-section">
				<div className="flex items-center justify-between py-3">
					<a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
						<span className="brand-badge">A</span>
						<span>Anthony</span>
					</a>
					<nav className="hidden items-center md:flex">
						<div className="nav-shell">
							{links.map((l) => {
								const active = l.match ? l.match.test(path) : false
								return (
									<a key={l.href} href={l.href} className={`nav-link px-3 py-2 text-sm ${active ? 'nav-link--active' : ''}`}>
										{l.label}
									</a>
								)
							})}
						</div>
					</nav>
					<div className="flex items-center gap-3">
						{/* Hidden Admin Link - Completely invisible to regular visitors */}
						<a 
							href="/admin" 
							className="absolute opacity-0 pointer-events-none select-none"
							style={{ fontSize: '1px', color: 'transparent' }}
							title="Admin Access"
						>
							Admin
						</a>
						<a href="/#contact" className="btn-primary hidden md:inline-flex">Contact</a>
					</div>
				</div>
				<nav className="flex gap-1 overflow-x-auto pb-2 md:hidden">
					{links.map((l) => (
						<a key={l.href} href={l.href} className="whitespace-nowrap nav-link rounded-md px-3 py-2 text-sm ring-1 ring-inset ring-[--color-border]">
							{l.label}
						</a>
					))}
					<a href="/#contact" className="ml-auto whitespace-nowrap rounded-md bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark">Contact</a>
				</nav>
			</div>
		</header>
	)
} 