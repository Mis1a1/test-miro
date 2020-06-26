import React from 'react';
import ReactDOM from 'react-dom';

// import "./styles.css";

export default class Chips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      value: '',
      error: null,
    };
  }
  handleKeyDown = (evt) => {
    if (['Enter', 'Tab', ','].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: '',
        });
      }
    }
  };

  handleChange = (evt) => {
    this.setState({
      value: evt.target.value,
      error: null,
    });
  };

  handleDelete = (item) => {
    this.setState({
      items: this.state.items.filter((i) => i !== item),
    });
  };

  handlePaste = (evt) => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData('text');
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter((email) => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded],
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  makeEmail() {
    var strValues = 'abcdefg12345';
    var strEmail = '';
    var strTmp;
    for (var i = 0; i < 10; i++) {
      strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
      strEmail = strEmail + strTmp;
    }
    strTmp = '';
    strEmail = strEmail + '@';
    for (var j = 0; j < 8; j++) {
      strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
      strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + '.com';
    return strEmail;
  }

  addRandom = () => {
    var strValues = 'abcdefg12345';
    var strEmail = '';
    var strTmp;
    for (var i = 0; i < 4; i++) {
      strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
      strEmail = strEmail + strTmp;
    }
    strTmp = '';
    strEmail = strEmail + '@';
    for (var j = 0; j < 3; j++) {
      strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
      strEmail = strEmail + strTmp;
    }
    strEmail = strEmail + '.com';
    return (
      strEmail,
      this.setState({
        items: [...this.state.items, strEmail],
        value: '',
      })
    );
  };
  render() {
    return (
      <>
        <div className='board'>
          <h1 className='headline'>
            <span class='smallerFont'>Share </span>
            <span class='bigFont'>Board name </span>
            <span class='smallerFont'>with others</span>
          </h1>
          <div className='input-area'>
            {this.state.items.map((item) => (
              <div className='tag-item' key={item}>
                {item}
                <button
                  type='button'
                  className='button'
                  onClick={() => this.handleDelete(item)}
                >
                  &times;
                </button>
              </div>
            ))}

            <input
              className={'input ' + (this.state.error && ' has-error')}
              value={this.state.value}
              placeholder='add more peaople...'
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              onPaste={this.handlePaste}
            />
          </div>
        </div>
        <div className='buttons-board'>
          <button className='button-add' onClick={this.addRandom}>
            Add email
          </button>
          <button
            className='button-get'
            onClick={() => {
              alert(this.state.items.length);
            }}
          >
            Get emails count
          </button>
        </div>

        {this.state.error && <p className='error'>{this.state.error}</p>}
      </>
    );
  }
}
