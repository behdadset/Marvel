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
                .limit(50)
                .get(function(err, res) {
                    if (err) { throw err }
                    setCharacters(res)

                })
            })
    }, [])
    
    return (
        <div className="Characters">
            {characters &&
                characters.map((character, index) => {

                return (
                    
                    <div className="character" key={index}>
                        <div className="gallery">
                            <a href={character.id}>
                                <img src={character.thumbnail.path+'.'+character.thumbnail.extension} alt="Forest"  />
                            </a>
                            <div className="desc">{character.name}</div>
                        </div>
                        
                    </div>
                );
            })}
        </div>
    );
}
  
  export default Characters;