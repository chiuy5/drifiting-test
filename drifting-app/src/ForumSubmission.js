import React, { Component } from 'react';
//import './App.css';
import './ForumSubmission.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, FormControl, FormCheck } from 'react-bootstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import Forum from './Forum';
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ForumSubmission extends Component {
    // Set up a blank title and description input field
    constructor(props) {
        super(props);
        this.state = {
            emotion: "",
            exercise: "",
            body: ["", "", "", "", "", "", ""],
            tags: "",
            isPublic: true,
        };

        this.displayMessage = this.displayMessage.bind(this);

        //this.handleChange = this.handleChange.bind(this);
        //this.postBottle = this.postBottle.bind(this);
    }

    // Add a method to handle changes to any input element
    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        console.log(field, value);
        let change = {};
        change[field] = value;
        this.setState(change);
    }

    handleQuestion(event) {
        let index = event.target.name;
        let value = event.target.value;
        console.log(index, value);
        let change = this.state.body;
        change[index] = value;
        this.setState({ body: change }, () => {
            console.log("body", this.state.body);
        });
    }

    // Function for submit and display the user input message
    displayMessage(event) {
        event.preventDefault();
        let message = {}
        this.setState({
            message: this.state.body
        }
            // }, () => {
            //     console.log("message", this.state.message);
        )

        fetch("https://api.kychiu.me/v1/ocean/ocean", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            return res.text();
        }).then((data) => {

            this.setState({
                message: data

            })

        }).catch((err, data) => {
            console.log(err);
            console.log("message1", data);
        });

    }


    // When the user click submit, the value change on title and description 
    //onSubmit = e => {
    //    e.preventDefault();
    //    this.props.onSubmit(this.state);
    //    this.setState({
    //        title: "",
    //        description: ""
    //    })
    //};
    /*
        addBottle() {
            console.log(this.state.isPublic);
            let bottle = {
                emotion: this.state.emotion,
                exercise: this.state.exercise,
                body: this.state.body,
                tags: this.state.tags,
                isPublic: this.state.isPublic,
            }
    
            console.log(bottle);
    
            fetch("https://api.kychiu.me/v1/ocean/ocean", {
                method: "POST",
                body: 
                    {emotion: this.state.emotion,
                        exercise: this.state.exercise,
                        body: this.state.body,
                        tags: this.state.tags,
                        isPublic: this.state.isPublic
                    }
            }).then(res => {
                return res.json();
            }).then((data) => {
                console.log("bottle1", data);
                this.clearState();
            }).catch((err, data) => {
                console.log(err);
                console.log("bottle2", data);
            });
    
    
            
            //this.cardsRef.push(card);    
        }
    }*/

    addBottle = (e) => {
        /*console.log(this.state.isPublic);
        let bottle = {
            emotion: this.state.emotion,
            exercise: this.state.exercise,
            body: this.state.body,
            tags: this.state.tags,
            isPublic: this.state.isPublic,
        }*/

        //console.log(bottle);
        e.preventDefault();
        fetch("https://api.kychiu.me/v1/ocean/ocean", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    emotion: this.state.emotion,
                    exercise: this.state.exercise,
                    body: this.state.body,
                    tags: this.state.tags,
                    isPublic: this.state.isPublic
                })
        }).then(res => {
            return res.json();
        }).then((data) => {
            console.log("bottle1", data);
            this.clearState();
        }).catch((err, data) => {
            console.log(err);
            console.log("bottle2", data);
        });
    }

    clearState() {
        this.setState({
            emotion: "",
            exercise: "",
            body: ["", "", "", "", "", "", ""],
            tags: "",
            isPublic: ""
        }, () => {
            console.log("empty", this.state);
        });

    }

    postBottle() {
        //this.setState({type: "public"});
        this.setState(
            { isPublic: true },
            () => {
                console.log("post", this.state);
                this.addBottle();
            }
        );
    }

    saveBottle = (e) => {
        e.preventDefault();
        this.setState(
            { isPublic: false },
            () => {
                console.log("save", this.state);
                //this.addBottle();
                fetch("https://api.kychiu.me/v1/ocean/ocean", {
                    method: "POST",
                    body:
                    {
                        emotion: this.state.emotion,
                        exercise: this.state.exercise,
                        body: this.state.body,
                        tags: this.state.tags,
                        isPublic: this.state.isPublic
                    }
                }).then(res => {
                    return res.json();
                }).then((data) => {
                    console.log("bottle1", data);
                    this.clearState();
                }).catch((err, data) => {
                    console.log(err);
                    console.log("bottle2", data);
                });
            }
        );
    }

    disposeBottle() {
        this.clearState();
    }

    render() {
        return (
            <div className="container" id="exercise">

                <section id="child">
                    <div className="intro">
                        <h1>New Bottle</h1>

                        <div id="description">
                            <br />
                            <p>Go through the following exercise to sort out what's on your mind</p>
                            <p>You are free to go at your own pace and skip any questions you want</p>
                            <br />
                            <br />
                            <p>Scroll or Swipe Down to Continue</p>
                            <h2>↓</h2>
                            
                        </div>

                    </div>
                </section>
                <form>
                    <section id="child">
                        <label>(1/7) How are you feeling right now?</label>
                        <br />
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className="btn btn-secondary">
                                <input type="radio"
                                    name="emotion"
                                    value="+2"
                                    checked={this.state.emotion === "+2"}
                                    onChange={(event) => { this.handleChange(event) }}
                                />
                                Great
                        </label>
                            <label className="btn btn-secondary">
                                <input type="radio"
                                    name="emotion"
                                    value="+1"
                                    checked={this.state.emotion === "+1"}
                                    onChange={(event) => { this.handleChange(event) }}
                                />
                                Good
                        </label>
                            <label className="btn btn-secondary">
                                <input type="radio"
                                    name="emotion"
                                    value="0"
                                    checked={this.state.emotion === "0"}
                                    onChange={(event) => { this.handleChange(event) }}
                                />
                                Okay
                        </label>
                            <label className="btn btn-secondary">
                                <input type="radio"
                                    name="emotion"
                                    value="-1"
                                    checked={this.state.emotion === "-1"}
                                    onChange={(event) => { this.handleChange(event) }}
                                />
                                Bad
                        </label>
                            <label className="btn btn-secondary">
                                <input type="radio"
                                    name="emotion"
                                    value="-2"
                                    checked={this.state.emotion === "-2"}
                                    onChange={(event) => { this.handleChange(event) }}
                                />
                                Awful
                        </label>
                        </div>
                    </section>

                    <section id="child">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">(2/7) What happened?</label>
                            <textarea className="form-control"
                                name="0"
                                value={this.state.body[0]}
                                onChange={(event) => { this.handleQuestion(event) }}
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Write about something on your mind (for example: I failed my exam) ..."
                                aria-label="some description texts">
                            </textarea>
                        </div>
                    </section>

                    <section id="child">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">(3/7) Could the situation be worse than it is? And how so?</label>
                            <textarea className="form-control"
                                name="2"
                                value={this.state.body[2]}
                                onChange={(event) => { this.handleQuestion(event) }}
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Think about what could be the worse case scenario for your situation (i.e. I slept through my exam) ..."
                                aria-label="some description texts">
                            </textarea>
                        </div>
                    </section>

                    <section id="child">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"> (4/7) What are some factors that contributed to the situation?</label>
                            <textarea className="form-control"
                                name="3"
                                value={this.state.body[3]}
                                onChange={(event) => { this.handleQuestion(event) }}
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="There may be outside factors to consider that have you feel this way (i.e. I didn't get enough sleep)"
                                aria-label="some description texts">

                            </textarea>
                        </div>
                    </section>

                    <section id="child">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"> (5/7) What factors in the situation are in your control?</label>
                            <textarea className="form-control"
                                name="4"
                                value={this.state.body[4]}
                                onChange={(event) => { this.handleQuestion(event) }}
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Think about the things you put for the previous prompt and which of those things you can address"
                                aria-label="some description texts">
                            </textarea>
                        </div>
                    </section>

                    <section id="child">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"> (6/7) Can you brainstorm solutions you can do to address your situation?</label>
                            <textarea className="form-control"
                                name="5"
                                value={this.state.body[5]}
                                onChange={(event) => { this.handleQuestion(event) }}
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Think of some resources you can use or actions you can do"
                                aria-label="some description texts">
                            </textarea>
                        </div>
                    </section>

                    <section id="child">
                        <br />
                        <p> [ ** Will add a Mindfulness exercise ** ]</p>
                        <br />
                    </section>

                    <section id="child">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1"> (7/7) How do you feel now?</label>
                            <textarea className="form-control"
                                name="6"
                                value={this.state.body[6]}
                                onChange={(event) => { this.handleQuestion(event) }}
                                id="exampleFormControlTextarea1"
                                rows="3"
                                aria-label="some description texts">
                            </textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="formGroupExampleInput">Tags</label>
                            <input type="text" className="form-control"
                                name="tags"
                                value={this.state.tags}
                                onChange={(event) => { this.handleChange(event) }}
                                id="formGroupExampleInput"
                                placeholder="Tags for your bottle"
                                aria-label="Tags for your bottle"
                            />
                        </div>

                        <div id="buttons">
                            <button className="btn btn-primary mr-2" onClick={(e) => this.addBottle(e)}>
                                Make Public
                         </button>
                            <button className="btn btn-primary mr-2" onClick={(e) => this.saveBottle(e)}>
                                Only I Can See
                         </button>
                            <button className="btn btn-primary mr-2" onClick={() => this.disposeBottle()}>
                                Dispose
                        </button>
                        </div>
                    </section>
                </form>
            </div>



        );
    }
}