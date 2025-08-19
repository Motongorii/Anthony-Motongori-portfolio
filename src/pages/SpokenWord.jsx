import '../App.css'
import React, { useState, useEffect } from 'react'
import TopNav from '../shared/TopNav.jsx'
import { usePageView, useInteractionTracking } from '../hooks/useAnalytics'
import { commentsAPI, likesAPI } from '../utils/api'

export default function SpokenWord() {
	// Track page view and interactions
	usePageView('spoken-word');
	const { trackClick, trackButtonPress } = useInteractionTracking();
	
	const [notification, setNotification] = useState({ message: '', type: '', show: false })
	const [isLoading, setIsLoading] = useState(true)
	const [poems, setPoems] = useState([
		{
			id: 1,
			title: "STRENGTH IS THE ONLY AMEN",
			content: `I don't care if they'll remember me.

Strip me of my lies,
burn down my pride
this is another call, Lord.

The war inside is eating me alive.
I need You to swing the sword,
because these demons don't fight fair.

And sometimes I stare at my own reflection,
feel tears that should fall,
but they dried long ago.

Life has been harsh,
like every breath is borrowed fire.

I thought solitude was peace,
but even in silence I hear screams.

So kill that thing in me, God
the hollow voice that pretends strength,
when all I crave is You.

This soul… heavy like chains.
I walk at night,
letting the darkness speak with my thoughts.

And I wish I could sit across the table with You,
look You in the eyes,
and ask, "Why me?"

Not with anger,
but with the ache of a child
who doesn't understand his Father's silence.

I'm not chasing validation.
Not today.

I'm not asking for wealth,
or sudden breakthroughs.

Today, I just beg for strength.

Strength to crawl through the hours,
to breathe through the weight,
to carry this cross until You remind me
why You gave me life in the first place.

Oh God…
today I lay it raw,
with no filters,
no polished prayers.

I need You more than my next heartbeat.
If You don't hold me, I collapse.
If You don't speak, I'm lost.
If You don't breathe into me—
then silence becomes my grave.

So here it is, Lord…
no more bargaining,
no more clever words.

My last prayer, my only cry:

Strength is the only amen`,
			author: 'Anthony',
			date: new Date('2024-01-20').toLocaleDateString(),
			featured: true,
			likes: 0,
			comments: []
		},
		{
			id: 2,
			title: "Silent Echoes",
			content: `In the quiet spaces between words,
where silence speaks louder than sound,
I find the echoes of forgotten dreams,
whispering secrets to the wind.

The night holds stories untold,
written in starlight and shadow,
each breath a verse,
each heartbeat a rhythm.

Sometimes the loudest voices
are the ones that never speak,
and the deepest truths
lie in the spaces between.`,
			author: 'Anthony',
			date: new Date('2024-01-18').toLocaleDateString(),
			featured: false,
			likes: 0,
			comments: []
		},
		{
			id: 3,
			title: "Digital Dreams",
			content: `In the glow of screens,
we chase digital dreams,
where reality blurs
with virtual streams.

Code becomes poetry,
algorithms sing,
in this new world
where technology brings

the future to our fingertips,
and dreams to our screens,
in this digital age
of infinite possibilities.`,
			author: 'Anthony',
			date: new Date('2024-01-15').toLocaleDateString(),
			featured: false,
			likes: 0,
			comments: []
		}
	])

	// Load comments and likes from backend on component mount
	useEffect(() => {
		loadAllPoemData();
	}, []);

	// Function to load all poem data (comments and likes) from backend
	const loadAllPoemData = async () => {
		try {
			setIsLoading(true);
			for (const poem of poems) {
				await loadPoemData(poem.id);
			}
		} catch (error) {
			console.error('Error loading poem data:', error);
			showNotification('Failed to load some poem data. Please refresh the page.', 'error');
		} finally {
			setIsLoading(false);
		}
	};

	// Function to load data for a specific poem
	const loadPoemData = async (poemId) => {
		try {
			// Load comments
			const comments = await commentsAPI.getComments(poemId);
			
			// Load like count
			const likeData = await likesAPI.getLikeCount(poemId, 'poem');
			
			// Update the poem with real data
			setPoems(prev => prev.map(poem => 
				poem.id === poemId 
					? { 
						...poem, 
						comments: comments || [],
						likes: likeData?.count || 0
					}
					: poem
			));
		} catch (error) {
			console.error(`Error loading data for poem ${poemId}:`, error);
			// If it's a network error, the backend might not be running
			if (error.message.includes('fetch')) {
				console.log('Backend might not be running. Comments and likes will not persist.');
			}
		}
	};

	// Like and comment functions
	const handleLike = async (poemId) => {
		try {
			// Toggle like on backend
			const result = await likesAPI.toggleLike(poemId, 'poem');
			
			// Update local state with new like count
			setPoems(prev => prev.map(poem => 
				poem.id === poemId ? { ...poem, likes: result.count } : poem
			));
			
			// Track the interaction
			trackButtonPress('like', 'poem', poemId);
			
			// Show success notification
			showNotification('Like updated successfully!', 'success');
		} catch (error) {
			console.error('Error toggling like:', error);
			
			// Fallback: update locally if backend fails
			if (error.message.includes('fetch')) {
				setPoems(prev => prev.map(poem => 
					poem.id === poemId ? { ...poem, likes: poem.likes + 1 } : poem
				));
				showNotification('Like updated (saved locally)', 'success');
			} else {
				showNotification('Failed to update like. Please try again.', 'error');
			}
		}
	}

	const addComment = async (poemId, commentData) => {
		try {
			// Add comment to backend
			const newComment = await commentsAPI.addComment(poemId, {
				author: commentData.author,
				content: commentData.content,
				postId: poemId
			});
			
			// Update local state with the new comment
			setPoems(prev => prev.map(poem => 
				poem.id === poemId 
					? { ...poem, comments: [...poem.comments, newComment] }
					: poem
			));
			
			// Track the interaction
			trackButtonPress('comment', 'poem', poemId);
			
			// Show success notification
			showNotification('Comment added successfully!', 'success');
		} catch (error) {
			console.error('Error adding comment:', error);
			
			// Fallback: add locally if backend fails
			if (error.message.includes('fetch')) {
				const fallbackComment = {
					id: Date.now(),
					author: commentData.author,
					content: commentData.content,
					date: new Date().toLocaleDateString(),
					time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
				};
				
				setPoems(prev => prev.map(poem => 
					poem.id === poemId 
						? { ...poem, comments: [...poem.comments, fallbackComment] }
						: poem
				));
				
				showNotification('Comment added (saved locally)', 'success');
			} else {
				showNotification('Failed to add comment. Please try again.', 'error');
			}
		}
	}

	// Notification helper function
	const showNotification = (message, type) => {
		setNotification({ message, type, show: true });
		setTimeout(() => setNotification({ message: '', type: '', show: false }), 3000);
	};

	return (
		<main>
			<TopNav />
			
			{/* Notification */}
			{notification.show && (
				<div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
					notification.type === 'success' 
						? 'bg-green-500 text-white' 
						: 'bg-red-500 text-white'
				}`}>
					{notification.message}
				</div>
			)}
			
			<section className="container-section py-16 md:py-24">
				<h1 className="section-title text-center">Spoken Word</h1>
				<p className="section-content mt-4 text-center">Poetry, performances, and creative expression.</p>
				
				{/* Poems Display */}
				<div className="space-y-8 mt-8">
					{isLoading ? (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">Loading poems...</p>
						</div>
					) : (
						poems.map((poem) => (
							<article key={poem.id} className={`card ${poem.featured ? 'ring-2 ring-yellow-400' : ''}`}>
								<div className="p-8">
									<div className="text-center mb-8">
										<h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
											{poem.title}
										</h2>
										{poem.featured && (
											<span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
												⭐ Featured
											</span>
										)}
									</div>
									
									<div className="max-w-4xl mx-auto">
										<div className="prose prose-lg max-w-none text-center">
											<div className="space-y-6 text-gray-700 leading-relaxed">
												<div className="whitespace-pre-wrap text-lg">
													{poem.content}
												</div>
											</div>
										</div>
										
										<div className="mt-8 pt-6 border-t border-gray-200 text-center">
											<p className="text-gray-600 text-sm">— {poem.author}</p>
											<p className="text-gray-500 text-xs mt-2">Spoken Word • Poetry • {poem.date}</p>
										</div>
									</div>

									{/* Like and Comment Section */}
									<div className="mt-8 pt-6 border-t border-gray-200">
										{/* Like Button */}
										<div className="flex items-center justify-center space-x-4 mb-6">
											<button
												onClick={() => handleLike(poem.id)}
												className="flex items-center space-x-2 px-6 py-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
											>
												<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
													<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
												</svg>
												<span className="font-medium">{poem.likes}</span>
											</button>
											<span className="text-gray-500">•</span>
											<span className="text-gray-500">{poem.comments.length} comment{poem.comments.length !== 1 ? 's' : ''}</span>
										</div>

										{/* Comments Display */}
										{poem.comments.length > 0 && (
											<div className="space-y-3 mb-6">
												<h4 className="font-medium text-gray-900 text-center">Comments</h4>
												<div className="max-w-2xl mx-auto space-y-3">
													{poem.comments.map((comment) => (
														<div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
															<div className="flex items-center space-x-2 mb-2">
																<span className="font-medium text-gray-900">{comment.author}</span>
																<span className="text-gray-400">•</span>
																<span className="text-sm text-gray-500">{comment.date} at {comment.time}</span>
															</div>
															<p className="text-gray-700">{comment.content}</p>
														</div>
													))}
												</div>
											</div>
										)}

										{/* Add Comment Form */}
										<div className="bg-blue-50 p-6 rounded-lg max-w-2xl mx-auto">
											<h4 className="font-medium text-blue-900 mb-4 text-center">Share Your Thoughts</h4>
											<CommentForm poemId={poem.id} onAddComment={addComment} />
										</div>
									</div>
								</div>
							</article>
						))
					)}
				</div>

				{/* Sample Audio Section */}
				<div className="mt-12 card">
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

// Comment Form Component
function CommentForm({ poemId, onAddComment }) {
	const [commentData, setCommentData] = useState({ author: '', content: '' })
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (commentData.author.trim() && commentData.content.trim()) {
			setIsSubmitting(true)
			try {
				await onAddComment(poemId, commentData)
				setCommentData({ author: '', content: '' })
			} catch (error) {
				console.error('Error submitting comment:', error)
				// Error is now handled by the parent component
			} finally {
				setIsSubmitting(false)
			}
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<input
					type="text"
					value={commentData.author}
					onChange={(e) => setCommentData(prev => ({ ...prev, author: e.target.value }))}
					placeholder="Your name"
					className="px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					required
					disabled={isSubmitting}
				/>
			</div>
			<textarea
				value={commentData.content}
				onChange={(e) => setCommentData(prev => ({ ...prev, content: e.target.value }))}
				placeholder="Share your thoughts on this poem..."
				rows={3}
				className="w-full px-4 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				required
				disabled={isSubmitting}
			/>
			<div className="text-center">
				<button
					type="submit"
					disabled={isSubmitting}
					className={`px-6 py-2 rounded transition-colors ${
						isSubmitting 
							? 'bg-blue-400 text-white cursor-not-allowed' 
							: 'bg-blue-600 text-white hover:bg-blue-700'
					}`}
				>
					{isSubmitting ? 'Posting...' : 'Post Comment'}
				</button>
			</div>
		</form>
	)
} 