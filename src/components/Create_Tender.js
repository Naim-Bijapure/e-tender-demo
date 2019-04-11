import React, { Component } from 'react'
import {Container,Card,Button,Input,Col, Form,FormGroup, Row,CardHeader,CardBody,Label} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../App.css';
import firebase from '../Firebase';

 class CreateTender extends Component {

     constructor(props){
         super(props);
    this.ref = firebase.firestore().collection('Tendor');
         this.state={
                 numChildren: 0,
                 Products:[]
         }
     }


        products=[];


     ParentComponent = props => (
        <div className="card calculator">
          {/* <p><a href="#" onClick={props.addChild}>Add Another Child Component</a></p> */}
        <Row>
            <Col md={10}></Col>
            <Col md={2}>   
          <Button onClick={props.addChild} color="primary" className="mt-2 my-2">Add Product</Button>
            
            </Col>
        </Row>
          <div id="children-pane">
            {props.children}
          </div>
        </div>
      );

      onAddChild = () => {
        this.setState({
          numChildren: this.state.numChildren + 1
        });
     
        
      }



       ChildComponent = props => <div>
                              {/* {"I am child " + props.number} */}
                  <Row className="mx-2">
                   <Col>
                  <FormGroup>  
                       <Label for="examplePassword">Product Name</Label>
                       <Input required type="text" name={`Pname${props.number}`} onChange={this.OnChange} id="" placeholder="Enter Product" />
                    
                   </FormGroup>     
                   </Col>

                   <Col>
                  <FormGroup>  
                       <Label for="examplePassword">Product Quantity</Label>
                       <Input required type="number" name={`PQuantity${props.number}`} onChange={this.OnChange}  id="" placeholder="Enter Quantity" />
                    
                   </FormGroup>     
                   </Col>

                   <Col>
                  <FormGroup>  
                       <Label for="examplePassword">Units</Label>
                       <Input required type="number" name={`PUnit${props.number}`} onChange={this.OnChange}  id="" placeholder="Unit" />
                    
                   </FormGroup>     
                   </Col>
                   
                   
               </Row> 
                 </div>;
                              
                              
   OnSubmit(e){
       e.preventDefault();
       let Prods=[];
       for (let index = 0; index <this.state.numChildren; index++) {
            //   console.log(e.target[`Pname${index}`].value);
             Prods.push({
                     Pname:e.target[`Pname${index}`].value,
                     PQuantity:e.target[`PQuantity${index}`].value,
                     PUnit:e.target[`PUnit${index}`].value
                    
                    }); 
           }
             
                         
       let {Tname,branch,department,location,startDate,endDate,conditions}=e.target;
       
       let TendorData={
           Tname:Tname.value,
           branch:branch.value,
           department:department.value,
           location:location.value,
           startDate:startDate.value,
           endDate:endDate.value,
           conditions:conditions.value,
           products:Prods
       } 
       console.log(TendorData);
     
       //! adding data to database
       this.ref.add({...TendorData})
              .then((docref)=>{
                  console.log('doc added');
                  
                this.props.history.push('/Show');
              })
            .catch((e)=>{
                console.log('error',e);
                
            });
              
              
   } 
   OnChange=(e)=>{
   }

    render(){
         const children = [];

           for (var i = 0; i < this.state.numChildren; i += 1) {
                    children.push(<this.ChildComponent key={i} number={i} />);
               };

        return (
              <div class="container HeaderFix">
               <Container>
                <Form onSubmit={this.OnSubmit.bind(this)}>
                    <Card>
                    <CardHeader tag="h3" className="text-center">Create Your Tendor</CardHeader>
                   <CardBody>
             <FormGroup >
                 <Row> 
                     <Label for="exampleEmail" sm={2} size="md">Tendor Name</Label>
                   <Col sm={10}>
                        <Input required required type="text" name="Tname" onChange={this.OnChange}  id="" placeholder="Enter" bsSize="md" />
                    </Col>
                 </Row>
            </FormGroup>
               </CardBody>
                  </Card>

                    <Card className="mt-4">
                    <CardHeader tag="h5" className="">Location & Date</CardHeader>
                   <CardBody>
                

                     <Row >
                       <Col md={4}>
                      <FormGroup>
                          <Label >Branch</Label>
                          <Input required type="text" name="branch" id="" placeholder="Enter Branch Name" />
                      </FormGroup>
                        </Col>
                     <Col md={4}>
                     <FormGroup>
                       <Label for="examplePassword">Department</Label>
                       <Input required type="text" name="department" id="" placeholder="Enter Department Name" />
                     </FormGroup>
                   </Col>

                   <Col md={4}>
                     <FormGroup>
                       <Label for="examplePassword">Location</Label>
                       <Input required type="text" name="location" id="" placeholder="Enter Location" />
                     </FormGroup>
                   </Col>
                  </Row>

                  <Row>
                      <Col> 
                    <FormGroup>
                        <Label for="examplePassword">Start Date</Label>
                       <Input required type="date" name="startDate" id="" placeholder="" />
                    </FormGroup>
                      </Col>
                                

                      <Col> 
                    <FormGroup>
                        <Label for="examplePassword">End Date</Label>
                       <Input required type="date" name="endDate" id="" placeholder="" />
                    </FormGroup>
                      </Col>
                                
                  </Row>
               </CardBody>
                  </Card>
               

             <Card className="mt-4">
                  <CardHeader tag="h5" className="">Components information</CardHeader>
                     <CardBody>
            
                     
                    {
                        <this.ParentComponent addChild={this.onAddChild} >
                         {children}
                        </this.ParentComponent>
                    }
                     </CardBody>
                     
             </Card>


             <Card className="mt-4">
                  <CardHeader tag="h5" className="">Terms and Conditions</CardHeader>
                     <CardBody>
                  <FormGroup>
                    <Label htmlFor="conditions">please enter term's and conditions of the tender</Label>
                      <Input type="textarea"  rows="8" cols="5" name="conditions" id="exampleText" />
                    </FormGroup>
                     
                    
                     </CardBody>
                     
             </Card>

              <Button type="submit" color="primary">Submit</Button>                  
                </Form>
               </Container>



                           
                           

      </div>
        )

    }

    componentWillMount(){
        console.log('mounted create');
    }
}
export default CreateTender;