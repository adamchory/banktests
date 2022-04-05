//////////START: Deposit Function//////////
function Deposit(){

  const ctx = React.useContext(UserContext);
  const [show, setShow]         = React.useState(false);
  const [status, setStatus]     = React.useState('');
  const [deposit, setDeposit] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const ctx_transaction         = React.useContext(transactionContext);

  let errorID = 0; //initially no errors

 //firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyCGSxC8AK6ifFjPgTLXOHXNUzV6PJeq4H8",
  authDomain: "bankingapp-c79aa.firebaseapp.com",
  projectId: "bankingapp-c79aa",
  storageBucket: "bankingapp-c79aa.appspot.com",
  messagingSenderId: "197131504320",
  appId: "1:197131504320:web:cf3cecc294712dc8e3bb25"
  };
// Initialize Firebase
if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}else {
firebase.app(); // if already initialized, use that one
}

React.useEffect(() => {
      
  // login state
firebase.auth().onAuthStateChanged(firebaseUser => {
  console.log("user", firebaseUser);
  console.log(firebaseUser.email);
  if(firebaseUser){
      setEmail(firebaseUser.email);
  }
  else{
    
  }
});

}, []);




  //////////START: Function to Handle changes in the deposit input box//////////
  function handleChange(e) {

    setDeposit((e.target.value));

    /////START: If the input is NaN/////
    if (isNaN(e.target.value)) {
      /////START: If the input is negative/////
      if (e.target.value === '-'){
        setDeposit('');
        setStatus('Deposits must be positive numbers');
        setTimeout(() => setStatus(''),3000);
        errorID = 1;
        return setIsValid(false);
      } 
      /////END: If the input is negative/////
      else {
        setDeposit('');
        setStatus('Deposits can only contain numbers');
        setTimeout(() => setStatus(''),3000);
        errorID = 2;
        return setIsValid(false);
      }
    } 
    /////END: If the input is NaN/////

    setDeposit(Number(e.target.value))

    /////START: If 0 is input first/////
    if (Number(e.target.value) === 0) {
      setDeposit('');
      setStatus('Field Required');
      setTimeout(() => setStatus(''),3000);
      errorID = 3;
      return setIsValid(false);
    } 
    /////END: If 0 is input first/////

    /////START: If there is no error/////
    if ( errorID < 1 ) {
      return setIsValid(true);
    }
    /////END: If there is no error/////
  }
  //////////END: Function to Handle changes in the input box//////////


  
  //////////START: Function to Handle deposit onClick event//////////
  function initiaiteDeposit() {
     // call server with token
     if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken()
      .then(idToken => {
          console.log('idToken:', idToken);
          //async "iffe" function -> auto-executes
          (async () => {
              let response = await fetch(`/account/findOne/${email}`, {
                  method: 'GET',
                  headers: {
                      'Authorization': idToken
                  }
              })
              .then(response => response.text())
              .then(text => {
                  try {
                      const data = JSON.parse(text);
                      setShow(true);
                      setAmount(data.balance);
                      console.log(data.balance);
                  } catch(err) {
                      setStatus(text)
                      setTimeout(() => setStatus(''),3500);
                      console.log('err:', text);
                  }
              });
              // let text = await response();
              // console.log('response:', response);
          })();

      }).catch(e => console.log('e:', e));
  } else {
      console.warn('There is currently no logged in user. Unable to call Auth Route.');
      setStatus('user must be signed in to make deposits');
      setTimeout(() => setStatus(''),3500);
      setAmount('');
  }

  }
//////////END: Function to Handle deposit onClick event//////////

//////////START: Function to clear deposit form//////////
  function handleDeposit(){
    console.log(amount);
    console.log(deposit);

    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken()
      .then(idToken => {
          console.log('idToken:', idToken);
          //async "iffe" function -> auto-executes
          (async () => {
              let response = await fetch(`/account/update/${email}/${deposit}`, {
                  method: 'GET',
                  headers: {
                      'Authorization': idToken
                  }
              })
              .then(response => response.text())
              .then(text => {
                  try {
                      const data = JSON.parse(text);
                      setStatus(`Deposited : $${deposit}`);
                      setTimeout(() => setStatus(''),6000);
                      setShow(false);
                      console.log('JSON:', data);
                  } catch(err) {
                      setStatus('Deposit failed')
                      setTimeout(() => setStatus(''),5000);
                      console.log('err:', text);
                      setShow(false);
                      setAmount('');
                      setIsValid(false);
                      errorID = 0;
                  }
              });
              // let text = await response();
              // console.log('response:', response);
          })();

      }).catch(e => console.log('e:', e));
  } else {
      console.warn('There is currently no logged in user. Unable to call Auth Route.');
      setStatus('user must be signed in to make a deposit');
      setTimeout(() => setStatus(''),3500);
  }
    //ctx_transaction.transactions.push({name: ctx.users[ctx.users.length - 1].name, amount: deposit,type: 'Deposit', balance: ctx.users[ctx.users.length - 1].balance});

  }
//////////END: Function to clear deposit form//////////

  return (
    <Card
      bgcolor="success"
      header="Deposit Form"
      title="Make your deposits here"
      status={status}
      body={show ? (  
              <>
              <h5 className="font-Bold">{`${email}, press to make a deposit to your account`}</h5>
              <h5 className="font-Bold">{`your account currently has $${amount}`}</h5>
              Deposit Amount<br/>
              <input type="input" className="form-control" id="deposit" placeholder="Enter Deposit Amount" value={deposit} onChange={handleChange} /><br/>
              <button type="submit" className="btn btn-light" onClick={handleDeposit} disabled={!isValid}>Finalize Deposit</button>
              </>
            ):(
              <>
              <h5 className="font-italic">Press to make a Deposit</h5>
              <button type="submit" className="btn btn-light" onClick={initiaiteDeposit}>Make A Deposit</button>
              </>
            )}
    />
  )
}
//////////END: Deposit Function//////////