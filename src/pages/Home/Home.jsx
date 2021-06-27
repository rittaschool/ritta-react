import React, { Component, useEffect } from "react";
import { Header, Footer } from "../../components/admin";
import axios from "axios";
import { Link } from "react-router-dom";

const config = require('../../config.json')
function Account({ name, description, id }) {
  return ( 
    <div className="col-12 col-md-6 col-lg-6">
      <div className="card card-primary">
        <div className="card-header">
          <Link
            onClick={() => {
              localStorage.setItem('currentUser', id);
              window.location.href = '/home'
            }}
          ><h4>{name}</h4></Link>
        </div>
        <div className="card-body">
          <p>{description}</p>
          <div className="text-right">
            <Link className="btn btn-primary" onClick={() => {
              localStorage.setItem('currentUser', id);
              window.location.href = '/home'
            }}accounts>Valitse käyttäjä</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Accounts() {
  const [accounts, setAccounts] = React.useState([]);
  const getAccounts = () => {
    if (!localStorage.getItem('access')) {
      window.location.reload();
      return;
    }
    axios.post(`${config.apiBase}/api/v1/user/info`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    .then((res) => {
      setAccounts(res.data.accounts);
    })
  }

  useEffect(() => {
    getAccounts()
  })

  return (
    <>
    {accounts.map((item)=>{
      return <Account name={`${item.lastName} ${item.firstName}`} key={item.id} description={`Rooli ${item.userType}`}/>
    })}
    </>
  )
}
export class Home extends Component {
  componentDidMount() {
    localStorage.removeItem('currentUser')
  }
  render() {
    return (
      <>
        <Header />
        <div className="main-content">
          <section className="section">
            <div className="row">
              <Accounts />
            </div>
          </section>
        </div>
        <Footer />
      </>
      
    );
  }
}

export default Home;
