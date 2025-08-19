import '../App.css'
import React from 'react'
import TopNav from '../shared/TopNav.jsx'
import { usePageView } from '../hooks/useAnalytics'

export default function Work() {
	// Track page view
	usePageView('work');
	
	const completedProjects = [
		{
			id: 1,
			title: "E-Commerce Management System",
			category: "Full-Stack Application",
			description: "A comprehensive e-commerce platform with inventory management, order processing, and analytics dashboard. Built with React, Node.js, and MongoDB.",
			features: ["User Authentication", "Product Management", "Order Processing", "Analytics Dashboard", "Payment Integration"],
			tech: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
			image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
			link: "https://github.com/yourusername/ecommerce-system",
			liveLink: "https://ecommerce-demo.vercel.app",
			status: "completed"
		},
		{
			id: 2,
			title: "Creative Portfolio Platform",
			category: "Web Application",
			description: "A dynamic portfolio builder for creative professionals with drag-and-drop functionality, custom themes, and SEO optimization.",
			features: ["Drag & Drop Builder", "Custom Themes", "SEO Tools", "Analytics", "Responsive Design"],
			tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
			image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
			link: "https://github.com/yourusername/portfolio-builder",
			liveLink: "https://portfolio-builder.vercel.app",
			status: "completed"
		},
		{
			id: 3,
			title: "Task Management Suite",
			category: "Productivity Application",
			description: "A collaborative task management system with real-time updates, team collaboration, and advanced project tracking capabilities.",
			features: ["Real-time Collaboration", "Project Tracking", "Team Management", "Time Tracking", "Reporting"],
			tech: ["React", "Socket.io", "PostgreSQL", "Redis", "Docker"],
			image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
			link: "https://github.com/yourusername/task-suite",
			liveLink: "https://task-suite.vercel.app",
			status: "completed"
		}
	];

	const inProgressProjects = [
		{
			id: 4,
			title: "AI-Powered Content Generator",
			category: "Machine Learning",
			description: "An intelligent content creation tool that generates blog posts, social media content, and marketing copy using advanced NLP.",
			progress: 75,
			features: ["AI Content Generation", "SEO Optimization", "Content Templates", "Brand Voice Training"],
			tech: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL"],
			image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
			status: "in-progress"
		},
		{
			id: 5,
			title: "Mobile Fitness App",
			category: "Mobile Development",
			description: "A comprehensive fitness tracking application with workout plans, nutrition tracking, and social features for community building.",
			progress: 60,
			features: ["Workout Tracking", "Nutrition Database", "Social Features", "Progress Analytics", "Personalized Plans"],
			tech: ["React Native", "Firebase", "Node.js", "MongoDB", "Expo"],
			image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
			status: "in-progress"
		},
		{
			id: 6,
			title: "Blockchain Portfolio Tracker",
			category: "Web3 Application",
			description: "A decentralized portfolio management system for cryptocurrency and NFT tracking with real-time market data and analytics.",
			progress: 45,
			features: ["Portfolio Tracking", "Market Data", "NFT Management", "DeFi Integration", "Security Features"],
			tech: ["React", "Solidity", "Web3.js", "Ethereum", "IPFS"],
			image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
			status: "in-progress"
		},
		{
			id: 7,
			title: "Social Media Analytics Dashboard",
			category: "Data Analytics",
			description: "A comprehensive analytics platform that aggregates data from multiple social media platforms and provides actionable insights.",
			progress: 80,
			features: ["Multi-Platform Integration", "Real-time Analytics", "Custom Reports", "Competitor Analysis", "ROI Tracking"],
			tech: ["React", "Python", "Pandas", "Chart.js", "AWS"],
			image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
			status: "in-progress"
		},
		{
			id: 8,
			title: "Voice-Controlled Smart Home Hub",
			category: "IoT Application",
			description: "An intelligent home automation system that integrates with various smart devices and responds to voice commands.",
			progress: 30,
			features: ["Voice Control", "Device Integration", "Automation Rules", "Mobile App", "Security"],
			tech: ["Python", "Raspberry Pi", "React Native", "MQTT", "TensorFlow"],
			image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
			status: "in-progress"
		},
		{
			id: 9,
			title: "Educational Learning Platform",
			category: "EdTech Application",
			description: "An interactive learning management system with personalized learning paths, gamification, and progress tracking.",
			progress: 55,
			features: ["Personalized Learning", "Gamification", "Progress Tracking", "Content Management", "Assessment Tools"],
			tech: ["React", "Node.js", "MongoDB", "Canvas API", "WebRTC"],
			image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
			status: "in-progress"
		},
		{
			id: 10,
			title: "AR Product Visualization",
			category: "Augmented Reality",
			description: "An AR application that allows customers to visualize products in their real environment before making a purchase.",
			progress: 25,
			features: ["3D Product Models", "AR Visualization", "Interactive Features", "Mobile App", "Product Catalog"],
			tech: ["Unity", "ARKit", "ARCore", "C#", "React Native"],
			image: "https://images.unsplash.com/photo-1622979145225-d2ba269cf1ac?w=800&h=600&fit=crop",
			status: "in-progress"
		}
	];

	return (
		<main>
			<TopNav />
			
			{/* Hero Section */}
			<section className="container-section py-16 md:py-24">
				<div className="text-center max-w-4xl mx-auto">
					<h1 className="section-title text-4xl md:text-6xl mb-6">
						Creative Portfolio
					</h1>
					<p className="text-xl md:text-2xl text-[--color-subtle] leading-relaxed">
						Exploring the intersection of technology, design, and innovation through diverse projects that push creative boundaries.
					</p>
					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<span className="px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-medium">Full-Stack Development</span>
						<span className="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-medium">UI/UX Design</span>
						<span className="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">Mobile Apps</span>
						<span className="px-4 py-2 bg-blue-500/10 text-blue-600 rounded-full text-sm font-medium">Web3 & AI</span>
					</div>
				</div>
			</section>

			{/* Completed Projects Section */}
			<section className="container-section py-16">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
					<p className="text-lg text-[--color-subtle]">Complete systems and applications ready for production</p>
				</div>
				
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{completedProjects.map((project) => (
						<div key={project.id} className="group">
							<div className="card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
								<div className="relative overflow-hidden">
									<img 
										src={project.image} 
										alt={project.title}
										className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute top-4 right-4">
										<span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
											✓ Complete
										</span>
									</div>
								</div>
								
								<div className="p-6">
									<div className="mb-3">
										<span className="text-sm text-brand font-medium">{project.category}</span>
									</div>
									
									<h3 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors">
										{project.title}
									</h3>
									
									<p className="text-[--color-subtle] mb-4 leading-relaxed">
										{project.description}
									</p>
									
									<div className="mb-4">
										<h4 className="text-sm font-semibold mb-2 text-[--color-text]">Key Features:</h4>
										<div className="flex flex-wrap gap-2">
											{project.features.map((feature, index) => (
												<span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
													{feature}
												</span>
											))}
										</div>
									</div>
									
									<div className="mb-4">
										<h4 className="text-sm font-semibold mb-2 text-[--color-text]">Technologies:</h4>
										<div className="flex flex-wrap gap-2">
											{project.tech.map((tech, index) => (
												<span key={index} className="px-2 py-1 bg-brand/10 text-brand text-xs rounded">
													{tech}
												</span>
											))}
										</div>
									</div>
									
									<div className="flex gap-3">
										<a 
											href={project.liveLink} 
											target="_blank" 
											rel="noopener noreferrer"
											className="btn-primary flex-1 text-center"
										>
											Live Demo
										</a>
										<a 
											href={project.link} 
											target="_blank" 
											rel="noopener noreferrer"
											className="px-4 py-2 border border-[--color-border] rounded-lg hover:bg-[--color-surface-muted] transition-colors flex-1 text-center"
										>
											View Code
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* In Progress Projects Section */}
			<section className="container-section py-16 bg-[--color-surface-muted]">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Work in Progress</h2>
					<p className="text-lg text-[--color-subtle]">Innovative projects currently under development</p>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{inProgressProjects.map((project) => (
						<div key={project.id} className="group">
							<div className="card overflow-hidden hover:shadow-xl transition-all duration-300">
								<div className="relative overflow-hidden">
									<img 
										src={project.image} 
										alt={project.title}
										className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute top-4 right-4">
										<span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
											{project.progress}%
										</span>
									</div>
								</div>
								
								<div className="p-5">
									<div className="mb-3">
										<span className="text-sm text-orange-600 font-medium">{project.category}</span>
									</div>
									
									<h3 className="text-lg font-bold mb-2 group-hover:text-brand transition-colors">
										{project.title}
									</h3>
									
									<p className="text-[--color-subtle] mb-3 text-sm leading-relaxed">
										{project.description}
									</p>
									
									<div className="mb-3">
										<h4 className="text-xs font-semibold mb-2 text-[--color-text]">Features:</h4>
										<div className="flex flex-wrap gap-1">
											{project.features.slice(0, 3).map((feature, index) => (
												<span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
													{feature}
												</span>
											))}
											{project.features.length > 3 && (
												<span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded">
													+{project.features.length - 3} more
												</span>
											)}
										</div>
									</div>
									
									<div className="mb-4">
										<h4 className="text-xs font-semibold mb-2 text-[--color-text]">Tech Stack:</h4>
										<div className="flex flex-wrap gap-1">
											{project.tech.slice(0, 3).map((tech, index) => (
												<span key={index} className="px-2 py-1 bg-brand/10 text-brand text-xs rounded">
													{tech}
												</span>
											))}
											{project.tech.length > 3 && (
												<span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded">
													+{project.tech.length - 3} more
												</span>
											)}
										</div>
									</div>
									
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div 
											className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-500"
											style={{ width: `${project.progress}%` }}
										></div>
									</div>
									<div className="text-xs text-[--color-subtle] mt-2 text-center">
										{project.progress}% Complete
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Call to Action */}
			<section className="container-section py-16">
				<div className="text-center max-w-3xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Collaborate?</h2>
					<p className="text-lg text-[--color-subtle] mb-8">
						Let's discuss your next project and bring your creative vision to life with cutting-edge technology and innovative design.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a href="/#contact" className="btn-primary">
							Start a Project
						</a>
						<a href="/writing" className="px-6 py-3 border border-[--color-border] rounded-lg hover:bg-[--color-surface-muted] transition-colors">
							View My Writing
						</a>
					</div>
				</div>
			</section>
		</main>
	)
} 