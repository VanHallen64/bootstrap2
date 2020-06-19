import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Patients from './patients';
import Home from './home';

import client from './feathers';

class Application extends Component {
  
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  componentDidMount() {
    const patientService = client.service('patients');
    
    patientService.find({
      query: {
        $limit: 25
      }
    }).then( patientPage => {
      const patients = patientPage.data;

      this.setState({ patientService, patients });
    });

    // Remove a patient from the list
    patientService.on('removed', patient => {
      ////////////////////////////////////////////////////
      // STEP 15
      // WRITE THE THE CODE TO HANDLE THE REMOVAL OF A CAR
      // START v
      ////////////////////////////////////////////////////


      ////////////////////////////////////////////////////
      // END ^
      ////////////////////////////////////////////////////
    });
    

    // Add new car to the car list
    patientService.on('created', patient => this.setState({
      patients: this.state.patients.concat(patient)
    }));

  }

  render() {
    return (
    <Router>
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal"><Link className="p-2 text-dark" to="/">CPSC 2650 Bootstrap</Link></h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <Link className="p-2 text-dark" to="/patients">Patients</Link>
          </nav>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/patients">
            <Patients patients={this.state.patients} patientService={this.state.patientService} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
}

export default Application;
