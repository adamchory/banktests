function Spa() {
  return (
    <HashRouter>
      <NavBar/>
      <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
        <transactionContext.Provider value={{transactions:[{name:'abel',amount:100, type: 'On SignUp', balance:100}]}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/Login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/activity/" component={Activity} /> */}
            <Route path="/Balance/" component={Balance} />
            {/* <Route path="/alldata/" component={AllData} /> */}
            <Route path="/userdata/" component={UserData} />
            <Route path="/logout/" component={Logout} />
          </div>
          </transactionContext.Provider>
      </UserContext.Provider>      
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
