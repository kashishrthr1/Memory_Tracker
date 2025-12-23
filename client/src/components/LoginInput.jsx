function LoginInput({ name }) {
  return (
    <>
      <div
        style={{
          color: "black",
          margin: "10%",
          padding: "10%",
          fontFamily: "roboto",
        }}
      >
        {name}
      </div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "25em",
          padding: "10%",
          margin: "10%",
          border: "3px solid black",
          height: "5vh",
        }}
      >
        Content here
      </div>
    </>
  );
}

export default LoginInput;
