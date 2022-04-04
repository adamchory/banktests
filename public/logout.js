//////////START OF Logout FUNCTION//////////
function Logout(){
  const [show, setShow]         = React.useState(false);
  const [email, setEmail]         = React.useState('');

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
        setShow(true);
        setEmail(firebaseUser.email);
    }
    else{
        setShow(false);
    }
});

}, []);
    
      function handleLogout(){
        firebase.auth().signOut();
        setShow(false);
        
      };
    
    return (
      <Card
      bgcolor="danger"
      header="Account Logout Page"
      body={show ? (  
        <>
        <h5>{`Want to logout of ${email}?`}</h5>
        <button type="submit" 
        className="btn btn-light" 
        onClick={handleLogout}>
          Logout
      </button>
      </>
            ):(
              <>
        <h5>{`No Account is logged in`}</h5>
        </>
            )}
    />
      
      );  
  }
  //////////END OF Logout FUNCTION//////////