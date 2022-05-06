import history from "../../../util/history";
import { CRAWLER } from "../../../util/route";
import BaseButton from "../../Common/BaseButton";

const Home = () => {
  return (
    <div className="homePage">
      <div className="intro">
        <div className="intro-header">Welcome!</div>
        <div className="intro-text">
          This is a demo for a web crawler service based on Node JS. feel free
          to play around.{" "}
        </div>
      </div>
      <div className="entrance">
        <BaseButton
          tooltip="Start crawl"
          handleClick={() => history.push(CRAWLER)}
        >
          START
        </BaseButton>
      </div>
    </div>
  );
};
export default Home;
