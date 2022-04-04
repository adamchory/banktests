//////////START OF HOME FUNCTION//////////
function Home(){
  const [email, setEmail]     = React.useState('');
  const [show, setShow]     = React.useState(true);
  
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
  // login state
  firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log("user", firebaseUser);
    console.log(firebaseUser.email);
    if(firebaseUser){
        setShow(false);
        setEmail(firebaseUser.email);
    }
    else{
        setShow(true);
    }
});
});

}, []);


  return (
    <Card
      txtcolor="black"
      header="GoodBank Home Page"
      title="Welcome!"
      
      body={ show ? (
        <>
        <h5>Welcome to GoodBank, please navigate to the create accounts page to start using our bank today!</h5>
        (<img src="bank.png" className="img-fluid" alt="Responsive image"/>)
        </> ) : (
          <>
          <h5>{`Hello ${email}, I hope you are enjoying this bank. We take great pride in ensuring that your information is safe.`}</h5>
          <h5>{`You can use the navigation bar to create a new account, login, make withdrawals/deposits, or view account data`}</h5>
          (<img src="bank.png" className="img-fluid" alt="Responsive image"/>)
          </>
        )
      }
    />    
  );  
}
//////////END OF HOME FUNCTION//////////