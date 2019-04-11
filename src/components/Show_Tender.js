import React, { Component } from 'react'
import {Container,Row,Table,Col,Card,CardHeader,Button} from 'reactstrap';
import firebase from '../Firebase';

import { Link } from 'react-router-dom';


class ShowTender extends Component {
    
    constructor(props){
       super(props); 
    this.ref = firebase.firestore().collection('Tendor');
    this.unsubscribe=null
       this.state={
           Tendors:[]
       } ;
    }


onCollectionUpdate = (querySnapshot) => {
    
    const tendors=[];
    querySnapshot.forEach((doc) => {
          let {Tname,branch,department,location,startDate,endDate,conditions,products}=doc.data();         
          tendors.push({
               key:doc.id,
               Tname,
               branch,
               department,
               location,
               products
            });
    });
    console.log(tendors);
    
    this.setState({Tendors:tendors});
  }





    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
            
    }

    render(){
        return (
            <div className="HeaderFix">
            
            <Container>
              <Card>
                  <CardHeader tag="h4" className="text-center">
                      Tendor's Table
                    
                  </CardHeader>
                   <Table hover>
              <thead>
                <tr>
                  <th>Tendor Name</th>
                  <th>Branch</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Products</th>
                </tr>
              </thead>
              <tbody>
              {this.state.Tendors.map((data,i) =>
                  <tr key={i}>
                    <td><Link to={`/Edit/${data.key}`}>{data.Tname}</Link></td>
                    <td>{data.branch}</td>
                    <td>{data.department}</td>
                    <td>{data.location}</td>
                    <td>{data.products.length}</td>
                  </tr>
                )}
              </tbody>
            </Table>
                  
                </Card> 
            </Container>
            
            </div>
        )

    }
}

export default ShowTender;