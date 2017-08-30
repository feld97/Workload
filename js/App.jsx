import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, Tabs, Tab, Drawer,Popover,TextField,FlatButton, MenuItem} from 'material-ui';
import IconButton from 'material-ui/IconButton';

import Header from  "./components/Header.jsx";
import Course from "./components/Course.jsx";
// import Task from "./components/Task.jsx";

import injectTapEventPlugin from 'react-tap-event-plugin';

// import Chart from 'chart.js';


injectTapEventPlugin();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state=
      {
        courses: [],
        drawerOpen: false,
        createCourseMenuOpen:false,

      };

  }

  addCourse(context){

    this.setState({courses:context.state.courses.concat([toString(this.state.courses).length:""])});
    // context.state.courses.push(" ");

  }

  render(){
    return (
      <MuiThemeProvider>
      <div>
        <div id="Header">
          <AppBar
            title="Progress Bar"
            iconElementLeft={

              <IconButton iconClassName="material-icons"  onClick={() => {this.setState({ drawerOpen: !this.state.drawerOpen});}}>reorder</IconButton>

            }
            iconElementRight={

              <IconButton id="addCourseButton"iconClassName="material-icons"  onClick={() => this.setState({createCourseMenuOpen:!this.state.createCourseMenuOpen})}>add</IconButton>

            }
          />

          <Popover
            open={this.state.createCourseMenuOpen}
            anchorEl={document.getElementById('addCourseButton')}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onRequestClose={() => this.setState({createCourseMenuOpen:!this.state.createCourseMenuOpen})}
          >
            <TextField id="addName" hintText="Name of Course" /><br/>

            <FlatButton label="add" fullWidth={true} onClick={() => {
              this.state.courses.push(document.getElementById('addName').value);


              //this stays here
              this.setState({createCourseMenuOpen:!this.state.createCourseMenuOpen});
            } }/>

          </Popover>
          <Tabs>
            <Tab label="Tables" >
              <div id="Courses">
                {this.state.courses.map(function(title,index){
                  return <Course name = {title} chartid = {"chart_" + index} containerid = {"container_" + index} />;
                })}
              </div>
            </Tab>
            <Tab label="Graphs" >
              <div id = "canv">

                {this.state.courses.map((title,index)=>{

                  return(
                    <div id = {"container_"+(parseInt(index))}>
                      <h1>{title}</h1>
                      <canvas id = {"chart_"+(parseInt(index))} width="400" height="400"></canvas>
                    </div>
                  );
                })}
              </div>

            </Tab>

          </Tabs>

          <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={open => this.setState({drawerOpen:open})}
          >
            <div>
              {this.state.courses.map(function(title){
                return <MenuItem>{title}</MenuItem>;
              })}


            </div>


          </Drawer>
        </div>



      </div>
    </MuiThemeProvider>


    );
  }
}
ReactDom.render((<App/>),document.getElementById('app'));
