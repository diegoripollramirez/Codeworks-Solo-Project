import './App.css'
import { useState } from 'react';

//Los nombres de los componentes deben importarse con mayuscula independientemente de la exportacion!!
import Login from './login';
import Schedule from './schedule';
import ShoppingList from './shoppingList';
import Recipes from './recipes';

function App() {
  const [logged, setLogin] = useState(false);
  const [currentTab, setCurrentTab] = useState('schedule');
  const [recipes, setRecipes] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([
    [null, null], // Monday
    [null, null], // Tuesday
    [null, null], // Wednesday
    [null, null], // Thursday
    [null, null], // Friday
    [null, null], // Saturday
    [null, null], // Sunday
  ]);

  function renderTab(currentTab) {
    if (currentTab === 'schedule') {
      return  <Schedule recipes={recipes} setRecipes={setRecipes} selectedMeals={selectedMeals} setSelectedMeals={setSelectedMeals} />;
    } else if (currentTab === 'shoppingList') {
      return <ShoppingList selectedMeals={selectedMeals}/>;
    } else if (currentTab === 'recipes') {
      return <Recipes />;
    } else {
      return null;
    }
  }

  return (
    <div>
      {!logged ? (
        <Login setLogin={setLogin} />
      ) : (
        <div>
          <nav>
            <button onClick={() => setCurrentTab('schedule')}>Schedule</button>
            <button onClick={() => setCurrentTab('shoppingList')}>Shopping List</button>
            <button onClick={() => setCurrentTab('recipes')}>Recipes</button>
          </nav>
          <div>
            {renderTab(currentTab)}
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
