import '../App.css'
import React, { useState, useEffect } from 'react'
import TopNav from '../shared/TopNav.jsx'
import { usePageView, useInteractionTracking } from '../hooks/useAnalytics'
import { commentsAPI, likesAPI } from '../utils/api'

export default function Writing() {
	// Track page view and interactions
	usePageView('writing');
	const { trackClick, trackButtonPress } = useInteractionTracking();
	
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [notification, setNotification] = useState({ message: '', type: '', show: false })
	const [isLoading, setIsLoading] = useState(true)
	const [blogPosts, setBlogPosts] = useState([
		{
			id: 1,
			title: "Finding Flow in Code and Poetry",
			excerpt: "Exploring the intersection between programming logic and poetic expression, and how both require a deep understanding of rhythm, structure, and creativity.",
			content: "Finding Flow in Code and Poetry\n\nWhen I first started programming, I was struck by how similar the creative process felt to writing poetry. Both require an understanding of structure, rhythm, and the careful choice of words or syntax. In poetry, every word carries weight; in code, every line serves a purpose.\n\nProgramming, like poetry, is about finding the most elegant way to express an idea. Sometimes the simplest solution is the most beautiful. Other times, complexity is necessary to capture the full depth of what we're trying to convey.\n\nThe flow state that programmers talk about—that deep concentration where time seems to disappear—is remarkably similar to the creative trance that poets experience when words seem to flow effortlessly onto the page.\n\nBoth disciplines teach us patience, precision, and the importance of revision. A poem might go through dozens of drafts before it feels right. Code might be refactored countless times before it's clean and efficient.\n\nIn the end, whether we're crafting algorithms or verses, we're all trying to communicate something meaningful in the most beautiful way possible.",
			category: 'computing',
			tags: ['programming', 'poetry', 'creativity', 'flow'],
			author: 'Anthony',
			date: new Date('2024-01-15').toLocaleDateString(),
			featured: true,
			likes: 0,
			comments: []
		},
		{
			id: 2,
			title: "Design for Emotion",
			excerpt: "How thoughtful design can create emotional connections with users and transform the way we interact with technology.",
			content: "Design for Emotion\n\nGood design is invisible. Great design makes you feel something.\n\nWhen we design interfaces, products, or experiences, we're not just solving functional problems—we're creating emotional connections. Every color choice, every typography decision, every interaction pattern contributes to how someone feels when they use what we've created.\n\nEmotional design isn't about making things pretty. It's about understanding the human experience and designing with empathy. It's about anticipating how someone might feel when they encounter an error message, or how they'll react when they successfully complete a task.\n\nThe best designs make us feel capable, understood, and even delighted. They reduce anxiety and increase confidence. They turn frustrating experiences into satisfying ones.\n\nThis is why user research is so crucial. We need to understand not just what people do, but how they feel while they're doing it. What are their pain points? What brings them joy? What makes them feel accomplished?\n\nDesign for emotion, and you'll create experiences that people not only use, but love.",
			category: 'creativity',
			tags: ['design', 'emotion', 'user experience', 'empathy'],
			author: 'Anthony',
			date: new Date('2024-01-10').toLocaleDateString(),
			featured: false,
			likes: 0,
			comments: []
		},
		{
			id: 3,
			title: "The Art of Storytelling in Technical Writing",
			excerpt: "How narrative techniques can make complex technical concepts more accessible and engaging for readers.",
			content: "The Art of Storytelling in Technical Writing\n\nTechnical writing doesn't have to be dry and boring. In fact, it shouldn't be.\n\nThe best technical documentation tells a story. It guides readers through a journey, from problem to solution, from confusion to understanding. It uses narrative structure to make complex concepts digestible and memorable.\n\nThink about it: when you're explaining a technical concept, you're essentially telling a story about how something works, why it matters, and how to use it effectively.\n\nGood technical writing follows the same principles as good storytelling:\n\n- Start with a hook that captures attention\n- Build context and establish stakes\n- Present information in a logical sequence\n- Use concrete examples and analogies\n- End with a clear resolution or next steps\n\nWhen we frame technical information as a story, we make it more relatable and easier to follow. We help readers see the bigger picture and understand why the details matter.\n\nThe goal isn't to entertain for entertainment's sake—it's to communicate more effectively. Stories are how humans naturally process and remember information.\n\nSo the next time you're writing technical documentation, ask yourself: what story am I trying to tell?",
			category: 'books',
			tags: ['technical writing', 'storytelling', 'documentation', 'communication'],
			author: 'Anthony',
			date: new Date('2024-01-05').toLocaleDateString(),
			featured: true,
			likes: 0,
			comments: []
		}
	])

	// Load comments and likes from backend on component mount
	useEffect(() => {
		loadAllPostData();
	}, []);

	// Function to load all post data (comments and likes) from backend
	const loadAllPostData = async () => {
		try {
			setIsLoading(true);
			for (const post of blogPosts) {
				await loadPostData(post.id);
			}
		} catch (error) {
			console.error('Error loading post data:', error);
			showNotification('Failed to load some post data. Please refresh the page.', 'error');
		} finally {
			setIsLoading(false);
		}
	};

	// Function to load data for a specific post
	const loadPostData = async (postId) => {
		try {
			// Load comments
			const comments = await commentsAPI.getComments(postId);
			
			// Load like count
			const likeData = await likesAPI.getLikeCount(postId);
			
			// Update the post with real data
			setBlogPosts(prev => prev.map(post => 
				post.id === postId 
					? { 
						...post, 
						comments: comments || [],
						likes: likeData?.count || 0
					}
					: post
			));
		} catch (error) {
			console.error(`Error loading data for post ${postId}:`, error);
			// If it's a network error, the backend might not be running
			if (error.message.includes('fetch')) {
				console.log('Backend might not be running. Comments and likes will not persist.');
			}
		}
	};

	// Like and comment functions
	const handleLike = async (postId) => {
		try {
			// Toggle like on backend
			const result = await likesAPI.toggleLike(postId);
			
			// Update local state with new like count
			setBlogPosts(prev => prev.map(post => 
				post.id === postId ? { ...post, likes: result.count } : post
			));
			
			// Track the interaction
			trackButtonPress('like', 'blog_post', postId);
			
			// Show success notification
			showNotification('Like updated successfully!', 'success');
		} catch (error) {
			console.error('Error toggling like:', error);
			
			// Fallback: update locally if backend fails
			if (error.message.includes('fetch')) {
				setBlogPosts(prev => prev.map(post => 
					post.id === postId ? { ...post, likes: post.likes + 1 } : post
				));
				showNotification('Like updated (saved locally)', 'success');
			} else {
				showNotification('Failed to update like. Please try again.', 'error');
			}
		}
	}

	const addComment = async (postId, commentData) => {
		try {
			// Add comment to backend
			const newComment = await commentsAPI.addComment(postId, {
				author: commentData.author,
				content: commentData.content,
				postId: postId
			});
			
			// Update local state with the new comment
			setBlogPosts(prev => prev.map(post => 
				post.id === postId 
					? { ...post, comments: [...post.comments, newComment] }
					: post
			));
			
			// Track the interaction
			trackButtonPress('comment', 'blog_post', postId);
			
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
				
				setBlogPosts(prev => prev.map(post => 
					post.id === postId 
						? { ...post, comments: [...post.comments, fallbackComment] }
						: post
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

	const filteredPosts = selectedCategory === 'all' 
		? blogPosts 
		: blogPosts.filter(post => post.category === selectedCategory)

	const categories = [
		{ id: 'all', name: 'All Posts', color: 'bg-gray-500' },
		{ id: 'books', name: 'Books & Literature', color: 'bg-blue-500' },
		{ id: 'creativity', name: 'Creativity & Art', color: 'bg-purple-500' },
		{ id: 'computing', name: 'Computing & Tech', color: 'bg-green-500' }
	]

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
				<h1 className="section-title">Writing & Blog</h1>
				<p className="section-content mt-4">Thoughts on books, creativity, computing, and the intersection of technology and art.</p>
				
				{/* Category Filter */}
				<div className="mt-8">
					<div className="flex flex-wrap gap-2 mb-6">
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => setSelectedCategory(category.id)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
									selectedCategory === category.id
										? `${category.color} text-white`
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
							>
								{category.name}
							</button>
						))}
					</div>
				</div>

				{/* Blog Posts Display */}
				<div className="space-y-6">
					{isLoading ? (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">Loading posts...</p>
						</div>
					) : filteredPosts.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">No posts found in this category.</p>
						</div>
					) : (
						filteredPosts.map((post) => (
							<article key={post.id} className={`card ${post.featured ? 'ring-2 ring-yellow-400' : ''}`}>
								<div>
									<div className="flex items-start justify-between mb-4">
										<div className="flex-1">
											<div className="flex items-center space-x-3 mb-2">
												{post.featured && (
													<span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
														⭐ Featured
													</span>
												)}
												<span className={`px-2 py-1 text-white text-xs font-medium rounded-full ${
													categories.find(c => c.id === post.category)?.color || 'bg-gray-500'
												}`}>
													{categories.find(c => c.id === post.category)?.name}
												</span>
											</div>
											<h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
											<p className="text-gray-600 text-lg leading-relaxed mb-4">{post.excerpt}</p>
										</div>
									</div>
									
									<div className="prose max-w-none mb-4">
										<div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
											{post.content}
										</div>
									</div>
									
									<div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-200">
										<div className="flex items-center space-x-4 text-sm text-gray-500">
											<span>By {post.author}</span>
											<span>•</span>
											<span>{post.date}</span>
											{post.tags.length > 0 && (
												<>
													<span>•</span>
													<div className="flex flex-wrap gap-1">
														{post.tags.map((tag, index) => (
															<span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
																{tag}
															</span>
														))}
													</div>
												</>
											)}
										</div>
									</div>

									{/* Like and Comment Section */}
									<div className="mt-6 pt-4 border-t border-gray-200">
										{/* Like Button */}
										<div className="flex items-center space-x-4 mb-4">
											<button
												onClick={() => handleLike(post.id)}
												className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
											>
												<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
													<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
												</svg>
												<span className="font-medium">{post.likes}</span>
											</button>
											<span className="text-gray-500">•</span>
											<span className="text-gray-500">{post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}</span>
										</div>

										{/* Comments Display */}
										{post.comments.length > 0 && (
											<div className="space-y-3 mb-4">
												<h4 className="font-medium text-gray-900">Comments</h4>
												{post.comments.map((comment) => (
													<div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
														<div className="flex items-center space-x-2 mb-1">
															<span className="font-medium text-gray-900">{comment.author}</span>
															<span className="text-gray-400">•</span>
															<span className="text-sm text-gray-500">{comment.date} at {comment.time}</span>
														</div>
														<p className="text-gray-700">{comment.content}</p>
													</div>
												))}
											</div>
										)}

										{/* Add Comment Form */}
										<div className="bg-blue-50 p-4 rounded-lg">
											<h4 className="font-medium text-blue-900 mb-3">Add a Comment</h4>
											<CommentForm postId={post.id} onAddComment={addComment} />
										</div>
									</div>
								</div>
							</article>
						))
					)}
				</div>
			</section>
		</main>
	)
}

// Comment Form Component
function CommentForm({ postId, onAddComment }) {
	const [commentData, setCommentData] = useState({ author: '', content: '' })
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (commentData.author.trim() && commentData.content.trim()) {
			setIsSubmitting(true)
			try {
				await onAddComment(postId, commentData)
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
		<form onSubmit={handleSubmit} className="space-y-3">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				<input
					type="text"
					value={commentData.author}
					onChange={(e) => setCommentData(prev => ({ ...prev, author: e.target.value }))}
					placeholder="Your name"
					className="px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					required
					disabled={isSubmitting}
				/>
			</div>
			<textarea
				value={commentData.content}
				onChange={(e) => setCommentData(prev => ({ ...prev, content: e.target.value }))}
				placeholder="Share your thoughts..."
				rows={3}
				className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				required
				disabled={isSubmitting}
			/>
			<button
				type="submit"
				disabled={isSubmitting}
				className={`px-4 py-2 rounded transition-colors ${
					isSubmitting 
						? 'bg-blue-400 text-white cursor-not-allowed' 
						: 'bg-blue-600 text-white hover:bg-blue-700'
				}`}
			>
				{isSubmitting ? 'Posting...' : 'Post Comment'}
			</button>
		</form>
	)
} 