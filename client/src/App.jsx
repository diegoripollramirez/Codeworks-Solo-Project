import React from 'react'
import { useState } from 'react';

//Los nombres de los componentes deben importarse con mayuscula independientemente de la exportacion!!
import Login from './login';
import Schedule from './schedule';
import ShoppingList from './shoppingList';
import RecipeList from './recipesList';
import RecipeEdit from './recipesEdit';

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

    } else if (currentTab === 'recipeList') {
      return <RecipeList
        recipes={recipes}
        setRecipes={setRecipes}
        userName={userName}
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentTab={setCurrentTab}
      />;

    } else if (currentTab === 'recipeEdit') {
      return <RecipeEdit
        recipes={recipes}
        setRecipes={setRecipes}
        userName={userName}
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentTab={setCurrentTab}
      />;

    } else {
      return null;
    }
  }

  const handleButtonClick = (tab) => {
    setCurrentTab(tab);
    setSearchText('');
  }

  return (
    <div>
      {!logged ? (
        <Login
          setLogin={setLogin}
          userName={userName}
          setUserName={setUserName}
          setSelectedMeals={setSelectedMeals} />
      ) : (
        <div className='reactMenu'>
          <nav>
            <button onClick={() => handleButtonClick('schedule')}>Schedule</button>
            <button onClick={() => handleButtonClick('shoppingList')}>Shopping List</button>
            <button onClick={() => handleButtonClick('recipeList')}>Recipes</button>
          </nav>
          <div className="mainContent">
            <div className="component"> {renderTab(currentTab)}</div>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
