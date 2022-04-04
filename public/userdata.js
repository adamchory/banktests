//////////START: All Data function//////////
function UserData(){
    const [data, setData] = React.useState('');  
    const [show, setShow] = React.useState(true); 
    const [status, setStatus] = React.useState(''); 
    const [email, setEmail] = React.useState('');
   
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
    function handle(){
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
                        setData(data);
                        setShow(false);
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
        setShow(true);
        setStatus('user must be signed in');
        setTimeout(() => setStatus(''),3500);
    }
  }
          
      // fetch all accounts from API
      // fetch('/account/all')
      //     .then(response => response.json())
      //     .then(data => {
      //         console.log(data);
      //         setData(JSON.stringify(data));            
      //     });
  
  
    return (
      <Card
      bgcolor="warning"
      header="Account Data"
      status={status}
      body={
        show ? (  
          <>
          <h5>Click to see account info</h5>
          <button type="submit" className="btn btn-light" onClick={handle}>See Data</button>
          </>
            ):(
              <>
          <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th className="text-warning font-weight-bold">Name</th>
          <th className="text-warning font-weight-bold">Email</th>
          <th className="text-warning font-weight-bold">Password</th>
          <th className="text-warning text-center font-weight-bold">Current Balance</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.password}</td>
            <td className="text-center">{`$${data.balance}`}</td>
        </tr>
      </tbody>
    </table>
      </>
            )
          }
    />
    );
  }
  //////////END: All data function//////////
  