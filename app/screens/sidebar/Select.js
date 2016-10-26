import React, { PropTypes } from 'react';
import ReactSelect from 'react-select';

class Select extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(argument) {
    let value;
    if (Array.isArray(argument)) {
      // React-Select
      value = argument.map(option => option.value);
    } else {
      // Native select
      const selected = Array.from(argument.target.selectedOptions);
      value = selected.map(option => option.value);
    }
    this.props.onChange(value);
  }

  render() {
    return (
      <div className="select">
        <ReactSelect
          className="select-default"
          multi
          onChange={this.handleChange}
          options={this.props.options}
          value={this.props.value}
        />
        <select
          className="select-mobile"
          multiple
          onChange={this.handleChange}
          value={this.props.value}
        >
          {this.props.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
