import TopNavBar from './TopNavBar'
import '../styles/global.css'
import '../styles/AboutUs.css'
function AboutUs({
  isMobile, 
  setCurrentItemId,
  setSearchResults
}) {

  const admin = {
    Liam: {
      dog: 'https://th.bing.com/th/id/OIP.MeIvdF9Z8JVkWCPkuOrKPAHaFS?rs=1&pid=ImgDetMain',
      description: 'Learning to code',
    },
    Kai: {
      dog: 'https://cdn.discordapp.com/attachments/1232481063415320576/1250586864717402162/Reuben.jpg?ex=666b7b47&is=666a29c7&hm=f9ed073159c91e9b9b53dd51c18fa02c931c15e4b2276e426076ff59889cf5b4&',
      description: null,
    },
    Garrett:{
      dog: 'https://cdn.discordapp.com/attachments/1232481063415320576/1250593929062125672/garret.png?ex=666b81db&is=666a305b&hm=e0f44edf73ca9d4bcb31d8eaf82d2616535cb00a326e1c9a51762d1c741ba3d5&',
      description: null,
    },
    Shad:{
      dog: null,
      description: null,
    }
  };

  return (
    <>
      <TopNavBar 
        isMobile={isMobile}
        setCurrentItemId={setCurrentItemId}
        setSearchResults={setSearchResults}
        />
        <div className='about-us'>
        <h1 className='about-us-header'>About Us</h1>
      <div className='about-us-container'>
        {Object.entries(admin).map(([name, details]) => (
          <article className="admin-article" key={name}>
            <h2>{name}</h2>
            <p>{details.description}</p>
            <img src={details.dog} alt={`${name}'s dog`} />
          </article>
        ))}
      </div>    
      </div>
    </>
  )
}

export default AboutUs