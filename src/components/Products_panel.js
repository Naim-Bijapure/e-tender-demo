import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button,Input,Col,Row,Form,FormGroup,Label} from 'reactstrap';

import firebase from '../Firebase';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class ProductsPanels extends React.Component {
    
     constructor(props){
      super(props);   
      this.state = {
         expanded: null,
        };


            this.ref= React.createRef();
        
      }
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  
   OnSubmit=(e)=>{
     e.preventDefault();
     const updateRef = firebase.firestore().collection('Tendor').doc(this.props.keyVal);
    
   
   }


    componentDidMount(){
      console.log('panel');
      
             
              
    }


  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
     let {products,keyVal}=this.props;
     
    return (
      <div className={classes.root}>
        <Form onSubmit={this.OnSubmit}>

          {
            products.map((data,i)=>{
             
              
    return(
     
      <ExpansionPanel key={i}  expanded={expanded === `panel${i}`} onChange={this.handleChange(`panel${i}`)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}> {data.Pname}</Typography>
            <Typography className={classes.secondaryHeading}>Quantity : {data.PQuantity}</Typography>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails>
             <Row>
              <Col md={3}>
                <Label>Actual Price per Quantity</Label> 
                <Input type="number" onChange={this.props.OnChange}> </Input>
              </Col> 

              <Col md={3}>
                <Label style={{fontSize:'15px'}}>Discounted Price per Quantity</Label> 
                <Input type="number" ref={this.ref} onChange={this.props.OnChange}> </Input>
              </Col>


              <Col md={3}>
                <Label>% Applicable</Label> 
                <Input type="select" name="gstPercent" id="exampleSelect" onChange={this.props.OnChange}>
            <option>choose</option>
            <option value="5%">5%</option>
            <option value="12%">12%</option>
            <option value="18%"> 18%</option>
            <option value="28%">28%</option>
            
          </Input>
              </Col>


              <Col md={3}>
                <Label>GST Type</Label> 
          <Input type="select" name="gstType" id="exampleSelect" onChange={this.props.OnChange}>
            <option>choose</option>
            <option value="central">Central</option>
            <option value="inter-state">Inter-State</option>
            
          </Input>
              </Col>
              

              <Col  >
                <Label className="mt-2">CGST</Label> 
                <Input type="number" name="cgst" onChange={this.props.OnChange}> </Input>
              </Col>

              <Col  >
                <Label className="mt-2">SGST</Label> 
                <Input type="number" name="scst" onChange={this.props.OnChange}> </Input>
              </Col>

              <Col  >
                <Label className="mt-2">IGST</Label> 
                <Input type="number" name="igst" onChange={this.props.OnChange}> </Input>
              </Col>

              <Col  >
                <Label className="mt-2">Total</Label> 
                <Input type="number" name="total" onChange={this.props.OnChange}> </Input>
              </Col>
 
               </Row>

               

          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
   
            })
          }

            <div className="text-center mt-4">
           
                    <Button type="submit" > submit</Button>

           </div>
        </Form>
      </div>
    );
  }
}

ProductsPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsPanels);
