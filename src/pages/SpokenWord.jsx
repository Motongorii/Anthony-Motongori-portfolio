import '../App.css'
import React from 'react'
import TopNav from '../shared/TopNav.jsx'

export default function SpokenWord() {
	return (
		<main>
			<TopNav />
			<section className="container-section py-16 md:py-24">
				<h1 className="section-title text-center">Spoken Word</h1>
				<p className="section-content mt-4 text-center">Poetry, performances, and creative expression.</p>
				
				{/* Featured Poem - STRENGTH IS THE ONLY AMEN */}
				<div className="mt-8 card bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
					<div className="p-8">
						<div className="text-center mb-8">
							<h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
								STRENGTH IS THE ONLY AMEN
							</h2>
							<p className="text-gray-300 text-lg">A raw prayer in verse</p>
						</div>
						
						<div className="max-w-4xl mx-auto">
							<div className="prose prose-invert prose-lg max-w-none text-center">
								<div className="space-y-6 text-gray-100 leading-relaxed">
									<p className="text-xl text-center italic text-gray-300 mb-8">
										"I don't care if they'll remember me."
									</p>
									
									<div className="space-y-4 text-center">
										<p className="text-center">Strip me of my lies,<br />
										burn down my pride<br />
										this is another call, Lord.</p>
										
										<p className="text-center">The war inside is eating me alive.<br />
										I need You to swing the sword,<br />
										because these demons don't fight fair.</p>
										
										<p className="text-center">And sometimes I stare at my own reflection,<br />
										feel tears that should fall,<br />
										but they dried long ago.</p>
										
										<p className="text-center">Life has been harsh,<br />
										like every breath is borrowed fire.</p>
										
										<p className="text-center">I thought solitude was peace,<br />
										but even in silence I hear screams.</p>
										
										<p className="text-center">So kill that thing in me, God<br />
										the hollow voice that pretends strength,<br />
										when all I crave is You.</p>
										
										<p className="text-center">This soul… heavy like chains.<br />
										I walk at night,<br />
										letting the darkness speak with my thoughts.</p>
										
										<p className="text-center">And I wish I could sit across the table with You,<br />
										look You in the eyes,<br />
										and ask, "Why me?"</p>
										
										<p className="text-center">Not with anger,<br />
										but with the ache of a child<br />
										who doesn't understand his Father's silence.</p>
										
										<p className="text-center">I'm not chasing validation.<br />
										Not today.</p>
										
										<p className="text-center">I'm not asking for wealth,<br />
										or sudden breakthroughs.</p>
										
										<p className="text-center">Today, I just beg for strength.</p>
										
										<p className="text-center">Strength to crawl through the hours,<br />
										to breathe through the weight,<br />
										to carry this cross until You remind me<br />
										why You gave me life in the first place.</p>
										
										<p className="text-center">Oh God…<br />
										today I lay it raw,<br />
										with no filters,<br />
										no polished prayers.</p>
										
										<p className="text-center">I need You more than my next heartbeat.<br />
										If You don't hold me, I collapse.<br />
										If You don't speak, I'm lost.<br />
										If You don't breathe into me—<br />
										then silence becomes my grave.</p>
										
										<p className="text-center">So here it is, Lord…<br />
										no more bargaining,<br />
										no more clever words.</p>
										
										<p className="text-center">My last prayer, my only cry:</p>
										
										<p className="text-2xl font-bold text-center mt-8 text-yellow-400">
											Strength is the only amen
										</p>
									</div>
								</div>
							</div>
							
							<div className="mt-8 pt-6 border-t border-gray-700 text-center">
								<p className="text-gray-400 text-sm">— Anthony</p>
								<p className="text-gray-500 text-xs mt-2">Spoken Word • Poetry</p>
							</div>
						</div>
					</div>
				</div>

				{/* Sample Audio Section */}
				<div className="mt-8 card">
					<h2 className="text-xl font-semibold mb-4 text-center">Sample Performance</h2>
					<p className="section-content mb-3 text-center">Listen to a sample performance:</p>
					<div className="mt-3 flex justify-center">
						<audio controls className="w-full max-w-md">
							<source src="/sample.mp3" type="audio/mpeg" />
							Your browser does not support the audio element.
						</audio>
					</div>
				</div>
			</section>
		</main>
	)
} 