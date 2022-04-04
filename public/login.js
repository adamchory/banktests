function Login(){
    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isPasswordValid, setIsPasswordValid] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const ctx                     = React.useContext(UserContext);
    const ctx_transaction         = React.useContext(transactionContext);

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
  
  // (async () => {
  //     try {
  //         firebase.initializeApp(firebaseConfig);
  //         //if user is logged in, it persists through refreshes, this eliminates that issue
  //         await firebase.auth().signOut();
  //         const createUserResult = await firebase
  //             .auth()
  //             .createUserWithEmailAndPassword("example@mit.edu", "secret")
  //             console.log('createUserResult', createUserResult)
  //         firebase.auth().signOut();
  //     } catch(e) {
  //         console.log(e);
  //     }
  // })();

  //check for authorization state changes in the browser to determine to show the form or not
  React.useEffect(() => {
        
    // login state
  firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log("user", firebaseUser)
    console.log(firebaseUser.email)
    if(firebaseUser){
        setShow(false);
        setEmail(firebaseUser.email);
        //don't show login form
    }
    else{
        setShow(true);
        //show login form
    }
});

}, []);

  //function for changes in the email input
    function handleEmailChange (e) {
      setEmail((e.target.value));
        if (e.target.value.length <= 0) {
              setEmail('');
              setStatus('Email Required');
              setTimeout(() => setStatus(''),3000);
              return setIsEmailValid(false);
        }
        else {
              return setIsEmailValid(true);
        }
  }

  //function for changes in the password input
  function handlePasswordChange (e) {
    setPassword((e.target.value));
      if (e.target.value.length <= 0) {
            setPassword('');
            setStatus('Password Required');
            setTimeout(() => setStatus(''),3000);
            return setIsPasswordValid(false);
      }
      else {
            return setIsPasswordValid(true);
      }
  }
  
  function handleCreate(){
    console.log(email,password);
    //console.log(ctx.users.length)
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(
      email,
      password
    );
    promise.catch((e) => {
      console.log(e.message)
      setStatus(e.message)
      setTimeout(() => setStatus(''),3500);
      setShow(true)
    });

    // fetch(`/account/login/${email}/${password}`)
    // .then(response => response.text())
    // .then(text => {
    //     try {
    //         const data = JSON.parse(text);
    //         setStatus('');
    //         setShow(false);
    //         console.log('JSON:', data);
    //     } catch(err) {
    //         setStatus(text)
    //         console.log('err:', text);
    //     }
    // });    
  }   
  
  function clearForm(){
    firebase.auth().signOut();
    setEmail('');
    setPassword('');
    setShow(true);
    setStatus('')
  } 
  
    return (
      <Card
      bgcolor="warning"
      header="LogIn"
      status={status}
      body={show ? (  
              <>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={handlePasswordChange}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={!isEmailValid || !isPasswordValid}>Login</button>
              </>
            ):(
              <>
              <h5>{`${email}, you are logged into your online bank account!`}</h5>
              <h5>Click below to logout</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Logout</button>
              </>
            )}
    />
    )  
  }
  