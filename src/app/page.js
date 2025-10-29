"use client";

import Header from "./components/Header";
import { FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCode, FaRocket, FaBolt, FaHeart, FaTrophy, FaAward } from "react-icons/fa";
import { SiNextdotjs, SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiPostgresql, SiPython, SiCplusplus, SiFlask, SiPhp, SiMysql } from "react-icons/si";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section - Unique Design */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
              style={{
                top: '10%',
                left: '10%',
                animationDelay: '0s'
              }}
            />
            <div
              className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
              style={{
                top: '60%',
                right: '10%',
                animationDelay: '2s'
              }}
            />
            <div
              className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
              style={{
                bottom: '10%',
                left: '50%',
                animationDelay: '4s'
              }}
            />
          </div>

          {/* Cursor Follow Effect */}
          <div
            className="absolute w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none transition-all duration-300"
            style={{
              left: mousePosition.x - 128,
              top: mousePosition.y - 128,
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-full text-indigo-300 font-semibold mb-6 animate-slide-up">
                🏆 Hackathon Winner • Open Source Contributor
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 animate-slide-up stagger-1">
              <span className="gradient-text">Kostiantyn</span>
              <br />
              <span className="text-white">Ilnytskyi</span>
            </h1>

            <div className="flex flex-wrap gap-4 justify-center mb-8 animate-slide-up stagger-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <FaTrophy className="text-yellow-400" />
                <span className="text-gray-200 font-medium">Hackathon Winner</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <FaCode className="text-indigo-400" />
                <span className="text-gray-200 font-medium">Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <FaRocket className="text-purple-400" />
                <span className="text-gray-200 font-medium">CS @ UCalgary</span>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-3">
              From <span className="text-yellow-400 font-bold">winning hackathons</span> to building products for <span className="text-indigo-400 font-bold">5,000+ users</span>.
              Led teams of <span className="text-purple-400 font-bold">30 developers</span> and taught <span className="text-pink-400 font-bold">programming to 25+ students</span>.
              I turn coffee into code that matters. ☕→💻
            </p>

            <div className="flex gap-6 justify-center animate-slide-up stagger-4">
              <a
                href="https://github.com/Kostia06"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 animate-glow"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaGithub className="text-2xl" />
                  View My Work
                </span>
              </a>
              <a
                href="#contact"
                className="group px-8 py-4 border-2 border-white/30 backdrop-blur-sm rounded-xl font-bold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  <FaEnvelope className="text-xl" />
                  Let&apos;s Connect
                </span>
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1 rounded-2xl animate-gradient hover-lift">
                  <div className="bg-white p-8 rounded-2xl">
                    <div className="text-6xl mb-4">🌍</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">My Journey</h3>
                    <p className="text-gray-700 leading-relaxed">
                      From New York to Calgary, I&apos;ve been coding since high school. Won <strong className="text-yellow-600">Top 10 Student Achievement Award</strong> and never stopped building since then.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-1 rounded-2xl animate-gradient hover-lift">
                  <div className="bg-white p-8 rounded-2xl">
                    <div className="text-6xl mb-4">🏆</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Competition Ready</h3>
                    <p className="text-gray-700 leading-relaxed">
                      <strong className="text-orange-600">1st place</strong> at Cultivator Hackathon. <strong className="text-orange-600">6th out of 60 teams</strong> at RBC Hackathon. I thrive under pressure and love solving hard problems fast.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-1 rounded-2xl animate-gradient hover-lift">
                  <div className="bg-white p-8 rounded-2xl">
                    <div className="text-6xl mb-4">👨‍💻</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Real Impact</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Built systems serving <strong className="text-emerald-600">5,000+ users</strong>. Reduced load times by <strong className="text-emerald-600">40%</strong>. Increased transactions by <strong className="text-emerald-600">25%</strong>. Numbers don&apos;t lie.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600 p-1 rounded-2xl animate-gradient hover-lift">
                  <div className="bg-white p-8 rounded-2xl">
                    <div className="text-6xl mb-4">🧑‍🏫</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Teaching & Leading</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Led <strong className="text-cyan-600">30-person dev team</strong>. Taught programming to <strong className="text-cyan-600">25+ students</strong>. <strong className="text-cyan-600">90% continued with CS</strong>. I build people, not just products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 top-0 left-1/4 animate-float"></div>
            <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 bottom-0 right-1/4 animate-float" style={{animationDelay: '3s'}}></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">
                Key <span className="gradient-text">Achievements</span>
              </h2>
              <p className="text-xl text-gray-300">What sets me apart</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Hackathon Wins */}
              <div className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 to-orange-600 opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">🥇</div>
                  <h3 className="text-4xl font-black text-white mb-2">1st Place</h3>
                  <p className="text-gray-300 font-semibold mb-3">Cultivator Hackathon</p>
                  <p className="text-gray-400 text-sm">
                    Led team of 6 to win by building ShopLocal platform in 24 hours
                  </p>
                </div>
              </div>

              {/* RBC Hackathon */}
              <div className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">🏅</div>
                  <h3 className="text-4xl font-black text-white mb-2">6th / 60</h3>
                  <p className="text-gray-300 font-semibold mb-3">RBC Hackathon Semi-Finals</p>
                  <p className="text-gray-400 text-sm">
                    Built real-time motion capture system with &lt;50ms latency
                  </p>
                </div>
              </div>

              {/* User Impact */}
              <div className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">👥</div>
                  <h3 className="text-4xl font-black text-white mb-2">5,000+</h3>
                  <p className="text-gray-300 font-semibold mb-3">Active Users Served</p>
                  <p className="text-gray-400 text-sm">
                    Built and optimized platforms serving thousands of users
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-4xl font-black text-white mb-2">40%</h3>
                  <p className="text-gray-300 font-semibold mb-3">Load Time Reduction</p>
                  <p className="text-gray-400 text-sm">
                    Optimized performance through caching and API refactoring
                  </p>
                </div>
              </div>

              {/* Team Leadership */}
              <div className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">👨‍💼</div>
                  <h3 className="text-4xl font-black text-white mb-2">30 Devs</h3>
                  <p className="text-gray-300 font-semibold mb-3">Team Leadership</p>
                  <p className="text-gray-400 text-sm">
                    Led UI/functionality for 30-person team • Perfect grade achieved
                  </p>
                </div>
              </div>

              {/* Published Package */}
              <div className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover-lift">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-rose-600 opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity"></div>
                <div className="relative">
                  <div className="text-5xl mb-4">📦</div>
                  <h3 className="text-4xl font-black text-white mb-2">NPM</h3>
                  <p className="text-gray-300 font-semibold mb-3">Published Open Source</p>
                  <p className="text-gray-400 text-sm">
                    AI Chat Assistant library used by developers worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Highlights */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Proven Results
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 font-bold mt-1">✓</span>
                    <span>Increased successful transactions by <strong>25%</strong> with payment optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 font-bold mt-1">✓</span>
                    <span>Improved business efficiency by <strong>30%</strong> through automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 font-bold mt-1">✓</span>
                    <span>Delivered complete e-commerce platform in <strong>6 weeks</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 font-bold mt-1">✓</span>
                    <span><strong>90%</strong> of students I taught continued with computer science</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                  <span className="text-3xl">🏆</span>
                  Recognition
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold mt-1">★</span>
                    <span>Top 10 Student Achievement Award (High School)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold mt-1">★</span>
                    <span>Outstanding Software Engineering Achievement Award</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold mt-1">★</span>
                    <span>Science Internship Program & Microplacements Program</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 font-bold mt-1">★</span>
                    <span>Perfect grade on 30-person team project</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section - Timeline Style */}
        <section id="experience" className="py-32 bg-gradient-to-br from-slate-50 to-indigo-50 relative">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-xl text-gray-600">Where I&apos;ve made an impact</p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 hidden md:block"></div>

              {/* Experience 1: CS Tutor (Current) */}
              <div className="relative mb-16">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full font-bold mb-4">
                      Sept 2024 - Present
                    </div>
                    <h3 className="text-3xl font-black mb-2 text-gray-900">Computer Science Tutor</h3>
                    <p className="text-xl font-semibold text-emerald-600 mb-4">University of Calgary</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-emerald-100 hover-lift">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-600 font-bold">→</span>
                        <span>Tutored <strong>10+ students</strong> in Python and Java, covering data structures and algorithms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 font-bold">→</span>
                        <span>Created <strong>custom study materials</strong> targeting each student&apos;s weak areas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-teal-600 font-bold">→</span>
                        <span>Improved test scores through <strong>personalized learning approach</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-600 border-4 border-white rounded-full hidden md:block shadow-lg"></div>
              </div>

              {/* Experience 2: Lemmer (Microplacement) */}
              <div className="relative mb-16">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:col-start-2">
                    <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold mb-4">
                      May 2024 - June 2024
                    </div>
                    <h3 className="text-3xl font-black mb-2 text-gray-900">Full Stack Developer</h3>
                    <p className="text-xl font-semibold text-indigo-600 mb-2">Lemmer Ltd. (Microplacement)</p>
                    <p className="text-sm text-gray-600 italic">Calgary, AB</p>
                  </div>
                  <div className="md:row-start-1 md:col-start-1 bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100 hover-lift">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-indigo-600 font-bold">→</span>
                        <span>Built <strong>Rustsol.com</strong> from scratch using Next.js, Express.js, and Supabase</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-purple-600 font-bold">→</span>
                        <span>Developed <strong>secure authentication and payment systems</strong> with encryption</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-pink-600 font-bold">→</span>
                        <span>Delivered in <strong>6 weeks</strong>, improved efficiency by <strong>30%</strong> through automation & CI/CD</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-indigo-600 border-4 border-white rounded-full hidden md:block shadow-lg"></div>
              </div>

              {/* Experience 3: CommerceMate */}
              <div className="relative mb-16">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:text-right mb-8 md:mb-0">
                    <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold mb-4">
                      April 2022 - Aug 2023
                    </div>
                    <h3 className="text-3xl font-black mb-2 text-gray-900">Software Developer Intern</h3>
                    <p className="text-xl font-semibold text-purple-600 mb-2">CommerceMate.co</p>
                    <p className="text-sm text-gray-600 italic">Remote (Los Angeles, USA)</p>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-100 hover-lift">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-purple-600 font-bold">→</span>
                        <span>Improved performance for <strong>5,000+ active users</strong> by reducing load times <strong>40%</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-pink-600 font-bold">→</span>
                        <span>Integrated <strong>Stripe and PayPal APIs</strong>, increasing transactions by <strong>25%</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-fuchsia-600 font-bold">→</span>
                        <span>Worked with <strong>team of 8 developers</strong> using Agile sprints and code reviews</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-purple-600 border-4 border-white rounded-full hidden md:block shadow-lg"></div>
              </div>

              {/* Experience 4: Programming Instructor */}
              <div className="relative">
                <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className="md:col-start-2">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full font-bold mb-4">
                      Jan 2021 - March 2021
                    </div>
                    <h3 className="text-3xl font-black mb-2 text-gray-900">Programming Instructor</h3>
                    <p className="text-xl font-semibold text-cyan-600 mb-2">Ukrainian Educational Center</p>
                    <p className="text-sm text-gray-600 italic">Calgary, AB</p>
                  </div>
                  <div className="md:row-start-1 md:col-start-1 bg-white p-8 rounded-2xl shadow-xl border-2 border-cyan-100 hover-lift">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-cyan-600 font-bold">→</span>
                        <span>Taught <strong>Python programming</strong> to <strong>25+ middle school students</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold">→</span>
                        <span>Covered basic concepts and problem-solving through hands-on projects</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-sky-600 font-bold">→</span>
                        <span><strong>90%</strong> of students showed interest in continuing with computer science</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-cyan-600 border-4 border-white rounded-full hidden md:block shadow-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Bento Grid */}
        <section id="projects" className="py-32 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-gray-400">Hackathon wins & real-world impact</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* ShopLocal - 1st Place Winner */}
              <div className="group relative bg-gradient-to-br from-yellow-600 via-orange-600 to-red-600 p-1 rounded-3xl hover-lift animate-gradient">
                <div className="bg-slate-800 p-10 rounded-3xl h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold mb-4">
                        <FaTrophy className="text-lg" />
                        1st Place Winner
                      </div>
                      <h3 className="text-4xl font-black text-white mb-3">ShopLocal Platform</h3>
                      <p className="text-gray-400 font-semibold mb-4">Cultivator 24-Hour Hackathon • Regina, SK</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    Led team of 6 to win 1st place by building MVP that connects local businesses with customers.
                    Built complete online storefront system with inventory management and secure payment processing.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                      <SiPhp className="text-white" />
                      <span className="text-white font-semibold">PHP</span>
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                      <SiMysql className="text-white" />
                      <span className="text-white font-semibold">MySQL</span>
                    </span>
                    <span className="px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-400 font-semibold">
                      24 Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Chat Assistant - NPM Package */}
              <div className="group relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1 rounded-3xl hover-lift animate-gradient">
                <div className="bg-slate-800 p-10 rounded-3xl h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold mb-4">
                        📦 Open Source
                      </div>
                      <h3 className="text-4xl font-black text-white mb-3">AI Chat Assistant</h3>
                      <p className="text-gray-400 font-semibold mb-4">NPM Package • Published Library</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    Published npm package that lets developers add AI chat to Next.js apps in under 5 minutes.
                    Built HTML parsing system with security restrictions and sanitization to prevent injection attacks.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                      <SiReact className="text-white" />
                      <span className="text-white font-semibold">React</span>
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                      <SiTypescript className="text-white" />
                      <span className="text-white font-semibold">TypeScript</span>
                    </span>
                    <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-semibold">
                      OpenAI • Anthropic
                    </span>
                  </div>
                </div>
              </div>

              {/* Avatar Motion Capture - RBC Hackathon */}
              <div className="group relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 p-1 rounded-3xl hover-lift animate-gradient">
                <div className="bg-slate-800 p-10 rounded-3xl h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-4 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-semibold mb-4">
                        <FaAward className="text-lg" />
                        6th / 60 Teams
                      </div>
                      <h3 className="text-4xl font-black text-white mb-3">Motion Capture System</h3>
                      <p className="text-gray-400 font-semibold mb-4">RBC Hackathon Semi-Finals • Calgary, AB</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    Placed 6th out of 60 teams, reaching semi-finals with live demo and business pitch.
                    Built real-time body tracking system using computer vision with under 50ms response time.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                      <SiPython className="text-white" />
                      <span className="text-white font-semibold">Python</span>
                    </span>
                    <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                      <span className="text-white font-semibold">OpenCV</span>
                    </span>
                    <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 font-semibold">
                      &lt;50ms Latency
                    </span>
                  </div>
                </div>
              </div>

              {/* OMG Multiplayer Platform */}
              <div className="group relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-1 rounded-3xl hover-lift animate-gradient">
                <div className="bg-slate-800 p-10 rounded-3xl h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-block px-4 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold mb-4">
                        👥 Team of 30
                      </div>
                      <h3 className="text-4xl font-black text-white mb-3">OMG Gaming Platform</h3>
                      <p className="text-gray-400 font-semibold mb-4">UI/Functionality Lead • University Project</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    Led UI design and functionality for multiplayer board game platform supporting Chess, Connect 4, and Tic-Tac-Toe.
                    Coordinated 30-person team • Achieved perfect grade with profile management, leaderboards, and friend challenges.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white font-semibold">
                      Java
                    </span>
                    <span className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white font-semibold">
                      JavaFX
                    </span>
                    <span className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-semibold">
                      Perfect Grade
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Link */}
            <div className="mt-12 text-center">
              <a
                href="https://github.com/Kostia06"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-2xl"
              >
                <FaGithub className="text-3xl" />
                View All Projects on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section - Icon Grid */}
        <section id="skills" className="py-32 bg-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                My <span className="gradient-text">Tech Stack</span>
              </h2>
              <p className="text-xl text-gray-600">Languages, frameworks, and tools I use daily</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
              {[
                { icon: <SiPython className="text-5xl" />, name: "Python", color: "from-blue-500 to-yellow-500" },
                { icon: <SiJavascript className="text-5xl" />, name: "JavaScript", color: "from-yellow-400 to-yellow-600" },
                { icon: <SiTypescript className="text-5xl" />, name: "TypeScript", color: "from-blue-500 to-blue-700" },
                { icon: <SiCplusplus className="text-5xl" />, name: "C++", color: "from-blue-600 to-indigo-700" },
                { icon: <span className="text-5xl">☕</span>, name: "Java", color: "from-red-500 to-orange-600" },
                { icon: <SiReact className="text-5xl" />, name: "React", color: "from-cyan-400 to-blue-500" },
                { icon: <SiNextdotjs className="text-5xl" />, name: "Next.js", color: "from-gray-700 to-gray-900" },
                { icon: <SiFlask className="text-5xl" />, name: "Flask", color: "from-gray-700 to-gray-900" },
                { icon: <SiPostgresql className="text-5xl" />, name: "PostgreSQL", color: "from-blue-600 to-blue-800" },
                { icon: <SiTailwindcss className="text-5xl" />, name: "Tailwind", color: "from-cyan-400 to-blue-500" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl hover-lift cursor-pointer border-2 border-gray-200 hover:border-transparent"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300`}></div>
                  <div className="relative z-10 flex flex-col items-center gap-4 text-gray-700 group-hover:text-white transition-colors">
                    {tech.icon}
                    <span className="font-bold text-lg">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Frontend</h3>
                <p className="text-gray-600">React, Next.js, TypeScript, Tailwind CSS, JavaFX</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Backend</h3>
                <p className="text-gray-600">Node.js, Express, Flask, PHP, PostgreSQL, Supabase</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">AI & Systems</h3>
                <p className="text-gray-600">OpenAI API, Anthropic API, OpenCV, Computer Vision</p>
              </div>
            </div>

            {/* Core Competencies */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-3xl">
              <h3 className="text-3xl font-black mb-8 text-gray-900 text-center">Core Competencies</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <h4 className="font-bold text-xl mb-3 text-indigo-600">Leadership</h4>
                  <p>Mentorship • Team Collaboration • Educational Program Design • Cross-functional Communication</p>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-3 text-purple-600">Technical</h4>
                  <p>Full-Stack Development • System Architecture • API Integration • Performance Optimization • Agile Development</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-32 bg-gradient-to-br from-slate-50 to-purple-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-40 translate-x-1/2"></div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                <span className="gradient-text">Education</span>
              </h2>
              <p className="text-xl text-gray-600">Academic journey & achievements</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* University Education */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1 rounded-3xl mb-8 hover-lift animate-gradient">
                <div className="bg-white p-10 md:p-12 rounded-3xl">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                        Bachelor of Science in Computer Science
                      </h3>
                      <p className="text-xl md:text-2xl font-bold text-indigo-600 mb-2">University of Calgary</p>
                      <p className="text-lg text-purple-600 font-semibold">Concentration: Software Engineering</p>
                    </div>
                    <div className="shrink-0">
                      <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full mb-3">
                        Sept 2023 - April 2027
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <div className="flex items-start gap-3 mb-3">
                      <FaTrophy className="text-yellow-500 text-2xl mt-1" />
                      <div>
                        <p className="font-bold text-gray-900 text-lg">Science Internship Program</p>
                        <p className="text-gray-600">Enrolled in both Science Internship Program and Microplacements Program</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* High School */}
              <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-1 rounded-3xl mb-12 hover-lift animate-gradient">
                <div className="bg-white p-10 md:p-12 rounded-3xl">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-3xl font-black text-gray-900 mb-2">
                        High School Diploma
                      </h3>
                      <p className="text-xl font-bold text-orange-600 mb-2">Urban Assembly Gateway for Technology</p>
                      <p className="text-lg text-gray-600">New York, NY</p>
                    </div>
                    <div className="shrink-0">
                      <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-full">
                        2020 - 2021
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <FaAward className="text-yellow-600 text-2xl mt-1" />
                        <div>
                          <p className="font-bold text-gray-900 text-lg">Top 10 Student Achievement Award</p>
                          <p className="text-gray-600">Recognized for outstanding academic performance</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaTrophy className="text-orange-600 text-2xl mt-1" />
                        <div>
                          <p className="font-bold text-gray-900 text-lg">Outstanding Software Engineering Achievement Award</p>
                          <p className="text-gray-600">Excellence in software development and engineering</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Philosophy */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-indigo-100 hover-lift">
                  <div className="text-4xl mb-3">📖</div>
                  <h4 className="font-bold text-gray-900 mb-2">Continuous Learning</h4>
                  <p className="text-gray-600 text-sm">
                    Self-taught in modern web technologies, AI APIs, and system design through building real projects
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100 hover-lift">
                  <div className="text-4xl mb-3">🏆</div>
                  <h4 className="font-bold text-gray-900 mb-2">Competition Experience</h4>
                  <p className="text-gray-600 text-sm">
                    Won multiple hackathons by quickly learning new technologies and building under pressure
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-pink-100 hover-lift">
                  <div className="text-4xl mb-3">🎓</div>
                  <h4 className="font-bold text-gray-900 mb-2">Teaching & Mentoring</h4>
                  <p className="text-gray-600 text-sm">
                    Solidified knowledge by teaching Python, Java, and CS fundamentals to 35+ students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Modern Card */}
        <section id="contact" className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 top-0 right-0 animate-float"></div>
            <div className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 bottom-0 left-0 animate-float" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-4 text-white">
                Let&apos;s <span className="gradient-text">Build Something</span>
              </h2>
              <p className="text-xl text-gray-300">Open to internships, projects, and collaborations</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                {[
                  {
                    icon: <FaEnvelope className="text-3xl" />,
                    label: "Email",
                    value: "Ilnkostia@gmail.com",
                    href: "mailto:Ilnkostia@gmail.com",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: <FaPhone className="text-3xl" />,
                    label: "Phone",
                    value: "+1 (368) 399-0601",
                    href: "tel:+13683990601",
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: <FaMapMarkerAlt className="text-3xl" />,
                    label: "Location",
                    value: "Calgary, AB",
                    color: "from-pink-500 to-rose-500"
                  },
                  {
                    icon: <FaGithub className="text-3xl" />,
                    label: "GitHub",
                    value: "github.com/Kostia06",
                    href: "https://github.com/Kostia06",
                    color: "from-purple-500 to-indigo-500"
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover-lift cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>
                    <div className="relative flex items-center gap-5">
                      <div className={`p-4 bg-gradient-to-br ${item.color} rounded-xl text-white`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{item.label}</h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-300 hover:text-white transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-300">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Card */}
              <div className="relative">
                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1 rounded-3xl animate-gradient">
                  <div className="bg-slate-800 p-10 rounded-3xl h-full flex flex-col justify-center">
                    <div className="text-6xl mb-6 text-center">🚀</div>
                    <h3 className="text-3xl font-black text-white mb-4 text-center">Looking for Summer 2026</h3>
                    <p className="text-gray-300 mb-8 text-center leading-relaxed">
                      Seeking software engineering internships. I bring hackathon wins, real-world experience with 5000+ users, and a track record of shipping quality code fast.
                    </p>
                    <div className="space-y-4">
                      <a
                        href="mailto:Ilnkostia@gmail.com"
                        className="block w-full px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-center hover:bg-gray-100 transition-all hover:scale-105"
                      >
                        Email Me
                      </a>
                      <a
                        href="https://github.com/Kostia06"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-center hover:bg-white hover:text-slate-900 transition-all"
                      >
                        View My GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 text-gray-400 py-12 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p>&copy; 2025 Kostiantyn Ilnytskyi. Crafted with <FaHeart className="inline text-red-500" /> and Next.js</p>
              <div className="flex flex-wrap gap-6 justify-center">
                <a href="#hero" className="hover:text-white transition-colors">Home</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#achievements" className="hover:text-white transition-colors">Achievements</a>
                <a href="#experience" className="hover:text-white transition-colors">Experience</a>
                <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                <a href="#education" className="hover:text-white transition-colors">Education</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
