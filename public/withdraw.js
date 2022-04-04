//////////START: Function Withdraw/////////
function Withdraw(){
  const ctx = React.useContext(UserContext);
  const [show, setShow]         = React.useState(false);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail] = React.useState('');
  const [withdraw, setWithdraw] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const ctx_transaction         = React.useContext(transactionContext);
  let errorID = null;
  
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



  //////////START: Function to handle changes in the Withdrawal input form//////////
  function handleChange(e) {
    errorID=0;
    setWithdraw(e.target.value)

    /////START: if NaN is inputted/////
    if (isNaN(e.target.value)) {
      /////START: if a - is the NaN inputted/////
      if (e.target.value === '-'){
        setWithdraw('');
        setStatus('Withdrawals must be positive numbers');
        setTimeout(() => setStatus(''),3000);
        errorID = 1;
        return setIsValid(false);
      } 
      /////END: if a - is the NaN inputted/////

      else {
        setWithdraw('');
        setStatus('Withdrawals can only contain numbers');
        setTimeout(() => setStatus(''),3000);
        errorID = 2;
        return setIsValid(false);
      }
    } 
    /////END: if NaN is inputted/////


    setWithdraw(Number(e.target.value))

    /////START: If 0 is inputted/////
    if (Number(e.target.value) === 0) {
      setWithdraw('');
      setStatus('Field Required');
      setTimeout(() => setStatus(''),3000);
      errorID = 3;
      return setIsValid(false);
    } 
     /////END: If 0 is inputted/////

    /////START: If withdrawal is > balance/////
    if ((e.target.value) > amount) {
      setWithdraw('');
      setStatus('Insufficient Funds');
      setTimeout(() => setStatus(''),3000);
      errorID = 4;
      return setIsValid(false);
    } 
    /////END: If withdrawal is > balance/////

    /////START: If tests passed/////
    if ( errorID < 1 && e.target.value != '') {
      return setIsValid(true);
    }
    /////END: If tests passed/////
  }
  //////////END: Function to Handle changes in the input box//////////



   //////////START: Function to Handle deposit onClick event//////////
   function initiaiteWithdrawal() {
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
     setStatus('user must be signed in to make withdrawals');
     setTimeout(() => setStatus(''),3500);
     setAmount('');
 }

 }
//////////END: Function to Handle deposit onClick event//////////



  //////////START: Transaction Submitted//////////
  
//////////START: Function to clear withdrawal form//////////
function handleWithdraw(){
  console.log(amount);
  console.log(withdraw);

  if (firebase.auth().currentUser) {
    firebase.auth().currentUser.getIdToken()
    .then(idToken => {
        console.log('idToken:', idToken);
        //async "iffe" function -> auto-executes
        (async () => {
            let response = await fetch(`/account/update/${email}/-${withdraw}`, {
                method: 'GET',
                headers: {
                    'Authorization': idToken
                }
            })
            .then(response => response.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setStatus(`Withdrew : $${withdraw}`);
                    setTimeout(() => setStatus(''),6000);
                    setShow(false);
                    console.log('JSON:', data);
                } catch(err) {
                    setStatus('Withdrawal failed')
                    setTimeout(() => setStatus(''),6000);
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
  //////////END: Transaction Submitted//////////
  

  return (
    <Card
    bgcolor="danger"
    header="Withdrawal Form"
    title="Make your withdrawals here"
    status={status}
    body={show ? (  
            <>
            <h5 className="font-Bold">{`${email}, press to make a deposit to your account`}</h5>
            <h5 className="font-Bold">{`your account currently has ${amount}`}</h5>
            Withdrawal Amount<br/>
            <input type="input" className="form-control" id="withdraw" placeholder="Enter Withdrawal Amount" value={withdraw} onChange={handleChange} /><br/>
            <button type="submit" className="btn btn-light" onClick={handleWithdraw} disabled={!isValid}>Finalize Withdrawal</button>
            </>
          ):(
            <>
            <h5 className="font-italic">Press to make a Withdrawal</h5>
            <button type="submit" className="btn btn-light" onClick={initiaiteWithdrawal}>Make A Withdrawal</button>
            </>
          )}
  />
  )
}
//////////END: Function Withdraw/////////