import React, { Component } from 'react'
import {Button,Container,Row,Col,Input,Form,Card,CardHeader,CardBody,Label,FormGroup} from 'reactstrap';
import firebase from '../Firebase';

import Products_panel from './Products_panel';

 class EditTender extends Component {

     constructor(props){
         super(props);
         this.state={
             key:'',
             currentTendor:{
                 Tname:'',
                 products:[]

             }
            }
     }
     componentDidMount(){
         
        const ref = firebase.firestore().collection('Tendor').doc(this.props.match.params.id);
           this.setState({key:this.props.match.params.id});
        ref.get().then((doc) => {
            if (doc.exists) {
                 
                console.log(doc.data());
                this.setState({currentTendor:doc.data()});
                
            } else {
              console.log("No such document!");
            }
          });
          
     }

   OnSubmit=(e)=>{
       e.preventDefault();
       alert('submitted');
      
       
   }
   OnChange=(e)=>{
       console.log(e.target.value);
       
   }

    render(){
        return (
            <div className="HeaderFix">
            <Card className="mt-2">
                <CardHeader tag="h3" className="text-center">Fill Your Tendor</CardHeader>
                <CardBody>
                    <FormGroup>

                    <Row>
                    <Label className="mt-2">Select Tender Name</Label> 
                    <Col md={5}>
                       <Input type="text" name="Tname" disabled={true} value={this.state.currentTendor.Tname} ></Input>
                    </Col>
                    <Col md={7}></Col>
                    </Row> 
                    </FormGroup>
                </CardBody>
            </Card>

                   
       
            <Card className="mt-2">
                <CardHeader className="text-center" tag="h5">Components and information</CardHeader>
                <CardBody>
                    <Label> Products</Label>

           {this.state.currentTendor.products.length!==0?<Products_panel OnChange={this.OnChange} keyVal={this.state.key} products={this.state.currentTendor.products}></Products_panel>:console.log('false')
           }
               </CardBody>
            </Card>

            <div className="text-center">

            </div>
            </div>
        )

    }
    
}
export default EditTender;