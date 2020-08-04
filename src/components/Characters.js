import React, { useEffect, useState } from 'react';
import Marvel from '../utils/marvelApi'

function Characters() {

    const [characters, setCharacters] = useState(null)
    useEffect(() => {
      
        
        Marvel.events
            .name("civil war")
            .get(function(err, res) {
                if (err) { throw err }
                var eventId = res[0].id

                Marvel.characters
                .events(eventId)
                .limit(100)
                .get(function(err, res) {
                    if (err) { throw err }
                    setCharacters(res)
                    console.log(res)

                })
            })
    }, [])
    
    return (
        <div className="Characters">
            <div className='hover'>hover over me</div>
            {!characters &&
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            }
            {characters &&
                characters.map((character) => {
                    return (
                        <a href={"/hero/"+character.id} key={character.id}>
                            <div className="character">
                                <div className="gallery">
                                    <img className="characterImage" src={character.thumbnail.path+'.'+character.thumbnail.extension} alt="Forest"  />
                                    <div className="desc">
                                        <p>{character.name}</p>
                                        <p > Price: ${character.events.available}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    );
            })}
        </div>
    );
}
  
  export default Characters;