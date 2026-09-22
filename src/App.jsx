import {useState,useEffect} from 'react';

function App() {
  const [profile, setprofile] = useState(null);
  const [projects, setprojects] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/profile')
    .then((response) => response.json())
    .then((data) => setprofile(data));

    fetch('http://localhost:8080/api/projects')
    .then((response) => response.json())
    .then((data) => setprojects(data));
},[]);

 function handleSubmit(event) {
  event.preventDefault();
  setStatus('Sending...');
  
  fetch('http://localhost:8080/api/contact', {
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
<div>
  <h1>{profile.name}</h1>
  <h2>{profile.title}</h2>
  <p>{profile.bio}</p>

  <h2>Projects</h2>
  <ul>
      {projects.map((project) => (
        <li key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><em>{project.techStack}</em></p>
          <a href={project.link}>View on GitHub</a>
          </li>
      ))}
  </ul>

  <h2>Contact Me</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label>Name:</label>
      <input 
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div>
      <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
    </div>
    <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
    </div>
    <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
</div>
);
}
export default App;
