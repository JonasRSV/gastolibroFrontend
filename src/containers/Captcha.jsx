import React from 'react';

class Captcha extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {activeCells: [], containerClasses: ""}
    }

    componentWillMount = () => {
      this.setState({containerClasses: "captcha_container"});
    }
    

    handleActivation = cell => {
        var cells = this.state.activeCells;

        cells.push(cell);

        this.props.checkCaptchaAnswer(cells).then(res => {
            if (res.status == 200) {
                this.setState({activeCells: cells, containerClasses: "captcha_container_collapse success"});
                this.props.hide();
            } else {
                this.setState({activeCells: cells});
            }
        });

        // MOCK
        // if (this.props.checkCaptchaAnswer(cells)) {
        //     this.setState({activeCells: cells, containerClasses: "captcha_container_collapse success"});
        //     this.props.hide();
        // } else {
        //     this.setState({activeCells: cells});
        // }
    }

    handleDeactivation = cell => {
        var cells = [];

        this.state.activeCells.forEach(activeCell => {
            if (activeCell != cell) {
                cells.push(activeCell);
            }
        });
        
        this.props.checkCaptchaAnswer(cells).then(res => {
            if (res.status == 200) {
                this.setState({activeCells: cells, containerClasses: "captcha_container_collapse success"});
                this.props.hide();
            } else {
                this.setState({activeCells: cells});
            }
        });

        // if (this.props.checkCaptchaAnswer(cells)) {
        //     this.setState({activeCells: cells, containerClasses: "captcha_container_collapse success"});
        //     this.props.hide();
        // } else {
        //     this.setState({activeCells: cells});
        // }
    }


    render() {
      return (
        <div className={this.state.containerClasses}>
            <div className="captcha_description"> {this.props.data.description}</div>
            
            <div className="captcha_col">
                <CaptchaCell image={this.props.data.images[0]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
                <CaptchaCell image={this.props.data.images[1]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
                <CaptchaCell image={this.props.data.images[2]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
            </div>
            <div className="captcha_col">
                <CaptchaCell image={this.props.data.images[3]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
                <CaptchaCell image={this.props.data.images[4]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
                <CaptchaCell image={this.props.data.images[5]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
            </div>
            <div className="captcha_col">
                <CaptchaCell image={this.props.data.images[6]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
                <CaptchaCell image={this.props.data.images[7]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
                <CaptchaCell image={this.props.data.images[8]} onActivate={this.handleActivation} onDeactive={this.handleDeactivation}/>
            </div>
        </div>
      )
    }
    
}

export default Captcha


class CaptchaCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {active: false, imgClasses: ""};
    }

    componentWillMount = () => {
      this.setState({imgClasses: "image_cell deactive_image_cell"});
    }

    toggleState = () => {
        if (this.state.active) {
            this.setState({imgClasses: "image_cell deactive_image_cell", active: false});
            this.props.onDeactive(this.props.image);
        } else {
            this.setState({imgClasses: "image_cell active_image_cell success", active: true});
            this.props.onActivate(this.props.image);
        }

    }
    

    render() {
      return (
        <div className="captcha_cell">
            <img onClick={this.toggleState} className={this.state.imgClasses} src={this.props.image} alt="Well, jikes if you cant see the images you're pretty much screwed.."/>
        </div>
      )
    }
}
