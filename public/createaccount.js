//////////START: CREATE ACCOUNT function//////////
function CreateAccount(){
        
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
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


/////START:function to handle changes in the name input box/////
  function handleNameChange (e) {
        setName((e.target.value));
        /////START: If nothing is entered/////
          if (e.target.value.length <= 0) {
                setName('');
                setStatus('Name Required');
                setTimeout(() => setStatus(''),3000);
                return setIsNameValid(false);
          }
          /////END: If nothing is entered/////

          /////START: If something has been entered/////
          else {
                return setIsNameValid(true);
          }
          /////END: If something has been entered/////
  }
/////END:function to handle changes in the name input box/////


/////START:function to handle changes in the email input box/////
  function handleEmailChange (e) {
        setEmail((e.target.value));
        /////START: If nothing is entered/////
          if (e.target.value.length <= 0) {
                setEmail('');
                setStatus('Email Required');
                setTimeout(() => setStatus(''),3000);
                return setIsEmailValid(false);
          }
          /////END: If nothing is entered/////

          /////START: If something has been entered/////
          else {
                return setIsEmailValid(true);
          }
          /////END: If something has been entered/////
  }
/////END:function to handle changes in the email input box/////


/////START:function to handle changes in the password input box/////
  function handlePasswordChange (e) {
        setPassword((e.target.value));
          /////START: If nothing is entered/////
          if (e.target.value.length <= 0) {
                setPassword('');
                setStatus('Password Required');
                setTimeout(() => setStatus(''),3000);
                return setIsPasswordValid(false);
          }
          /////END: If nothing is entered/////

          /////START: If password is under 8 characters/////
          if (e.target.value.length<8){
                setStatus('Password must be atleast 8 characters');
                setTimeout(() => setStatus(''),3000);
                return setIsPasswordValid(false);
          }
          /////END: If password is under 8 characters/////

          /////START: If password tests pass/////
          else {
                return setIsPasswordValid(true);
          }
          /////END: If password tests pass/////
  }
  /////END:function to handle changes in the password input box/////



  //////////START: function to create account after validation passes//////////
  function handleCreate(){
    console.log(name,email,password);

    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(
      email,
      password
    )
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user
      
      //push to database
      const url = `/account/create/${name}/${email}/${password}`;
      setShow(false);
      (async () => {
      var res  = await fetch(url);
      var data = await res.json();  

      console.log(data);        
  })();

    });
    promise.catch((e) => {
      console.log(e.message);
      
      setStatus(e.message);
      setTimeout(() => setStatus(''),3500);

    });

    // const promise2 = auth.signInWithEmailAndPassword(
    //   email,
    //   password
    // );
    // promise2.catch((e) => console.log(e.message));
    // setShow(true)

  //   if (firebase.auth().currentUser) {
  //     firebase.auth().currentUser.getIdToken()
  //     .then(idToken => {
  //         console.log('idToken:', idToken);
  //         //async "iffe" function -> auto-executes
  //         (async () => {
  //             let response = await fetch(`/account/create/${name}/${email}/${password}`, {
  //                 method: 'GET',
  //                 headers: {
  //                     'Authorization': idToken
  //                 }
  //             })
              
  //         })();
  
  //     }).catch(e => {
  //           console.log('e:', e)});
  // } else {
  //   console.warn('There is currently no logged in user. Unable to call Auth Route.');
  // }
    
  }    
  //////////END: function to create account after validation passes//////////



    //////////START: function to create account after validation passes//////////
    // function handleRegister(){

    //   console.log(name,email,password);

    //   if (firebase.auth().currentUser) {
    //     firebase.auth().currentUser.getIdToken()
    //     .then(idToken => {
    //         console.log('idToken:', idToken);
    //         //async "iffe" function -> auto-executes
    //         (async () => {
    //             let response = await fetch(`/account/create/${name}/${email}/${password}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Authorization': idToken
    //                 }
    //             })
    //             .then(response => response.text())
    //             .then(text => {
    //                 try {
    //                     const data = JSON.parse(text);
    //                     setShow(true);
    //                     console.log(data);
    //                 } catch(err) {
    //                     setStatus(text)
    //                     setTimeout(() => setStatus(''),3500);
    //                     console.log('err:', text);
    //                 }
    //             });
    //           })();
      
    //       }).catch(e => {
    //             console.log('e:', e)});
    //   } else {
    //     console.warn('There is currently no logged in user. Unable to call Auth Route.');
    //   }
        
    //   }    
    //////////END: function to create account after validation passes//////////


  //////////START: CLEARFORM function//////////
  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    firebase.auth().signOut();
    setShow(true);
  }
  //////////END: CLEARFORM function//////////

  

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={handleNameChange} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={handlePasswordChange}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={!isNameValid || !isEmailValid || !isPasswordValid}>Save Account Info</button>
              {/* <button type="submit" className="btn btn-light" onClick={handleRegister} disabled={!isNameValid || !isEmailValid || !isPasswordValid}>Create Account</button> */}
              </>
            ):(
              <>
              <h5>{`An account under ${email} exists, and is logged in.`}</h5>
              <h5>Click below to logout and create a new account</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Logout</button>
              </>
            )
          }
    />
  )
}
//////////END: CREATE ACCOUNT function//////////