import PropTypes from "prop-types";

export default function ForecastCard({
  date,
  time,
  icon,
  description,
  temperature,
  maxTemp,
  minTemp,
  humidity,
  wind,
  visibility,
  pressure,
  seaLevel,
  groundLevel,
}) {
  return (
    <div className=" p-2 dark:bg-lighter bg-dark-lighter">
      <div className="flex gap-1 justify-between items-center">
        <p className="font-bold">{date}</p>
        <p className="font-bold">{time}</p>
        <strong className="text-xl">{temperature}</strong>
      </div>
      <div>
        <div className="flex justify-center items-center ">
          <img loading="lazy" src={icon} alt="" width="70px" height="70px" />
          {description}
        </div>
        <div>
          <div className="flex justify-between">
            <strong className="text-sm">Max Temp.</strong>
            {maxTemp}
          </div>
          <div className="flex justify-between">
            <strong className="text-sm">Min Temp.</strong>
            {minTemp}
          </div>
          <div className="flex justify-between">
            <strong className="text-sm">Humidity</strong>
            {humidity}
          </div>
          <div className="flex justify-between">
            <strong className="text-sm">Wind</strong>
            {wind}
          </div>
          <div className="flex justify-between">
            <strong className="text-sm">Visibilty</strong>
            {visibility}
          </div>
          <div className="flex justify-between">
            <strong className="text-sm">Pressure</strong>
            {pressure}
          </div>
          <div className="flex justify-between">
            <strong className="text-sm">Sea Level</strong>
            {seaLevel}
          </div>
          <div className="flex justify-between">
            <strong className="text-sm">Ground Level</strong>
            {groundLevel}
          </div>
        </div>
      </div>
    </div>
  );
}

ForecastCard.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string,
  temperature: PropTypes.string,
  maxTemp: PropTypes.string,
  minTemp: PropTypes.string,
  humidity: PropTypes.string,
  wind: PropTypes.string,
  visibility: PropTypes.string,
  pressure: PropTypes.string,
  seaLevel: PropTypes.string,
  groundLevel: PropTypes.string,
};
