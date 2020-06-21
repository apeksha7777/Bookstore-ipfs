import React, { Component } from 'react';
// const ipfsClient = require('ipfs-http-client')
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class Main extends Component {

    constructor(props){
        super(props);
        this.state={
           buffer:null
        }

   }
    handleSubmit = (event) => {
        event.preventDefault();
        //  ipfs.add(this.state.buffer,(error,result)=>
        //  {
        //      if(error)
        //      {
        //          console.log(error);
        //          return;
        //      }
        //  })

        const prefix=event.target.elements;
       let bcontent="0x6c00000000000000000000000000000000000000000000000000000000000000";
        let bcover="0x6c00000000000000000000000000000000000000000000000000000000000000";
        let bdesc="0x6c00000000000000000000000000000000000000000000000000000000000000";
        const bprice=window.web3.utils.toWei(prefix.price.value.toString(),'Ether');
        this.props.store(prefix.name.value,bcontent,bcover,bdesc,bprice);
       
      }


      capturecover=(event)=>{
          event.preventDefault();
          console.log("captured");
          const file=event.target.files[0];
          const reader=new window.FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload=()=>{
             //this.setState({buffer:Buffer(reader.result)});
              
          }
      }
    render() {
        
        return (
            <div>
<div className="card">

  <img className="card-img" src={ require('../components/assets/img/camera-bg.jpg') } />
  <form onSubmit={this.handleSubmit}>
  <div className="card-img-overlay">
     
      <label htmlFor="bookname">Enter name of your book:</label>
      <textarea id="bookname" name="name" rows="1" cols="50"></textarea>
      <label htmlFor="myfile">Select content of your book:</label>
      <input type="file" id="myfile" name="myfile"></input>
      <label htmlFor="img">Select book cover:</label>
      <input type='file' onChange={this.capturecover}></input>
      <label htmlFor="description">Add description to your book:</label>
      <textarea id="description" name="desc" rows="4" cols="50"></textarea>
      <label htmlFor="quantity">Add price to your book in rupees:</label>
      <input type="number" id="price" name="price" min="1" max="500000"></input>
      <button  id="publishbtn" >publish book</button>
     
  </div>
  </form>
  
</div>
<div>
{
      this.props.bookslist.map((book,key)=>{
          return(
              <tr key={key}>
                
                   <td>{book[0]}-</td>
                   <td>{ book[1]}-</td>
                   <td>{book[2]}-</td>
                   <td>{book[3]}-</td>
                   <td>{window.web3.utils.fromWei(book[4].toString(),'Ether')}-</td>
                   <td>{book[5]}-</td>
                   <td>{book[6].toString()}</td>
                   <td><button   name={book[6].toString()}
                         value={book[4]}
                        onClick={(event)=>{
                       console.log("buy button clicked") 
                       
                        this.props.buybook(event.target.name,event.target.value);
                   }}>Buy</button></td>
                 
              </tr>
          )

      })
  }
</div>
</div>
);
}
}
export default Main;