import React, { useEffect,  useState } from 'react'
import fire from './fire'
import Marvel from '../utils/marvelApi'

export default function Card(props) {
    const [shopList, setShopList] = useState(null)    
    let list = []
    
    if(shopList){
        list = Object.keys(shopList)
    }

    useEffect(() => {
        if(props.userId){
            fire.database().ref(`${props.userId}/ShopList`).on("value",res => {
                setShopList(res.val())
            })
        }

    }, [props.userId])

    class Pic extends React.Component {
        constructor(){
            super()
            this.state={
                url: ""
            }
        }
        componentDidMount(){
            Marvel.characters
            .id(this.props.id)
            .get( (err, resp) => {
                if (err) {
                    console.log("Error: ", err)  
                }
                else { 
                    this.setState({url: resp[0].thumbnail.path+'.'+resp[0].thumbnail.extension})
                }
            })
        }
        render(){
            return(
                <img alt="cardList" className="cardImage" src={this.state.url}></img>
            )
        }
    }

    class Price extends React.Component {
        constructor(){
            super()
            this.state={
                price: 0
            }
        }
        componentDidMount(){
            Marvel.characters
            .id(this.props.id)
            .get( (err, resp) => {
                if (err) {
                    console.log("Error: ", err)  
                }
                else { 
                    this.setState({price: resp[0].events.available})
                    //this.props.addToTotal(resp[0].events.available)
                }
            })
        }
        
        
        render(){
            return(
                <div>
                    <p>${this.state.price}</p>
                
                    <p>${(this.state.price)*Object.values(shopList[this.props.id])[0]}</p>
                    
                </div>
            )
        }
    }

    const remove = () => {
        fire.database().ref().child(props.userId).child('ShopList').remove()

    }

    return (
        <div className="row">
            <div className="col-md-8">
                
                {list &&
                    list.map((item) => {
                        return (
                            <div className="gallery">
                                <Pic  id={item}/>
                                <div className="countPrice">
                                    
                                    <Price id={item}/>
                                    <p>X {Object.values(shopList[item])}</p>
                                </div>
                                
                            </div>  
                        );
                })}
                
            </div>
            
            <div className="cardList col-md-4">
            <br/><br/><br/>
                {shopList && <p>You have {list.length} hero(s) in your card.</p>}
                {!shopList && <p>Wait a few seconds to load you shop list or you havn not added any hero in your card.</p>}
                {shopList &&
                    <button onClick={remove} className="cardBtn btn btn-danger">Remove All</button>
                }<br/><br/><br/>
                {shopList &&
                    <button onClick={remove} className="cardBtn btn btn-info">Buy All</button>
                }
            </div>
            
        </div>
    )
}


