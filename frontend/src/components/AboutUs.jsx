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
      dog: 'https://media.discordapp.net/attachments/1232481063415320576/1251222963961987204/IMG_6361.jpg?ex=667268f1&is=66711771&hm=2b52ad01a9a783773db8bda75fef72212c50de3618b9f4a23067624f6a31b22d&=&format=webp&width=677&height=903',
      description: 'https://github.com/LiamGunning07',
    },
    Kai: {
      dog: 'https://media.discordapp.net/attachments/1232481063415320576/1250586864717402162/Reuben.jpg?ex=6672bb87&is=66716a07&hm=dd310a16de3af4412f111b2ee301e42452850db81042af22aa7a39c8b12f73f7&=&format=webp&width=977&height=904',
      description: 'https://github.com/k-j-t-w',
    },
    Garrett:{
      dog: 'https://media.discordapp.net/attachments/1232481063415320576/1250593929062125672/garret.png?ex=6672c21b&is=6671709b&hm=64be2a3c8d985c4f46e1a9d74ca395a8bbe5a4e571e43b89dea238feb54db96a&=&format=webp&quality=lossless&width=843&height=904',
      description: 'https://github.com/gary92gs',
    },
    Shad:{
      dog: 'https://media.discordapp.net/attachments/1232481063415320576/1250866950050156604/Shad.jpg?ex=66726ee0&is=66711d60&hm=bbce22b9547ab02761a09670888493c85e302082d65a4c9595a4c7259a15e7bd&=&format=webp&width=864&height=904',
      description: 'https://github.com/RiceRak',
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