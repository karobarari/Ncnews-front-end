const Header = () => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const username = "John Doe"; 

  return (
    <div className="Header">
      <h1>NC news</h1>
      <div className="date-section">
        <p>
          Todays Date: <br />
          {date}/{month}/{year}
        </p>
      </div>
      <div className="user-detailes">
        <img className="avatar-img"
          src="https://media.istockphoto.com/id/677518676/photo/football-player-standing-with-arms-crossed.jpg?s=612x612&w=is&k=20&c=1HJo1OQs6lFSej1IMjs5RpxXbQnkuIa2LbE6TS8Bzd8="
          alt="user avatar"
        />
        <h3>{username}</h3>
      </div>
    </div>
  );
};

export default Header;
