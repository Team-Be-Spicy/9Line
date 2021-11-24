import DustOff from "../images/Dustoff_Picture.jpeg"

const WelcomePage = () =>
    <div className="landing-page">
        <h1 className="welcome-title">9-Line Medevac</h1>
        <img className="full-size-img" src={DustOff} alt="Helicopter landing in the desert"/>
    </div>

export default WelcomePage;