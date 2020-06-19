import React, { Component } from 'react';

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };


  }
  


  deletePatient(id, ev) {
    // HERE IS YOUR HANDLE TO THE BACKEND CAR SERVICE
    const { patientService } = this.props;

    /////////////////////////////////////////////////
    // WRITE THE CODE HERE TO REMOVE THE SELECTED CAR
    // START v
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////
    // END ^
    /////////////////////////////////////////////////
  }
  
  handleSubmit(ev) {
    // HERE IS YOUR HANDLE TO THE BACKEND CAR SERVICE
    const { patientService } = this.props;
    
    ///////////////////////////////////////
    // WRITE THE CODE HERE TO ADD A NEW CAR
    // START v
    ///////////////////////////////////////



    ///////////////////////////////////////
    // END ^
    ///////////////////////////////////////
    
    ev.preventDefault();
  }

  render() {
    const { patients } = this.props;

    return(
    <div>
      <div className="py-5 text-center">
        <h2>Patients</h2>
      </div>

      <div className="row">
        <div className="col-md-12 order-md-1">
          <form onSubmit={this.handleSubmit} className={this.state.formclass} noValidate id="carform">
            <div className="row">
              
            </div>
            <button className="btn btn-primary btn-lg btn-block" type="submit">Add patient</button>
          </form>
        </div>
      </div>
      
      <table className="table">
        
      </table>

      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">&copy; 2020 CPSC 2650</p>
      </footer>
    </div>
    );
  }
}

export default Patients;
