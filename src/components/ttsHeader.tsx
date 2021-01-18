import React from "react";
import Clock from "./clock";

export default function TtsHeader() {
  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="field has-addons has-addons-centered">
              <p className="control">
                <span className="select is-small">
                  <select>
                    <option>Google</option>
                    <option>Naver</option>
                  </select>
                </span>
              </p>
              <p className="control">
                <input
                  type="text"
                  className="input is-small"
                  placeholder="Search..."
                />
              </p>
              <p className="control">
                <a className="button is-primary is-small is-outlined">Search</a>
              </p>
            </div>
          </div>
          <div className="navbar-item">
            <input type="month" className="input is-small" />
          </div>
        </div>
        <div className="navbar-end pr-5">
          <Clock />
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <span className="icon">
                <i className="fas fa-cog" />
              </span>
            </a>
            <div className="navbar-dropdown is-right">
              <a className="navbar-item">
                <div className="field">
                  <input
                    type="checkbox"
                    id="Dark Mode"
                    className="checkbox mr-1"
                    checked
                  />
                  <label htmlFor="Dark Mode">Dark Mode</label>
                </div>
              </a>
              <a className="navbar-item">
                <span>GitHub</span>
                <span className="icon">
                  <i className="fab fa-github" />
                </span>
              </a>
              <a className="navbar-item">개발 예정 리스트</a>
              <hr className="navbar-divider" />
              <div className="navbar-item">Login ID</div>
              <div className="navbar-item">Version 0.9.1</div>
            </div>
          </div>
        </div>
        {/*<div className="navbar-end">*/}
        {/*  <div className="navbar-item">*/}
        {/*    <div className="buttons">*/}
        {/*      <a className="button is-primary">*/}
        {/*        <strong>Sign up</strong>*/}
        {/*      </a>*/}
        {/*      <a className="button is-light">Log in</a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </nav>
  );
}
