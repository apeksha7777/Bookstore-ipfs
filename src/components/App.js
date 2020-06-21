import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Bookstore from '../abis/Bookstore.json';
import Main from '../components/Main.js';

class App extends Component {

  async componentWillMount(){
    await this.loadweb3();
    await this.loadblockchaindata();
    
  }
  async loadweb3()
  {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
 }
  
async loadblockchaindata(){
   const web3=window.web3;
   const accounts=await web3.eth.getAccounts();
   this.setState({account:accounts[0]});
   
   const abi=Bookstore.abi;
   const networkid=await web3.eth.getId();
   const networkdata=Bookstore.networks[networkid];
   if(networkdata)
   {
    const address=networkdata.address;
    const bookstore=web3.eth.Contract(abi,address);
    console.log(bookstore);
    this.setState({bookstore});
   
    const bookcount= await this.state.bookstore.methods.totalBooks().call();
    this.setState({bookcount});
    console.log(bookcount.toString());
  //   this.state.bookstore.methods.Purchase(1).send({from:this.state.account})
  // .once('receipt',(receipt)=>{
   
  // })
    for(let i=0;i<bookcount;i++)
              {
               
                const result=await bookstore.methods.retreive(i).call();
                console.log(result);
                
                this.setState({
                  bookslist:[...this.state.bookslist,result]
                })
                
                 
              }
              console.log(this.state.bookslist);
             

   }
   else
   {
    console.log("contract not deployed to detected network");

   }
}

constructor(props)
{
  super(props);
  this.state={
    account:'',
    loading:false,
    bookslist:[],
    bookcount:0

  }
  this.store=this.store.bind(this);
  this.buybook = this.buybook.bind(this)
  // this.totalbooks=this.totalbooks.bind(this);
}

store(bookname,bookhash,coverhash,deschash,amount){
 
  this.state.bookstore.methods.store(bookname,bookhash,coverhash,deschash,amount).send({from:this.state.account})
  .once('receipt',(receipt)=>{
   
  })


}

buybook(id,price){
  this.state.bookstore.methods.Purchase(id).send({ from: this.state.account, value: price })
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
}



render() {
  return (
    <div>
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"></link>
      <div className="banner">
        <h1 className="card-title">Let your thoughts reach the world</h1>
      </div>
      <p>{this.state.account}</p>
      <main role="main" className="col-lg-12 d-flex">
    { this.state.loading
    ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
     : <Main 
            store={this.store}
            bookslist={this.state.bookslist}
            buybook={this.buybook}
       />
    }
      </main>

      
     
    </div>
  );
}
}


  

export default App;
