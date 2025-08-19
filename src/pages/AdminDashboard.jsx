import '../App.css'
import React, { useState, useRef } from 'react'
import TopNav from '../shared/TopNav.jsx'

export default function AdminDashboard() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')
	const [activeTab, setActiveTab] = useState('spokenword')
	
	// Admin password - you can change this to whatever you prefer
	const ADMIN_PASSWORD = 'admin123'

	// SpokenWord state
	const [uploadedFiles, setUploadedFiles] = useState([])
	const [isDragOver, setIsDragOver] = useState(false)
	const [poems, setPoems] = useState([
		{
			id: 1,
			title: "STRENGTH IS THE ONLY AMEN",
			content: "STRENGTH IS THE ONLY AMEN\n\nI don't care if they'll remember me.\nStrip me of my lies,\nburn down my pride\nthis is another call, Lord.\n\nThe war inside is eating me alive.\nI need You to swing the sword,\nbecause these demons don't fight fair.\n\nAnd sometimes I stare at my own reflection,\nfeel tears that should fall,\nbut they dried long ago.\n\nLife has been harsh,\nlike every breath is borrowed fire.\n\nI thought solitude was peace,\nbut even in silence I hear screams.\n\nSo kill that thing in me, God\nthe hollow voice that pretends strength,\nwhen all I crave is You.\n\nThis soul… heavy like chains.\nI walk at night,\nletting the darkness speak with my thoughts.\n\nAnd I wish I could sit across the table with You,\nlook You in the eyes,\nand ask, \"Why me?\"\n\nNot with anger,\nbut with the ache of a child\nwho doesn't understand his Father's silence.\n\nI'm not chasing validation.\nNot today.\n\nI'm not asking for wealth,\nor sudden breakthroughs.\n\nToday, I just beg for strength.\n\nStrength to crawl through the hours,\nto breathe through the weight,\nto carry this cross until You remind me\nwhy You gave me life in the first place.\n\nOh God…\ntoday I lay it raw,\nwith no filters,\nno polished prayers.\n\nI need You more than my next heartbeat.\nIf You don't hold me, I collapse.\nIf You don't speak, I'm lost.\nIf You don't breathe into me—\nthen silence becomes my grave.\n\nSo here it is, Lord…\nno more bargaining,\nno more clever words.\n\nMy last prayer, my only cry:\n\nStrength is the only amen",
			author: "Anthony",
			date: new Date().toLocaleDateString(),
			isEditing: false,
			featured: true
		}
	])
	const [showPoemForm, setShowPoemForm] = useState(false)
	const [newPoem, setNewPoem] = useState({ title: '', content: '', author: 'Anthony', featured: false })
	const fileInputRef = useRef(null)

	// Writing/Blog state
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
			isEditing: false,
			likes: 12,
			comments: []
		}
	])
	const [showBlogForm, setShowBlogForm] = useState(false)
	const [newBlogPost, setNewBlogPost] = useState({
		title: '',
		content: '',
		excerpt: '',
		category: 'books',
		tags: '',
		author: 'Anthony',
		featured: false
	})

	const handleAdminLogin = (e) => {
		e.preventDefault()
		if (password === ADMIN_PASSWORD) {
			setIsAuthenticated(true)
			setPassword('')
			setLoginError('')
		} else {
			setLoginError('Incorrect password')
			setPassword('')
		}
	}

	const handleLogout = () => {
		setIsAuthenticated(false)
		setPassword('')
		setLoginError('')
	}

	// SpokenWord functions
	const handleFileUpload = (files) => {
		const newFiles = Array.from(files).map(file => ({
			id: Date.now() + Math.random(),
			file,
			url: URL.createObjectURL(file),
			type: file.type.startsWith('video/') ? 'video' : 'image',
			name: file.name,
			size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
		}))
		
		setUploadedFiles(prev => [...prev, ...newFiles])
	}

	const handleDragOver = (e) => {
		e.preventDefault()
		setIsDragOver(true)
	}

	const handleDragLeave = (e) => {
		e.preventDefault()
		setIsDragOver(false)
	}

	const handleDrop = (e) => {
		e.preventDefault()
		setIsDragOver(false)
		const files = e.dataTransfer.files
		handleFileUpload(files)
	}

	const handleFileInput = (e) => {
		const files = e.target.files
		handleFileUpload(files)
	}

	const removeFile = (id) => {
		setUploadedFiles(prev => {
			const fileToRemove = prev.find(f => f.id === id)
			if (fileToRemove) {
				URL.revokeObjectURL(fileToRemove.url)
			}
			return prev.filter(f => f.id !== id)
		})
	}

	const openFileSelector = () => {
		fileInputRef.current.click()
	}

	const addPoem = () => {
		if (newPoem.title.trim() && newPoem.content.trim()) {
			const poem = {
				id: Date.now(),
				title: newPoem.title,
				content: newPoem.content,
				author: newPoem.author,
				date: new Date().toLocaleDateString(),
				isEditing: false,
				featured: newPoem.featured
			}
			setPoems(prev => [poem, ...prev])
			setNewPoem({ title: '', content: '', author: 'Anthony', featured: false })
			setShowPoemForm(false)
		}
	}

	const editPoem = (id) => {
		setPoems(prev => prev.map(poem => 
			poem.id === id ? { ...poem, isEditing: true } : poem
		))
	}

	const savePoem = (id, updatedData) => {
		setPoems(prev => prev.map(poem => 
			poem.id === id 
				? { ...poem, ...updatedData, isEditing: false }
				: poem
		))
	}

	const deletePoem = (id) => {
		setPoems(prev => prev.filter(poem => poem.id !== id))
	}

	const cancelEdit = (id) => {
		setPoems(prev => prev.map(poem => 
			poem.id === id ? { ...poem, isEditing: false } : poem
		))
	}

	// Blog functions
	const addBlogPost = () => {
		if (newBlogPost.title.trim() && newBlogPost.content.trim() && newBlogPost.excerpt.trim()) {
			const post = {
				id: Date.now(),
				title: newBlogPost.title,
				excerpt: newBlogPost.excerpt,
				content: newBlogPost.content,
				category: newBlogPost.category,
				tags: newBlogPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
				author: newBlogPost.author,
				date: new Date().toLocaleDateString(),
				featured: newBlogPost.featured,
				isEditing: false,
				likes: 0,
				comments: []
			}
			setBlogPosts(prev => [post, ...prev])
			setNewBlogPost({
				title: '',
				content: '',
				excerpt: '',
				category: 'books',
				tags: '',
				author: 'Anthony',
				featured: false
			})
			setShowBlogForm(false)
		}
	}

	const editBlogPost = (id) => {
		setBlogPosts(prev => prev.map(post => 
			post.id === id ? { ...post, isEditing: true } : post
		))
	}

	const saveBlogPost = (id, updatedData) => {
		setBlogPosts(prev => prev.map(post => 
			post.id === id 
				? { ...post, ...updatedData, isEditing: false }
				: post
		))
	}

	const deleteBlogPost = (id) => {
		setBlogPosts(prev => prev.filter(post => post.id !== id))
	}

	const cancelBlogEdit = (id) => {
		setBlogPosts(prev => prev.map(post => 
			post.id === id ? { ...post, isEditing: false } : post
		))
	}

	const toggleFeatured = (id) => {
		setBlogPosts(prev => prev.map(post => 
			post.id === id ? { ...post, featured: !post.featured } : post
		))
	}

	if (!isAuthenticated) {
		return (
			<main>
				<TopNav />
				<section className="container-section py-16 md:py-24">
					<div className="max-w-md mx-auto">
						<div className="card">
							<h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>
							<form onSubmit={handleAdminLogin} className="space-y-4">
								<div>
									<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
										Admin Password
									</label>
									<input
										type="password"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Enter admin password"
										required
									/>
								</div>
								{loginError && (
									<p className="text-red-600 text-sm">{loginError}</p>
								)}
								<button
									type="submit"
									className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
								>
									Login
								</button>
							</form>
						</div>
					</div>
				</section>
			</main>
		)
	}

	return (
		<main>
			<TopNav />
			<section className="container-section py-16 md:py-24">
				<div className="flex justify-between items-center mb-8">
					<h1 className="section-title">Admin Dashboard</h1>
					<button
						onClick={handleLogout}
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
					>
						Logout
					</button>
				</div>

				{/* Tab Navigation */}
				<div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
					<button
						onClick={() => setActiveTab('spokenword')}
						className={`px-4 py-2 rounded-md transition-colors ${
							activeTab === 'spokenword'
								? 'bg-blue-600 text-white'
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						SpokenWord Management
					</button>
					<button
						onClick={() => setActiveTab('writing')}
						className={`px-4 py-2 rounded-md transition-colors ${
							activeTab === 'writing'
								? 'bg-blue-600 text-white'
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						Writing/Blog Management
					</button>
				</div>

				{/* SpokenWord Tab */}
				{activeTab === 'spokenword' && (
					<div className="space-y-8">
						{/* Poetry Management */}
						<div className="card">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">Poetry Management</h2>
								<button
									onClick={() => setShowPoemForm(!showPoemForm)}
									className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
								>
									{showPoemForm ? 'Cancel' : 'Add New Poem'}
								</button>
							</div>

							{/* Add New Poem Form */}
							{showPoemForm && (
								<div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
									<h4 className="text-lg font-medium text-green-800 mb-4">Create New Poem</h4>
									<div className="space-y-4">
										<div>
											<label htmlFor="poemTitle" className="block text-sm font-medium text-green-700 mb-2">
												Title
											</label>
											<input
												type="text"
												id="poemTitle"
												value={newPoem.title}
												onChange={(e) => setNewPoem(prev => ({ ...prev, title: e.target.value }))}
												className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
												placeholder="Enter poem title"
											/>
										</div>
										<div>
											<label htmlFor="poemContent" className="block text-sm font-medium text-green-700 mb-2">
												Poem Content
											</label>
											<textarea
												id="poemContent"
												value={newPoem.content}
												onChange={(e) => setNewPoem(prev => ({ ...prev, content: e.target.value }))}
												rows={12}
												className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
												placeholder="Write your poem here..."
											/>
										</div>
										<div className="flex items-center space-x-4">
											<label className="flex items-center">
												<input
													type="checkbox"
													checked={newPoem.featured}
													onChange={(e) => setNewPoem(prev => ({ ...prev, featured: e.target.checked }))}
													className="mr-2"
												/>
												<span className="text-sm text-green-700">Featured Poem</span>
											</label>
										</div>
										<div className="flex space-x-3">
											<button
												onClick={addPoem}
												className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
											>
												Publish Poem
											</button>
											<button
												onClick={() => setShowPoemForm(false)}
												className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
											>
												Cancel
											</button>
										</div>
									</div>
								</div>
							)}

							{/* Existing Poems */}
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Existing Poems</h3>
								{poems.map((poem) => (
									<div key={poem.id} className="border border-gray-200 rounded-lg p-4">
										{poem.isEditing ? (
											<div className="space-y-4">
												<input
													type="text"
													value={poem.title}
													onChange={(e) => {
														const updatedPoem = { ...poem, title: e.target.value }
														setPoems(prev => prev.map(p => p.id === poem.id ? updatedPoem : p))
													}}
													className="w-full text-xl font-bold text-gray-900 border-b border-gray-300 focus:outline-none focus:border-blue-500"
												/>
												<textarea
													value={poem.content}
													onChange={(e) => {
														const updatedPoem = { ...poem, content: e.target.value }
														setPoems(prev => prev.map(p => p.id === poem.id ? updatedPoem : p))
													}}
													rows={8}
													className="w-full text-gray-700 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												/>
												<div className="flex space-x-2">
													<button
														onClick={() => savePoem(poem.id, poem)}
														className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
													>
														Save
													</button>
													<button
														onClick={() => cancelEdit(poem.id)}
														className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
													>
														Cancel
													</button>
												</div>
											</div>
										) : (
											<div>
												<div className="flex justify-between items-start mb-3">
													<h4 className="text-lg font-bold text-gray-900">{poem.title}</h4>
													<div className="flex space-x-2">
														<button
															onClick={() => editPoem(poem.id)}
															className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
														>
															Edit
														</button>
														<button
															onClick={() => deletePoem(poem.id)}
															className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
														>
															Delete
														</button>
													</div>
												</div>
												<p className="text-sm text-gray-500 mb-2">By {poem.author} • {poem.date}</p>
												{poem.featured && (
													<span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full mb-2">
														⭐ Featured
													</span>
												)}
												<div className="text-gray-700 whitespace-pre-wrap max-h-32 overflow-hidden">
													{poem.content}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						{/* Media Upload */}
						<div className="card">
							<h2 className="text-xl font-semibold mb-4">Media Upload</h2>
							
							{/* Drag & Drop Zone */}
							<div
								className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
									isDragOver 
										? 'border-blue-500 bg-blue-50' 
										: 'border-gray-300 hover:border-gray-400'
								}`}
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
							>
								<div className="space-y-4">
									<svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
										<path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<div>
										<p className="text-lg font-medium text-gray-900">
											Drag and drop your files here
										</p>
										<p className="text-gray-500">or</p>
										<button
											onClick={openFileSelector}
											className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
										>
											Browse Files
										</button>
									</div>
									<p className="text-sm text-gray-500">
										Supports: MP4, MOV, AVI, MP3, WAV, JPG, PNG, GIF (Max: 100MB)
									</p>
								</div>
							</div>

							{/* Hidden file input */}
							<input
								ref={fileInputRef}
								type="file"
								multiple
								accept="video/*,audio/*,image/*"
								onChange={handleFileInput}
								className="hidden"
							/>

							{/* Uploaded Files */}
							{uploadedFiles.length > 0 && (
								<div className="mt-6">
									<h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{uploadedFiles.map((file) => (
											<div key={file.id} className="relative group">
												<div className="bg-gray-100 rounded-lg p-4">
													{file.type === 'video' ? (
														<video
															controls
															className="w-full h-32 object-cover rounded-lg"
															src={file.url}
														>
															Your browser does not support the video tag.
														</video>
													) : (
														<img
															src={file.url}
															alt={file.name}
															className="w-full h-32 object-cover rounded-lg"
														/>
													)}
													
													<div className="mt-3">
														<p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
															{file.name}
														</p>
														<p className="text-xs text-gray-500">{file.size}</p>
													</div>
													
													<button
														onClick={() => removeFile(file.id)}
														className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
														title="Remove file"
													>
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
														</svg>
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Writing/Blog Tab */}
				{activeTab === 'writing' && (
					<div className="space-y-8">
						{/* Blog Management */}
						<div className="card">
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">Blog Management</h2>
								<button
									onClick={() => setShowBlogForm(!showBlogForm)}
									className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
								>
									{showBlogForm ? 'Cancel' : 'Create New Post'}
								</button>
							</div>

							{/* Add New Blog Post Form */}
							{showBlogForm && (
								<div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
									<h4 className="text-lg font-medium text-green-800 mb-4">Create New Blog Post</h4>
									<div className="space-y-4">
										<div>
											<label htmlFor="postTitle" className="block text-sm font-medium text-green-700 mb-2">
												Title
											</label>
											<input
												type="text"
												id="postTitle"
												value={newBlogPost.title}
												onChange={(e) => setNewBlogPost(prev => ({ ...prev, title: e.target.value }))}
												className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
												placeholder="Enter post title"
											/>
										</div>
										<div>
											<label htmlFor="postExcerpt" className="block text-sm font-medium text-green-700 mb-2">
												Excerpt/Summary
											</label>
											<textarea
												id="postExcerpt"
												value={newBlogPost.excerpt}
												onChange={(e) => setNewBlogPost(prev => ({ ...prev, excerpt: e.target.value }))}
												rows={3}
												className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
												placeholder="Brief summary of your post..."
											/>
										</div>
										<div>
											<label htmlFor="postContent" className="block text-sm font-medium text-green-700 mb-2">
												Content
											</label>
											<textarea
												id="postContent"
												value={newBlogPost.content}
												onChange={(e) => setNewBlogPost(prev => ({ ...prev, content: e.target.value }))}
												rows={8}
												className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
												placeholder="Write your blog post here..."
											/>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div>
												<label htmlFor="postCategory" className="block text-sm font-medium text-green-700 mb-2">
													Category
												</label>
												<select
													id="postCategory"
													value={newBlogPost.category}
													onChange={(e) => setNewBlogPost(prev => ({ ...prev, category: e.target.value }))}
													className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
												>
													<option value="books">Books & Literature</option>
													<option value="creativity">Creativity & Art</option>
													<option value="computing">Computing & Tech</option>
												</select>
											</div>
											<div>
												<label htmlFor="postTags" className="block text-sm font-medium text-green-700 mb-2">
													Tags (comma-separated)
												</label>
												<input
													type="text"
													id="postTags"
													value={newBlogPost.tags}
													onChange={(e) => setNewBlogPost(prev => ({ ...prev, tags: e.target.value }))}
													className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
													placeholder="tag1, tag2, tag3"
												/>
											</div>
										</div>
										<div className="flex items-center space-x-4">
											<label className="flex items-center">
												<input
													type="checkbox"
													checked={newBlogPost.featured}
													onChange={(e) => setNewBlogPost(prev => ({ ...prev, featured: e.target.checked }))}
													className="mr-2"
												/>
												<span className="text-sm text-green-700">Featured Post</span>
											</label>
										</div>
										<div className="flex space-x-3">
											<button
												onClick={addBlogPost}
												className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
											>
												Publish Post
											</button>
											<button
												onClick={() => setShowBlogForm(false)}
												className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
											>
												Cancel
											</button>
										</div>
									</div>
								</div>
							)}

							{/* Existing Blog Posts */}
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Existing Blog Posts</h3>
								{blogPosts.map((post) => (
									<div key={post.id} className="border border-gray-200 rounded-lg p-4">
										{post.isEditing ? (
											<div className="space-y-4">
												<input
													type="text"
													value={post.title}
													onChange={(e) => {
														const updatedPost = { ...post, title: e.target.value }
														setBlogPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p))
													}}
													className="w-full text-xl font-bold text-gray-900 border-b border-gray-300 focus:outline-none focus:border-blue-500"
												/>
												<textarea
													value={post.excerpt}
													onChange={(e) => {
														const updatedPost = { ...post, excerpt: e.target.value }
														setBlogPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p))
													}}
													rows={3}
													className="w-full text-gray-600 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												/>
												<textarea
													value={post.content}
													onChange={(e) => {
														const updatedPost = { ...post, content: e.target.value }
														setBlogPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p))
													}}
													rows={6}
													className="w-full text-gray-700 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
												/>
												<div className="flex space-x-2">
													<button
														onClick={() => saveBlogPost(post.id, post)}
														className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
													>
														Save
													</button>
													<button
														onClick={() => cancelBlogEdit(post.id)}
														className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
													>
														Cancel
													</button>
												</div>
											</div>
										) : (
											<div>
												<div className="flex justify-between items-start mb-3">
													<h4 className="text-lg font-bold text-gray-900">{post.title}</h4>
													<div className="flex space-x-2">
														<button
															onClick={() => editBlogPost(post.id)}
															className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
														>
															Edit
														</button>
														<button
															onClick={() => toggleFeatured(post.id)}
															className={`px-3 py-1 text-sm rounded transition-colors ${
																post.featured 
																	? 'bg-yellow-600 text-white hover:bg-yellow-700' 
																	: 'bg-gray-500 text-white hover:bg-gray-600'
															}`}
														>
															{post.featured ? 'Unfeature' : 'Feature'}
														</button>
														<button
															onClick={() => deleteBlogPost(post.id)}
															className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
														>
															Delete
														</button>
													</div>
												</div>
												<p className="text-sm text-gray-500 mb-2">By {post.author} • {post.date}</p>
												{post.featured && (
													<span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full mb-2">
														⭐ Featured
													</span>
												)}
												<p className="text-gray-600 mb-2">{post.excerpt}</p>
												<div className="text-gray-700 whitespace-pre-wrap max-h-32 overflow-hidden">
													{post.content}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</section>
		</main>
	)
}
