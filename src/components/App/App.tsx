import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { PAGES_ROUTES } from '../../constants';
import EventCreator from '../EventCreator';
import MainPage from '../MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path={PAGES_ROUTES.CREATE_EVENT} element={<EventCreator />} />
        <Route path={PAGES_ROUTES.EDIT_EVENT} element={<EventCreator />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
