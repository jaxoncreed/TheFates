import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { updateUserProfile, updateUserPassword } from 'redux/modules/user';

import {
  SelectField,
  TextField,
  RaisedButton,
  Toggle,
  Tabs,
  Tab,
  MenuItem,
  DatePicker,
  Snackbar,
  FontIcon
} from 'material-ui';
import { Card } from 'material-ui/Card';


class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: this.props.user.email,
        notification: {
          pn: this.props.user.notification.pn,
        },
        name: {
          first: this.props.user.name.first,
          last: this.props.user.name.last,
        },
        zip: this.props.user.zip,
      },
      userProfile: {
        annualIncome: this.props.profile.annualIncome,
        childrenInHome: this.props.profile.childrenInHome,
        education: this.props.profile.education,
        gender: this.props.profile.gender,
        maritalStatus: this.props.profile.maritalStatus,
        employmentStatus: this.props.profile.employmentStatus,
        ethnicity: this.props.profile.ethnicity,
        dob: this.props.profile.dob,
      },
      dob: {},
      emailErrorText: '',
      zipCodeErrorText: '',
      currentPassword: '',
      password: '',
      retypepassword: '',
      snackBarMessage: ''
    };
  }

  onChangeEmail = (event) => {
    if (event.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.setState({ emailErrorText: '' })
    } else {
      this.setState({ emailErrorText: 'Invalid email format' })
    }
  };

  onChangeFirstName = (event) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.user.name.first = event.target.value;

    this.setState({ user: clonedState.user });
  };

  onChangeLastName = (event) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.user.name.last = event.target.value;

    this.setState({ user: clonedState.user });
  };

  onChangeZip = (event) => {
    if (event.target.value.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/)) {
      let clonedState = Object.assign({}, this.state);
      clonedState.user.zip = event.target.value;

      this.setState({
        zipCodeErrorText: '',
        user: clonedState.user,
      })
    } else {
      this.setState({ zipCodeErrorText: 'Invalid zip code' })
    }
  };

  onChangeGender = (event, index, value) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.userProfile.gender = value;

    this.setState({ userProfile: clonedState.userProfile });
  };

  onChangeMaritalStatus = (event, index, value) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.userProfile.maritalStatus = value;

    this.setState({ userProfile: clonedState.userProfile });
  };

  onChangeEmploymentStatus = (event, index, value) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.userProfile.employmentStatus = value;

    this.setState({ userProfile: clonedState.userProfile });
  };

  onChangeEducation = (event, index, value) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.userProfile.education = value;

    this.setState({ userProfile: clonedState.userProfile });
  };

  onChangeAnnualIncome = (event, index, value) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.userProfile.annualIncome = value;

    this.setState({ userProfile: clonedState.userProfile });
  };

  onChangeChildrenInHome = (event, index, value) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.userProfile.childrenInHome = value;

    this.setState({ userProfile: clonedState.userProfile });
  };

  onChangeBirthday = (event, date) => {
    let clonedState = Object.assign({}, this.state);
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    clonedState.userProfile.dob = [year, month, day].join('-');

    this.setState({ userProfile: clonedState.userProfile, dob: date });
  };

  onChangeEthnicity = (event, index, value) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.userProfile.ethnicity = value;

    this.setState({ userProfile: clonedState.userProfile });
  };

  onChangePushNotifications = (event, isInputChecked) => {
    let clonedState = Object.assign({}, this.state);
    clonedState.user.notification.pn = isInputChecked;

    this.setState({ user: clonedState.user });
  };

  onChangeCurrentPassword = (event) => { this.setState({ currentPassword: event.target.value }); };

  onChangePassword = (event) => { this.setState({ password: event.target.value }); };

  onChangeReTypePassword = (event) => { this.setState({ retypepassword: event.target.value }); };

  submitProfile = () => {
    this.props.dispatch(updateUserProfile(this.state.user, this.state.userProfile))
        .then(() => this.setState({ snackBarMessage: 'Profile Updated' }));
  };

  submitPassword = () => {
    this.props.dispatch(updateUserPassword(this.state.currentPassword, this.state.password, this.state.retypepassword))
        .then(() => this.setState({ snackBarMessage: 'Password Updated' }));
  };

  render() {
    return (
      <div className="container">
        <Card className="containerContent noShadow" style={{ marginTop: '16px', paddingBottom: '16px' }}>
          <Tabs style={{ flexDirection: 'row'}}
                inkBarStyle={{ height: "3px" }}
                value={this.props.location.pathname.split('/')[2] || 'accountsettings'}
                onChange={ (value) => browserHistory.push('/profile/' + value) }>
            <Tab icon={<FontIcon className="material-icons" style={{ color: '#FFF' }}>settings_applications</FontIcon>}
                 value="accountsettings"
            >
              <div className="properPadding">
                <div className="profileInfoRow">
                  <TextField
                    className="field"
                    floatingLabelText="Account Email"
                    floatingLabelFixed={true}
                    value={this.state.user.email}
                    errorText= {this.state.emailErrorText}
                    onChange={this.onChangeEmail.bind(this)}
                  />
                  <TextField
                    className="field"
                    floatingLabelText="First Name"
                    floatingLabelFixed={true}
                    value={this.state.user.name.first}
                    onChange={this.onChangeFirstName}
                  />
                  <TextField
                    className="field"
                    floatingLabelText="Last Name"
                    floatingLabelFixed={true}
                    value={this.state.user.name.last}
                    onChange={this.onChangeLastName}
                  />
                </div>
                <div className="profileInfoRow">
                  <TextField
                    className="field"
                    floatingLabelText="Zip Code"
                    floatingLabelFixed={true}
                    value={this.state.user.zip}
                    errorText= {this.state.zipCodeErrorText}
                    onChange={this.onChangeZip.bind(this)}
                  />
                  <SelectField
                    className="field"
                    floatingLabelText="Gender"
                    floatingLabelFixed={true}
                    value={this.state.userProfile.gender}
                    onChange={this.onChangeGender}
                  >
                    <MenuItem value={"Male"} primaryText="Male" />
                    <MenuItem value={"Female"} primaryText="Female" />
                    <MenuItem value={"Other"} primaryText="Other" />
                  </SelectField>
                  <SelectField
                    className="field"
                    floatingLabelText="Marital Status"
                    floatingLabelFixed={true}
                    value={this.state.userProfile.maritalStatus}
                    onChange={this.onChangeMaritalStatus}
                  >
                    <MenuItem value={"Single"} primaryText="Single" />
                    <MenuItem value={"Married"} primaryText="Married" />
                    <MenuItem value={"Domestic Partnership"} primaryText="Domestic Partnership" />
                  </SelectField>
                </div>
                <div className="profileInfoRow">
                  <SelectField
                    className="field"
                    floatingLabelText="Employment Status"
                    floatingLabelFixed={true}
                    value={this.state.userProfile.employmentStatus}
                    onChange={this.onChangeEmploymentStatus}
                  >
                    <MenuItem value={"Student"} primaryText="Student" />
                    <MenuItem value={"Part-Time"} primaryText="Part-Time" />
                    <MenuItem value={"Full-Time"} primaryText="Full-Time" />
                    <MenuItem value={"Retired"} primaryText="Retired" />
                    <MenuItem value={"Other"} primaryText="Other" />
                  </SelectField>
                  <SelectField
                    className="field"
                    floatingLabelText="Education"
                    floatingLabelFixed={true}
                    value={this.state.userProfile.education}
                    onChange={this.onChangeEducation}
                  >
                    <MenuItem value={"Some High School"} primaryText="Some High School" />
                    <MenuItem value={"High School"} primaryText="High School" />
                    <MenuItem value={"Bachelor Degree"} primaryText="Bachelor Degree" />
                    <MenuItem value={"Advanced Degree"} primaryText="Advanced Degree" />
                  </SelectField>
                  <SelectField
                    className="field"
                    floatingLabelText="Annual Income"
                    floatingLabelFixed={true}
                    value={this.state.userProfile.annualIncome}
                    onChange={this.onChangeAnnualIncome}
                  >
                    <MenuItem value={"Under $24,000"} primaryText="Under $24,000" />
                    <MenuItem value={"$25,000 - $49,000"} primaryText="$25,000 - $49,000" />
                    <MenuItem value={"$50,000 - $99,000"} primaryText="$50,000 - $99,000" />
                    <MenuItem value={"$100,000 - $149,000"} primaryText="$100,000 - $149,000" />
                    <MenuItem value={"Above $150,000"} primaryText="Above $150,000" />
                  </SelectField>
                </div>
                <div className="profileInfoRow">
                  <SelectField
                    className="field"
                    floatingLabelText="Children in Home"
                    floatingLabelFixed={true}
                    value={this.state.userProfile.childrenInHome}
                    onChange={this.onChangeChildrenInHome}
                  >
                    <MenuItem value={"Yes"} primaryText="Yes" />
                    <MenuItem value={"No"} primaryText="No" />
                  </SelectField>
                  <DatePicker
                    className="field"
                    floatingLabelText="Birthday"
                    floatingLabelFixed={true}
                    openToYearSelection={true}
                    value={this.state.dob}
                    onChange={this.onChangeBirthday}
                  />
                  <SelectField
                    className="field"
                    floatingLabelText="Ethnicity"
                    floatingLabelFixed={true}
                    value={this.state.userProfile.ethnicity}
                    onChange={this.onChangeEthnicity}
                  >
                    <MenuItem value={"American Indian or Alaskan Native"} primaryText="American Indian or Alaskan Native" />
                    <MenuItem value={"Asian"} primaryText="Asian" />
                    <MenuItem value={"Black or African American"} primaryText="Black or African American" />
                    <MenuItem value={"Native Hawaiian or Other Pacific Islander"} primaryText="Native Hawaiian or Other Pacific Islander" />
                    <MenuItem value={"White"} primaryText="White" />
                    <MenuItem value={"Other"} primaryText="Other" />
                  </SelectField>
                </div>
              </div>
              <div className="container">
                <RaisedButton label="Save"
                              primary={true}
                              className="gaugeButton"
                              onClick={this.submitProfile}/>
              </div>
            </Tab>
            <Tab icon={<FontIcon className="material-icons" style={{ color: '#FFF' }}>notifications</FontIcon>}
                 value="notifications"
            >
              <div className="properPadding">
                <Toggle label="Push Notifications"
                        toggled={this.state.user.notification.pn}
                        onToggle={this.onChangePushNotifications}
                />
              </div>
              <div className="container">
                <RaisedButton label="Save"
                              primary={true}
                              className="gaugeButton"
                              onClick={this.submitProfile}/>
              </div>
            </Tab>
            <Tab icon={<FontIcon className="material-icons" style={{ color: '#FFF' }}>lock</FontIcon>}
                 value="changepassword"
            >
              <div className="properPadding">
                <TextField
                  className="field"
                  floatingLabelText="Current Password"
                  floatingLabelFixed={true}
                  value={this.state.currentPassword}
                  onChange={this.onChangeCurrentPassword}
                  type="password"
                />
              </div>
              <div className="properPadding">
                <TextField
                  className="field"
                  floatingLabelText="Password"
                  floatingLabelFixed={true}
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  type="password"
                />
              </div>
              <div className="properPadding">
                <TextField
                  className="field"
                  floatingLabelText="Confirm Password"
                  floatingLabelFixed={true}
                  value={this.state.retypepassword}
                  onChange={this.onChangeReTypePassword}
                  type="password"
                />
              </div>
              <div className="container">
                <RaisedButton label="Change Password"
                              primary={true}
                              className="gaugeButton"
                              onClick={this.submitPassword}/>
              </div>
            </Tab>
          </Tabs>
        </Card>
        <Snackbar
          open={!!this.state.snackBarMessage}
          message={this.state.snackBarMessage}
          autoHideDuration={4000}
          onRequestClose={() => this.setState({ snackBarMessage: '' })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    profile: state.user.userProfile
  };
};

export default connect(mapStateToProps)(ProfilePage);
