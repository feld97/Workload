import React from 'react';
import ReactDom from 'react-dom';
import {AppBar, Tabs, Tab, Drawer} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();


export default class Header extends React.Component{
  constructor(props) {
    super(props);
    this.state=
      {
        open: false
      };

  }
    // toggle() {
    //   this.setState({ open: !open});
    // }
  render() {
      return (
        // <MuiThemeProvider>
        <div>
          <AppBar
            title="Hello World"
            iconElementLeft={
              <IconButton iconClassName="material-icons" onClick={() => {this.setState({ open: !this.state.open});}}>reorder</IconButton>
            }
            iconElementRight={
              <IconButton iconClassName="material-icons" onClick={this.props.addCourse}>add</IconButton>
            }
          />
            <Tabs>
              <Tab label="Item 1" />
              <Tab label="Item 2" />

            </Tabs>

            <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open:open})}
        />
        </div>

        // </MuiThemeProvider>
      );
  }
}

// ReactDom.render(<App/>,document.getElementById('app'));
