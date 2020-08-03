import React, { useEffect, useState } from 'react';
import Marvel from '../utils/marvelApi'

function Characters() {

    const [characters, setCharacters] = useState([])
    useEffect(() => {
      Marvel.characters.name("hulk").get((err, res) => {
        setCharacters(res)
        console.log(res[0].thumbnail.path+'.'+res[0].thumbnail.extension)
      })
  
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
              res.forEach(function(chr) {
                console.log(chr.name + " " + (!!chr.thumbnail ? (chr.thumbnail.path + "." + chr.thumbnail.extension) : ""))
              })
            })
          })
    }, [])
    
    return (
      <div className="Characters">
        
      </div>
    );
  }
  
  export default Characters;