import{G as m,l as g,g as u}from"./index-BpKRf9zd.js";const f=[{id:1,title:"New Electronic Engineering Laboratory Opens",description:"Our department has just inaugurated a state-of-the-art electronics laboratory equipped with the latest instruments and tools for advanced research and education.",content:`We are excited to announce the opening of our new Electronic Engineering Laboratory, a cutting-edge facility that will enhance our research capabilities and provide students with hands-on experience using industry-standard equipment.

The laboratory features:
- Advanced oscilloscopes and signal generators
- Programmable logic analyzers
- High-frequency network analyzers
- PCB prototyping stations
- Microcontroller development boards

This investment demonstrates our commitment to providing the best educational experience for our students and advancing research in electronic engineering.`,author:"Prof. Dr. Andreas Komninos",publishedDate:"2025-01-15",category:"updates",featured:!0,imageUrl:"/logo.jpg",tags:["laboratory","equipment","education","research"],readTime:"3 min read",likes:42,views:1250},{id:2,title:"Student Team Wins National Robotics Competition",description:"Our undergraduate team secured first place in the National Robotics Challenge with their innovative autonomous navigation system.",content:`We are proud to announce that our student team "Circuit Breakers" has won first place in the National Robotics Competition 2025. The team, consisting of final-year Electronic Engineering students, developed an innovative autonomous navigation system that impressed judges with its accuracy and efficiency.

Team members:
- Maria Papadopoulos (Team Leader)
- Dimitris Kostas
- Elena Georgiou
- Nikos Alexandrou

Their project focused on creating a robot capable of navigating complex environments while avoiding obstacles and optimizing its path in real-time. This achievement showcases the exceptional talent and dedication of our students.`,author:"Student Affairs Office",publishedDate:"2025-01-10",category:"achievements",featured:!1,imageUrl:"/logo.jpg",tags:["robotics","competition","students","achievement"],readTime:"4 min read",likes:89,views:2100},{id:3,title:"Research Grant Awarded for IoT Security Project",description:"Our faculty received a significant research grant to develop advanced security protocols for Internet of Things devices.",content:`The Electronic Engineering Department has been awarded a substantial research grant from the European Research Council to develop next-generation security protocols for IoT devices.

The project, titled "SecureIoT: Advanced Cryptographic Protocols for Distributed Networks," will be led by Prof. Dr. Maria Stavrou and her research team. The grant will fund:

- Development of lightweight encryption algorithms
- Security analysis of existing IoT protocols
- Implementation of hardware security modules
- Collaboration with industry partners

This project positions our department at the forefront of IoT security research and will contribute to making connected devices more secure for everyone.`,author:"Research Office",publishedDate:"2025-01-05",category:"research",featured:!0,imageUrl:"/logo.jpg",tags:["IoT","security","research","grant"],readTime:"5 min read",likes:67,views:1800},{id:4,title:"Guest Lecture: Future of Artificial Intelligence in Engineering",description:"Join us for an inspiring guest lecture by Dr. Sophia Chen on the transformative role of AI in modern engineering practices.",content:`We are delighted to announce a special guest lecture by Dr. Sophia Chen, a renowned AI researcher from MIT, who will discuss "The Future of Artificial Intelligence in Engineering" on February 20th, 2025.

Dr. Chen will cover:
- Machine learning applications in circuit design
- AI-driven optimization in embedded systems
- Ethical considerations in AI engineering
- Career opportunities in AI engineering

This event is open to all students and faculty members. The lecture will be held in the main auditorium at 2:00 PM, with a Q&A session following the presentation.

Refreshments will be provided after the event, offering an excellent networking opportunity with our distinguished guest and fellow attendees.`,author:"Events Committee",publishedDate:"2025-02-01",category:"events",featured:!1,imageUrl:"/logo.jpg",tags:["AI","lecture","guest speaker","machine learning"],readTime:"2 min read",likes:34,views:890},{id:5,title:"Summer Internship Opportunities Available",description:"Exciting internship positions are now open at leading tech companies for Electronic Engineering students.",content:`We are pleased to announce that several prestigious technology companies have partnered with our department to offer summer internship opportunities for Electronic Engineering students.

Participating companies include:
- TechCorp Industries (Hardware Design)
- Innovation Labs (R&D Projects)
- CircuitWorks (PCB Design and Testing)
- FutureElectronics (Embedded Systems)
- SmartDevices Inc. (IoT Development)

Internship benefits:
- Hands-on experience with cutting-edge technology
- Mentorship from industry professionals
- Potential for full-time job offers
- Competitive compensation packages
- Professional development opportunities

Application deadline: March 15th, 2025. Interested students should submit their applications through the department's career portal.`,author:"Career Services",publishedDate:"2025-02-10",category:"opportunities",featured:!0,imageUrl:"/logo.jpg",tags:["internship","career","industry","students"],readTime:"3 min read",likes:156,views:3200},{id:6,title:"Department Celebrates 25 Years of Excellence",description:"The Electronic Engineering Department marks its 25th anniversary with a celebration of achievements and future aspirations.",content:`This year marks a significant milestone for our Electronic Engineering Department as we celebrate 25 years of academic excellence, groundbreaking research, and outstanding student achievements.

Over the past quarter-century, our department has:
- Graduated over 2,000 skilled engineers
- Published more than 500 research papers
- Secured funding for 50+ major research projects
- Established partnerships with 30+ industry leaders
- Developed innovative curricula adapted to industry needs

To commemorate this achievement, we will be hosting a special anniversary event on March 1st, 2025, featuring:
- Alumni reunion and networking session
- Exhibition of student projects and research
- Panel discussions with industry experts
- Awards ceremony recognizing outstanding contributions

We invite all students, faculty, alumni, and industry partners to join us in celebrating this remarkable journey and looking forward to the next 25 years of innovation and excellence.`,author:"Department Head",publishedDate:"2025-02-15",category:"announcements",featured:!0,imageUrl:"/logo.jpg",tags:["anniversary","celebration","milestone","alumni"],readTime:"4 min read",likes:203,views:4500}],v=[{value:"all",label:"All News",description:"All news articles and updates"},{value:"updates",label:"Updates",description:"Department and facility updates"},{value:"achievements",label:"Achievements",description:"Student and faculty achievements"},{value:"research",label:"Research",description:"Research projects and grants"},{value:"events",label:"Events",description:"Upcoming events and lectures"},{value:"opportunities",label:"Opportunities",description:"Internships and career opportunities"},{value:"announcements",label:"Announcements",description:"General announcements and news"}],h={articles:f,categories:v};class w{constructor(){this.storageKey="epictetus_news_data",this.data=this.loadFromStorage()||this.getDefaultData()}getDefaultData(){return{articles:[...h.articles],categories:[...h.categories],lastUpdated:new Date().toISOString()}}loadFromStorage(){try{const e=localStorage.getItem(this.storageKey);if(e){const t=JSON.parse(e);return{...this.getDefaultData(),...t,articles:t.articles||this.getDefaultData().articles}}}catch(e){console.warn("Error loading news data from storage:",e)}return null}saveToStorage(){try{return this.data.lastUpdated=new Date().toISOString(),localStorage.setItem(this.storageKey,JSON.stringify(this.data)),!0}catch(e){return console.error("Error saving news data to storage:",e),!1}}getAllArticles(){return[...this.data.articles]}getArticleById(e){return this.data.articles.find(t=>t.id===parseInt(e))}getArticlesByCategory(e){return e==="all"?this.getAllArticles():this.data.articles.filter(t=>t.category===e)}getFeaturedArticles(){return this.data.articles.filter(e=>e.featured)}searchArticles(e,t="all"){let n=t==="all"?this.getAllArticles():this.getArticlesByCategory(t);if(!e||e.trim()==="")return n;const o=e.toLowerCase();return n.filter(c=>c.title.toLowerCase().includes(o)||c.description.toLowerCase().includes(o)||c.content.toLowerCase().includes(o)||c.author.toLowerCase().includes(o)||c.tags.some(d=>d.toLowerCase().includes(o)))}addArticle(e){const n={id:Math.max(...this.data.articles.map(o=>o.id),0)+1,...e,publishedDate:e.publishedDate||new Date().toISOString().split("T")[0],likes:0,views:0,readTime:this.calculateReadTime(e.content)};return this.data.articles.unshift(n),this.saveToStorage(),n}updateArticle(e,t){const n=this.data.articles.findIndex(o=>o.id===parseInt(e));return n===-1?null:(this.data.articles[n]={...this.data.articles[n],...t,id:parseInt(e)},this.saveToStorage(),this.data.articles[n])}deleteArticle(e){const t=this.data.articles.findIndex(n=>n.id===parseInt(e));return t===-1?!1:(this.data.articles.splice(t,1),this.saveToStorage(),!0)}likeArticle(e){const t=this.getArticleById(e);return t?(t.likes++,this.saveToStorage(),t.likes):null}incrementViews(e){const t=this.getArticleById(e);return t?(t.views++,this.saveToStorage(),t.views):null}getCategories(){return this.data.categories.map(t=>({...t,count:t.value==="all"?this.data.articles.length:this.data.articles.filter(n=>n.category===t.value).length}))}calculateReadTime(e){const n=e.split(/\s+/).length;return`${Math.ceil(n/200)} min read`}resetToDefault(){return this.data=this.getDefaultData(),this.saveToStorage(),this.data}exportData(){return JSON.stringify(this.data,null,2)}importData(e){try{const t=JSON.parse(e);if(t.articles&&Array.isArray(t.articles))return this.data={...this.getDefaultData(),...t},this.saveToStorage(),!0;throw new Error("Invalid data format")}catch(t){return console.error("Error importing data:",t),!1}}}const i=new w,{getAllArticles:P,getArticleById:j,getArticlesByCategory:O,getFeaturedArticles:B,searchArticles:M,addArticle:N,updateArticle:R,deleteArticle:L,likeArticle:U,incrementViews:F,getCategories:W,calculateReadTime:G,resetToDefault:z,exportData:J,importData:K}=i,V=m("news",()=>{const s=g(!1),e=g(null),t=u(()=>i.getAllArticles()),n=u(()=>i.getFeaturedArticles()),o=u(()=>r=>i.getArticlesByCategory(r)),c=u(()=>r=>i.getArticleById(r)),d=u(()=>i.getCategories());return{isLoading:s,error:e,articles:t,featuredArticles:n,articlesByCategory:o,getArticleById:c,categories:d,addArticle:async r=>{s.value=!0,e.value=null;try{return await new Promise(l=>setTimeout(l,500)),{success:!0,article:i.addArticle(r)}}catch(a){return e.value=a.message,{success:!1,error:a.message}}finally{s.value=!1}},updateArticle:async(r,a)=>{s.value=!0,e.value=null;try{await new Promise(p=>setTimeout(p,300));const l=i.updateArticle(r,a);if(!l)throw new Error("Article not found");return{success:!0,article:l}}catch(l){return e.value=l.message,{success:!1,error:l.message}}finally{s.value=!1}},deleteArticle:async r=>{s.value=!0,e.value=null;try{if(await new Promise(l=>setTimeout(l,300)),!i.deleteArticle(r))throw new Error("Article not found");return{success:!0}}catch(a){return e.value=a.message,{success:!1,error:a.message}}finally{s.value=!1}},likeArticle:r=>i.likeArticle(r),incrementViews:r=>i.incrementViews(r),searchArticles:(r,a="all")=>i.searchArticles(r,a),clearError:()=>{e.value=null},resetToDefault:async()=>{s.value=!0,e.value=null;try{return await new Promise(r=>setTimeout(r,500)),i.resetToDefault(),{success:!0}}catch(r){return e.value=r.message,{success:!1,error:r.message}}finally{s.value=!1}},exportData:()=>i.exportData(),importData:async r=>{s.value=!0,e.value=null;try{if(await new Promise(l=>setTimeout(l,500)),!i.importData(r))throw new Error("Invalid data format");return{success:!0}}catch(a){return e.value=a.message,{success:!1,error:a.message}}finally{s.value=!1}}}});export{V as u};
