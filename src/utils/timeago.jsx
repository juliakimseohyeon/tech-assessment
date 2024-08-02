import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const TimestampComponent = (timestamp) => {
  return <div>{timeAgo.format(new Date(timestamp))}</div>;
};

export default TimestampComponent;
