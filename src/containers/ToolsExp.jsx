import React, { Component } from 'react'
import axios from 'axios'
import Captcha from './Captcha.jsx';

const nameRegex = new RegExp("^[a-z-A-ZåäöÅÄÖ\\s\\.]{1,40}$");
const emailRegex = new RegExp("^[0-9a-zA-Z\\.]+@[0-9a-zA-Z\\.]+\\.[a-zA-Z]+$");
const titleRegex = new RegExp("(.+\\.|.{0,20})");
const lengthLimitRegex = new RegExp("^.{1,30}$");


function getTime() {
    return (new Date).toLocaleDateString();
}

// answer = image1, image2, image3, image4 
// const fakeCaptcha = {
//     id: "KITTENS",
//     images: ["captchas/captcha1/image1.jpg", "captchas/captcha1/image2.jpg", "captchas/captcha1/image3.jpg", "captchas/captcha1/image4.jpg", "captchas/captcha1/image5.jpg", "captchas/captcha1/image6.jpg", "captchas/captcha1/image7.png", "captchas/captcha1/image8.jpg", "captchas/captcha1/image9.jpg"],
//     description: "Click All The Fwurry Kittens"
// }

export class ToolsExp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            country: "",
            city: "",
            msg: "",
            nameComplete: false,
            emailComplete: false,
            countryComplete: false,
            cityComplete: false,
            messageComplete: false,
            classNameContainer: "",
            classNameForm: "",
            classNameRight: "",
            classNameCollapseButton: "",
            displayCaptcha: false,
            captchaData: null,
            captchaAnswer: null
        }

        this.normal_styles_regi = "tools_exp_reginp";
        this.success_styles_regi = "tools_exp_reginp success";
        this.fail_styles_regi = "tools_exp_reginp failure";

        this.normal_styles_msg = "tools_exp_msginp";
        this.success_styles_msg = "tools_exp_msginp success";
        this.fail_styles_msg = "tools_exp_msginp failure";
    }

    componentWillMount = () => {
        this.queryForCaptcha();
        this.setState({classNameContainer: "tools_container_exp", 
                    classNameForm: "tools_form", 
                    classNameRight: "tools_exp_right", 
                    classNameCollapseButton: "tools_collapse"});

    
       axios.get("//freegeoip.net/json/?callback?").then(res => {
           if (res.data.city) {
            this.setState({city: res.data.city, country: res.data.country_name, cityComplete: true, countryComplete: true});
           }
       });
    }
    
    checkCaptchaAnswer = answer => {
        this.setState({captchaAnswer: answer});
        return axios.post("/api/captcha/check", {
            answer: answer,
            id: this.state.captchaData.id
        });



        // MOCK

        // var correctAns = true;

        // if (answer.length != 4) {
        //     correctAns = false;
        // } else {
        //     [fakeCaptcha.images[0], fakeCaptcha.images[1], fakeCaptcha.images[2], fakeCaptcha.images[3]].forEach(img => {
        //         if (answer.indexOf(img) == -1) {
        //             correctAns = false;
        //         } 
        //     });
        // }


        // return correctAns;
    }

    showCaptcha = () => {
        this.setState({displayCaptcha: true});
    }

    hideCaptcha = () => {
        setTimeout(() => this.setState({displayCaptcha: false}), 1000);
    }

    queryForCaptcha = () => {
        axios.get("/api/captcha").then(res => {
            if (res.data.check) {
                this.setState({captchaData: res.data.captcha}, this.showCaptcha);
            }
        });

        // MOCK
        // this.setState({captchaData: fakeCaptcha}, this.showCaptcha);
    }



    nameStatus = () => {
        if (this.state.name == "") {
            return this.normal_styles_regi;
        } else if(this.state.nameComplete) {
            return this.success_styles_regi;
        } else {
            return this.fail_styles_regi;
        }
    } 
    emailStatus = () => {
        if (this.state.email == "") {
            return this.normal_styles_regi;
        } else if (this.state.emailComplete) {
            return this.success_styles_regi;
        } else {
            return this.fail_styles_regi;
        }
    }

    countryStatus = () => {
        if (this.state.country == "") {
            return this.normal_styles_regi;
        } else if(this.state.countryComplete) {
            return this.success_styles_regi;
        } else {
            return this.fail_styles_regi;
        }

    }
    cityStatus = () => {
        if (this.state.city == "") {
            return this.normal_styles_regi;
        } else if(this.state.cityComplete) {
            return this.success_styles_regi;
        } else {
            return this.fail_styles_regi;
        }

    }
    messageStatus = () =>  {
        if (this.state.msg == "") {
            return this.normal_styles_msg;
        } else {
            return this.success_styles_msg;
        }
    }

    handleNamePress = evt => {
        if (nameRegex.test(evt.target.value)) {
            this.setState({name: evt.target.value, nameComplete: true});
        } else {
            this.setState({name: evt.target.value, nameComplete: false});
        }
    }
    handleEmailPress = evt => {
        if (emailRegex.test(evt.target.value)) {
            this.setState({email: evt.target.value, emailComplete: true});
        } else {
            this.setState({email: evt.target.value, emailComplete: false});
        }
    }

    handleCountryPress = evt => { 
        if (lengthLimitRegex.test(evt.target.value)) {
            this.setState({country: evt.target.value, countryComplete: true});
        } else {
            this.setState({country: evt.target.value, countryComplete: false});
        }
    }
    handleCityPress = evt => {
        if (lengthLimitRegex.test(evt.target.value)) {
            this.setState({city: evt.target.value, cityComplete: true});
        } else {
            this.setState({city: evt.target.value, cityComplete: false});
        }
    }
    handleMessagePress = evt => {
        if (evt.target.value != "") {
            this.setState({msg: evt.target.value, messageComplete: true});
        } else {
            this.setState({msg: evt.target.value, messageComplete: false});
        }
    }

    onSubmitClick = () => {
        if (this.state.nameComplete 
            && this.state.emailComplete
            && this.state.countryComplete
            && this.state.cityComplete
            && this.state.messageComplete) {

                var title = titleRegex.exec(this.state.msg)[0] + "..";

                var entry = {
                    title: title,
                    time: getTime(),
                    name: this.state.name,
                    text: this.state.msg,
                    country: this.state.country,
                    city: this.state.city,
                    email: this.state.email
                };

                this.props.onSubmit(entry, this.state.captchaData.id, this.state.captchaAnswer);
                this.collapseTools();
        } else {

            if (this.state.name == "") {
                this.setState({name: "Smith", nameComplete: true});
            }

            if (this.state.email == "") {
                this.setState({email: "Smith@Smitthy.se", emailComplete: true});
            }

            if (this.state.city == "") {
                this.setState({city: "SmithTown", cityComplete: true});
            }

            if (this.state.country == "") {
                this.setState({country: "SmithLand", countryComplete: true});
            }

            if (this.state.msg == "") {
                this.setState({msg: "My name's bond, James Bond.", messageComplete: true});
            }
        }
    }

    collapseTools = () => {
        this.setState({classNameContainer: "tools_container_collapse",
            classNameForm: "tools_form_collapse",
            classNameRight: "tools_exp_right_collapse",
            classNameCollapseButton: "tools_collapse_collapse"});

        this.props.toggle();
    }

    render() {

        var namestyles = this.nameStatus();
        var emailstyles = this.emailStatus();
        var countrystyles = this.countryStatus();
        var citystyles = this.cityStatus();
        var msgstyles = this.messageStatus();

        var captcha = (this.state.displayCaptcha) ? <Captcha hide={this.hideCaptcha} checkCaptchaAnswer={this.checkCaptchaAnswer} data={this.state.captchaData} /> : null;


        return (
            <div className={this.state.classNameContainer}>
                <form className={this.state.classNameForm} action="">
                    <input onInput={this.handleNamePress} className={namestyles} type="text" placeholder="Namn" value={this.state.name}/>
                    <input onInput={this.handleEmailPress} className={emailstyles} type="text" placeholder="Email" value={this.state.email}/>
                    <input onInput={this.handleCountryPress} className={countrystyles} type="text" placeholder="Stad" value={this.state.country}/>
                    <input onInput={this.handleCityPress} className={citystyles} type="text" placeholder="Land" value={this.state.city}/>
                </form>

                <div className={this.state.classNameRight}>
                    <form action="" className="tools_form_msg">
                        <div className="message_status"></div>
                        <textarea onInput={this.handleMessagePress} className={msgstyles} type="text" placeholder="Lämna ett meddelande..." value={this.state.msg}/>
                    </form>
                    
                    <div onClick={this.onSubmitClick} className="tools_form_submit">
                        <div className="centervert">
                            Submit
                        </div>
                    </div>

                </div>

                <img onClick={this.collapseTools} className={this.state.classNameCollapseButton} src="images/ArrowUp.png" alt="Collapse"/>
                {captcha}
            </div>
        )
    }
}

export default ToolsExp