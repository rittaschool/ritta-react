import React, { Component, useEffect } from "react";
import { Header, Footer } from "../../components/admin";
import axios from "axios";
import { Link } from "react-router-dom";

const config = require('../../config.json')

function Messages() {
  const [messages, setMessages] = React.useState("");
  const getAccounts = () => {
    if (!localStorage.getItem('access')) {
      window.location.reload();
      return;
    }
    axios.post(`${config.apiBase}/api/v1/messages/list`, {
      account_id: localStorage.getItem('currentUser')
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    .then((res) => {
      setMessages(res.data);
    })
  }

  useEffect(() => {
    getAccounts()
  }, [])

  console.log(messages);
  return (
    <>
      
      {messages === "" ? "Odota hetki" : messages.map((message) => message.newMessages).reduce((a, b) => a + b, 0)} uutta viestiä
    </>
  )
}

export class AccountHome extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="main-content">
          <section className="section">
            <div className="row">
              <div class="card card-primary">
                  <div class="card-header">
                    <h4>Viestit</h4>
                  </div>
                  <div class="card-body">
                    <p><Messages /></p>
                  </div>
                </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
      
    );
  }
}

export default AccountHome;
