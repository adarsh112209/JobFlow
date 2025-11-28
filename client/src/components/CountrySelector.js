import React from 'react';
import Select from 'react-select';

const countries = [
  { value: 'Afghanistan', label: 'Afghanistan' }, { value: 'Albania', label: 'Albania' }, { value: 'Algeria', label: 'Algeria' },
  { value: 'Andorra', label: 'Andorra' }, { value: 'Angola', label: 'Angola' }, { value: 'Argentina', label: 'Argentina' },
  { value: 'Australia', label: 'Australia' }, { value: 'Austria', label: 'Austria' }, { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Bangladesh', label: 'Bangladesh' }, { value: 'Belgium', label: 'Belgium' }, { value: 'Bolivia', label: 'Bolivia' },
  { value: 'Brazil', label: 'Brazil' }, { value: 'Bulgaria', label: 'Bulgaria' }, { value: 'Canada', label: 'Canada' },
  { value: 'Chile', label: 'Chile' }, { value: 'China', label: 'China' }, { value: 'Colombia', label: 'Colombia' },
  { value: 'Croatia', label: 'Croatia' }, { value: 'Cuba', label: 'Cuba' }, { value: 'Cyprus', label: 'Cyprus' },
  { value: 'Czech Republic', label: 'Czech Republic' }, { value: 'Denmark', label: 'Denmark' }, { value: 'Dominican Republic', label: 'Dominican Republic' },
  { value: 'Ecuador', label: 'Ecuador' }, { value: 'Egypt', label: 'Egypt' }, { value: 'Estonia', label: 'Estonia' },
  { value: 'Ethiopia', label: 'Ethiopia' }, { value: 'Fiji', label: 'Fiji' }, { value: 'Finland', label: 'Finland' },
  { value: 'France', label: 'France' }, { value: 'Georgia', label: 'Georgia' }, { value: 'Germany', label: 'Germany' },
  { value: 'Greece', label: 'Greece' }, { value: 'Hungary', label: 'Hungary' }, { value: 'Iceland', label: 'Iceland' },
  { value: 'India', label: 'India' }, { value: 'Indonesia', label: 'Indonesia' }, { value: 'Iran', label: 'Iran' },
  { value: 'Iraq', label: 'Iraq' }, { value: 'Ireland', label: 'Ireland' }, { value: 'Israel', label: 'Israel' },
  { value: 'Italy', label: 'Italy' }, { value: 'Jamaica', label: 'Jamaica' }, { value: 'Japan', label: 'Japan' },
  { value: 'Kenya', label: 'Kenya' }, { value: 'Latvia', label: 'Latvia' }, { value: 'Lebanon', label: 'Lebanon' },
  { value: 'Liberia', label: 'Liberia' }, { value: 'Libya', label: 'Libya' }, { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Luxembourg', label: 'Luxembourg' }, { value: 'Madagascar', label: 'Madagascar' }, { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Maldives', label: 'Maldives' }, { value: 'Mali', label: 'Mali' }, { value: 'Malta', label: 'Malta' },
  { value: 'Mexico', label: 'Mexico' }, { value: 'Monaco', label: 'Monaco' }, { value: 'Mongolia', label: 'Mongolia' },
  { value: 'Montenegro', label: 'Montenegro' }, { value: 'Morocco', label: 'Morocco' }, { value: 'Nepal', label: 'Nepal' },
  { value: 'Netherlands', label: 'Netherlands' }, { value: 'New Zealand', label: 'New Zealand' }, { value: 'Nigeria', label: 'Nigeria' },
  { value: 'North Korea', label: 'North Korea' }, { value: 'North Macedonia', label: 'North Macedonia' }, { value: 'Norway', label: 'Norway' },
  { value: 'Oman', label: 'Oman' }, { value: 'Pakistan', label: 'Pakistan' }, { value: 'Panama', label: 'Panama' },
  { value: 'Paraguay', label: 'Paraguay' }, { value: 'Peru', label: 'Peru' }, { value: 'Philippines', label: 'Philippines' },
  { value: 'Poland', label: 'Poland' }, { value: 'Portugal', label: 'Portugal' }, { value: 'Qatar', label: 'Qatar' },
  { value: 'Romania', label: 'Romania' }, { value: 'Russia', label: 'Russia' }, { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Senegal', label: 'Senegal' }, { value: 'Serbia', label: 'Serbia' }, { value: 'Singapore', label: 'Singapore' },
  { value: 'Slovakia', label: 'Slovakia' }, { value: 'Slovenia', label: 'Slovenia' }, { value: 'South Africa', label: 'South Africa' },
  { value: 'South Korea', label: 'South Korea' }, { value: 'Spain', label: 'Spain' }, { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Sweden', label: 'Sweden' }, { value: 'Switzerland', label: 'Switzerland' }, { value: 'Syria', label: 'Syria' },
  { value: 'Taiwan', label: 'Taiwan' }, { value: 'Tanzania', label: 'Tanzania' }, { value: 'Thailand', label: 'Thailand' },
  { value: 'Turkey', label: 'Turkey' }, { value: 'Uganda', label: 'Uganda' }, { value: 'Ukraine', label: 'Ukraine' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' }, { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' }, { value: 'Uruguay', label: 'Uruguay' }, { value: 'Venezuela', label: 'Venezuela' },
  { value: 'Vietnam', label: 'Vietnam' }, { value: 'Yemen', label: 'Yemen' }, { value: 'Zambia', label: 'Zambia' },
  { value: 'Zimbabwe', label: 'Zimbabwe' }
];

const CountrySelector = ({ name, value, onChange }) => {
  const selectedOption = countries.find(option => option.value === value);

  const handleChange = (selectedOption) => {
    const event = {
      target: {
        name: name,
        value: selectedOption ? selectedOption.value : ''
      }
    };
    onChange(event);
  };

  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      options={countries}
      value={selectedOption}
      onChange={handleChange}
      isClearable
      isSearchable
      placeholder="-- Select Country --"
    />
  );
};

export default CountrySelector;