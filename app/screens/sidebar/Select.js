import React, { PropTypes } from 'react';
import ReactSelect from 'react-select';

function renderLabel(option) {
  if (option.image) {
    return <span>{option.image} {option.label}</span>;
  }
  return option.label;
}

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
          noResultsText="Ei tuloksia"
          onChange={this.handleChange}
          optionRenderer={renderLabel}
          options={this.props.options}
          placeholder="Valitse..."
          value={this.props.value}
          valueRenderer={renderLabel}
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
    image: PropTypes.node,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
