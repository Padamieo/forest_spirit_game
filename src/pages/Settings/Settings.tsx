import { useNavigate } from 'react-router-dom';

export const Settings = () => {
  const navigate = useNavigate();

  const backToMainMenu = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>settings</h1>
      <button onClick={backToMainMenu}>go back</button>
      <select name="language">
        <option value="en" key="en">
          en
        </option>
        <option value="nl" key="nl">
          nl
        </option>
      </select>
    </div>
  );
};

export default Settings;
