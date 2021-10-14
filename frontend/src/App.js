import './App.css';
import { Search } from './components/Search';

function App() {
  return (
    <div class="p-10">
    <p class="mb-4 text-gray-600 text-center">Simple search for capturing user input.</p>
    <div class="md:w-1/2 lg:w-1/3 m-auto border shadow">
      <div class="bg-gray-200 p-10">
         <Search />
      </div>
    </div>
  </div>
  );
}

export default App;
