import Header from "../Header";
function NotFound({ items }) {
  return (
    <>
    <Header items={items} />
     <div className="not-found">
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{display:"block"}}> 404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
    
    
    </>
   
  );
}
export default NotFound;