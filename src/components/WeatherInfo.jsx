import PropTypes from "prop-types";

export default function WeatherInfo({ title, value }) {
  return (
    <div className="flex justify-between dark:bg-white dark:bg-opacity-10 bg-dark bg-opacity-30 p-2">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
}

WeatherInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
