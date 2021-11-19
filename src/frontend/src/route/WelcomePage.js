import Dustoff from "../images/Dustoff_Picture.jpeg"


const WelcomePage = () => {
    return(
        <div className={"landing-page"}>
            <img src={Dustoff} alt={"dustoff image"}/>
            <p>Welcome to 9-Line</p>
        </div>
    )
}

export default WelcomePage;