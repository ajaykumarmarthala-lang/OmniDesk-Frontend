import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InsertCustomer from './InsertCustomer';
import GetCustomers from './GetCustomers';
import Nav from './Nav';

function Routing() {
    return (
        <Router>
            <div className="page-shell">
                <Nav />
                <Routes>
                    <Route path="/" element={<InsertCustomer />} />
                    <Route path="/get" element={<GetCustomers />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Routing;