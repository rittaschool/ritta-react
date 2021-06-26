import React, { Component, useEffect } from "react";
import { Header, Footer } from "../../components/admin";
import axios from "axios";
import { Link } from "react-router-dom";

const config = require('../../config.json')
function Account({ name, description, id }) {
  return ( 
    <div class="col-12 col-md-6 col-lg-6">
      <div class="card card-primary">
        <div class="card-header">
          <Link
            onClick={() => {
              localStorage.setItem('currentUser', id);
              window.location.href = '/home'
            }}
          ><h4>{name}</h4></Link>
        </div>
        <div class="card-body">
          <p>{description}</p>
          <div class="text-right">
            <Link class="btn btn-primary" onClick={() => {
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
      return <Account name={`${item.lastName} ${item.firstName}`} id={item.id} description={`Rooli ${item.userType}`}/>
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
            <div class="row">
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
