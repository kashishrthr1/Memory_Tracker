const Navbar = () => (
  <nav className="navbar">
    <div className="logo-circle">L</div>
    <div className="nav-pills">
      <button className="nav-btn">Home</button>
      <button className="nav-btn active">Dashboard</button>
      <button className="nav-btn">Contact</button>
    </div>
    <div className="nav-actions">
      <div className="action-box box-outline"></div>
      <div className="action-box box-solid"></div>
    </div>
  </nav>
);
export default Navbar;
