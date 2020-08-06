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
        fire.database().ref(`rs9RPVsIaZYZzHkdatOCFxy5CD83/ShopList`).on("value",res => {
            setShopList(res.val())
          })
    }, [])

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
                <img className="cardImage" src={this.state.url}></img>
            )
        }
    }

    class Price extends React.Component {
        constructor(){
            super()
            this.state={
                price: ""
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
                }
            })
        }
        render(){
            return(
                <p>${this.state.price}</p>
            )
        }
    }
    
    const checkList=()=>{
        console.log(shopList)
    }

    return (
        <div className="cardList">
            {!shopList &&
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            }
            {list &&
                list.map((item) => {
                    return (
                        <div className="gallery">
                            <Pic  id={item}/>
                            <div className="countPrice">
                                
                                <Price id={item}/>
                                <p>X {Object.values(shopList[item])}</p>
                            </div>
                            <button className="removeBtn btn btn-danger">Remove</button>
                            
                        </div>  
                    );
            })}
            
            <div className="buy">
                {shopList && <p>You have {list.length} hero(s) in your card.</p>}
                
                
                <button className="btn btn-info" onClick={checkList}>List</button>
            </div>
            
            
        </div>
    )
}


