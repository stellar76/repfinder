import React from 'react'
import axios from 'axios'

const RepFinder = React.createClass({
   getInitialState() {
    return {
    apiKey: '**YOUR GOOGLE DEV API KEY**',
    replist: '',
    curZip: '',
    preLink: 'https://www.googleapis.com/civicinfo/v2/representatives?key=',
    sufLink: '&roles=legislatorlowerbody&roles=legislatorupperbody'
   }
  },
  componentDidMount() {},
  getData(e) {
    if (e.key === 'Enter'){
      if(e.target.value === ''){
        alert('You have to enter something.')
      }
      else{
      this.setState({curZip: e.target.value})
      axios.get(this.state.preLink + this.state.apiKey + '&address=' + e.target.value + this.state.sufLink).then((result) => {
        let x = result.data.officials
        this.setState({
          replist: x.map(r =>
            <li>
                <span className="photo"><img src={r.photoUrl} alt={r.name}/></span>
                <span className="name">{r.name}</span>
                <span className="address">{r.address[0].line1}<br/>{r.address[0].city} {r.address[0].state}, {r.address[0].zip}</span>
                <span className="phone">{r.phones[0]}</span>
                <span className="social">
                {r.channels.map ((socs) => {
                    if(socs.type === 'Facebook'){
                      return <a href={'http://www.facebook.com/' + socs.id} className="ion-social-facebook"></a>
                    }
                    if(socs.type === 'Twitter'){
                      return <a href={'http://www.twitter.com/' + socs.id} className="ion-social-twitter"></a>
                    }
                })}
                </span>
          </li>
          )
        })
      })
    }
  }
  },
  render() {
    return (
      <div className="fr-tool">
        <h3>Contact Your Representatives</h3>
        <div className="fr-block form">
          <input type="text" placeholder="Enter your address or zip" id="frinput" onKeyPress={this.getData}/>
        </div>
        <div className="fr-block">
          <ul id="frresults">
            {this.state.replist}
          </ul>
        </div>
      </div>
    );
  }
})

export default RepFinder
