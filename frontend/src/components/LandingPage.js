import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const LandingPage = ({ username, onLogout }) => {
  const [view, setView] = useState("home");
  const [allServices, setAllServices] = useState([]);
  const [reqService, setReqService] = useState([]);

 
useEffect(() => {
  const token=sessionStorage.getItem('jwt');
  console.log("view is "+view);
  
    if (view === "request") {

      axios.get("/services", {headers: {Authorization: token}})
        .then((res) => setAllServices(res.data))
        .catch(() => setAllServices([]));
    }
  
    if (view === "view") {
      
      axios.get(`/requested_services/${username}`, {headers: {Authorization: token}})
        .then((res) => setReqService(res.data))
        .catch(() => setReqService([]));
    }
  }, [view,username]);
  
  const requestingServices = (service_id) => {
    const token=sessionStorage.getItem('jwt');
    axios.post("/request_service", {
      username: username,
      service_id: service_id
    }, {headers: {Authorization: token}})
      .then((res) => alert(res.data.message))
      .catch(() => alert("Request failed"));
  };

  return (
    <div>
      <Navbar setView={setView} onLogout={onLogout} />

      <div className="container mt-4">
        {view === "home" && (
          <div className="About-us">
            <h1>Welcome, {username} to the Cloud Dashboard</h1>
            <p>At Meracloud Networks, we redefine the way businesses manage their IT infrastructure. 
              Inspired by the simplicity and power of cloud-native architectures, our platform delivers centralized 
              cloud management for secure networks, smart devices, and scalable operations — all from a single pane of glass.</p>
          <br></br>
          <p>We specialize in cloud-managed networking, offering solutions that combine enterprise-grade security, zero-touch provisioning,
             and real-time visibility into every part of your infrastructure — from access points and switches to firewalls and smart cameras.</p>
          <h2>Our Mission</h2>
          <li>Plug-and-play network deployment</li>
          <li>Advanced threat detection and cloud-based security</li>
          <li>Remote monitoring and real-time analytics</li>
          <li>Seamless scalability across branches and geographies</li>
         <br></br>
          <h4>With Meracloud, IT becomes intuitive, scalable, and future-ready. 
            Let us help you power smarter, safer networks — with the cloud at the core</h4>
          </div>
          
        )}

        {view === "request" && (
          <div>
            <h2>Requesting services</h2>
            <br></br>
            {allServices.map((service) => (
              <div className="req-services" key={service.id}>
                <h5>{service.name}</h5>
                <button className="request-btn" onClick={() => requestingServices(service.id)}>
                  Request
                </button>
              </div>
            ))}
          </div>
        )}

        {view === "view" && (
          <div>
            <h2>Used services</h2>
            <br></br>
            <ul className="used-services-list">
              {reqService.map((s, i) => (
                <li className="used-list" key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
