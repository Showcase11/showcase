import React, { useState } from "react";
import "../App.css";
import Saly31 from '../Images/Saly-31.jpg';
import M11 from '../Images/11.jpg'
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const HappyShowCase = () => {
  const [focus, setFocus] = useState(false)
  return (
    <section className="stats">
      <div className="container justify-content-between">
        <div className="text-center">
          <h1 className="stats-heading mb-5 py-5">Happy to Showcase</h1>
          <p className="stats-info pb-5">
            All the local stores are now on showcase <br /> Grow your business
            by showcasing your products online.
          </p>
        </div>
        <div className="row text-center">

          <CountUp start={focus ? 0 : null} end={5} duration={5}>
            {({ countUpRef }) => (
              <VisibilitySensor onChange={isVisible => {
                if (isVisible) {
                  setFocus(true)
                }
              }}>
                <div className="col-sm-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <span className="card-title stats-card-heading" ref={countUpRef}></span>
                      <span className="card-title stats-card-heading" >K</span>
                      <p className="card-text stats-card-para">New Visitors</p>
                    </div>
                  </div>
                </div>

              </VisibilitySensor>
            )}
          </CountUp>

          <CountUp start={focus ? 0 : null} end={270} duration={5}>
            {({ countUpRef }) => (
              <VisibilitySensor onChange={isVisible => {
                if (isVisible) {
                  setFocus(true)
                }
              }}>
                <div className="col-sm-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <span className="card-title stats-card-heading" ref={countUpRef}></span>
                      <span className="card-title stats-card-heading" >+</span>
                      <p className="card-text stats-card-para">Seller accounts</p>
                    </div>
                  </div>
                </div>

              </VisibilitySensor>
            )}
          </CountUp>

          <CountUp start={focus ? 0 : null} end={100} duration={5}>
            {({ countUpRef }) => (
              <VisibilitySensor onChange={isVisible => {
                if (isVisible) {
                  setFocus(true)
                }
              }}>
                <div className="col-sm-4">
                  <div className="card border-0">
                    <div className="card-body">
                      <span className="card-title stats-card-heading" ref={countUpRef}></span>
                      <span className="card-title stats-card-heading" >%</span>
                      <p className="card-text stats-card-para">Business growth</p>
                    </div>
                  </div>
                </div>

              </VisibilitySensor>
            )}
          </CountUp>

        </div>
      </div>
      <a href="#"><img src={Saly31} alt="img3" className="img-fluid img3" /></a>
      <a href="#"><img src={M11} alt="img4" className="img-fluid img4" /></a>

    </section>
  );
};

export default HappyShowCase;
