
import DustOff from "../images/Dustoff_Picture.jpeg"

const WelcomePage = () => {
    return(
        <div className={"landing-page"}>

            <h1 className={"welcome-title"}>9-Line Medevac</h1>

            <img className={"full-size-img"} src={DustOff} alt={"Helicopter Picture"}></img>
        </div>
    )
}

export default WelcomePage;