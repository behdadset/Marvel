import React,{ useEffect,  useState } from 'react'
import { withRouter } from 'react-router'
import Marvel from '../utils/marvelApi'

function Hero(props) {
    const [hero, setHero] = useState(null)

    useEffect(() => {
        Marvel.characters
            .id(props.match.params.id)
            .get(function(err, resp) {
                if (err) {
                    console.log("Error: ", err) 
                }
                else { 
                    console.log(resp)
                    setHero(resp[0])
                }
        })
    }, [])
    return (
        <div className="heros">
            {hero &&
                <h1 className="title">{hero.name}</h1>
            }<br/><br/>
            <div className="row">
                {hero &&
                    <img className="heroImage" src={hero.thumbnail.path+'.'+hero.thumbnail.extension} alt="Forest"  />
                }
                <div className="col-md-6">
                    <span className="flaticon-analysis"></span>
                    
                    
                    {hero &&       
                        <h5>{hero.description}</h5>
                    }<br/><br/>
                    
                    <div className="row">
                        <div className="col-md-6">
                            <h4>When I Am Working</h4>
                            <h5>Time flies by, I make sure I am immersed in my chosen project or projects. I love solving problems and overcoming challenges. Being a programmer is about dealing with a series of obstacles and learning how to overcome them.</h5>

                        </div>
                        <div className="col-md-6">
                            <h4>In My Spare Time</h4>
                            <h5>Swim, Sun, Sport, Friends and Learn. It is important to enjoy the simple things in life and to be able to share the big events with the people that matter.</h5>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Hero)