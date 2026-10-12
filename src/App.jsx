import {useState,useEffect} from 'react';

function App() {
  const [profile, setprofile] = useState(null);
  const [projects, setprojects] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('https://portfolio-api-oy4y.onrender.com/api/profile')
    .then((response) => response.json())
    .then((data) => setprofile(data));

    fetch('https://portfolio-api-oy4y.onrender.com/api/projects')
    .then((response) => response.json())
    .then((data) => setprojects(data));
},[]);

 function handleSubmit(event) {
  event.preventDefault();
  setStatus('Sending...');
  
  fetch('https://portfolio-api-oy4y.onrender.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Submission failed');
        }
        return response.json();
  })

  .then(() => {
    setStatus('Message sent!');
    setName('');
    setEmail('');
    setMessage('');
  })
  .catch(() => setStatus('Something went wrong. Please try again later.'));
}

if (!profile) {
  return <div>Loading...</div>;
}

return(
<div className="container">
  <header className="hero">
    <h1>{profile.name}</h1>
    <p className="title">{profile.title}</p>
    <p className="bio">{profile.bio}</p>
  </header>

<section>
  <h2>Projects</h2>
  <ul className="project-list">
      {projects.map((project) => (
        <li key={project.title} className="project-card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p className="tech">{project.techStack}</p>
          <a href={project.link} target="_blank" rel="noreferrer">
          View on GitHub →
        </a>
          </li>
      ))}
  </ul>
</section>
<section>
  <h2>Contact Me</h2>
  <form className="contact-form" onSubmit={handleSubmit}>
     <div className="form-field">
      <label htmlFor="name">Name</label>
      <input 
      id="name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="form-field">
      <label htmlFor="email">Email</label>
          <input
          id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
    </div>
    <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
    </div>
    <button type="submit">Send</button>
      </form>
      {status && <p className="form-status">{status}</p>}
</section>
</div>
);
}
export default App;
