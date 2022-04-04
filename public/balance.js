//////////START OF Balance FUNCTION//////////
function Balance(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]     = React.useState('');
  const [balance, setBalance]     = React.useState('');
  const ctx = React.useContext(UserContext);
  
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
  console.log("user", firebaseUser)
  console.log(firebaseUser.email)
  if(firebaseUser){
    //setShow(true);
      setEmail(firebaseUser.email);
  }
  else{
      //setShow(true);
  }
});

}, []);

  function handleBalance(){
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
                      setShow(false);
                      setBalance(data.balance);
                      console.log(data);
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
      setStatus('user must be signed in to check balance');
      setTimeout(() => setStatus(''),3500);
  }

  }

   //////////START: CLEARFORM function//////////
   function clearForm(){
    setShow(true);
  }
  //////////END: CLEARFORM function//////////

    return (
      <>
       <Card
      bgcolor="primary"
      header="Balance"
      status={status}
      body={show ? (  
              <>
              <button type="submit" className="btn btn-light" onClick={handleBalance}>Check Current Balance</button>
              </>
            ):(
              <>
              <h5>{`Thanks ${email}, your current balance is $${balance}`}</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Hide Balance</button>
              </>
            )}
    />
  
    </>);  
  }
  //////////END OF Balance FUNCTION//////////