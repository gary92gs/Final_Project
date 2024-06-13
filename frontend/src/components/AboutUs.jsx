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
      dog: null,
      description: null,
    },
    Garrett:{
      dog: null,
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
      <div className='about-us-container'>
        <h1>About Us</h1>
        {Object.entries(admin).map(([name, details]) => (
          <article className="admin-article" key={name}>
            <h2>{name}</h2>
            <p>{details.description}</p>
            <img src={details.dog} alt={`${name}'s dog`} />
          </article>
        ))}
      </div>    
    </>
  )
}

export default AboutUs