import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        province: '',
        postalCode: '',
        lowestSysPressure: undefined,
        highestSysPressure: undefined,
        formclass: '',
        highestSysPressureMessage: 'A valid highest systolic blood pressure is required',
        lowestSysPressureMessage: 'A valid lowest systolic blood pressure is required',
        emailMessage: 'A valid email is required',
        lowestSysPressureClass: 'form-control',
        highestSysPressureClass: 'form-control',
        emailClass: 'form-control',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleProvinceChange = this.handleProvinceChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleLowestSysChange = this.handleLowestSysChange.bind(this);
    this.handleHighestSysChange = this.handleHighestSysChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  //Helper functions
  createOption(province) {
    let option = document.createElement('option');
    option.textContent = province.toUpperCase();
    option.value = province;
    return option;
  }

  appendChildren(parent, children) {
      children.forEach(function(child) {
          parent.appendChild(child);
      });
  }

  patternChooser(country) {
      if (country == "canada") {
          return "[A-Z0-9]{6}"
      } else {
          return "[0-9]{5}|[0-9]{5}\-[0-9]{4}"
      }
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleCountryChange(event) {
    this.setState({country: event.target.value});

    let provinces = [];
    let provinceOptions =[];
    let dropdown = document.createElement("select");
    let labelPlaceholder = document.createElement('option');

    labelPlaceholder.value = "";
    provinceOptions.push(labelPlaceholder);
    dropdown.className = "form-control";
    dropdown.value=this.state.country;
    dropdown.id = "province-state";
    dropdown.required = true;
    dropdown.onChange = this.handleProvinceChange;
    if(event.target.value == "canada") {
        labelPlaceholder.textContent = "Select province...";
        provinceOptions.push(labelPlaceholder);
        provinces = ["ab", "bc", "mb", "nb", "nl", "ns", "nt", "nu", "on", "pe", "qc", "sk", "yt"];    
    } else if (event.target.value == "usa") {
        labelPlaceholder.textContent = "Select state...";
        provinceOptions.push(labelPlaceholder);
        provinces = ["al", "ak", "az", "ar", "ca", "co", "ct", "de", "dc", "fl", "ga", "hi", "id"];
    }
    for(let index in provinces) {
        provinceOptions.push(this.createOption(provinces[index]));
    }
    this.appendChildren(dropdown, provinceOptions);
    let oldDropdown = document.getElementById('province-state');
    oldDropdown.parentNode.replaceChild(dropdown, oldDropdown);
  }

  handleProvinceChange(event) {
    this.setState({province: event.target.value.toUpperCase()});
  }

  handlePostalCodeChange(event) {
    this.setState({postalCode: event.target.value.toUpperCase()});
  }

  handleLowestSysChange(event) {
    this.setState({lowestSysPressure: event.target.value});

  }

  handleHighestSysChange(event) {
    this.setState({highestSysPressure: event.target.value});
  }
  
  handleSubmit(ev) {
    // HERE IS YOUR HANDLE TO THE BACKEND PATIENT SERVICE
    const { patientService } = this.props;
    
    ///////////////////////////////////////
    // WRITE THE CODE HERE TO ADD A NEW PATIENT
    // START v
    ///////////////////////////////////////
    if (ev.target.checkValidity()) {
        patientService.create({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            country: this.state.country,
            province: this.state.province,
            postalCode: this.state.postalCode,
            lowestSysPressure: this.state.lowestSysPressure,
            highestSysPressure:this.state.highestSysPressure
        })
        .then(() => {
          console.log("Created new patient.")
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                country: '',
                province: '',
                postalCode: '',
                lowestSysPressure: undefined,
                highestSysPressure: undefined,
                formclass: '',
                highestSysPressureMessage: '',
                lowestSysPressureMessage: '',
                emailMessage: 'A valid email is required',
                lowestSysPressureClass: 'form-control',
                highestSysPressureClass: 'form-control',
                emailClass: 'form-control',
                errorField: ''
            });
        })
        .catch(error => {
            switch(error.message) {
                case 'Lowest systolic blood pressure must be between 30 and 300':
                    this.setState({
                        formclass: '',
                        lowestSysPressureMessage: error.message,
                        lowestSysPressureClass: 'form-control is-invalid'
                    });
                  break;
                case 'Highest systolic blood pressure must be between 30 and 300':
                    this.setState({
                        formclass: '',
                        highestSysPressureMessage: error.message,
                        highestSysPressureClass: 'form-control is-invalid'
                    });
                  break;
                case 'Email is already in the system':
                    this.setState({
                        formclass: '',
                        emailMessage: error.message,
                        emailClass: 'form-control is-invalid'
                    });
            }
        });
    } else {
        this.setState({
            formclass: 'was-validated',
            lowestSysPressureMessage: 'A valid lowest systolic blood pressure is required.',
            highestSysPressureMessage: 'A valid highest systolic blood pressure is required.',
            emailMessage: 'A valid email is required',
            lowestSysPressureClass: 'form-control',
            highestSysPressureClass: 'form-control',
            emailClass: 'form-control'
        });
    }


    ///////////////////////////////////////
    // END ^
    ///////////////////////////////////////
    
    ev.preventDefault();
  }

  render() {
    const { patients, t } = this.props;

    return(
    <div>
      <div className="py-5 text-center">
        <h2>{t('tab')}</h2>
      </div>
      <div className="row">
        <div className="col-md-12 order-md-1">
          <form onSubmit={this.handleSubmit} className={this.state.formclass} noValidate id="patientform">
            <div className="row">
                <div className="col-lg-4 col-md-6 mb-3">
                    
                    <label htmlFor="firstName">{t('labels.first')}</label>
                    <input type="text" className="form-control" id="firstName"
                    value={this.state.firstName} required onChange={this.handleFirstNameChange} />
                    <div className="invalid-feedback">
                      {t('feedback.first')}
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    <label htmlFor="lastName">{t('labels.last')}</label>
                    <input type="text" className="form-control" id="lastName"
                    value={this.state.lastName} required onChange={this.handleLastNameChange} />
                    <div className="invalid-feedback">
                      {t('feedback.last')}
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    <label htmlFor="email">{t('labels.email')}</label>
                    <input type="text" className={this.state.emailClass} id="email"
                    value={this.state.email} required onChange={this.handleEmailChange} />
                    <div className="invalid-feedback">
                        {this.state.emailMessage}
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-3">
                    <label htmlFor="country">{t('labels.country.label')}</label>
                    <select className="form-control" id="country"
                    value={this.state.country} required onChange={this.handleCountryChange}>
                        <option value="">{t('labels.country.options.select')}</option>
                        <option value="canada">{t('labels.country.options.canada')}</option>
                        <option value="usa">{t('labels.country.options.usa')}</option>
                    </select>
                    <div className="invalid-feedback">
                      {t('feedback.country')}
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 mb-3">
                    <label htmlFor="province-state">{t('labels.province.label')}</label>
                    <select className="form-control" id="province-state"
                    value={this.state.province} required onChange={this.handleProvinceChange}>
                        <option value="">{t('labels.province.options.select')}</option>
                    </select>
                    <div className="invalid-feedback">
                      {t('feedback.province')}
                    </div>
                </div>
                <div className="col-lg-2 col-sm-6 mb-3">
                    <label htmlFor="postalCode">{t('labels.postalCode')}</label>
                    <input type="text" className="form-control" id="postal-code" pattern={this.patternChooser(this.state.country)}
                    value={this.state.postalCode} required onChange={this.handlePostalCodeChange} />
                    <div className="invalid-feedback">
                      {t('feedback.postalCode')}
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 mb-3">
                    <label htmlFor="lowestSysPressure">{t('labels.lsp')}</label>
                    <input type="number" className={this.state.lowestSysPressureClass} id="lowestSysPressure" max={this.state.highestSysPressure}
                    required onChange={this.handleLowestSysChange} />
                    <div className="invalid-feedback">
                        {this.state.lowestSysPressureMessage}
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-6 mb-3">
                    <label htmlFor="highestSysPressure">{t('labels.hsp')}</label>
                    <input type="number" className={this.state.highestSysPressureClass} id="highestSysPressure" min={this.state.lowestSysPressure}
                    required onChange={this.handleHighestSysChange} />
                    <div className="invalid-feedback">
                        {this.state.highestSysPressureMessage}
                    </div>
                </div>
            </div>
            <button className="btn btn-primary btn-lg btn-block" type="submit">{t('labels.addPatient')}</button>
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

export default withTranslation()(Patients);
