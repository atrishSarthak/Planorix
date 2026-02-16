import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import {ArrowRight, ArrowUpRight, Clock, Layers} from "lucide-react";
import Button from "../../components/ui/Button";
import Upload from "../../components/Upload";
import {useNavigate} from "react-router";
import {useEffect, useRef, useState} from "react";
import {createProject, getProjects} from "../../lib/puter.action";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PLANORIX - AI-Powered Architectural Visualization" },
    { name: "description", content: "Transform 2D floor plans into photorealistic 3D renders with AI" },
  ];
}

export default function Home() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<DesignItem[]>([]);
    const isCreatingProjectRef = useRef(false);
    const orbRef = useRef<HTMLDivElement>(null);

    const handleUploadComplete = async (base64Image: string) => {
        try {
            console.log("Upload complete, starting project creation...");

            if(isCreatingProjectRef.current) return false;
            isCreatingProjectRef.current = true;
            const newId = Date.now().toString();
            const name = `Residence ${newId}`;

            const newItem = {
                id: newId, name, sourceImage: base64Image,
                renderedImage: undefined,
                timestamp: Date.now()
            }

            console.log("Creating project with ID:", newId);
            const saved = await createProject({ item: newItem, visibility: 'private' });

            if(!saved) {
                console.error("Failed to create project - check console for details");
                alert("Failed to create project. Please check the browser console for details.");
                return false;
            }

            console.log("Project saved successfully:", saved);
            setProjects((prev) => [saved, ...prev]);

            navigate(`/visualizer/${newId}`, {
                state: {
                    initialImage: saved.sourceImage,
                    initialRendered: saved.renderedImage || null,
                    name
                }
            });

            return true;
        } catch (error) {
            console.error("Error in handleUploadComplete:", error);
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return false;
        } finally {
            isCreatingProjectRef.current = false;
        }
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const items = await getProjects();

            setProjects(items)
        }

        fetchProjects();
    }, []);

    // Mouse tracking for orb distortion
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!orbRef.current) return;
            
            const orb = orbRef.current;
            const rect = orb.getBoundingClientRect();
            const orbCenterX = rect.left + rect.width / 2;
            const orbCenterY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - orbCenterX) / (rect.width / 2);
            const deltaY = (e.clientY - orbCenterY) / (rect.height / 2);
            
            const rotateY = deltaX * 25;
            const rotateX = -deltaY * 25;
            const skewX = deltaX * 5;
            const skewY = deltaY * 5;
            
            orb.style.transform = `
                scale(1.2) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                skew(${skewX}deg, ${skewY}deg)
            `;
        };

        const handleMouseLeave = () => {
            if (!orbRef.current) return;
            orbRef.current.style.transform = '';
        };

        const orbContainer = document.querySelector('.orb-container');
        if (orbContainer) {
            orbContainer.addEventListener('mousemove', handleMouseMove as any);
            orbContainer.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (orbContainer) {
                orbContainer.removeEventListener('mousemove', handleMouseMove as any);
                orbContainer.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

  return (
      <div className="home">
          <Navbar />

          {/* Hero Section - Full Screen with Split Background */}
          <section className="hero-main">
              <div className="hero-content">
                  <h1 className="hero-title">PLANORIX<span className="dot">.</span></h1>
                  
                  {/* Interactive 3D Orb */}
                  <div className="orb-container">
                      <div className="orb" ref={orbRef}>
                          <div className="orb-inner"></div>
                          <div className="orb-ring"></div>
                          <div className="orb-ring ring-2"></div>
                      </div>
                  </div>

                  <p className="hero-subtitle">
                      Build beautiful spaces<br />
                      at the speed of thought<br />
                      <span style={{background: '#d9f573', padding: '0.2em 0.4em', borderRadius: '0.5rem', display: 'inline-block'}}>with PLANORIX</span>
                  </p>
              </div>
          </section>

          {/* Second Section - Dark Background */}
          <section className="hero-secondary">
              <div className="hero-secondary-content">
                  <p className="description">
                      PLANORIX is an AI-first design environment that helps you visualize, render, and ship architectural projects faster than ever.
                  </p>

                  <div className="actions">
                      <a href="#upload" className="cta">
                          Start Building <ArrowRight className="icon" />
                      </a>

                      <Button variant="outline" size="lg" className="demo">
                          Watch Demo
                      </Button>
                  </div>

                  <div id="upload" className="upload-shell">
                      <div className="grid-overlay" />

                      <div className="upload-card">
                          <div className="upload-head">
                              <div className="upload-icon">
                                  <Layers className="icon" />
                              </div>

                              <h3>Upload your floor plan</h3>
                              <p>Supports JPG, PNG, formats up to 10MB</p>
                          </div>

                          <Upload onComplete={handleUploadComplete} />
                      </div>
                  </div>
              </div>
          </section>

          <section className="projects">
              <div className="section-inner">
                  <div className="section-head">
                      <div className="copy">
                          <h2>Projects</h2>
                          <p>Your latest work and shared community projects, all in one place.</p>
                      </div>
                  </div>

                  <div className="projects-grid">
                      {projects.map(({id, name, renderedImage, sourceImage, timestamp}) => (
                          <div key={id} className="project-card group" onClick={() => navigate(`/visualizer/${id}`)}>
                              <div className="preview">
                                  <img  src={renderedImage || sourceImage} alt="Project"
                                  />

                                  <div className="badge">
                                      <span>Community</span>
                                  </div>
                              </div>

                              <div className="card-body">
                                  <div>
                                      <h3>{name}</h3>

                                      <div className="meta">
                                          <Clock size={12} />
                                          <span>{new Date(timestamp).toLocaleDateString()}</span>
                                          <span>By JS Mastery</span>
                                      </div>
                                  </div>
                                  <div className="arrow">
                                      <ArrowUpRight size={18} />
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      </div>
  )
}
