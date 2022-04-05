function NavBar(){

  const [badBankStyle, setBadBankStyle] = React.useState({backgroundColor: null});
  const [createAccountStyle, setCreateAccountStyle] = React.useState({backgroundColor: null});
  const [loginStyle, setLoginStyle] = React.useState({backgroundColor: null});
  const [depositStyle, setDepositStyle] = React.useState({backgroundColor: null});
  const [withdrawStyle, setWithdrawStyle] = React.useState({backgroundColor: null});
  const [activityStyle, setActivityStyle] = React.useState({backgroundColor: null});
  const [balanceStyle, setBalanceStyle] = React.useState({backgroundColor: null});
  const [allDataStyle, setAllDataStyle] = React.useState({backgroundColor: null});
  const [userDataStyle, setUserDataStyle] = React.useState({backgroundColor: null});
  const [logoutStyle, setLogoutStyle] = React.useState({backgroundColor: null});
  
  function handleBadBank() {
    setBadBankStyle({backgroundColor: 'green'})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: null});
  }
  function handleCreateAccount() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: 'blue'});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: null});
  }
  function handleLogin() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: 'yellow'});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: null});
  }
  function handleDeposit() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: 'green'});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: null});
  }
  function handleWithdraw() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: 'red'});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: null});
  }
  function handleActivity() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: 'orange'});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: null});
  }
  function handleBalance() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: 'blue'});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: null});
  }
  function handleAllData() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: 'orange'});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: null});
  }
  function handleUserData() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: 'yellow'});
    setLogoutStyle({backgroundColor: null});
  }
  function handleLogout() {
    setBadBankStyle({backgroundColor: null})
    setCreateAccountStyle({backgroundColor: null});
    setLoginStyle({backgroundColor: null});
    setDepositStyle({backgroundColor: null});
    setWithdrawStyle({backgroundColor: null});
    setActivityStyle({backgroundColor: null});
    setBalanceStyle({backgroundColor: null});
    setAllDataStyle({backgroundColor: null});
    setUserDataStyle({backgroundColor: null});
    setLogoutStyle({backgroundColor: 'red'});
  }
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">GoodBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav text-center">
          <li className="nav-item" style={createAccountStyle} onClick={handleCreateAccount}>
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item" style={loginStyle} onClick={handleLogin}>
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item" style={depositStyle} onClick={handleDeposit}>
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item" style={withdrawStyle} onClick={handleWithdraw}>
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          {/* <li className="nav-item" style={activityStyle} onClick={handleActivity}>
            <a className="nav-link" href="#/activity/">Activity</a>
          </li> */}
          <li className="nav-item" style={balanceStyle} onClick={handleBalance}>
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>  
          {/* <li className="nav-item" style={allDataStyle} onClick={handleAllData}>
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>   */}
          <li className="nav-item" style={userDataStyle} onClick={handleUserData}>
            <a className="nav-link" href="#/userdata/">UserData</a>
          </li>  
          <li className="nav-item" style={logoutStyle} onClick={handleLogout}>
            <a className="nav-link" href="#/logout/">Logout</a>
          </li>          
        </ul>
      </div>
    </nav>
    </>
  );
}

