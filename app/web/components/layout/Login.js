import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';

import {userLogin, createUser, resetPassword} from 'redux/modules/user';

class Login extends Component {

  static propTypes  = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      mode: 'login'
    }
  }

  // TODO: Error handling for various inputs
  submitLogin = (e) => {
    e.preventDefault();
    this.props.dispatch(userLogin(this.state.loginEmail, this.state.loginPass));
  };

  submitCreate = (e) => {
    e.preventDefault();
    this.props.dispatch(createUser(this.state.accEmail, this.state.accPass1));
  };

  submitPass = (e) => {
    e.preventDefault();
    this.props.dispatch(resetPassword(this.state.resetPassEmail));
  };

  renderLogin() {
    return (
      <div className="loginBox">
        <Card style={{ margin: '16px', boxShadow: '0 5px 6px 5px rgba(0, 0, 0, .09)' }}>
          { this.props.login.loading && <LinearProgress mode="indeterminate" /> }
          <form onSubmit={this.submitLogin}>
            <CardText>
              { this.props.login.error && <p className="error">Invalid Credentials</p> }
              <TextField
                onChange={ (e, s) => this.setState({ loginEmail: s }) }
                key="loginEmail"
                hintText="john.doe@example.com"
                floatingLabelText="Email"
                type="email"
              /><br />
              <TextField
              onChange={ (e, s) => this.setState({ loginPass: s }) }
                key="loginPass"
                floatingLabelText="Password"
                type="password"
              /><br />
            </CardText>
            <CardActions style={{ padding: '16px' }}>
              <RaisedButton
                  type="submit"
                  primary={true}
                  className="gaugeButton"
                  label="Log In" />
              <FlatButton
                  className="gaugeButton"
                  label="Create Account"
                  onClick={() => this.setState({ mode: 'create' })} />
            </CardActions>
          </form>
        </Card>
        <div className="tinyLink" onClick={ () => this.setState({ mode: 'pass' }) }>Forgot Password</div>
      </div>
    )
  }

  renderCreateAccount() {
    return (
      <div>
        <Card className="noShadow" style={{ margin: '16px', maxWidth: "320px" }}>
          { this.props.create.loading && <LinearProgress mode="indeterminate" /> }
          <form onSubmit={this.submitCreate}>
            { this.props.create.error && <p className="error">That email already exists.</p> }
            <CardHeader className="cardHeader"
              title="Create a Gauge Account" />
            <CardText>
                <TextField
                onChange={ (e, s) => this.setState({ accEmail: s }) }
                  key="accEmail"
                  hintText="john.doe@example.com"
                  floatingLabelText="Email"
                  type="email"
                /><br />
                <TextField
                  onChange={ (e, s) => this.setState({ accPass1: s }) }
                  key="accPass1"
                  floatingLabelText="Password"
                  type="password"
                /><br />
                <TextField
                onChange={ (e, s) => this.setState({ accPass2: s }) }
                  key="accPass2"
                  floatingLabelText="Confirm Password"
                  type="password"
                /><br />
            </CardText>
            <CardActions>
              <RaisedButton
                  type="submit"
                  primary={true}
                  className="gaugeButton"
                  label="Create Account" />
              <FlatButton
                  className="gaugeButton"
                  label="Log In"
                  onClick={() => this.setState({ mode: 'login' })} />
            </CardActions>
          </form>
        </Card>
        <div className="tinyLink" onClick={ () => this.setState({ mode: 'pass' }) }>Forgot Password</div>
      </div>
    )
  }

  renderPass() {
    return (
      <div>
        <Card className="noShadow" style={{ margin: '16px', maxWidth: "320px" }}>
          { this.props.passReset.loading && <LinearProgress mode="indeterminate" /> }
          <form onSubmit={this.submitPass}>
            { this.props.passReset.error && <p className="error">Error in reseting password.</p> }
            <CardHeader className="cardHeader"
              title="Reset your Password" />
            <CardText>
                <TextField
                  onChange={ (e, s) => this.setState({ passResetEmail: s }) }
                  key="passResetEmail"
                  hintText="john.doe@example.com"
                  floatingLabelText="Email"
                  type="email"
                />
            </CardText>
            <CardActions>
              <RaisedButton
                  type="submit"
                  primary={true}
                  className="gaugeButton"
                  label="Reset Password" />
              <FlatButton
                  className="gaugeButton"
                  label="Back"
                  onClick={() => this.setState({ mode: 'login' })} />
            </CardActions>
          </form>
        </Card>
      </div>
    )
  }

  render() {
    if (this.state.mode === 'pass') {
      return this.renderPass();
    } else if (this.state.mode === 'create') {
      return this.renderCreateAccount();
    } else {
      return this.renderLogin();
    }
  }
}
export default Login;