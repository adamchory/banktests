//////////START: All Data function//////////
function AllData(){
  const [data, setData] = React.useState('');  
  const [show, setShow] = React.useState(true); 
  const [status, setStatus] = React.useState(''); 

  function handle(){
    // call server with token
if (firebase.auth().currentUser) {
    firebase.auth().currentUser.getIdToken()
    .then(idToken => {
        console.log('idToken:', idToken);
        //async "iffe" function -> auto-executes
        (async () => {
            let response = await fetch('/account/all', {
                method: 'GET',
                headers: {
                    'Authorization': idToken
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
               
                setData(JSON.stringify(data));                
            });
            // let text = await response.text();
            // console.log('response:', response);
            
            //setStatus(text);
        })();

    }).catch(e => {
          console.log('e:', e)});
} else {
  console.warn('There is currently no logged in user. Unable to call Auth Route.');
}
setShow(false);
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
    bgcolor="success"
    header="Account Data"
    status={status}
    body={
      show ? (  
        <>
        <h5>{`An account under  exists, and is logged in.`}</h5>
        <h5>Click to see account info</h5>
        <button type="submit" className="btn btn-light" onClick={handle}>See Data</button>
        </>
          ):(
            <>
        <h5>All Data in Store:</h5>
        {data}
    </>
          )
        }
  />
  );
}
//////////END: All data function//////////
