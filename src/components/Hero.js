import React,{ useEffect,  useState } from 'react'
import { withRouter } from 'react-router'
import Marvel from '../utils/marvelApi'
import fire from './fire'
import {Alert} from 'reactstrap'
function Hero(props) {
    const [hero, setHero] = useState(null)
    const [count, setCount] = useState("1")
    const [visibile, setVisible] = useState(false)
    const [visibileErr, setVisibleErr] = useState(false)
    const [visibileErrMin, setVisibleErrMin] = useState(false)

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
    }, [props.userId])

    const addToCard = () =>{

        if (count > hero.events.available){
            setVisibleErr(true)
        } else if(count < 1 && count%1===0){
            setVisibleErrMin(true)
        }else{
            fire.database().ref().child(props.userId).child('ShopList').child(props.match.params.id).set(count)
            setVisible(true)
            
        }
        
    }

    const closeNotification = () => {
        setVisible(false)
        setVisibleErr(false)
        setVisibleErrMin(false)
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
                    }<br/>
                    
                    <div className="row">
                        <div className="col-md-6">
                        <br/>
                            {hero &&
                                <h4><b>{hero.comics.available}</b> Comics</h4>
                            }
                            <div className="comicsList">
                                {hero &&
                                    hero.comics.items.map((item) =>{
                                            return(
                                                <p>{item.name}</p>
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>
                        
                        <div className="col-md-6">
                        <br/>
                            {hero &&
                                <h4>Just <b>{hero.events.available}</b> of {hero.name} is left in stock</h4>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div >
            
                {hero &&
                    <h5 className="priceTag">Price: <b>${hero.events.available}</b></h5>
                }
                {hero &&
                    <Alert className="notification" isOpen={visibile} toggle={closeNotification}>{count} {hero.name} added to card</Alert>
                }
                {hero &&
                    <Alert className="notification" isOpen={visibileErr} toggle={closeNotification}>You can't add more than {hero.events.available}</Alert>
                }
                {hero &&
                    <Alert className="notification" isOpen={visibileErrMin} toggle={closeNotification}>You can't add {count}</Alert>
                }
                <div className="row">
                    {fire.auth().W &&
                        <label htmlFor="example-number-input" className="col-2 col-form-label">Quantity:</label>
                    }
                    <div className="addDiv">
                        {hero && fire.auth().W &&  
                            <input id="count" onChange={(e)=>setCount(e.target.value)} className="form-control" type="number" value={count} min="1" max={hero.events.available} />
                        }
                        {fire.auth().W &&
                            <button onClick={addToCard} className="btn btn-info btn-lg btn-block btn-huge">Add to card</button> 
                        }
                        
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default withRouter(Hero)