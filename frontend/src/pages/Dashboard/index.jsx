import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();

  return (
    <div>
      <div>DASHBOARD</div>
      <button
        onClick={() => {
          localStorage.clear();
          history.push("/");
        }}
      >
        Sair
      </button>
    </div>
  );
};

export default Dashboard;
