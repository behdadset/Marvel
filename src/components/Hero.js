import React,{ useEffect,  useState } from 'react'
import { withRouter } from 'react-router'
import Marvel from '../utils/marvelApi'
import fire from './fire'

function Hero(props) {
    const [hero, setHero] = useState(null)
    const [count, setCount] = useState("1")

    useEffect(() => {
        Marvel.characters
            .id(props.match.params.id)
            .get(function(err, resp) {
                if (err) {
                    console.log("Error: ", err) 
                }
                else { 
                    setHero(resp[0])
                }
        })
    }, [])

    const addToCard = () =>{
        fire.database().ref().child(props.userId).child('ShopList').child(props.match.params.id).set(count)
    }

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
            <div >
                <p>Price:</p>
                <div className="row">
                    <label htmlFor="example-number-input" className="col-2 col-form-label">Number</label>
                    <div>
                        {hero &&       
                            <input id="count" onChange={(e)=>setCount(e.target.value)} className="form-control" type="number" value={count} min="1" max={hero.events.available} id="example-number-input" />
                        }
                        <button onClick={addToCard} className="btn btn-info btn-lg btn-block btn-huge">Add to card</button>
                        <button className="btn btn-primary btn-lg btn-block btn-huge">Buy it now</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default withRouter(Hero)