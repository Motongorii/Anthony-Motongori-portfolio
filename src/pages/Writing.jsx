import '../App.css'
import React, { useState } from 'react'
import TopNav from '../shared/TopNav.jsx'

export default function Writing() {
	const [selectedCategory, setSelectedCategory] = useState('all')
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
			likes: 12,
			comments: [
				{
					id: 1,
					author: 'Sarah Chen',
					content: 'This resonates so much with me! I\'ve always felt that coding and writing poetry share a similar creative rhythm.',
					date: new Date('2024-01-16').toLocaleDateString(),
					time: '2:30 PM'
				},
				{
					id: 2,
					author: 'Marcus Rodriguez',
					content: 'Beautiful analogy. The flow state comparison is spot on - both require that perfect balance of focus and creativity.',
					date: new Date('2024-01-17').toLocaleDateString(),
					time: '11:15 AM'
				}
			]
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
			likes: 8,
			comments: [
				{
					id: 1,
					author: 'Emma Thompson',
					content: 'This is exactly what I needed to read today. Reminds me why I got into UX design in the first place.',
					date: new Date('2024-01-11').toLocaleDateString(),
					time: '3:45 PM'
				}
			]
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
			likes: 15,
			comments: [
				{
					id: 1,
					author: 'David Kim',
					content: 'As a technical writer, this hits home. I\'ve been trying to incorporate more narrative elements into my docs.',
					date: new Date('2024-01-06').toLocaleDateString(),
					time: '9:20 AM'
				},
				{
					id: 2,
					author: 'Lisa Wang',
					content: 'Love the storytelling approach! It makes technical concepts so much more engaging and memorable.',
					date: new Date('2024-01-07').toLocaleDateString(),
					time: '4:10 PM'
				}
			]
		}
	])

	// Like and comment functions
	const handleLike = (postId) => {
		setBlogPosts(prev => prev.map(post => 
			post.id === postId ? { ...post, likes: post.likes + 1 } : post
		))
	}

	const addComment = (postId, commentData) => {
		const newComment = {
			id: Date.now(),
			author: commentData.author,
			content: commentData.content,
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
		}
		
		setBlogPosts(prev => prev.map(post => 
			post.id === postId 
				? { ...post, comments: [...post.comments, newComment] }
				: post
		))
	}

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
					{filteredPosts.length === 0 ? (
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

	const handleSubmit = (e) => {
		e.preventDefault()
		if (commentData.author.trim() && commentData.content.trim()) {
			onAddComment(postId, commentData)
			setCommentData({ author: '', content: '' })
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
				/>
			</div>
			<textarea
				value={commentData.content}
				onChange={(e) => setCommentData(prev => ({ ...prev, content: e.target.value }))}
				placeholder="Share your thoughts..."
				rows={3}
				className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				required
			/>
			<button
				type="submit"
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
			>
				Post Comment
			</button>
		</form>
	)
} 