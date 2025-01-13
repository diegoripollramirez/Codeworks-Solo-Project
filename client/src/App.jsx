import React from 'react'
import { useState } from 'react';

//Los nombres de los componentes deben importarse con mayuscula independientemente de la exportacion!!
import Login from './login';
import Schedule from './schedule';
import ShoppingList from './shoppingList';
import RecipesSection from './recipes';

function App() {
  const [logged, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentTab, setCurrentTab] = useState('schedule');
  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
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
      return <Schedule
        userName={userName}
        recipes={recipes}
        setRecipes={setRecipes}
        selectedMeals={selectedMeals}
        setSelectedMeals={setSelectedMeals}
        setCurrentTab={setCurrentTab}
        setSearchText={setSearchText}
      />;

    } else if (currentTab === 'shoppingList') {
      return <ShoppingList
        selectedMeals={selectedMeals}
      />;

    } else if (currentTab === 'recipes') {
      return <RecipesSection
        recipes={recipes}
        setRecipes={setRecipes}
        userName={userName}
        searchText={searchText}
        setSearchText={setSearchText}
      />;
    } else {
      return null;
    }
  }

  const handleScheduleButtonClick = () => {
    setCurrentTab('schedule');
    setSearchText('');
  };

  const handleShoppingListButtonClick = () => {
    setCurrentTab('shoppingList');
    setSearchText('');
  };

  const handleRecipesButtonClick = () => {
    setCurrentTab('recipes');
    setSearchText('');
  };

  return (
    <div>
      {!logged ? (
        <Login
          setLogin={setLogin}
          userName={userName}
          setUserName={setUserName}
          setSelectedMeals={setSelectedMeals} />
      ) : (
        <div>
          <nav>
            <button onClick={() => handleScheduleButtonClick()}>Schedule</button>
            <button onClick={() => handleShoppingListButtonClick()}>Shopping List</button>
            <button onClick={() => handleRecipesButtonClick()}>Recipes</button>
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
